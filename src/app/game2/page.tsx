'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FruitPuzzle {
  emoji: string;
  name: string;
  display: string; // 빈칸이 포함된 표시
  missingChar: string; // 빈칸에 들어갈 글자
  options: string[]; // 선택지
}

const fruitPuzzles: FruitPuzzle[] = [
  {
    emoji: '🍎',
    name: '사과',
    display: '사_',
    missingChar: '과',
    options: ['과', '나', '기']
  },
  {
    emoji: '🍌',
    name: '바나나',
    display: '바_나',
    missingChar: '나',
    options: ['나', '과', '기']
  },
  {
    emoji: '🍓',
    name: '딸기',
    display: '딸_',
    missingChar: '기',
    options: ['기', '나', '과']
  },
  {
    emoji: '🍇',
    name: '포도',
    display: '포_',
    missingChar: '도',
    options: ['도', '나', '기']
  },
  {
    emoji: '🍊',
    name: '오렌지',
    display: '오_지',
    missingChar: '렌',
    options: ['렌', '나', '기']
  },
  {
    emoji: '🍑',
    name: '복숭아',
    display: '복_아',
    missingChar: '숭',
    options: ['숭', '나', '기']
  }
];

export default function Game2() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentPuzzle = fruitPuzzles[currentPuzzleIndex];

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentPuzzle.missingChar) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentPuzzleIndex < fruitPuzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentPuzzleIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  };

  const renderDisplayText = () => {
    return currentPuzzle.display.split('').map((char, index) => {
      if (char === '_') {
        if (showResult && selectedAnswer) {
          return (
            <span 
              key={index} 
              className={`inline-block w-12 h-12 mx-1 rounded-lg flex items-center justify-center text-2xl font-bold ${
                selectedAnswer === currentPuzzle.missingChar 
                  ? 'bg-green-400 text-white' 
                  : 'bg-red-400 text-white'
              }`}
            >
              {selectedAnswer}
            </span>
          );
        }
        return (
          <span 
            key={index} 
            className="inline-block w-12 h-12 mx-1 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-500"
          >
            ?
          </span>
        );
      }
      return (
        <span 
          key={index} 
          className="inline-block w-12 h-12 mx-1 bg-blue-400 text-white rounded-lg flex items-center justify-center text-2xl font-bold"
        >
          {char}
        </span>
      );
    });
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">게임 완료!</h2>
          <p className="text-xl text-blue-600 mb-6">
            {score}개 맞혔어요! 정말 잘했어요! 👏
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              다시 하기
            </button>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-100 to-blue-100">
      {/* 진행 상황 */}
      <div className="mb-6 text-center">
        <div className="text-lg text-blue-700 font-medium">
          {currentPuzzleIndex + 1} / {fruitPuzzles.length}
        </div>
        <div className="w-64 bg-blue-200 rounded-full h-3 mt-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentPuzzleIndex + 1) / fruitPuzzles.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 게임 영역 */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-lg w-full">
        {/* 과일 그림 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">{currentPuzzle.emoji}</div>
          <p className="text-xl text-blue-600 font-medium mb-4">
            빈칸에 들어갈 글자를 찾아보세요!
          </p>
        </div>

        {/* 글자 표시 */}
        <div className="mb-8 flex justify-center items-center">
          <div className="flex items-center">
            {renderDisplayText()}
          </div>
        </div>

        {/* 선택지 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {currentPuzzle.options.map((option, index) => {
            let buttonClass = "bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-4 px-4 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200";
            
            if (showResult) {
              if (option === currentPuzzle.missingChar) {
                buttonClass = "bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-4 px-4 rounded-2xl text-lg shadow-lg";
              } else if (option === selectedAnswer && option !== currentPuzzle.missingChar) {
                buttonClass = "bg-gradient-to-r from-red-400 to-red-500 text-white font-bold py-4 px-4 rounded-2xl text-lg shadow-lg";
              } else {
                buttonClass = "bg-gray-300 text-gray-500 font-bold py-4 px-4 rounded-2xl text-lg shadow-lg";
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
            {selectedAnswer === currentPuzzle.missingChar ? (
              <div className="text-2xl text-green-600 font-bold">
                정답이에요! 🎉
              </div>
            ) : (
              <div className="text-2xl text-red-600 font-bold">
                아쉬워요! 정답은 &ldquo;{currentPuzzle.missingChar}&rdquo;이에요! 😊
              </div>
            )}
            <div className="text-lg text-blue-600 mt-2">
              완성된 단어: <span className="font-bold">{currentPuzzle.name}</span>
            </div>
          </div>
        )}

        {/* 다음 버튼 */}
        {showResult && (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {currentPuzzleIndex < fruitPuzzles.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        )}
      </div>

      {/* 홈 버튼 */}
      <Link
        href="/"
        className="mt-6 text-blue-600 hover:text-blue-800 font-medium text-lg"
      >
        ← 홈으로 가기
      </Link>
    </div>
  );
}
