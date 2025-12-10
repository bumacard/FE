import { useNavigate } from 'react-router-dom'

const SpeedTest = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#0c141f] to-[#0b0f1d] px-6 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2ed99a] opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-[-60px] h-80 w-80 rounded-full bg-[#ff9e2c] opacity-10 blur-3xl" />
      </div>
      <div className="relative max-w-3xl space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2ed99a]">Speed test</p>
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">
          스피드테스트가 곧 준비됩니다.
        </h1>
        <p className="text-lg text-white/70">
          빠른 시간 안에 단어를 맞히는 연습을 곧 만나보세요. 그동안은 문제 풀기로 감을 유지하고
          데이터를 쌓아 두면 스피드테스트에 자동 반영됩니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white/90 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          >
            메인으로 돌아가기
          </button>
          <button
            onClick={() => navigate('/spell')}
            className="rounded-full bg-gradient-to-r from-[#2ed99a] via-[#f5d26c] to-[#ff9e2c] px-7 py-3 text-base font-bold text-[#0c0f14] shadow-[0_16px_40px_rgba(255,158,44,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(255,158,44,0.4)]"
          >
            문제 풀기 이동
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpeedTest
