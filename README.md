# Summize — AI Article Summarizer

Paste any article URL and get a concise summary powered by AI. Search history is saved locally in your browser.

🔗 **Live site:** https://ai-summarizer-liard-two.vercel.app

---

## Tech Stack

- **React 18 + Vite**
- **Redux Toolkit + RTK Query** — API state management
- **Tailwind CSS** — styling
- **RapidAPI** (Article Extractor and Summarizer) — article extraction + summarization
- **localStorage** — search history persistence
- **Vercel** — hosting + CD

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Vlad-Bakumenko/ai-summarizer.git
cd ai-summarizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_RAPID_API_ARTICLE_KEY=your_rapidapi_key_here
```

Get your key from [RapidAPI — Article Extractor and Summarizer](https://rapidapi.com/restyler/api/article-extractor-and-summarizer).

### 4. Run locally

```bash
npm run dev
```

## CI/CD

- **GitHub Actions** — lint + build runs on every PR to `main`
- **Vercel** — auto-deploys on merge to `main`

Add `VITE_RAPID_API_ARTICLE_KEY` to both GitHub Actions secrets and Vercel environment variables before deploying.
