#!/usr/bin/fish

# enable pinned pnpm from package.json
corepack enable
corepack prepare pnpm@11.21.0 --activate

# install project dependencies
pnpm install --frozen-lockfile
