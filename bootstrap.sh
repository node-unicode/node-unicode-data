#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

#rm -rf -- output/*/*!(.git);
npm run build;

cd output;

for dir in $(find unicode-* -maxdepth 0 -type d | sort -r); do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	git add -A;
	git commit -m 'Release v2.0.6';
	# When tagging a release, update `templates/package.json` accordingly.
	git tag v2.0.6;
	git push;
	git push --tags;
	cd ..;
done;
