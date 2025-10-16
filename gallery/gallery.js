// Simple in-memory gallery structure
const albums = {};

function getAlbumName(date) {
    const d = new Date(date);
    return d.toLocaleString('default', { month: 'long' }) + ' ' + d.getFullYear();
}

function addImageToAlbum(file, meta) {
    const album = getAlbumName(meta.date);
    if (!albums[album]) albums[album] = [];
    albums[album].push({
        url: meta.url,
        title: `${meta.date} - ${meta.style}`,
        desc: `Color: ${meta.color}. Print/Pattern: ${meta.pattern}. Style: ${meta.style}`
    });
}

function renderAlbums() {
    const albumList = document.getElementById('album-list');
    albumList.innerHTML = '';
    Object.keys(albums).forEach((name, idx) => {
        const btn = document.createElement('button');
        btn.textContent = name;
        btn.className = 'album-btn';
        btn.onclick = () => renderGallery(name);
        if (idx === 0) btn.classList.add('active');
        albumList.appendChild(btn);
    });
    if (Object.keys(albums).length)
        renderGallery(Object.keys(albums)[0]);
}

function renderGallery(albumName) {
    document.querySelectorAll('.album-btn').forEach(b => b.classList.remove('active'));
    Array.from(document.querySelectorAll('.album-btn')).find(btn => btn.textContent === albumName)?.classList.add('active');
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    (albums[albumName] || []).forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${item.url}" class="gallery-thumb" alt="${item.title}">
            <div class="item-title">${item.title}</div>
            <div class="item-desc">${item.desc}</div>
            <button class="share-btn" onclick="shareImage('${item.url}', '${item.title}')">Share</button>
        `;
        gallery.appendChild(div);
    });
}

function shareImage(url, title) {
    if (navigator.share) {
        navigator.share({ title, url })
            .catch(e => alert('Share failed: ' + e));
    } else {
        prompt('Copy this image URL to share:', url);
    }
}

// Handle uploads
document.getElementById('upload').addEventListener('change', async (e) => {
    for (const file of e.target.files) {
        const url = URL.createObjectURL(file);
        // Prompt for metadata
        const today = new Date().toISOString().slice(0, 10);
        const style = prompt('Style (thong, g-string, bikini-brief)?', 'thong');
        const color = prompt('Color of this pair?', '');
        const pattern = prompt('Print, pattern, or image on the pair?', '');
        addImageToAlbum(file, { url, date: today, style, color, pattern });
    }
    renderAlbums();
});

// Initial render
renderAlbums();