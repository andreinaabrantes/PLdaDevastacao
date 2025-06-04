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
    
    // Animar contador após 2 segundos
    setTimeout(animateCounter, 2000);
});
