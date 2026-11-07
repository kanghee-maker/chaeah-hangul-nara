'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react';

const LEVELS = [
  {
    id: 'easy',
    name: '🌱 1단계: 5까지의 수',
    badge: '입문 (쉬움)',
    description: '1부터 5까지 손가락으로 쉽게 세어보며 계산해요!',
    emoji: '🐣',
    color: 'from-emerald-400 to-teal-500',
    hoverColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'normal',
    name: '🌿 2단계: 10까지의 수',
    badge: '5~6세 추천',
    description: '1부터 10까지 그림과 함께 재미있게 계산해요!',
    emoji: '🐰',
    color: 'from-blue-400 to-indigo-500',
    hoverColor: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'hard',
    name: '🌳 3단계: 20까지의 수',
    badge: '도전! 수학박사',
    description: '10이 넘는 큰 숫자도 멋지게 계산해봐요!',
    emoji: '🦁',
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'from-purple-600 to-pink-600'
  }
];

const QUESTION_COUNTS = [
  { label: '10문제 (추천)', value: 10 },
  { label: '15문제', value: 15 },
  { label: '20문제', value: 20 }
];

function MathSelectContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'add'; // add | sub | mix | blank
  const [questionCount, setQuestionCount] = useState<number>(10);

  const modeMeta: Record<string, { title: string; icon: string; desc: string }> = {
    add: {
      title: '신나는 덧셈 놀이',
      icon: '➕',
      desc: '귀여운 그림을 모아 더하기를 해볼까요?'
    },
    sub: {
      title: '재미있는 뺄셈 놀이',
      icon: '➖',
      desc: '그림에서 몇 개가 남는지 빼기를 해볼까요?'
    },
    mix: {
      title: '덧셈·뺄셈 종합 놀이',
      icon: '🎪',
      desc: '더하기와 빼기를 골고루 섞어서 풀어봐요!'
    },
    blank: {
      title: '빈칸 숫자 찾기',
      icon: '🔍',
      desc: '네모 칸 안에 숨어있는 숫자는 무엇일까요?'
    }
  };

  const currentMeta = modeMeta[mode] || modeMeta.add;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-blue-100 via-indigo-50 to-cyan-100">
      {/* 상단 탭 전환 바 */}
      <div className="mb-6 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md flex gap-2 border border-blue-100">
        <Link
          href="/?tab=hangul"
          className="px-6 py-2 rounded-full font-bold text-base text-purple-600 hover:bg-purple-50 transition-all"
        >
          🔤 한글
        </Link>
        <Link
          href="/?tab=math"
          className="px-6 py-2 rounded-full font-bold text-base bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
        >
          🔢 수학
        </Link>
      </div>

      {/* 헤더 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2 font-kids-jua">
          {currentMeta.icon} {currentMeta.title}
        </h1>
        <p className="text-lg text-indigo-600 font-medium">
          {currentMeta.desc}
        </p>
      </div>

      {/* 문제 수 선택 */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-2 border border-indigo-100">
        <span className="text-sm font-bold text-indigo-700 mr-2">
          🎲 한 판 문제 수:
        </span>
        {QUESTION_COUNTS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setQuestionCount(opt.value)}
            className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              questionCount === opt.value
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-105'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 난이도 선택 카드 */}
      <div className="grid grid-cols-1 gap-5 w-full max-w-xl mb-8">
        {LEVELS.map(level => (
          <Link
            key={level.id}
            href={`/math-game?mode=${mode}&level=${level.id}&count=${questionCount}`}
            className={`bg-gradient-to-r ${level.color} hover:${level.hoverColor} text-white font-bold p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-5`}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/90 shadow-inner flex-shrink-0 flex items-center justify-center text-5xl border-2 border-white">
              {level.emoji}
            </div>
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-2xl font-bold font-kids-jua">
                  {level.name}
                </span>
                <span className="text-xs bg-white/25 px-3 py-0.5 rounded-full font-semibold">
                  {level.badge}
                </span>
              </div>
              <div className="text-sm opacity-95 font-normal">
                {level.description}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 홈으로 가기 */}
      <Link
        href="/?tab=math"
        className="bg-white/90 hover:bg-white text-indigo-700 font-bold py-3 px-6 rounded-full shadow-md transition-all"
      >
        ← 채아의 수학 나라 홈으로
      </Link>
    </div>
  );
}

export default function MathSelectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">로딩 중...</div>
        </div>
      }
    >
      <MathSelectContent />
    </Suspense>
  );
}
