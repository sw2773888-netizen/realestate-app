/* ================= State ================= */
const state = {
  topic: null,
  index: 0,
  soundOn: true,
  stars: Number(localStorage.getItem("bhta_stars") || 0),
  rate: Number(localStorage.getItem("bhta_rate") || 0.8),
  done: JSON.parse(localStorage.getItem("bhta_done") || "{}"), // chủ đề đã học xong
  gameScore: 0,
  gameAnswer: null,
  // spelling
  spellWord: null,
  spellBuilt: [],
  spellScore: 0,
  // tracing
  traceIndex: 0,
};

function markDone(topic) {
  if (!state.done[topic]) {
    state.done[topic] = true;
    localStorage.setItem("bhta_done", JSON.stringify(state.done));
  }
}

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
  u.rate = state.rate; // chậm để bé nghe rõ
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
    markDone(state.topic);
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

/* ================= Trò chơi ghép chữ (Spelling) ================= */
function startSpell() {
  state.spellScore = 0;
  $("#spell-score").textContent = 0;
  showScreen("spell");
  nextSpell();
}

function nextSpell() {
  $("#spell-feedback").textContent = "";
  const pool = [];
  SPELL_TOPICS.forEach((k) =>
    TOPICS[k].items.forEach((it) => {
      // chỉ lấy từ 1 chữ, ngắn (<= 8 ký tự) cho bé dễ ghép
      if (/^[a-zA-Z]+$/.test(it.en) && it.en.length <= 8) pool.push(it);
    })
  );
  const word = pool[Math.floor(Math.random() * pool.length)];
  state.spellWord = word;
  state.spellBuilt = [];

  $("#spell-emoji").textContent = word.emoji;
  $("#spell-vi").textContent = word.vi;

  // ô trống theo số chữ cái
  const slots = $("#spell-slots");
  slots.innerHTML = "";
  word.en.split("").forEach(() => {
    const s = document.createElement("div");
    s.className = "spell-slot";
    slots.appendChild(s);
  });

  // các mảnh chữ cái xáo trộn
  const letters = shuffle(word.en.toUpperCase().split(""));
  const tiles = $("#spell-tiles");
  tiles.innerHTML = "";
  letters.forEach((ch, i) => {
    const t = document.createElement("button");
    t.className = "spell-tile";
    t.textContent = ch;
    t.dataset.idx = i;
    t.onclick = () => placeLetter(ch, t);
    tiles.appendChild(t);
  });

  setTimeout(() => speak(word.say), 300);
  renderSpellSlots();
}

function renderSpellSlots() {
  const slots = $$("#spell-slots .spell-slot");
  slots.forEach((s, i) => {
    s.textContent = state.spellBuilt[i] || "";
    s.classList.toggle("filled", !!state.spellBuilt[i]);
  });
}

function placeLetter(ch, tile) {
  if (tile.disabled) return;
  const target = state.spellWord.en.toUpperCase();
  if (state.spellBuilt.length >= target.length) return;
  state.spellBuilt.push(ch);
  tile.disabled = true;
  tile.classList.add("used");
  renderSpellSlots();

  if (state.spellBuilt.length === target.length) checkSpell();
}

function undoLetter() {
  if (!state.spellBuilt.length) return;
  state.spellBuilt.pop();
  // bật lại mảnh chữ cuối cùng đã dùng
  const usedTiles = $$("#spell-tiles .spell-tile.used");
  const last = usedTiles[usedTiles.length - 1];
  if (last) {
    last.disabled = false;
    last.classList.remove("used");
  }
  $("#spell-feedback").textContent = "";
  renderSpellSlots();
}

