<p align="center">
 <img align="center" src="/public/assets/images/logo.png" alt="GitHub Unfollow Checker Logo" height="96" />
 <h1 align="center">GitHub Unfollow Checker</h1>
</p>

<p align="center">
 A simple tool to check the users that doesn't follow you back 🧐
</p>

<p align="center">
 <a href="https://nextjs.org" title="Open Next.js Website">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Made with Next.js" />
 </a>
 <a href="https://www.typescriptlang.org/docs" title="Open TypeScript Website">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Made with TypeScript" />
 </a>
 <a href="https://tailwindcss.com" title="Open Tailwind CSS Website">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Made with Tailwind CSS" />
 </a>
</p>

## 📖 Introduction

This tool allows you to check and unfollow the users that don't follow you back on GitHub.

One of the schemes that some social media users use to earn more followers is to follow the person and then stop following later on. And it looks like this scheme is being used here on GitHub as well.

To find those users who use such a scheme, this tool will help you with that!

## ✨ Features

- **Authentication**: Authenticate with your GitHub account.
- **Unfollowers**: Check the users that don't follow you back.
- **Not Mutuals**: Check the users that you don't follow back.
- **Followers**: Check the users that follow you.
- **Following**: Check the users that you follow.
- **Whitelist**: Add users to the whitelist to avoid unfollowing them.
- **Manage Users**: Follow, unfollow, and add users to the whitelist.
- **Search Users**: Search for users by username.
- **Dark Mode**: Toggle between light and dark mode.
- **Responsive Design**: Works on all devices.

## ⚙️ Tech Stack

