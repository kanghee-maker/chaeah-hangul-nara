'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { CATEGORY_LIST, WORDS } from '@/data/words';

const QUESTION_COUNTS = [
  { label: '10문제 (추천)', value: 10 },
  { label: '15문제', value: 15 },
  { label: '전체 다 풀기', value: 0 }
];

function CategorySelectContent() {
  const searchParams = useSearchParams();
  const gameType = searchParams.get('game') || '1';
  const [questionCount, setQuestionCount] = useState<number>(10);

  const gameTitle =
    gameType === '1'
      ? '이름 맞히기'
      : gameType === '2'
      ? '빈칸 채우기'
      : '그림 단어장';
  const gameIcon =
    gameType === '1' ? '🎯' : gameType === '2' ? '✏️' : '📖';

  const getCategoryWordCount = (categoryName: string) => {
    if (categoryName === '모든 카테고리') return WORDS.length;
    return WORDS.filter(w => w.category === categoryName).length;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
      {/* 상단 탭 전환 바 */}
      <div className="mb-6 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md flex gap-2 border border-purple-100">
        <Link
          href="/?tab=hangul"
          className="px-6 py-2 rounded-full font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm"
        >
          🔤 한글
        </Link>
        <Link
          href="/?tab=math"
          className="px-6 py-2 rounded-full font-bold text-base text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          🔢 수학
        </Link>
      </div>

      {/* 헤더 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2 font-kids-jua">
          {gameIcon} {gameTitle}
        </h1>
        <p className="text-lg text-purple-600 font-medium">
          어떤 주제로 한글 놀이를 해볼까요? 🤔
        </p>
      </div>

      {/* 문제 수 선택 (게임 1, 2일 때) */}
      {(gameType === '1' || gameType === '2') && (
        <div className="mb-8 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-2 border border-purple-100">
          <span className="text-sm font-bold text-purple-700 mr-2">
            🎲 한 판 문제 수:
          </span>
          {QUESTION_COUNTS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setQuestionCount(opt.value)}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                questionCount === opt.value
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md scale-105'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* 카테고리 선택 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl mb-8">
        {CATEGORY_LIST.map(category => {
          const count = getCategoryWordCount(category.name);
          const countParam =
            questionCount > 0 ? `&count=${questionCount}` : '&count=all';
          return (
            <Link
              key={category.name}
              href={`/game${gameType}?category=${encodeURIComponent(
                category.name
              )}${countParam}`}
              className={`group relative bg-gradient-to-r ${category.color} hover:${category.hoverColor} text-white font-bold p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-4 overflow-hidden`}
            >
              {/* 좌측 썸네일 이미지 또는 이모지 */}
              <div className="w-20 h-20 rounded-2xl bg-white/90 shadow-inner flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white">
                {category.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={category.coverImage}
                    alt={category.name}
                    className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-5xl">{category.emoji}</span>
                )}
              </div>

              {/* 우측 텍스트 설명 */}
              <div className="text-left flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold">{category.name}</span>
                  <span className="text-xs bg-white/25 px-2.5 py-0.5 rounded-full font-semibold">
                    {count}단어
                  </span>
                </div>
                <div className="text-sm opacity-95 font-normal leading-snug">
                  {category.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 홈 버튼 */}
      <Link
        href="/"
        className="bg-white/80 hover:bg-white text-purple-700 font-bold py-3 px-6 rounded-full shadow-md transition-all"
      >
        ← 홈으로 가기
      </Link>
    </div>
  );
}

export default function CategorySelect() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">로딩 중...</div>
        </div>
      }
    >
      <CategorySelectContent />
    </Suspense>
  );
}
