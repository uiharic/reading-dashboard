# Reading Dashboard

Personal dashboard for saving and tracking articles from Facebook and X (Twitter).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy

Push to `main` — GitHub Actions builds and deploys automatically.

**First-time setup (one-off):**
1. Go to repo **Settings → Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")

The site will be live at `https://<your-username>.github.io/reading-dashboard/`

## Add a new entry

Edit `public/data/entries.json` — **prepend** the new entry to the top of the array:

```json
[
  {
    "id": "unique-id",
    "date": "2026-06-19",
    "source": "facebook",
    "title": "Article title",
    "summary": "Short summary",
    "url": "https://...",
    "tags": ["tag1", "tag2"],
    "read": false
  },
  ...existing entries...
]
```

Use Gregorian year in `date` (e.g. `2026`, not `2569`).

Commit and push to `main` — the site updates within ~1 minute.
