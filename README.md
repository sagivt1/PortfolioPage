# 🚀 Modern Developer Portfolio Template

A high-performance, data-driven portfolio application built with **Angular 21**, **Vite**, and **Vitest**.

This project is designed to be a completely reusable template. You don't need to write complex Angular code to make it your own; all content is managed via a simple JSON file. It is optimized for speed, SEO, and zero-configuration deployment to Cloudflare Pages.

---

## ✨ Features

- **Data-Driven Content:** Manage your entire portfolio (skills, projects, bio) from a single `data.json` file.
- **Pre-configured SEO:** Built-in meta tags and Open Graph support for professional sharing on LinkedIn and Twitter.
- **Blazing Fast:** Powered by Angular 21's application builder and Vite.
- **Docker Ready:** Includes `Dockerfile` and `docker-compose.yml` for isolated local testing and deployment.
- **AI-Assisted Generation:** Includes a custom prompt skill to let AI automatically generate your project data from your other repositories.
- **Cloudflare Ready:** Pre-configured with `_redirects` for seamless SPA routing on Cloudflare Pages.

---

## 🛠️ How to Use This Template

### 1. Fork and Clone

1. Click the **Fork** button at the top-right of this GitHub page.
2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PortfolioPage.git
   cd PortfolioPage
   ```

### 2. Customize Your Data

The application will automatically build your site based on `public/assets/data.json`.

1. **Personal Details:** Update the `personalInfo` section with your name, title, and social links.
2. **Projects:** Add your work to the `projects` array.
3. **Images:**
   - Replace `public/assets/profile.png` with your own professional headshot.
   - Add your project screenshots to `public/assets/screenshot/`.
4. **SEO:** Open `src/index.html` and update the `<title>` and `<meta name="description">` tags to reflect your name and profession.

---

## 🤖 Automated Project Generation (AI Skill)

You can use **any AI Agent** (like ChatGPT, Claude, Gemini, Cursor, etc.) to automatically analyze your other codebases and generate the JSON data for your portfolio.

1. Open the `portfolio-export-skill.md` file in this repository and copy its entire content.
2. Provide this content to your AI Agent and tell it to use these instructions.
3. Give your AI Agent the codebase of the project you want to feature, along with the following prompt:

**Prompt to use:**

> "Please analyze this codebase and generate the portfolio project JSON by following the instructions from the portfolio export skill.
>
> **Context:**
>
> - **Role:** [e.g., Lead Developer, Full Stack Engineer]
> - **Infrastructure:** [e.g., AWS, GitHub Actions, Vercel]
> - **Key Highlights:** [e.g., Focus on React, TypeScript, Performance optimization]
> - **Featured status:** [Yes/No]
>
> Output ONLY the raw JSON."

---

## 💻 Local Development

### Prerequisites

- Node.js 22+
- npm 10+

### Setup

Install the dependencies and start the development server:

```bash
npm install
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files or `data.json`.

---

## 🐳 Docker & Testing

The project is fully Dockerized, making it easy to test the production build locally in an isolated environment before deploying.

### Using Docker Compose (Recommended)

This will build the Angular application and serve it using a lightweight Nginx container.

```bash
# Build and start the container in the background
docker-compose up -d --build

# View the live portfolio
# Open http://localhost in your browser
```

To stop the container:

```bash
docker-compose down
```

### Using standard Docker commands

```bash
docker build -t my-portfolio .
docker run -p 80:80 my-portfolio
```

---

## 🌐 Production Deployment (Cloudflare Pages)

This project is highly optimized for [Cloudflare Pages](https://pages.cloudflare.com/) (free, global edge hosting).

### Deployment Steps

1. Push your customized code to your GitHub repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your `PortfolioPage` repository.
5. Use these exact **Build settings**:
   - **Framework preset:** `Angular`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/PortfolioPage/browser`
6. Click **Save and Deploy**.

_Note: The project includes a `public/_redirects` file to ensure client-side routing works flawlessly on Cloudflare._

---

## ⌨️ Available Scripts

- **`npm start`**: Runs the development server. Includes pre-start data validation.
- **`npm run build`**: Compiles the application for production into the `dist/` folder.
- **`npm test`**: Runs unit tests via Vitest.
- **`npm run lint`**: Checks code formatting via Prettier.

---

## 📝 License

This project is open-source. Feel free to use it, fork it, and modify it for your own personal portfolio!
