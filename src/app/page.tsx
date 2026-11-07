'use client';

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'math' ? 'math' : 'hangul';
  const [activeTab, setActiveTab] = useState<'hangul' | 'math'>(initialTab);

  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 랜덤 이미지 선택을 위한 state
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'math') {
      setActiveTab('math');
    } else if (tabParam === 'hangul') {
      setActiveTab('hangul');
    }
  }, [searchParams]);

  const playBackgroundMusic = async () => {
    if (audioRef.current) {
      try {
        // 볼륨을 낮게 설정 (배경음이므로)
        audioRef.current.volume = 0.3;
        await audioRef.current.play();
        console.log('배경음 재생 성공!');
      } catch (error) {
        console.log('오디오 재생 실패:', error);
      }
    }
  };

  useEffect(() => {
    // 이미지 목록 (기존 main.jpg + 새로 추가된 4개)
    const imageList = [
      '/main.jpg',
      '/start1 (1).jpg',
      '/start1 (2).jpg', 
      '/start1 (3).jpg',
      '/start1 (4).jpg'
    ];
    
    // 랜덤 이미지 선택
    const randomIndex = Math.floor(Math.random() * imageList.length);
    setSelectedImage(imageList[randomIndex]);
    
    // 페이지 로드 후 즉시 음악 재생 시도
    const timer = setTimeout(() => {
      playBackgroundMusic();
    }, 100);

    // 전역 클릭/터치 이벤트 리스너 (폴백용)
    const handleFirstInteraction = () => {
      playBackgroundMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // 메인 이미지 클릭 핸들러
  const handleImageClick = () => {
    playBackgroundMusic();
  };

  const handleAudioEnded = () => {
    // 음악이 끝나면 2초 후 다시 재생
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.log('오디오 재생 실패:', error);
        });
      }
    }, 2000);
  };

  const isMath = activeTab === 'math';

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 transition-colors duration-300 ${
        isMath
          ? 'bg-gradient-to-br from-blue-100 via-indigo-50 to-cyan-100'
          : 'bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100'
      }`}
    >
      {/* 배경 음악 */}
      <audio
        ref={audioRef}
        src="/start.m4a"
        onEnded={handleAudioEnded}
        preload="auto"
        autoPlay
        muted={false}
      />

      {/* 최상단 한글 / 수학 전환 탭 */}
      <div className="mb-6 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg flex gap-2 border-2 border-white">
        <button
          type="button"
          onClick={() => setActiveTab('hangul')}
          className={`px-7 py-2.5 rounded-full font-bold text-lg transition-all cursor-pointer flex items-center gap-2 font-kids-jua ${
            !isMath
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md scale-105'
              : 'text-purple-700 hover:bg-purple-50'
          }`}
        >
          <span>🔤</span>
          <span>한글</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('math')}
          className={`px-7 py-2.5 rounded-full font-bold text-lg transition-all cursor-pointer flex items-center gap-2 font-kids-jua ${
            isMath
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-105'
              : 'text-indigo-700 hover:bg-indigo-50'
          }`}
        >
          <span>🔢</span>
          <span>수학</span>
        </button>
      </div>

      {/* 메인 로고 이미지 */}
      <div className="mb-6 flex flex-col items-center">
        <div 
          className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg border-4 border-white cursor-pointer transform hover:scale-105 transition-all duration-200 mx-auto"
          onClick={handleImageClick}
          title="클릭하면 음악이 재생됩니다! 🎵"
        >
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={isMath ? "채아의 수학 나라 로고" : "채아의 한글 나라 로고"}
              width={192}
              height={192}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              <div className="text-4xl">🎪</div>
            </div>
          )}
        </div>
        <p
          className={`text-center text-sm mt-2 opacity-80 ${
            isMath ? 'text-indigo-600' : 'text-purple-500'
          }`}
        >
          🎵 이미지를 클릭하면 음악이 재생돼요!
        </p>
      </div>

      {/* 제목 (텍스트 타이틀 with Jua gradient+stroke) */}
      <div className="text-center mb-8">
        <h1
          className={`${
            isMath ? 'title-kids-math' : 'title-kids-jua'
          } text-4xl md:text-6xl leading-tight`}
        >
          {isMath ? '채아의 수학 나라' : '채아의 한글 나라'}
        </h1>
        <p
          className={`text-lg font-normal mt-2 font-kids-jua ${
            isMath ? 'text-indigo-600' : 'text-purple-600'
          }`}
        >
          {isMath
            ? '재미있는 그림으로 덧셈과 뺄셈을 배워보세요! 🧮'
            : '생생한 사진과 소리로 재미있는 한글 학습을 시작해보세요! 🌟'}
        </p>
      </div>

      {/* 메뉴 버튼들: 한글 탭 vs 수학 탭 */}
      {!isMath ? (
        <div className="flex flex-col gap-5 w-full max-w-md">
          <Link 
            href="/category-select?game=1"
            className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            🎯 이름 맞히기
            <div className="text-sm font-normal mt-1 opacity-90">
              🍎 과일 · 🥕 채소 · 🐶 동물 · 🚗 탈것 · 🦋 자연 등 132개 생생한 사진으로 이름을 맞혀보세요!
            </div>
          </Link>

          <Link 
            href="/category-select?game=2"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            ✏️ 빈칸 채우기
            <div className="text-sm font-normal mt-1 opacity-90">
              그림을 보고 단어의 빈칸 글자를 찾아보세요!
            </div>
          </Link>

          <Link 
            href="/words-book"
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            📖 그림 단어장
            <div className="text-sm font-normal mt-1 opacity-90">
              9가지 주제 132개 그림 카드로 한글 단어를 익혀보세요!
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full max-w-md">
          <Link 
            href="/math-select?mode=add"
            className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            ➕ 신나는 덧셈 놀이
            <div className="text-sm font-normal mt-1 opacity-90">
              🍎 귀여운 그림을 하나씩 세어보며 더하기를 배워보세요!
            </div>
          </Link>

          <Link 
            href="/math-select?mode=sub"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            ➖ 재미있는 뺄셈 놀이
            <div className="text-sm font-normal mt-1 opacity-90">
              🍓 그림에서 몇 개가 남는지 재미있게 빼기를 해보세요!
            </div>
          </Link>

          <Link 
            href="/math-select?mode=mix"
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            🎪 덧셈·뺄셈 종합 놀이
            <div className="text-sm font-normal mt-1 opacity-90">
              더하기와 빼기를 골고루 섞어서 신나게 풀어보세요!
            </div>
          </Link>

          <Link 
            href="/math-select?mode=blank"
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            🔍 빈칸 숫자 맞히기
            <div className="text-sm font-normal mt-1 opacity-90">
              2 + [ ? ] = 5 처럼 숨어있는 빈칸 숫자를 찾아보세요!
            </div>
          </Link>
        </div>
      )}

      {/* 하단 장식 */}
      <div className="mt-10 flex gap-4 text-2xl">
        <span className="animate-bounce">{isMath ? '🔢' : '🌟'}</span>
        <span className="animate-bounce" style={{animationDelay: '0.1s'}}>{isMath ? '➕' : '🎈'}</span>
        <span className="animate-bounce" style={{animationDelay: '0.2s'}}>{isMath ? '🧮' : '🎨'}</span>
        <span className="animate-bounce" style={{animationDelay: '0.3s'}}>{isMath ? '➖' : '🎪'}</span>
        <span className="animate-bounce" style={{animationDelay: '0.4s'}}>{isMath ? '⭐' : '🌟'}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl">로딩 중...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
