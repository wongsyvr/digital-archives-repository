// Search functionality using Lunr.js
class ArchiveSearch {
    constructor() {
        this.searchIndex = null;
        this.documents = [];
        this.filters = {
            level: new Set(),
            mediaType: new Set(),
            subjects: new Set(),
            languages: new Set(),
            rights: new Set(),
            dateRange: {
                from: null,
                to: null
            },
            location: null
        };
        this.currentResults = [];
        this.resultsPerPage = 20;
        this.currentPage = 1;
        
        this.initializeSearch();
    }

    async initializeSearch() {
        try {
            // Load the search index and documents
            const response = await fetch('/assets/js/search-index.json');
            const data = await response.json();
            
            this.documents = data.documents;
            this.searchIndex = lunr.Index.load(data.index);
            
            // Initialize UI elements
            this.initializeUI();
            this.initializeFilters();
            
            // Populate dynamic filter options
            this.populateSubjects();
            this.populateLanguages();
            
        } catch (error) {
            console.error('Error initializing search:', error);
        }
    }

    initializeUI() {
        // Search input and button
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.resultsContainer = document.getElementById('search-results');
        this.loadMoreButton = document.getElementById('load-more');
        this.resultTemplate = document.getElementById('search-result-template');
        
        // Add event listeners
        this.searchButton.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        this.loadMoreButton.addEventListener('click', () => this.loadMoreResults());
        
        // Initialize sort functionality
        document.getElementById('sort-by').addEventListener('change', (e) => {
            this.sortResults(e.target.value);
        });
    }

