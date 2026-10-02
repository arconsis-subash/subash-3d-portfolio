import playlists from './content/videos.json';

const youtubeIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
  </svg>`;

function createVideoCard(video) {
  const card = document.createElement('a');
  card.className = 'video-card';
  card.href = video.url;
  card.target = '_blank';
  card.rel = 'noopener';

  const thumb = document.createElement('div');
  thumb.className = 'video-thumb';
  const img = document.createElement('img');
  img.src = video.thumbnail;
  img.alt = '';
  img.loading = 'lazy';
  thumb.append(img);

  const title = document.createElement('h4');
  title.textContent = video.title;

  card.append(thumb, title);
  return card;
}

export function renderVideos(container) {
  for (const playlist of playlists) {
    const group = document.createElement('div');
    group.className = 'playlist';

    const header = document.createElement('a');
    header.className = 'playlist-header';
    header.href = playlist.url;
    header.target = '_blank';
    header.rel = 'noopener';
    header.innerHTML = youtubeIcon;
    const name = document.createElement('h3');
    name.textContent = playlist.title;
    const count = document.createElement('span');
    count.textContent = `${playlist.videos.length} Lektionen`;
    header.append(name, count);

    const row = document.createElement('div');
    row.className = 'video-row';
    row.append(...playlist.videos.map(createVideoCard));

    group.append(header, row);
    container.append(group);
  }
}
