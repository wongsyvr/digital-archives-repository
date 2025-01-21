// Initialize map if we're on a page with a map
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers from data attributes
        const items = document.querySelectorAll('[data-lat][data-lng]');
        items.forEach(item => {
            const lat = parseFloat(item.dataset.lat);
            const lng = parseFloat(item.dataset.lng);
            const title = item.dataset.title || 'Item';
            
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`<h3>${title}</h3><p><a href="${item.dataset.url}">View Details</a></p>`);
        });
    }
}

// Initialize timeline if we're on a page with a timeline
function initTimeline() {
    const timelineElement = document.querySelector('.timeline');
    if (timelineElement) {
        const items = document.querySelectorAll('[data-year]');
        const years = new Set();
        
        // Collect all years
        items.forEach(item => years.add(item.dataset.year));
        
        // Sort years
        const sortedYears = Array.from(years).sort();
        
        // Create timeline rows
        sortedYears.forEach(year => {
            const yearItems = document.querySelectorAll(`[data-year="${year}"]`);
            const row = document.createElement('div');
            row.className = 'timeline-row';
            
            const yearLabel = document.createElement('div');
            yearLabel.className = 'timeline-year';
            yearLabel.textContent = year;
            
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'timeline-items';
            
            yearItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'timeline-item';
                itemElement.innerHTML = `
                    <img src="${item.dataset.thumbnail}" alt="${item.dataset.title}">
                    <p><a href="${item.dataset.url}">${item.dataset.title}</a></p>
                `;
                itemsContainer.appendChild(itemElement);
            });
            
            row.appendChild(yearLabel);
            row.appendChild(itemsContainer);
            timelineElement.appendChild(row);
        });
    }
}

// Initialize media viewers based on file type
function initMediaViewers() {
    document.querySelectorAll('.media-viewer').forEach(viewer => {
        const type = viewer.dataset.type;
        const url = viewer.dataset.url;
        
        switch(type) {
            case 'pdf':
                viewer.innerHTML = `<iframe src="${url}" width="100%" height="600px"></iframe>`;
                break;
            case 'image':
                viewer.innerHTML = `<img src="${url}" alt="Image">`;
                break;
            case 'audio':
                viewer.innerHTML = `<audio controls src="${url}"></audio>`;
                break;
            case 'video':
                viewer.innerHTML = `<video controls src="${url}"></video>`;
                break;
            case '3d':
                // Implement 3D viewer integration here
                break;
        }
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initTimeline();
    initMediaViewers();
});
