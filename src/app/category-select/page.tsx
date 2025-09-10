'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const categories = [
  {
    name: '과일',
    emoji: '🍎',
    description: '맛있는 과일들을 배워보세요!',
    color: 'from-red-400 to-pink-500',
    hoverColor: 'from-red-500 to-pink-600'
  },
  {
    name: '교통수단',
    emoji: '🚗',
    description: '다양한 탈것들을 알아보세요!',
    color: 'from-blue-400 to-indigo-500',
    hoverColor: 'from-blue-500 to-indigo-600'
  },
  {
    name: '색깔',
    emoji: '🌈',
    description: '예쁜 색깔들을 구분해보세요!',
    color: 'from-purple-400 to-pink-500',
    hoverColor: 'from-purple-500 to-pink-600'
  },
  {
    name: '모든 카테고리',
    emoji: '🎪',
    description: '모든 주제를 섞어서 게임해요!',
    color: 'from-green-400 to-teal-500',
    hoverColor: 'from-green-500 to-teal-600'
  }
];

function CategorySelectContent() {
  const searchParams = useSearchParams();
  const gameType = searchParams.get('game') || '1';
  const gameTitle = gameType === '1' ? '이름 맞히기' : '빈칸 채우기';
  const gameIcon = gameType === '1' ? '🎯' : '✏️';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 font-noto-sans-kr">
          {gameIcon} {gameTitle}
        </h1>
        <p className="text-lg text-purple-600 font-medium">
          어떤 주제로 게임할까요? 🤔
        </p>
      </div>

      {/* 카테고리 선택 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/game${gameType}?category=${encodeURIComponent(category.name)}`}
            className={`bg-gradient-to-r ${category.color} hover:${category.hoverColor} text-white font-bold py-8 px-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-all duration-200`}
          >
            <div className="text-6xl mb-4">{category.emoji}</div>
            <div className="text-xl font-bold mb-2">{category.name}</div>
            <div className="text-sm opacity-90">{category.description}</div>
          </Link>
        ))}
      </div>

      {/* 홈 버튼 */}
      <Link
        href="/"
        className="text-purple-600 hover:text-purple-800 font-medium text-lg"
      >
        ← 홈으로 가기
      </Link>
    </div>
  );
}

export default function CategorySelect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">로딩 중...</div>
      </div>
    }>
      <CategorySelectContent />
    </Suspense>
  );
}
