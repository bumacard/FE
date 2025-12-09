import { useState } from 'react'
import { ArrowLeftIcon, CheckIcon, MenuIcon, SearchIcon, SoundIcon } from '../../components/icon'

export default function Spell() {
  const [started, setStarted] = useState(false)
  const progress = { current: 27, total: 50 }

  if (!started) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <button
          onClick={() => setStarted(true)}
          className="rounded-xl bg-gradient-to-r from-primary to-primaryAccent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/40 transition hover:scale-[1.02]"
        >
          스펠 학습 시작
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="flex items-center justify-between border-b border-[#2a2c32] bg-[#1b1c20] px-6 py-4">
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-200">
          <button className="flex items-center gap-2 rounded-lg border border-[#2f3137] bg-[#16171b] px-3 py-2 text-gray-200">
            <ArrowLeftIcon />
            <span>학습종료</span>
          </button>
        </div>
        <div className="text-center text-sm font-semibold text-gray-100">
          2025학년도 2학년 2학기 어휘 시험 범위 (1회)
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <button className="grid h-9 w-9 place-items-center rounded-full border border-[#2f3137] bg-[#16171b]">
            <SearchIcon />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-[#2f3137] bg-[#16171b]">
            <MenuIcon />
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center gap-8 px-4 py-12">
        <div className="flex items-center gap-2 text-base font-semibold text-[#97d86d]">
          <CheckIcon />
          <span>{progress.current}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{progress.total}</span>
        </div>

        <section className="w-full max-w-3xl rounded-xl bg-card text-textMain shadow-card">
          <div className="flex items-center justify-between border-b border-[#e7e7ec] px-5 py-4 text-sm font-semibold text-textMain">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-textMain">
              <SoundIcon />
            </div>
            <span className="text-gray-400">학습중...</span>
          </div>

          <div className="flex flex-col items-center px-10 pb-10 pt-2">
            <h1 className="mt-4 mb-7 text-center text-[32px] font-bold leading-tight text-textMain">
              announcement
            </h1>

            <div className="w-full">
              <input
                className="w-full rounded-md border border-[#a79ce2] px-4 py-3 text-sm text-textMain placeholder:text-[#a0a0b2] focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="정답은 줄바꿈 없이 1줄로 입력하세요."
              />
            </div>

            <button className="mt-3 text-sm font-bold text-primary transition hover:opacity-80">
              힌트보기
            </button>
          </div>
        </section>

        <div className="flex flex-col items-center gap-2">
          <button className="rounded-lg bg-primary px-16 py-3 text-lg font-bold text-white transition hover:opacity-90">
            확인
          </button>
          <span className="text-xs font-bold text-gray-500">ENTER</span>
        </div>
      </main>
    </div>
  )
}
