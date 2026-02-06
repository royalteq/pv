document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 手機版導航選單功能
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // 切換選單顯示/隱藏
            nav.classList.toggle('nav-active');

            // 選單項目的依序淡入動畫
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // 漢堡圖示變形動畫 (三條線變 X)
            burger.classList.toggle('toggle');
        });
    }

    // 2. 滾動淡入特效 (Intersection Observer API)
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1, // 當物件進入畫面 10% 時觸發
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // 動畫只執行一次
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. 手機版點擊連結後自動收合選單
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('nav-active')){
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
});
