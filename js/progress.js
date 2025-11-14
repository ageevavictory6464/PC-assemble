const progress = () => {
    const progress = document.querySelector("progress");
    const numberSpan = document.querySelector(".course__progress-label .course__number");
    
    const target = Math.floor(Math.random() * (600000 - 350000 + 1)) + 350000;
    const duration = 2000;
    
    let startTime = null;
    let animationStarted = false;
    
    progress.value = 0;
    numberSpan.textContent = "0₽";
    
    const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        const currentNumber = Math.floor(target * progressRatio);
        
        numberSpan.textContent = currentNumber.toLocaleString('ru-RU') + "₽";
        progress.value = target * progressRatio;
        
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            numberSpan.textContent = target.toLocaleString('ru-RU') + "₽";
            progress.value = target;
        }
    };
    
    const checkVisibility = () => {
        if (animationStarted) return;
        
        const element = progress.closest('.course__progress');
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const topThreshold = windowHeight / 3;
        const bottomThreshold = windowHeight * 2 / 3;
        
        if (rect.top < bottomThreshold && rect.bottom > topThreshold) {
            animationStarted = true;
            requestAnimationFrame(animate);
            window.removeEventListener('scroll', checkVisibility);
        }
    };
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
};

progress();