# Digital Archives Repository

A Jekyll-based digital repository system for managing and displaying archival collections, featuring support for multiple media types, advanced search capabilities, and RAD (Rules for Archival Description) compliance.

## Features

- **Multiple Media Support**: Handle images, audio, video, documents, and 3D objects
- **RAD Compliance**: Hierarchical organization (fonds, series, files, items)
- **Advanced Search**: Full-text search with metadata filtering
- **Interactive Features**: Maps, timelines, and media viewers
- **Responsive Design**: Mobile-friendly interface

## Prerequisites

- Ruby (version 2.7.0 or higher)
- RubyGems
- GCC and Make
- Git

## Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/digital-archives-repository.git
   cd digital-archives-repository
   ```

2. **Install Dependencies**
   ```bash
   bundle install
   ```

3. **Configure Your Site**
   - Edit `_config.yml` with your site information
   - Update metadata fields in `_data/fields.yml`

4. **Run Locally**
   ```bash
   bundle exec jekyll serve
   ```

5. **View Your Site**
   - Open `http://localhost:4000` in your browser

## Detailed Setup Guide

### 1. Initial Setup

1. **Create a GitHub Repository**
   - Go to GitHub.com and sign in
   - Click "New Repository"
   - Name it `digital-archives-repository`
   - Choose "Public" visibility
   - Initialize with a README
   - Click "Create repository"

2. **Set Up GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages"
   - Select branch `main` and folder `/ (root)`
   - Click "Save"

3. **Clone and Configure Locally**
   ```bash
   git clone https://github.com/yourusername/digital-archives-repository.git
   cd digital-archives-repository
   bundle init
   ```

4. **Update Gemfile**
   ```ruby
   source "https://rubygems.org"
   gem "jekyll"
   gem "webrick"
   group :jekyll_plugins do
     gem "jekyll-feed"
     gem "jekyll-seo-tag"
     gem "jekyll-sitemap"
   end
   ```

### 2. Content Organization

1. **Create Collection Directories**
   ```bash
   mkdir _fonds _series _files _items
   ```

2. **Add Sample Content**
   - Place markdown files in appropriate directories
   - Follow the RAD hierarchy
   - Use consistent metadata fields

### 3. Adding Digital Objects

1. **Prepare Media Files**
   ```bash
   mkdir -p assets/media/{images,audio,video,documents,3d}
   ```

2. **Create Item Records**
   ```markdown
   ---
   layout: item
   title: "Sample Item"
   date: 1960-01-01
   level: item
   parent_series: series-id
   media:
     type: image
     format: jpeg
     url: /assets/media/images/sample.jpg
   ---
   ```

### 4. Search Setup

1. **Generate Search Index**
   ```bash
   bundle exec jekyll build
   ```

2. **Enable Search Page**
   - Verify search.md exists
   - Add search link to navigation

### 5. Deployment

1. **Prepare for GitHub Pages**
   ```bash
   git add .
   git commit -m "Initial repository setup"
   git push origin main
   ```

2. **Configure Custom Domain (Optional)**
   - Add CNAME file
   - Update DNS settings
   - Enable HTTPS

## Adding Content

### 1. Create a New Item

1. Create markdown file in `_items/`:
   ```markdown
   ---
   layout: item
   title: "New Item"
   date: YYYY-MM-DD
   level: item
   parent_series: series-id
   media:
     type: image
     format: jpeg
     url: /path/to/media
   ---
   Description here.
   ```

2. Add media files to appropriate directory
3. Commit and push changes

### 2. Update Metadata

1. Edit `_data/fields.yml` for new fields
2. Update templates in `_layouts/`
3. Rebuild site

## Customization

### 1. Styling

- Edit `assets/css/main.css`
- Update color variables
- Modify layout styles

### 2. Features

- Enable/disable components in `_config.yml`
- Customize search filters
- Add new media viewers

## Troubleshooting

### Common Issues

1. **Jekyll Build Errors**
   - Check Ruby version
   - Verify Gemfile dependencies
   - Look for syntax errors in markdown files

2. **Search Not Working**
   - Rebuild search index
   - Check JavaScript console
   - Verify Lunr.js integration

3. **Media Display Issues**
   - Check file paths
   - Verify media formats
   - Update viewer configurations

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Submit pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- Open an issue for bugs
- Submit feature requests
- Check documentation for guides

## Acknowledgments

- Jekyll community
- Lunr.js for search functionality
- Contributors and users

## Test Commit

# John Smith Photography Collection Digital Repository

This digital repository contains the archival materials from the John Smith Photography Collection, featuring street photography, portraits, and documentary work from 1950-1990.

## Collection Overview

- **Reference Code**: F001
- **Date Range**: 1950-1990
- **Extent**: 15 linear feet (45 boxes), including 5,000 photographs and 100 audio recordings
- **Creator**: John Smith (1925-1995)

## Series

1. **Street Photography Series (S001)**
   - Date Range: 1950-1985
   - Contains: 3,000 photographs documenting street life in various Asian cities
   - Features: Markets, festivals, daily activities
   - Locations: Hong Kong, Tokyo, Singapore

## Digital Objects

The repository includes various digital objects:
- High-resolution TIFF master files
- Web-optimized JPEG access copies
- PDF finding aids and documentation
- MP4 video files (where applicable)

## Access

All materials are accessible through this digital repository. For high-resolution copies or additional information, please contact the archive.

## Rights

Copyright is held by the Smith estate. Materials are available for research purposes.
