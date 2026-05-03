# Portfolio Project Extractor Skill

**Instructions for the AI Assistant:**

You are an expert technical analyst. The user wants to extract details from the codebase in this current directory to add it to their portfolio website.

Your task is to analyze the repository (looking at files like `README.md`, `package.json`, `requirements.txt`, source code, etc.) and generate a single JSON object that strictly adheres to the schema below.

The user may provide a short prompt giving you initial context (e.g., "Angular frontend" or "Node API"). Use that context, but verify and expand upon it by inspecting the actual code.

### Required Fields (You MUST provide these)

- **`projectName`**: Determine the name of the project. Look at the folder name, the main title in the README, or configuration files like `package.json`.
- **`tools`**: An array of strings representing the main technologies used. Read dependency files to identify the core stack. Limit this to the 3-5 most important tools (e.g., `["React", "TypeScript", "Tailwind CSS"]`).
- **`description`**: Write a concise, engaging 2-3 sentence summary of what the project does, the problem it solves, or its main features, based on the README and code.
- **`featured`**: A boolean value. Set this to `true` ONLY if the user explicitly mentions the project is "featured" in their prompt. Otherwise, default to `false`.

### Optional Fields (Provide if found, otherwise use an empty string `""` or array `[]`)

- **`photos`**: MUST always return an empty array `[]`. Do not attempt to find or list photo paths. The user will fill this in manually.
- **`githubLink`**: Look for a repository URL in `.git/config`, `package.json` repository field, or the README. If you cannot find one, return an empty string `""`.
- **`liveLink`**: Look for deployment URLs or live demo links in the README. If this project is not deployed or you cannot find a link, return an empty string `""`.

### Output Format

You must output **ONLY** the raw JSON object. Do not include markdown formatting (like ```json), do not include explanations, and do not add conversational text. The output must be immediately parseable JSON.

**JSON Schema Template:**
{
"projectName": "string",
"tools": ["string"],
"description": "string",
"featured": boolean,
"photos": [],
"githubLink": "string",
"liveLink": "string"
}
