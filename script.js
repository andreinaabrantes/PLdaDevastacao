// ===== ANIMAÇÕES E EFEITOS VISUAIS =====

// Efeito de digitação no headline (corrigido)
function typewriterEffect() {
    const headline = document.querySelector('.hero-headline');
    if (!headline) return;
    
    // Extrair texto limpo preservando formatação
    const pareText = 'PARE';
    const plText = ' o PL da ';
    const devastacaoText = 'DEVASTAÇÃO';
    
    // Limpar conteúdo inicial
    headline.innerHTML = '';
    headline.style.borderRight = '3px solid #fff';
    
    let currentIndex = 0;
    const fullText = pareText + plText + devastacaoText;
    
    function typeWriter() {
        if (currentIndex < fullText.length) {
            let currentChar = fullText.charAt(currentIndex);
            
            // Construir HTML formatado baseado na posição
            let formattedHTML = '';
            
            if (currentIndex < pareText.length) {
                // Ainda digitando "PARE"
                formattedHTML = `<span class="highlight-red">${fullText.substring(0, currentIndex + 1)}</span>`;
            } else if (currentIndex < pareText.length + plText.length) {
                // Digitando " o PL da "
                formattedHTML = `<span class="highlight-red">${pareText}</span>${fullText.substring(pareText.length, currentIndex + 1)}`;
            } else {
                // Digitando "DEVASTAÇÃO"
                const devastacaoProgress = currentIndex - pareText.length - plText.length + 1;
                formattedHTML = `<span class="highlight-red">${pareText}</span>${plText}<span class="highlight-red">${devastacaoText.substring(0, devastacaoProgress)}</span>`;
            }
            
            // Verifique se o texto não está sendo sobrescrito
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

// Efeito de parallax no hero (corrigido)
function setupParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3; // Reduzido para ser mais sutil
        const heroHeight = hero.offsetHeight;
        
        // Aplicar parallax apenas quando o hero está visível
        if (scrolled < heroHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        } else {
            // Parar o parallax quando sair da seção
            hero.style.transform = `translateY(${heroHeight * parallaxSpeed}px)`;
        }
    });

    // Melhorar a rolagem do site
    document.documentElement.style.scrollBehavior = "smooth";
}

// ======================================
// 1) ANIMAÇÃO DO CONTADOR (“+45.000 brasileiros já aderiram”)
// ======================================
let currentCount = 45340; // valor inicial (representa 45.000)

function animateCounter() {
  // Seleciona o elemento <span> que mostra "+45.000 brasileiros já aderiram"
  const counterSpan = document.querySelector('.social-proof .proof-item i.fa-users').nextElementSibling;
  if (!counterSpan) return;

  // A cada 2 segundos, incrementa em 1 e atualiza o texto completo
  setInterval(() => {
    currentCount += 1;

    // Formatar com ponto de milhar (ex: 45001 → "45.001")
    const formattedNumber = currentCount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Atualiza o texto inteiro, mantendo a parte “brasileiros já aderiram”
    counterSpan.textContent = `+${formattedNumber} brasileiros já aderiram`;
  }, 2000);
}


// ======================================
// 2) CONTAGEM REGRESSIVA EM MINUTOS (a partir de “4 d 18 h 32 m”)
// ======================================

// Converte dias, horas e minutos em milissegundos
function parseTimeToMillis(days, hours, minutes) {
  return (
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000
  );
}

// Formata milissegundos restantes em “Xd Yh Zm”
function formatMillisToDHm(ms) {
  const totalMinutes = Math.floor(ms / (60 * 1000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes - days * 24 * 60 - hours * 60;

  return `${days}d ${hours}h ${minutes}m`;
}

function startLimitedCountdown() {
  // Seleciona o elemento que mostra o contador de dias/horas/minutos
  const timerEl = document.getElementById('countdown');
  if (!timerEl) return;

  // Iniciar em 4d 18h 32m
  let remainingMs = parseTimeToMillis(4, 18, 32);

  // Exibe imediatamente o valor inicial formatado
  timerEl.textContent = formatMillisToDHm(remainingMs);

  // A cada 1 minuto (60.000 ms), subtrai 1 minuto e atualiza
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
    // Configuração: definir se deve usar efeito de digitação
    const useTypewriterEffect = true; // Mude para false se quiser desabilitar
    
    // Inicializar efeitos visuais
    if (useTypewriterEffect) {
        setTimeout(typewriterEffect, 500);
    }
    
    setupIntersectionObserver();
    setupParallax();  // Ajustado para melhorar o comportamento de rolagem
    createFloatingParticles();
    setupButtonEffects();
    startCountdown();
    
      // (a) Começa a animação do contador após 2 segundos
  setTimeout(animateCounter, 2000);

     // (b) Inicia o countdown diminuindo em minutos
 startLimitedCountdown();

    
});
