let ARTICLES = [];

async function loadArticles() {
    const res = await fetch("data/articles.json");
    ARTICLES = await res.json();
    return ARTICLES;
}

function renderArticles(list, containerId = "articlesContainer") {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = list.map(article => `
        <a class="topic-card" href="${article.url}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
        </a>
    `).join("");
}

function filterArticles(query) {
    query = query.toLowerCase();

    return ARTICLES.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query)
    );
}