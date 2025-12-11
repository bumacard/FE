import {ArrowLeftIcon} from "../../icon/index.js";

const SpellHeader = () => {
    return (
        <header className="flex h-12 items-center justify-between border-b border-[#2a2c32] bg-[#1b1c20] px-3">
            <a className="flex items-center text-gray-200" href="/words">
                <ArrowLeftIcon />
                <div className="text-sm font-semibold text-gray-200">학습종료</div>
            </a>
            <div className="text-center text-sm font-semibold text-gray-100">2학년 2학기 5회 영어 시험 대비</div>
            <div className="flex items-center gap-3 text-gray-300"></div>
        </header>
    )
}

export default SpellHeader;