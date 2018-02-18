#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

#rm -rf -- output/*/*!(.git);
npm run build;

cd output;

for dir in $(find ./unicode-* -type d -maxdepth 0 | sort -r); do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	git add -A;
	git commit -m 'Update @ https://github.com/mathiasbynens/node-unicode-data/commit/2d076c0f5bf6871644f745834b67003cf9e7dd2d';
	#git commit -m 'Release v0.7.5'
	#git tag v0.7.5;
	git push;
	#git push --tags;
	#npm publish;
	cd ..;
done;
