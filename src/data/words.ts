export interface WordItem {
  id: string;
  name: string;
  category: string;
  emoji: string;
  image?: string;
  colorHex?: string;
  colorSecondaryHex?: string;
  colorExamples?: string;
  hint: string;
  blankIndex: number; // 빈칸 채우기 기본 인덱스
  charDistractors: [string, string]; // 빈칸 채우기 오답 글자 2개 (발음/모양 유사 글자)
}

export interface CategoryMeta {
  name: string;
  emoji: string;
  description: string;
  color: string;
  hoverColor: string;
  badgeBg: string;
  coverImage?: string;
}

export const CATEGORY_LIST: CategoryMeta[] = [
  {
    name: '과일',
    emoji: '🍎',
    description: '새콤달콤 맛있는 과일 18가지!',
    color: 'from-red-400 to-pink-500',
    hoverColor: 'from-red-500 to-pink-600',
    badgeBg: 'bg-red-100 text-red-700',
    coverImage: '/words/strawberry.jpg'
  },
  {
    name: '채소',
    emoji: '🥕',
    description: '몸을 튼튼하게 해주는 채소 12가지!',
    color: 'from-lime-500 to-green-600',
    hoverColor: 'from-lime-600 to-green-700',
    badgeBg: 'bg-lime-100 text-lime-800',
    coverImage: '/words/carrot.jpg'
  },
  {
    name: '동물',
    emoji: '🐶',
    description: '귀엽고 신기한 동물 친구들 20마리!',
    color: 'from-amber-400 to-orange-500',
    hoverColor: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 text-amber-800',
    coverImage: '/words/puppy.jpg'
  },
  {
    name: '교통수단',
    emoji: '🚗',
    description: '부릉부릉 멋진 탈것 14가지!',
    color: 'from-blue-400 to-indigo-500',
    hoverColor: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-800',
    coverImage: '/words/fire_engine.jpg'
  },
  {
    name: '음식',
    emoji: '🍕',
    description: '냠냠 맛있는 음식과 간식 16가지!',
    color: 'from-orange-400 to-red-500',
    hoverColor: 'from-orange-500 to-red-600',
    badgeBg: 'bg-orange-100 text-orange-800',
    coverImage: '/words/pizza.jpg'
  },
  {
    name: '자연과 곤충',
    emoji: '🦋',
    description: '꽃과 곤충, 아름다운 자연 14가지!',
    color: 'from-emerald-400 to-teal-500',
    hoverColor: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    coverImage: '/words/butterfly.jpg'
  },
  {
    name: '생활용품',
    emoji: '🧸',
    description: '우리 주변의 친숙한 물건 14가지!',
    color: 'from-cyan-400 to-blue-500',
    hoverColor: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-100 text-cyan-800',
    coverImage: '/words/teddy_bear.jpg'
  },
  {
    name: '색깔',
    emoji: '🌈',
    description: '알록달록 예쁜 물감 색깔 12가지!',
    color: 'from-purple-400 to-pink-500',
    hoverColor: 'from-purple-500 to-pink-600',
    badgeBg: 'bg-purple-100 text-purple-800'
  },
  {
    name: '디즈니 공주',
    emoji: '👸',
    description: '동화 속 멋진 공주님과 친구들 12명!',
    color: 'from-pink-400 to-rose-500',
    hoverColor: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-100 text-pink-800',
    coverImage: '/words/elsa.png'
  },
  {
    name: '모든 카테고리',
    emoji: '🎪',
    description: '132개 모든 단어를 골고루 섞어서 게임해요!',
    color: 'from-violet-500 to-fuchsia-500',
    hoverColor: 'from-violet-600 to-fuchsia-600',
    badgeBg: 'bg-violet-100 text-violet-800'
  }
];

