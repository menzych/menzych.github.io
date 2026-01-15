const releasedProjects = [
    {
    }
];

const devProjects = [
];

function createSnowflakes() {
    const snowflakeCount = 50;
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '•';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.fontSize = (Math.random() * 8 + 4) + 'px';
        const animationDuration = Math.random() * 10 + 5;
        const animationDelay = Math.random() * 10;
        snowflake.style.animationDuration = animationDuration + 's';
        snowflake.style.animationDelay = animationDelay + 's';
        document.body.appendChild(snowflake);
    }
}

const STORAGE_PREFIX = 'ach_v2_';

const achievementsData = {
    1: { title: "Оп оп, тгшка!", desc: "АААА и тут Альтер! Я Мензич.", image: "assets/img/achievements/tg.png" },
    2: { title: "Оценил красоту стима?", desc: "Как тут красиво!.", image: "assets/img/achievements/steam.png" }
};

function loadAchievements() {
    for (let i = 1; i <= 3; i++) {
        if (localStorage.getItem(`${STORAGE_PREFIX}${i}`) === 'true') unlockVisuals(i);
    }
}

function unlockVisuals(id) {
    const item = document.getElementById(`ach-${id}`);
    const title = document.getElementById(`title-${id}`);
    const desc = document.getElementById(`desc-${id}`);
    const img = document.getElementById(`img-${id}`);

    if (item && title && img) {
        item.classList.remove('locked');
        item.classList.add('unlocked');
        title.textContent = achievementsData[id].title;
        desc.textContent = achievementsData[id].desc;
        img.src = achievementsData[id].image;
    }
}

function showNotification(id) {
    const notif = document.getElementById('notification');
    const notifText = document.getElementById('notif-text');
    const notifImg = document.getElementById('notif-img');
    if (!notif) return;
    notifText.textContent = achievementsData[id].title;
    notifImg.src = achievementsData[id].image;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 4000);
}

function triggerAchievement(id) {
    if (localStorage.getItem(`${STORAGE_PREFIX}${id}`) !== 'true') {
        localStorage.setItem(`${STORAGE_PREFIX}${id}`, 'true');
        unlockVisuals(id);
        showNotification(id);
    }
}

function initProjects() {
    const validReleased = releasedProjects.filter(item => item && item.title);
    const validDev = devProjects.filter(item => item && item.title);

    renderGrid('released-projects-grid', validReleased, false);
    renderGrid('dev-projects-grid', validDev, true);

    const installerSection = document.querySelector('.installer-section');
    const totalProjects = validReleased.length + validDev.length;

    if (totalProjects === 0) {
        if (installerSection) installerSection.style.display = 'none';
    } else {
        if (installerSection) installerSection.style.display = 'flex';
    }
}

function renderGrid(elementId, data, isDev) {
    const grid = document.getElementById(elementId);
    if(!grid) return;
    grid.innerHTML = '';

    if (!data || data.length === 0) {
        grid.innerHTML = '<p style="text-align:left; width:100%; color: #888; padding-left: 10px; font-style: italic;">Пока тут ничего нет...</p>';
        return;
    }

    data.forEach(proj => {
        if (!proj || !proj.title) return;

        const card = document.createElement('div');
        card.className = isDev ? 'project-card dev-card' : 'project-card';
        const imgDisplay = proj.img ? proj.img : 'assets/img/achievements/locked.png';

        if (!isDev) {
            card.innerHTML = `
                <div class="project-img-wrapper"><img src="${imgDisplay}" alt="${proj.title}"></div>
                <div class="project-title">${proj.title}</div>
                <div class="project-desc">${proj.desc}</div>
                <div class="project-status">✔ Доступно в MInstaller</div>
                <a href="${proj.github}" target="_blank" class="project-github-link">Исходный код (GitHub)</a>
            `;
        } else {
            card.innerHTML = `
                <div class="project-img-wrapper"><img src="${imgDisplay}" alt="${proj.title}" style="opacity: 0.7;"></div>
                <div class="project-title">${proj.title}</div>
                <div class="project-desc">${proj.desc}</div>
                <div class="project-status">🔨 ${proj.status}</div>
                <a href="#" class="project-github-link disabled" onclick="return false;">Скоро...</a>
            `;
        }
        grid.appendChild(card);
    });
}

