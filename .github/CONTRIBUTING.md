# Contributing to GitHub Unfollow Checker

GitHub Unfollow Checker welcomes contributions from anyone willing to help 🤝

## Reporting issues

- Before opening a new issue, first [search for existing issues](https://github.com/gustavomorinaga/github-unfollower-checker/issues) to avoid duplications.
- Provide detailed reports to make things easier for maintainers.
- If there's a weird bug, please provide a reproduction repository on GitHub.

## Fixing existing issues

- You can help by [fixing existing issues](https://github.com/gustavomorinaga/github-unfollower-checker/issues).
- Don't work on issues assigned to others (to avoid duplicate efforts).
- Before starting to work on an issue, please first add a comment and ask to get assigned to that issue. This way everyone will know you're working on that and it avoids duplicate efforts.
- Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org) format.

## Feature requests

- If you have an idea to discuss with the community, please [open a discussion](https://github.com/gustavomorinaga/github-unfollower-checker/discussions).
- For feature requests, [open a new issue](https://github.com/gustavomorinaga/github-unfollower-checker/issues/new).
- All feature requests may not fit this project and some may get rejected. Don't take it personally.

## Pull requests

- A pull request must fix [an open issue](https://github.com/gustavomorinaga/github-unfollower-checker/issues?q=is%3Aissue+is%3Aopen) **assigned to you**. If there's no issue, please create one first. If it's not assigned to you, please ask for it in the comments. This is for avoiding duplicate efforts.

## Development setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.x or newer)
- [pnpm](https://pnpm.io/) (v9.x or newer)
- [Visual Studio Code](https://code.visualstudio.com/) (or another code editor)
- [Google Chrome](https://www.google.com/chrome/) (or another browser)

### Installing

1. [Fork](https://github.com/gustavomorinaga/github-unfollow-checker/tree/next) and clone the repository on local - only fork the `next` branch.

2. Install the dependencies:

```bash
pnpm install
```

3. Configure the environment variables with your own values, look for the [`.env.example`](/.env.example) file and create a new one named `.env`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
pnpm dev
```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

6. You should see the website up and running.

7. Make your changes and see the results in real-time.

8. Happy coding! 🎉

### Available scripts

| Command                 | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `pnpm dev`              | Start the development server.                        |
| `pnpm start`            | Start the production server.                         |
| `pnpm build`            | Build the project for production.                    |
| `pnpm lint`             | Lint the project files.                              |
| `pnpm lint:fix`         | Lint and fix the project files.                      |
| `pnpm format`           | Format the project files.                            |
| `pnpm format:staged`    | Format the staged project files.                     |
| `pnpm test`             | Run tests.                                           |
| `pnpm test:watch`       | Run tests in watch mode.                             |
| `pnpm type-check`       | Check TypeScript types.                              |
| `pnpm clean`            | Clean the project.                                   |
| `pnpm clean:cache`      | Clean the project cache.                             |
| `pnpm clean:modules`    | Clean the project modules.                           |
| `pnpm clean:vercel`     | Clean the Vercel deployment files.                   |
| `pnpm ui:add`           | Add a new shadcn/ui component.                       |
| `pnpm up`               | Update dependencies interactively.                   |
| `pnpm up-latest`        | Update dependencies to the latest versions.          |
| `pnpm release`          | Release the project.                                 |
| `pnpm release-as-major` | Release the project as a major version.              |
| `pnpm release-as-minor` | Release the project as a minor version.              |
| `pnpm release-as-patch` | Release the project as a patch version.              |
| `pnpm push-release`     | Push the release tags to the remote repository.      |
| `pnpm pull`             | Rebase the local branch with the remote main branch. |
| `pnpm pre-commit`       | Run lint before committing.                          |
| `pnpm prepare`          | Prepare the project.                                 |
| `pnpm preinstall`       | Ensure pnpm is used as the package manager.          |
