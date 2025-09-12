'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

interface ItemPuzzle {
  emoji: string;
  name: string;
  display: string; // 빈칸이 포함된 표시
  missingChar: string; // 빈칸에 들어갈 글자
  options: string[]; // 선택지
  category: string;
}

const itemPuzzles: ItemPuzzle[] = [
  // 과일
  {
    emoji: '🍎',
    name: '사과',
    display: '사_',
    missingChar: '과',
    options: ['과', '나', '기'],
    category: '과일'
  },
  {
    emoji: '🍌',
    name: '바나나',
    display: '바_나',
    missingChar: '나',
    options: ['나', '과', '기'],
    category: '과일'
  },
  {
    emoji: '🍓',
    name: '딸기',
    display: '딸_',
    missingChar: '기',
    options: ['기', '나', '과'],
    category: '과일'
  },
  {
    emoji: '🍇',
    name: '포도',
    display: '포_',
    missingChar: '도',
    options: ['도', '나', '기'],
    category: '과일'
  },
  {
    emoji: '🍊',
    name: '오렌지',
    display: '오_지',
    missingChar: '렌',
    options: ['렌', '나', '기'],
    category: '과일'
  },
  {
    emoji: '🍑',
    name: '복숭아',
    display: '복_아',
    missingChar: '숭',
    options: ['숭', '나', '기'],
    category: '과일'
  },
  // 교통수단
  {
    emoji: '🚗',
    name: '자동차',
    display: '자_차',
    missingChar: '동',
    options: ['동', '기', '나'],
    category: '교통수단'
  },
  {
    emoji: '🚌',
    name: '버스',
    display: '버_',
    missingChar: '스',
    options: ['스', '동', '나'],
    category: '교통수단'
  },
  {
    emoji: '🚂',
    name: '기차',
    display: '기_',
    missingChar: '차',
    options: ['차', '스', '동'],
    category: '교통수단'
  },
  {
    emoji: '✈️',
    name: '비행기',
    display: '비_기',
    missingChar: '행',
    options: ['행', '차', '스'],
    category: '교통수단'
  },
  {
    emoji: '🚢',
    name: '배',
    display: '_',
    missingChar: '배',
    options: ['배', '행', '차'],
    category: '교통수단'
  },
  {
    emoji: '🚲',
    name: '자전거',
    display: '자_거',
    missingChar: '전',
    options: ['전', '배', '행'],
    category: '교통수단'
  },
  // 색깔
  {
    emoji: '❤️',
    name: '빨간색',
    display: '빨_색',
    missingChar: '간',
    options: ['간', '전', '배'],
    category: '색깔'
  },
  {
    emoji: '💙',
    name: '파란색',
    display: '파_색',
    missingChar: '란',
    options: ['란', '간', '전'],
    category: '색깔'
  },
  {
    emoji: '💛',
    name: '노란색',
    display: '노_색',
    missingChar: '란',
    options: ['란', '간', '전'],
    category: '색깔'
  },
  {
    emoji: '💚',
    name: '초록색',
    display: '초_색',
    missingChar: '록',
    options: ['록', '란', '간'],
    category: '색깔'
  },
  {
    emoji: '💜',
    name: '보라색',
    display: '보_색',
    missingChar: '라',
    options: ['라', '록', '란'],
    category: '색깔'
  },
  {
    emoji: '🤍',
    name: '하얀색',
    display: '하_색',
    missingChar: '얀',
    options: ['얀', '라', '록'],
    category: '색깔'
  },
  // 디즈니 공주
  {
    emoji: '❄️',
    name: '엘사',
    display: '엘_',
    missingChar: '사',
    options: ['사', '얀', '라'],
    category: '디즈니 공주'
  },
  {
    emoji: '🌹',
    name: '벨',
    display: '_',
    missingChar: '벨',
    options: ['벨', '사', '얀'],
    category: '디즈니 공주'
  },
  {
    emoji: '🍎',
    name: '백설공주',
    display: '백_공주',
    missingChar: '설',
    options: ['설', '벨', '사'],
    category: '디즈니 공주'
  },
  {
    emoji: '👠',
    name: '신데렐라',
    display: '신_렐라',
    missingChar: '데',
    options: ['데', '설', '벨'],
    category: '디즈니 공주'
  },
  {
    emoji: '🧡',
    name: '안나',
    display: '안_',
    missingChar: '나',
    options: ['나', '데', '설'],
    category: '디즈니 공주'
  },
  {
    emoji: '🧜‍♀️',
    name: '아리엘',
    display: '아_엘',
    missingChar: '리',
    options: ['리', '나', '데'],
    category: '디즈니 공주'
  },
  // 음식
  {
    emoji: '🍕',
    name: '피자',
    display: '피_',
    missingChar: '자',
    options: ['자', '리', '나'],
    category: '음식'
  },
  {
    emoji: '🍔',
    name: '햄버거',
    display: '햄_거',
    missingChar: '버',
    options: ['버', '자', '리'],
    category: '음식'
  },
  {
    emoji: '🍗',
    name: '치킨',
    display: '치_',
    missingChar: '킨',
    options: ['킨', '버', '자'],
    category: '음식'
  },
  {
    emoji: '🍜',
    name: '라면',
    display: '라_',
    missingChar: '면',
    options: ['면', '킨', '버'],
    category: '음식'
  },
  {
    emoji: '🍙',
    name: '김밥',
    display: '김_',
    missingChar: '밥',
    options: ['밥', '면', '킨'],
    category: '음식'
  },
  {
    emoji: '🍰',
    name: '케이크',
    display: '케이_',
    missingChar: '크',
    options: ['크', '밥', '면'],
    category: '음식'
  }
];

