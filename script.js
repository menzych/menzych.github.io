let targetDate = new Date();
targetDate.setMonth(targetDate.getMonth() + 1);

function updateTimers() {
    const now = new Date();

    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<div style="font-size: 1.2rem; color: var(--accent-color); letter-spacing: 2px; text-transform: uppercase;">Мы вернулись. Обновите страницу.</div>';
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

    document.getElementById('clock-realtime').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

setInterval(updateTimers, 1000);
updateTimers();