const lyrics = [
    "Oh, you got power",
    "Superpowers",
    "Do you even know how to wield them?",
    "All God's children",
    "Are special",
    "But not like you",
    "No, not like you",
    "You're just like a flower (flower)",
    "You're ever-giving",
    "That's a given",
    "All God's children (all God's children)",
    "Are special (whoa, whoa)",
    "But not like you",
    "No, not like you",
    "(Lift it, lift it, lift it) lift your head",
    "To the sky (to the sky, oh, sky, sky)",
    "(Lift it, lift it, lift it, lift it)",
    "Mmm, it's crazy to say this",
    "But you're the greatest (you are the greatest)",
    "Can't explain it (oh-oh-oh)",
    "I know that you know the truth",
    "They can't deny you",
    "Yeah, they can't deny you, it's true",
    "Yeah, remember Vegas?",
    "You come a long way, kid",
    "And let me just say this (ah-ah)",
    "Oh, yeah",
    "You're the main character now (ah-ah)",
    "You're the main character now (ah-ah)",
    "(Lift it, lift it, lift it) lift your head",
    "To the sky (oh, to the sky)",
    "(You're the main character now)",
    "(You're the main character now)",
    "Oh, yeah",
    "(Ah-ah)",
    "(Ah-ah)"
];

const timings = [
    1,3,6,9,11,13,15,18,21,23,25,27,29,31,34,37,40,43,46,49,
    52,55,58,61,64,67,70,73,76,79,82,85,88,91,94,97,100
];

const lyricsContainer = document.getElementById('lyrics');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');

// Renderiza letras
lyrics.forEach(line => {
    const span = document.createElement('span');
    span.textContent = line;
    lyricsContainer.appendChild(span);
});

const spans = document.querySelectorAll('.lyrics span');

// Função de digitação
function typeWriter(span, text, startTime, endTime) {
    span.textContent = "";
    let i = 0;

    // calcula duração desse trecho
    const duration = (endTime - startTime) * 1000; 
    const delay = duration / text.length; // tempo por caractere

    const interval = setInterval(() => {
        span.textContent += text[i];
        i++;
        if (i === text.length) clearInterval(interval);
    }, delay);
}


// Sincroniza letra com música
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;

    spans.forEach((span, i) => {
        if(currentTime >= timings[i] && (i === timings.length - 1 || currentTime < timings[i + 1])) {
            if(!span.classList.contains('active')){
                span.classList.add('active');
                const endTime = (i < timings.length - 1) ? timings[i + 1] : audio.duration;
                typeWriter(span, lyrics[i], timings[i], endTime);
            }

            const topOffset = span.offsetTop - lyricsContainer.offsetHeight / 2 + span.offsetHeight / 2;
            lyricsContainer.scrollTo({ top: topOffset, behavior: 'smooth' });
        } else {
            span.classList.remove('active');
        }
    });
});

// Botão Play/Pause
playBtn.addEventListener('click', () => {
    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸ Pause";
    } else {
        audio.pause();
        playBtn.textContent = "▶ Play";
    }
});
 