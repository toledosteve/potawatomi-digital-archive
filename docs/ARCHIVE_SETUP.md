# Potawatomi Digital Archive - Setup Guide

This document describes how to set up and deploy the Potawatomi Digital Archive system.

## Architecture Overview

```
potawatomi-digital-archive/
├── hub/                    # Central portal (Jekyll)
├── collections/            # Individual collections (Jekyll + CollectionBuilder)
│   └── tribal-history/     # First collection
├── backend/                # NestJS API (existing)
├── frontend/               # React frontend (existing)
└── .github/workflows/      # Automated build & deploy
```

## Components

### 1. Central Hub (`hub/`)

The hub is a Jekyll static site that serves as the main entry point to the archive. It provides:
- Homepage with featured collections
- Cross-collection search (coming soon)
- About, Contribute, and Contact pages
- Links to individual collections

### 2. Collections (`collections/`)

Each collection is a separate Jekyll site following CollectionBuilder-CSV conventions:
- Driven by a CSV metadata file
- Includes browse, timeline, map, and subject views
- Automatically rebuilt when metadata changes

### 3. Submission Portal (Backend + Frontend)

The existing NestJS/React stack has been extended with:
- **Backend**: `ArchiveSubmissionsModule` for handling submissions
- **Frontend**: `ArchiveSubmissionForm` component
- **API Endpoints**:
  - `POST /archive-submissions` - Submit new items
  - `GET /archive-submissions` - List submissions (admin)
  - `PUT /archive-submissions/:id/moderate` - Approve/reject
  - `GET /archive-submissions/export/:collection` - Export to CSV

## Setup Instructions

### Prerequisites

- Ruby 3.0+ (for Jekyll)
- Node.js 18+ (for backend/frontend)
- MongoDB (for submission storage)

### 1. Set Up the Hub

```bash
cd hub
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000/hub/` to preview.

### 2. Set Up a Collection

```bash
cd collections/tribal-history
bundle install
bundle exec jekyll serve --port 4001
```

Visit `http://localhost:4001/collections/tribal-history/` to preview.

### 3. Configure the Backend

Add these environment variables to your `.env`:

```env
# Existing variables...

# Archive Submissions
ARCHIVE_STORAGE_BUCKET=your-storage-bucket
ARCHIVE_STORAGE_KEY=your-storage-key
```

### 4. Deploy to GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Set up the required secrets:
   - `API_URL` - Your backend API URL
   - `API_KEY` - Admin API key for exports

3. Push to the `main` branch to trigger builds

## Workflow

### Contribution Flow

1. **User submits** via the web form (`/contribute/`)
2. **Submission stored** in MongoDB with `status: pending`
3. **Moderator reviews** in admin panel
4. **Approval** generates `objectId` and assigns collection
5. **Daily export** runs via GitHub Actions
6. **CSV updated** with new approved items
7. **Jekyll rebuilds** the collection site
8. **GitHub Pages** serves the updated site

### Moderation API

```bash
# List pending submissions
curl -H "x-api-key: YOUR_KEY" \
  https://api.example.com/archive-submissions?status=pending

# Approve a submission
curl -X PUT \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"approved","targetCollection":"tribal-history"}' \
  https://api.example.com/archive-submissions/SUBMISSION_ID/moderate

# Export approved items to CSV
curl -H "x-api-key: YOUR_KEY" \
  https://api.example.com/archive-submissions/export/tribal-history
```

## Adding a New Collection

1. Copy the `collections/tribal-history` template:
   ```bash
   cp -r collections/tribal-history collections/new-collection
   ```

2. Update `_config.yml` with collection-specific settings

3. Create initial metadata CSV in `_data/`

4. Add to the hub's featured collections in `hub/_config.yml`

5. Update GitHub Actions matrix in `.github/workflows/build-collection.yml`

## File Upload (Future Enhancement)

Currently, file URLs must be provided directly. To add direct upload:

1. Set up cloud storage (Cloudflare R2, AWS S3, or Backblaze B2)
2. Add upload endpoint to the backend
3. Update the frontend form to handle file uploads
4. Store files with unique names and return URLs

## Customization

### Theming

Edit CSS variables in:
- `hub/assets/css/main.css`
- `collections/*/assets/css/main.css`

Key variables:
```css
:root {
  --primary-color: #2c5282;
  --secondary-color: #c05621;
  --accent-color: #d69e2e;
}
```

### Metadata Fields

To add custom metadata fields:

1. Update the CSV header in your collection's metadata file
2. Add the field to `metadata-fields` in `_config.yml`
3. Update the item layout to display the field
4. Add the field to the submission form and DTO

## Troubleshooting

### Jekyll build fails

- Ensure Ruby 3.0+ is installed
- Run `bundle update` to update dependencies
- Check for syntax errors in Liquid templates

### Submissions not appearing

- Verify submission status is `approved`
- Check that `exportedToCsv` is `false`
- Run export manually and check logs

### GitHub Actions failing

- Verify secrets are configured correctly
- Check workflow permissions in repository settings
- Review action logs for specific errors
