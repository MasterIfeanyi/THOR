# Contributing to THOR

Thank you for your interest in contributing to THOR! We welcome contributions from everyone, regardless of experience level.

## 🎯 Who Can Contribute?

**You don't need to be a coding expert!** If you can write in Markdown, you can contribute to THOR. We especially welcome:

- **Documentation writers** - Improve existing docs or add new guides
- **Developers** - Fix bugs, add features, improve performance
- **Designers** - Enhance UI/UX
- **Testers** - Report bugs and test new features
- **Community members** - Answer questions, help newcomers

## 📝 Types of Contributions

### Documentation (Markdown)

- Write new tutorials or guides
- Fix typos and grammar errors
- Improve clarity and readability
- Add code examples
- Translate documentation

### Code

- Fix bugs
- Add new features
- Improve performance
- Enhance accessibility
- Write tests

### Design

- Improve UI components
- Enhance user experience
- Create graphics or diagrams

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the [THOR repository](https://github.com/MasterIfeanyi/THOR).

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/THOR.git
cd THOR
```

### 3. Create a Branch

```bash
git checkout -b your-branch-name
```

Use descriptive branch names:

- `docs/add-markdown-guide`
- `fix/sidebar-scroll-issue`
- `feature/search-functionality`

### 4. Make Your Changes

#### For Documentation:

- Navigate to the `docs/` folder
- Edit or create `.md` (Markdown) files
- Follow our [Markdown Style Guide](#markdown-style-guide)

#### For Code:

- Follow existing code style
- Test your changes locally
- Ensure no build errors

### 5. Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to preview your changes.

### 6. Commit Your Changes

```bash
git add .
git commit -m "Brief description of your changes"
```

**Good commit messages:**

- ✅ `docs: add contributing guidelines`
- ✅ `fix: resolve sidebar width issue`
- ✅ `feat: add search functionality`

**Bad commit messages:**

- ❌ `update`
- ❌ `fixed stuff`
- ❌ `changes`

### 7. Push to Your Fork

```bash
git push origin your-branch-name
```

### 8. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill in the PR template with:
   - What changes you made
   - Why you made them
   - Any relevant issue numbers

## 📋 Markdown Style Guide

### File Structure

- Use lowercase with hyphens: `getting-started.md`, `api-reference.md`
- Place files in appropriate folders under `docs/`

### Formatting

```markdown
# Main Title (H1) - Only one per page

## Section Heading (H2)

### Subsection (H3)

**Bold text** for emphasis
*Italic text* for terms
`inline code` for commands/code
```

### Code Blocks

````markdown
```javascript
    // Always specify the language
    const example = "Like this";
```
````

### Links

```markdown
    [Link text](url)
    [Internal link](/docs/getting-started)
```

### Lists

```markdown
    - Use hyphens for unordered lists
    - Keep items concise
    - Use proper punctuation

    1. Use numbers for ordered lists
    2. Follow sequential order
    3. Keep steps clear
```

## 🎨 Code Style Guidelines

### JavaScript/React

- Use functional components with hooks
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused

### CSS

- Use Tailwind utility classes
- Follow the design system in `globals.css`
- Use CSS variables for colors

### File Naming

- Components: `PascalCase.jsx` (e.g., `Sidebar.jsx`)
- Utilities: `camelCase.js` (e.g., `navigation.js`)
- Docs: `kebab-case.md` (e.g., `quick-start.md`)

## ✅ Pull Request Guidelines

### Before Submitting

- [ ] Test your changes locally
- [ ] Check for spelling/grammar errors
- [ ] Ensure no console errors
- [ ] Follow style guidelines
- [ ] Update relevant documentation

### PR Description Should Include

- **What**: Brief description of changes
- **Why**: Reason for the changes
- **How**: How you implemented it
- **Testing**: How you tested it

### Example PR Description

```markdown
    ## What
    Added a new guide for Markdown syntax

    ## Why
    New contributors needed guidance on writing documentation

    ## How
    Created a comprehensive Markdown guide with examples

    ## Testing
    - Tested locally with `npm run dev`
    - Verified all examples render correctly
    - Checked for broken links
```

## 🐛 Reporting Bugs

Found a bug? Help us fix it!

1. Check if the bug is already reported in [Issues](https://github.com/MasterIfeanyi/THOR/issues)
2. If not, create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, Node version)

## 💡 Suggesting Features

Have an idea? We'd love to hear it!

1. Check existing [Issues](https://github.com/MasterIfeanyi/THOR/issues) and [Discussions](https://github.com/MasterIfeanyi/THOR/discussions)
2. Create a new issue with:
   - Clear description
   - Use case
   - Why it's valuable
   - Potential implementation ideas

## 🤝 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal attacks
- Publishing others' private information

## 📞 Getting Help

- **Questions?** Open a [Discussion](https://github.com/MasterIfeanyi/THOR/discussions)
- **Stuck?** Ask in your PR or issue
- **Need guidance?** Tag maintainers

## 🎉 Recognition

All contributors are automatically displayed on our [Community page](https://thor-docs.com/community) once their PR is merged. No need to add yourself manually!

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for making THOR better! Every contribution, no matter how small, makes a difference.** 