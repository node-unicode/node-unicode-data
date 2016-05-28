#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

#rm -rf -- output/*/*!(.git);
#npm run build;

cd output;

for dir in $(find ./unicode-* -type d -maxdepth 0 | sort -r); do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	# git add -A;
	# git commit -m 'Release v0.5.0';
	# git tag v0.5.0;
	# git push;
	# git push --tags;
	npm publish;
	cd ..;
done;
