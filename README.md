# dyna-userscripts

**Public** but not for `public` _yet_.

Maybe never-ever.

## Why isn't the dist/ folder in Git?

- The `dist/` folder is build output produced by `pnpm build` (webpack). It is not ignored by `.gitignore` in this repository.
- If you don't see `dist/` in Git history, it's because it hasn't been committed yet. Running `git status` will show `dist` files as untracked after a build.

### How to include `dist/` in Git (when desired)

You typically don't need to commit `dist/` during development. The release workflow already does this for you:

1. Build and test, commit build output, publish, and push via:
   - `pnpm release`
   - This runs: `pnpm build && pnpm test && git add -u && git add -A && git commit --allow-empty -m "Build changes" && pnpm publish-push ...`
   - As part of that, untracked `dist/` files are added and committed.

2. If you explicitly want to commit `dist/` outside of the release flow:
   - `pnpm build`
   - `git add dist`
   - `git commit -m "Add build artifacts"`

If you expected `dist/` to be ignored: note that `.gitignore` here does not ignore it by design, so it can be committed on releases. If you prefer to never commit it locally, simply refrain from adding it, or add a global/user-level ignore rule for your environment.