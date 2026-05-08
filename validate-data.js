const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'public/assets/data.json');

try {
  if (!fs.existsSync(dataPath)) {
    console.error('\x1b[31m%s\x1b[0m', 'ERROR: public/assets/data.json not found!');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const info = data.personalInfo;

  if (!info) {
    console.error('\x1b[31m%s\x1b[0m', 'ERROR: "personalInfo" section is missing in data.json');
    process.exit(1);
  }

  const requiredInfoFields = ['fullName', 'email', 'title', 'picture', 'linkedin', 'github'];
  const missingInfoFields = requiredInfoFields.filter(
    (field) => !info[field] || info[field].trim() === '',
  );

  if (missingInfoFields.length > 0) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      `ERROR: Missing required personal information fields: ${missingInfoFields.join(', ')}`,
    );
    process.exit(1);
  }

  if (!data.projects || !Array.isArray(data.projects)) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      'WARNING: "projects" section is missing or invalid in data.json',
    );
    data.projects = [];
  }

  const validProjects = [];
  data.projects.forEach((project, index) => {
    const requiredProjectFields = ['projectName', 'role', 'description', 'githubLink'];
    const missingProjectFields = requiredProjectFields.filter(
      (field) =>
        !project[field] || (typeof project[field] === 'string' && project[field].trim() === ''),
    );

    const hasFeatured = project.featured !== undefined && project.featured !== null;
    const hasHighlights = Array.isArray(project.highlights);

    const tools = project.tools;
    const hasTools =
      tools &&
      typeof tools === 'object' &&
      !Array.isArray(tools) &&
      Array.isArray(tools.languages) &&
      Array.isArray(tools.frameworks) &&
      Array.isArray(tools.databases) &&
      Array.isArray(tools.infrastructure);

    if (missingProjectFields.length > 0 || !hasFeatured || !hasTools || !hasHighlights) {
      console.warn(
        '\x1b[33m%s\x1b[0m',
        `WARNING: Project at index ${index} ("${project.projectName || 'Unknown'}") is missing required fields (strings, featured, or categorized tools) and will be hidden.`,
      );
    } else {
      validProjects.push(project);
    }
  });

  if (validProjects.length === 0 && data.projects.length > 0) {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      'WARNING: All projects in data.json are invalid and will be hidden.',
    );
  }

  console.log('\x1b[32m%s\x1b[0m', '✓ Portfolio data validation completed.');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', `ERROR: Failed to validate data.json: ${error.message}`);
  process.exit(1);
}
