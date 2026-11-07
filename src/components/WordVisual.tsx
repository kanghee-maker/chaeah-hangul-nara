'use client';

import { useState } from 'react';
import { WordItem } from '@/data/words';

interface WordVisualProps {
  item: WordItem;
  size?: 'md' | 'lg';
}

export default function WordVisual({ item, size = 'lg' }: WordVisualProps) {
  const [imgError, setImgError] = useState(false);

  const containerSize =
    size === 'lg'
      ? 'w-64 h-64 sm:w-72 sm:h-72'
      : 'w-48 h-48 sm:w-56 sm:h-56';

  // 색깔 카테고리 전용: 입체 물감 스플래시 & 크레파스 일러스트 카드
  if (item.category === '색깔' && item.colorHex) {
    const isWhite = item.colorHex.toUpperCase() === '#FFFFFF';
    return (
      <div className="flex flex-col items-center">
        <div
          className={`${containerSize} relative rounded-3xl shadow-xl border-4 border-white overflow-hidden flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105`}
          style={{
            background: isWhite
              ? 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)'
              : `radial-gradient(circle at 30% 30%, ${item.colorSecondaryHex || item.colorHex}44, #ffffff 85%)`
          }}
        >
          {/* 물감 스플래시 SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-40 h-40 sm:w-44 sm:h-44 drop-shadow-lg"
          >
            <path
              d="M105,22 C125,18 140,38 158,48 C176,58 190,74 186,96 C182,118 164,132 152,150 C140,168 126,186 102,184 C78,182 60,164 42,150 C24,136 12,118 16,95 C20,72 42,60 58,44 C74,28 85,26 105,22 Z"
              fill={item.colorHex}
              stroke={isWhite ? '#94a3b8' : '#ffffff'}
              strokeWidth="6"
            />
            {/* 물감 방울들 */}
            <circle
              cx="35"
              cy="42"
              r="10"
              fill={item.colorHex}
              stroke={isWhite ? '#94a3b8' : '#ffffff'}
              strokeWidth="3"
            />
            <circle
              cx="168"
              cy="38"
              r="8"
              fill={item.colorHex}
              stroke={isWhite ? '#94a3b8' : '#ffffff'}
              strokeWidth="3"
            />
            <circle
              cx="172"
              cy="158"
              r="11"
              fill={item.colorHex}
              stroke={isWhite ? '#94a3b8' : '#ffffff'}
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="160"
              r="7"
              fill={item.colorHex}
              stroke={isWhite ? '#94a3b8' : '#ffffff'}
              strokeWidth="2.5"
            />
            {/* 반짝이는 하이라이트 */}
            <ellipse
              cx="78"
              cy="68"
              rx="22"
              ry="12"
              transform="rotate(-25 78 68)"
              fill={isWhite ? '#f8fafc' : 'rgba(255,255,255,0.45)'}
            />
            <circle
              cx="60"
              cy="88"
              r="6"
              fill={isWhite ? '#f8fafc' : 'rgba(255,255,255,0.45)'}
            />
          </svg>

          {/* 같은 색깔 사물 예시 배지 */}
          {item.colorExamples && (
            <div className="mt-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-gray-700 shadow-sm border border-purple-100">
              {item.colorExamples}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 일반 카테고리: 실제 웹 이미지 카드
  return (
    <div className="flex flex-col items-center">
      <div
        className={`${containerSize} relative rounded-3xl shadow-xl border-4 border-purple-100 bg-gradient-to-br from-white via-pink-50/40 to-purple-50/60 overflow-hidden flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105`}
      >
        {item.image && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-2xl select-none"
            draggable={false}
          />
        ) : (
          <div className="text-8xl select-none">{item.emoji}</div>
        )}

        {/* 우측 상단 귀여운 이모지 뱃지 */}
        <div
          className="absolute top-2.5 right-2.5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-xl border border-purple-100"
          title={item.category}
        >
          {item.emoji}
        </div>
      </div>
    </div>
  );
}
