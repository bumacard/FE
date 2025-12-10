import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  clearFinalReviewWords,
  clearResults,
  saveSessionMeta,
} from '../../utils/speedStorage.js'

const TYPE1_OPTIONS = [
  { value: 'WORD_TO_KOR', label: '영어 → 한국어' },
  { value: 'KOR_TO_WORD', label: '한국어 → 영어' },
]

const TYPE2_OPTIONS = [
  { value: 'USER_COUNT', label: '학습 개수 지정' },
  { value: 'AUTO', label: '자동 설정' },
  { value: 'INCORRECT_OVER_N', label: '틀린 문제 n개 이상' },
]

const SpeedOptions = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [type1, setType1] = useState('')
  const [type2, setType2] = useState('')
  const [count, setCount] = useState('')
  const [n, setN] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const validate = () => {
    if (!type1 || !type2) return '학습 타입을 모두 선택해주세요.'
    if (type2 === 'USER_COUNT' && (!count || Number(count) <= 0)) return '학습 개수를 입력해주세요.'
    if (type2 === 'INCORRECT_OVER_N' && (n === '' || Number(n) < 0))
      return '틀린 문제 기준 n을 입력해주세요.'
    return ''
  }

  const handleSelectType2 = (value) => {
    setType2(value)
    if (value !== 'USER_COUNT') setCount('')
    if (value !== 'INCORRECT_OVER_N') setN('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }

    const query = new URLSearchParams({
      type1,
      type2,
      ...(type2 === 'USER_COUNT' && count ? { count } : {}),
      ...(type2 === 'INCORRECT_OVER_N' && n ? { n } : {}),
    }).toString()

    saveSessionMeta({
      type1,
      type2,
      count: type2 === 'USER_COUNT' ? count : '',
      n: type2 === 'INCORRECT_OVER_N' ? n : '',
    })
    clearResults()
    clearFinalReviewWords()
    navigate(`/speed/start?${query}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#12121a] via-[#1a1b24] to-[#0e0e12] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-14">
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase text-primary">Speed Learning</p>
          <h1 className="mt-3 text-[34px] font-black text-white">옵션을 선택하고 학습을 시작하세요.</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-300">
            학습 방향(type1)과 선별 기준(type2)을 고르면 바로 학습을 시작할 수 있습니다. 필요한 경우 추가 입력(count, n)을
            해주세요.
          </p>
        </header>

        <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#1e1f28] p-9 shadow-[0_18px_44px_rgba(0,0,0,0.3)]">
            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-200">문제 방향</label>
                  <span className="text-xs text-gray-500">필수</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TYPE1_OPTIONS.map((option) => {
                    const selected = option.value === type1
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setType1(option.value)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${
                          selected
                            ? 'border-primary bg-primary/10 text-white shadow-[0_12px_24px_rgba(126,111,229,0.25)]'
                            : 'border-white/10 bg-white/5 text-gray-200 hover:border-white/20'
                        }`}
                      >
                        <span className="text-[15px] font-semibold">{option.label}</span>
                        <span
                          className={`h-3 w-3 rounded-full ${
                            selected ? 'bg-primary' : 'border border-white/30'
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-200">선별 기준</label>
                  <span className="text-xs text-gray-500">필수</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TYPE2_OPTIONS.map((option) => {
                    const selected = option.value === type2
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectType2(option.value)}
                        className={`flex flex-col gap-1 rounded-xl border px-4 py-3 text-left transition ${
                          selected
                            ? 'border-primary bg-primary/10 text-white shadow-[0_12px_24px_rgba(126,111,229,0.25)]'
                            : 'border-white/10 bg-white/5 text-gray-200 hover:border-white/20'
                        }`}
                      >
                        <span className="text-base font-semibold">{option.label}</span>
                        <span className="text-xs text-gray-400">
                          {option.value === 'USER_COUNT'
                            ? '학습할 문제 개수를 지정합니다.'
                            : option.value === 'AUTO'
                              ? '평균 오답수를 기준으로 임계값을 자동으로 정합니다.'
                              : '틀린 횟수가 n회 이상인 단어를 불러옵니다.'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {type2 === 'USER_COUNT' ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-200">학습 개수</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(event) => setCount(event.target.value)}
                    className="rounded-lg border border-white/10 bg-black/20 px-4 py-3.5 text-base text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="예: 20"
                  />
                </div>
              ) : null}

              {type2 === 'INCORRECT_OVER_N' ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-200">틀린 문제 n개 이상</label>
                  <input
                    type="number"
                    value={n}
                    onChange={(event) => setN(event.target.value)}
                    className="rounded-lg border border-white/10 bg-black/20 px-4 py-3.5 text-base text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="예: 5"
                  />
                </div>
              ) : null}

              {error ? (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-primary to-primaryAccent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:translate-y-[-1px] hover:shadow-primary/40"
                >
                  학습 시작하기
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}

export default SpeedOptions
