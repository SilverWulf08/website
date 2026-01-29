export function setupBrandIcon() {
  const icon = document.querySelector(".brand-icon");
  const music = document.getElementById("bg-music");
  if (!icon || !music) return;

  // Container for music note particles
  let noteContainer = document.getElementById("music-note-container");
  if (!noteContainer) {
    noteContainer = document.createElement("div");
    noteContainer.id = "music-note-container";
    noteContainer.style.position = "absolute";
    noteContainer.style.left = 0;
    noteContainer.style.top = 0;
    noteContainer.style.width = "100%";
    noteContainer.style.height = "100%";
    noteContainer.style.pointerEvents = "none";
    icon.parentElement.style.position = "relative";
    icon.parentElement.appendChild(noteContainer);
  }

  let spinning = false;
  let noteInterval = null;

  function startSpinning() {
    if (spinning) return;
    spinning = true;
    icon.style.animation = "brand-spin-lp 3.5s linear infinite";
    emitNotes();
    noteInterval = setInterval(emitNotes, 600);
  }

  function stopSpinning() {
    spinning = false;
    if (noteInterval) clearInterval(noteInterval);
    // Calculate current rotation so we can spin to the next 0deg
    const computed = window.getComputedStyle(icon);
    const matrix = computed.transform;
    let angle = 0;
    if (matrix && matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      const a = parseFloat(values[0]);
      const b = parseFloat(values[1]);
      angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      if (angle < 0) angle += 360;
    }
    // Find the next full 360deg (top aligned)
    const target = angle === 0 ? 0 : 360;
    // Create a unique keyframes for this stop
    const animName = `brand-spin-lp-stop-dynamic`;
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `@keyframes ${animName} { from { transform: rotate(${angle}deg) scale(1.15); } to { transform: rotate(${target}deg) scale(1.15); } }`;
    document.head.appendChild(styleSheet);
    icon.style.animation = `${animName} 0.6s cubic-bezier(0.42,0,0.58,1) 1`;
    // Clean up after animation
    icon.addEventListener('animationend', function handler(e) {
      if (e.animationName === animName) {
        icon.style.animation = 'none';
        icon.style.transform = 'rotate(0deg) scale(1.15)';
        document.head.removeChild(styleSheet);
        icon.removeEventListener('animationend', handler);
      }
    });
  }

  function emitNotes() {
    if (!spinning) return;
    const notes = ["\u266B", "\u266A", "\u266C", "\u2669"];
    const note = document.createElement("span");
    note.className = "music-note-particle";
    note.innerText = notes[Math.floor(Math.random() * notes.length)];
    // Randomize direction and size
    const angle = (Math.random() - 0.5) * 60; // -30 to +30 deg
    const dist = 30 + Math.random() * 20;
    note.style.left = `calc(50% + ${Math.sin(angle * Math.PI / 180) * dist}px)`;
    note.style.top = `calc(50% - 10px)`;
    note.style.fontSize = `${1 + Math.random() * 0.7}em`;
    note.style.opacity = 1;
    noteContainer.appendChild(note);
    setTimeout(() => {
      note.remove();
    }, 1600);
  }

  // Listen for music play/pause
  function syncWithMusic() {
    if (!music.paused) {
      startSpinning();
    } else {
      stopSpinning();
    }
  }
  music.addEventListener("play", syncWithMusic);
  music.addEventListener("pause", syncWithMusic);

  // Initial state
  if (!music.paused) startSpinning();

  // Toggle music and animation on icon click
  icon.addEventListener("click", () => {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
    syncWithMusic();
  });
}
