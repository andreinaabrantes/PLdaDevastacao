// ===== ANIMAÇÕES E EFEITOS VISUAIS =====

// Efeito de digitação no headline
function typewriterEffect() {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  const pareText = 'PARE';
  const plText = ' o PL da ';
  const devastacaoText = 'DEVASTAÇÃO';

  headline.innerHTML = '';
  headline.style.borderRight = '3px solid #fff';

  let currentIndex = 0;
  const fullText = pareText + plText + devastacaoText;

  function typeWriter() {
    if (currentIndex < fullText.length) {
      let formattedHTML = '';

      if (currentIndex < pareText.length) {
        formattedHTML = `<span class="highlight-red">${fullText.substring(0, currentIndex + 1)}</span>`;
      } else if (currentIndex < pareText.length + plText.length) {
        formattedHTML = `<span class="highlight-red">${pareText}</span>${fullText.substring(pareText.length, currentIndex + 1)}`;
      } else {
        const devastacaoProgress = currentIndex - pareText.length - plText.length + 1;
        formattedHTML = `<span class="highlight-red">${pareText}</span>${plText}<span class="highlight-red">${devastacaoText.substring(0, devastacaoProgress)}</span>`;
      }

      if (currentIndex === 0) {
        headline.innerHTML = formattedHTML;
      } else {
        headline.innerHTML = formattedHTML + headline.innerHTML.substring(formattedHTML.length);
      }

      currentIndex++;
      setTimeout(typeWriter, 80);
    } else {
      setTimeout(() => {
        headline.style.borderRight = 'none';
      }, 500);
    }
  }

  setTimeout(typeWriter, 1000);
}

// Parallax ajustado (move apenas o background, não a seção inteira)
function setupParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5; // ajuste entre 0 e 1 para efeito mais/menos sutil
    hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
  });
}

// ======================================
// 0) ROTAÇÃO DO BACKGROUND NA HERO-SECTION
// ======================================
function rotateHeroBackground() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  // Caminhos das 4 imagens (crie a pasta img/ com estes nomes)
  const imagens = [
    'img/hero1.jpg',
    'img/hero2.jpg',
    'img/hero3.jpg',
    'img/hero4.jpg'
  ];

  let index = 0;
  // Define a primeira imagem imediatamente
  hero.style.backgroundImage = `url('${imagens[index]}')`;

  setInterval(() => {
    index = (index + 1) % imagens.length;
    hero.style.backgroundImage = `url('${imagens[index]}')`;
  }, 2000); // troca a cada 2 segundos
}

// ======================================
// 1) ANIMAÇÃO DO CONTADOR (“+45.000 brasileiros já aderiram”)
// ======================================
let currentCount = 45000; // valor inicial (45.000)

function animateCounter() {
  const iconUsers = document.querySelector('.social-proof .proof-item i.fa-users');
  if (!iconUsers) return;

  const counterSpan = iconUsers.nextElementSibling;
  if (!counterSpan) return;

  setInterval(() => {
    currentCount += 1;
    const formattedNumber = currentCount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    counterSpan.textContent = `+${formattedNumber} brasileiros já aderiram`;
  }, 2000);
}

// ======================================
// 2) CONTAGEM REGRESSIVA EM MINUTOS (a partir de “4d 18h 32m”)
// ======================================
function parseTimeToMillis(days, hours, minutes) {
  return (
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000
  );
}

function formatMillisToDHm(ms) {
  const totalMinutes = Math.floor(ms / (60 * 1000));
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes - days * 24 * 60 - hours * 60;
  return `${days}d ${hours}h ${minutes}m`;
}

function startLimitedCountdown() {
  const timerEl = document.getElementById('countdown');
  if (!timerEl) return;

  let remainingMs = parseTimeToMillis(4, 18, 32);
  timerEl.textContent = formatMillisToDHm(remainingMs);

  const oneMinute = 60 * 1000;
  const intervalId = setInterval(() => {
    remainingMs -= oneMinute;
    if (remainingMs < 0) {
      clearInterval(intervalId);
      timerEl.textContent = '0d 0h 0m';
      return;
    }
    timerEl.textContent = formatMillisToDHm(remainingMs);
  }, oneMinute);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
  // (a) Roda a rotação de imagens da hero
  rotateHeroBackground();

  // (b) Efeito de digitação no headline
  const useTypewriterEffect = true;
  if (useTypewriterEffect) {
    setTimeout(typewriterEffect, 500);
  }

  // (c) Parallax ajustado
  setupParallax();

  // (d) Inicia o contador de “+45.000…”
  setTimeout(animateCounter, 2000);

  // (e) Inicia a contagem regressiva em minutos
  startLimitedCountdown();
});
