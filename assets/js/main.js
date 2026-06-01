let articles = [];

async function loadArticles() {
    const res = await fetch('data/articles.json');
    articles = await res.json();
    renderArticles(articles);
}

function renderArticles(list) {
    const container = document.getElementById("articlesContainer");

    container.innerHTML = list.map(article => `
        <a class="topic-card" href="${article.url}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
        </a>
    `).join('');
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadArticles();

    renderArticles(ARTICLES);

    const input = document.getElementById("searchInput");

    if (input) {
        input.addEventListener("input", (e) => {
            const filtered = filterArticles(e.target.value);
            renderArticles(filtered);
        });
    }
});

function setupSearch() {
    const input = document.getElementById("searchInput");

    input.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = articles.filter(a =>
            a.title.toLowerCase().includes(value) ||
            a.tags.some(tag => tag.includes(value)) ||
            a.category.includes(value)
        );

        renderArticles(filtered);
    });
}

loadArticles().then(setupSearch);