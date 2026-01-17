function updateClock() {
    const now = new Date();

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

setInterval(updateClock, 1000);
updateClock();