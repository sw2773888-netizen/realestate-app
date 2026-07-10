/* ================= State ================= */
const state = {
  topic: null,
  index: 0,
  soundOn: true,
  stars: Number(localStorage.getItem("bhta_stars") || 0),
  gameScore: 0,
  gameAnswer: null,
};

/* ================= Helpers ================= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showScreen(id) {
  $$(".screen").forEach((s) => s.classList.remove("active"));
  $("#" + id).classList.add("active");
}

/* ---------- Text to speech (đọc tiếng Anh) ---------- */
let voices = [];
function loadVoices() {
  voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
}
if (window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text) {
  if (!state.soundOn || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.8; // chậm để bé nghe rõ
  u.pitch = 1.1;
  const enVoice =
    voices.find((v) => /en-US/i.test(v.lang) && /female|Samantha|Google US/i.test(v.name)) ||
    voices.find((v) => /^en/i.test(v.lang));
  if (enVoice) u.voice = enVoice;
  window.speechSynthesis.speak(u);
}

/* ---------- Âm thanh vui khi làm đúng (Web Audio) ---------- */
let audioCtx = null;
function playTone(freqs, dur = 0.15) {
  if (!state.soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      o.connect(g);
      g.connect(audioCtx.destination);
      const t = audioCtx.currentTime + i * dur;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t);
      o.stop(t + dur);
    });
  } catch (e) {
    /* bỏ qua nếu trình duyệt không hỗ trợ */
  }
}
const playCorrect = () => playTone([523, 659, 784, 1047]); // đô-mi-sol-đô vui tai
const playWrong = () => playTone([300, 200], 0.2);

/* ---------- Sao thưởng ---------- */
function addStars(n) {
  state.stars += n;
  localStorage.setItem("bhta_stars", state.stars);
  updateStars();
}
function updateStars() {
  $("#home-stars").textContent = state.stars;
}

/* ---------- Pháo hoa / khen thưởng ---------- */
function celebrate(msg) {
  const layer = $("#reward");
  layer.innerHTML = "";
  const bubble = document.createElement("div");
  bubble.className = "reward-bubble";
  bubble.textContent = msg;
  layer.appendChild(bubble);

  const emojis = ["🎉", "⭐", "🌟", "🎈", "🏆", "✨", "🎊", "💖"];
  for (let i = 0; i < 26; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDelay = Math.random() * 0.5 + "s";
    c.style.fontSize = 18 + Math.random() * 26 + "px";
    layer.appendChild(c);
  }
  setTimeout(() => (layer.innerHTML = ""), 1800);
}

/* ================= Flashcards (Học) ================= */
function openTopic(key) {
  state.topic = key;
  state.index = 0;
  const t = TOPICS[key];
  $("#learn-title").textContent = t.title;
  $("#card-total").textContent = t.items.length;
  buildDots(t.items.length);
  renderCard();
  showScreen("learn");
}

function buildDots(n) {
  const dots = $("#dots");
  dots.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const d = document.createElement("span");
    d.className = "dot";
    dots.appendChild(d);
  }
}

function renderCard() {
  const item = TOPICS[state.topic].items[state.index];
  const card = $("#flashcard");
  card.classList.remove("pop");
  void card.offsetWidth; // reset animation
  card.classList.add("pop");

  $("#flash-emoji").textContent = item.emoji;
  $("#flash-word").textContent = item.en;
  $("#flash-vi").textContent = item.vi;
  $("#card-index").textContent = state.index + 1;

  $$("#dots .dot").forEach((d, i) => d.classList.toggle("on", i === state.index));

  speak(item.say);
}

function nextCard() {
  const items = TOPICS[state.topic].items;
  if (state.index < items.length - 1) {
    state.index++;
    renderCard();
  } else {
    // học hết một chủ đề -> thưởng
    addStars(1);
    celebrate("Giỏi quá! 🏆 +1 sao");
    playCorrect();
  }
}
function prevCard() {
  if (state.index > 0) {
    state.index--;
    renderCard();
  }
}