export const WORDS: WordItem[] = [
  // ==================== 과일 (18) ====================
  {
    id: 'apple',
    name: '사과',
    category: '과일',
    emoji: '🍎',
    image: '/words/apple.jpg',
    hint: '빨갛고 아삭아삭 맛있는 과일이에요',
    blankIndex: 1,
    charDistractors: ['가', '고']
  },
  {
    id: 'banana',
    name: '바나나',
    category: '과일',
    emoji: '🍌',
    image: '/words/banana.jpg',
    hint: '노랗고 길쭉한 달콤한 과일이에요',
    blankIndex: 1,
    charDistractors: ['다', '라']
  },
  {
    id: 'strawberry',
    name: '딸기',
    category: '과일',
    emoji: '🍓',
    image: '/words/strawberry.jpg',
    hint: '빨갛고 콕콕 씨가 박힌 새콤달콤 과일이에요',
    blankIndex: 0,
    charDistractors: ['달', '탈']
  },
  {
    id: 'grape',
    name: '포도',
    category: '과일',
    emoji: '🍇',
    image: '/words/grape.jpg',
    hint: '동글동글 알맹이가 송이송이 달린 과일이에요',
    blankIndex: 1,
    charDistractors: ['두', '토']
  },
  {
    id: 'orange',
    name: '오렌지',
    category: '과일',
    emoji: '🍊',
    image: '/words/orange.jpg',
    hint: '주황색 동그란 새콤달콤 과일이에요',
    blankIndex: 1,
    charDistractors: ['란', '린']
  },
  {
    id: 'peach',
    name: '복숭아',
    category: '과일',
    emoji: '🍑',
    image: '/words/peach.jpg',
    hint: '분홍빛 보들보들 향긋한 과일이에요',
    blankIndex: 1,
    charDistractors: ['송', '상']
  },
  {
    id: 'watermelon',
    name: '수박',
    category: '과일',
    emoji: '🍉',
    image: '/words/watermelon.jpg',
    hint: '초록 줄무늬에 속이 빨간 시원한 여름 과일이에요',
    blankIndex: 1,
    charDistractors: ['복', '방']
  },
  {
    id: 'pineapple',
    name: '파인애플',
    category: '과일',
    emoji: '🍍',
    image: '/words/pineapple.jpg',
    hint: '왕관 모양 잎이 달린 새콤달콤 노란 과일이에요',
    blankIndex: 2,
    charDistractors: ['에', '아']
  },
  {
    id: 'kiwi',
    name: '키위',
    category: '과일',
    emoji: '🥝',
    image: '/words/kiwi.jpg',
    hint: '갈색 껍질 속에 초록색 과육이 들어있어요',
    blankIndex: 1,
    charDistractors: ['워', '와']
  },
  {
    id: 'cherry',
    name: '체리',
    category: '과일',
    emoji: '🍒',
    image: '/words/cherry.jpg',
    hint: '작고 빨간 구슬 같은 달콤한 과일이에요',
    blankIndex: 0,
    charDistractors: ['채', '치']
  },
  {
    id: 'mango',
    name: '망고',
    category: '과일',
    emoji: '🥭',
    image: '/words/mango.jpg',
    hint: '노랗고 부드러운 달콤한 열대 과일이에요',
    blankIndex: 0,
    charDistractors: ['명', '멍']
  },
  {
    id: 'blueberry',
    name: '블루베리',
    category: '과일',
    emoji: '🫐',
    image: '/words/blueberry.jpg',
    hint: '작고 동그란 보랏빛 파란 열매예요',
    blankIndex: 2,
    charDistractors: ['배', '버']
  },
  {
    id: 'lemon',
    name: '레몬',
    category: '과일',
    emoji: '🍋',
    image: '/words/lemon.jpg',
    hint: '노랗고 아이 시어! 새콤한 과일이에요',
    blankIndex: 1,
    charDistractors: ['문', '만']
  },
  {
    id: 'melon',
    name: '멜론',
    category: '과일',
    emoji: '🍈',
    image: '/words/melon.jpg',
    hint: '그물 무늬 껍질이 있는 달콤한 과일이에요',
    blankIndex: 0,
    charDistractors: ['말', '밀']
  },
  {
    id: 'pear',
    name: '참외',
    category: '과일',
    emoji: '🍈',
    image: '/words/pear.jpg',
    hint: '노란 껍질에 하얀 줄무늬가 있는 달콤한 과일이에요',
    blankIndex: 0,
    charDistractors: ['잠', '감']
  },
  {
    id: 'persimmon',
    name: '감',
    category: '과일',
    emoji: '🍊',
    image: '/words/persimmon.jpg',
    hint: '가을에 주황빛으로 익는 달콤한 과일이에요',
    blankIndex: 0,
    charDistractors: ['곰', '밤']
  },
  {
    id: 'asian_pear',
    name: '배',
    category: '과일',
    emoji: '🍐',
    image: '/words/asian_pear.jpg',
    hint: '아삭하고 시원한 과즙이 가득한 갈색 과일이에요',
    blankIndex: 0,
    charDistractors: ['베', '패']
  },
  {
    id: 'mandarin',
    name: '귤',
    category: '과일',
    emoji: '🍊',
    image: '/words/mandarin.jpg',
    hint: '겨울에 손으로 껍질을 까먹는 새콤달콤 과일이에요',
    blankIndex: 0,
    charDistractors: ['굴', '길']
  },

  // ==================== 채소 (12) ====================
  {
    id: 'carrot',
    name: '당근',
    category: '채소',
    emoji: '🥕',
    image: '/words/carrot.jpg',
    hint: '토끼가 좋아하는 주황색 길쭉한 채소예요',
    blankIndex: 0,
    charDistractors: ['동', '덩']
  },
  {
    id: 'tomato',
    name: '토마토',
    category: '채소',
    emoji: '🍅',
    image: '/words/tomato.jpg',
    hint: '울퉁불퉁 멋진 몸매에 빨간 옷을 입은 채소예요',
    blankIndex: 1,
    charDistractors: ['나', '바']
  },
  {
    id: 'cucumber',
    name: '오이',
    category: '채소',
    emoji: '🥒',
    image: '/words/cucumber.jpg',
    hint: '초록색 길쭉하고 아삭아삭 시원한 채소예요',
    blankIndex: 0,
    charDistractors: ['우', '아']
  },
  {
    id: 'corn',
    name: '옥수수',
    category: '채소',
    emoji: '🌽',
    image: '/words/corn.jpg',
    hint: '노란 알맹이가 하모니카처럼 촘촘히 박혀 있어요',
    blankIndex: 0,
    charDistractors: ['욱', '오']
  },
  {
    id: 'potato',
    name: '감자',
    category: '채소',
    emoji: '🥔',
    image: '/words/potato.jpg',
    hint: '땅속에서 자라는 동글동글 포슬포슬 채소예요',
    blankIndex: 0,
    charDistractors: ['강', '공']
  },
  {
    id: 'sweet_potato',
    name: '고구마',
    category: '채소',
    emoji: '🍠',
    image: '/words/sweet_potato.jpg',
    hint: '구워 먹으면 달콤하고 맛있는 보랏빛 채소예요',
    blankIndex: 1,
    charDistractors: ['기', '거']
  },
  {
    id: 'pumpkin',
    name: '호박',
    category: '채소',
    emoji: '🎃',
    image: '/words/pumpkin.jpg',
    hint: '동글동글 큼직하고 속이 노란 채소예요',
    blankIndex: 0,
    charDistractors: ['하', '허']
  },
  {
    id: 'broccoli',
    name: '브로콜리',
    category: '채소',
    emoji: '🥦',
    image: '/words/broccoli.jpg',
    hint: '작은 초록 나무처럼 생긴 건강한 채소예요',
    blankIndex: 2,
    charDistractors: ['쿨', '칼']
  },
  {
    id: 'onion',
    name: '양파',
    category: '채소',
    emoji: '🧅',
    image: '/words/onion.jpg',
    hint: '껍질을 까면 매워서 눈물이 나는 동그란 채소예요',
    blankIndex: 0,
    charDistractors: ['영', '왕']
  },
  {
    id: 'mushroom',
    name: '버섯',
    category: '채소',
    emoji: '🍄',
    image: '/words/mushroom.jpg',
    hint: '작은 우산처럼 생긴 쫄깃한 숲속 친구예요',
    blankIndex: 1,
    charDistractors: ['솟', '석']
  },
  {
    id: 'eggplant',
    name: '가지',
    category: '채소',
    emoji: '🍆',
    image: '/words/eggplant.jpg',
    hint: '보라색 옷을 입은 길쭉하고 매끈한 채소예요',
    blankIndex: 0,
    charDistractors: ['고', '거']
  },
  {
    id: 'bell_pepper',
    name: '파프리카',
    category: '채소',
    emoji: '🫑',
    image: '/words/bell_pepper.jpg',
    hint: '빨강, 노랑, 주황 알록달록 아삭한 채소예요',
    blankIndex: 2,
    charDistractors: ['라', '로']
  },

  // ==================== 동물 (20) ====================
  {
    id: 'puppy',
    name: '강아지',
    category: '동물',
    emoji: '🐶',
    image: '/words/puppy.jpg',
    hint: '멍멍! 꼬리를 흔드는 귀여운 동물이에요',
    blankIndex: 1,
    charDistractors: ['이', '오']
  },
  {
    id: 'cat',
    name: '고양이',
    category: '동물',
    emoji: '🐱',
    image: '/words/cat.jpg',
    hint: '야옹~ 수염이 멋진 귀여운 동물이에요',
    blankIndex: 1,
    charDistractors: ['영', '왕']
  },
  {
    id: 'rabbit',
    name: '토끼',
    category: '동물',
    emoji: '🐰',
    image: '/words/rabbit.jpg',
    hint: '귀가 길고 깡충깡충 뛰는 동물이에요',
    blankIndex: 1,
    charDistractors: ['기', '까']
  },
  {
    id: 'lion',
    name: '사자',
    category: '동물',
    emoji: '🦁',
    image: '/words/lion.jpg',
    hint: '어흥! 멋진 갈기를 가진 백수의 왕이에요',
    blankIndex: 1,
    charDistractors: ['차', '서']
  },
  {
    id: 'tiger',
    name: '호랑이',
    category: '동물',
    emoji: '🐯',
    image: '/words/tiger.jpg',
    hint: '어흥! 멋진 줄무늬를 가진 용감한 동물이에요',
    blankIndex: 1,
    charDistractors: ['강', '당']
  },
  {
    id: 'elephant',
    name: '코끼리',
    category: '동물',
    emoji: '🐘',
    image: '/words/elephant.jpg',
    hint: '코가 길쭉하고 귀가 커다란 동물이에요',
    blankIndex: 1,
    charDistractors: ['기', '키']
  },
  {
    id: 'giraffe',
    name: '기린',
    category: '동물',
    emoji: '🦒',
    image: '/words/giraffe.jpg',
    hint: '목이 아주 길어서 높은 나뭇잎도 잘 먹어요',
    blankIndex: 1,
    charDistractors: ['란', '런']
  },
  {
    id: 'panda',
    name: '판다',
    category: '동물',
    emoji: '🐼',
    image: '/words/panda.jpg',
    hint: '까만 안경 무늬에 대나무를 좋아하는 귀여운 곰이에요',
    blankIndex: 0,
    charDistractors: ['반', '한']
  },
  {
    id: 'monkey',
    name: '원숭이',
    category: '동물',
    emoji: '🐵',
    image: '/words/monkey.jpg',
    hint: '나무를 잘 타고 바나나를 좋아하는 동물이에요',
    blankIndex: 1,
    charDistractors: ['송', '상']
  },
  {
    id: 'penguin',
    name: '펭귄',
    category: '동물',
    emoji: '🐧',
    image: '/words/penguin.jpg',
    hint: '뒤뚱뒤뚱 걷고 추운 얼음 나라에 사는 새예요',
    blankIndex: 0,
    charDistractors: ['팽', '핑']
  },
  {
    id: 'pig',
    name: '돼지',
    category: '동물',
    emoji: '🐷',
    image: '/words/pig.jpg',
    hint: '꿀꿀! 복스러운 코를 가진 동물이에요',
    blankIndex: 0,
    charDistractors: ['대', '데']
  },
  {
    id: 'cow',
    name: '소',
    category: '동물',
    emoji: '🐮',
    image: '/words/cow.jpg',
    hint: '음메~ 맛있는 우유를 주는 고마운 동물이에요',
    blankIndex: 0,
    charDistractors: ['수', '서']
  },
  {
    id: 'horse',
    name: '말',
    category: '동물',
    emoji: '🐴',
    image: '/words/horse.jpg',
    hint: '히이잉! 초원을 빠르게 달리는 멋진 동물이에요',
    blankIndex: 0,
    charDistractors: ['발', '달']
  },
  {
    id: 'sheep',
    name: '양',
    category: '동물',
    emoji: '🐑',
    image: '/words/sheep.jpg',
    hint: '매애~ 하얀 구름처럼 포근한 털을 가졌어요',
    blankIndex: 0,
    charDistractors: ['영', '왕']
  },
  {
    id: 'bear',
    name: '곰',
    category: '동물',
    emoji: '🐻',
    image: '/words/bear.jpg',
    hint: '몸집이 크고 달콤한 꿀을 좋아하는 동물이에요',
    blankIndex: 0,
    charDistractors: ['공', '감']
  },
  {
    id: 'fox',
    name: '여우',
    category: '동물',
    emoji: '🦊',
    image: '/words/fox.jpg',
    hint: '풍성한 꼬리와 뾰족한 귀를 가진 영리한 동물이에요',
    blankIndex: 0,
    charDistractors: ['야', '요']
  },
  {
    id: 'squirrel',
    name: '다람쥐',
    category: '동물',
    emoji: '🐿️',
    image: '/words/squirrel.jpg',
    hint: '도토리를 볼에 가득 넣는 귀여운 숲속 동물이에요',
    blankIndex: 1,
    charDistractors: ['림', '름']
  },
  {
    id: 'koala',
    name: '코알라',
    category: '동물',
    emoji: '🐨',
    image: '/words/koala.jpg',
    hint: '유칼립투스 나무를 꼭 안고 잠자기를 좋아해요',
    blankIndex: 1,
    charDistractors: ['일', '울']
  },
  {
    id: 'dolphin',
    name: '돌고래',
    category: '동물',
    emoji: '🐬',
    image: '/words/dolphin.jpg',
    hint: '푸른 바다에서 멋지게 점프하는 영리한 친구예요',
    blankIndex: 2,
    charDistractors: ['리', '라']
  },
  {
    id: 'turtle',
    name: '거북이',
    category: '동물',
    emoji: '🐢',
    image: '/words/turtle.jpg',
    hint: '단단한 등딱지를 등에 지고 바닷속을 헤엄쳐요',
    blankIndex: 1,
    charDistractors: ['복', '박']
  },

  // ==================== 교통수단 (14) ====================
  {
    id: 'car',
    name: '자동차',
    category: '교통수단',
    emoji: '🚗',
    image: '/words/car.jpg',
    hint: '부릉부릉 도로 위를 달리는 탈것이에요',
    blankIndex: 1,
    charDistractors: ['통', '등']
  },
  {
    id: 'bus',
    name: '버스',
    category: '교통수단',
    emoji: '🚌',
    image: '/words/bus.jpg',
    hint: '많은 사람들이 함께 타는 커다란 자동차예요',
    blankIndex: 0,
    charDistractors: ['보', '바']
  },
  {
    id: 'train',
    name: '기차',
    category: '교통수단',
    emoji: '🚂',
    image: '/words/train.jpg',
    hint: '칙칙폭폭 긴 철길을 따라 달리는 탈것이에요',
    blankIndex: 1,
    charDistractors: ['자', '카']
  },
  {
    id: 'airplane',
    name: '비행기',
    category: '교통수단',
    emoji: '✈️',
    image: '/words/airplane.jpg',
    hint: '커다란 날개로 하늘 높이 날아가는 탈것이에요',
    blankIndex: 1,
    charDistractors: ['항', '형']
  },
  {
    id: 'ship',
    name: '배',
    category: '교통수단',
    emoji: '🚢',
    image: '/words/ship.jpg',
    hint: '부우우~ 넓은 바다 위를 떠다니는 탈것이에요',
    blankIndex: 0,
    charDistractors: ['베', '패']
  },
  {
    id: 'bicycle',
    name: '자전거',
    category: '교통수단',
    emoji: '🚲',
    image: '/words/bicycle.jpg',
    hint: '두 바퀴로 페달을 밟아 쌩쌩 타는 탈것이에요',
    blankIndex: 1,
    charDistractors: ['장', '정']
  },
  {
    id: 'police_car',
    name: '경찰차',
    category: '교통수단',
    emoji: '🚓',
    image: '/words/police_car.jpg',
    hint: '삐뽀삐뽀! 안전을 지키는 경찰관 아저씨의 차예요',
    blankIndex: 1,
    charDistractors: ['철', '창']
  },
  {
    id: 'fire_engine',
    name: '소방차',
    category: '교통수단',
    emoji: '🚒',
    image: '/words/fire_engine.jpg',
    hint: '애앵애앵! 불을 끄러 출동하는 빨간 차예요',
    blankIndex: 1,
    charDistractors: ['병', '봉']
  },
  {
    id: 'ambulance',
    name: '구급차',
    category: '교통수단',
    emoji: '🚑',
    image: '/words/ambulance.jpg',
    hint: '삐뽀삐뽀! 아픈 사람을 병원으로 데려다주는 차예요',
    blankIndex: 1,
    charDistractors: ['곱', '갑']
  },
  {
    id: 'taxi',
    name: '택시',
    category: '교통수단',
    emoji: '🚕',
    image: '/words/taxi.jpg',
    hint: '원하는 곳까지 친절하게 태워다 주는 자동차예요',
    blankIndex: 0,
    charDistractors: ['턱', '탁']
  },
  {
    id: 'truck',
    name: '트럭',
    category: '교통수단',
    emoji: '🚚',
    image: '/words/truck.jpg',
    hint: '무거운 짐을 가득 싣고 달리는 힘센 차예요',
    blankIndex: 1,
    charDistractors: ['락', '록']
  },
  {
    id: 'helicopter',
    name: '헬리콥터',
    category: '교통수단',
    emoji: '🚁',
    image: '/words/helicopter.jpg',
    hint: '머리 위 프로펠러가 빙글빙글 돌아 하늘을 날아요',
    blankIndex: 2,
    charDistractors: ['컵', '캡']
  },
  {
    id: 'motorcycle',
    name: '오토바이',
    category: '교통수단',
    emoji: '🏍️',
    image: '/words/motorcycle.jpg',
    hint: '헬멧을 쓰고 부릉부릉 달리는 두 바퀴 탈것이에요',
    blankIndex: 2,
    charDistractors: ['버', '비']
  },
  {
    id: 'rocket',
    name: '로켓',
    category: '교통수단',
    emoji: '🚀',
    image: '/words/rocket.jpg',
    hint: '슈웅! 불꽃을 내뿜으며 우주로 날아가요',
    blankIndex: 1,
    charDistractors: ['캣', '컷']
  },

  // ==================== 음식 (16) ====================
  {
    id: 'pizza',
    name: '피자',
    category: '음식',
    emoji: '🍕',
    image: '/words/pizza.jpg',
    hint: '쭉 늘어나는 치즈가 올라간 동그란 음식이에요',
    blankIndex: 0,
    charDistractors: ['비', '티']
  },
  {
    id: 'hamburger',
    name: '햄버거',
    category: '음식',
    emoji: '🍔',
    image: '/words/hamburger.jpg',
    hint: '동그란 빵 사이에 고기 패티와 채소가 들어있어요',
    blankIndex: 1,
    charDistractors: ['보', '바']
  },
  {
    id: 'chicken',
    name: '치킨',
    category: '음식',
    emoji: '🍗',
    image: '/words/chicken.jpg',
    hint: '바삭바삭 고소하게 튀긴 닭고기 요리예요',
    blankIndex: 1,
    charDistractors: ['칸', '큰']
  },
  {
    id: 'ramen',
    name: '라면',
    category: '음식',
    emoji: '🍜',
    image: '/words/ramen.jpg',
    hint: '꼬불꼬불 후루룩 먹는 맛있는 면 요리예요',
    blankIndex: 1,
    charDistractors: ['만', '문']
  },
  {
    id: 'gimbap',
    name: '김밥',
    category: '음식',
    emoji: '🍙',
    image: '/words/gimbap.jpg',
    hint: '까만 김에 밥과 여러 가지 재료를 넣어 돌돌 말았어요',
    blankIndex: 1,
    charDistractors: ['방', '법']
  },
  {
    id: 'cake',
    name: '케이크',
    category: '음식',
    emoji: '🍰',
    image: '/words/cake.jpg',
    hint: '생일 축하 노래를 부를 때 촛불을 꽂는 달콤한 빵이에요',
    blankIndex: 2,
    charDistractors: ['코', '카']
  },
  {
    id: 'tteokbokki',
    name: '떡볶이',
    category: '음식',
    emoji: '🍢',
    image: '/words/tteokbokki.jpg',
    hint: '쫄깃쫄깃한 가래떡을 맛있는 양념에 볶은 음식이에요',
    blankIndex: 0,
    charDistractors: ['턱', '덕']
  },
  {
    id: 'mandu',
    name: '만두',
    category: '음식',
    emoji: '🥟',
    image: '/words/mandu.jpg',
    hint: '얇은 피 속에 고기와 채소가 가득 들어있어요',
    blankIndex: 0,
    charDistractors: ['문', '민']
  },
  {
    id: 'sushi',
    name: '초밥',
    category: '음식',
    emoji: '🍣',
    image: '/words/sushi.jpg',
    hint: '한입 크기 밥 위에 신선한 생선을 올렸어요',
    blankIndex: 0,
    charDistractors: ['조', '소']
  },
  {
    id: 'donut',
    name: '도넛',
    category: '음식',
    emoji: '🍩',
    image: '/words/donut.jpg',
    hint: '가운데가 동그랗게 뚫린 달콤한 간식이에요',
    blankIndex: 0,
    charDistractors: ['토', '두']
  },
  {
    id: 'ice_cream',
    name: '아이스크림',
    category: '음식',
    emoji: '🍦',
    image: '/words/ice_cream.jpg',
    hint: '차가워서 입에서 사르르 녹는 달콤한 간식이에요',
    blankIndex: 3,
    charDistractors: ['코', '카']
  },
  {
    id: 'bread',
    name: '빵',
    category: '음식',
    emoji: '🥐',
    image: '/words/bread.jpg',
    hint: '고소한 냄새가 솔솔 나는 폭신폭신 음식이에요',
    blankIndex: 0,
    charDistractors: ['방', '뽕']
  },
  {
    id: 'chocolate',
    name: '초콜릿',
    category: '음식',
    emoji: '🍫',
    image: '/words/chocolate.jpg',
    hint: '갈색 빛깔의 달콤하고 부드러운 간식이에요',
    blankIndex: 1,
    charDistractors: ['쿨', '칼']
  },
  {
    id: 'milk',
    name: '우유',
    category: '음식',
    emoji: '🥛',
    image: '/words/milk.jpg',
    hint: '키가 쑥쑥 자라게 해주는 하얗고 고소한 음료예요',
    blankIndex: 1,
    charDistractors: ['요', '야']
  },
  {
    id: 'hotdog',
    name: '핫도그',
    category: '음식',
    emoji: '🌭',
    image: '/words/hotdog.png',
    hint: '길쭉한 빵 사이에 맛있는 소시지가 쏙 들어있어요',
    blankIndex: 1,
    charDistractors: ['두', '다']
  },
  {
    id: 'spaghetti',
    name: '스파게티',
    category: '음식',
    emoji: '🍝',
    image: '/words/spaghetti.jpg',
    hint: '포크로 돌돌 말아 먹는 맛있는 국수 요리예요',
    blankIndex: 1,
    charDistractors: ['피', '포']
  },

  // ==================== 자연과 곤충 (14) ====================
  {
    id: 'butterfly',
    name: '나비',
    category: '자연과 곤충',
    emoji: '🦋',
    image: '/words/butterfly.jpg',
    hint: '알록달록 예쁜 날개로 꽃밭을 훨훨 날아다녀요',
    blankIndex: 1,
    charDistractors: ['미', '피']
  },
  {
    id: 'ladybug',
    name: '무당벌레',
    category: '자연과 곤충',
    emoji: '🐞',
    image: '/words/ladybug.jpg',
    hint: '빨간 등껍질에 까만 점무늬가 있는 귀여운 곤충이에요',
    blankIndex: 2,
    charDistractors: ['발', '볼']
  },
  {
    id: 'bee',
    name: '꿀벌',
    category: '자연과 곤충',
    emoji: '🐝',
    image: '/words/bee.jpg',
    hint: '윙윙~ 꽃에서 달콤한 꿀을 모으는 부지런한 곤충이에요',
    blankIndex: 0,
    charDistractors: ['굴', '길']
  },
  {
    id: 'dragonfly',
    name: '잠자리',
    category: '자연과 곤충',
    emoji: '蜻',
    image: '/words/dragonfly.jpg',
    hint: '투명한 날개로 가을 하늘을 쌩쌩 날아다녀요',
    blankIndex: 0,
    charDistractors: ['참', '감']
  },
  {
    id: 'frog',
    name: '개구리',
    category: '자연과 곤충',
    emoji: '🐸',
    image: '/words/frog.jpg',
    hint: '개골개골 노래하며 폴짝 뛰는 초록 친구예요',
    blankIndex: 1,
    charDistractors: ['고', '기']
  },
  {
    id: 'snail',
    name: '달팽이',
    category: '자연과 곤충',
    emoji: '🐌',
    image: '/words/snail.jpg',
    hint: '동그란 집을 등에 업고 느릿느릿 걸어가요',
    blankIndex: 1,
    charDistractors: ['풍', '핑']
  },
  {
    id: 'sunflower',
    name: '해바라기',
    category: '자연과 곤충',
    emoji: '🌻',
    image: '/words/sunflower.jpg',
    hint: '해님을 닮은 크고 노란 예쁜 꽃이에요',
    blankIndex: 1,
    charDistractors: ['버', '보']
  },
  {
    id: 'rose',
    name: '장미',
    category: '자연과 곤충',
    emoji: '🌹',
    image: '/words/rose.jpg',
    hint: '향기가 좋고 꽃잎이 겹겹이 아름다운 꽃이에요',
    blankIndex: 0,
    charDistractors: ['정', '창']
  },
  {
    id: 'dandelion',
    name: '민들레',
    category: '자연과 곤충',
    emoji: '🌼',
    image: '/words/dandelion.jpg',
    hint: '후~ 불면 하얀 홀씨가 날아가는 노란 봄꽃이에요',
    blankIndex: 1,
    charDistractors: ['달', '돌']
  },
  {
    id: 'rainbow',
    name: '무지개',
    category: '자연과 곤충',
    emoji: '🌈',
    image: '/words/rainbow.jpg',
    hint: '비가 그친 뒤 하늘에 뜨는 일곱 빛깔 다리예요',
    blankIndex: 1,
    charDistractors: ['자', '주']
  },
  {
    id: 'cloud',
    name: '구름',
    category: '자연과 곤충',
    emoji: '☁️',
    image: '/words/cloud.jpg',
    hint: '파란 하늘에 솜사탕처럼 두둥실 떠 있어요',
    blankIndex: 1,
    charDistractors: ['람', '림']
  },
  {
    id: 'moon',
    name: '달',
    category: '자연과 곤충',
    emoji: '🌙',
    image: '/words/moon.jpg',
    hint: '깜깜한 밤하늘을 환하게 비춰줘요',
    blankIndex: 0,
    charDistractors: ['별', '발']
  },
  {
    id: 'sun',
    name: '태양',
    category: '자연과 곤충',
    emoji: '☀️',
    image: '/words/sun.jpg',
    hint: '낮에 세상을 따뜻하고 밝게 비춰주는 해님이에요',
    blankIndex: 0,
    charDistractors: ['테', '타']
  },
  {
    id: 'snowman',
    name: '눈사람',
    category: '자연과 곤충',
    emoji: '⛄',
    image: '/words/snowman.jpg',
    hint: '하얀 눈을 동그랗게 굴려 뭉쳐서 만들어요',
    blankIndex: 0,
    charDistractors: ['논', '물']
  },

  // ==================== 생활용품 (14) ====================
  {
    id: 'umbrella',
    name: '우산',
    category: '생활용품',
    emoji: '☂️',
    image: '/words/umbrella.jpg',
    hint: '비가 올 때 활짝 펴서 쓰는 물건이에요',
    blankIndex: 1,
    charDistractors: ['선', '손']
  },
  {
    id: 'clock',
    name: '시계',
    category: '생활용품',
    emoji: '⏰',
    image: '/words/clock.jpg',
    hint: '째깍째깍 지금 몇 시인지 알려줘요',
    blankIndex: 0,
    charDistractors: ['사', '서']
  },
  {
    id: 'glasses',
    name: '안경',
    category: '생활용품',
    emoji: '👓',
    image: '/words/glasses.jpg',
    hint: '눈이 잘 보이도록 귀에 걸어 쓰는 물건이에요',
    blankIndex: 1,
    charDistractors: ['강', '공']
  },
  {
    id: 'hat',
    name: '모자',
    category: '생활용품',
    emoji: '🧢',
    image: '/words/hat.jpg',
    hint: '햇빛을 가리거나 멋을 낼 때 머리에 써요',
    blankIndex: 0,
    charDistractors: ['무', '마']
  },
  {
    id: 'shoes',
    name: '신발',
    category: '생활용품',
    emoji: '👟',
    image: '/words/shoes.jpg',
    hint: '밖에 나갈 때 발에 신는 물건이에요',
    blankIndex: 1,
    charDistractors: ['벌', '볼']
  },
  {
    id: 'bag',
    name: '가방',
    category: '생활용품',
    emoji: '🎒',
    image: '/words/bag.jpg',
    hint: '책이나 장난감을 넣어서 어깨에 메고 다녀요',
    blankIndex: 1,
    charDistractors: ['병', '봉']
  },
  {
    id: 'toothbrush',
    name: '칫솔',
    category: '생활용품',
    emoji: '🪥',
    image: '/words/toothbrush.jpg',
    hint: '치카치카 이를 깨끗하게 닦을 때 써요',
    blankIndex: 1,
    charDistractors: ['술', '살']
  },
  {
    id: 'cup',
    name: '컵',
    category: '생활용품',
    emoji: '🥛',
    image: '/words/cup.jpg',
    hint: '물이나 주스를 담아서 마시는 그릇이에요',
    blankIndex: 0,
    charDistractors: ['캡', '공']
  },
  {
    id: 'spoon',
    name: '숟가락',
    category: '생활용품',
    emoji: '🥄',
    image: '/words/spoon.jpg',
    hint: '밥과 국을 떠먹을 때 사용하는 도구예요',
    blankIndex: 0,
    charDistractors: ['손', '솔']
  },
  {
    id: 'bed',
    name: '침대',
    category: '생활용품',
    emoji: '🛏️',
    image: '/words/bed.jpg',
    hint: '쿨쿨 포근하게 잠을 자는 가구예요',
    blankIndex: 0,
    charDistractors: ['짐', '집']
  },
  {
    id: 'chair',
    name: '의자',
    category: '생활용품',
    emoji: '🪑',
    image: '/words/chair.jpg',
    hint: '엉덩이를 붙이고 편안하게 앉는 가구예요',
    blankIndex: 0,
    charDistractors: ['이', '오']
  },
  {
    id: 'piano',
    name: '피아노',
    category: '생활용품',
    emoji: '🎹',
    image: '/words/piano.jpg',
    hint: '하얗고 까만 건반을 눌러 아름다운 소리를 내는 악기예요',
    blankIndex: 2,
    charDistractors: ['나', '누']
  },
  {
    id: 'ball',
    name: '축구공',
    category: '생활용품',
    emoji: '⚽',
    image: '/words/ball.jpg',
    hint: '데구르르 굴리고 발로 차며 노는 동그란 공이에요',
    blankIndex: 2,
    charDistractors: ['강', '곰']
  },
  {
    id: 'teddy_bear',
    name: '곰인형',
    category: '생활용품',
    emoji: '🧸',
    image: '/words/teddy_bear.jpg',
    hint: '품에 꼭 안고 놀기 좋은 폭신폭신 장난감이에요',
    blankIndex: 0,
    charDistractors: ['공', '감']
  },

  // ==================== 색깔 (12) ====================
  {
    id: 'color_red',
    name: '빨간색',
    category: '색깔',
    emoji: '❤️',
    colorHex: '#EF4444',
    colorSecondaryHex: '#FCA5A5',
    colorExamples: '🍎 사과 · 🍓 딸기 · 🚒 소방차',
    hint: '사과와 딸기, 소방차처럼 선명하고 따뜻한 색이에요',
    blankIndex: 1,
    charDistractors: ['강', '건']
  },
  {
    id: 'color_blue',
    name: '파란색',
    category: '색깔',
    emoji: '💙',
    colorHex: '#2563EB',
    colorSecondaryHex: '#93C5FD',
    colorExamples: '🌊 바다 · 🐬 돌고래 · 🫐 블루베리',
    hint: '넓은 바다처럼 시원하고 깊은 색이에요',
    blankIndex: 1,
    charDistractors: ['린', '런']
  },
  {
    id: 'color_yellow',
    name: '노란색',
    category: '색깔',
    emoji: '💛',
    colorHex: '#FACC15',
    colorSecondaryHex: '#FEF08A',
    colorExamples: '🍌 바나나 · 🌻 해바라기 · 🍋 레몬',
    hint: '바나나와 병아리, 해바라기처럼 밝고 환한 색이에요',
    blankIndex: 0,
    charDistractors: ['누', '나']
  },
  {
    id: 'color_green',
    name: '초록색',
    category: '색깔',
    emoji: '💚',
    colorHex: '#16A34A',
    colorSecondaryHex: '#86EFAC',
    colorExamples: '🐸 개구리 · 🥦 브로콜리 · 🥒 오이',
    hint: '숲속 나무와 개구리처럼 싱그러운 자연의 색이에요',
    blankIndex: 1,
    charDistractors: ['락', '룩']
  },
  {
    id: 'color_orange',
    name: '주황색',
    category: '색깔',
    emoji: '🧡',
    colorHex: '#F97316',
    colorSecondaryHex: '#FDBA74',
    colorExamples: '🍊 오렌지 · 🥕 당근 · 🎃 호박',
    hint: '오렌지와 당근처럼 상큼하고 활기찬 색이에요',
    blankIndex: 1,
    charDistractors: ['왕', '항']
  },
  {
    id: 'color_purple',
    name: '보라색',
    category: '색깔',
    emoji: '💜',
    colorHex: '#9333EA',
    colorSecondaryHex: '#D8B4FE',
    colorExamples: '🍇 포도 · 🍆 가지 · 🔮 마법구슬',
    hint: '포도와 가지처럼 신비롭고 고운 색이에요',
    blankIndex: 1,
    charDistractors: ['리', '로']
  },
  {
    id: 'color_pink',
    name: '분홍색',
    category: '색깔',
    emoji: '🩷',
    colorHex: '#EC4899',
    colorSecondaryHex: '#F9A8D4',
    colorExamples: '🍑 복숭아 · 🌸 벚꽃 · 🐷 아기돼지',
    hint: '복숭아와 봄날의 벚꽃처럼 사랑스러운 색이에요',
    blankIndex: 1,
    charDistractors: ['항', '흥']
  },
  {
    id: 'color_skyblue',
    name: '하늘색',
    category: '색깔',
    emoji: '🩵',
    colorHex: '#38BDF8',
    colorSecondaryHex: '#BAE6FD',
    colorExamples: '☁️ 맑은 하늘 · ❄️ 엘사 드레스',
    hint: '구름 한 점 없는 맑은 날의 하늘 같은 색이에요',
    blankIndex: 1,
    charDistractors: ['날', '놀']
  },
  {
    id: 'color_lightgreen',
    name: '연두색',
    category: '색깔',
    emoji: '🍏',
    colorHex: '#84CC16',
    colorSecondaryHex: '#D9F99D',
    colorExamples: '🌱 봄 새싹 · 🥝 키위 · 🐛 애벌레',
    hint: '봄에 막 피어난 귀여운 새싹 같은 밝은 초록빛이에요',
    blankIndex: 1,
    charDistractors: ['도', '다']
  },
  {
    id: 'color_brown',
    name: '갈색',
    category: '색깔',
    emoji: '🤎',
    colorHex: '#8B4513',
    colorSecondaryHex: '#D2B48C',
    colorExamples: '🍫 초콜릿 · 🐻 곰 · 🌰 밤과 도토리',
    hint: '달콤한 초콜릿과 곰인형, 도토리 같은 색이에요',
    blankIndex: 0,
    charDistractors: ['길', '걸']
  },
  {
    id: 'color_black',
    name: '검은색',
    category: '색깔',
    emoji: '🖤',
    colorHex: '#1F2937',
    colorSecondaryHex: '#6B7280',
    colorExamples: '🍙 김밥의 김 · 🌌 밤하늘 · 🐼 판다 귀',
    hint: '깜깜한 밤하늘과 고소한 김밥의 김 같은 색이에요',
    blankIndex: 0,
    charDistractors: ['감', '곰']
  },
  {
    id: 'color_white',
    name: '하얀색',
    category: '색깔',
    emoji: '🤍',
    colorHex: '#FFFFFF',
    colorSecondaryHex: '#E2E8F0',
    colorExamples: '⛄ 눈사람 · 🥛 우유 · ☁️ 구름',
    hint: '눈사람과 우유, 폭신한 구름처럼 깨끗한 색이에요',
    blankIndex: 1,
    charDistractors: ['연', '안']
  },

  // ==================== 디즈니 공주 (12) ====================
  {
    id: 'elsa',
    name: '엘사',
    category: '디즈니 공주',
    emoji: '❄️',
    image: '/words/elsa.png',
    hint: '겨울왕국의 반짝이는 얼음 마법을 쓰는 여왕이에요',
    blankIndex: 1,
    charDistractors: ['서', '수']
  },
  {
    id: 'anna',
    name: '안나',
    category: '디즈니 공주',
    emoji: '🧡',
    image: '/words/anna.png',
    hint: '엘사 언니를 사랑하는 밝고 용감한 겨울왕국 공주예요',
    blankIndex: 1,
    charDistractors: ['너', '노']
  },
  {
    id: 'olaf',
    name: '올라프',
    category: '디즈니 공주',
    emoji: '⛄',
    image: '/words/olaf.png',
    hint: '따뜻한 포옹을 좋아하는 겨울왕국의 귀여운 눈사람이에요',
    blankIndex: 1,
    charDistractors: ['리', '로']
  },
  {
    id: 'snow_white',
    name: '백설공주',
    category: '디즈니 공주',
    emoji: '🍎',
    image: '/words/snow_white.png',
    hint: '숲속의 일곱 난쟁이와 함께 지낸 착한 공주예요',
    blankIndex: 1,
    charDistractors: ['살', '솔']
  },
  {
    id: 'cinderella',
    name: '신데렐라',
    category: '디즈니 공주',
    emoji: '👠',
    image: '/words/cinderella.png',
    hint: '호박 마차를 타고 유리구두를 신은 공주예요',
    blankIndex: 1,
    charDistractors: ['다', '도']
  },
  {
    id: 'ariel',
    name: '아리엘',
    category: '디즈니 공주',
    emoji: '🧜‍♀️',
    image: '/words/ariel.png',
    hint: '바닷속 왕국에 사는 노래를 잘하는 빨간 머리 인어공주예요',
    blankIndex: 1,
    charDistractors: ['라', '로']
  },
  {
    id: 'belle',
    name: '벨',
    category: '디즈니 공주',
    emoji: '🌹',
    image: '/words/belle.png',
    hint: '노란 드레스를 입고 책 읽기를 좋아하는 지혜로운 공주예요',
    blankIndex: 0,
    charDistractors: ['별', '발']
  },
  {
    id: 'rapunzel',
    name: '라푼젤',
    category: '디즈니 공주',
    emoji: '👱‍♀️',
    image: '/words/rapunzel.png',
    hint: '마법처럼 빛나는 아주 긴 금발 머리를 가진 공주예요',
    blankIndex: 1,
    charDistractors: ['판', '핀']
  },
  {
    id: 'jasmine',
    name: '자스민',
    category: '디즈니 공주',
    emoji: '🧞',
    image: '/words/jasmine.png',
    hint: '알라딘과 함께 마법 양탄자를 타고 밤하늘을 나는 공주예요',
    blankIndex: 1,
    charDistractors: ['수', '소']
  },
  {
    id: 'aurora',
    name: '오로라',
    category: '디즈니 공주',
    emoji: '👑',
    image: '/words/aurora.png',
    hint: '장미꽃 향기가 가득한 잠자는 숲속의 공주예요',
    blankIndex: 1,
    charDistractors: ['루', '리']
  },
  {
    id: 'moana',
    name: '모아나',
    category: '디즈니 공주',
    emoji: '🌺',
    image: '/words/moana.png',
    hint: '푸른 바다의 부름을 받고 모험을 떠나는 용감한 소녀예요',
    blankIndex: 1,
    charDistractors: ['이', '오']
  },
  {
    id: 'mulan',
    name: '뮬란',
    category: '디즈니 공주',
    emoji: '🗡️',
    image: '/words/mulan.png',
    hint: '아버지를 대신해 가족과 나라를 지킨 용감한 소녀예요',
    blankIndex: 0,
    charDistractors: ['물', '밀']
  }
];

