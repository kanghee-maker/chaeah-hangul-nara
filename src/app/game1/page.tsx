'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Fruit {
  emoji: string;
  name: string;
  options: string[];
}

const fruits: Fruit[] = [
  {
    emoji: '🍎',
    name: '사과',
    options: ['사과', '바나나', '딸기']
  },
  {
    emoji: '🍌',
    name: '바나나',
    options: ['바나나', '사과', '포도']
  },
  {
    emoji: '🍓',
    name: '딸기',
    options: ['딸기', '사과', '바나나']
  },
  {
    emoji: '🍇',
    name: '포도',
    options: ['포도', '딸기', '사과']
  },
  {
    emoji: '🍊',
    name: '오렌지',
    options: ['오렌지', '사과', '바나나']
  },
  {
    emoji: '🍑',
    name: '복숭아',
    options: ['복숭아', '사과', '딸기']
  }
];

export default function Game1() {
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentFruit = fruits[currentFruitIndex];

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentFruit.name) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentFruitIndex < fruits.length - 1) {
      setCurrentFruitIndex(currentFruitIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentFruitIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-purple-800 mb-4">게임 완료!</h2>
          <p className="text-xl text-purple-600 mb-6">
            {score}개 맞혔어요! 정말 잘했어요! 👏
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              다시 하기
            </button>
            <Link
              href="/"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-100 to-purple-100">
      {/* 진행 상황 */}
      <div className="mb-6 text-center">
        <div className="text-lg text-purple-700 font-medium">
          {currentFruitIndex + 1} / {fruits.length}
        </div>
        <div className="w-64 bg-purple-200 rounded-full h-3 mt-2">
          <div 
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentFruitIndex + 1) / fruits.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 게임 영역 */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-lg w-full">
        {/* 과일 그림 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">{currentFruit.emoji}</div>
          <p className="text-xl text-purple-600 font-medium">
            이 과일의 이름은 무엇일까요?
          </p>
        </div>

        {/* 선택지 */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {currentFruit.options.map((option, index) => {
            let buttonClass = "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200";
            
            if (showResult) {
              if (option === currentFruit.name) {
                buttonClass = "bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg";
              } else if (option === selectedAnswer && option !== currentFruit.name) {
                buttonClass = "bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg";
              } else {
                buttonClass = "bg-gray-300 text-gray-500 font-bold py-4 px-6 rounded-2xl text-lg shadow-lg";
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
          <div className="mb-6">
            {selectedAnswer === currentFruit.name ? (
              <div className="text-2xl text-green-600 font-bold">
                정답이에요! 🎉
              </div>
            ) : (
              <div className="text-2xl text-red-600 font-bold">
                아쉬워요! 정답은 "{currentFruit.name}"이에요! 😊
              </div>
            )}
          </div>
        )}

        {/* 다음 버튼 */}
        {showResult && (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {currentFruitIndex < fruits.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        )}
      </div>

      {/* 홈 버튼 */}
      <Link
        href="/"
        className="mt-6 text-purple-600 hover:text-purple-800 font-medium text-lg"
      >
        ← 홈으로 가기
      </Link>
    </div>
  );
}

