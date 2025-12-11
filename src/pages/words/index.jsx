import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StarIcon from '../../components/icon/StarIcon.jsx'
import ArrowLeftIcon from '../../components/icon/ArrowLeftIcon.jsx'
import apiClient from '../../api/instance.js'

const words = [
  { term: 'against all odds', starred: false },
  { term: 'landmark', starred: true },
  { term: 'tower over', starred: false },
  { term: 'nowadays', starred: false },
  { term: 'in charge of', starred: false },
  { term: 'rapidly', starred: false },
  { term: 'commuter', starred: false },
  { term: 'transport', starred: false },
]

export default function WordsPage() {
  const navigate = useNavigate()
  const [lowestWords, setLowestWords] = useState([])

  useEffect(() => {
    const fetchLowestAccuracy = async () => {
      try {
        const response = await apiClient.get('/word/lowest-accuracy')
        const payload = Array.isArray(response?.data) ? response.data : response?.data?.data || []
        setLowestWords(payload.slice(0, 5))
      } catch (err) {
        setLowestWords([])
      }
    }

    fetchLowestAccuracy()
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#303438]">
      <div className="border-b border-[#e8e8ec] bg-white">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#4d5055] transition hover:text-[#8d6cf6]"
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <header className="bg-[#7ec33f] text-white shadow">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 pb-8 pt-10">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-sm bg-white/25 px-2 py-[2px] text-xs font-bold text-white">
              단어
            </span>
            <span className="text-white/70">세트</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black leading-tight">
              2학년 2학기 5회 영어 시험 대비
            </h1>
            <button
              type="button"
              className="text-white/80 transition hover:scale-105 hover:text-white"
              aria-label="공유"
            >
              ↗
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white/85">
            <span>50 카드</span>
            <span className="text-white/60">|</span>
            <span>hkkimstar</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-textMain">
            <HeaderAction label="편집" />
            <HeaderAction label="인쇄" />
            <HeaderAction label="폴더에 추가" />
            <HeaderAction label="추출/결합" />
            <HeaderAction label="세트분리" />
            <HeaderAction label="내보내기" />
            <HeaderAction label="삭제" />
            <HeaderAction label="신고" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-12 pt-6">

          <section className=" rounded-2xl border border-[#e6e9ed] bg-white p-5 shadow-sm">
              <div className="text-sm font-bold text-[#3a3d42]">오답률 TOP 5 단어</div>
              <ul className="mt-3 space-y-2 text-sm text-[#4d5055]">
                  {lowestWords.length === 0 && (
                      <li className="rounded-lg bg-[#f6f7f9] px-3 py-2 text-xs text-[#7c8187]">
                          데이터를 불러오는 중이거나 표시할 단어가 없습니다.
                      </li>
                  )}
                  {lowestWords.map((item, idx) => {
                      const word = item?.wordEng || item?.word || item?.term || '단어'

                      return (
                          <li
                              key={`${word}-${idx}`}
                              className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f6f7f9]"
                          >
                              <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef5e9] text-xs font-semibold text-[#64ad2b]">
                      {idx + 1}
                    </span>
                                  <span className="font-semibold capitalize">{word}</span>
                              </div>
                              <span className="text-xs font-semibold text-[#7c8187]">오답률 ↑</span>
                          </li>
                      )
                  })}
              </ul>
          </section>
        <section className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-[#dfe2e5] bg-white px-3 py-2 text-sm font-semibold text-[#4d5055] shadow-sm">
              학습구간 (전체)
              <span className="ml-2 text-lg text-[#8d6cf6]">▾</span>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#5f646a]">
              <input type="checkbox" className="h-4 w-4 rounded border-[#cfd3d8] accent-[#7fc13b]" />
              뜻 보기
            </label>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-[#5f646a]">
            <div className="flex items-center gap-2 rounded-full border border-[#e4e7eb] bg-white px-3 py-2 shadow-sm">
              <span className="text-[#8d6cf6]">▢</span>
              <span>슬라이드</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#e4e7eb] bg-white px-3 py-2 shadow-sm">
              <span className="text-[#8d6cf6]">▢</span>
              <span>크래시</span>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-lg bg-[#f1eef9] px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="rounded-full bg-[#75c334] px-6 py-2 text-sm font-bold text-white shadow hover:scale-[1.01] hover:bg-[#6bb92d]"
            >
              뒷면보기
            </button>
            <div className="flex flex-wrap items-center gap-2">
              <ActionPill label="암기학습" />
              <ActionPill label="리콜학습" />
              <a href="/words/spell"><ActionPill label="스펠학습" /></a>
                <a href="/speed"><ActionPill label="스피드테스트" /></a>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {words.map((item, idx) => (
            <article
              key={item.term + idx}
              className="relative rounded-xl border border-[#e6e9ed] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                className={`absolute left-4 top-4 transition ${
                  item.starred ? 'text-[#f5c446]' : 'text-[#b5b9bf] hover:text-[#8d6cf6]'
                }`}
                aria-label="즐겨찾기 표시"
              >
                <StarIcon className={`h-5 w-5 ${item.starred ? 'fill-current' : ''}`} />
              </button>
              <div className="flex h-28 items-center justify-center text-lg font-semibold text-[#303438]">
                {item.term}
              </div>
            </article>
          ))}
        </section>

      </main>
    </div>
  )
}

function HeaderAction({ label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-textMain transition hover:bg-white/10 "
    >
      <span>{label}</span>
    </button>
  )
}

function ActionPill({ label }) {
  return (
    <button
      type="button"
      className="rounded-full border border-[#e6e9ed] bg-white px-4 py-2 text-sm font-semibold text-[#3b4046] shadow-sm transition hover:border-[#8d6cf6] hover:text-[#8d6cf6]"
    >
      {label}
    </button>
  )
}
