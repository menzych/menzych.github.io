const statusConfig = {
    'Релиз': { color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-800/50', icon: 'check_circle', canDownload: true },
    'Бета': { color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-800/50', icon: 'science', canDownload: true },
    'В разработке': { color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-800/50', icon: 'construction', canDownload: false },
    'Черновик': { color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-700/50', icon: 'edit_document', canDownload: false },
    'Идея': { color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-800/50', icon: 'lightbulb', canDownload: false },
    'В планах': { color: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400 border-teal-200 dark:border-teal-800/50', icon: 'calendar_month', canDownload: false },
    'В заморозке': { color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/50', icon: 'ac_unit', canDownload: false },
    'На дальней полке': { color: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-800/50', icon: 'archive', canDownload: false }
};

const projectsData = [
    // {
    //     id: 1,
    //     icon: '',
    //     title: '',
    //     description: '',
    //     link: 'https://github.com/menzych/...',
    //     linkText: 'GitHub',
    //     status: 'Релиз',
    //     download: 'program',
    //     fullDescription: '',
    //     images: []
    // }
];

let currentFilter = 'All';
let currentSearch = '';

function renderFilters() {
    const container = document.getElementById('filterContainer');
    const statuses = ['All', ...Object.keys(statusConfig)];
    
    container.innerHTML = statuses.map(status => {
        const label = status === 'All' ? 'Все' : status;
        const isActive = status === currentFilter;
        const activeClasses = isActive 
            ? 'bg-primary-light dark:bg-primary-dark text-onPrimary-light dark:text-onPrimary-dark shadow-md1' 
            : 'bg-surface-light dark:bg-surface-dark border border-outline-light/20 dark:border-outline-dark/20 text-onSurface-light dark:text-onSurface-dark hover:bg-surfaceVariant-light dark:hover:bg-surfaceVariant-dark';
        return `<button onclick="setFilter('${status}')" class="whitespace-nowrap px-5 py-2 rounded-full font-medium transition-colors text-sm ${activeClasses}">${label}</button>`;
    }).join('');
}

function setFilter(status) {
    currentFilter = status;
    renderFilters();
    renderProjects();
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderProjects();
});

function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const statusData = statusConfig[project.status] || statusConfig['Черновик'];

    document.getElementById('modalBannerIcon').textContent = project.icon;
    document.getElementById('modalTitle').textContent = project.title;

    const statusEl = document.getElementById('modalStatus');
    statusEl.className = `inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider shadow-sm ${statusData.color}`;
    statusEl.innerHTML = `<span class="material-symbols-outlined text-[18px]">${statusData.icon}</span> ${project.status}`;

    document.getElementById('modalDescription').textContent = project.fullDescription;

    let modalLinks = '';
    
    if (project.download === 'site') {
        modalLinks += `
            <a href="${project.link}" target="_blank" class="material-btn bg-primaryContainer-light dark:bg-primaryContainer-dark text-onPrimaryContainer-light dark:text-onPrimaryContainer-dark hover:bg-primary-light hover:text-onPrimary-light dark:hover:bg-primary-dark dark:hover:text-onPrimary-dark px-6 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md1 flex items-center gap-2 font-medium">
                <span class="material-symbols-outlined text-[24px]">open_in_new</span> Открыть сайт
            </a>`;
    } else {
        modalLinks += `
            <a href="${project.link}" class="material-btn bg-surfaceVariant-light dark:bg-surfaceVariant-dark text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark hover:bg-outline-light/20 dark:hover:bg-outline-dark/20 px-6 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md1 flex items-center gap-2 font-medium">
                <span class="material-symbols-outlined text-[24px]">code</span> GitHub
            </a>`;
            
        if (statusData.canDownload) {
            modalLinks += `
                <a href="#" class="material-btn bg-primary-light dark:bg-primary-dark text-onPrimary-light dark:text-onPrimary-dark shadow-md1 hover:shadow-md2 px-6 py-4 rounded-2xl transition-all flex items-center gap-2 font-medium">
                    <span class="material-symbols-outlined text-[24px]">download</span> Скачать релиз
                </a>`;
        }
    }
    
    document.getElementById('modalActionButtons').innerHTML = modalLinks;

    const imagesContainer = document.getElementById('modalImages');
    const imagesWrapper = document.getElementById('modalImagesWrapper');

    if (project.images && project.images.length > 0) {
        imagesWrapper.style.display = 'block';
        const isSingle = project.images.length === 1;
        
        imagesContainer.innerHTML = project.images.map(img => `
            <div class="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-md2 transition-shadow duration-300 border border-outline-light/10 dark:border-outline-dark/10 bg-surfaceVariant-light/20 dark:bg-surfaceVariant-dark/20 aspect-video flex-shrink-0 ${isSingle ? 'w-full' : 'w-[85%] md:w-[60%] lg:w-[48%]'} snap-start flex items-center justify-center">
                <div class="absolute flex flex-col items-center justify-center text-onSurfaceVariant-light/40 dark:text-onSurfaceVariant-dark/40 z-0">
                    <span class="material-symbols-outlined text-4xl mb-2">broken_image</span>
                    <span class="text-sm font-medium">Ошибка загрузки</span>
                </div>
                <img src="${img}" alt="" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 relative z-10 bg-surface-light dark:bg-surface-dark" onerror="this.style.opacity='0'">
                <div class="absolute inset-0 bg-primary-light/0 group-hover:bg-primary-light/10 dark:group-hover:bg-primary-dark/10 transition-colors duration-300 pointer-events-none z-20"></div>
            </div>
        `).join('');
    } else {
        imagesWrapper.style.display = 'none';
        imagesContainer.innerHTML = '';
    }

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');
    
    modal.classList.remove('pointer-events-none', 'opacity-0');
    modalContent.classList.remove('scale-95', 'translate-y-8');
    document.body.style.overflow = 'hidden';

    initRipples();
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');
    
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.add('scale-95', 'translate-y-8');
    document.body.style.overflow = '';
}

document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    const filteredData = projectsData.filter(p => {
        const matchesStatus = currentFilter === 'All' || p.status === currentFilter;
        const matchesSearch = p.title.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch);
        return matchesStatus && matchesSearch;
    });

    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-16 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark">
                <span class="material-symbols-outlined text-5xl mb-3 opacity-50">search_off</span>
                <p class="text-lg">По вашему запросу ничего не найдено</p>
            </div>`;
        return;
    }

    filteredData.forEach(project => {
        const statusData = statusConfig[project.status] || statusConfig['Черновик'];
        const card = document.createElement('div');
        card.className = 'bg-surface-light dark:bg-surface-dark rounded-[2rem] overflow-hidden shadow-md1 hover:shadow-md3 transition-all duration-300 border border-outline-light/10 dark:border-outline-dark/10 flex flex-col group hover:-translate-y-1';

        let actionBtn = '';
        const btnClasses = "w-[42px] h-[42px] shrink-0 rounded-full flex items-center justify-center transition-colors";
        
        if (statusData.canDownload) {
            if (project.download === 'site') {
                actionBtn = `
                    <a href="${project.link}" target="_blank" class="material-btn border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 ${btnClasses}" title="Открыть сайт">
                        <span class="material-symbols-outlined text-[20px]">open_in_new</span>
                    </a>`;
            } else {
                actionBtn = `
                    <a href="#" class="material-btn border border-outline-light/20 dark:border-outline-dark/20 text-onSurface-light dark:text-onSurface-dark hover:bg-surfaceVariant-light dark:hover:bg-surfaceVariant-dark ${btnClasses}" title="Скачать релиз">
                        <span class="material-symbols-outlined text-[20px]">download</span>
                    </a>`;
            }
        } else {
            actionBtn = `
                <button disabled class="bg-gray-100 text-gray-400 dark:bg-gray-800/60 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-800 ${btnClasses}" title="Недоступно">
                    <span class="material-symbols-outlined text-[20px]">lock</span>
                </button>`;
        }

        card.innerHTML = `
            <div class="h-48 bg-primaryContainer-light/30 dark:bg-primaryContainer-dark/30 flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-surface-light dark:to-surface-dark opacity-50"></div>
                <span class="material-symbols-outlined text-7xl text-primary-light dark:text-primary-dark z-10 group-hover:scale-110 transition-transform duration-300">${project.icon}</span>
            </div>
            <div class="p-8 flex-grow flex flex-col relative bg-surface-light dark:bg-surface-dark">
                <div class="mb-4 inline-flex items-center w-max gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${statusData.color}">
                    <span class="material-symbols-outlined text-[16px]">${statusData.icon}</span> ${project.status}
                </div>
                <h3 class="text-2xl font-bold mb-3 text-onSurface-light dark:text-onSurface-dark">${project.title}</h3>
                <p class="text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark mb-6 flex-grow leading-relaxed">${project.description}</p>
                <div class="flex flex-col gap-3 mt-auto pt-4 border-t border-outline-light/10 dark:border-outline-dark/10">
                    <div class="flex gap-2 items-center w-full">
                        <a href="${project.link}" class="material-btn flex-grow justify-center bg-primaryContainer-light dark:bg-primaryContainer-dark text-onPrimaryContainer-light dark:text-onPrimaryContainer-dark font-medium hover:bg-primary-light hover:text-onPrimary-light dark:hover:bg-primary-dark dark:hover:text-onPrimary-dark px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5 text-sm">${project.linkText}</a>
                        ${actionBtn}
                    </div>
                    <button onclick="openModal(${project.id})" class="material-btn w-full bg-surfaceVariant-light/30 dark:bg-surfaceVariant-dark/30 hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 text-onSurfaceVariant-light dark:text-onSurfaceVariant-dark hover:text-primary-light dark:hover:text-primary-dark font-medium px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm group border border-transparent hover:border-primary-light/20 dark:hover:border-primary-dark/20">
                        Подробнее <span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                    </button>
                </div>
            </div>`;
        
        container.appendChild(card);
    });
    
    initRipples();
}

function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    
    document.getElementById(viewId + '-view').classList.add('active');
    document.querySelector(`.nav-link[data-view="${viewId}"]`).classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
let isDark = false;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark = true;
    html.classList.add('dark');
    themeIcon.textContent = 'light_mode';
}

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
        themeIcon.textContent = 'light_mode';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
        themeIcon.textContent = 'dark_mode';
    }
});

function initRipples() {
    document.querySelectorAll('.material-btn:not(.ripple-init)').forEach(btn => {
        btn.classList.add('ripple-init');
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const circle = document.createElement('span');
            circle.classList.add('ripple');
            
            if (this.classList.contains('bg-surfaceVariant-light') || this.classList.contains('bg-primaryContainer-light') || this.classList.contains('border')) {
                circle.classList.add('ripple-dark');
            }
            
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            
            this.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderProjects();
});