| Dependency                                                                                             | Category     | Description                                                                          |
| ------------------------------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------ |
| [@commitlint/cli](https://commitlint.js.org/)                                                          | Tool         | Lint commit messages.                                                                |
| [@commitlint/config-conventional](https://commitlint.js.org/)                                          | Tool         | Shareable commitlint config enforcing conventional commits.                          |
| [@eslint/eslintrc](https://eslint.org/docs/latest/use/configure/)                                      | Tool         | ESLint configuration API.                                                            |
| [@eslint/js](https://eslint.org/docs/latest/use/configure/)                                            | Tool         | ESLint's JavaScript API.                                                             |
| [@mdx-js/loader](https://mdxjs.com/)                                                                   | Build Tool   | MDX loader for webpack.                                                              |
| [@mdx-js/react](https://mdxjs.com/)                                                                    | Library      | React integration for MDX.                                                           |
| [@next/eslint-plugin-next](https://nextjs.org/docs/basic-features/eslint)                              | Plugin       | ESLint plugin for Next.js.                                                           |
| [@next/mdx](https://nextjs.org/docs/advanced-features/using-mdx)                                       | Framework    | MDX support for Next.js.                                                             |
| [@radix-ui/react-alert-dialog](https://www.radix-ui.com/docs/primitives/components/alert-dialog)       | UI Component | Radix UI Alert Dialog component.                                                     |
| [@radix-ui/react-avatar](https://www.radix-ui.com/docs/primitives/components/avatar)                   | UI Component | Radix UI Avatar component.                                                           |
| [@radix-ui/react-checkbox](https://www.radix-ui.com/docs/primitives/components/checkbox)               | UI Component | Radix UI Checkbox component.                                                         |
| [@radix-ui/react-dropdown-menu](https://www.radix-ui.com/docs/primitives/components/dropdown-menu)     | UI Component | Radix UI Dropdown Menu component.                                                    |
| [@radix-ui/react-label](https://www.radix-ui.com/docs/primitives/components/label)                     | UI Component | Radix UI Label component.                                                            |
| [@radix-ui/react-navigation-menu](https://www.radix-ui.com/docs/primitives/components/navigation-menu) | UI Component | Radix UI Navigation Menu component.                                                  |
| [@radix-ui/react-select](https://www.radix-ui.com/docs/primitives/components/select)                   | UI Component | Radix UI Select component.                                                           |
| [@radix-ui/react-slot](https://www.radix-ui.com/docs/primitives/components/slot)                       | UI Component | Radix UI Slot component.                                                             |
| [@tailwindcss/postcss](https://tailwindcss.com/docs/using-with-preprocessors)                          | Plugin       | Tailwind CSS PostCSS plugin.                                                         |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)                              | Plugin       | Tailwind CSS Typography plugin.                                                      |
| [@tanstack/react-table](https://tanstack.com/table/v8)                                                 | Library      | Headless UI for building tables in React.                                            |
| [@types/mdx](https://mdxjs.com/)                                                                       | Types        | TypeScript definitions for MDX.                                                      |
| [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)               | Types        | TypeScript definitions for Node.js.                                                  |
| [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)             | Types        | TypeScript definitions for React.                                                    |
| [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/)                                      | Plugin       | TypeScript plugin for ESLint.                                                        |
| [@typescript-eslint/parser](https://typescript-eslint.io/)                                             | Plugin       | TypeScript parser for ESLint.                                                        |
| [class-variance-authority](https://github.com/joe-bell/cva)                                            | Utility      | Utility for managing class variance in CSS.                                          |
| [clsx](https://github.com/lukeed/clsx)                                                                 | Utility      | A tiny utility for constructing `className` strings conditionally.                   |
| [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version)                   | Tool         | A tool for versioning and tagging releases.                                          |
| [del-cli](https://github.com/sindresorhus/del-cli)                                                     | Tool         | CLI for deleting files and directories.                                              |
| [eslint-config-next](https://nextjs.org/docs/basic-features/eslint)                                    | Plugin       | ESLint configuration for Next.js.                                                    |
| [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)                           | Plugin       | Turns off all rules that are unnecessary or might conflict with Prettier.            |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)                           | Plugin       | Runs Prettier as an ESLint rule and reports differences as individual ESLint issues. |
| [eslint-plugin-react-hooks](https://reactjs.org/docs/hooks-rules.html)                                 | Plugin       | ESLint plugin for React hooks.                                                       |
| [eslint](https://eslint.org/)                                                                          | Tool         | A tool for identifying and reporting on patterns in ECMAScript/JavaScript code.      |
| [husky](https://typicode.github.io/husky/#/)                                                           | Tool         | Git hooks made easy.                                                                 |
| [lint-staged](https://github.com/okonet/lint-staged)                                                   | Tool         | Run linters on git staged files.                                                     |
| [lucide-react](https://lucide.dev/)                                                                    | Library      | Beautiful & consistent icon toolkit made by the community.                           |
| [motion](https://motion.dev/)                                                                          | Library      | A library for animations in React.                                                   |
| [next-auth](https://next-auth.js.org/)                                                                 | Library      | Authentication for Next.js.                                                          |
| [next-themes](https://github.com/pacocoursey/next-themes)                                              | Plugin       | Perfect Next.js dark mode in 2 lines of code.                                        |
| [next](https://nextjs.org/)                                                                            | Framework    | The React Framework for Production.                                                  |
| [postcss](https://postcss.org/)                                                                        | Tool         | A tool for transforming CSS with JavaScript.                                         |
| [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)             | Plugin       | Prettier plugin for Tailwind CSS.                                                    |
| [prettier](https://prettier.io/)                                                                       | Tool         | An opinionated code formatter.                                                       |
| [pretty-quick](https://github.com/azz/pretty-quick)                                                    | Tool         | Runs Prettier on your changed files.                                                 |
| [react-dom](https://reactjs.org/docs/react-dom.html)                                                   | Library      | Serves as the entry point to the DOM and server renderers for React.                 |
| [react](https://reactjs.org/)                                                                          | Library      | A JavaScript library for building user interfaces.                                   |
| [sonner](https://sonner.dev/)                                                                          | Library      | A toast notification library for React.                                              |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge)                                            | Utility      | Utility for merging Tailwind CSS classes.                                            |
| [tailwind-scrollbar](https://github.com/adoxography/tailwind-scrollbar)                                | Plugin       | Tailwind CSS plugin for styling scrollbars.                                          |
| [tailwindcss-animate](https://github.com/benface/tailwindcss-animate)                                  | Plugin       | A Tailwind CSS plugin that provides utilities for animating elements.                |
| [tailwindcss](https://tailwindcss.com/)                                                                | Framework    | A utility-first CSS framework.                                                       |
| [typescript](https://www.typescriptlang.org/)                                                          | Language     | A typed superset of JavaScript that compiles to plain JavaScript.                    |
| [vaul](https://vaul.dev/)                                                                              | Library      | A library for managing secrets in React applications.                                |

## 🚀 Contributing

Contributions are welcome! Please adhere to the guidelines in the [CONTRIBUTING](/.github/CONTRIBUTING.md) file.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

<p align="center">
 ❤️ Thanks for your attention!
</p>
