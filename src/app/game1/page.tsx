'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  WORDS,
  WordItem,
  shuffleArray,
  generateNameOptions,
  speakKorean
} from '@/data/words';
import WordVisual from '@/components/WordVisual';

function Game1Content() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '모든 카테고리';
  const countParam = searchParams.get('count') || '10';

  const [gameItems, setGameItems] = useState<WordItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // 효과음을 위한 ref
  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const wrongSoundRef = useRef<HTMLAudioElement>(null);

  const initGame = useCallback(() => {
    const pool =
      selectedCategory && selectedCategory !== '모든 카테고리'
        ? WORDS.filter(item => item.category === selectedCategory)
        : WORDS;

    const shuffled = shuffleArray(pool);
    const limit =
      countParam === 'all'
        ? shuffled.length
        : Math.min(parseInt(countParam, 10) || 10, shuffled.length);
    const selected = shuffled.slice(0, limit);

    setGameItems(selected);
    setCurrentItemIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);

    if (selected.length > 0) {
      setShuffledOptions(generateNameOptions(selected[0], 4));
    }
  }, [selectedCategory, countParam]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const currentItem = gameItems[currentItemIndex];

  const playCorrectSound = () => {
    if (correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch(error => {
        console.log('정답 효과음 재생 실패:', error);
      });
    }
  };

  const playWrongSound = () => {
    if (wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch(error => {
        console.log('오답 효과음 재생 실패:', error);
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult || !currentItem) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentItem.name) {
      setScore(prev => prev + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }

    // 잠시 후 단어 발음 읽어주기
    setTimeout(() => {
      speakKorean(currentItem.name);
    }, 350);
  };

  const handleNext = () => {
    if (currentItemIndex < gameItems.length - 1) {
      const nextIndex = currentItemIndex + 1;
      setCurrentItemIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setShuffledOptions(generateNameOptions(gameItems[nextIndex], 4));
    } else {
      setGameComplete(true);
    }
  };

  if (gameItems.length === 0 || !currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-purple-700">
          문제를 준비하고 있어요... 🌟
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const totalCount = gameItems.length;
    const correctCount = score;
    const percent = Math.round((correctCount / Math.max(totalCount, 1)) * 100);
    const medal =
      percent >= 90
        ? '🥇'
        : percent >= 70
        ? '🥈'
        : percent >= 50
        ? '🥉'
        : '🎖️';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">{medal}</div>
          <h2 className="text-3xl font-bold text-purple-800 mb-4 font-kids-jua">
            참 잘했어요! 🎉
          </h2>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-purple-700">
              총 <span className="font-bold">{totalCount}</span>문제 중,{' '}
              <span className="font-bold">{correctCount}</span>문제를 맞혔어요!
            </p>
            <p className="text-2xl font-bold text-purple-800">
              점수: <span className="text-pink-500">{percent}</span> / 100
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={initGame}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              🔄 새로운 문제로 다시 하기
            </button>
            <Link
              href="/category-select?game=1"
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              📚 다른 주제 고르기
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              🏠 홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-pink-100 to-purple-100">
      {/* 효과음 */}
      <audio ref={correctSoundRef} src="/good.m4a" preload="auto" />
      <audio ref={wrongSoundRef} src="/wrong.m4a" preload="auto" />

      {/* 상단 상태바 */}
      <div className="mb-5 text-center w-full max-w-md">
        <div className="flex items-center justify-between text-purple-700 font-bold mb-1.5 px-2">
          <span className="bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm">
            {currentItem.emoji} {currentItem.category}
          </span>
          <span className="text-lg">
            {currentItemIndex + 1} / {gameItems.length}
          </span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm text-pink-600">
            ⭐ {score}점
          </span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentItemIndex + 1) / gameItems.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* 게임 카드 영역 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center w-full max-w-xl game-card">
        {/* 좌측: 실제 웹 사진 / 시각 카드 + 힌트 */}
        <div className="game-visual mb-6 flex flex-col items-center">
          <WordVisual item={currentItem} size="lg" />

          <p className="text-xl text-purple-800 font-bold mt-4 font-kids-jua">
            이 그림의 이름은 무엇일까요?
          </p>

          {/* 친절한 힌트 & 음성 듣기 버튼 */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
              💡 {currentItem.hint}
            </span>
            <button
              type="button"
              onClick={() =>
                speakKorean(showResult ? currentItem.name : currentItem.hint)
              }
              className="bg-pink-100 hover:bg-pink-200 text-pink-700 text-sm font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1"
              title="소리로 듣기"
            >
              🔊 {showResult ? '단어 듣기' : '힌트 듣기'}
            </button>
          </div>
        </div>

        {/* 우측: 선택지 + 결과 + 다음 */}
        <div className="game-interact flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-3.5 mb-6">
            {shuffledOptions.map((option, index) => {
              let buttonClass =
                'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-4 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer';

              if (showResult) {
                if (option === currentItem.name) {
                  buttonClass =
                    'bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-4 px-4 rounded-2xl text-xl shadow-lg ring-4 ring-green-200 scale-105';
                } else if (
                  option === selectedAnswer &&
                  option !== currentItem.name
                ) {
                  buttonClass =
                    'bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold py-4 px-4 rounded-2xl text-xl shadow-lg';
                } else {
                  buttonClass =
                    'bg-gray-200 text-gray-400 font-bold py-4 px-4 rounded-2xl text-xl';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* 결과 표시 */}
          {showResult && (
            <div className="mb-5 bg-purple-50/80 rounded-2xl p-4 border border-purple-100">
              {selectedAnswer === currentItem.name ? (
                <div className="text-2xl text-green-600 font-bold font-kids-jua">
                  정답이에요! &ldquo;{currentItem.name}&rdquo; 🎉
                </div>
              ) : (
                <div className="text-xl text-red-600 font-bold font-kids-jua">
                  아쉬워요! 정답은 &ldquo;{currentItem.name}&rdquo;이에요 😊
                </div>
              )}
              <button
                type="button"
                onClick={() => speakKorean(currentItem.name, 0.85)}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 bg-white px-3.5 py-1.5 rounded-full shadow-sm hover:bg-purple-100 cursor-pointer"
              >
                🔊 &ldquo;{currentItem.name}&rdquo; 발음 다시 듣기
              </button>
            </div>
          )}

          {/* 다음 버튼 */}
          {showResult && (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {currentItemIndex < gameItems.length - 1
                ? '다음 문제 →'
                : '결과 보기 🏆'}
            </button>
          )}
        </div>
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/category-select?game=1"
          className="text-purple-700 hover:text-purple-900 font-bold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm"
        >
          ← 카테고리 선택
        </Link>
        <Link
          href="/"
          className="text-purple-700 hover:text-purple-900 font-bold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm"
        >
          🏠 홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default function Game1() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">로딩 중...</div>
        </div>
      }
    >
      <Game1Content />
    </Suspense>
  );
}
