# 🚀 Modern Developer Portfolio Template

A high-performance, data-driven portfolio application built with **Angular 21**, **Vite**, and **Vitest**.

This project is designed to be a completely reusable template. You are highly encouraged to fork this repository and modify the code and design as you see fit to truly make it your own! While all content is easily managed via a simple JSON file, changing the core template itself is incredibly straightforward, especially when using AI coding assistants. It is optimized for speed, SEO, and zero-configuration deployment to Cloudflare Pages.

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

The entire application is driven by the `public/assets/data.json` file. You do not need to write any Angular code to update your portfolio.

**💡 Pro Tip:** The fastest way to customize this template is to give this repository to an AI Assistant (like Gemini, Claude, or Cursor) and ask it to do the steps below for you!

1. **Personal Details:**
   - **What to do:** Open `public/assets/data.json` and update the `personalInfo` object.
   - **Why:** This data populates the hero section (your name, title, email) and the links for your GitHub and LinkedIn buttons.

2. **Images & Assets:**
   - **What to do:** Replace `public/assets/profile.png` with your own professional headshot. Place screenshots of your projects inside the `public/assets/screenshot/` folder.
   - **Important:** Use a consistent naming scheme for screenshots (e.g., `EcoTrack01.png`, `EcoTrack02.png`).
   - **Why:** Clear naming makes it trivial for an AI assistant to automatically map the images to the correct projects in your JSON file.

3. **Projects:**
   - **What to do:** Add your projects to the `projects` array inside `data.json`.
   - **How to do it with AI:**
     1. First, use the `portfolio-export-skill.md` (detailed below) to have an AI generate the raw JSON data directly from your project's codebase.
     2. Upload your screenshots to the `screenshot/` folder.
     3. Give the generated JSON to your AI assistant and prompt it: _"Please add this new project to my `data.json` file and link the screenshots I just uploaded based on the project's name."_

4. **SEO (Search Engine Optimization):**
   - **What to do:** Open `src/index.html` and modify the `<title>` and `<meta name="description">` tags.
   - **Why:** This ensures that when you share your portfolio link on LinkedIn or when recruiters find you on Google, they see your correct name and a professional summary.

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
5. **Important:** On the next screen, change the **Project Name** to your own name (e.g., `sagivtalker`). This ensures your live URL is professional (e.g., `https://sagivtalker.pages.dev/`) instead of a random or generic one.
6. Use these exact **Build settings**:
   - **Framework preset:** `Angular`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/PortfolioPage/browser`
7. Click **Save and Deploy**.

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
