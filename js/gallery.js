/* ===================================================
   Lumière Fine Art Gallery - Gallery Search & Filter
   Dynamic filtering of artworks by category and search keyword
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFiltering();
});

function initGalleryFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('artSearchInput');
  const artworkCards = document.querySelectorAll('.art-grid .art-card');
  const countBadge = document.getElementById('artworkCount');
  const emptyState = document.getElementById('noResultsMessage');

  let activeFilter = 'all';
  let searchTerm = '';

  function filterArtworks() {
    let visibleCount = 0;

    artworkCards.forEach(card => {
      const category = card.getAttribute('data-category')?.toLowerCase() || '';
      const title = card.querySelector('.art-card-title')?.textContent.toLowerCase() || '';
      const artist = card.querySelector('.art-card-artist')?.textContent.toLowerCase() || '';
      const year = card.querySelector('.art-card-year')?.textContent.toLowerCase() || '';

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = title.includes(searchTerm) || 
                            artist.includes(searchTerm) || 
                            year.includes(searchTerm) ||
                            category.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'masterpiece' : 'masterpieces'}`;
    }

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter')?.toLowerCase() || 'all';
      filterArtworks();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterArtworks();
    });
  }

  // Check URL parameters (e.g. ?category=impressionism)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const matchingBtn = Array.from(filterButtons).find(
      btn => btn.getAttribute('data-filter')?.toLowerCase() === categoryParam.toLowerCase()
    );
    if (matchingBtn) {
      matchingBtn.click();
    }
  }
}
