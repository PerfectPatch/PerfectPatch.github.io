const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');

if (saved === 'light') {
    root.setAttribute('data-theme', 'light');
    toggle.textContent = 'dark mode';
}

toggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        toggle.textContent = 'light mode';
    } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggle.textContent = 'dark mode';
    }
});