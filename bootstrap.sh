#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

node scripts/generate-data.js;

cd output;

for dir in *; do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	#npm publish;
	cd ..;
done;
