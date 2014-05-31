#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

node scripts/generate-data.js;

cd output;

for dir in *; do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	git add -A;
	git commit -m 'Tag the v0.1.5 release';
	git tag v0.1.5;
	git push;
	git push --tags;
	npm publish;
	cd ..;
done;
