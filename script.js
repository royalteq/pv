document.addEventListener('DOMContentLoaded', () => {
    
    // --- 既有的導航列功能 ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
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

    // 點擊連結收合選單
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => link.style.animation = '');
        });
    });

    // --- 既有的滾動淡入動畫 ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

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

    // --- ★★★ 新增：送禮指南懸浮視窗邏輯 ★★★ ---
    const giftBtn = document.getElementById('giftToggle');
    const giftMenu = document.getElementById('giftMenu');
    const giftClose = document.getElementById('giftClose');

    if (giftBtn && giftMenu) {
        // 點擊按鈕切換開關
        giftBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止冒泡
            giftMenu.classList.toggle('active');
        });

        // 點擊 X 關閉
        giftClose.addEventListener('click', () => {
            giftMenu.classList.remove('active');
        });

        // 點擊畫面其他地方自動關閉
        document.addEventListener('click', (e) => {
            if (!giftMenu.contains(e.target) && !giftBtn.contains(e.target)) {
                giftMenu.classList.remove('active');
            }
        });
    }
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
