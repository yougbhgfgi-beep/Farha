
        const { useState, useEffect, useRef } = React;

        // --- Icons ---
        const Heart = ({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
        );

        const Lock = ({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
            </svg>
        );


        const StarBackground = () => {
            return (
                <div className="star-background">
                    {[...Array(100)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                                '--duration': Math.random() * 3 + 2 + 's',
                                animationDelay: Math.random() * 5 + 's'
                            }}
                        ></div>
                    ))}
                </div>
            );
        };

        const ConstellationGame = ({ lang }) => {
            const [activeStars, setActiveStars] = useState([]);
            const [connectedCount, setConnectedCount] = useState(0);
            const [gameOver, setGameOver] = useState(false);
            const totalStars = 8;

            const spawnStars = () => {
                const newStars = [];
                for (let i = 0; i < totalStars; i++) {
                    newStars.push({
                        id: i,
                        top: 20 + Math.random() * 60,
                        left: 10 + Math.random() * 80,
                        connected: false
                    });
                }
                setActiveStars(newStars);
                setConnectedCount(0);
                setGameOver(false);
            };

            const connectStar = (id) => {
                const star = activeStars.find(s => s.id === id);
                if (star.connected) return;

                setActiveStars(prev => prev.map(s => s.id === id ? { ...s, connected: true } : s));
                setConnectedCount(prev => prev + 1);

                if (connectedCount + 1 === totalStars) {
                    setTimeout(() => setGameOver(true), 1000);
                }
            };

            useEffect(() => {
                spawnStars();
            }, []);

            return (
                <section id="game" className="py-24 px-4 relative z-10 overflow-hidden">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white font-premium">{lang === 'ar' ? 'بحبك 🌌' : 'Love Constellation - بحبك 🌌'}</h2>

                    <div className="max-w-4xl mx-auto premium-counter rounded-[1.5rem] md:rounded-[3rem] p-4 md:p-12 relative h-[450px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden border border-[rgb(196,13,116)]/30 bg-black/40 backdrop-blur-sm">

                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {activeStars.map((star, i) => {
                                const nextStar = activeStars.find(s => s.id === star.id + 1);
                                if (star.connected && nextStar && nextStar.connected) {
                                    return (
                                        <line
                                            key={`line-${i}`}
                                            x1={`${star.left}%`}
                                            y1={`${star.top}%`}
                                            x2={`${nextStar.left}%`}
                                            y2={`${nextStar.top}%`}
                                            stroke="url(#goldGradient)"
                                            strokeWidth="2"
                                            className="animate-pulse"
                                        />
                                    );
                                }
                                return null;
                            })}
                            <defs>
                                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#D4AF37" />
                                    <stop offset="100%" stopColor="rgb(196, 13, 116)" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {activeStars.map(star => (
                            <div
                                key={star.id}
                                className={`absolute w-10 h-10 md:w-8 md:h-8 cursor-pointer transition-all duration-500 z-20 flex items-center justify-center ${star.connected ? 'scale-125' : 'hover:scale-150'}`}
                                style={{ top: `${star.top}%`, left: `${star.left}%`, transform: 'translate(-50%, -50%)' }}
                                onClick={() => connectStar(star.id)}
                            >
                                <div className={`w-6 h-6 md:w-full md:h-full rounded-full flex items-center justify-center ${star.connected ? 'bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]' : 'bg-white/20 border border-white/40'}`}>
                                    {star.connected ? '✨' : ''}
                                </div>
                                {!star.connected && <div className="absolute inset-x-2 inset-y-2 bg-white/20 rounded-full animate-ping"></div>}
                            </div>
                        ))}

                        {gameOver && (
                            <div className="text-center z-30 animate-fade-in">
                                <div className="text-8xl md:text-[12rem] mb-6 animate-pulse filter drop-shadow-[0_0_30px_rgb(196,13,116)]">💖</div>
                                <h3 className="text-4xl font-bold text-white mb-4 text-extreme-glow">
                                    {lang === 'ar' ? 'اكتملت هديتك يا أجمل أحمد فرحه! ✨' : 'Story Complete! ✨'}
                                </h3>
                                <p className="text-xl text-rose-200 italic mb-8 max-w-md">
                                    {lang === 'ar' ? 'كل نجمة في السما بتشهد على حبي ليك... نورت دنيتي' : 'Every star in the sky bears witness to my love... You light up my world.'}
                                </p>
                                <button onClick={spawnStars} className="text-[rgb(196,13,116)] underline font-bold hover:text-white transition-colors">
                                    {lang === 'ar' ? 'ارسم هدية تانية؟' : 'Draw another story?'}
                                </button>
                            </div>
                        )}

                        {!gameOver && (
                            <div className="absolute bottom-8 text-white/40 font-premium tracking-widest uppercase text-sm animate-pulse">
                                {lang === 'ar' ? 'جمعي النجوم عشان تشوفي هديتك...' : 'Connect the stars...'}
                            </div>
                        )}
                    </div>
                </section>
            );
        };

        const InfinityIcon = ({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
            </svg>
        );

        function usePulse(isPlaying) {
            useEffect(() => {
                const auras = document.querySelectorAll('.aura-glow');
                if (isPlaying) {
                    auras.forEach(a => a.classList.add('pulse-active'));
                } else {
                    auras.forEach(a => a.classList.remove('pulse-active'));
                }
            }, [isPlaying]);
        }

        function useParticleSystem() {
            useEffect(() => {
                const createParticle = (x, y) => {
                    const colors = ['rgb(196, 13, 116)', '#D4AF37', '#fecdd3', '#ff85cc', '#ffb3e0', '#ff66c4'];
                    const emojis = ['💖', '✨', '🌸', '✨'];
                    for (let i = 0; i < 5; i++) {
                        const particle = document.createElement('div');
                        particle.classList.add('particle');
                        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                        particle.style.left = x + 'px';
                        particle.style.top = y + 'px';
                        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                        particle.style.fontSize = Math.random() * 15 + 8 + 'px';
                        particle.style.setProperty('--tx', (Math.random() - 0.5) * 150 + 'px');
                        particle.style.setProperty('--ty', (Math.random() - 0.5) * 150 + 'px');
                        document.body.appendChild(particle);
                        setTimeout(() => particle.remove(), 1000);
                    }
                };
                const handleTouch = (e) => {
                    [...e.touches].forEach(t => createParticle(t.clientX, t.clientY));
                };
                const handleClick = (e) => createParticle(e.clientX, e.clientY);
                window.addEventListener('touchstart', handleTouch);
                window.addEventListener('touchmove', handleTouch);
                window.addEventListener('mousedown', handleClick);
                return () => {
                    window.removeEventListener('touchstart', handleTouch);
                    window.removeEventListener('touchmove', handleTouch);
                    window.removeEventListener('mousedown', handleClick);
                };
            }, []);
        }

        const finalMessageAR = `اميرتي ..... عايز أقولك إن من يوم ما دخلتي حياتي وكل حاجة اتغيرت للأحسن بجد، إنتي مش بس حبيبتي، إنتي سندي وضهري وصحبتي واختي وكل دنيتي. اليوم اللي بدأنا فيه حكايتي معاكي هو أسعد يوم في حياتي، حبيت اعيد عليكي بطريقه مختلفه عيد الاضحي دلوقتي تاني عيد واحنا مع بعض كل سنه وانتي طيبه كل عيد وانتي عيدي . عمري مهنسا اليوم الي كنا فيه معبضا في سي بوت يوم مجبتك الشكولاته كنت فرحان اووي وانتي عمال تشاكلي فيا. واكتر يوم كنت مبسوط فيه اووي اليوم بتاع البطوله لما كنا مع بعض وجبنا اكل واكل مع بعض واتمشيت معاكي دا كان من اسعد ايام حياتي. ربنا يخليكي ليا وميحرمنيش منك ابدا ونفضل مع بعض لآخر العمر ونحقق كل اللي نفسنا فيه سوا. بحبك أوي يا أغلى حاجة في دنيتي كلها وحقك عليا لو فيوم زعلتك ولا دايقتك ياريت متزعليش ينور عيني 💖🌍`;
        const finalMessageEN = `Ahmed Farha, my love ..... You are the most beautiful thing in my world. Since the day you entered my life, everything has changed for the better. You are not just my beloved, you are my support, my back, and my whole world. You are the happiest part of my life, and may God keep you for me and we stay together until the end of life and achieve everything we wish for together. I love you so much 💖🌍 .`;

        const i18n = {
            ar: {
                nav: { birthday: "حب رمنسه", memories: "ذكرياتنا", video: "الفيديو", why: "ليه بحبك" },
                hero: { subtitle: "بحبك، قصة حب مكتوبة للابد", btn: "زر المفاجأة ✨" },
                login: { title: "بحبك يا <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span> 💜", day: "يوم", month: "شهر", year: "سنة", btn: "فتح الصندوق", quote: "أنت أجمل حاجة حصلتلي في حياتي..." },
                meter: { title: "مقياس حبي ليك", label: "نسبة الحب", calc: "جاري حساب كمية الحب...", result: "النتيجة: حب لا نهائي <span className='result-heart'>💜</span> ∞", hint: "اضغط عشان تشوف النتيجة" },
                timeline: { title: "خط ذكرياتنا" },
                video: { title: "ذكرى حلوة 🎥", sub: "لحظات متتنسيش..." },
                reasons: { title: "ليه بحبك؟ 🤔💜", r1: { t: "حنيتك", d: "أحن وأطيب قلب في الدنيا، بتمسح دمعتي قبل ما تنزل." }, r2: { t: "أماني", d: "معاك بحس إني مسنود على جبل، ولا حاجة تقدر تكسرني." }, r3: { t: "ضحكتك", d: "لما بتضحك الدنيا كلها بتضحكلي، هي علاجي ودوائي." }, r4: { t: "قلبك الأبيض", d: "أنقى وأطيب قلب، بيسامح وبيحب بصدق." }, r5: { t: "عيونك", d: "بشوف فيها مستقبلي." }, r6: { t: "وجودك", d: "كفاية بس إنك موجود، ده بيخلي الحياة ليها طعم ولون." } },
                footer: { final: "The Final Scene" },
                envelope: { mylove: "بحبك يا <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span> 💜", enter: "ادخل عالم حبنا 💜", hint: "انقر لفتح الرسالة 💌", message: "رسالة حب ليك..." },
                gallery: { title: "صورنا الحلوة 📸" },
                finalScene: { scene1: "أنت أجمل حاجة في حياتي…<br />ده أحلى إنسان في الدنيا", scene2: "أحمد فرحه، أنت أغلى وأفخم هدية نورت حياتي...", scene2b: "أنت ملك قلبي.", scene3: "بحبك يا <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span>…", scene3b: "أنت الأمان والونس والبيت.", scene4: "عيونك عاملة زي آخر الليل… هادية، عميقة، ومليانة راحة. كل مرة أبص فيها أنسى الدنيا، وأفضل سرحان كأني أول مرة أشوف الجمال. عيونك مش بس حلوة… دي المكان الوحيد اللي الواحد يضيع فيه وهو مطمن. 🤍", scene6: "يا رب دايما تفضل في حياتي", scene7: "ونفضل دايماً سوا…", scene8: "لأن مفيش حياة من غيرك.", infinity: "إلى ما لا نهاية، بحبك يا <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span>", back: "الرجوع للرئيسية", thanks: "بحبك يا نبض قلبي…" },
                timeline: {
                    items: [
                        { pic: "saba1.jpg", text: "أجمل صدفة في حياتي 💖", desc: "اليوم اللي دخلت فيه حياتي كان أحلى يوم، وجودك نور دنيتي وفرح قلبي." },
                        { pic: "saba2.jpg", text: "بحبك أكتر من أي حاجة 💜", desc: "كل يوم بيمر عليا بتأكد إنك العوض الجميل اللي كنت بستناه، بحبك قد الدنيا." },
                        { pic: "profile.jpeg", text: "يا أحلى اختياراتي 💍", desc: "لو الأيام رجعت بيا ألف مرة، هختارك برضه، مفيش حد يقدر يملا مكانك." }
                    ]
                }
            },
            en: {
                nav: { birthday: "Love", memories: "Memories", video: "Video", why: "Why I Love You" },
                hero: { subtitle: "A love story written forever", btn: "Surprise Button ✨" },
                login: { title: "I Love You Ahmed Farha 💜", day: "Day", month: "Month", year: "Year", btn: "Open Gift Box", quote: "You are the most beautiful thing that happened to me..." },
                meter: { title: "My Love Meter for You", label: "Love Percentage", calc: "Calculating love amount...", result: "Result: Infinite Love <span className='result-heart'>💜</span> ∞", hint: "Click to see the result, my love" },
                timeline: { title: "Our Timeline" },
                video: { title: "Sweet Memory 🎥", sub: "Unforgettable moments..." },
                reasons: { title: "Why I Love You? 🤔💜", r1: { t: "Your Kindness", d: "The kindest heart in the world, wiping my tears before they fall." }, r2: { t: "My Safety", d: "With you I feel lean on a mountain, nothing can break me." }, r3: { t: "Your Laugh", d: "When you laugh the whole world laughs for me, it's my cure." }, r4: { t: "Your White Heart", d: "The purest heart, forgives and loves sincerely." }, r5: { t: "Your Eyes", d: "I see in them my future." }, r6: { t: "Your Presence", d: "Just your existence is enough, it gives life taste and color." } },
                footer: { final: "The Final Scene" },
                envelope: { mylove: "I Love You Ahmed Farha 💜", enter: "Enter our love world 💜", hint: "Click to open the message 💌", message: "A love message for you..." },
                finalScene: { scene1: "You are the most beautiful thing in my life...<br />The best person in the world", scene2: "Ahmed Farha, you are the greatest gift that lit up my life...", scene2b: "You are the king of my heart.", scene3: "I love you Ahmed Farha...", scene3b: "You are my safety, companion, and home.", scene4: "Your eyes are like the end of the night... calm, deep, full of peace. Every time I look into them, I forget the world. 🤍", scene6: "May you always stay in my life", scene7: "And may we always stay together...", scene8: "Because there is no life without you.", infinity: "To infinity, I love you Ahmed Farha", back: "Back to Home", thanks: "I love you my heartbeat..." },
                timeline: {
                    items: [
                        { pic: "saba1.jpg", text: "أجمل صدفة في حياتي 💖", desc: "اليوم اللي دخلت فيه حياتي كان أحلى يوم، وجودك نور دنيتي وفرح قلبي." },
                        { pic: "saba2.jpg", text: "بحبك أكتر من أي حاجة 💜", desc: "كل يوم بيمر عليا بتأكد إنك العوض الجميل اللي كنت بستناه، بحبك قد الدنيا." },
                        { pic: "profile.jpeg", text: "يا أحلى اختياراتي 💍", desc: "لو الأيام رجعت بيا ألف مرة، هختارك برضه، مفيش حد يقدر يملا مكانك." }
                    ]
                },
                gallery: { title: "Our Sweet Photos 📸" }
            }
        };

        const FancyText = ({ text }) => {
            const [displayText, setDisplayText] = useState("");
            const [index, setIndex] = useState(0);
            const charArray = useRef([]);
            const containerRef = useRef(null);

            useEffect(() => {
                charArray.current = Array.from(text);
                setDisplayText("");
                setIndex(0);
            }, [text]);

            useEffect(() => {
                if (index < charArray.current.length) {
                    const timeout = setTimeout(() => {
                        setDisplayText(prev => prev + charArray.current[index]);
                        setIndex(prev => prev + 1);
                    }, 25);
                    return () => clearTimeout(timeout);
                }
            }, [index]);

            useEffect(() => {
                if (containerRef.current) {
                    const scrollContainer = containerRef.current.closest('.overflow-y-auto');
                    if (scrollContainer) {
                        scrollContainer.scrollTop = scrollContainer.scrollHeight;
                    }
                }
            }, [displayText]);

            return (
                <div ref={containerRef} className="leading-relaxed text-gray-800 text-right text-xl md:text-2xl font-medium whitespace-pre-wrap pb-10" style={{ direction: 'rtl', minHeight: '1.5em' }}>
                    {displayText}
                    <span className="animate-pulse inline-block w-1 h-6 bg-[rgb(196,13,116)] ml-1 align-middle"></span>
                </div>
            );
        };

        const FlipUnit = ({ val, unit }) => {
            const [displayVal, setDisplayVal] = useState(val);
            const [isFlipping, setIsFlipping] = useState(false);

            useEffect(() => {
                if (val !== displayVal) {
                    setIsFlipping(true);
                    const timeout = setTimeout(() => {
                        setDisplayVal(val);
                        setIsFlipping(false);
                    }, 400);
                    return () => clearTimeout(timeout);
                }
            }, [val]);

            return (
                <div className="flex flex-col items-center group px-1 md:px-4">
                    <div className={`numeric-flip ${isFlipping ? 'flip-change' : ''} text-2xl xs:text-3xl md:text-5xl font-premium text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}>
                        {String(displayVal).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] md:text-[11px] font-premium text-rose-200/60 uppercase tracking-[0.2em] mt-1 group-hover:text-[rgb(196,13,116)] transition-colors">
                        {unit}
                    </div>
                </div>
            );
        };

        const RelationshipClock = ({ startDate, title, subtitle, t, format = 'full' }) => {
            const [time, setTime] = useState({});

            useEffect(() => {
                const calculate = () => {
                    const now = new Date();
                    const start = new Date(startDate);
                    const diffMs = now - start;

                    if (format === 'days') {
                        setTime({
                            isTotalDays: true,
                            totalDays: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
                            hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
                            minutes: Math.floor((diffMs / (1000 * 60)) % 60),
                            seconds: Math.floor((diffMs / 1000) % 60)
                        });
                    } else {
                        let years = now.getFullYear() - start.getFullYear();
                        let months = now.getMonth() - start.getMonth();
                        let days = now.getDate() - start.getDate();
                        if (days < 0) {
                            months -= 1;
                            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                            days += lastMonth.getDate();
                        }
                        if (months < 0) {
                            years -= 1;
                            months += 12;
                        }
                        setTime({
                            isTotalDays: false,
                            years,
                            months,
                            days,
                            hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
                            minutes: Math.floor((diffMs / (1000 * 60)) % 60),
                            seconds: Math.floor((diffMs / 1000) % 60)
                        });
                    }
                };
                calculate();
                const interval = setInterval(calculate, 1000);
                return () => clearInterval(interval);
            }, [startDate]);

            return (
                <div className="w-full my-6 md:my-10 p-4 md:p-10 bg-white/5 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(131,11,157,0.15)] text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#830b9d]/30 to-transparent"></div>

                    <div className="mb-6 md:mb-10">
                        <p className="text-[rgb(196,13,116)] font-script text-xl md:text-3xl mb-1">{title}</p>
                        <h3 className="text-white/60 text-[10px] md:text-base font-premium tracking-widest uppercase">{subtitle}</h3>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-1 md:gap-4">
                        {time.isTotalDays ? (
                            <FlipUnit val={time.totalDays} unit={t.day} />
                        ) : (
                            <>
                                <FlipUnit val={time.years} unit={t.year} />
                                <span className="text-white/20 text-xl md:text-4xl pb-4 hidden md:block">•</span>
                                <FlipUnit val={time.months} unit={t.month} />
                                <span className="text-white/20 text-xl md:text-4xl pb-4 hidden md:block">•</span>
                                <FlipUnit val={time.days} unit={t.day} />
                            </>
                        )}

                        <div className="w-full h-px bg-white/5 my-2 md:hidden"></div>
                        <span className="hidden md:block w-px h-12 bg-white/10 mx-4"></span>

                        <FlipUnit val={time.hours} unit={t.hour} />
                        <span className="text-white/20 text-xl md:text-4xl pb-4 flex items-center justify-center h-full">:</span>
                        <FlipUnit val={time.minutes} unit={t.min} />
                        <span className="text-white/20 text-xl md:text-4xl pb-4 flex items-center justify-center h-full">:</span>
                        <FlipUnit val={time.seconds} unit={t.sec} />
                    </div>
                    <div className="mt-6 md:mt-8 flex justify-center gap-1">
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-[rgb(196,13,116)] opacity-40 animate-pulse" />
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-[rgb(196,13,116)] opacity-60 animate-pulse [animation-delay:200ms]" />
                        <Heart className="w-4 h-4 md:w-5 md:h-5 text-[rgb(196,13,116)] opacity-40 animate-pulse [animation-delay:400ms]" />
                    </div>
                </div>
            );
        };

        const LoveNote = ({ lang }) => {
            const [isOpen, setIsOpen] = useState(false);
            const [msgIndex, setMsgIndex] = useState(0);

            const messages = {
                ar: [
                    "كل مرة بشوف فيها ضحكتك بحس إن الدنيا لسه بخير، إنتي دايماً سر سعادتي كل مبشوف ضحكتك الدنيا قدامي بتتغير خالص بتخليني ف عالم تاني ربنا يديم ضحكتك الحلوة ياميرتي 🥹🫶🏻",
                    "إنتي مش بس حبيبتي ، إنتي كل أهلي ودنيتي ، بيكي بكون أقوى وبواجه أي حاجة اكتر حد واقف جنبي وبيشجعني ع كل حاجة اكتر حد برتاح معاه ف الكلام بحب اتكلم معاكي ومش بكون عايز ابطل كلام معاكي ولا عمري مليت من الكلام معاكي وعايز اقولك الفتره الي مكناش بنكلم فيها كنت ببقي مدايق اووي ولما فونك باظ وكلمتك بعدها اول حاجة كان نفسي اقولهالك هي وحشتيني وبتوحشيني ف كل لحظه بتفوت عليا 🥹♥️",
                    "عيونك عاملة زي آخر الليل… هادية، عميقة، ومليانة راحة بشكل يخلي الواحد مش عايز يبص لحد غيرك. وأجمل حاجة في عيونك إنها بتفضحك… كل ضحكة، كل خوف، كل حب مستخبي بيبان فيها من غير كلام. أنا مش محتاج كلام حب كبير، يكفيني أبص في عيونك دقيقة وأحس إن الدنيا كلها جت صالحتني. عيونك مش بس حلوة… دي المكان الوحيد اللي الواحد يضيع فيه وهو مطمن. لما ببص فيها بحس إن الدنيا كلها هديت، كأن عيونك معمولة مخصوص عشان تطمن قلبي. وعيونك دي مشكلة كبيرة… كل مرة أبص فيها أنسى كنت هقول إيه، وأفضل سرحان كأني أول مرة أشوف الجمال. في ناس عيونها تتشاف… وعيونك تتحفظ في القلب. 🤍"
                ],
                en: [
                    "Every time I see your smile, I feel the world is still good. You are my happiness. 🥹🫶🏻",
                    "You are not just my love, you are my family and my whole world. I miss you every moment. 🥹♥️",
                    "Your eyes are like the end of the night... calm, deep, full of peace. The only place I lose myself safely. 🤍"
                ]
            };

            const toggleNote = () => {
                if (!isOpen) {
                    setMsgIndex(Math.floor(Math.random() * messages[lang].length));
                }
                setIsOpen(!isOpen);
            };

            return (
                <div className="relative group">
                    <button className="love-note-btn !bottom-4 !right-4 md:!bottom-8 md:!right-8" onClick={toggleNote}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </button>

                    {isOpen && (
                        <div className="love-note-popup !bottom-20 !right-4 md:!bottom-28 md:!right-8">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[rgb(196,13,116)] font-bold text-xs uppercase tracking-widest">{lang === 'ar' ? 'مذكرة حب 💌' : 'Love Note 💌'}</span>
                                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">✕</button>
                            </div>
                            <p className="text-white text-lg font-medium leading-relaxed mb-4">
                                {messages[lang][msgIndex]}
                            </p>
                            <button
                                onClick={() => setMsgIndex((msgIndex + 1) % messages[lang].length)}
                                className="text-[rgb(196,13,116)] text-xs font-bold hover:underline"
                            >
                                {lang === 'ar' ? 'رسالة تانية؟ ✨' : 'Another message? ✨'}
                            </button>
                        </div>
                    )}
                </div>
            );
        };


        const DecorativeFrame = () => {
            const hearts = [...Array(15)];
            return (
                <div className="fixed inset-0 pointer-events-none z-[140]">
                    {/* Left Chain */}
                    <div className="decorative-chain left">
                        {hearts.map((_, i) => (
                            <React.Fragment key={`l-${i}`}>
                                <div className="chain-link"></div>
                                <Heart className="chain-heart" />
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Right Chain */}
                    <div className="decorative-chain right">
                        {hearts.map((_, i) => (
                            <React.Fragment key={`r-${i}`}>
                                <div className="chain-link"></div>
                                <Heart className="chain-heart" />
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Top Ornate Header */}
                    <div className="top-ornate-header">
                        <svg viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D4AF37]">
                            <path d="M400 20C380 20 365 35 350 35C335 35 320 20 300 20C280 20 260 40 240 40C220 40 200 20 180 20C160 20 140 40 120 40C100 40 80 20 60 20C40 20 20 40 0 40V0H800V40C780 40 760 20 740 20C720 20 700 40 680 40C660 40 640 20 620 20C600 20 580 40 560 40C540 40 520 20 500 20C480 20 465 35 450 35C435 35 420 20 400 20Z" fill="currentColor" fillOpacity="0.1" />
                            <path d="M400 30C410 30 415 25 420 25C425 25 430 30 440 30C450 30 455 25 460 25C465 25 470 30 480 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                            <path d="M400 30C390 30 385 25 380 25C375 25 370 30 360 30C350 30 345 25 340 25C335 25 330 30 320 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                            <circle cx="400" cy="20" r="3" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            );
        };


        const EnvelopeComponent = ({ onEnter, lang }) => {
            const [isOpen, setIsOpen] = useState(false);
            const [isGrowing, setIsGrowing] = useState(false);

            const handleOpen = () => {
                if (!isOpen) {
                    setIsOpen(true);
                    setTimeout(() => setIsGrowing(true), 600);
                }
            };

            const t = i18n[lang].envelope;
            return (
                <div className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-fade-in">
                    <div className={`transition-all duration-1000 ${isOpen ? 'scale-100 opacity-100' : 'scale-75 cursor-pointer hover:scale-110'} ${isGrowing ? 'w-full h-full max-w-4xl max-h-[85vh]' : 'w-64 h-64 mt-10'} relative`} onClick={handleOpen}>

                        {!isGrowing ? (
                            <div className={`w-full h-full relative transition-all duration-700 ${isOpen ? 'scale-[3] opacity-0' : 'opacity-100'} group mt-8`}>
                                {/* Lid (Top part of box) */}
                                <div className="absolute -top-8 left-[-5%] w-[110%] h-14 bg-gradient-to-r from-[#830a9d] via-[rgb(196,13,116)] to-[#830a9d] rounded-t-lg shadow-xl z-20 border-b-4 border-black/40 flex justify-center items-center">
                                    <div className="w-10 h-full bg-gradient-to-r from-[#D4AF37] to-[#e6cf78] shadow-[0_0_15px_rgba(212,175,55,0.7)] border-x border-yellow-700/50"></div>
                                </div>

                                {/* Box Body */}
                                <div className="w-full h-full bg-gradient-to-b from-[#3a0b5e] to-[#1c0231] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex justify-center items-center border-x-4 border-b-4 border-black/50">
                                    {/* Vertical Ribbon */}
                                    <div className="absolute w-10 h-full bg-gradient-to-r from-[#D4AF37] to-[#e6cf78] shadow-[0_0_20px_rgba(212,175,55,0.4)] border-x border-yellow-700/50"></div>

                                    {/* Horizontal Ribbon */}
                                    <div className="absolute w-full h-10 bg-gradient-to-b from-[#D4AF37] to-[#e6cf78] shadow-[0_0_20px_rgba(212,175,55,0.4)] border-y border-yellow-700/50"></div>

                                    {/* Center Heart Lock */}
                                    <div className="z-10 bg-gradient-to-br from-[#111] to-[#333] border-4 border-[#D4AF37] rounded-full p-5 shadow-[0_0_40px_rgba(212,175,55,1)] transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">
                                        <Heart className="w-12 h-12 text-[#D4AF37] animate-pulse" fill="#D4AF37" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-[#fdfcf0] rounded-2xl shadow-[0_0_100px_rgba(255,255,255,0.2)] p-6 md:p-12 overflow-y-auto relative animate-fade-in border-4 border-[#D4AF37]">
                                <div className="absolute top-4 bottom-4 left-4 right-4 border border-[#D4AF37]/30 pointer-events-none rounded-xl"></div>
                                <div className="text-center mb-8 relative z-10">
                                    <div className="inline-block p-4 bg-purple-50 rounded-full mb-4 shadow-inner border border-purple-100">
                                        <Heart className="w-12 h-12 text-[#830b9d]" />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 font-premium">إلى <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span> 💜</h2>
                                </div>
                                <div className="relative z-10 w-full max-w-3xl mx-auto">
                                    <FancyText text={lang === 'ar' ? finalMessageAR : finalMessageEN} />
                                </div>
                                <div className="text-center mt-12 mb-8 relative z-10">
                                    <button onClick={(e) => { e.stopPropagation(); if (onEnter) onEnter(); }} className="bg-gradient-to-r from-pink-800 to-[rgb(196,13,116)] text-white px-12 py-4 rounded-full shadow-[0_0_30px_rgba(196,13,116,0.5)] font-bold text-xl hover:scale-105 active:scale-95 transition-all outline-none border border-white/20">
                                        {t.enter}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {!isGrowing && !isOpen && <p className="mt-20 text-[#D4AF37] animate-pulse text-xl xl:text-2xl tracking-widest uppercase font-bold drop-shadow-md">{t.hint}</p>}
                </div>
            );
        };

        const LoveCakeComponent = ({ lang }) => {
            const [hearts, setHearts] = useState([true, true, true, true]);
            const [allLit, setAllLit] = useState(false);

            const lightHeart = (index) => {
                const newHearts = [...hearts];
                newHearts[index] = false;
                setHearts(newHearts);
                if (newHearts.every(c => !c) && !allLit) {
                    setAllLit(true);
                    triggerSurprise();
                }
            };

            const triggerSurprise = () => {
                if (window.confetti) {
                    const duration = 3000;
                    const end = Date.now() + duration;
                    (function frame() {
                        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#c40d74', '#D4AF37', '#ffffff'] });
                        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#c40d74', '#D4AF37', '#ffffff'] });
                        if (Date.now() < end) requestAnimationFrame(frame);
                    }());
                }
            };

            return (
                <section id="love" className="py-24 px-4 relative z-10 overflow-hidden flex flex-col items-center justify-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white font-premium drop-shadow-lg">
                        {lang === 'ar' ? <>بحبك يا <span className="font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold">أحمد فرحه</span> 💜</> : 'I Love You Ahmed Farha 💜'}
                    </h2>

                    <div className="relative mt-20 mb-10 w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-end">
                        {/* Hearts */}
                        <div className="flex gap-4 md:gap-6 mb-[-10px] z-20">
                            {hearts.map((isOn, i) => (
                                <div key={i} className="relative cursor-pointer group" onClick={() => lightHeart(i)}>
                                    <div className={`text-3xl md:text-4xl transition-all duration-300 ${isOn ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>💖</div>
                                    <div className="w-4 h-16 md:w-5 md:h-20 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-sm border border-pink-500 mx-auto mt-1"></div>
                                </div>
                            ))}
                        </div>

                        {/* Cake Top Tier */}
                        <div className="w-48 h-20 md:w-60 md:h-24 bg-gradient-to-r from-pink-500 via-[rgb(196,13,116)] to-pink-600 rounded-lg shadow-2xl z-10 relative flex justify-center items-center overflow-hidden border-2 border-pink-300">
                            <div className="absolute top-0 w-full flex justify-around opacity-70">
                                {[...Array(6)].map((_, i) => <div key={i} className="w-8 h-8 bg-white rounded-full -mt-4 shadow-md"></div>)}
                            </div>
                            <span className="text-white font-bold text-2xl filter drop-shadow-md z-10 pt-4">أحمد فرحه</span>
                        </div>

                        {/* Cake Bottom Tier */}
                        <div className="w-64 h-24 md:w-80 md:h-32 bg-gradient-to-r from-white via-pink-50 to-pink-100 rounded-lg shadow-2xl z-0 -mt-2 relative border-2 border-pink-200 flex flex-col justify-end pb-4">
                            <div className="absolute top-0 w-full flex justify-around opacity-60">
                                {[...Array(8)].map((_, i) => <div key={i} className="w-10 h-10 bg-[rgb(196,13,116)] rounded-full -mt-5 shadow-inner"></div>)}
                            </div>
                            <div className="w-full h-4 bg-gradient-to-r from-pink-400 to-pink-600 opacity-20 mt-auto shadow-[0_-5px_15px_rgba(0,0,0,0.1)]"></div>
                        </div>

                        {/* Plate */}
                        <div className="w-72 h-8 md:w-96 md:h-10 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[100%] absolute -bottom-4 shadow-[0_20px_20px_rgba(0,0,0,0.5)] z-[-1]"></div>
                    </div>

                    <p className={`mt-8 text-xl md:text-2xl text-pink-200 font-bold italic transition-opacity duration-1000 text-center max-w-2xl leading-relaxed ${allLit ? 'opacity-100 animate-bounce' : 'opacity-0'}`}>
                        {lang === 'ar' ? 'بحبك يا أحمد فرحه.. يا رب دايما تفضل في حياتي ونحقق كل أحلامنا سوا 💖' : 'I love you Ahmed Farha.. May you always stay in my life and we achieve all our dreams together 💖'}
                    </p>

                    {!allLit && (
                        <p className="mt-8 text-sm md:text-base text-gray-300 uppercase tracking-widest animate-pulse">
                            {lang === 'ar' ? 'اضغط على القلوب لتضيئها' : 'Tap on the hearts to light them up'}
                        </p>
                    )}
                </section>
            );
        };

        // --- Main Component ---
        function LoveWebsite() {
            useParticleSystem();

            useEffect(() => {
                const handleScroll = () => {
                    const images = document.querySelectorAll('.parallax-img');
                    images.forEach(img => {
                        const speed = 0.5;
                        const rect = img.parentElement.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        if (isVisible) {
                            const offset = (window.innerHeight - rect.top) * speed * 0.1;
                            img.style.transform = `translateY(${offset - 30}px)`;
                        }
                    });
                };
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);

            const [lang, setLang] = useState('ar');
            const [isLogged, setIsLogged] = useState(false);
            const [day, setDay] = useState("");
            const [month, setMonth] = useState("");
            const [year, setYear] = useState("");
            const [showEnvelope, setShowEnvelope] = useState(false);
            const [showSecret, setShowSecret] = useState(false);
            const [showFinalScene, setShowFinalScene] = useState(false);
            const [isPlaying, setIsPlaying] = useState(false);
            const [selectedImage, setSelectedImage] = useState(null);
            const audioRef = useRef(null);

            usePulse(isPlaying);

            const firstSightDate = new Date("2025-07-24T00:00:00");

            const handleLogin = () => {
                const checkDay = day.trim();
                const checkMonth = month.trim();
                const checkYear = year.trim();

                if ((checkDay === "24") && (checkMonth === "7" || checkMonth === "07") && checkYear === "2025") {
                    setIsLogged(true);
                    if (audioRef.current) {
                        const playPromise = audioRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise
                                .then(() => setIsPlaying(true))
                                .catch(error => console.log("Audio playback failed:", error));
                        }
                    }
                    setTimeout(() => setShowEnvelope(true), 1200);
                } else {
                    alert(lang === 'ar' ? "غلط يا روحي" : "Wrong, my love");
                }
            };

            const toggleAudio = () => {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
            };

            usePulse(isPlaying);

            useEffect(() => {
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.lang = lang;
            }, [lang]);

            const t = i18n[lang] || i18n['ar'];

            return (
                <div className={`login-gradient min-h-screen font-sans text-gray-100 overflow-x-hidden relative ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <StarBackground />
                    {/* Global Night Sky Background - Always Visible */}
                    <div className="fixed inset-0 pointer-events-none">
                        {[...Array(window.innerWidth < 768 ? 20 : 50)].map((_, i) => (
                            <div key={i} className="absolute bg-white rounded-full animate-pulse"
                                style={{
                                    width: Math.random() * 2 + 'px',
                                    height: Math.random() * 2 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                    opacity: Math.random() * 0.5 + 0.1,
                                    animationDuration: Math.random() * 5 + 3 + 's'
                                }}></div>
                        ))}
                    </div>

                    {/* Audio Player - Always Mounted */}
                    <audio ref={audioRef} loop playsInline webkit-playsinline preload="auto">
                        <source src="./WhatsApp Audio -03-16 at 6.49.03 PM.mpeg" type="audio/mpeg" />
                    </audio>

                    {/* Audio Toggle Button - Always Visible */}
                    <div className={`fixed top-4 z-50 flex gap-2 ${lang === 'ar' ? 'left-4' : 'right-4'}`}>
                        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="p-3 rounded-full shadow-lg bg-white text-[rgb(196,13,116)] font-bold hover:bg-gray-100 transition-all uppercase text-xs">
                            {lang === 'ar' ? 'EN' : 'AR'}
                        </button>
                        <button onClick={toggleAudio} className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isPlaying ? 'bg-pink-500 text-white animate-spin' : 'bg-white text-pink-500 hover:bg-gray-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13"></path>
                                <circle cx="6" cy="18" r="3"></circle>
                                <circle cx="18" cy="16" r="3"></circle>
                            </svg>
                        </button>
                    </div>

                    {!isLogged ? (
                        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans z-20 login-gradient">
                            {/* Animated Background Aura */}
                            <div className="aura-glow top-0 left-0 pointer-events-none" style={{ animationDelay: '0s' }}></div>
                            <div className="aura-glow bottom-0 right-0 pointer-events-none" style={{ animationDelay: '-10s', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)' }}></div>

                            {/* Floating Hearts Decor */}
                            <div className="absolute inset-0 pointer-events-none opacity-30">
                                {[...Array(window.innerWidth < 768 ? 8 : 15)].map((_, i) => (
                                    <div key={i} className="absolute animate-float"
                                        style={{
                                            top: Math.random() * 100 + '%',
                                            left: Math.random() * 100 + '%',
                                            fontSize: Math.random() * 20 + 10 + 'px',
                                            animationDuration: Math.random() * 5 + 5 + 's',
                                            animationDelay: -Math.random() * 5 + 's'
                                        }}>💖</div>
                                ))}
                            </div>

                            {/* Redesigned Login Card */}
                            <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-3xl text-center max-w-sm w-full mx-4 animate-slide-up group shadow-[0_0_30px_rgba(196,13,116,0.2)] border border-white/10">
                                <div className="mb-8 relative">
                                    <div className="absolute -inset-4 bg-[#830b9d]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="relative inline-block p-1 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full mb-4 shadow-xl">
                                        <img src="./profile.jpeg" alt="أحمد فرحه" className="w-28 h-28 rounded-full border-4 border-white/10 object-cover object-center" />
                                    </div>
                                    <h1 className="text-4xl font-bold text-white tracking-tight" dangerouslySetInnerHTML={{ __html: t.login.title }}></h1>
                                    <p className="text-white/40 text-sm mt-2 uppercase tracking-[0.2em] font-light">The Sacred Vault</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-2 sm:gap-4">
                                        <div className="relative group/input flex-1">
                                            <input
                                                type="number"
                                                placeholder={t.login.day}
                                                className="w-full bg-white/5 border border-white/10 p-3 md:p-5 rounded-2xl text-white text-center focus:outline-none focus:ring-2 focus:ring-[rgb(196,13,116)]/50 focus:border-[rgb(196,13,116)] transition-all placeholder:text-white/20 text-base md:text-xl font-bold tracking-widest"
                                                value={day}
                                                onChange={(e) => setDay(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                                style={{ direction: 'ltr' }}
                                                min="1" max="31"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover/input:opacity-100 transition-opacity"></div>
                                        </div>

                                        <div className="relative group/input flex-1">
                                            <input
                                                type="number"
                                                placeholder={t.login.month}
                                                className="w-full bg-white/5 border border-white/10 p-3 md:p-5 rounded-2xl text-white text-center focus:outline-none focus:ring-2 focus:ring-[rgb(196,13,116)]/50 focus:border-[rgb(196,13,116)] transition-all placeholder:text-white/20 text-base md:text-xl font-bold tracking-widest"
                                                value={month}
                                                onChange={(e) => setMonth(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                                style={{ direction: 'ltr' }}
                                                min="1" max="12"
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover/input:opacity-100 transition-opacity"></div>
                                        </div>

                                        <div className="relative group/input flex-[1.2]">
                                            <input
                                                type="number"
                                                placeholder={t.login.year}
                                                className="w-full bg-white/5 border border-white/10 p-3 md:p-5 rounded-2xl text-white text-center focus:outline-none focus:ring-2 focus:ring-[rgb(196,13,116)]/50 focus:border-[rgb(196,13,116)] transition-all placeholder:text-white/20 text-base md:text-xl font-bold tracking-widest"
                                                value={year}
                                                onChange={(e) => setYear(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                                style={{ direction: 'ltr' }}
                                            />
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover/input:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleLogin}
                                        className="shimmer-btn w-full bg-gradient-to-r from-[rgb(196,13,116)] to-[rgb(196,13,116)] text-white font-bold py-5 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg flex items-center justify-center gap-3 group/btn"
                                    >
                                        <span>{t.login.btn}</span>
                                        <Heart className="w-5 h-5 group-hover/btn:scale-125 transition-transform" />
                                    </button>
                                </div>

                                <p className="mt-8 text-white/30 text-xs font-light italic">"{t.login.quote}"</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10">
                            {/* Sticky Navigation */}
                            <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 py-2 md:py-3 flex flex-col items-center gap-1 md:gap-2 transition-all">
                                <div className="text-xl md:text-2xl font-bold font-script text-[rgb(196,13,116)]"><span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span></div>
                                <div className="w-full flex overflow-x-auto gap-4 justify-center text-[9px] xs:text-[11px] sm:text-xs md:text-sm tracking-tight sm:gap-6 uppercase font-premium px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    <a href="#love" className="hover:text-pink-300 text-[#fecdd3] drop-shadow-[0_0_5px_rgba(254,205,211,0.5)] font-extrabold animate-pulse whitespace-nowrap min-w-max">{t.nav.birthday}</a>
                                    <a href="#timeline" className="hover:text-[rgb(196,13,116)] transition-colors whitespace-nowrap min-w-max">{t.nav.memories}</a>
                                    <a href="#video" className="hover:text-[rgb(196,13,116)] transition-colors min-w-max">{t.nav.video}</a>
                                    <a href="#reasons" className="hover:text-[rgb(196,13,116)] transition-colors min-w-max">{t.nav.why}</a>
                                </div>
                            </nav>
                            <style>{`nav div::-webkit-scrollbar { display: none; }`}</style>

                            {/* Popups */}
                            {showSecret && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in backdrop-blur-sm" onClick={() => setShowSecret(false)}>
                                    <div className="bg-white px-16 py-12 rounded-[2rem] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#830b9d] to-[#830b9d] shadow-2xl transform scale-105 transition-transform text-center mx-4">
                                        بحبك
                                    </div>
                                </div>
                            )}

                            {/* Image Lightbox */}
                            {selectedImage && (
                                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in p-4" onClick={() => setSelectedImage(null)}>
                                    <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <img src={selectedImage} alt="Full View" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-2 border-white/20 animate-scale-up" onClick={(e) => e.stopPropagation()} />
                                </div>
                            )}

                            {/* Popups & Interactive Flow */}

                            {showEnvelope && <EnvelopeComponent onEnter={() => setShowEnvelope(false)} lang={lang} />}

                            {showFinalScene && <FinalSceneComponent onClose={() => setShowFinalScene(false)} lang={lang} />}

                            {/* Content */}
                            <div className="relative">
                                {/* Hero Section */}
                                <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#830b9d]/20 to-transparent -z-10"></div>

                                    <div className="relative inline-flex items-center justify-center p-16 md:p-28 mb-8 mt-4 group cursor-default mx-auto w-64 h-64 md:w-96 md:h-96">
                                        {/* Animated glow behind */}
                                        <div className="absolute inset-0 bg-[#830a9d]/30 blur-[50px] rounded-full scale-125 group-hover:bg-[rgb(196,13,116)]/40 transition-colors duration-1000"></div>

                                        {/* Golden Heart Frame */}
                                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] filter transition-transform duration-700 group-hover:scale-105 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M50 88.932l-5.6-5.1C23.6 64.932 10 52.632 10 38.432c0-11.6 8.8-20.4 20.4-20.4 6.7 0 13.1 3.2 17.2 8.1 4.1-4.9 10.5-8.1 17.2-8.1 11.6 0 20.4 8.8 20.4 20.4 0 14.2-13.6 26.5-34.4 45.4l-5.6 5.1z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        {/* Solid Heart Background slightly transparent */}
                                        <svg viewBox="0 0 100 100" className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] text-black/40 backdrop-blur-md drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" fill="currentColor">
                                            <path d="M50 88.932l-5.6-5.1C23.6 64.932 10 52.632 10 38.432c0-11.6 8.8-20.4 20.4-20.4 6.7 0 13.1 3.2 17.2 8.1 4.1-4.9 10.5-8.1 17.2-8.1 11.6 0 20.4 8.8 20.4 20.4 0 14.2-13.6 26.5-34.4 45.4l-5.6 5.1z" />
                                        </svg>

                                        {/* The Text */}
                                        <h1 className="relative z-10 text-6xl md:text-8xl font-script text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.8)] tracking-wide leading-none select-none mt-[-15px]" style={{ textShadow: "0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(196,13,116,0.6)" }}>
                                            أحمد فرحه
                                        </h1>

                                        {/* Decorative mini hearts */}
                                        <Heart className="absolute top-12 right-12 md:top-16 md:right-16 w-6 h-6 text-[#D4AF37] animate-bounce drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" fill="#D4AF37" />
                                        <Heart className="absolute bottom-16 left-12 md:bottom-20 md:left-16 w-4 h-4 text-[rgb(196,13,116)] animate-pulse drop-shadow-[0_0_10px_rgba(196,13,116,0.8)]" fill="rgb(196,13,116)" />
                                    </div>
                                    <p className="text-base xs:text-lg md:text-3xl text-gray-300 mb-8 md:mb-10 font-light px-6">{t.hero.subtitle}</p>

                                    <button onClick={() => { setShowSecret(true); setTimeout(() => setShowSecret(false), 2000); }}
                                        className="group relative overflow-hidden bg-white text-[rgb(196,13,116)] px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg border border-pink-100">
                                        <span className="relative z-10 transition-colors group-hover:text-white">{t.hero.btn}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(196,13,116)] to-[rgb(196,13,116)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                    </button>

                                    <div className="absolute bottom-10 animate-bounce text-[rgb(196,13,116)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
                                    </div>
                                </section>
                            </div>




                            <LoveCakeComponent lang={lang} />

                            {/* Love Meter Section */}
                            <section className="py-12 md:py-20 px-4 text-center relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:10 text-[rgb(196,13,116)]">{t.meter.title}</h2>
                                <div className="max-w-2xl mx-auto bg-white/15 backdrop-blur-lg p-6 md:p-12 rounded-3xl shadow-[0_0_30px_rgba(196,13,116,0.2)] border border-white/10 cursor-pointer group transition-all hover:bg-white/20"
                                    onClick={(e) => {
                                        if (e.currentTarget.classList.contains('calculating')) return;
                                        e.currentTarget.classList.add('calculating');

                                        const progressBar = e.currentTarget.querySelector('.progress-bar');
                                        const heart = e.currentTarget.querySelector('.meter-heart');
                                        const text = e.currentTarget.querySelector('.status-text');

                                        text.innerText = t.meter.calc;
                                        progressBar.style.width = "0%";
                                        progressBar.style.transition = "width 3s ease-in-out";

                                        // Animate Progress
                                        requestAnimationFrame(() => {
                                            progressBar.style.width = "100%";
                                        });

                                        // Heart Beat Faster
                                        heart.style.animationDuration = "0.5s";

                                        setTimeout(() => {
                                            text.innerHTML = t.meter.result;
                                            text.classList.remove("text-pink-300", "to-pink-300", "text-white/50");
                                            text.classList.add("text-3xl", "font-bold", "text-white", "animate-fade-in");

                                            // Add Flash Effect
                                            const flash = document.createElement('div');
                                            flash.className = 'fixed inset-0 flash-effect z-[200] pointer-events-none';
                                            document.body.appendChild(flash);
                                            setTimeout(() => flash.remove(), 1000);
                                            heart.style.transform = "scale(1.5)";
                                            heart.style.animationDuration = "1s";

                                            // Confetti Effect (Simple manual particles)
                                            for (let k = 0; k < 20; k++) {
                                                const p = document.createElement('div');
                                                p.innerHTML = '🎉';
                                                p.style.position = 'absolute';
                                                p.style.left = '50%';
                                                p.style.top = '50%';
                                                p.style.fontSize = '20px';
                                                p.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`;
                                                p.style.transition = 'all 1s ease-out';
                                                p.style.opacity = '1';
                                                e.currentTarget.appendChild(p);
                                                setTimeout(() => { p.style.opacity = '0'; }, 500);
                                                setTimeout(() => p.remove(), 1000);
                                            }

                                            e.currentTarget.classList.remove('calculating');
                                        }, 3000);
                                    }}>
                                    <div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-100 bg-[#830b9d]/30">
                                                    {t.meter.label}
                                                </span>
                                            </div>
                                            <div className="text-right flex items-center gap-1">
                                                <InfinityIcon className="w-5 h-5 text-pink-100" />
                                                <span className="text-sm font-bold text-pink-100">%</span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-10 mb-4 text-xs flex rounded-full bg-white/20 shadow-inner border border-white/10">
                                            <div style={{ width: "10%" }} className="progress-bar shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[rgb(196,13,116)] via-purple-500 to-[rgb(196,13,116)] transition-all duration-300"></div>
                                        </div>
                                        <div className="flex justify-center mt-4">
                                            <Heart className="meter-heart w-32 h-32 text-[#830b9d] animate-pulse drop-shadow-[0_0_15px_rgba(185,7,114,0.5)] transition-transform duration-200" />
                                        </div>
                                        <p className="status-text mt-4 text-xl font-bold text-white">
                                            {t.meter.hint}
                                        </p>
                                    </div>
                                </div>
                            </section>


                            <ConstellationGame lang={lang} />

                            {/* Timeline Section */}
                            <section id="timeline" className="py-32 px-4 relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[rgb(196,13,116)] font-premium">{t.timeline.title}</h2>
                                <div className="max-w-6xl mx-auto relative">
                                    <div className="absolute left-4 md:left-1/2 bg-gradient-to-b from-[rgb(196,13,116)] to-[#D4AF37] w-1 h-full md:ml-0 shadow-[0_0_10px_rgba(196,13,116,0.5)]"></div>
                                    {t.timeline.items.map((item, i) => (
                                        <div key={i} className={`flex items-center justify-between mb-16 w-full relative ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                                            <div className="hidden md:block w-5/12"></div>
                                            <div className="z-10 bg-gray-900 border-2 md:border-4 border-[rgb(196,13,116)] w-4 h-4 md:w-8 md:h-8 rounded-full shadow-[0_0_10px_rgba(196,13,116,0.8)] relative ml-[-6px] md:ml-0">
                                                <div className="absolute top-1/2 left-1/2 w-full h-0.5 md:h-1 bg-[rgb(196,13,116)]/50 transform -translate-y-1/2 -translate-x-1/2 z-[-1] animate-pulse"></div>
                                            </div>
                                            <div className="w-11/12 md:w-5/12 pl-6 md:pl-0 text-right">
                                                <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-xl border border-white/5 hover:bg-white/20 transition-all duration-300 group transform hover:scale-105">
                                                    <div className="relative overflow-hidden rounded-xl mb-4 aspect-square md:aspect-[4/5] w-full border border-pink-500/30 cursor-pointer group-hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-shadow duration-300 bg-black/20" onClick={() => setSelectedImage(`./${item.pic}`)}>
                                                        <img src={`./${item.pic}`} alt="Memory" className="parallax-img w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105 will-change-transform" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-rose-100 group-hover:text-[rgb(196,13,116)] transition-colors mb-2 flex items-center gap-2">
                                                        <span>{item.text.replace(/👩‍❤️‍👨/, '').trim()}</span>
                                                        {item.text.includes('👩‍❤️‍👨') && <span className="text-2xl inline-block transform group-hover:scale-125 transition-transform duration-300">👩‍❤️‍👨</span>}
                                                    </h3>
                                                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="video" className="py-24 px-4 text-center relative z-10">
                                <div className="max-w-4xl mx-auto">

                                    {/* Message 2: Video */}
                                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-pink-500/30 transform hover:scale-[1.02] transition-all duration-500 relative group overflow-hidden max-w-lg mx-auto">
                                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <h3 className="text-2xl font-bold text-pink-200 mb-6 relative z-10">{t.video.title}</h3>
                                        <div className="relative z-10 rounded-xl overflow-hidden shadow-lg">
                                            <video className="w-full" controls id="newVideo" playsInline webkit-playsinline
                                                onPlay={() => {
                                                    if (audioRef.current) {
                                                        audioRef.current.pause();
                                                        setIsPlaying(false);
                                                    }
                                                    // Pause audio message if playing (though unlikely to overlap with native controls)
                                                }}
                                                onPause={() => {
                                                    // Resume music only if audio message is paused (it should be)
                                                    if (audioRef.current && isLogged) {
                                                        audioRef.current.play();
                                                        setIsPlaying(true);
                                                    }
                                                }}
                                                onEnded={() => {
                                                    if (audioRef.current && isLogged) {
                                                        audioRef.current.play();
                                                        setIsPlaying(true);
                                                    }
                                                }}
                                            >
                                                <source src="./Whpp Video 2026-02-11 at 9.35.45 PM.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <p className="mt-6 text-gray-300 italic relative z-10">"{t.video.sub}"</p>
                                    </div>

                                </div>
                            </section>


                            {/* Reasons Why Section */}
                            <section id="reasons" className="py-16 md:py-24 px-4 relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:16 text-[rgb(196,13,116)] font-premium">{t.reasons.title}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                                    {[
                                        t.reasons.r1, t.reasons.r2, t.reasons.r3,
                                        t.reasons.r4, t.reasons.r5, t.reasons.r6
                                    ].map((card, i) => (
                                        <div key={i} className="bg-white/5 p-6 md:p-8 rounded-3xl shadow-xl border border-white/5 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm">
                                            <div className="w-12 h-12 bg-pink-900/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors border border-pink-500/30">
                                                <Heart className="w-6 h-6 text-pink-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-pink-100 mb-3">{card.t}</h3>
                                            <p className="text-gray-400 leading-relaxed">{card.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>





                            <footer className="py-16 text-center bg-white/5 backdrop-blur-md border-t border-white/10">
                                <p className="text-2xl font-script text-[rgb(196,13,116)] mb-8">أنت كل حياتي 💖</p>
                                <button onClick={() => setShowFinalScene(true)}
                                    className="bg-[rgb(196,13,116)] text-white px-8 py-3 rounded-full text-sm hover:bg-black transition-all shadow-lg tracking-widest uppercase font-bold">
                                    {t.footer.final}
                                </button>
                            </footer>

                            <LoveNote lang={lang} />
                        </div>
                    )
                    }
                    {isLogged && <DecorativeFrame />}
                </div >
            );
        }

        function TimeBox({ label, value }) {
            return (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 flex flex-col items-center justify-center aspect-square transform hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl font-bold text-[#830b9d] mb-2">{value || 0}</span>
                    <span className="text-gray-400 text-sm font-medium">{label}</span>
                </div>
            );
        }

        function FinalSceneComponent({ onClose, lang }) {
            const [step, setStep] = useState(0);
            const t = i18n[lang].finalScene;

            useEffect(() => {
                const timeouts = [];
                const schedule = (ms, s) => timeouts.push(setTimeout(() => setStep(s), ms));

                // Timeline matches the user's poetic flow
                schedule(1000, 1);  // Title
                schedule(4000, 2);  // Meaning 1
                schedule(7000, 3);  // Meaning 2
                schedule(10000, 4); // Meaning 3
                schedule(13000, 5); // Stability
                schedule(16000, 6); // Hard times
                schedule(19000, 7); // Heart choice
                schedule(22000, 8); // Always choice

                // Grand Finale
                schedule(26000, 10); // Clear layout
                schedule(27000, 11); // Names
                schedule(30000, 12); // Infinity
                schedule(33000, 13); // English quote
                schedule(38000, 14); // Whisper

                return () => timeouts.forEach(clearTimeout);
            }, []);

            return (
                <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center text-center p-6 overflow-hidden transition-colors duration-[2s]">
                    {/* Side Controls */}
                    <button onClick={onClose} className="fixed top-6 right-6 z-[110] bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all group" title="خروج">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    {/* Background Stars */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className="absolute bg-white rounded-full animate-pulse"
                                style={{
                                    width: Math.random() * 3 + 'px',
                                    height: Math.random() * 3 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                    animationDuration: Math.random() * 3 + 2 + 's'
                                }}></div>
                        ))}
                    </div>

                    <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center min-h-[60vh]">
                        {step === 1 && (
                            <h1 className="text-3xl xs:text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(131,11,157,0.8)] animate-slide-up leading-tight px-4" dangerouslySetInnerHTML={{ __html: t.scene1 }}></h1>
                        )}

                        {step >= 2 && step < 10 && (
                            <div className="mt-12 space-y-8">
                                {step >= 2 && <p className="text-2xl text-gray-300 animate-fade-in">{t.scene2} <span className="text-pink-400 font-bold block mt-2 text-3xl">{t.scene2b}</span></p>}
                                {step >= 3 && <p className="text-2xl text-gray-300 animate-fade-in mt-8"><span dangerouslySetInnerHTML={{ __html: t.scene3 }}></span> <span className="text-rose-400 font-bold block mt-2 text-3xl">{t.scene3b}</span></p>}
                                {step >= 4 && <p className="text-xl text-gray-300 italic animate-fade-in mt-10 max-w-2xl leading-relaxed px-4 mx-auto">{t.scene4}</p>}
                                {step >= 5 && <div className="h-px w-24 bg-gray-800 mx-auto my-8 animate-fade-in"></div>}
                                {step >= 6 && <p className="text-xl text-gray-500 italic animate-fade-in">"{t.scene6}"</p>}
                                {step >= 7 && <p className="text-4xl font-bold text-white mt-6 animate-slide-up">{t.scene7}</p>}
                                {step >= 8 && <p className="text-2xl text-pink-300 mt-4 animate-fade-in">{t.scene8}</p>}
                            </div>
                        )}

                        {step >= 11 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black animate-fade-in">
                                <h1 className="text-4xl xs:text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 animate-pulse-slow mb-8 px-4">
                                    <span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span>
                                </h1>

                                {step >= 12 && (
                                    <div className="flex items-center gap-4 text-3xl text-gray-400 animate-fade-in font-light tracking-wide">
                                        <span><span dangerouslySetInnerHTML={{ __html: t.infinity }}></span></span>
                                        <span className="text-5xl text-[rgb(196,13,116)] animate-spin-slow">∞</span>
                                    </div>
                                )}

                                {step >= 13 && (
                                    <p className="mt-12 text-2xl font-script text-white/60 animate-slide-up"><span className='font-script text-[rgb(196,13,116)] text-shimmer px-1 font-bold'>أحمد فرحه</span> و بس 💖</p>
                                )}
                            </div>
                        )}

                        {step >= 14 && (
                            <div className="fixed bottom-6 right-6 z-[110] animate-fade-in flex flex-col items-end gap-2">
                                <p className="text-xs text-gray-500 mb-2 mr-2">{t.thanks}</p>
                                <button onClick={onClose} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2 group">
                                    <span>{t.back}</span>
                                    <span className="group-hover:-translate-x-1 transition-transform">🏠</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<LoveWebsite />);
    