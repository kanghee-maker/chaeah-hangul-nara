'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORY_LIST, WORDS, speakKorean } from '@/data/words';
import WordVisual from '@/components/WordVisual';

export default function WordsBookPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('과일');

  const categoriesOnly = CATEGORY_LIST.filter(
    c => c.name !== '모든 카테고리'
  );

  const filteredWords =
    selectedCategory === '전체'
      ? WORDS
      : WORDS.filter(w => w.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 bg-gradient-to-br from-pink-100 via-purple-50 to-amber-50">
      {/* 상단 헤더 */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 font-kids-jua">
            📖 채아의 그림 단어장
          </h1>
          <p className="text-purple-600 text-sm sm:text-base mt-1">
            카드를 누르면 한글 발음과 설명을 들을 수 있어요! (총 {WORDS.length}개 단어)
          </p>
        </div>
        <Link
          href="/"
          className="bg-white hover:bg-purple-50 text-purple-700 font-bold py-2.5 px-5 rounded-full shadow-md transition-all"
        >
          ← 홈으로 가기
        </Link>
      </div>

      {/* 카테고리 탭 */}
      <div className="w-full max-w-6xl flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
        {categoriesOnly.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === cat.name
                ? `bg-gradient-to-r ${cat.color} text-white shadow-md scale-105`
                : 'bg-white text-purple-800 hover:bg-purple-100 shadow-sm'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory('전체')}
          className={`px-4 py-2 rounded-full font-bold text-sm sm:text-base transition-all cursor-pointer ${
            selectedCategory === '전체'
              ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md scale-105'
              : 'bg-white text-purple-800 hover:bg-purple-100 shadow-sm'
          }`}
        >
          🎪 전체 보기 ({WORDS.length})
        </button>
      </div>

      {/* 단어 카드 그리드 */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {filteredWords.map(item => (
          <div
            key={item.id}
            onClick={() => speakKorean(`${item.name}. ${item.hint}`, 0.9)}
            className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl border-2 border-purple-100 hover:border-pink-300 transition-all duration-200 flex flex-col items-center text-center cursor-pointer group"
          >
            <WordVisual item={item} size="md" />
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-900 font-kids-jua">
                {item.name}
              </span>
              <span className="bg-pink-100 group-hover:bg-pink-200 text-pink-700 text-xs font-bold px-2.5 py-1 rounded-full transition-colors">
                🔊 듣기
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-snug">
              {item.hint}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