    initializeFilters() {
        // Level filters
        document.getElementById('level-filters').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.filters.level.add(e.target.value);
            } else {
                this.filters.level.delete(e.target.value);
            }
            this.applyFilters();
        });

        // Media type filters
        document.getElementById('media-filters').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.filters.mediaType.add(e.target.value);
            } else {
                this.filters.mediaType.delete(e.target.value);
            }
            this.applyFilters();
        });

        // Date range filters
        document.getElementById('date-from').addEventListener('change', (e) => {
            this.filters.dateRange.from = e.target.value;
            this.applyFilters();
        });
        document.getElementById('date-to').addEventListener('change', (e) => {
            this.filters.dateRange.to = e.target.value;
            this.applyFilters();
        });

        // Clear filters button
        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });
    }

    populateSubjects() {
        // Extract unique subjects from documents
        const subjects = new Set();
        this.documents.forEach(doc => {
            if (doc.subjects) {
                doc.subjects.forEach(subject => subjects.add(subject));
            }
        });

        // Populate subject filters
        const subjectFilters = document.getElementById('subject-filters');
        subjects.forEach(subject => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" value="${subject}">
                ${subject}
            `;
            subjectFilters.appendChild(label);
        });

        // Add event listeners
        subjectFilters.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.filters.subjects.add(e.target.value);
            } else {
                this.filters.subjects.delete(e.target.value);
            }
            this.applyFilters();
        });
    }

    populateLanguages() {
        // Extract unique languages from documents
        const languages = new Set();
        this.documents.forEach(doc => {
            if (doc.languages) {
                doc.languages.forEach(lang => languages.add(lang));
            }
        });

        // Populate language filters
        const languageFilters = document.getElementById('language-filters');
        languages.forEach(language => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" value="${language}">
                ${language}
            `;
            languageFilters.appendChild(label);
        });

        // Add event listeners
        languageFilters.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.filters.languages.add(e.target.value);
            } else {
                this.filters.languages.delete(e.target.value);
            }
            this.applyFilters();
        });
    }

    performSearch() {
        const query = this.searchInput.value;
        
        if (!query) {
            this.currentResults = this.documents;
        } else {
            // Perform Lunr search
            const searchResults = this.searchIndex.search(query);
            
            // Map results to documents
            this.currentResults = searchResults.map(result => {
                return this.documents.find(doc => doc.id === result.ref);
            });
        }

        // Apply current filters
        this.applyFilters();
    }

    applyFilters() {
        let filteredResults = this.currentResults;

        // Apply level filter
        if (this.filters.level.size > 0) {
            filteredResults = filteredResults.filter(doc => 
                this.filters.level.has(doc.level)
            );
        }

        // Apply media type filter
        if (this.filters.mediaType.size > 0) {
            filteredResults = filteredResults.filter(doc => 
                this.filters.mediaType.has(doc.media.type)
            );
        }

        // Apply subject filter
        if (this.filters.subjects.size > 0) {
            filteredResults = filteredResults.filter(doc => 
                doc.subjects && doc.subjects.some(subject => 
                    this.filters.subjects.has(subject)
                )
            );
        }

        // Apply language filter
        if (this.filters.languages.size > 0) {
            filteredResults = filteredResults.filter(doc => 
                doc.languages && doc.languages.some(lang => 
                    this.filters.languages.has(lang)
                )
            );
        }

        // Apply date range filter
        if (this.filters.dateRange.from || this.filters.dateRange.to) {
            filteredResults = filteredResults.filter(doc => {
                const docDate = new Date(doc.date);
                const fromDate = this.filters.dateRange.from ? new Date(this.filters.dateRange.from) : null;
                const toDate = this.filters.dateRange.to ? new Date(this.filters.dateRange.to) : null;

                return (!fromDate || docDate >= fromDate) && 
                       (!toDate || docDate <= toDate);
            });
        }

        // Update results display
        this.currentResults = filteredResults;
        this.currentPage = 1;
        this.displayResults();
    }

    displayResults() {
        // Clear current results
        this.resultsContainer.innerHTML = '';
        
        // Calculate pagination
        const start = (this.currentPage - 1) * this.resultsPerPage;
        const end = start + this.resultsPerPage;
        const paginatedResults = this.currentResults.slice(start, end);

        // Update results count
        document.getElementById('results-total').textContent = this.currentResults.length;

        // Display results
        paginatedResults.forEach(doc => {
            const resultElement = this.resultTemplate.content.cloneNode(true);
            
            // Populate result template
            resultElement.querySelector('.result-title a').textContent = doc.title;
            resultElement.querySelector('.result-title a').href = doc.url;
            resultElement.querySelector('.result-level').textContent = doc.level;
            resultElement.querySelector('.result-date').textContent = doc.date;
            resultElement.querySelector('.result-type').textContent = doc.media.type;
            resultElement.querySelector('.result-description').textContent = doc.description;
            
            // Handle thumbnail
            const thumbnail = resultElement.querySelector('.result-thumbnail img');
            if (doc.thumbnail) {
                thumbnail.src = doc.thumbnail;
                thumbnail.alt = doc.title;
            } else {
                thumbnail.style.display = 'none';
            }

            // Add subjects
            if (doc.subjects) {
                const subjectsContainer = resultElement.querySelector('.result-subjects');
                doc.subjects.forEach(subject => {
                    const span = document.createElement('span');
                    span.className = 'subject-tag';
                    span.textContent = subject;
                    subjectsContainer.appendChild(span);
                });
            }

            this.resultsContainer.appendChild(resultElement);
        });

        // Update load more button visibility
        this.loadMoreButton.style.display = 
            end < this.currentResults.length ? 'block' : 'none';
    }

    loadMoreResults() {
        this.currentPage++;
        this.displayResults();
    }

    sortResults(sortBy) {
        switch (sortBy) {
            case 'date-desc':
                this.currentResults.sort((a, b) => 
                    new Date(b.date) - new Date(a.date)
                );
                break;
            case 'date-asc':
                this.currentResults.sort((a, b) => 
                    new Date(a.date) - new Date(b.date)
                );
                break;
            case 'title':
                this.currentResults.sort((a, b) => 
                    a.title.localeCompare(b.title)
                );
                break;
            // 'relevance' is default, no need to sort as Lunr.js handles it
        }
        this.currentPage = 1;
        this.displayResults();
    }

    clearFilters() {
        // Reset all filters
        this.filters = {
            level: new Set(),
            mediaType: new Set(),
            subjects: new Set(),
            languages: new Set(),
            rights: new Set(),
            dateRange: {
                from: null,
                to: null
            },
            location: null
        };

        // Reset UI
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';
        document.getElementById('location-search').value = '';

        // Reapply search
        this.performSearch();
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.archiveSearch = new ArchiveSearch();
});
