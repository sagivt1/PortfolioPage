# 🚀 Portfolio Template

A modern, high-performance portfolio application built with **Angular 21**, **Vite**, and **Vitest**. This project is designed to be easily forkable and deployable in minutes.

---

## 🛠️ How to Use This Template

Follow these steps to create and deploy your own professional portfolio.

### 1. Fork and Clone

1.  Click the **Fork** button at the top-right of this page to create a copy in your own GitHub account.
2.  Clone your forked repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/PortfolioPage.git
    cd PortfolioPage
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### 2. Customize Your Data

The entire application is data-driven. You don't need to write complex Angular code to update your info.

1.  **Personal Details:** Open `public/assets/data.json` and update the `personalInfo` section with your name, title, and social links.
2.  **Projects:** Add your work to the `projects` array in the same `data.json` file.
3.  **Images:**
    - Replace `public/assets/profile.png` with your own headshot.
    - Add your project screenshots to `public/assets/screenshot/`.
4.  **SEO:** Open `src/index.html` and update the `<title>` and `<meta>` tags so search engines display your name correctly.

### 3. Automated Project Generation

If you use **Gemini CLI**, you can use the built-in `portfolio-export-skill.md` to automatically generate the JSON for your projects by pointing it at your other repositories.

**Prompt to use:**

> "Please analyze this codebase and generate the portfolio project JSON by following the instructions in `portfolio-export-skill.md`."

### 4. Test Locally

Run the development server to see your changes:

```bash
npm start
```

Navigate to `http://localhost:4200/`.

---

## 🌐 Production Deployment (Cloudflare Pages)

This project is optimized for [Cloudflare Pages](https://pages.cloudflare.com/) for free, global, and fast hosting.

### Deployment Steps

1.  Push your changes to your GitHub fork.
2.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3.  Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4.  Select your `PortfolioPage` repository.
5.  Use these **Build settings**:
    - **Framework preset:** `Angular`
    - **Build command:** `npm run build`
    - **Build output directory:** `dist/portfolio-page/browser`
6.  Click **Save and Deploy**.

_Note: The project includes a `public/_redirects` file which handles all routing automatically for you._

---

## ⌨️ Technical Commands

- **Start:** `npm start` (Runs dev server + data validation).
- **Build:** `npm run build` (Compiles the application for production).
- **Test:** `npm test` (Runs unit tests).
- **Lint:** `npm run lint` (Checks code formatting).

---

## 📝 License

This project is open-source. Feel free to use it for your personal portfolio!
