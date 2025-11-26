# Contributing to Copera.ai Node.js SDK

Thank you for considering contributing to the Copera.ai Node.js SDK! We appreciate your time and effort in helping improve this project.

This guide provides guidelines for contributing to this SDK. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Before You Start: The Importance of Issues](#before-you-start-the-importance-of-issues)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Code Contribution Process](#code-contribution-process)
- [Semantic Versioning (when using Changesets)](#semantic-versioning-when-using-changesets)
- [Code Review](#code-review)
- [What We Expect from Contributors](#what-we-expect-from-contributors)
- [What to Avoid](#what-to-avoid)
- [Security Issues](#security-issues)
- [Questions or Suggestions about the Contribution Process?](#questions-or-suggestions-about-the-contribution-process)

## Code of Conduct

This project and everyone participating in it is governed by the [Copera.ai Code of Conduct](./CODE_OF_CONDUCT.md) (or the link to the centralized `CODE_OF_CONDUCT.md` file, if applicable). By participating, you are expected to uphold this code. Please report unacceptable behavior to support@copera.ai.

A respectful and collaborative environment is fundamental.

## Before You Start: The Importance of Issues

Copera.ai's SDKs are **open source** projects, maintained with rigor to ensure quality, security, and consistency.

**It is mandatory to open a GitHub Issue before starting development on any Pull Request (PR)**, except for extremely simple corrections (e.g., typos in documentation).

*   **Why?**
    *   To describe your proposal (bug, feature, improvement) and align with maintainers and the community.
    *   To ensure your contribution aligns with the official roadmap and project priorities.
    *   To avoid rework or developing something that is already being done or doesn't fit the SDK's goals.

*   **How to proceed:**
    *   Check existing issues to ensure your idea or the bug you found hasn't already been reported.
    *   Use the Issue templates provided in the repository (Bug Report, Feature Request) to provide all necessary details.
    *   **Do not start development before receiving feedback or approval on the opened Issue.**

## How Can I Contribute?

There are many ways to contribute:

*   **Reporting Bugs:** If you find a bug, please let us know by opening a detailed issue.
*   **Suggesting Enhancements or New Features:** Have an idea for a new feature or an improvement to an existing one? Open an issue for discussion.
*   **Writing or Improving Documentation:** Clear documentation is crucial. Contributions to READMEs, code examples, or guides are very welcome.
*   **Submitting Code:** Contribute bug fixes or new feature implementations through Pull Requests.

### Your First Code Contribution

Not sure where to start? You can look for issues tagged with `good first issue` or `help wanted` in the specific SDK repository:

*   **Good first issues:** Usually minor problems that should only require a few lines of code and one or two tests, ideal for those new to contributing.
*   **Help wanted issues:** May be a bit more involved, but are tasks that maintainers have identified as good opportunities for community contributions.

## Code Contribution Process

1.  **Open an Issue:** As mentioned, this is the mandatory first step.

2.  **Fork and Clone the Repository:**
    *   Fork the `Copera-ai/copera-nodejs-sdk` repository to your personal GitHub account.
    *   Clone your fork locally: `git clone git@github.com:YOUR_USERNAME/copera-nodejs-sdk.git`

3.  **Create a Branch:**
    *   Navigate to your local clone's directory.
    *   Create a new branch from the `develop` branch.
        ```bash
        git checkout develop
        git pull origin develop --rebase # Ensure your local develop is up-to-date
        git checkout -b your-branch-name # Ex: feature/add-new-endpoint or fix/bug-123
        ```

4.  **Set Up Environment and Install Dependencies:**
    *   Ensure you have Node.js 22+ and pnpm installed.
    *   Install dependencies:
        ```bash
        pnpm install
        ```

5.  **Develop Your Contribution:**
    *   Write clear, concise, and well-commented code.
    *   Follow the project's coding style (we use Biome for linting and formatting).
    *   **Add Tests:** Your contribution must include tests covering the changes made. Ensure all existing tests continue to pass.
        ```bash
        pnpm test
        ```
    *   **Update Documentation:** If your change impacts how the SDK is used or adds new functionality, update the `README.md` and any other relevant documentation.

6.  **Follow Commit Guidelines:**
    *   Make atomic commits with clear messages, following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
        *   Examples: `feat: add getBoardDetails endpoint`, `fix: correct error handling in sendMessage (#123)`, `docs: update usage examples`.
    *   **Never expose tokens or credentials in commits!**

7.  **Create a Changeset:**
    *   This project uses `changesets` to manage versioning and changelog. Create a changeset to document your changes:
        ```bash
        pnpm changeset
        ```
    *   Select the type of change (patch, minor, major) according to [Semantic Versioning](#semantic-versioning) and describe your changes.

8.  **Local Validation:**
    *   Run the linter:
        ```bash
        pnpm lint
        ```
    *   Run type checking:
        ```bash
        pnpm typecheck
        ```
    *   Ensure all tests pass:
        ```bash
        pnpm test
        ```

9.  **Keep Your Branch Updated:**
    *   Before submitting the PR, update your branch with the `develop` branch from the original (`upstream`) repository:
        ```bash
        git fetch upstream # If you haven't configured upstream: git remote add upstream git@github.com:Copera-ai/copera-nodejs-sdk.git
        git rebase upstream/develop
        ```

10. **Submit the Pull Request (PR):**
    *   Push your branch to your fork on GitHub: `git push origin your-branch-name`.
    *   Open a Pull Request on GitHub from your branch in your fork to the `develop` branch of the `Copera-ai/copera-nodejs-sdk` repository.
    *   Fill out the provided Pull Request template, detailing your changes and the related Issue.

## Semantic Versioning

When running `pnpm changeset`, select the type of change according to semantic versioning (MAJOR.MINOR.PATCH):

*   **patch:** Bug fixes or small, backward-compatible changes. Examples: fixing a bug, performance improvements, internal refactoring.

*   **minor:** Backward-compatible addition of functionality. Examples: new API endpoints, optional parameters, new features that don't break existing code.

*   **major:** Breaking changes that affect backward compatibility. Examples: removing methods or parameters, changing function signatures, changing response types that might break existing integrations.

## Code Review

*   After submitting the PR, maintainers will review it.
*   Be prepared to respond to comments, discuss your choices, and make additional changes requested by reviewers.
*   The goal of the review is to ensure the quality, consistency, and security of the code.
*   Respect the review processes and feedback from maintainers.
*   Do not ignore failures in the CI/CD pipeline. If automatic checks fail, investigate and fix the problems in your branch.

## What We Expect from Contributors

*   Clear and respectful communication.
*   Adherence to the Issues-before-PRs process.
*   Clear, objective commits following Conventional Commits.
*   Clean, well-documented code that passes linting and type checking.
*   Adequate test coverage for new features and bug fixes.
*   Documentation updated whenever necessary.
*   Well-described Pull Requests linked to the corresponding Issue.

## What to Avoid

*   Starting Pull Requests without an approved Issue (except for trivial fixes).
*   Submitting generic PRs or those involving multiple unrelated changes. Create focused PRs.
*   Using vague commit messages like "adjustments," "update," "changes."
*   Ignoring failures in the CI/CD pipeline or reviewer feedback.
*   Disregarding established standards for code, tests, and documentation.
*   Exposing tokens, API keys, or any other credentials in commits or code.

## Security Issues

If you discover a security vulnerability within this project, please follow our [Security Policy](./SECURITY.md) (or the link to the centralized `SECURITY.md` file). **Do not report security vulnerabilities through public issues.**

## Development Tips

### Project Structure

*   `src/index.ts` - Main entry point and SDK initialization
*   `src/services/` - API endpoint implementations organized by resource
*   `src/types.ts` - TypeScript type definitions
*   `src/requests.ts` - HTTP client implementation
*   `src/__tests__/` - Test files

### Adding New Endpoints

When adding a new API endpoint:

1.  Add types to `src/types.ts`
2.  Create a new service file in the appropriate `src/services/` subdirectory
3.  Use the Factory Pattern: export a `create*` function that returns the handler
4.  Add the handler to the service index file
5.  Add comprehensive tests in `src/__tests__/`

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Questions or Suggestions?

If you have questions about this process or want to discuss an idea before opening a formal Issue, feel free to use the repository's Discussions section or open an Issue.

Thank you for contributing to the Copera.ai Node.js SDK!