function checkSpell() {
  const target = state.spellWord.en.toUpperCase();
  const built = state.spellBuilt.join("");
  if (built === target) {
    $("#spell-feedback").textContent = "Tuyệt vời! 🎉 " + state.spellWord.en;
    $$("#spell-slots .spell-slot").forEach((s) => s.classList.add("correct"));
    state.spellScore++;
    $("#spell-score").textContent = state.spellScore;
    addStars(1);
    playCorrect();
    celebrate("Đúng chính tả! ⭐");
    speak(state.spellWord.say);
    setTimeout(nextSpell, 1600);
  } else {
    $("#spell-feedback").textContent = "Chưa đúng, thử lại nhé! 💪";
    playWrong();
    $$("#spell-slots .spell-slot").forEach((s) => s.classList.add("shake"));
    setTimeout(() => resetSpellAttempt(), 700);
  }
}

function resetSpellAttempt() {
  state.spellBuilt = [];
  $$("#spell-tiles .spell-tile").forEach((t) => {
    t.disabled = false;
    t.classList.remove("used");
  });
  $$("#spell-slots .spell-slot").forEach((s) =>
    s.classList.remove("correct", "shake")
  );
  renderSpellSlots();
}

function spellHint() {
  // điền chữ cái đúng tiếp theo
  const target = state.spellWord.en.toUpperCase();
  const nextCh = target[state.spellBuilt.length];
  if (!nextCh) return;
  const tile = $$("#spell-tiles .spell-tile").find(
    (t) => !t.disabled && t.textContent === nextCh
  );
  if (tile) placeLetter(nextCh, tile);
}

/* ================= Tập viết (Tracing) ================= */
let traceCtx = null;
let tracing = false;

function initTraceCanvas() {
  const canvas = $("#trace-canvas");
  traceCtx = canvas.getContext("2d");
  traceCtx.lineCap = "round";
  traceCtx.lineJoin = "round";
  traceCtx.lineWidth = 26;
  traceCtx.strokeStyle = "#ff5c8a";
}

