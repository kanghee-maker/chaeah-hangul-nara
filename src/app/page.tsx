'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playBackgroundMusic = async () => {
      if (audioRef.current) {
        try {
          // 볼륨을 낮게 설정 (배경음이므로)
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
        } catch (error) {
          console.log('오디오 자동재생 실패, 사용자 인터랙션 대기:', error);
          // 자동재생이 실패하면 사용자 인터랙션을 기다림
          const handleFirstInteraction = () => {
            audioRef.current?.play().catch(err => console.log('재생 실패:', err));
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
          };
          
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('touchstart', handleFirstInteraction);
        }
      }
    };

    // 페이지 로드 후 즉시 음악 재생 시도
    const timer = setTimeout(() => {
      playBackgroundMusic();
    }, 100); // 100ms 후 재생 시도

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* 배경 음악 */}
      <audio
        ref={audioRef}
        src="/start.m4a"
        onEnded={handleAudioEnded}
        preload="auto"
        autoPlay
        muted={false}
      />
      {/* 메인 로고 이미지 */}
      <div className="mb-8">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <Image
            src="/main.jpg"
            alt="채아의 한글 나라 로고"
            width={192}
            height={192}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* 제목 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4 font-noto-sans-kr">
          채아의 한글 나라
        </h1>
        <p className="text-lg text-purple-600 font-medium">
          재미있는 한글 학습을 시작해보세요! 🌟
        </p>
      </div>

      {/* 메뉴 버튼들 */}
      <div className="flex flex-col gap-6 w-full max-w-md">
        <Link 
          href="/category-select?game=1"
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
        >
          🎯 이름 맞히기
          <div className="text-sm font-normal mt-1 opacity-90">
            🍎 과일 🚗 교통수단 🌈 색깔 👸 디즈니공주 🍕 음식 이름을 맞혀보세요!
          </div>
        </Link>

        <Link 
          href="/category-select?game=2"
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
        >
          ✏️ 빈칸 채우기
          <div className="text-sm font-normal mt-1 opacity-90">
            다양한 단어의 빈칸을 채워보세요!
          </div>
        </Link>
      </div>

      {/* 하단 장식 */}
      <div className="mt-12 flex gap-4 text-2xl">
        <span className="animate-bounce">🌟</span>
        <span className="animate-bounce" style={{animationDelay: '0.1s'}}>🎈</span>
        <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎨</span>
        <span className="animate-bounce" style={{animationDelay: '0.3s'}}>🎪</span>
        <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🌟</span>
      </div>
    </div>
  );
}
