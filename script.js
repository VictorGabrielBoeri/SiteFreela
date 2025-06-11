// Animação para os números de estatísticas
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do Typed.js
    const typed = new Typed('#typed-text', {
        strings: ['FREELANCER', 'Moda', 'DESIGN'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
    
    // Função para animar contagem de números
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            // Converter para número e verificar se é válido
            const targetText = number.textContent;
            const target = parseInt(targetText);
            
            // Se não for um número válido, não animar
            if (isNaN(target)) {
                console.warn('Valor não numérico encontrado:', targetText);
                return;
            }
            
            let count = 0;
            const duration = 2000; // 2 segundos
            const steps = 50; // Número fixo de passos
            const interval = duration / steps;
            const increment = target / steps;
            
            const counter = setInterval(() => {
                count += increment;
                number.textContent = Math.round(count);
                
                if (count >= target) {
                    number.textContent = target; // Garantir que mostre o valor exato
                    clearInterval(counter);
                }
            }, interval);
        });
    }
    
    // Verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Iniciar animação quando a seção de estatísticas estiver visível
    const statsSection = document.querySelector('.stats');
    
    function checkScroll() {
        if (isElementInViewport(statsSection)) {
            animateNumbers();
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar na carga inicial
    
    // Animação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Se o link for para o topo (#top ou apenas #)
            if (targetId === '#' || targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filtro de portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            // Obter o valor do filtro
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrar os itens
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});