---
title: "Pull Request Guide | Contributing to Refine"
display_title: "Pull Request Guide"
sidebar_label: "Pull Request Guide"
description: "A comprehensive guide for creating effective pull requests in the Refine repository. Learn how to prepare, submit, and get your PR merged successfully."
---

# Pull Request Guide

This guide walks you through the process of creating a high-quality pull request (PR) for the Refine repository. Following these guidelines will help maintainers review your changes faster and increase the chances of your PR being merged.

## Understanding the Project Architecture

Before contributing, it's important to understand how Refine is structured.

### Monorepo Structure

Refine uses a **monorepo** managed by [Lerna](https://lerna.js.org/) and [pnpm workspaces](https://pnpm.io/workspaces):

```
refine/
├── packages/           # All @refinedev/* packages
│   ├── core/           # @refinedev/core - Core hooks, contexts, providers
│   ├── antd/           # @refinedev/antd - Ant Design UI integration
│   ├── mui/            # @refinedev/mui - Material UI integration
│   ├── mantine/        # @refinedev/mantine - Mantine integration
│   ├── chakra-ui/      # @refinedev/chakra-ui - Chakra UI integration
│   ├── simple-rest/    # @refinedev/simple-rest - REST data provider
│   ├── graphql/        # @refinedev/graphql - GraphQL data provider
│   ├── react-router/   # @refinedev/react-router - React Router integration
│   ├── nextjs-router/  # @refinedev/nextjs-router - Next.js integration
│   └── ...             # Many more packages
├── examples/           # Example applications
├── documentation/      # Docusaurus documentation site
└── cypress/            # E2E tests
```

### Core Package Architecture (`@refinedev/core`)

The core package is the heart of Refine. Understanding its structure is essential:

```
packages/core/src/
├── components/         # React components (Authenticated, CanAccess, etc.)
├── contexts/           # React contexts for all providers
│   ├── auth/           # AuthProvider context & types
│   ├── data/           # DataProvider context & types
│   ├── accessControl/  # AccessControlProvider context
│   ├── notification/   # Notification context
│   ├── i18n/           # Internationalization context
│   ├── live/           # Real-time/live context
│   └── ...
├── hooks/              # All Refine hooks
│   ├── data/           # useList, useOne, useCreate, useUpdate, useDelete
│   ├── auth/           # useLogin, useLogout, useIsAuthenticated
│   ├── form/           # useForm
│   ├── useTable/       # useTable
│   └── ...
├── definitions/        # Helper functions and utilities
└── index.tsx           # Main exports
```

### Key Interfaces

#### DataProvider Interface

The `DataProvider` is the core interface for data operations:

```typescript
type DataProvider = {
  // Required methods
  getList: (params: GetListParams) => Promise<GetListResponse>;
  getOne: (params: GetOneParams) => Promise<GetOneResponse>;
  create: (params: CreateParams) => Promise<CreateResponse>;
  update: (params: UpdateParams) => Promise<UpdateResponse>;
  deleteOne: (params: DeleteOneParams) => Promise<DeleteOneResponse>;
  getApiUrl: () => string;
  
  // Optional methods
  getMany?: (params: GetManyParams) => Promise<GetManyResponse>;
  createMany?: (params: CreateManyParams) => Promise<CreateManyResponse>;
  updateMany?: (params: UpdateManyParams) => Promise<UpdateManyResponse>;
  deleteMany?: (params: DeleteManyParams) => Promise<DeleteManyResponse>;
  custom?: (params: CustomParams) => Promise<CustomResponse>;
};
```

#### AuthProvider Interface

The `AuthProvider` handles authentication:

```typescript
type AuthProvider = {
  // Required methods
  login: (params: any) => Promise<AuthActionResponse>;
  logout: (params: any) => Promise<AuthActionResponse>;
  check: (params?: any) => Promise<CheckResponse>;
  onError: (error: any) => Promise<OnErrorResponse>;
  
  // Optional methods
  register?: (params: any) => Promise<AuthActionResponse>;
  forgotPassword?: (params: any) => Promise<AuthActionResponse>;
  updatePassword?: (params: any) => Promise<AuthActionResponse>;
  getPermissions?: (params?: any) => Promise<PermissionResponse>;
  getIdentity?: (params?: any) => Promise<IdentityResponse>;
};
```

### UI Integration Packages

UI packages (`@refinedev/antd`, `@refinedev/mui`, etc.) follow a similar structure:

```
packages/antd/src/
├── components/         # UI-specific components (List, Create, Edit, Show)
├── hooks/              # UI-specific hooks (useTable, useForm, etc.)
├── providers/          # UI-specific providers (notificationProvider)
├── contexts/           # UI-specific contexts
└── index.tsx           # Main exports
```

### How Data Flows

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│   Component     │────▶│   Refine Hook    │────▶│  DataProvider  │
│  (List, Form)   │     │ (useList, etc.)  │     │   (REST, GQL)  │
└─────────────────┘     └──────────────────┘     └────────────────┘
                               │                        │
                               ▼                        ▼
                        ┌──────────────────┐     ┌────────────────┐
                        │  React Query     │     │    Backend     │
                        │  (Caching)       │     │    API         │
                        └──────────────────┘     └────────────────┘
```

## Before You Start

### 1. Find or Create an Issue

Before starting any work:

- **Check existing issues**: Search [GitHub Issues](https://github.com/refinedev/refine/issues) to see if your bug or feature request already exists
- **Create a new issue**: If no issue exists, create one describing the problem or feature
- **Comment on the issue**: Let others know you're working on it to avoid duplicate effort
- **Wait for feedback**: For larger features, wait for maintainer approval before starting work

### 2. Fork and Clone the Repository

```sh
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/refine.git
cd refine

# Add upstream remote
git remote add upstream https://github.com/refinedev/refine.git
```

### 3. Create a Feature Branch

Always create a new branch for your changes:

```sh
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create a feature branch
git checkout -b feat/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

## Development Workflow

### 1. Install Dependencies

```sh
pnpm install
```

### 2. Build Required Packages

Build only the packages you need to work on:

```sh
pnpm build --scope @refinedev/core --scope @refinedev/antd
```

### 3. Run in Development Mode

```sh
pnpm dev --scope @refinedev/core --scope base-antd
```

### 4. Make Your Changes

- Write clean, readable code following existing patterns
- Add comments for complex logic
- Keep changes focused and minimal
- Split large changes into smaller, logical commits

### 5. Write Tests

Tests are required for all changes:

```sh
# Run tests for a specific package
pnpm test -- --scope @refinedev/core

# Run tests for a specific file
pnpm test -- --scope @refinedev/core -- src/hooks/useForm/index.spec.ts

# Run tests in watch mode
pnpm test -- --scope @refinedev/core -- --watch
```

**Test guidelines:**
- Cover both success and error scenarios
- Test edge cases
- Use descriptive test names
- Follow the existing test patterns in the codebase

### 6. Update Documentation

If your changes affect the API or user-facing behavior:

- Update relevant documentation in `/documentation/docs/`
- Add JSDoc comments to exported functions/components
- Update examples if needed

```sh
# Start documentation in dev mode
cd documentation
pnpm install
pnpm dev:docs
```

## Committing Your Changes

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
<type>(scope): <description>

[optional body]

[optional footer]
```

**Types:**
| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

**Examples:**

```sh
# Feature
git commit -m "feat(core): add useAwesome hook"

# Bug fix
git commit -m "fix(antd): resolve form validation issue on blur"

# Documentation
git commit -m "docs(getting-started): add Vite setup guide"

# Breaking change
git commit -m "feat(core)!: change useForm API signature

BREAKING CHANGE: useForm now requires resource parameter"
```

### Create a Changeset

Changesets are required for all changes that affect packages:

```sh
pnpm changeset
```

You'll be prompted to:
1. Select affected packages
2. Choose version bump type (major/minor/patch)
3. Write a description of the changes

**Changeset example:**

```md title=".changeset/happy-lions-dance.md"
---
"@refinedev/core": minor
---

feat: add `useAwesome` hook for handling awesome operations

The new `useAwesome` hook simplifies awesome operations by providing:
- Automatic state management
- Built-in error handling
- TypeScript support

Resolves #1234
```

**Version bump guidelines:**
| Change Type | Version | When to Use |
|-------------|---------|-------------|
| Breaking changes | `major` | API changes that require user action |
| New features | `minor` | Backward-compatible additions |
| Bug fixes | `patch` | Backward-compatible fixes |

## Creating the Pull Request

### 1. Push Your Branch

```sh
git push origin feat/your-feature-name
```

### 2. Open a Pull Request

Go to [github.com/refinedev/refine](https://github.com/refinedev/refine) and click "New Pull Request".

### 3. Fill Out the PR Template

Complete all sections of the PR template:

```md
## PR Checklist

- [x] The commit message follows our guidelines
- [x] Related issue(s) linked
- [x] Tests for the changes have been added
- [x] Docs have been added / updated
- [x] Changesets have been added

## What is the current behavior?

Describe the current behavior or problem.

## What is the new behavior?

Describe what your PR changes and how it works.

fixes #1234

## Notes for reviewers

Any additional context, questions, or areas you'd like 
reviewers to focus on.
```

### PR Title Format

Follow the same format as commit messages:

```
feat(core): add useAwesome hook
fix(antd): resolve DatePicker timezone issue
docs(tutorial): add authentication section
```

## PR Best Practices

### Do's ✅

- **Keep PRs small and focused** - One feature/fix per PR
- **Write descriptive titles** - Clear and concise
- **Link related issues** - Use `fixes #123` or `closes #123`
- **Include screenshots** - For UI changes
- **Respond to feedback promptly** - Address review comments
- **Keep your branch updated** - Rebase on main regularly
- **Self-review your code** - Check for typos, debug code, etc.

### Don'ts ❌

- **Don't include unrelated changes** - Keep scope minimal
- **Don't force push after review** - Makes it hard to track changes
- **Don't forget tests** - PRs without tests may be rejected
- **Don't ignore CI failures** - Fix all failing checks
- **Don't submit draft work** - Mark as draft if incomplete

## After Submitting

### Review Process

1. **Automated checks** - CI will run tests and linting
2. **Maintainer review** - Usually within a few days
3. **Address feedback** - Make requested changes
4. **Approval** - PR gets approved and labeled `pr-ready`
5. **Merge** - Included in the next monthly release

### Handling Review Feedback

```sh
# Make changes based on feedback
git add .
git commit -m "fix: address review feedback"
git push origin feat/your-feature-name
```

For larger revisions, consider using fixup commits:

```sh
git commit --fixup HEAD~2  # Fixup a specific commit
git rebase -i --autosquash main  # Squash before final merge
```

### Keeping Your Branch Updated

```sh
git fetch upstream
git rebase upstream/main
git push -f origin feat/your-feature-name
```

:::caution
Only force push before your PR has been reviewed. After review, use regular commits to make it easier to track changes.
:::

## Common Issues and Solutions

### CI Failures

| Issue | Solution |
|-------|----------|
| Lint errors | Run `pnpm lint:fix` locally |
| Test failures | Check test output and fix failing tests |
| Type errors | Run `pnpm build` to check TypeScript |
| Missing changeset | Run `pnpm changeset` and commit |

### Merge Conflicts

```sh
git fetch upstream
git rebase upstream/main
# Resolve conflicts in your editor
git add .
git rebase --continue
git push -f origin feat/your-feature-name
```

## Getting Help

If you need help at any point:

- **Discord**: Join our [community](https://discord.gg/refine) for quick questions
- **GitHub Discussions**: For longer discussions and proposals
- **Issue comments**: Ask questions on the related issue

## Release Cycle

Refine follows a **monthly release cycle**:

- PRs merged during the month are included in the next release
- Critical bug fixes may get expedited releases
- Your PR will be tagged with a milestone indicating the target release

## Common Contribution Areas

Here are some areas where you can start contributing:

### Beginner-Friendly

| Area | Package | Description |
|------|---------|-------------|
| Documentation fixes | `documentation/` | Fix typos, improve explanations |
| Example apps | `examples/` | Add or improve example applications |
| Type improvements | `packages/*/` | Improve TypeScript types |

### Intermediate

| Area | Package | Description |
|------|---------|-------------|
| Bug fixes | `packages/core/` | Fix issues in hooks and components |
| UI components | `packages/antd/`, `packages/mui/` | Improve UI integrations |
| Tests | `packages/*/` | Add missing test coverage |

### Advanced

| Area | Package | Description |
|------|---------|-------------|
| New data providers | `packages/` | Create integrations for new backends |
| New hooks | `packages/core/` | Add new functionality |
| Performance | `packages/core/` | Optimize rendering and caching |

### Package Reference

| Package | Purpose |
|---------|---------|
| `@refinedev/core` | Core hooks, contexts, providers |
| `@refinedev/antd` | Ant Design UI integration |
| `@refinedev/mui` | Material UI integration |
| `@refinedev/mantine` | Mantine UI integration |
| `@refinedev/chakra-ui` | Chakra UI integration |
| `@refinedev/simple-rest` | Simple REST API data provider |
| `@refinedev/graphql` | GraphQL data provider |
| `@refinedev/react-router` | React Router integration |
| `@refinedev/nextjs-router` | Next.js routing integration |
| `@refinedev/react-hook-form` | React Hook Form integration |
| `@refinedev/react-table` | TanStack Table integration |
| `@refinedev/inferencer` | Auto-generate CRUD pages |

---

**Thank you for contributing to Refine!** 🎉

Every contribution, no matter how small, helps make Refine better for everyone.
