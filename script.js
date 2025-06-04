// ===== ANIMAÇÕES E EFEITOS VISUAIS =====

// Contador de tempo
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Definir uma data futura (7 dias a partir de agora)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            countdownElement.textContent = '0d 0h 0m';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.textContent = `${days}d ${hours}h ${minutes}m`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Atualizar a cada minuto
}

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
            
            headline.innerHTML = formattedHTML;
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

// Animação de fade-in quando elementos entram na viewport
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animação especial para cards
                if (entry.target.classList.contains('threat-card') || 
                    entry.target.classList.contains('benefit-item') ||
                    entry.target.classList.contains('step')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const elementsToAnimate = document.querySelectorAll(`
        .threat-card, 
        .benefit-item, 
        .step, 
        .urgency-card,
        .testimonial-section blockquote,
        .faq-item
    `);
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Efeito parallax no hero (corrigido)
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
}

// Efeito de partículas flutuantes
function createFloatingParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Efeito de hover nos botões
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
}

// Contador de participantes com animação
function animateCounter() {
    const proofItems = document.querySelectorAll('.proof-item span, .participation-count');
    
    proofItems.forEach(item => {
        const text = item.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers) {
            const finalNumber = parseInt(numbers[0]);
            let current = 0;
            const increment = finalNumber / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    current = finalNumber;
                    clearInterval(timer);
                }
                
                const newText = text.replace(/\d+/, Math.floor(current).toLocaleString('pt-BR'));
                item.textContent = newText;
            }, 20);
        }
    });
}

// ===== FUNCIONALIDADE DO MODAL =====

// Variáveis globais do modal
let isModalOpen = false;

// Abrir modal
function openModal() {
    const modal = document.getElementById('modal');
    const formSection = document.getElementById('form-section');
    const successSection = document.getElementById('success-section');
    
    if (!modal) return;
    
    // Resetar estado do modal
    formSection.style.display = 'block';
    successSection.style.display = 'none';
    
    // Limpar campos
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('city').value = '';
    document.getElementById('consent').checked = false;
    
    // Mostrar modal com animação
    modal.style.display = 'block';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Focar no primeiro campo
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 300);
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        isModalOpen = false;
        document.body.style.overflow = 'auto';
    }, 300);
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validação de nome
function isValidName(name) {
    return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name.trim());
}

// Validação de cidade
function isValidCity(city) {
    return city.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s-]+$/.test(city.trim());
}

// Mostrar erro no campo
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #dc2626;
        font-size: 14px;
        margin-top: 4px;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc2626';
    field.focus();
}

// Limpar erros do campo
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.style.borderColor = '#d1d5db';
}

// Submeter formulário
function submitForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const consent = document.getElementById('consent').checked;
    
    // Limpar erros anteriores
    clearFieldError('name');
    clearFieldError('email');
    clearFieldError('city');
    
    let hasError = false;
    
    // Validar nome
    if (!name) {
        showFieldError('name', 'Por favor, insira seu nome completo');
        hasError = true;
    } else if (!isValidName(name)) {
        showFieldError('name', 'Por favor, insira um nome válido');
        hasError = true;
    }
    
    // Validar email
    if (!email) {
        showFieldError('email', 'Por favor, insira seu e-mail');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Por favor, insira um e-mail válido');
        hasError = true;
    }
    
    // Validar cidade
    if (!city) {
        showFieldError('city', 'Por favor, insira sua cidade');
        hasError = true;
    } else if (!isValidCity(city)) {
        showFieldError('city', 'Por favor, insira uma cidade válida');
        hasError = true;
    }
    
    // Validar consentimento
    if (!consent) {
        alert('Por favor, concorde com o recebimento de informações para continuar.');
        return;
    }
    
    if (hasError) {
        return;
    }
    
    // Simular envio
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.style.background = '#9ca3af';
    
    // Simular delay de envio
    setTimeout(() => {
        // Salvar dados localmente (simulação)
        const userData = {
            name: name,
            email: email,
            city: city,
            timestamp: new Date().toISOString(),
            campaign: 'pl-devastacao'
        };
        
        console.log('Dados do usuário:', userData);
        
        // Mostrar seção de sucesso
        document.getElementById('form-section').style.display = 'none';
        document.getElementById('success-section').style.display = 'block';
        
        // Resetar botão
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '#16a34a';
        
        // Fechar modal automaticamente após 3 segundos
        setTimeout(() => {
            closeModal();
        }, 3000);
        
    }, 1500);
}

// ===== EVENT LISTENERS =====

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configuração: definir se deve usar efeito de digitação
    const useTypewriterEffect = true; // Mude para false se quiser desabilitar
    
    // Inicializar efeitos visuais
    if (useTypewriterEffect) {
        setTimeout(typewriterEffect, 500);
    }
    
    setupIntersectionObserver();
    setupParallax();
    createFloatingParticles();
    setupButtonEffects();
    startCountdown();
    
    // Animar contador após 2 segundos
    setTimeout(animateCounter, 2000);
    
    // Event listeners do modal
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });
    
    // Limpar erros quando o usuário digita
    ['name', 'email', 'city'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', () => clearFieldError(fieldId));
        }
    });
    
    // Enviar formulário com Enter
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && isModalOpen) {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'BUTTON') {
                event.preventDefault();
                submitForm();
            }
        }
    });
});

// ===== ESTILOS CSS DINÂMICOS =====

// Adicionar estilos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(1deg); }
        50% { transform: translateY(-5px) rotate(-1deg); }
        75% { transform: translateY(-15px) rotate(1deg); }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal {
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .error-message {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .hero-section {
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    
    .threat-section {
        position: relative;
        z-index: 2;
        background: white;
    }
`;

document.head.appendChild(style);

// ===== FUNÇÕES UTILITÁRIAS =====

// Scroll suave para seções
function scrollToSection(sectionClass) {
    const section = document.querySelector(sectionClass);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Rastrear cliques nos CTAs (para analytics)
function trackCTAClick(ctaLocation) {
    console.log(`CTA clicado: ${ctaLocation}`);
    // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
}

// Adicionar listeners para rastreamento
document.addEventListener('DOMContentLoaded', function() {
    const primaryCTAs = document.querySelectorAll('.cta-primary');
    const secondaryCTAs = document.querySelectorAll('.cta-secondary');
    
    primaryCTAs.forEach((cta, index) => {
        cta.addEventListener('click', () => trackCTAClick(`primary-${index + 1}`));
    });
    
    secondaryCTAs.forEach((cta, index) => {
        cta.addEventListener('click', () => trackCTAClick(`secondary-${index + 1}`));
    });
});

// Prevenir spam de cliques
let lastClickTime = 0;
function preventSpamClicks(callback, delay = 1000) {
    return function(...args) {
        const now = Date.now();
        if (now - lastClickTime > delay) {
            lastClickTime = now;
            callback.apply(this, args);
        }
    };
}

// Aplicar prevenção de spam nos CTAs
document.addEventListener('DOMContentLoaded', function() {
    const originalOpenModal = openModal;
    window.openModal = preventSpamClicks(originalOpenModal, 500);
    
    const originalSubmitForm = submitForm;
    window.submitForm = preventSpamClicks(originalSubmitForm, 2000);
});