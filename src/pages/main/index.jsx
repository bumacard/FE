import { useNavigate } from 'react-router-dom'
import SearchIcon from '../../components/icon/SearchIcon.jsx'

const navItems = [
  { label: '세트검색', active: true },
  { label: '세트 만들기', active: true },
  { label: '퀴즈배틀', active: true },
]

const recentSets = [
  { title: '2학년 2학기 5회 영어 시험 대비', count: '50 카드', link: '/spell' },
  { title: '2025학년도 2학년 2학기 어휘 시험 범위 (1회)', count: '50 카드', link: '/'  },
  { title: '2025학년도 2학년 2학기 어휘 시험 범위 (5회)', count: '50 카드', link: '/'  },
  { title: "Barron\u2019s 600 words for the TOEIC - Hotels", count: '30 카드', link: '/'  },
  { title: "Barron\u2019s 600 words for the TOEIC - Marketing", count: '32 카드', link: '/'  },
  { title: '토익', count: '27 카드', link: '/spell'  },
  { title: '영어 단어 왕 선발대회', count: '160 카드', link: '/'  },
  { title: '영어기초', count: '38 카드', locked: true, link: '/'  },
]

export default function Main() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#2c2d31]">
      <header className="border-b border-[#e8e8ec] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-8">
            <div className="flex items-center text-2xl font-black tracking-tight">
              <span className="text-[#5c5c5c]">CLASS</span>
              <span className="ml-1 text-[#7ec33f]">CARD</span>
            </div>
            <nav className="flex items-center gap-5 text-sm font-semibold">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`transition ${
                    item.active ? 'text-[#8c6ef4]' : 'text-[#444c4f] hover:text-[#8c6ef4]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b9dfa] text-base font-bold text-white shadow-sm">
              박
            </div>
            <div className="text-sm font-semibold text-[#2f2f33]">박선영 학생</div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl gap-8 px-8 pb-12 pt-6">
        <aside className="w-[240px] space-y-6">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm font-semibold text-[#6a6f73]">
              <span>나의 클래스 (0)</span>
              <span className="text-[#9ea1a6]"> </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#71757b]">가입한 클래스가 없습니다.</p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#8d6cf6]"
            >
              <span className="text-lg leading-none">+</span>
              클래스 가입
            </button>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm font-semibold text-[#6a6f73]">
              <span>나의 폴더 (0)</span>
              <button type="button" className="flex items-center gap-1 text-[#8d6cf6]">
                <span className="text-base leading-none">+</span>
                <span>폴더</span>
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <FolderRow active label="이용한 세트" />
              <FolderRow label="만든 세트" />
            </div>
          </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="text-sm font-bold text-[#3a3d42]">오답률 TOP 5 단어</div>
                <ul className="mt-3 space-y-2 text-sm text-[#4d5055]">
                    {['available', 'provide', 'result', 'important', 'experience'].map((word, idx) => (
                        <li
                            key={word}
                            className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[#f6f7f9]"
                        >
                            <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef5e9] text-xs font-semibold text-[#64ad2b]">
                        {idx + 1}
                      </span>
                                <span className="font-semibold capitalize">{word}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>

        <section className="flex-1 space-y-5">
          <div className="relative overflow-hidden rounded-3xl bg-[#83c84c] px-10 py-10 text-white shadow-md">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 40%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.35) 0, rgba(255,255,255,0) 35%)',
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center opacity-40"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1504714146340-959ca07b7f88?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="relative space-y-2">
              <div className="text-3xl font-bold leading-tight">이용한 세트</div>
              <p className="text-sm font-medium text-white/90">내가 최근 이용한 세트(단어장)의 목록</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                  <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#b0b4b8]" />
                  <input
                    type="text"
                    placeholder="이용한 세트 검색"
                    className="w-full rounded-lg border border-[#dfe2e5] bg-[#f7f8fa] py-2 pl-10 pr-3 text-sm text-[#303438] outline-none transition focus:border-[#8d6cf6] focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-5 text-sm font-semibold text-[#6d7177]">
                  <button type="button" className="hover:text-[#8d6cf6]">
                    폴더에 추가
                  </button>
                  <button type="button" className="hover:text-[#8d6cf6]">
                    인쇄
                  </button>
                  <button type="button" className="hover:text-[#8d6cf6]">
                    제거
                  </button>
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#8d6cf6]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-2 border-[#d2d6da] accent-[#7fc13b]"
                    />
                  </label>
                </div>
              </div>

              <div className="divide-y divide-[#eceff1] overflow-hidden rounded-xl border border-[#e6e9ed]">
                {recentSets.map((item) => (
                  <div
                    key={item.title}
                    className={`flex items-center gap-4 bg-white px-5 py-4 ${
                      item.link ? 'cursor-pointer hover:bg-[#f6f7f9]' : ''
                    }`}
                    role={item.link ? 'button' : undefined}
                    tabIndex={item.link ? 0 : undefined}
                    onClick={() => item.link && navigate(item.link)}
                    onKeyDown={(e) => {
                      if (item.link && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault()
                        navigate(item.link)
                      }
                    }}
                  >
                    <span className="rounded-md border border-[#d9e9c8] bg-[#edf8e4] px-2 py-[3px] text-[13px] font-semibold text-[#64ad2b]">
                      단어
                    </span>
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                      <div className="text-sm font-semibold text-[#303438]">{item.title}</div>
                      <div className="flex items-center gap-2 text-sm text-[#8b8f95]">
                        <span>{item.count}</span>
                        {item.locked && <LockIcon className="h-4 w-4 text-[#7c7f84]" />}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-2 border-[#d2d6da] accent-[#7fc13b]"
                      aria-label={`${item.title} 선택`}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <HelpButton />
    </div>
  )
}

function FolderRow({ label, active }) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold ${
        active ? 'bg-[#eff8e8] text-[#4e9a24]' : 'text-[#4d5055] hover:bg-[#f4f5f7]'
      }`}
    >
      <FolderIcon filled={active} />
      <span>{label}</span>
    </div>
  )
}

function FolderIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${filled ? 'text-[#4e9a24]' : 'text-[#6b7075]'}`}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3.5 7.75A1.75 1.75 0 015.25 6h4.17c.33 0 .65.12.9.34l1.4 1.23c.25.22.57.34.9.34h5.08c.97 0 1.75.78 1.75 1.75v7.38c0 .97-.78 1.75-1.75 1.75h-14a1.75 1.75 0 01-1.75-1.75V7.75z" />
    </svg>
  )
}

function LockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17 9h-1V7a4 4 0 00-8 0v2H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2zm-3 0H10V7a2 2 0 114 0v2z" />
    </svg>
  )
}

function HelpButton() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
      <div className="rounded-lg bg-[#56585d] px-2 py-1 text-xs font-semibold text-white shadow">
        알고틀
      </div>
      <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#9b7ffc] to-[#7d61f3] px-3 py-2 text-white shadow-lg shadow-[#9b7ffc]/30 transition hover:translate-y-[-2px]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <SmileIcon className="h-6 w-6" />
        </span>
        <span className="pr-1 text-sm font-semibold">고객센터</span>
      </button>
    </div>
  )
}

function SmileIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-3.2 8a1.2 1.2 0 112.4 0 1.2 1.2 0 01-2.4 0zm5 0a1.2 1.2 0 112.4 0 1.2 1.2 0 01-2.4 0zM12 17c-2 0-3.75-1.15-4.5-2.87a.75.75 0 111.38-.56c.55 1.26 1.9 2.18 3.12 2.18s2.57-.92 3.12-2.18a.75.75 0 111.38.56C15.75 15.85 14 17 12 17z" />
    </svg>
  )
}
