document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 手機版導航選單功能
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const logo = document.querySelector('.logo'); // 抓取 Logo

    if (burger) {
        burger.addEventListener('click', () => {
            // 切換選單顯示/隱藏
            nav.classList.toggle('nav-active');

            // 選單項目的依序淡入動畫
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    // 加快動畫速度，更俐落
                    link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7 + 0.2}s`;
                }
            });

            // 漢堡圖示變形動畫 (三條線變 X)
            burger.classList.toggle('toggle');
            
            // 切換 Logo 顏色 (在深色選單上變白色)
            logo.classList.toggle('logo-white');
        });
    }

    // 2. 滾動淡入特效 (Intersection Observer API)
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
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

    // 3. 手機版點擊連結後自動收合選單
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('nav-active')){
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                logo.classList.remove('logo-white');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
});