function tracePos(e) {
  const canvas = $("#trace-canvas");
  const rect = canvas.getBoundingClientRect();
  const p = e.touches ? e.touches[0] : e;
  return {
    x: ((p.clientX - rect.left) / rect.width) * canvas.width,
    y: ((p.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function startTrace() {
  state.traceIndex = 0;
  showScreen("trace");
  initTraceCanvas();
  renderTrace();
}

function renderTrace() {
  const ch = TRACE_SET[state.traceIndex];
  $("#trace-ghost").textContent = ch;
  clearTrace();
  const isLetter = /[A-Z]/.test(ch);
  speak(isLetter ? ch + ". " + ch : "Number " + ch);
}

function clearTrace() {
  const canvas = $("#trace-canvas");
  if (traceCtx) traceCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function traceMove(e) {
  if (!tracing) return;
  e.preventDefault();
  const pos = tracePos(e);
  traceCtx.lineTo(pos.x, pos.y);
  traceCtx.stroke();
}
function traceStart(e) {
  tracing = true;
  const pos = tracePos(e);
  traceCtx.beginPath();
  traceCtx.moveTo(pos.x, pos.y);
}
function traceEnd() {
  tracing = false;
}

function traceNav(dir) {
  state.traceIndex =
    (state.traceIndex + dir + TRACE_SET.length) % TRACE_SET.length;
  renderTrace();
}

function traceDone() {
  addStars(1);
  playCorrect();
  celebrate("Viết đẹp lắm! ✍️ +1 sao");
  setTimeout(() => traceNav(1), 900);
}

/* ================= Thành tích (Badges) ================= */
const LEVELS = [
  { min: 0, emoji: "🌱", name: "Bé mới bắt đầu" },
  { min: 10, emoji: "🐣", name: "Chăm học" },
  { min: 25, emoji: "🌟", name: "Bé giỏi" },
  { min: 50, emoji: "🚀", name: "Siêu sao" },
  { min: 100, emoji: "👑", name: "Nhà vô địch" },
];

function currentLevel() {
  let lvl = LEVELS[0];
  for (const l of LEVELS) if (state.stars >= l.min) lvl = l;
  return lvl;
}

function showBadges() {
  $("#badge-stars").textContent = state.stars;
  const lvl = currentLevel();
  const next = LEVELS.find((l) => l.min > state.stars);
  $("#level-emoji").textContent = lvl.emoji;
  $("#level-name").textContent = lvl.name;
  if (next) {
    const prevMin = lvl.min;
    const pct = Math.min(
      100,
      ((state.stars - prevMin) / (next.min - prevMin)) * 100
    );
    $("#level-fill").style.width = pct + "%";
    $("#level-hint").textContent =
      "Còn " + (next.min - state.stars) + " sao nữa lên " + next.emoji + " " + next.name;
  } else {
    $("#level-fill").style.width = "100%";
    $("#level-hint").textContent = "Bé đã đạt cấp cao nhất! 🎉";
  }

  const grid = $("#badge-grid");
  grid.innerHTML = "";
  Object.keys(TOPICS).forEach((key) => {
    const t = TOPICS[key];
    const done = !!state.done[key];
    const b = document.createElement("div");
    b.className = "badge-item" + (done ? " earned" : "");
    b.innerHTML =
      '<div class="badge-face">' +
      (done ? "🏅" : "🔒") +
      "</div><div class='badge-name'>" +
      t.title +
      "</div>";
    grid.appendChild(b);
  });
  showScreen("badges");
}

/* ================= Cài đặt (Settings) ================= */
function initSettings() {
  const range = $("#rate-range");
  range.value = state.rate;
  updateRateLabel();
}
function updateRateLabel() {
  const r = state.rate;
  $("#rate-val").textContent = r <= 0.6 ? "Chậm 🐢" : r >= 0.9 ? "Nhanh 🐇" : "Vừa";
}

/* ================= Điều hướng & sự kiện ================= */
function go(target) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (target === "home") {
    updateStars();
    showScreen("home");
  } else if (target === "game") {
    startGame();
  } else if (target === "spell") {
    startSpell();
  } else if (target === "trace") {
    startTrace();
  } else if (target === "badges") {
    showBadges();
  } else if (target === "settings") {
    initSettings();
    showScreen("settings");
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

/* ---- Spelling events ---- */
$("#spell-speak").addEventListener("click", () => {
  if (state.spellWord) speak(state.spellWord.say);
});
$("#spell-undo").addEventListener("click", undoLetter);
$("#spell-hint").addEventListener("click", spellHint);

/* ---- Tracing events ---- */
const traceCanvas = $("#trace-canvas");
traceCanvas.addEventListener("mousedown", traceStart);
traceCanvas.addEventListener("mousemove", traceMove);
window.addEventListener("mouseup", traceEnd);
traceCanvas.addEventListener("touchstart", traceStart, { passive: false });
traceCanvas.addEventListener("touchmove", traceMove, { passive: false });
traceCanvas.addEventListener("touchend", traceEnd);
$("#trace-clear").addEventListener("click", clearTrace);
$("#trace-done").addEventListener("click", traceDone);
$("#trace-prev").addEventListener("click", () => traceNav(-1));
$("#trace-next").addEventListener("click", () => traceNav(1));
$("#trace-speak").addEventListener("click", () => {
  const ch = TRACE_SET[state.traceIndex];
  speak(/[A-Z]/.test(ch) ? ch : "Number " + ch);
});

/* ---- Settings events ---- */
$("#rate-range").addEventListener("input", (e) => {
  state.rate = Number(e.target.value);
  localStorage.setItem("bhta_rate", state.rate);
  updateRateLabel();
});
$("#test-voice").addEventListener("click", () => speak("Hello. How are you?"));
$("#reset-progress").addEventListener("click", () => {
  if (confirm("Xoá toàn bộ sao và thành tích của bé?")) {
    state.stars = 0;
    state.done = {};
    localStorage.removeItem("bhta_stars");
    localStorage.removeItem("bhta_done");
    updateStars();
    alert("Đã đặt lại! Bé bắt đầu lại từ đầu nhé 🌱");
  }
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
