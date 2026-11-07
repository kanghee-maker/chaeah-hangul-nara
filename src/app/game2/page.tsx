'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  WORDS,
  WordItem,
  shuffleArray,
  generateBlankPuzzle
} from '@/data/words';
import WordVisual from '@/components/WordVisual';

interface PuzzleState {
  item: WordItem;
  blankIndex: number;
  missingChar: string;
  options: string[];
}

function Game2Content() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '모든 카테고리';
  const countParam = searchParams.get('count') || '10';

  const [puzzles, setPuzzles] = useState<PuzzleState[]>([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // 효과음을 위한 ref
  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const wrongSoundRef = useRef<HTMLAudioElement>(null);

  const initGame = useCallback(() => {
    const pool =
      selectedCategory && selectedCategory !== '모든 카테고리'
        ? WORDS.filter(item => item.category === selectedCategory)
        : WORDS;

    // 2글자 이상 단어를 우선 배치하여 빈칸 채우기 재미를 높임
    const multiCharPool = pool.filter(w => w.name.length >= 2);
    const basePool = multiCharPool.length >= 6 ? multiCharPool : pool;

    const shuffled = shuffleArray(basePool);
    const limit =
      countParam === 'all'
        ? shuffled.length
        : Math.min(parseInt(countParam, 10) || 10, shuffled.length);

    const generated = shuffled.slice(0, limit).map(item => ({
      item,
      ...generateBlankPuzzle(item)
    }));

    setPuzzles(generated);
    setCurrentPuzzleIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  }, [selectedCategory, countParam]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const currentPuzzle = puzzles[currentPuzzleIndex];

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
    if (showResult || !currentPuzzle) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentPuzzle.missingChar) {
      setScore(prev => prev + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  if (puzzles.length === 0 || !currentPuzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-700">
          문제를 준비하고 있어요... ✏️
        </div>
      </div>
    );
  }

  const renderDisplayText = () => {
    const chars = currentPuzzle.item.name.split('');
    return chars.map((char, index) => {
      if (index === currentPuzzle.blankIndex) {
        if (showResult && selectedAnswer) {
          const isCorrect = selectedAnswer === currentPuzzle.missingChar;
          return (
            <span
              key={index}
              className={`inline-flex w-14 h-14 mx-1 rounded-2xl items-center justify-center text-3xl font-bold shadow-md transition-all ${
                isCorrect
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white ring-4 ring-green-200 scale-110'
                  : 'bg-gradient-to-br from-red-400 to-rose-500 text-white'
              }`}
            >
              {isCorrect ? selectedAnswer : currentPuzzle.missingChar}
            </span>
          );
        }
        return (
          <span
            key={index}
            className="inline-flex w-14 h-14 mx-1 bg-yellow-100 border-3 border-dashed border-amber-400 rounded-2xl items-center justify-center text-3xl font-bold text-amber-600 animate-pulse"
          >
            ?
          </span>
        );
      }
      return (
        <span
          key={index}
          className="inline-flex w-14 h-14 mx-1 bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl items-center justify-center text-3xl font-bold shadow-md"
        >
          {char}
        </span>
      );
    });
  };

  if (gameComplete) {
    const totalCount = puzzles.length;
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
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">{medal}</div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4 font-kids-jua">
            참 잘했어요! 🎉
          </h2>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-blue-700">
              총 <span className="font-bold">{totalCount}</span>문제 중,{' '}
              <span className="font-bold">{correctCount}</span>문제를 맞혔어요!
            </p>
            <p className="text-2xl font-bold text-blue-800">
              점수: <span className="text-green-600">{percent}</span> / 100
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={initGame}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              🔄 새로운 문제로 다시 하기
            </button>
            <Link
              href="/category-select?game=2"
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              📚 다른 주제 고르기
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              🏠 홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-green-100 to-blue-100">
      {/* 효과음 */}
      <audio ref={correctSoundRef} src="/good.m4a" preload="auto" />
      <audio ref={wrongSoundRef} src="/wrong.m4a" preload="auto" />

      {/* 상단 진행 상황 */}
      <div className="mb-5 text-center w-full max-w-md">
        <div className="flex items-center justify-between text-blue-700 font-bold mb-1.5 px-2">
          <span className="bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm">
            {currentPuzzle.item.emoji} {currentPuzzle.item.category}
          </span>
          <span className="text-lg">
            {currentPuzzleIndex + 1} / {puzzles.length}
          </span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm text-emerald-600">
            ⭐ {score}점
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentPuzzleIndex + 1) / puzzles.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* 게임 카드 영역 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center w-full max-w-xl game-card">
        {/* 좌측: 실제 웹 사진 + 빈칸 단어 타일 */}
        <div className="game-visual mb-6 flex flex-col items-center">
          <WordVisual item={currentPuzzle.item} size="md" />

          <div className="mt-4 flex items-center justify-center">
            <p className="text-lg text-blue-700 font-bold font-kids-jua">
              빈칸에 들어갈 글자를 찾아보세요!
            </p>
          </div>

          <div className="mt-4 flex justify-center items-center flex-wrap gap-y-2">
            {renderDisplayText()}
          </div>
        </div>

        {/* 우측: 글자 선택지 + 결과 + 다음 */}
        <div className="game-interact flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-3.5 mb-6">
            {currentPuzzle.options.map((option, index) => {
              let buttonClass =
                'bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white font-bold py-4 px-4 rounded-2xl text-2xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer';

              if (showResult) {
                if (option === currentPuzzle.missingChar) {
                  buttonClass =
                    'bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-4 px-4 rounded-2xl text-2xl shadow-lg ring-4 ring-green-200 scale-105';
                } else if (
                  option === selectedAnswer &&
                  option !== currentPuzzle.missingChar
                ) {
                  buttonClass =
                    'bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold py-4 px-4 rounded-2xl text-2xl shadow-lg';
                } else {
                  buttonClass =
                    'bg-gray-200 text-gray-400 font-bold py-4 px-4 rounded-2xl text-2xl';
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
            <div className="mb-5 bg-blue-50/80 rounded-2xl p-4 border border-blue-100">
              {selectedAnswer === currentPuzzle.missingChar ? (
                <div className="text-2xl text-green-600 font-bold font-kids-jua">
                  정답이에요! 🎉
                </div>
              ) : (
                <div className="text-xl text-red-600 font-bold font-kids-jua">
                  아쉬워요! 정답은 &ldquo;{currentPuzzle.missingChar}&rdquo;이에요 😊
                </div>
              )}
              <div className="text-lg text-blue-700 mt-1">
                완성된 단어:{' '}
                <span className="font-bold text-xl">
                  {currentPuzzle.item.name}
                </span>
              </div>
            </div>
          )}

          {/* 다음 버튼 */}
          {showResult && (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {currentPuzzleIndex < puzzles.length - 1
                ? '다음 문제 →'
                : '결과 보기 🏆'}
            </button>
          )}
        </div>
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/category-select?game=2"
          className="text-blue-700 hover:text-blue-900 font-bold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm"
        >
          ← 카테고리 선택
        </Link>
        <Link
          href="/"
          className="text-blue-700 hover:text-blue-900 font-bold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm"
        >
          🏠 홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default function Game2() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">로딩 중...</div>
        </div>
      }
    >
      <Game2Content />
    </Suspense>
  );
}
