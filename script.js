const list = document.getElementById('starred-list');
const status = document.getElementById('status');

function renderRepo(repo) {
  const item = document.createElement('li');
  item.className = 'repo-card';

  const starCount = repo.stargazers_count?.toLocaleString() ?? '0';
  const lastUpdated = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Recently';

  item.innerHTML = `
    <div class="repo-top">
      <a class="repo-name" href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
      <span class="star-count">★ ${starCount}</span>
    </div>
    <p class="repo-description">${repo.description || 'No description provided.'}</p>
    <div class="repo-meta">
      <span><span class="language-dot" aria-hidden="true"></span>${repo.language || 'Unknown'}</span>
      <span>Updated ${lastUpdated}</span>
    </div>
  `;

  return item;
}

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load starred repositories.');
    }
    return response.json();
  })
  .then((repos) => {
    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error('No repositories found.');
    }

    repos.forEach((repo) => list.appendChild(renderRepo(repo)));
    status.textContent = `Showing ${repos.length} starred repositories.`;
  })
  .catch((error) => {
    status.classList.add('error');
    status.textContent = error.message;
  });