/* ================= Trò chơi (Quiz) ================= */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  state.gameScore = 0;
  $("#game-score").textContent = 0;
  showScreen("game");
  nextQuestion();
}

function nextQuestion() {
  $("#game-feedback").textContent = "";
  // gộp tất cả items từ các chủ đề chơi
  const pool = [];
  GAME_TOPICS.forEach((k) => TOPICS[k].items.forEach((it) => pool.push(it)));

  const correct = pool[Math.floor(Math.random() * pool.length)];
  state.gameAnswer = correct;

  // 3 lựa chọn: 1 đúng + 2 sai (khác emoji)
  const wrongs = shuffle(pool.filter((p) => p.emoji !== correct.emoji)).slice(0, 2);
  const options = shuffle([correct, ...wrongs]);

  $("#quiz-word").textContent = correct.en + "  ·  " + correct.vi.split("—")[0];
  const box = $("#quiz-options");
  box.innerHTML = "";
  options.forEach((opt) => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.textContent = opt.emoji;
    b.onclick = () => checkAnswer(opt, b);
    box.appendChild(b);
  });

  setTimeout(() => speak(correct.say), 350);
}

function checkAnswer(opt, btn) {
  if (opt.emoji === state.gameAnswer.emoji) {
    btn.classList.add("right");
    $("#game-feedback").textContent = "Chính xác! 🎉";
    state.gameScore++;
    $("#game-score").textContent = state.gameScore;
    addStars(1);
    playCorrect();
    celebrate("Đúng rồi! ⭐");
    $$("#quiz-options .quiz-opt").forEach((b) => (b.disabled = true));
    setTimeout(nextQuestion, 1300);
  } else {
    btn.classList.add("wrong");
    btn.disabled = true;
    $("#game-feedback").textContent = "Thử lại nào! 💪";
    playWrong();
  }
}

/* ================= Điều hướng & sự kiện ================= */
function go(target) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (target === "home") {
    updateStars();
    showScreen("home");
  } else if (target === "game") {
    startGame();
  } else if (TOPICS[target]) {
    openTopic(target);
  }
}

document.addEventListener("click", (e) => {
  const goBtn = e.target.closest("[data-go]");
  if (goBtn) go(goBtn.dataset.go);
});

$("#next-card").addEventListener("click", nextCard);
$("#prev-card").addEventListener("click", prevCard);
$("#speak-btn").addEventListener("click", () =>
  speak(TOPICS[state.topic].items[state.index].say)
);
$("#flashcard").addEventListener("click", (e) => {
  if (!e.target.closest(".speak-btn")) {
    speak(TOPICS[state.topic].items[state.index].say);
  }
});

$("#game-speak").addEventListener("click", () => {
  if (state.gameAnswer) speak(state.gameAnswer.say);
});

$("#sound-toggle").addEventListener("click", () => {
  state.soundOn = !state.soundOn;
  $("#sound-toggle").textContent = state.soundOn ? "🔊 Âm thanh" : "🔇 Tắt tiếng";
  if (!state.soundOn && window.speechSynthesis) window.speechSynthesis.cancel();
});

// Vuốt trái/phải trên điện thoại để chuyển thẻ
let touchX = null;
$("#learn").addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX));
$("#learn").addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (dx < -50) nextCard();
  else if (dx > 50) prevCard();
  touchX = null;
});

// Phím mũi tên trên máy tính
document.addEventListener("keydown", (e) => {
  if (!$("#learn").classList.contains("active")) return;
  if (e.key === "ArrowRight") nextCard();
  if (e.key === "ArrowLeft") prevCard();
  if (e.key === " ") {
    e.preventDefault();
    speak(TOPICS[state.topic].items[state.index].say);
  }
});

/* ================= Khởi động ================= */
updateStars();
