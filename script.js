document.addEventListener('DOMContentLoaded', () => {

    /* --- DOM Elements --- */
    const pages = Array.from(document.querySelectorAll('.page'));
    const bgMusic = document.getElementById('bg-music');
    
    // Page 1
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    
    // Page 2
    const giftBox = document.getElementById('gift-box');
    
    // Page 3
    const typingText = document.getElementById('typing-text');
    const letterSignature = document.getElementById('letter-signature');
    const nextToCountersBtn = document.getElementById('next-to-counters');
    
    // Page 4
    const nextToCakeBtn = document.getElementById('next-to-cake');
    
    // Page 5
    const birthdayCake = document.getElementById('birthday-cake');
    const cakeInstruction = document.getElementById('cake-instruction');
    const hbdMessage = document.getElementById('hbd-message');
    const nextToMemoriesBtn = document.getElementById('next-to-memories');
    
    // Page 6
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    const slides = document.querySelectorAll('.slide');
    const nextToSecretBtn = document.getElementById('next-to-secret');
    
    // Page 7
    const secretBtn = document.getElementById('secret-btn');
    const secretMsgContainer = document.getElementById('secret-msg-container');
    const nextToOutroBtn = document.getElementById('next-to-outro');

    /* --- Page Navigation --- */
    function goToPage(pageIndex) {
        // Find current page
        const current = document.querySelector('.page.active');
        if (current) {
            current.classList.remove('active');
            current.classList.add('fade-out');
            setTimeout(() => {
                current.classList.add('hidden');
                current.classList.remove('fade-out');
                // Show new page
                const target = document.getElementById(`page-${pageIndex}`);
                target.classList.remove('hidden');
                // Force reflow
                void target.offsetWidth;
                target.classList.add('active');
            }, 800);
        }
    }

    /* --- Background Audio --- */
    let audioStarted = false;
    function startAudio() {
        if (!audioStarted) {
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log("Audio play prevented by browser", e));
            audioStarted = true;
        }
    }

    /* --- Page 1: Login --- */
    loginBtn.addEventListener('click', () => {
        startAudio();
        const val = passwordInput.value.trim();
        if (val === '0309') {
            errorMsg.classList.add('hidden');
            goToPage(2);
        } else {
            errorMsg.classList.remove('hidden');
        }
    });

    /* --- Page 2: Gift Box --- */
    giftBox.addEventListener('click', () => {
        if (!giftBox.classList.contains('open')) {
            giftBox.classList.add('open');
            // Trigger Confetti
            if(window.confetti){
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#ffb6c1', '#9d50bb', '#fff']
                });
            }
            setTimeout(() => {
                goToPage(3);
                startTypingEffect();
            }, 2500);
        }
    });

    /* --- Page 3: Love Letter (Typing Effect) --- */
    const letterContent = `اميرتي ..... عايز أقولك إن من يوم ما دخلتي حياتي وكل حاجة اتغيرت للأحسن بجد، إنتي مش بس حبيبتي، إنتي سندي وضهري وصحبتي واختي وكل دنيتي. اليوم اللي بدأنا فيه حكايتي معاكي هو أسعد يوم في حياتي، حبيت اعيد عليكي بطريقه مختلفه عيد الاضحي دلوقتي تاني عيد واحنا مع بعض كل سنه وانتي طيبه كل عيد وانتي عيدي . عمري مهنسا اليوم الي كنا فيه معبضا في سي بوت يوم مجبتك الشكولاته كنت فرحان اووي وانتي عمال تشاكلي فيا. واكتر يوم كنت مبسوط فيه اووي اليوم بتاع البطوله لما كنا مع بعض وجبنا اكل واكل مع بعض واتمشيت معاكي دا كان من اسعد ايام حياتي. ربنا يخليكي ليا وميحرمنيش منك ابدا ونفضل مع بعض لآخر العمر ونحقق كل اللي نفسنا فيه سوا. بحبك أوي يا أغلى حاجة في دنيتي كلها وحقك عليا لو فيوم زعلتك ولا دايقتك ياريت متزعليش ينور عيني 💖🌍`;

    let i = 0;
    let isTyping = false;
    let typingTimer;
    
    function startTypingEffect() {
        if(isTyping) return;
        isTyping = true;
        typingText.innerHTML = "";
        
        let tempHtml = "";
        const speed = 30; // ms per char

        function typeWriter() {
            if (i < letterContent.length) {
                // handle HTML tags
                if(letterContent.charAt(i) === '<') {
                    let tag = "";
                    while(letterContent.charAt(i) !== '>' && i < letterContent.length) {
                        tag += letterContent.charAt(i);
                        i++;
                    }
                    tag += '>';
                    tempHtml += tag;
                    i++;
                } else {
                    tempHtml += letterContent.charAt(i);
                    i++;
                }
                
                typingText.innerHTML = tempHtml + '<span class="typewriter-cursor"></span>';
                typingTimer = setTimeout(typeWriter, speed);
            } else {
                // finished
                document.querySelector('.typewriter-cursor').style.display = 'none';
                letterSignature.classList.remove('hidden');
                setTimeout(() => {
                    nextToCountersBtn.classList.remove('hidden');
                }, 1000);
            }
        }
        typeWriter();
    }

    nextToCountersBtn.addEventListener('click', () => {
        goToPage(4);
        startTimers();
    });

    /* --- Page 4: Time Counters --- */
    let timeInterval;
    
    function startTimers() {
        const relationshipStart = new Date("2025-06-30T00:00:00+02:00").getTime();

        timeInterval = setInterval(() => {
            const now = new Date().getTime();
            
            // Rel Timer
            const relDiff = now - relationshipStart;
            // if relationStart is in the future, just show 0
            if(relDiff > 0) {
                const rDays = Math.floor(relDiff / (1000 * 60 * 60 * 24));
                const rHours = Math.floor((relDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const rMins = Math.floor((relDiff % (1000 * 60 * 60)) / (1000 * 60));
                const rSecs = Math.floor((relDiff % (1000 * 60)) / 1000);
                
                document.getElementById('l-days').innerText = rDays;
                document.getElementById('l-hours').innerText = rHours;
                document.getElementById('l-mins').innerText = rMins;
                document.getElementById('l-secs').innerText = rSecs;
            }

                document.getElementById('age-years').innerText = aYears;
                document.getElementById('age-days').innerText = aDays;
                document.getElementById('age-hours').innerText = aHours;
                document.getElementById('age-secs').innerText = aSecs;
            }
        }, 1000);
    }

    nextToCakeBtn.addEventListener('click', () => {
        goToPage(5);
    });

    /* --- Page 5: Birthday Cake --- */
    let candlesBlown = false;
    birthdayCake.addEventListener('click', () => {
        if(!candlesBlown) {
            candlesBlown = true;
            const flames = document.querySelectorAll('.flame');
            flames.forEach(f => f.classList.add('out'));
            
            cakeInstruction.classList.add('hidden');
            hbdMessage.classList.remove('hidden');
            nextToMemoriesBtn.classList.remove('hidden');
            
            // Confetti
            if(window.confetti){
               confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }});
            }
        }
    });

    nextToMemoriesBtn.addEventListener('click', () => goToPage(6));

    /* --- Page 6: Memories Carousel --- */
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((s, idx) => {
            if(idx === index) s.classList.add('active');
            else s.classList.remove('active');
        });
    }

    nextSlideBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    prevSlideBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextToSecretBtn.addEventListener('click', () => goToPage(7));

    /* --- Page 7: Secret Surprise --- */
    secretBtn.addEventListener('click', () => {
        secretBtn.classList.remove('pulse');
        secretBtn.classList.add('hidden');
        secretMsgContainer.classList.remove('hidden');
    });

    nextToOutroBtn.addEventListener('click', () => goToPage(8));

    /* --- Background Generators --- */
    function generateStars() {
        const container = document.getElementById('stars');
        for (let i = 0; i < 50; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            let size = Math.random() * 3 + 1;
            let posX = Math.random() * 100; // vw
            let posY = Math.random() * 100; // vh
            let duration = Math.random() * 10 + 5;
            let delay = Math.random() * 5;

            star.style.width = width = `${size}px`;
            star.style.height = height = `${size}px`;
            star.style.left = `${posX}vw`;
            star.style.top = `${posY}vh`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;

            container.appendChild(star);
        }
    }

    function generateHearts() {
        const container = document.getElementById('hearts-bg');
        const icons = ['❤️', '💜', '💖', '✨'];
        for (let i = 0; i < 20; i++) {
            let heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerText = icons[Math.floor(Math.random() * icons.length)];
            let posX = Math.random() * 100;
            let duration = Math.random() * 15 + 10;
            let delay = Math.random() * 10;

            heart.style.left = `${posX}vw`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;

            container.appendChild(heart);
        }
    }

    generateStars();
    generateHearts();
});
