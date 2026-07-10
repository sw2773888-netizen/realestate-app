/*
 * Nội dung học tập cho bé chuẩn bị vào lớp 1.
 * Mỗi mục có: emoji (hình minh hoạ), en (từ tiếng Anh), vi (nghĩa tiếng Việt),
 * và say (câu để máy đọc — có thể kèm ví dụ).
 */
const TOPICS = {
  alphabet: {
    title: "🔤 Bảng chữ cái",
    items: [
      { emoji: "🍎", en: "A", vi: "A — Apple (Quả táo)", say: "A. A for Apple" },
      { emoji: "🎈", en: "B", vi: "B — Balloon (Bóng bay)", say: "B. B for Balloon" },
      { emoji: "🐱", en: "C", vi: "C — Cat (Con mèo)", say: "C. C for Cat" },
      { emoji: "🐶", en: "D", vi: "D — Dog (Con chó)", say: "D. D for Dog" },
      { emoji: "🥚", en: "E", vi: "E — Egg (Quả trứng)", say: "E. E for Egg" },
      { emoji: "🐟", en: "F", vi: "F — Fish (Con cá)", say: "F. F for Fish" },
      { emoji: "🍇", en: "G", vi: "G — Grapes (Chùm nho)", say: "G. G for Grapes" },
      { emoji: "🎩", en: "H", vi: "H — Hat (Cái mũ)", say: "H. H for Hat" },
      { emoji: "🍦", en: "I", vi: "I — Ice cream (Kem)", say: "I. I for Ice cream" },
      { emoji: "🧃", en: "J", vi: "J — Juice (Nước ép)", say: "J. J for Juice" },
      { emoji: "🪁", en: "K", vi: "K — Kite (Cái diều)", say: "K. K for Kite" },
      { emoji: "🦁", en: "L", vi: "L — Lion (Sư tử)", say: "L. L for Lion" },
      { emoji: "🌙", en: "M", vi: "M — Moon (Mặt trăng)", say: "M. M for Moon" },
      { emoji: "👃", en: "N", vi: "N — Nose (Cái mũi)", say: "N. N for Nose" },
      { emoji: "🍊", en: "O", vi: "O — Orange (Quả cam)", say: "O. O for Orange" },
      { emoji: "🐷", en: "P", vi: "P — Pig (Con lợn)", say: "P. P for Pig" },
      { emoji: "👑", en: "Q", vi: "Q — Queen (Nữ hoàng)", say: "Q. Q for Queen" },
      { emoji: "🌈", en: "R", vi: "R — Rainbow (Cầu vồng)", say: "R. R for Rainbow" },
      { emoji: "☀️", en: "S", vi: "S — Sun (Mặt trời)", say: "S. S for Sun" },
      { emoji: "🌳", en: "T", vi: "T — Tree (Cái cây)", say: "T. T for Tree" },
      { emoji: "☂️", en: "U", vi: "U — Umbrella (Cái ô)", say: "U. U for Umbrella" },
      { emoji: "🎻", en: "V", vi: "V — Violin (Đàn vĩ cầm)", say: "V. V for Violin" },
      { emoji: "🍉", en: "W", vi: "W — Watermelon (Dưa hấu)", say: "W. W for Watermelon" },
      { emoji: "🎁", en: "X", vi: "X — Box (Cái hộp)", say: "X. X for Box" },
      { emoji: "🛥️", en: "Y", vi: "Y — Yacht (Du thuyền)", say: "Y. Y for Yacht" },
      { emoji: "🦓", en: "Z", vi: "Z — Zebra (Ngựa vằn)", say: "Z. Z for Zebra" },
    ],
  },

  numbers: {
    title: "🔢 Số đếm",
    items: [
      { emoji: "☝️", en: "One", vi: "Số 1 — Một", say: "One. Number one" },
      { emoji: "✌️", en: "Two", vi: "Số 2 — Hai", say: "Two. Number two" },
      { emoji: "🖐️", en: "Three", vi: "Số 3 — Ba", say: "Three. Number three" },
      { emoji: "🍀", en: "Four", vi: "Số 4 — Bốn", say: "Four. Number four" },
      { emoji: "🖐️", en: "Five", vi: "Số 5 — Năm", say: "Five. Number five" },
      { emoji: "🎲", en: "Six", vi: "Số 6 — Sáu", say: "Six. Number six" },
      { emoji: "🌈", en: "Seven", vi: "Số 7 — Bảy", say: "Seven. Number seven" },
      { emoji: "🐙", en: "Eight", vi: "Số 8 — Tám", say: "Eight. Number eight" },
      { emoji: "🎱", en: "Nine", vi: "Số 9 — Chín", say: "Nine. Number nine" },
      { emoji: "🔟", en: "Ten", vi: "Số 10 — Mười", say: "Ten. Number ten" },
    ],
  },

  colors: {
    title: "🎨 Màu sắc",
    items: [
      { emoji: "🔴", en: "Red", vi: "Màu đỏ", say: "Red" },
      { emoji: "🟠", en: "Orange", vi: "Màu cam", say: "Orange" },
      { emoji: "🟡", en: "Yellow", vi: "Màu vàng", say: "Yellow" },
      { emoji: "🟢", en: "Green", vi: "Màu xanh lá", say: "Green" },
      { emoji: "🔵", en: "Blue", vi: "Màu xanh dương", say: "Blue" },
      { emoji: "🟣", en: "Purple", vi: "Màu tím", say: "Purple" },
      { emoji: "🟤", en: "Brown", vi: "Màu nâu", say: "Brown" },
      { emoji: "⚫", en: "Black", vi: "Màu đen", say: "Black" },
      { emoji: "⚪", en: "White", vi: "Màu trắng", say: "White" },
      { emoji: "🩷", en: "Pink", vi: "Màu hồng", say: "Pink" },
    ],
  },

  animals: {
    title: "🐘 Con vật",
    items: [
      { emoji: "🐶", en: "Dog", vi: "Con chó", say: "Dog" },
      { emoji: "🐱", en: "Cat", vi: "Con mèo", say: "Cat" },
      { emoji: "🐘", en: "Elephant", vi: "Con voi", say: "Elephant" },
      { emoji: "🦁", en: "Lion", vi: "Sư tử", say: "Lion" },
      { emoji: "🐯", en: "Tiger", vi: "Con hổ", say: "Tiger" },
      { emoji: "🐵", en: "Monkey", vi: "Con khỉ", say: "Monkey" },
      { emoji: "🐰", en: "Rabbit", vi: "Con thỏ", say: "Rabbit" },
      { emoji: "🐻", en: "Bear", vi: "Con gấu", say: "Bear" },
      { emoji: "🐷", en: "Pig", vi: "Con lợn", say: "Pig" },
      { emoji: "🐮", en: "Cow", vi: "Con bò", say: "Cow" },
      { emoji: "🐴", en: "Horse", vi: "Con ngựa", say: "Horse" },
      { emoji: "🐔", en: "Chicken", vi: "Con gà", say: "Chicken" },
      { emoji: "🦆", en: "Duck", vi: "Con vịt", say: "Duck" },
      { emoji: "🐟", en: "Fish", vi: "Con cá", say: "Fish" },
      { emoji: "🐦", en: "Bird", vi: "Con chim", say: "Bird" },
    ],
  },

  shapes: {
    title: "⭐ Hình khối",
    items: [
      { emoji: "⭕", en: "Circle", vi: "Hình tròn", say: "Circle" },
      { emoji: "🟥", en: "Square", vi: "Hình vuông", say: "Square" },
      { emoji: "🔺", en: "Triangle", vi: "Hình tam giác", say: "Triangle" },
      { emoji: "🟦", en: "Rectangle", vi: "Hình chữ nhật", say: "Rectangle" },
      { emoji: "⭐", en: "Star", vi: "Hình ngôi sao", say: "Star" },
      { emoji: "❤️", en: "Heart", vi: "Hình trái tim", say: "Heart" },
      { emoji: "💎", en: "Diamond", vi: "Hình thoi", say: "Diamond" },
      { emoji: "🥚", en: "Oval", vi: "Hình bầu dục", say: "Oval" },
    ],
  },

  family: {
    title: "👨‍👩‍👧‍👦 Gia đình",
    items: [
      { emoji: "👨", en: "Father", vi: "Bố", say: "Father. Dad" },
      { emoji: "👩", en: "Mother", vi: "Mẹ", say: "Mother. Mom" },
      { emoji: "👦", en: "Brother", vi: "Anh / Em trai", say: "Brother" },
      { emoji: "👧", en: "Sister", vi: "Chị / Em gái", say: "Sister" },
      { emoji: "👴", en: "Grandfather", vi: "Ông", say: "Grandfather" },
      { emoji: "👵", en: "Grandmother", vi: "Bà", say: "Grandmother" },
      { emoji: "👶", en: "Baby", vi: "Em bé", say: "Baby" },
      { emoji: "👨‍👩‍👧‍👦", en: "Family", vi: "Gia đình", say: "Family" },
    ],
  },

  fruits: {
    title: "🍎 Trái cây",
    items: [
      { emoji: "🍎", en: "Apple", vi: "Quả táo", say: "Apple" },
      { emoji: "🍌", en: "Banana", vi: "Quả chuối", say: "Banana" },
      { emoji: "🍊", en: "Orange", vi: "Quả cam", say: "Orange" },
      { emoji: "🍇", en: "Grapes", vi: "Chùm nho", say: "Grapes" },
      { emoji: "🍉", en: "Watermelon", vi: "Dưa hấu", say: "Watermelon" },
      { emoji: "🍓", en: "Strawberry", vi: "Dâu tây", say: "Strawberry" },
      { emoji: "🍍", en: "Pineapple", vi: "Quả dứa", say: "Pineapple" },
      { emoji: "🥭", en: "Mango", vi: "Quả xoài", say: "Mango" },
      { emoji: "🍑", en: "Peach", vi: "Quả đào", say: "Peach" },
      { emoji: "🍒", en: "Cherry", vi: "Quả anh đào", say: "Cherry" },
    ],
  },
};

// Các chủ đề dùng cho trò chơi (đố vui)
const GAME_TOPICS = ["animals", "fruits", "colors", "numbers", "shapes"];
