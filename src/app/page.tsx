'use client';

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
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
            🍎 과일 🚗 교통수단 🌈 색깔 이름을 맞혀보세요!
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