function checkProjectWarning() {
    const warningOverlay = document.getElementById('projects-warning');

    const validReleased = releasedProjects.filter(item => item && item.title);
    const validDev = devProjects.filter(item => item && item.title);

    if (validReleased.length === 0 && validDev.length === 0) {
        warningOverlay.style.display = 'none';
        return;
    }

    const hasAgreed = localStorage.getItem('minstaller_warning_accepted') === 'true';

    if (!hasAgreed) {
        warningOverlay.style.display = 'flex';
    } else {
        warningOverlay.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('main-container');
    const aboutContainer = document.getElementById('about-container');
    const achContainer = document.getElementById('achievements-page');
    const projContainer = document.getElementById('projects-page');

    const avatar = document.getElementById('profile-avatar');
    const patHand = document.getElementById('pat-hand');

    const patSounds = [
        new Audio('assets/sounds/patpat/pat.ogg'),
        new Audio('assets/sounds/patpat/pat1.ogg'),
        new Audio('assets/sounds/patpat/pat2.ogg')
    ];

    if (avatar && patHand) {
        avatar.addEventListener('click', () => {
            const randomSound = patSounds[Math.floor(Math.random() * patSounds.length)];
            randomSound.volume = 0.5;
            randomSound.play().catch(e => console.log('Audio error:', e));

            patHand.classList.remove('animate');
            void patHand.offsetWidth;

            patHand.classList.add('animate');

            setTimeout(() => {
                patHand.classList.remove('animate');
            }, 300);
        });
    }
    
    mainContainer.style.opacity = '0';
    mainContainer.style.transform = 'translateY(20px)';
    setTimeout(() => {
        mainContainer.style.transition = 'all 0.8s ease-out';
        mainContainer.style.opacity = '1';
        mainContainer.style.transform = 'translateY(0)';
    }, 100);

    createSnowflakes();
    loadAchievements();
    initProjects();

    const checkbox = document.getElementById('warning-agree-check');
    const confirmBtn = document.getElementById('warning-confirm-btn');

    if(checkbox && confirmBtn) {
        checkbox.addEventListener('change', (e) => {
            if(e.target.checked) {
                confirmBtn.classList.add('active');
                confirmBtn.removeAttribute('disabled');
            } else {
                confirmBtn.classList.remove('active');
                confirmBtn.setAttribute('disabled', 'true');
            }
        });

        confirmBtn.addEventListener('click', () => {
            if(!checkbox.checked) return;
            localStorage.setItem('minstaller_warning_accepted', 'true');
            document.getElementById('projects-warning').style.display = 'none';
        });
    }

    document.getElementById('trigger-tg').addEventListener('click', () => triggerAchievement(1));
    document.getElementById('trigger-steam').addEventListener('click', () => triggerAchievement(2));

    setupNavButton('about-btn', mainContainer, aboutContainer, () => typeWriterEffect(), 'back-btn-about');
    setupNavButton('achievements-btn', mainContainer, achContainer, null, 'back-btn-ach');
    setupNavButton('projects-btn', mainContainer, projContainer, () => checkProjectWarning(), 'back-btn-projects');

    function setupNavButton(btnId, fromEl, toEl, onOpenCallback, backBtnId) {
        const btn = document.getElementById(btnId);
        const backBtn = document.getElementById(backBtnId);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                switchPage(fromEl, toEl, () => {
                    if (onOpenCallback) onOpenCallback();
                    if (backBtn) {
                        setTimeout(() => {
                            backBtn.style.opacity = '1';
                            backBtn.style.transform = 'translateY(0)';
                        }, 300);
                    }
                });
            });
        }
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                backBtn.style.opacity = '0';
                backBtn.style.transform = 'translateY(20px)';
                switchPage(toEl, fromEl);
            });
        }
    }
});

function switchPage(fromEl, toEl, callback) {
    fromEl.style.animation = 'fadeOut 0.5s ease-out forwards';
    setTimeout(() => {
        fromEl.style.display = 'none';
        fromEl.style.animation = '';
        toEl.style.display = 'flex';
        toEl.style.animation = 'fadeIn 0.6s ease-out forwards';
        if (callback) callback();
    }, 500);
}

function typeWriterEffect() {
    const container = document.querySelector('.typing-container');
    const backBtn = document.getElementById('back-btn-about');
    if (backBtn) { backBtn.style.opacity = '0'; backBtn.style.transform = 'translateY(20px)'; }
    if (container.dataset.typed === 'true') {
            if (backBtn) { backBtn.style.opacity = '1'; backBtn.style.transform = 'translateY(0)'; }
        return;
    }
    const originalParagraphs = Array.from(container.querySelectorAll('p'));
    if (originalParagraphs.length === 0) return;
    const fullText = [];
    originalParagraphs.forEach((p, index) => {
        if (index > 0) fullText.push({text: '<br><br>', isTag: true});
        Array.from(p.textContent).forEach(char => { fullText.push({text: char, isTag: false}); });
    });
    container.innerHTML = '';
    const textElement = document.createElement('div');
    container.appendChild(textElement);
    let currentHTML = '';
    let charIndex = 0;
    const typeWriter = setInterval(() => {
        if (charIndex < fullText.length) {
            const charObj = fullText[charIndex];
            currentHTML += charObj.text;
            textElement.innerHTML = currentHTML + '<span class="typing-cursor"></span>';
            charIndex++;
        } else {
            clearInterval(typeWriter);
            container.dataset.typed = 'true';
            if (backBtn) { backBtn.style.opacity = '1'; backBtn.style.transform = 'translateY(0)'; }
        }
    }, 30);
}