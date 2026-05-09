# 9449 Yellowjackets — Tech Binder

## How to update each season

### 1. Edit `data.js`
This is the **only file you touch**. Everything else builds itself.

- Update `team.season`, `team.robot`, `team.tagline` at the top
- Add/remove/edit entries in `hardware`, `software`, `prototypes`
- Each entry follows the same structure — copy-paste an existing one as a template

### 2. Add images
- Create subfolders: `images/hardware/`, `images/software/`, `images/prototypes/`
- Drop your photos in
- Reference them in `data.js` under `images: ["images/hardware/yourphoto.jpg"]`
- Multiple images per entry = carousel: `images: ["img1.jpg", "img2.jpg", "img3.jpg"]`
- If an image is missing, a placeholder is shown automatically — no crashes

### 3. Open in browser
- Just open `index.html` directly in any browser
- No server, no build step, no npm required

---

## Entry structure reference

### Hardware / Software entry
```js
{
  id: "unique-id",          // used internally
  name: "Subsystem Name",   // displayed as the big heading
  number: "01",             // e.g. "Hardware · 01"
  images: ["images/hardware/photo.jpg"],  // array, supports multiple
  description: "A short paragraph about this subsystem.",
  specs: [
    { label: "Motor", value: "2× Kraken X60" },
    // ... add as many as you want, or use [] to hide
  ],
  features: [
    "First bullet point",
    "Second bullet point",
    // ... or use [] to hide
  ]
}
```

### Prototype entry (same, plus outcome)
```js
{
  // ... same as above, plus:
  outcome: "Adopted",        // "Adopted" | "Rejected" | "Iterated"
  outcomeNote: "Became the final design after Week 3.",
}
```

---

## Hosting (free options)
- **GitHub Pages**: push to a repo, enable Pages in settings
- **Netlify**: drag the folder onto netlify.com/drop
- **Vercel**: `npx vercel` in the folder (needs Node)
