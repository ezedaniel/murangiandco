# Murangi &amp; Co — Website

Static website for Murangi &amp; Co, a UK chartered accountancy practice.
Built as plain HTML5, CSS3 and vanilla JavaScript. No build step, no framework, no backend.

---

## Folder structure

```
/
├── index.html               Full site (all pages, shown/hidden by JavaScript)
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── .nojekyll                Tells GitHub Pages to serve files as-is
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/                  All photography, logo, icons, social share image
└── assets/
    ├── site.webmanifest
    ├── robots.txt
    └── CNAME.example        Rename to CNAME (no extension) at the repo root
```

Every path in the project is **relative** (`css/style.css`, `images/hero-home.jpg`).
Nothing starts with `/`, so the site works from a custom domain, a project
subfolder, or straight off your desktop by double-clicking `index.html`.

---

## What is external

Only three things load from the internet, all over HTTPS:

| Resource | Purpose |
| --- | --- |
| Google Fonts (Cormorant Garamond, Jost) | Typography |
| `assets.calendly.com` widget | Booking calendar on the Contact page |
| — | Nothing else. No analytics, no trackers, no backend. |

The Calendly calendar is wired to **https://calendly.com/murangiandco/30min**.
If the widget is ever blocked, a fallback link to that page is shown in its place.

---

## Deployment

### 1. Upload to a GitHub repository

**Option A — browser upload (no tools needed)**

1. Go to <https://github.com/new>, create a repository (public), do not add a README.
2. On the empty repo page click **uploading an existing file**.
3. Open this folder, select **everything inside it** (not the folder itself) and drag it in.
   Make sure hidden file `.nojekyll` is included — on macOS press `Cmd + Shift + .` in
   Finder to reveal it, on Windows tick **Hidden items** in File Explorer's View tab.
4. Click **Commit changes**.

**Option B — command line**

```bash
cd murangi-co-website
git init
git add -A
git commit -m "Murangi & Co website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. In the repo go to **Settings → Pages**.
2. Under **Source** choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Click **Save**.
4. Wait about a minute, then reload. GitHub shows the live URL
   (`https://YOUR-USERNAME.github.io/YOUR-REPO/`). Open it and check the site loads.

### 3. Connect your custom domain

1. Still in **Settings → Pages**, under **Custom domain** enter `www.murangiandco.com`
   and click **Save**. GitHub creates a `CNAME` file in the repo for you.
   (If you prefer to do it manually, rename `assets/CNAME.example` to `CNAME`,
   move it to the repo root, and put only your domain inside it.)
2. At your domain registrar (where you bought the domain), add these DNS records:

   **For the `www` subdomain (recommended):**

   | Type | Name | Value |
   | --- | --- | --- |
   | CNAME | `www` | `YOUR-USERNAME.github.io` |

   **To also make the bare domain work, add all four A records:**

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |

3. DNS usually updates within 10–60 minutes, occasionally up to 24 hours.
   GitHub's Pages settings page will show **DNS check successful** when it is ready.

### 4. Confirm HTTPS works

1. Back in **Settings → Pages**, wait until the **Enforce HTTPS** checkbox becomes
   selectable (GitHub issues a free Let's Encrypt certificate automatically — this can
   take up to 24 hours after the DNS check passes).
2. Tick **Enforce HTTPS**.
3. Visit `https://www.murangiandco.com` and confirm the padlock appears.
4. Visit `http://www.murangiandco.com` and confirm it redirects to `https://`.

---

## After going live

Two things to update once the final domain is confirmed. Both are in `index.html`,
inside `<head>`, and both only affect SEO and link previews — the site works without them.

- Replace `https://www.murangiandco.com` in the `canonical`, `og:url` and `og:image`
  and `twitter:image` tags if the live domain differs.
- Update the same domain in `sitemap.xml` and `robots.txt`.

---

## Editing content

- **Text and page structure** — `index.html`. Each page is a `<div class="page" id="page-NAME">`.
  JavaScript shows one at a time; only one page is ever visible.
- **Colours, spacing, typography** — `css/style.css`. The olive and gold palette is
  defined near the top of the file.
- **Behaviour** — `js/script.js`: page switching, mobile navigation, the flip cards,
  the packages tabs, the contact form (opens the visitor's email client) and the
  Calendly fallback.
- **Photography** — drop replacements into `images/` using the same filename, or update
  the `src` in `index.html`.

## Local preview

Double-click `index.html`. That is enough for everything except the Calendly widget,
which some browsers block on `file://`. To preview it fully:

```bash
cd murangi-co-website
python3 -m http.server 8000
# then open http://localhost:8000
```
