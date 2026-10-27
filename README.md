# Rutvik Natu — portfolio

A hand-built, dependency-free portfolio site for GitHub Pages.

## Publish on GitHub Pages (5 minutes)

1. Create a new repository on GitHub. For the address `https://rutvik200297.github.io`, name it exactly **`Rutvik200297.github.io`**. Any other name gives `https://rutvik200297.github.io/<repo-name>`.
2. Upload everything in this folder (`index.html`, `assets/`, `.nojekyll`, `README.md`) to the repository root.
   - Browser: **Add file → Upload files**, drag the files in, commit.
   - Terminal:
     ```bash
     git init && git add . && git commit -m "Portfolio"
     git branch -M main
     git remote add origin https://github.com/Rutvik200297/Rutvik200297.github.io.git
     git push -u origin main
     ```
3. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. Wait about a minute and open the URL shown on that page.

## Edit the content

Everything on the page comes from **`assets/data.js`**. You never need to touch the HTML.

| To change… | Edit in `data.js` |
|---|---|
| Name, intro, email, LinkedIn, CV link | `person` |
| Animated workflow in the hero | `heroFlow` |
| Before/after bars | `impact` |
| Number tiles | `ledger` |
| AI projects | `aiBuilds` |
| Automation cards and filters | `automations`, `platforms` |
| Tracking loop | `trackLoop` |
| Engineer vs. plain-language examples | `translations` |
| Jobs, education, tools | `experience`, `education`, `stack` |

### Add more detail to any project, automation or job

Add any of these fields; they show up behind a "More" toggle:

```js
details: ["What problem it solved.", "How you measured it."],
image:   "assets/img/voice-agent-dashboard.png",   // put the file in assets/img/
links:   [{ label: "Code on GitHub", url: "https://github.com/..." }]
```

### Add a new automation platform (e.g. Make)

1. Add `"Make"` to `platforms`.
2. Use `platform: "Make"` on an automation.
3. Optional colour in `assets/style.css`: `.plat-make { --pc: #9b8cf2; }`

## Before you publish, check

- `person.contact.linkedin` is empty — paste your LinkedIn URL.
- `languages` — replace "Indian languages" with the actual languages.
- Client names (DHS, Asset Constructions, Entraco BKS, the laundry company) — make sure each is happy to be named publicly; otherwise describe them generically.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.
