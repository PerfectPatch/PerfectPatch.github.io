const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
const mailLink = document.getElementById('mail-link');
const user = 'tirrtotorr';
const domain = 'proton.me';
mailLink.href = `mailto:${user}@${domain}`;
mailLink.textContent = `${user}@${domain}`;

if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
    toggle.textContent = 'dark mode';
}

toggle.addEventListener('click', (e) => {
    root.style.setProperty('--x', `${e.clientX}px`);
    root.style.setProperty('--y', `${e.clientY}px`);

    const isLight = root.getAttribute('data-theme') === 'light';

    const applyTheme = () => {
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            toggle.textContent = 'light mode';
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            toggle.textContent = 'dark mode';
        }
    };

    if (!document.startViewTransition) {
        applyTheme();
        return;
    }

    document.startViewTransition(applyTheme);
});