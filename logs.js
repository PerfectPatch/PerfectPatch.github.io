const REPO = "PerfectPatch/PerfectPatch.github.io";
const LOGS_PATH = "logs";

function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return { data: {}, body: raw };
    const [, fm, body] = match;
    const data = {};
    fm.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx === -1) return;
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        data[key] = value;
    });
    return { data, body };
}

function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

async function renderLogs() {
    const container = document.getElementById('logs-container');
    if (!container) return;

    try {
        const listRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${LOGS_PATH}`);
        const files = await listRes.json();
        const mdFiles = files.filter(f => f.name.endsWith('.md'));

        const entries = await Promise.all(mdFiles.map(async (file) => {
            const raw = await (await fetch(file.download_url)).text();
            const { data, body } = parseFrontmatter(raw);
            return { ...data, body };
        }));

        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = entries.map((entry, i) => `
            <article class="log-entry">
                <div class="log-meta">
                    <span class="log-num">№ ${String(entries.length - i).padStart(3, '0')}</span>
                    <time>${formatDate(entry.date)}</time>
                </div>
                <h3>${entry.title || ''}</h3>
                <div class="log-body">${marked.parse(entry.body || '')}</div>
            </article>
        `).join('');
    } catch (err) {
        container.innerHTML = '<p>Не удалось загрузить записи.</p>';
        console.error(err);
    }
}

renderLogs();
