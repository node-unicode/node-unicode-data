#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

VERSIONS=$(node scripts/log-versions.js);

mkdir -p output;
cd output;

for version in $VERSIONS; do
  git clone "git@github.com:node-unicode/unicode-${version}.git";
done;
