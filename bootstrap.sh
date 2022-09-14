#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

#rm -rf -- output/*/*!(.git);
npm run build;

cd output;

for dir in $(find unicode-* -maxdepth 0 -type d | sort -r); do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	git add -A;
	git commit -m 'Release v1.3.0';
	git tag v1.3.0;
	git push;
	git push --tags;
	cd ..;
done;
