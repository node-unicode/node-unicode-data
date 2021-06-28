#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

#rm -rf -- output/*/*!(.git);
npm run build;

cd output;

for dir in $(find unicode-* -maxdepth 0 -type d | sort -r); do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	git add -A;
	git commit -m 'Further compress generated output' -m 'Issue: https://github.com/node-unicode/node-unicode-data/pull/64'
	#git commit -m 'Release v1.0.6'
	#git tag v1.0.6;
	git push;
	cd ..;
done;
