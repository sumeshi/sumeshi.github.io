#!/usr/bin/fish

# enable pinned pnpm from package.json
corepack enable
corepack install

# install project dependencies
pnpm install --frozen-lockfile
