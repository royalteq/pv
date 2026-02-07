document.addEventListener('DOMContentLoaded', () => {
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            // 漢堡圖示動畫
            burger.classList.toggle('toggle');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // 滾動淡入動畫
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 導航列滾動變色
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.borderBottom = '1px solid rgba(50,50,50,0.5)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.85)';
            header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        }
    });
    
    // 點擊連結收合選單 (排除 Dropdown 本身)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 如果點到的是 Dropdown 的標題，不收合
            if(link.classList.contains('dropdown')) return;

            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => link.style.animation = '');
        });
    });
});

// CSS 動畫 keyframes
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes navLinkFade {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}
.toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); background-color: #fff; }
.toggle .line2 { transform: rotate(45deg) translate(-5px, -6px); background-color: #fff; }
`;
document.head.appendChild(styleSheet);
