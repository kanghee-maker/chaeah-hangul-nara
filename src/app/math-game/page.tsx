'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { shuffleArray } from '@/data/words';

interface CountingTheme {
  name: string;
  unit: string;
  emoji: string;
  image: string;
}

const COUNTING_THEMES: CountingTheme[] = [
  { name: '사과', unit: '개', emoji: '🍎', image: '/words/apple.jpg' },
  { name: '딸기', unit: '개', emoji: '🍓', image: '/words/strawberry.jpg' },
  { name: '바나나', unit: '개', emoji: '🍌', image: '/words/banana.jpg' },
  { name: '체리', unit: '개', emoji: '🍒', image: '/words/cherry.jpg' },
  { name: '오렌지', unit: '개', emoji: '🍊', image: '/words/orange.jpg' },
  { name: '도넛', unit: '개', emoji: '🍩', image: '/words/donut.jpg' },
  { name: '케이크', unit: '개', emoji: '🍰', image: '/words/cake.jpg' },
  { name: '아이스크림', unit: '개', emoji: '🍦', image: '/words/ice_cream.jpg' },
  { name: '강아지', unit: '마리', emoji: '🐶', image: '/words/puppy.jpg' },
  { name: '토끼', unit: '마리', emoji: '🐰', image: '/words/rabbit.jpg' },
  { name: '판다', unit: '마리', emoji: '🐼', image: '/words/panda.jpg' },
  { name: '나비', unit: '마리', emoji: '🦋', image: '/words/butterfly.jpg' },
  { name: '자동차', unit: '대', emoji: '🚗', image: '/words/car.jpg' },
  { name: '곰인형', unit: '개', emoji: '🧸', image: '/words/teddy_bear.jpg' }
];

interface MathProblem {
  op: '+' | '-';
  a: number;
  b: number;
  result: number;
  blankPos: 'result' | 'b'; // 일반 연산은 result(?), 빈칸 찾기는 b(?)
  answer: number;
  options: number[];
  theme: CountingTheme;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOptions(answer: number, maxVal: number): number[] {
  const set = new Set<number>([answer]);
  const candidates: number[] = [];

  for (let delta = -4; delta <= 4; delta++) {
    if (delta === 0) continue;
    const v = answer + delta;
    if (v >= 0 && v <= Math.max(maxVal + 3, 10)) {
      candidates.push(v);
    }
  }

  for (const c of shuffleArray(candidates)) {
    if (set.size >= 4) break;
    set.add(c);
  }

  let fallback = 0;
  while (set.size < 4) {
    if (!set.has(fallback)) set.add(fallback);
    fallback++;
  }

  return shuffleArray(Array.from(set));
}

function createMathProblem(mode: string, level: string): MathProblem {
  const maxNumber = level === 'easy' ? 5 : level === 'normal' ? 10 : 20;
  const theme =
    COUNTING_THEMES[Math.floor(Math.random() * COUNTING_THEMES.length)];

  let op: '+' | '-' = '+';
  if (mode === 'sub') {
    op = '-';
  } else if (mode === 'mix' || mode === 'blank') {
    op = Math.random() < 0.5 ? '+' : '-';
  }

  let a = 1;
  let b = 1;
  let result = 2;

  if (op === '+') {
    const minSum = level === 'hard' ? 6 : 2;
    result = randInt(minSum, maxNumber);
    a = randInt(1, result - 1);
    b = result - a;
  } else {
    const minA = level === 'hard' ? 6 : 2;
    a = randInt(minA, maxNumber);
    b = randInt(1, a - 1);
    result = a - b;
  }

  const blankPos: 'result' | 'b' = mode === 'blank' ? 'b' : 'result';
  const answer = blankPos === 'b' ? b : result;
  const options = generateOptions(answer, maxNumber);

  return {
    op,
    a,
    b,
    result,
    blankPos,
    answer,
    options,
    theme
  };
}

function MathGameContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'add';
  const level = searchParams.get('level') || 'normal';
  const countParam = parseInt(searchParams.get('count') || '10', 10) || 10;

  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [countedIndex, setCountedIndex] = useState<number | null>(null);

  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const wrongSoundRef = useRef<HTMLAudioElement>(null);

