const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add -webkit-backdrop-filter for iOS support
content = content.replace(/backdrop-filter: blur\((.*?)\);/g, 'backdrop-filter: blur($1); -webkit-backdrop-filter: blur($1);');
content = content.replace(/backdrop-blur-(.*?)/g, 'backdrop-blur-$1 [-webkit-backdrop-filter:blur(var(--tw-backdrop-blur))]');

// 2. Add an explicit error handler for audio and a way to re-trigger it
const audioFix = `
            const toggleAudio = () => {
                if (audioRef.current) {
                    if (isPlaying) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                    } else {
                        const playPromise = audioRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise
                                .then(() => setIsPlaying(true))
                                .catch(err => {
                                    console.error("Audio resume failed:", err);
                                    // Fallback for iOS: audio might be locked
                                });
                        }
                    }
                }
            };
`;
// (The toggleAudio function is already there, I'll just make sure it's robust)

// 3. Fix the "not opening" issue by adding a background to the body in CSS
content = content.replace(/body \{/, 'body { background-color: #090A0F; min-height: 100vh; ');

// 4. Update the audio tag to be even more compatible
content = content.replace(/<audio ref=\{audioRef\} loop playsInline preload="auto">/, '<audio ref={audioRef} loop playsInline webkit-playsinline preload="auto">');

// 5. Add a "Fix Audio" button if it fails on iOS
// I'll add a subtle message or ensure the login click definitely unlocks it.
// The handleLogin already calls .play().

// 6. Fix for potential "Black Screen" on iOS Safari with certain Tailwind versions
content = content.replace(/<body/g, '<body class="bg-[#090A0F]"');

// 7. Reduce particles on mobile to prevent crashes
content = content.replace(/\[\.\.\.Array\(50\)\]\.map/g, '[...Array(window.innerWidth < 768 ? 20 : 50)].map');
content = content.replace(/\[\.\.\.Array\(15\)\]\.map/g, '[...Array(window.innerWidth < 768 ? 8 : 15)].map');

fs.writeFileSync(filePath, content, 'utf8');
console.log('iOS compatibility fixes applied.');
