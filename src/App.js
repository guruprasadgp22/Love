import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Dancing+Script:wght@400;600;700&family=Lato:wght@300;400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --rose: #e8405a;
    --deep-rose: #c0273e;
    --blush: #f9d0d8;
    --petal: #fde8ec;
    --gold: #c9a84c;
    --cream: #fff8f9;
    --deep: #3d0c14;
    --soft: #7d2d3c;
  }

  body {
    background: var(--cream);
    font-family: 'Lato', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  .cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    font-size: 18px;
    transition: transform 0.1s;
  }

  /* FLOATING HEARTS BG */
  .hearts-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .float-heart {
    position: absolute;
    bottom: -60px;
    font-size: 1.4rem;
    animation: floatUp linear infinite;
    opacity: 0;
  }

  @keyframes floatUp {
    0%   { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
    10%  { opacity: 0.7; }
    90%  { opacity: 0.4; }
    100% { transform: translateY(-110vh) rotate(30deg) scale(1.2); opacity: 0; }
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
    background: radial-gradient(ellipse at 50% 30%, #ffe0e8 0%, #fff0f3 40%, var(--cream) 80%);
  }

  .hero-envelope {
    font-size: 5rem;
    animation: envelopePop 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;
    filter: drop-shadow(0 8px 24px rgba(232,64,90,0.25));
    cursor: pointer;
    transition: transform 0.2s;
  }
  .hero-envelope:hover { transform: scale(1.15) rotate(-5deg); }

  @keyframes envelopePop {
    0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  .hero-title {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(3rem, 8vw, 6rem);
    color: var(--rose);
    line-height: 1.1;
    margin: 1rem 0 0.5rem;
    animation: slideUp 0.9s cubic-bezier(0.34,1.2,0.64,1) 0.7s both;
    text-shadow: 0 2px 30px rgba(232,64,90,0.2);
  }

  .hero-subtitle {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(1rem, 3vw, 1.5rem);
    color: var(--soft);
    animation: slideUp 0.9s cubic-bezier(0.34,1.2,0.64,1) 1s both;
    margin-bottom: 2rem;
  }

  @keyframes slideUp {
    0%   { transform: translateY(40px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  .scroll-hint {
    animation: bounce 1.8s ease-in-out infinite, slideUp 0.9s 1.4s both;
    color: var(--rose);
    font-size: 2rem;
    margin-top: 1.5rem;
  }
  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }

  /* SECTIONS */
  section {
    position: relative;
    z-index: 1;
    padding: 5rem 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'Dancing Script', cursive;
    font-size: 1.1rem;
    color: var(--gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    display: block;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    color: var(--deep);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  .section-title em {
    color: var(--rose);
    font-style: italic;
  }

  /* REASONS GRID */
  .reasons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2.5rem;
  }

  .reason-card {
    background: white;
    border: 1.5px solid var(--blush);
    border-radius: 20px;
    padding: 1.8rem;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.34,1.4,0.64,1);
    box-shadow: 0 4px 20px rgba(232,64,90,0.08);
    cursor: default;
  }

  .reason-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(232,64,90,0.18);
    border-color: var(--rose);
  }

  .reason-icon { font-size: 2.5rem; margin-bottom: 0.8rem; display: block; }

  .reason-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--deep);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .reason-text {
    font-size: 0.9rem;
    color: var(--soft);
    line-height: 1.6;
  }

  /* PHOTO COLLAGE */
  .photo-section { text-align: center; }

  .photo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 200px;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .photo-frame {
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(135deg, var(--blush), var(--petal));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    box-shadow: 0 6px 24px rgba(232,64,90,0.12);
    transition: all 0.4s cubic-bezier(0.34,1.4,0.64,1);
    cursor: pointer;
    border: 2px solid var(--blush);
  }

  .photo-frame:hover {
    transform: scale(1.04) rotate(-1deg);
    box-shadow: 0 16px 40px rgba(232,64,90,0.22);
    border-color: var(--rose);
    z-index: 2;
  }

  .photo-frame:nth-child(1) { grid-column: 1 / 2; grid-row: 1 / 3; }
  .photo-frame:nth-child(2) { grid-column: 2 / 3; grid-row: 1 / 2; }
  .photo-frame:nth-child(3) { grid-column: 3 / 4; grid-row: 1 / 2; }
  .photo-frame:nth-child(4) { grid-column: 2 / 4; grid-row: 2 / 3; }

  .photo-label {
    position: absolute;
    bottom: 0.6rem; left: 50%; transform: translateX(-50%);
    background: rgba(255,255,255,0.9);
    border-radius: 20px;
    padding: 0.25rem 0.9rem;
    font-family: 'Dancing Script', cursive;
    font-size: 1rem;
    color: var(--rose);
    white-space: nowrap;
    backdrop-filter: blur(4px);
  }

  /* PROMISE SECTION */
  .promise-section {
    text-align: center;
    background: linear-gradient(135deg, #fff0f3, #fde8ec);
    border-radius: 32px;
    padding: 4rem 3rem;
    border: 2px solid var(--blush);
    box-shadow: 0 8px 40px rgba(232,64,90,0.1);
    margin: 2rem auto;
    max-width: 750px;
  }

  .promise-list {
    list-style: none;
    text-align: left;
    max-width: 500px;
    margin: 1.5rem auto;
  }

  .promise-list li {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: var(--deep);
    font-size: 1.1rem;
    padding: 0.6rem 0;
    border-bottom: 1px dashed var(--blush);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    line-height: 1.5;
  }

  .promise-list li:last-child { border-bottom: none; }
  .promise-list li::before { content: "♥"; color: var(--rose); font-style: normal; font-size: 1.1rem; }

  /* PROPOSAL SECTION */
  .proposal-section {
    text-align: center;
    padding: 5rem 2rem 4rem;
    max-width: 700px;
    margin: 0 auto;
  }

  .ring-anim {
    font-size: 5rem;
    display: inline-block;
    animation: ringRotate 3s ease-in-out infinite;
    filter: drop-shadow(0 4px 16px rgba(201,168,76,0.5));
    margin-bottom: 1.5rem;
  }

  @keyframes ringRotate {
    0%,100% { transform: rotate(-10deg) scale(1); }
    50%      { transform: rotate(10deg) scale(1.08); }
  }

  .big-question {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(2.5rem, 7vw, 5rem);
    color: var(--rose);
    line-height: 1.2;
    margin-bottom: 1rem;
    text-shadow: 0 4px 20px rgba(232,64,90,0.2);
  }

  .proposal-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    color: var(--soft);
    line-height: 1.8;
    margin-bottom: 3rem;
    font-style: italic;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-group {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .btn-yes {
    background: linear-gradient(135deg, var(--rose), var(--deep-rose));
    color: white;
    border: none;
    border-radius: 50px;
    padding: 1rem 3rem;
    font-family: 'Dancing Script', cursive;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 8px 28px rgba(232,64,90,0.35);
    transition: all 0.3s cubic-bezier(0.34,1.4,0.64,1);
    position: relative;
    overflow: hidden;
  }

  .btn-yes::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.15);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .btn-yes:hover {
    transform: scale(1.08) translateY(-3px);
    box-shadow: 0 16px 40px rgba(232,64,90,0.45);
  }
  .btn-yes:hover::after { opacity: 1; }

  .btn-no {
    background: white;
    color: var(--rose);
    border: 2px solid var(--blush);
    border-radius: 50px;
    padding: 1rem 2rem;
    font-family: 'Dancing Script', cursive;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-no:hover {
    border-color: var(--rose);
    background: var(--petal);
  }

  /* YES CELEBRATION */
  .celebration {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse, #fff0f3 0%, #fde8ec 60%, #f9d0d8 100%);
    animation: celebFadeIn 0.6s ease;
    text-align: center;
    padding: 2rem;
  }

  @keyframes celebFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .confetti-burst {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .confetti-piece {
    position: absolute;
    top: -20px;
    font-size: 1.5rem;
    animation: confettiFall linear forwards;
  }

  @keyframes confettiFall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  .celeb-title {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(3rem, 10vw, 7rem);
    color: var(--rose);
    animation: celebTitle 0.8s cubic-bezier(0.34,1.6,0.64,1) 0.3s both;
    text-shadow: 0 4px 30px rgba(232,64,90,0.3);
  }

  @keyframes celebTitle {
    from { transform: scale(0.3) rotate(-10deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  .celeb-sub {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: var(--soft);
    margin: 1rem 0 2rem;
    animation: slideUp 0.8s 0.7s both;
  }

  .celeb-hearts {
    font-size: 3rem;
    animation: heartPulse 0.8s 1s both, heartBeat 1.2s 1.8s ease-in-out infinite;
    display: inline-block;
  }

  @keyframes heartPulse {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  @keyframes heartBeat {
    0%,100% { transform: scale(1); }
    20%     { transform: scale(1.18); }
    40%     { transform: scale(0.95); }
    60%     { transform: scale(1.1); }
    80%     { transform: scale(0.98); }
  }

  /* DIVIDER */
  .divider {
    text-align: center;
    color: var(--rose);
    font-size: 1.5rem;
    letter-spacing: 1rem;
    margin: 1rem 0;
    opacity: 0.5;
  }

  /* FOOTER */
  .footer {
    text-align: center;
    padding: 3rem 2rem;
    font-family: 'Dancing Script', cursive;
    font-size: 1.5rem;
    color: var(--soft);
    position: relative;
    z-index: 1;
  }

  .footer span { color: var(--rose); }

  /* RESPONSIVE */
  @media (max-width: 600px) {
    .photo-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 160px 160px 160px;
    }
    .photo-frame:nth-child(1) { grid-column: 1/2; grid-row: 1/3; }
    .photo-frame:nth-child(2) { grid-column: 2/3; grid-row: 1/2; }
    .photo-frame:nth-child(3) { grid-column: 2/3; grid-row: 2/3; }
    .photo-frame:nth-child(4) { grid-column: 1/3; grid-row: 3/4; }
    .promise-section { padding: 2.5rem 1.5rem; }
  }

  /* FADE IN ON SCROLL */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FLOAT_HEARTS = ["💗", "💕", "💝", "🌸", "💖", "✨", "🌹", "💓"];

const REASONS = [
  { icon: "😊", title: "Your Smile", text: "The way you smile makes every single day so much brighter and worth living." },
  { icon: "🌙", title: "Late Night Talks", text: "I could talk with you until sunrise and still not want to say goodnight." },
  { icon: "🤝", title: "You Understand Me", text: "You get me in a way no one else ever has — every quirk, every dream." },
  { icon: "🌺", title: "Your Kindness", text: "Your heart is the softest, most generous one I have ever known." },
  { icon: "😂", title: "Our Laughter", text: "You make me laugh until my stomach hurts, and I love every second of it." },
  { icon: "🏡", title: "Home", text: "Wherever you are, that's where I feel completely at home." },
];

const PHOTOS = [
  { emoji: "🌹🥂", label: "Our first date" },
  { emoji: "🌅", label: "Sunsets together" },
  { emoji: "☕🤍", label: "Morning coffee" },
  { emoji: "🌙⭐", label: "Stargazing nights" },
];

const PROMISES = [
  "I'll always be your safe place to land",
  "I'll make you laugh every single day",
  "I'll hold your hand through every storm",
  "I'll celebrate every little win with you",
  "I'll love you more with each passing day",
  "I'll choose you, over and over, forever",
];

export default function ValentineProposal() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noMoved, setNoMoved] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [confetti, setConfetti] = useState([]);
  const fadeRefs = useRef([]);

  // Custom cursor
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 }
    );
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Confetti burst on Yes
  const launchConfetti = () => {
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: ["💗", "💖", "🌸", "✨", "💝", "🌹", "💕", "⭐"][
        Math.floor(Math.random() * 8)
      ],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
    }));
    setConfetti(pieces);
  };

  const handleYes = () => {
    setYesClicked(true);
    launchConfetti();
  };

  // "No" button runs away on hover — uses direct DOM style, no state needed
  const handleNoHover = (e) => {
    const btn = e.currentTarget;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nx = Math.random() * (vw - 140);
    const ny = Math.random() * (vh - 70);
    btn.style.position = "fixed";
    btn.style.left = nx + "px";
    btn.style.top = ny + "px";
    btn.style.zIndex = 500;
    setNoMoved((n) => n + 1);
  };

  const addFadeRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  // Floating hearts config
  const floatHearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: FLOAT_HEARTS[i % FLOAT_HEARTS.length],
    left: (i * 5.8) % 100,
    size: 0.8 + (i % 4) * 0.4,
    delay: (i * 1.1) % 8,
    duration: 7 + (i % 5),
  }));

  return (
    <>
      <style>{style}</style>

      {/* Custom heart cursor */}
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }}>
        💗
      </div>

      {/* Floating hearts background */}
      <div className="hearts-bg">
        {floatHearts.map((h) => (
          <span
            key={h.id}
            className="float-heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}rem`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-envelope">💌</div>
        <h1 className="hero-title">My Dearest Love</h1>
        <p className="hero-subtitle">
          A Valentine's message, written just for you
        </p>
        <div className="divider">♥ ♥ ♥</div>
        <div className="scroll-hint">💕</div>
      </div>

      {/* ── REASONS I LOVE YOU ── */}
      <section ref={addFadeRef} className="fade-in">
        <span className="section-label">with all my heart</span>
        <h2 className="section-title">
          Reasons I Fall for You, <em>Every Day</em>
        </h2>
        <p
          style={{
            color: "var(--soft)",
            lineHeight: 1.8,
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
          }}
        >
          There are a million reasons why I love you — here are just a few
          that I keep close to my heart...
        </p>
        <div className="reasons-grid">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="reason-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="reason-icon">{r.icon}</span>
              <div className="reason-title">{r.title}</div>
              <div className="reason-text">{r.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO MEMORIES ── */}
      <section
        className="photo-section"
        ref={addFadeRef}
        style={{ zIndex: 1 }}
      >
        <div className="fade-in" ref={addFadeRef}>
          <span className="section-label">our story</span>
          <h2 className="section-title">
            Moments I <em>Treasure</em> Forever
          </h2>
          <p
            style={{
              color: "var(--soft)",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}
          >
            Every moment with you becomes my favourite memory. Replace these
            with your real photos!
          </p>
          <div className="photo-grid">
            {PHOTOS.map((p, i) => (
              <div key={i} className="photo-frame">
                <span style={{ fontSize: i === 0 ? "5rem" : "3.5rem" }}>
                  {p.emoji}
                </span>
                <div className="photo-label">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMISES ── */}
      <div
        style={{ padding: "2rem 1rem", position: "relative", zIndex: 1 }}
        ref={addFadeRef}
        className="fade-in"
      >
        <div className="promise-section">
          <span className="section-label">from the bottom of my heart</span>
          <h2 className="section-title">
            My Promises <em>To You</em>
          </h2>
          <ul className="promise-list">
            {PROMISES.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <div style={{ marginTop: "1.5rem", fontSize: "2rem" }}>
            💍🌹💍
          </div>
        </div>
      </div>

      {/* ── THE PROPOSAL ── */}
      <div
        className="proposal-section"
        ref={addFadeRef}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="fade-in" ref={addFadeRef}>
          <div className="ring-anim">💍</div>
          <h2 className="big-question">Will You Be My Valentine?</h2>
          <p className="proposal-text">
            You are the missing piece I never knew I was looking for. Being
            with you feels like home, like every love song finally makes
            sense. I want to write our story together, one beautiful chapter
            at a time. 💕
          </p>

          <div className="btn-group">
            <button className="btn-yes" onClick={handleYes}>
              💗 Yes, of course!
            </button>
            <button
              className="btn-no"
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
            >
              {noMoved > 5
                ? "😂 Just say yes!"
                : noMoved > 2
                ? "Hmm... 🤔"
                : "Maybe no..."}
            </button>
          </div>

          {noMoved > 0 && !yesClicked && (
            <p
              style={{
                color: "var(--rose)",
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.2rem",
                animation: "slideUp 0.5s ease",
              }}
            >
              {noMoved > 5
                ? "😂 You can't escape! Just say yes! 💕"
                : noMoved > 2
                ? "The button keeps running away 🏃‍💨"
                : "You can't click that button! 😏"}
            </p>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        Made with <span>♥</span> just for you · Happy Valentine's Day{" "}
        <span>💝</span>
      </footer>

      {/* ── CELEBRATION OVERLAY ── */}
      {yesClicked && (
        <div className="celebration">
          <div className="confetti-burst">
            {confetti.map((c) => (
              <span
                key={c.id}
                className="confetti-piece"
                style={{
                  left: `${c.left}%`,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                  fontSize: `${1 + Math.random()}rem`,
                }}
              >
                {c.emoji}
              </span>
            ))}
          </div>
          <div className="celeb-hearts">💗</div>
          <h1 className="celeb-title">She said Yes! 🎉</h1>
          <p className="celeb-sub">
            You just made me the happiest person alive.
            <br />
            Happy Valentine's Day, my love. 💕
          </p>
          <div
            style={{
              fontSize: "3rem",
              animation: "heartBeat 1.2s ease-in-out infinite",
            }}
          >
            💍🌹💗🥂🌸
          </div>
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "1.3rem",
              color: "var(--soft)",
              marginTop: "1.5rem",
            }}
          >
            Forever & always yours ♥
          </p>
        </div>
      )}
    </>
  );
}