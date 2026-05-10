# PortfolioPage

Modern, high-performance portfolio application built with Angular 21, Vite, and Vitest.

## Getting Started

1.  **Fork and Clone:** Fork this repository and clone it to your local machine.
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run Development Server:**
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200/`.

## Updating Portfolio Content

Your portfolio is data-driven. Modify `public/assets/data.json` to customize your profile.

### Personal Information
Update the `personalInfo` object in `data.json` with your details. All fields are mandatory.

### Projects
Add your projects to the `projects` array. 
*   **Photos:** Place project screenshots in `public/assets/screenshot/` and reference them in your JSON.
*   **Profile Picture:** Place your headshot in `public/assets/profile.png`.

### Automated Project Extraction
To generate JSON for your existing repositories, use the **Portfolio Project Extractor** skill with Gemini CLI:

> "Please analyze this codebase and generate the portfolio project JSON by following the instructions in `portfolio-export-skill.md`.
>
> **Context:**
> - **Role:** [e.g., Lead Developer]
> - **Infrastructure:** [e.g., AWS, GitHub Actions]
> - **Key Highlights:** [e.g., Focus on React/TypeScript]
> - **Featured status:** [Yes/No]
>
> Output ONLY the raw JSON."

## Production Deployment (Cloudflare Pages)

This project is optimized for [Cloudflare Pages](https://pages.cloudflare.com/).

### 1. Prerequisites
*   Ensure your code is pushed to a Git provider (GitHub, GitLab, or Bitbucket).
*   The `public/_redirects` file is already included to handle SPA routing (redirecting all paths to `index.html`).

### 2. Deployment Steps
1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3.  Select your repository.
4.  Use the following **Build settings**:
    *   **Framework preset:** `Angular` (or `None`)
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist/portfolio-page/browser`
5.  Click **Save and Deploy**.

### 3. SEO & Customization
*   Update `src/index.html` with your name and description in the `<title>` and `<meta>` tags.
*   Update `public/robots.txt` if you wish to change search engine crawling behavior.

## Technical Commands

*   **Build:** `npm run build` (Compiles the application into `dist/`).
*   **Test:** `npm test` (Runs Vitest unit tests).
*   **Lint:** `npm run lint` (Checks formatting via Prettier).
*   **Validation:** The project includes a `validate-data.js` script that runs automatically before `start` and `build` to ensure your `data.json` is correctly formatted.