  const initGame = useCallback(() => {
    const list: MathProblem[] = [];
    for (let i = 0; i < countParam; i++) {
      list.push(createMathProblem(mode, level));
    }
    setProblems(list);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
    setCountedIndex(null);
  }, [mode, level, countParam]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const current = problems[currentIndex];

  const playCorrectSound = () => {
    if (correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch(err => console.log(err));
    }
  };

  const playWrongSound = () => {
    if (wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch(err => console.log(err));
    }
  };

  const handleSelect = (option: number) => {
    if (showResult || !current) return;
    setSelectedAnswer(option);
    setShowResult(true);

    if (option === current.answer) {
      setScore(prev => prev + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setCountedIndex(null);
    } else {
      setGameComplete(true);
    }
  };

  const handleTapCountItem = (num: number) => {
    setCountedIndex(num);
  };

  if (problems.length === 0 || !current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-2xl font-bold text-indigo-700">
          수학 문제를 준비하고 있어요... 🧮
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const totalCount = problems.length;
    const percent = Math.round((score / Math.max(totalCount, 1)) * 100);
    const medal =
      percent >= 90
        ? '🥇'
        : percent >= 70
        ? '🥈'
        : percent >= 50
        ? '🥉'
        : '🎖️';

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">{medal}</div>
          <h2 className="text-3xl font-bold text-indigo-800 mb-4 font-kids-jua">
            수학 놀이 완료! 🎉
          </h2>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-indigo-700">
              총 <span className="font-bold">{totalCount}</span>문제 중,{' '}
              <span className="font-bold">{score}</span>문제를 맞혔어요!
            </p>
            <p className="text-2xl font-bold text-indigo-800">
              점수: <span className="text-blue-600">{percent}</span> / 100
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={initGame}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              🔄 새로운 문제로 다시 하기
            </button>
            <Link
              href={`/math-select?mode=${mode}`}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              🌱 난이도 다시 고르기
            </Link>
            <Link
              href="/?tab=math"
              className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              🏠 채아의 수학 나라 홈으로
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 시각적 아이템 렌더링
  const renderVisualCounting = () => {
    const { op, a, b, theme } = current;

    if (op === '+') {
      return (
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            {/* 왼쪽 묶음 (a개) */}
            <div className="bg-blue-50/90 border-2 border-blue-200 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-1.5 max-w-xs shadow-sm">
              {Array.from({ length: a }).map((_, idx) => {
                const countNum = idx + 1;
                return (
                  <button
                    key={`a-${idx}`}
                    type="button"
                    onClick={() => handleTapCountItem(countNum)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm border border-blue-100 p-1 flex items-center justify-center transition-transform cursor-pointer hover:scale-110 ${
                      countedIndex === countNum
                        ? 'ring-3 ring-pink-400 scale-110'
                        : ''
                    }`}
                    title={`${countNum}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
              <div className="w-full text-center text-xs font-bold text-blue-700 mt-1">
                {theme.name} {a}
                {theme.unit}
              </div>
            </div>

            <div className="text-3xl font-extrabold text-indigo-500">+</div>

            {/* 오른쪽 묶음 (b개) */}
            <div className="bg-pink-50/90 border-2 border-pink-200 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-1.5 max-w-xs shadow-sm">
              {Array.from({ length: b }).map((_, idx) => {
                const countNum = a + idx + 1;
                return (
                  <button
                    key={`b-${idx}`}
                    type="button"
                    onClick={() => handleTapCountItem(countNum)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm border border-pink-100 p-1 flex items-center justify-center transition-transform cursor-pointer hover:scale-110 ${
                      countedIndex === countNum
                        ? 'ring-3 ring-pink-400 scale-110'
                        : ''
                    }`}
                    title={`${countNum}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
              <div className="w-full text-center text-xs font-bold text-pink-700 mt-1">
                {current.blankPos === 'b' && !showResult ? '?' : b}
                {theme.unit}
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-indigo-500 font-medium">
            그림을 하나씩 세어보며 정답을 찾아보세요!
          </p>
        </div>
      );
    }

    // 뺄셈 (a개 중 b개를 점선/X 표시해서 남은 개수를 한눈에 볼 수 있게)
    return (
      <div className="w-full flex flex-col items-center gap-3">
        <div className="bg-indigo-50/80 border-2 border-indigo-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-center gap-2 max-w-md shadow-sm">
          {Array.from({ length: a }).map((_, idx) => {
            const isRemoved = idx >= a - b;
            const countNum = idx + 1;
            return (
              <button
                key={`sub-${idx}`}
                type="button"
                onClick={() => handleTapCountItem(countNum)}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex items-center justify-center transition-all cursor-pointer ${
                  isRemoved
                    ? 'opacity-45 border-2 border-dashed border-red-400 scale-95'
                    : 'shadow-sm border-2 border-indigo-200 hover:scale-110'
                } ${
                  countedIndex === countNum ? 'ring-3 ring-blue-400 scale-110' : ''
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-full object-contain"
                />
                {isRemoved && (
                  <span className="absolute inset-0 flex items-center justify-center text-red-600 font-extrabold text-2xl drop-shadow">
                    ✕
                  </span>
                )}
              </button>
            );
          })}
          <div className="w-full text-center text-xs font-bold text-indigo-700 mt-1">
            전체 {a}
            {theme.unit} 중에서{' '}
            <span className="text-red-500">
              {current.blankPos === 'b' && !showResult ? '?' : b}
              {theme.unit}를 뺐어요!
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-indigo-500 font-medium">
          남아있는 그림이 몇 개인지 세어보세요!
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-blue-100 via-indigo-50 to-cyan-100">
      {/* 효과음 */}
      <audio ref={correctSoundRef} src="/good.m4a" preload="auto" />
      <audio ref={wrongSoundRef} src="/wrong.m4a" preload="auto" />

      {/* 상단 진행바 */}
      <div className="mb-5 text-center w-full max-w-md">
        <div className="flex items-center justify-between text-indigo-800 font-bold mb-1.5 px-2">
          <span className="bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm">
            {current.theme.emoji} {current.theme.name} 세기
          </span>
          <span className="text-lg">
            {currentIndex + 1} / {problems.length}
          </span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-sm shadow-sm text-blue-600">
            ⭐ {score}점
          </span>
        </div>
        <div className="w-full bg-indigo-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / problems.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* 메인 게임 카드 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center w-full max-w-xl">
        {/* 시각적 그림 세기 영역 */}
        <div className="mb-6 flex flex-col items-center">
          {renderVisualCounting()}

          {/* 수식 타일 표시 */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {/* 숫자 A */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-md">
              {current.a}
            </div>

            {/* 연산 기호 */}
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 px-1">
              {current.op === '+' ? '+' : '−'}
            </div>

            {/* 숫자 B (또는 빈칸) */}
            {current.blankPos === 'b' ? (
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-md ${
                  showResult
                    ? selectedAnswer === current.answer
                      ? 'bg-green-500 text-white ring-4 ring-green-200 scale-110'
                      : 'bg-red-500 text-white'
                    : 'bg-yellow-100 border-3 border-dashed border-amber-400 text-amber-600 animate-pulse'
                }`}
              >
                {showResult ? current.b : '?'}
              </div>
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-md">
                {current.b}
              </div>
            )}

            {/* 등호 */}
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-700 px-1">
              =
            </div>

            {/* 결과 숫자 (또는 빈칸) */}
            {current.blankPos === 'result' ? (
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-md ${
                  showResult
                    ? selectedAnswer === current.answer
                      ? 'bg-green-500 text-white ring-4 ring-green-200 scale-110'
                      : 'bg-red-500 text-white'
                    : 'bg-yellow-100 border-3 border-dashed border-amber-400 text-amber-600 animate-pulse'
                }`}
              >
                {showResult ? current.result : '?'}
              </div>
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-md">
                {current.result}
              </div>
            )}
          </div>
        </div>

        {/* 4지선다 숫자 버튼 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          {current.options.map((option, idx) => {
            let buttonClass =
              'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold py-4 px-4 rounded-2xl text-3xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer';

            if (showResult) {
              if (option === current.answer) {
                buttonClass =
                  'bg-gradient-to-br from-green-400 to-emerald-500 text-white font-extrabold py-4 px-4 rounded-2xl text-3xl shadow-lg ring-4 ring-green-200 scale-105';
              } else if (
                option === selectedAnswer &&
                option !== current.answer
              ) {
                buttonClass =
                  'bg-gradient-to-br from-red-400 to-rose-500 text-white font-extrabold py-4 px-4 rounded-2xl text-3xl shadow-lg';
              } else {
                buttonClass =
                  'bg-gray-200 text-gray-400 font-extrabold py-4 px-4 rounded-2xl text-3xl';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={buttonClass}
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* 결과 메시지 */}
        {showResult && (
          <div className="mb-5 bg-indigo-50/90 rounded-2xl p-4 border border-indigo-100">
            {selectedAnswer === current.answer ? (
              <div className="text-2xl text-green-600 font-bold font-kids-jua">
                정답이에요! {current.a} {current.op === '+' ? '+' : '−'}{' '}
                {current.b} = {current.result} 🎉
              </div>
            ) : (
              <div className="text-xl text-red-600 font-bold font-kids-jua">
                아쉬워요! 정답은 &ldquo;{current.answer}&rdquo;이에요! ({current.a}{' '}
                {current.op === '+' ? '+' : '−'} {current.b} = {current.result}){' '}
                😊
              </div>
            )}
          </div>
        )}

        {/* 다음 문제 버튼 */}
        {showResult && (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {currentIndex < problems.length - 1
              ? '다음 문제 →'
              : '결과 보기 🏆'}
          </button>
        )}
      </div>

      {/* 하단 네비게이션 */}
      <div className="mt-6 flex gap-4">
        <Link
          href={`/math-select?mode=${mode}`}
          className="text-indigo-700 hover:text-indigo-900 font-bold text-base bg-white/80 px-4 py-2 rounded-full shadow-sm"
        >
          ← 난이도 선택
        </Link>
        <Link
          href="/?tab=math"
          className="text-indigo-700 hover:text-indigo-900 font-bold text-base bg-white/80 px-4 py-2 rounded-full shadow-sm"
        >
          🏠 수학 나라 홈으로
        </Link>
      </div>
    </div>
  );
}

export default function MathGamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">로딩 중...</div>
        </div>
      }
    >
      <MathGameContent />
    </Suspense>
  );
}
