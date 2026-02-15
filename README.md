# Potawatomi Digital Archive

A community-driven digital archive platform for preserving Citizen Potawatomi Nation history and family collections. Built using CollectionBuilder with a custom submission portal for tribal member contributions.

## Architecture

```
potawatomi-digital-archive/
├── hub/                      # Central portal - browse all collections
├── collections/              # Individual CollectionBuilder sites
│   ├── tribal-history/       # Migration, treaties, leaders
│   ├── oral-histories/       # Audio/video recordings
│   └── family-archives/      # Family photo collections
├── submission-portal/        # Public submission + moderation
│   ├── frontend/             # React submission form
│   └── backend/              # NestJS API + MongoDB
├── media/                    # Sample media files
└── docs/                     # Documentation
```

## Technology Stack

| Component | Technology | Hosting |
|-----------|------------|---------|
| Archive Sites | Jekyll + CollectionBuilder-CSV | GitHub Pages |
| Submission Portal | React + NestJS + MongoDB | Your choice (Render, Railway, etc.) |
| Media Storage | Cloudflare R2 / Backblaze B2 | Cloud storage |

## Quick Start

### Prerequisites
- Ruby 3.x + Jekyll (for CollectionBuilder)
- Node.js 20+ (for submission portal)
- MongoDB (for submissions database)

### 1. Run the Hub Site Locally
```bash
cd hub
bundle install
bundle exec jekyll serve
# Open http://localhost:4000
```

### 2. Run a Collection Site
```bash
cd collections/tribal-history
bundle install
bundle exec jekyll serve --port 4001
# Open http://localhost:4001
```

### 3. Run Submission Portal
```bash
# Backend
cd submission-portal/backend
npm install
npm run start:dev

# Frontend
cd submission-portal/frontend
npm install
npm run dev
```

## Contribution Workflow

1. **Submit**: Tribal members fill out the web form with item + metadata
2. **Review**: Moderators approve/reject in admin dashboard
3. **Publish**: Approved items auto-sync to CollectionBuilder CSV
4. **Display**: GitHub Actions rebuilds the static site

## Collections

### Tribal History
Historical photographs, documents, maps, and records related to Citizen Potawatomi Nation history, migration, treaties, and leadership.

### Oral Histories
Audio and video recordings of elders, interviews, stories, and ceremonial knowledge (with appropriate permissions).

### Family Archives
Family photographs, letters, documents, and genealogical materials contributed by tribal members.

## Metadata Fields

Each item in the archive uses these metadata fields:

| Field | Required | Description |
|-------|----------|-------------|
| objectid | Yes | Unique identifier |
| title | Yes | Item title |
| description | No | Detailed description |
| creator | No | Who created the item |
| date | No | Date or date range |
| subject | No | Topics (semicolon-separated) |
| location | No | Place name or coordinates |
| type | Yes | Image, Document, Audio, Video |
| format | Yes | File format (image/jpeg, audio/mp3, etc.) |
| contributor | No | Who submitted the item |
| rights | No | Copyright/usage information |
| family | No | Family name (for family archives) |
| language | No | Language (English, Potawatomi, etc.) |

## Deployment

### GitHub Pages (Collections + Hub)
Each collection and the hub are separate GitHub repositories that auto-deploy to GitHub Pages.

### Custom Domain
Configure CNAME records to point your domain to GitHub Pages:
- `archive.potawatomi.org` → Hub
- `archive.potawatomi.org/tribal-history` → Collection

## License

Content: Various (see individual items)
Code: MIT License

## Contact

Citizen Potawatomi Nation Legislature
