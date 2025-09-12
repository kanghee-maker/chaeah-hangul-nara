'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

interface Item {
  emoji: string;
  name: string;
  options: string[];
  category: string;
}

interface Category {
  name: string;
  emoji: string;
  items: Item[];
}

const categories: Category[] = [
  {
    name: '과일',
    emoji: '🍎',
    items: [
      {
        emoji: '🍎',
        name: '사과',
        options: ['사과', '바나나', '딸기'],
        category: '과일'
      },
      {
        emoji: '🍌',
        name: '바나나',
        options: ['바나나', '사과', '포도'],
        category: '과일'
      },
      {
        emoji: '🍓',
        name: '딸기',
        options: ['딸기', '사과', '바나나'],
        category: '과일'
      },
      {
        emoji: '🍇',
        name: '포도',
        options: ['포도', '딸기', '사과'],
        category: '과일'
      },
      {
        emoji: '🍊',
        name: '오렌지',
        options: ['오렌지', '사과', '바나나'],
        category: '과일'
      },
      {
        emoji: '🍑',
        name: '복숭아',
        options: ['복숭아', '사과', '딸기'],
        category: '과일'
      }
    ]
  },
  {
    name: '교통수단',
    emoji: '🚗',
    items: [
      {
        emoji: '🚗',
        name: '자동차',
        options: ['자동차', '버스', '기차'],
        category: '교통수단'
      },
      {
        emoji: '🚌',
        name: '버스',
        options: ['버스', '자동차', '비행기'],
        category: '교통수단'
      },
      {
        emoji: '🚂',
        name: '기차',
        options: ['기차', '버스', '배'],
        category: '교통수단'
      },
      {
        emoji: '✈️',
        name: '비행기',
        options: ['비행기', '기차', '자동차'],
        category: '교통수단'
      },
      {
        emoji: '🚢',
        name: '배',
        options: ['배', '비행기', '버스'],
        category: '교통수단'
      },
      {
        emoji: '🚲',
        name: '자전거',
        options: ['자전거', '자동차', '기차'],
        category: '교통수단'
      }
    ]
  },
  {
    name: '색깔',
    emoji: '🌈',
    items: [
      {
        emoji: '❤️',
        name: '빨간색',
        options: ['빨간색', '파란색', '노란색'],
        category: '색깔'
      },
      {
        emoji: '💙',
        name: '파란색',
        options: ['파란색', '빨간색', '초록색'],
        category: '색깔'
      },
      {
        emoji: '💛',
        name: '노란색',
        options: ['노란색', '파란색', '보라색'],
        category: '색깔'
      },
      {
        emoji: '💚',
        name: '초록색',
        options: ['초록색', '노란색', '빨간색'],
        category: '색깔'
      },
      {
        emoji: '💜',
        name: '보라색',
        options: ['보라색', '초록색', '파란색'],
        category: '색깔'
      },
      {
        emoji: '🤍',
        name: '하얀색',
        options: ['하얀색', '검은색', '빨간색'],
        category: '색깔'
      }
    ]
  },
  {
    name: '디즈니 공주',
    emoji: '👸',
    items: [
      {
        emoji: '❄️',
        name: '엘사',
        options: ['엘사', '안나', '벨'],
        category: '디즈니 공주'
      },
      {
        emoji: '🌹',
        name: '벨',
        options: ['벨', '엘사', '신데렐라'],
        category: '디즈니 공주'
      },
      {
        emoji: '🍎',
        name: '백설공주',
        options: ['백설공주', '벨', '엘사'],
        category: '디즈니 공주'
      },
      {
        emoji: '👠',
        name: '신데렐라',
        options: ['신데렐라', '백설공주', '안나'],
        category: '디즈니 공주'
      },
      {
        emoji: '🧡',
        name: '안나',
        options: ['안나', '신데렐라', '벨'],
        category: '디즈니 공주'
      },
      {
        emoji: '🧜‍♀️',
        name: '아리엘',
        options: ['아리엘', '엘사', '백설공주'],
        category: '디즈니 공주'
      }
    ]
  },
  {
    name: '음식',
    emoji: '🍕',
    items: [
      {
        emoji: '🍕',
        name: '피자',
        options: ['피자', '햄버거', '치킨'],
        category: '음식'
      },
      {
        emoji: '🍔',
        name: '햄버거',
        options: ['햄버거', '피자', '김밥'],
        category: '음식'
      },
      {
        emoji: '🍗',
        name: '치킨',
        options: ['치킨', '햄버거', '라면'],
        category: '음식'
      },
      {
        emoji: '🍜',
        name: '라면',
        options: ['라면', '치킨', '김밥'],
        category: '음식'
      },
      {
        emoji: '🍙',
        name: '김밥',
        options: ['김밥', '라면', '피자'],
        category: '음식'
      },
      {
        emoji: '🍰',
        name: '케이크',
        options: ['케이크', '김밥', '햄버거'],
        category: '음식'
      }
    ]
  }
];

