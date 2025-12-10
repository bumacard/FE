import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postSpeedResultsBatch } from '../../api/speed.js'
import {
  clearFinalReviewWords,
  clearResults,
  loadFinalReviewWords,
  loadResults,
  loadSessionMeta,
  saveFinalReviewWords,
} from '../../utils/speedStorage.js'
import { mapErrorCode } from '../../utils/errorCodeMessages.js'

const Result = () => {
  const navigate = useNavigate()
  const sessionMeta = useMemo(() => loadSessionMeta(), [])
  const [results] = useState(() => loadResults())
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')
  const [isPosting, setIsPosting] = useState(true)

  useEffect(() => {
    if (!results?.length) {
      setIsPosting(false)
      setError('전송할 결과가 없습니다. 옵션을 다시 선택해주세요.')
      return
    }

    postSpeedResultsBatch(results)
      .then((data) => {
        const finalData = {
          totalCount: data?.totalCount ?? results.length,
          correctCount: data?.correctCount ?? results.filter((item) => item.isCorrect).length,
          incorrectCount: data?.incorrectCount ?? results.filter((item) => !item.isCorrect).length,
          finalReviewWords: data?.finalReviewWords || [],
        }
        setSummary(finalData)
        clearResults()
        if (finalData.finalReviewWords.length) {
          saveFinalReviewWords(finalData.finalReviewWords)
        } else {
          clearFinalReviewWords()
        }
      })
      .catch((postError) => {
        const message = postError?.code ? mapErrorCode(postError.code) : postError?.message
        setError(message || '결과 전송 중 오류가 발생했습니다.')
      })
      .finally(() => setIsPosting(false))
  }, [results])

  const handleRestart = () => {
    if (!sessionMeta?.type1 || !sessionMeta?.type2) {
      navigate('/speed')
      return
    }
    const query = new URLSearchParams({
      type1: sessionMeta.type1,
      type2: sessionMeta.type2,
      ...(sessionMeta.count ? { count: sessionMeta.count } : {}),
      ...(sessionMeta.n ? { n: sessionMeta.n } : {}),
    }).toString()
    navigate(`/speed/start?${query}`)
  }

  const startFinalReview = () => {
    const words = summary?.finalReviewWords?.length
      ? summary.finalReviewWords
      : loadFinalReviewWords()

    if (!words?.length) return

    const query = new URLSearchParams({
      type1: sessionMeta?.type1 || 'WORD_TO_KOR',
      type2: sessionMeta?.type2 || 'USER_COUNT',
      ...(sessionMeta?.count ? { count: sessionMeta.count } : {}),
      ...(sessionMeta?.n ? { n: sessionMeta.n } : {}),
    }).toString()

    navigate(`/speed/start?${query}`, { state: { prefetchedWords: words } })
  }

  if (isPosting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <div className="rounded-xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-gray-200">
          결과를 정리해 전송하는 중입니다...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <div className="flex flex-col gap-4 rounded-xl border border-red-500/30 bg-red-500/10 px-8 py-6 text-center">
          <p className="text-sm font-semibold text-red-200 whitespace-pre-line">{error}</p>
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

  if (!summary) return null

  const hasFinalReview = summary.finalReviewWords?.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1015] via-[#151621] to-[#0c0c12] px-6 py-14 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">Speed Learning 결과</p>
            <h1 className="mt-1 text-[32px] font-black">세션 요약</h1>
          </div>
          <button
            onClick={handleRestart}
            className="rounded-lg border border-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:border-primary/40 hover:text-primary"
          >
            동일 옵션으로 다시 학습
          </button>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase text-gray-400">전체</p>
            <p className="mt-2 text-3xl font-bold text-white">{summary.totalCount}</p>
          </div>
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
            <p className="text-xs uppercase text-green-200">정답</p>
            <p className="mt-2 text-3xl font-bold text-green-200">{summary.correctCount}</p>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <p className="text-xs uppercase text-red-200">오답</p>
            <p className="mt-2 text-3xl font-bold text-red-200">{summary.incorrectCount}</p>
          </div>
        </section>

        {hasFinalReview ? (
          <section className="rounded-2xl border border-primary/20 bg-primary/10 p-6 text-sm text-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">최종 복습</p>
                <h2 className="text-xl font-bold text-white">틀린 문제를 다시 풀어보세요</h2>
                <p className="mt-1 text-xs text-gray-300">틀린 순서 그대로 최대 10개 문제를 제공합니다.</p>
              </div>
              <button
                onClick={startFinalReview}
                className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-primary transition hover:opacity-90"
              >
                최종 복습 시작
              </button>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-gray-200 sm:grid-cols-2">
              {summary.finalReviewWords.map((word, index) => (
                <li
                  key={word.id || word.wordId || index}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
                >
                  <span className="font-semibold text-white">
                    {word.wordEng || word.word || word.text || word.wordKor || '단어'}
                  </span>
                  {word.wordKor ? <span className="text-gray-400"> — {word.wordKor}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-gray-300">
            이번 세션에서 최종 복습 대상 단어는 없습니다.
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRestart}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            같은 옵션으로 재시작
          </button>
          <button
            onClick={() => navigate('/speed')}
            className="rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-primary/30 hover:text-primary"
          >
            옵션 다시 선택
          </button>
          <button
            onClick={() => navigate('/')}
            className="rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-gray-200 transition hover:border-white/30"
          >
            홈으로 이동
          </button>
          {hasFinalReview ? (
            <button
              onClick={startFinalReview}
              className="rounded-lg border border-primary/40 px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary/10"
            >
              틀린 문제 다시 풀기
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Result
