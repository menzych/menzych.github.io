const targetDate = new Date("2026-02-17T12:00:00");

function updateTimers() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<div style="font-size: 1.2rem; color: var(--accent-color); letter-spacing: 2px; text-transform: uppercase;">Мы вернулись! Обновите страницу.</div>';
        
        document.getElementById('days').textContent = "00";
        document.getElementById('hours').textContent = "00";
        document.getElementById('minutes').textContent = "00";
        document.getElementById('seconds').textContent = "00";
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    const timeString = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const dateString = now.toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const clockEl = document.getElementById('clock-realtime');
    const dateEl = document.getElementById('date');
    
    if (clockEl) clockEl.textContent = timeString;
    if (dateEl) dateEl.textContent = dateString;
}

setInterval(updateTimers, 1000);
updateTimers();