const users = [
  {
    name: "admin user",
    email: "admin@example.com",
    image: "/avatar/admin.jpeg",
    password: "123456",
  },
  {
    name: "girl user",
    email: "girl@example.com",
    image: "/avatar/girl.jpeg",
    password: "123456",
  },
  {
    name: "boy user",
    email: "boy@example.com",
    image: "/avatar/boy.jpeg",
    password: "123456",
  },
];

const premiumArticles = [
  {
    title: "寿司の魅力",
    content: "寿司の歴史と種類、日本の食文化としての重要性について。",
    image: "/images/sushi.jpg",
  },
  {
    title: "天ぷらの基本",
    content: "サクサクの天ぷらを家庭で作るコツとは。野菜や魚介の選び方。",
    image: "/images/tenpura.jpg",
  },
  {
    title: "刺身の彩り",
    content: "新鮮な魚介を使った刺身の盛り付け方と味わい方。",
    image: "/images/sashimi.jpg",
  },
];
const standardArticles = [
  {
    title: "家庭の味噌汁",
    content: "毎日の食卓に欠かせない味噌汁のバリエーションを紹介します。",
    image: "/images/misoshiru.jpg",
  },
  {
    title: "餃子の楽しみ方",
    content: "家庭で簡単に作れる餃子のレシピとアレンジ方法。",
    image: "/images/gyouza.jpg",
  },
  {
    title: "焼き鳥で一杯",
    content: "おうちで居酒屋気分！簡単焼き鳥のマリネと焼き方。",
    image: "/images/yakitori.jpg",
  },
];
const freeArticles = [
  {
    title: "カツ丼を極める",
    content:
      "カツ丼一つをとっても、そのバリエーションは豊富です。その魅力を探求。",
    image: "/images/katsudon.jpg",
  },
  {
    title: "そば打ち体験",
    content: "手打ちそばの基礎から応用まで。自宅で挑戦するそば打ちのコツ。",
    image: "/images/soba.jpg",
  },
  {
    title: "ラーメンの奥深さ",
    content: "ラーメン一杯に込められた、無限の可能性について考えます。",
    image: "/images/ramen.jpg",
  },
  {
    title: "お好み焼きの秘密",
    content: "関西風から広島風まで、お好み焼きの地域ごとの特色を紹介。",
    image: "/images/okonomiyaki.jpg",
  },
];

module.exports = {
  users,
  premiumArticles,
  standardArticles,
  freeArticles,
};
