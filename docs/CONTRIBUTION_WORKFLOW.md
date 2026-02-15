# Contribution Workflow

This document describes how tribal members and community contributors can submit materials to the Potawatomi Digital Archive.

## For Contributors

### What Can You Contribute?

We welcome:
- **Photographs**: Historical and contemporary images
- **Documents**: Letters, records, maps, newspaper clippings
- **Audio**: Oral histories, interviews, songs, language recordings
- **Video**: Ceremonies, interviews, family gatherings
- **Stories**: Written memories and family histories

### How to Submit

1. Visit the archive website at `https://your-domain.com/hub/contribute/`

2. Click "Submit Materials Online"

3. Complete the three-step form:

   **Step 1: Your Information**
   - Your name and contact info
   - Your relationship to the material
   - Tribal affiliation (optional)

   **Step 2: Item Details**
   - Title and description
   - Date (exact or approximate)
   - Location, people involved
   - Upload your file or paste a link
   - Suggest a collection

   **Step 3: Rights & Permissions**
   - Confirm you have rights to share
   - Note any cultural sensitivities
   - Specify access restrictions if needed

4. Submit and wait for review

### What Happens Next?

1. **Review**: Our team reviews your submission
2. **Contact**: We may reach out for additional information
3. **Processing**: Approved items are cataloged and added
4. **Notification**: You'll receive an email when published
5. **Publication**: Your contribution appears in the archive

### Guidelines

- **Quality**: Higher resolution is better for images
- **Accuracy**: Provide as much detail as possible
- **Respect**: Follow cultural protocols for sensitive materials
- **Consent**: Ensure you have permission from living individuals

## For Moderators

### Review Process

1. Log into the admin panel at `/admin`

2. Navigate to "Archive Submissions"

3. Review pending submissions:
   - Check image/file quality
   - Verify metadata accuracy
   - Assess cultural appropriateness
   - Confirm rights/permissions

4. Take action:
   - **Approve**: Item will be exported and published
   - **Request Info**: Contact submitter for clarification
   - **Reject**: Provide reason for rejection

### Approval Checklist

- [ ] File is viewable and of acceptable quality
- [ ] Title and description are accurate
- [ ] Date is reasonable
- [ ] Location is specified (if known)
- [ ] Subjects/tags are appropriate
- [ ] Rights confirmation is provided
- [ ] No cultural sensitivity concerns (or properly noted)
- [ ] Target collection is appropriate

### Assigning to Collections

When approving, select the appropriate collection:

| Collection | Use For |
|------------|---------|
| Tribal History | Treaties, maps, historical events, leaders |
| Oral Histories | Audio/video interviews, recordings |
| Family Archives | Family photos, personal documents |
| Historical Documents | Official records, newspapers, letters |

### Export and Publication

Approved items are automatically exported daily via GitHub Actions:

1. Export job runs at midnight UTC
2. New items appended to collection CSV
3. Jekyll site rebuilds
4. GitHub Pages deploys updates

To trigger manual export:
1. Go to Actions tab in GitHub
2. Select "Export Approved Items and Rebuild"
3. Click "Run workflow"

## API Reference

### Submit Item
```
POST /archive-submissions
Content-Type: application/json

{
  "submitterName": "John Doe",
  "submitterEmail": "john@example.com",
  "title": "Family Photo 1920",
  "mediaType": "image",
  "fileUrl": "https://...",
  "hasRightsToShare": true
}
```

### List Submissions (Admin)
```
GET /archive-submissions?status=pending
x-api-key: YOUR_API_KEY
```

### Moderate Submission (Admin)
```
PUT /archive-submissions/:id/moderate
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "status": "approved",
  "targetCollection": "tribal-history",
  "moderatorNotes": "Great historical photo"
}
```

### Export to CSV (Admin)
```
GET /archive-submissions/export/tribal-history
x-api-key: YOUR_API_KEY
```

## Contact

Questions about contributing? Email: contact@potawatomiarchive.org
