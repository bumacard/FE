import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { fetchSpeedWords } from '../../api/speed.js'
import { mapErrorCode, normalize } from '../../utils/index.js'
import {
  clearResults,
  loadFinalReviewWords,
  loadResults,
  loadSessionMeta,
  saveResults,
  saveSessionMeta,
} from '../../utils/speedStorage.js'

const Start = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const sessionMeta = loadSessionMeta()

  const type1 = searchParams.get('type1') || sessionMeta?.type1
  const type2 = searchParams.get('type2') || sessionMeta?.type2
  const count = searchParams.get('count') || sessionMeta?.count
  const n = searchParams.get('n') || sessionMeta?.n

  const [wordList, setWordList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [localResults, setLocalResults] = useState(() => loadResults() || [])
  const [reviewMode, setReviewMode] = useState(false)

  const currentWord = wordList[currentIndex]
  const total = wordList.length
  const isLast = currentIndex === total - 1

  const promptText = useMemo(() => {
    if (!currentWord) return ''
    if (type1 === 'WORD_TO_KOR') return currentWord.wordEng || currentWord.word || currentWord.text || ''
    if (type1 === 'KOR_TO_WORD') return currentWord.wordKor || currentWord.meaning || currentWord.kor || ''
    return currentWord.word || currentWord.text || ''
  }, [currentWord, type1])

  const expectedAnswer = useMemo(() => {
    if (!currentWord) return ''
    if (type1 === 'WORD_TO_KOR') return currentWord.wordKor || currentWord.meaning || currentWord.answer || ''
    if (type1 === 'KOR_TO_WORD') return currentWord.wordEng || currentWord.word || currentWord.answer || ''
    return currentWord.answer || ''
  }, [currentWord, type1])

  useEffect(() => {
    if (!type1 || !type2) {
      navigate('/speed', {
        replace: true,
        state: { error: '학습 옵션이 필요합니다. 다시 설정해주세요.' },
      })
      return
    }

    const prefetched = location.state?.prefetchedWords
    if (prefetched?.length) {
      setWordList(prefetched)
      setReviewMode(true)
      setIsLoading(false)
      return
    }

    const fromStorage = loadFinalReviewWords()
    if (location.state?.useFinalReview && fromStorage.length) {
      setWordList(fromStorage)
      setReviewMode(true)
      setIsLoading(false)
      return
    }

    const fetchWords = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetchSpeedWords({
          type1,
          type2,
          ...(type2 === 'USER_COUNT' && count ? { count } : {}),
          ...(type2 === 'INCORRECT_OVER_N' && n ? { n } : {}),
        })
        const list = response || []
        if (!Array.isArray(list) || !list.length) throw new Error('표시할 문제가 없습니다.')
        setWordList(list)
        saveSessionMeta({ type1, type2, count, n })
        clearResults()
      } catch (err) {
        const message = err?.code ? mapErrorCode(err.code) : err?.message || '단어를 불러오지 못했습니다.'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWords()
  }, [count, n, navigate, type1, type2, location.state])

  useEffect(() => {
    setCurrentIndex(0)
    setAnswer('')
    setFeedback(null)
  }, [wordList])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && feedback) {
        event.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [feedback])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!currentWord) return

    const isCorrect = normalize(answer) === normalize(expectedAnswer)
    const result = {
      wordId: currentWord.id || currentWord.wordId || currentIndex,
      isCorrect,
    }

    const updated = [...localResults.slice(0, currentIndex), result]
    setLocalResults(updated)
    saveResults(updated)

    setFeedback({
      isCorrect,
      expected: expectedAnswer,
      input: answer,
    })
  }

  const goNext = () => {
    setFeedback(null)
    setAnswer('')
    if (isLast) {
      navigate('/speed/result')
      return
    }
    setCurrentIndex((prev) => Math.min(prev + 1, total - 1))
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <div className="rounded-xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-gray-200">
          단어 목록을 불러오는 중입니다...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <div className="flex flex-col gap-4 rounded-xl border border-red-500/30 bg-red-500/10 px-8 py-6 text-center">
          <p className="text-sm font-semibold text-red-200">{error}</p>
          <button
            onClick={() => navigate('/speed', { state: { error: '' } })}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            옵션 화면으로 이동
          </button>
        </div>
      </div>
    )
  }

  if (!wordList.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-white/5 px-8 py-6 text-center">
          <p className="text-sm font-semibold text-gray-200">표시할 문제가 없습니다.</p>
          <button
            onClick={() => navigate('/speed')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            옵션 화면으로 이동
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="flex items-center justify-between border-b border-[#2a2c32] bg-[#1b1c20] px-6 py-5 text-base">
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-200">
          <button
            className="flex items-center gap-2 rounded-lg border border-[#2f3137] bg-[#16171b] px-3 py-2 text-gray-200"
            onClick={() => navigate('/speed')}
          >
            <span>학습종료</span>
          </button>
        </div>
        <div className="text-center text-[15px] font-semibold text-gray-100">
          {reviewMode ? '최종 복습 진행 중' : 'Speed Learning 세션'}
        </div>
        <div className="text-sm font-semibold uppercase text-gray-400">
          {currentIndex + 1} / {total}
        </div>
      </header>

      <main className="flex flex-col items-center gap-10 px-4 py-12">
        <section className="w-full max-w-4xl rounded-2xl bg-card text-textMain shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b border-[#e7e7ec] px-6 py-5 text-base font-semibold text-textMain">
            <div className="text-primary">
              {type1 === 'WORD_TO_KOR' ? '영어 → 한국어' : '한국어 → 영어'}{' '}
              {reviewMode ? '(최종 복습)' : '(학습)'}
            </div>
            <span className="text-gray-400">
              {currentIndex + 1} / {total}
            </span>
          </div>

          <div className="flex flex-col items-center px-10 pb-12 pt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">문제</p>
            <h1 className="mb-8 text-center text-[34px] font-black leading-snug text-textMain">
              {promptText || '문제가 준비되지 않았습니다.'}
            </h1>

            <form onSubmit={handleSubmit} className="w-full">
              <input
                className="w-full rounded-lg border border-[#a79ce2] px-5 py-3.5 text-base text-textMain placeholder:text-[#8c8ca5] focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="정답은 줄바꿈 없이 1줄로 입력하세요."
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                autoFocus
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
                <span>엔터를 눌러 빠르게 제출하고, 피드백에서 한 번 더 엔터를 누르면 다음으로 이동합니다.</span>
                {currentWord?.hint ? (
                  <span className="text-primary font-semibold">힌트: {currentWord.hint}</span>
                ) : null}
              </div>

              <div className="mt-7 flex items-center justify-center">
                <button
                  type="submit"
                  className="w-full max-w-xs rounded-lg bg-primary px-16 py-3.5 text-lg font-bold text-white transition hover:opacity-90"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {feedback ? (
        <div className="fixed inset-0 z-20 grid place-items-center bg-black/60 px-6">
          <div className="w-full max-w-lg rounded-2xl bg-card p-7 text-textMain shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
            <p className={`text-sm font-bold ${feedback.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.isCorrect ? '정답입니다!' : '오답입니다.'}
            </p>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p className="font-semibold text-textMain">입력값: {feedback.input || '(미입력)'}</p>
              {!feedback.isCorrect ? (
                <p className="text-textMain">
                  정답: <span className="font-semibold">{feedback.expected || '제공되지 않았습니다.'}</span>
                </p>
              ) : null}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={goNext}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white transition hover:opacity-90"
              >
                {isLast ? '결과 보기' : '다음 문제'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Start