// 배열을 랜덤하게 섞는 함수
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Game2Content() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  // 카테고리에 따라 아이템 필터링
  const filteredPuzzles = selectedCategory && selectedCategory !== '모든 카테고리' 
    ? itemPuzzles.filter(puzzle => puzzle.category === selectedCategory)
    : itemPuzzles;

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // 효과음을 위한 ref
  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const wrongSoundRef = useRef<HTMLAudioElement>(null);

  const currentPuzzle = filteredPuzzles[currentPuzzleIndex];

  // 효과음 재생 함수
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

  // 컴포넌트 마운트 시 선택지 초기화
  useEffect(() => {
    if (currentPuzzle) {
      setShuffledOptions(shuffleArray(currentPuzzle.options));
    }
  }, [currentPuzzle]);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentPuzzle.missingChar) {
      setScore(score + 1);
      playCorrectSound(); // 정답 효과음 재생
    } else {
      playWrongSound(); // 오답 효과음 재생
    }
  };

  const handleNext = () => {
    if (currentPuzzleIndex < filteredPuzzles.length - 1) {
      const nextIndex = currentPuzzleIndex + 1;
      setCurrentPuzzleIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      // 다음 문제의 선택지를 섞음
      setShuffledOptions(shuffleArray(filteredPuzzles[nextIndex].options));
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
    // 첫 번째 문제의 선택지를 섞음
    if (filteredPuzzles.length > 0) {
      setShuffledOptions(shuffleArray(filteredPuzzles[0].options));
    }
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
      {/* 효과음 */}
      <audio ref={correctSoundRef} src="/good.m4a" preload="auto" />
      <audio ref={wrongSoundRef} src="/wrong.m4a" preload="auto" />
      {/* 진행 상황 */}
      <div className="mb-6 text-center">
        <div className="text-lg text-blue-700 font-medium">
          {currentPuzzleIndex + 1} / {filteredPuzzles.length}
        </div>
        <div className="w-64 bg-blue-200 rounded-full h-3 mt-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentPuzzleIndex + 1) / filteredPuzzles.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 게임 영역 */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-lg w-full">
        {/* 아이템 그림 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">{currentPuzzle.emoji}</div>
          <p className="text-xl text-blue-600 font-medium mb-4">
            이 {currentPuzzle.category}의 빈칸에 들어갈 글자를 찾아보세요!
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
          {shuffledOptions.map((option, index) => {
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
            {currentPuzzleIndex < filteredPuzzles.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        )}
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/category-select?game=2"
          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
        >
          ← 카테고리 선택
        </Link>
        <span className="text-blue-400">|</span>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default function Game2() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">로딩 중...</div>
      </div>
    }>
      <Game2Content />
    </Suspense>
  );
}