/**
 * 배열 셔플 유틸리티
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 이름 맞히기 (Game 1)용 4지선다 또는 3지선다 보기 생성
 */
export function generateNameOptions(target: WordItem, count = 4): string[] {
  const sameCategoryPool = WORDS.filter(
    w => w.category === target.category && w.name !== target.name
  );
  const pool = sameCategoryPool.length >= count - 1
    ? sameCategoryPool
    : WORDS.filter(w => w.name !== target.name);

  const distractors = shuffleArray(pool)
    .slice(0, count - 1)
    .map(w => w.name);

  return shuffleArray([target.name, ...distractors]);
}

/**
 * 빈칸 채우기 (Game 2)용 문제 생성
 */
export function generateBlankPuzzle(target: WordItem) {
  const chars = target.name.split('');
  const idx = Math.min(target.blankIndex, chars.length - 1);
  const missingChar = chars[idx];

  // 다른 단어에서 온 글자 1개 추가해 총 4개 선택지로 제공
  const extraChars = Array.from(
    new Set(
      WORDS.filter(w => w.category === target.category)
        .flatMap(w => w.name.split(''))
        .filter(c => c !== missingChar && !target.charDistractors.includes(c))
    )
  );
  const fourthChar = extraChars.length > 0
    ? extraChars[Math.floor(Math.random() * extraChars.length)]
    : '가';

  const options = shuffleArray(
    Array.from(new Set([missingChar, ...target.charDistractors, fourthChar])).slice(0, 4)
  );

  return {
    blankIndex: idx,
    missingChar,
    options
  };
}

/**
 * 한국어 TTS (음성 합성) 유틸리티
 */
export function speakKorean(text: string, rate = 0.92) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1.1; // 아이들에게 친근한 밝은 톤
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(v => v.lang.includes('ko'));
    if (koVoice) {
      utterance.voice = koVoice;
    }
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.log('TTS 재생 오류:', e);
  }
}
