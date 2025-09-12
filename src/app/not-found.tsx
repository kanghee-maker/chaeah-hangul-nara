import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <div className="text-6xl mb-4">😅</div>
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          페이지를 찾을 수 없어요!
        </h2>
        <p className="text-purple-600 mb-6">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
