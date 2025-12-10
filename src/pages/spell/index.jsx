import { useEffect, useMemo, useState } from 'react'
import { CheckIcon, SoundIcon, StarIcon } from '../../components/icon'
import { normalize } from '../../utils/index.js'
import SpellHeader from '../../components/spell/SpellHeader/index.jsx'
import apiClient from '../../api/instance.js'

export default function Spell() {
  const [cards, setCards] = useState([])
  const total = cards.length
  const [started, setStarted] = useState(false)
  const [isResult, setIsResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [answerInput, setAnswerInput] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const card = useMemo(() => cards[cardIndex] ?? cards[0], [cardIndex, cards])
  const isLastCard = cardIndex === cards.length - 1

  const handleSubmit = () => {
    if (!card) return
    const correct = normalize(answerInput) === normalize(card.wordEng)
    setIsCorrect(correct)
    setIsResult(true)
  }

  const handleNext = () => {
    if (isLastCard) {
      setIsFinished(true)
      setIsResult(false)
      return
    }

    setIsResult(false)
    setIsCorrect(false)
    setAnswerInput('')
    setCardIndex((prev) => Math.min(prev + 1, cards.length - 1))
  }

  const handleRestart = () => {
    setStarted(true)
    setIsFinished(false)
    setIsResult(false)
    setIsCorrect(false)
    setCardIndex(0)
    setAnswerInput('')
  }

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await apiClient.get('/word')
        const payload = Array.isArray(response?.data) ? response.data : response?.data?.data || []
        setCards(payload)
      } catch (err) {
        setError('단어를 불러오지 못했습니다.\n: ' + err.message)
        setCards([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCards()
  }, [])

  useEffect(() => {
    setCardIndex(0)
    setIsFinished(false)
    setIsResult(false)
    setIsCorrect(false)
    setAnswerInput('')
  }, [cards])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (isFinished && event.code === 'Space') {
        event.preventDefault()
        handleRestart()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isFinished])

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-sm text-gray-300">단어를 불러오는 중...</div>
    }

    if (error) {
      return <div className="text-sm font-semibold text-red-400">{error}</div>
    }

    if (!cards.length) {
      return <div className="text-sm text-gray-300">카드가 없습니다.</div>
    }

    if (!started) {
      return (
        <button
          onClick={() => setStarted(true)}
          className="rounded-xl bg-gradient-to-r from-primary to-primaryAccent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/40 transition hover:scale-[1.02]"
        >
          스펠 학습 시작
        </button>
      )
    }

    if (isFinished) {
      return (
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 text-center">
          <div className="text-lg font-semibold text-white">전체 {total} 카드</div>
          <div className="space-y-4">
            <div className="text-5xl font-black italic leading-tight tracking-tight">
              <span className="text-[#6b5fe6]">GOOD</span>
              <span className="ml-4 text-[#72d144]">JOB!!</span>
            </div>
            <p className="text-2xl font-medium text-[#6fd93f]">구간 학습이 완료되었습니다.</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-textMain shadow-[0_18px_30px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
            >
              다시 학습하기
            </button>
            <div className="text-xs font-bold text-gray-500">SPACE</div>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="flex items-center gap-2 text-base font-semibold text-[#71be3c]">
          <CheckIcon className="h-5 w-5" />
          <span>{cardIndex + 1}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-400">{total}</span>
        </div>

        <section className="relative h-[400px] w-[600px] overflow-hidden rounded-xl bg-card text-textMain shadow-[0_16px_36px_rgba(0,0,0,0.2)]">
          {isResult && (
            <>
              <div
                className={`pl-2 pt-2 absolute right-0 top-0 h-24 w-24 rounded-bl-[120px] ${
                  isCorrect ? 'bg-[#71be3c]' : 'bg-[#ba5e5b]'
                } z-10`}
              >
                {isCorrect ? (
                  <div className="flex flex-col items-center justify-center">
                    <CheckIcon className="h-7 w-7" fill="white" width="48" height="48" />
                    <div className="text-sm font-semibold text-white">아는카드</div>
                  </div>
                ) : (
                  <div className="mt-3 text-lg font-semibold leading-none text-white text-center">
                    Try
                    <br />
                    Again!
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex h-1/2 w-full flex-col border-b border-gray-200">
            <div className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-textMain">
              <SoundIcon height="24" width="24" className="cursor-pointer" />
              <StarIcon className="h-6 w-6 text-[#f0c94f]" fill="#f0c94f" />
              <span className="text-gray-400">학습중...</span>
            </div>
            <div className="flex flex-1 items-center justify-center px-6">
              <h1 className="text-center text-[32px] font-bold leading-tight text-textMain">{card.wordKor}</h1>
            </div>
          </div>

          <div className="flex h-1/2 flex-col items-center justify-center gap-3 px-6">
            {isResult ? (
              <div className="w-4/5 space-y-3">
                <input
                  className="w-full rounded-md border border-gray-200 bg-[#ededed] px-4 py-3 text-base text-textMain placeholder:text-[#a0a0b2] focus:outline-none"
                  value={answerInput}
                  readOnly
                  placeholder="정답은 줄바꿈 없이 1줄로 입력하세요."
                />
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <span className="rounded-full bg-[#71be3c] px-3 py-1 text-white">정답</span>
                  <span className="text-[#71be3c]">{card.wordEng}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-4/5">
                  <input
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm text-textMain placeholder:text-[#a0a0b2] focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="정답은 줄바꿈 없이 1줄로 입력하세요."
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSubmit()
                      }
                    }}
                  />
                </div>
                <button className="text-md font-bold text-primary transition hover:opacity-80">힌트보기</button>
              </>
            )}
          </div>
        </section>

        <div className="flex flex-col items-center gap-2">
          {isResult ? (
            <button
              className="h-12 w-48 rounded-lg bg-white text-lg font-bold text-textMain shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:translate-y-[1px]"
              onClick={handleNext}
            >
              {isLastCard ? '학습 완료' : '다음 카드'}
            </button>
          ) : (
            <button
              className="h-12 w-48 rounded-lg bg-[#71be3c] text-lg font-bold text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:translate-y-[1px]"
              onClick={handleSubmit}
            >
              확인
            </button>
          )}
          <span className="text-xs font-bold text-gray-500">{isResult ? 'SPACE' : 'ENTER'}</span>
        </div>
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <SpellHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-white">
        {renderContent()}
      </main>
    </div>
  )
}