// 모든 아이템을 하나의 배열로 합침
const allItems = categories.flatMap(category => category.items);

// 배열을 랜덤하게 섞는 함수
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Game1Content() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  // 카테고리에 따라 아이템 필터링
  const filteredItems = selectedCategory && selectedCategory !== '모든 카테고리' 
    ? allItems.filter(item => item.category === selectedCategory)
    : allItems;

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // 효과음을 위한 ref
  const correctSoundRef = useRef<HTMLAudioElement>(null);
  const wrongSoundRef = useRef<HTMLAudioElement>(null);

  const currentItem = filteredItems[currentItemIndex];

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
    if (currentItem) {
      setShuffledOptions(shuffleArray(currentItem.options));
    }
  }, [currentItem]);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentItem.name) {
      setScore(score + 1);
      playCorrectSound(); // 정답 효과음 재생
    } else {
      playWrongSound(); // 오답 효과음 재생
    }
  };

  const handleNext = () => {
    if (currentItemIndex < filteredItems.length - 1) {
      const nextIndex = currentItemIndex + 1;
      setCurrentItemIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      // 다음 문제의 선택지를 섞음
      setShuffledOptions(shuffleArray(filteredItems[nextIndex].options));
    } else {
      setGameComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentItemIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
    // 첫 번째 문제의 선택지를 섞음
    if (filteredItems.length > 0) {
      setShuffledOptions(shuffleArray(filteredItems[0].options));
    }
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
      {/* 효과음 */}
      <audio ref={correctSoundRef} src="/good.m4a" preload="auto" />
      <audio ref={wrongSoundRef} src="/wrong.m4a" preload="auto" />
      {/* 진행 상황 */}
      <div className="mb-6 text-center">
        <div className="text-lg text-purple-700 font-medium">
          {currentItemIndex + 1} / {filteredItems.length}
        </div>
        <div className="w-64 bg-purple-200 rounded-full h-3 mt-2">
          <div 
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentItemIndex + 1) / filteredItems.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 게임 영역 */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-lg w-full">
        {/* 아이템 그림 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">{currentItem.emoji}</div>
          <p className="text-xl text-purple-600 font-medium">
            이 {currentItem.category}의 이름은 무엇일까요?
          </p>
        </div>

        {/* 선택지 */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {shuffledOptions.map((option, index) => {
            let buttonClass = "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200";
            
            if (showResult) {
              if (option === currentItem.name) {
                buttonClass = "bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg";
              } else if (option === selectedAnswer && option !== currentItem.name) {
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
            {selectedAnswer === currentItem.name ? (
              <div className="text-2xl text-green-600 font-bold">
                정답이에요! 🎉
              </div>
            ) : (
              <div className="text-2xl text-red-600 font-bold">
                아쉬워요! 정답은 &ldquo;{currentItem.name}&rdquo;이에요! 😊
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
            {currentItemIndex < filteredItems.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        )}
      </div>

      {/* 네비게이션 버튼들 */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/category-select?game=1"
          className="text-purple-600 hover:text-purple-800 font-medium text-lg"
        >
          ← 카테고리 선택
        </Link>
        <span className="text-purple-400">|</span>
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-800 font-medium text-lg"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}

export default function Game1() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">로딩 중...</div>
      </div>
    }>
      <Game1Content />
    </Suspense>
  );
}

