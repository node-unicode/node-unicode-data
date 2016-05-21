#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

rm -rf -- output/*/*!(.git);
npm run build;

cd output;

for dir in ./*; do
	cd "${dir}";
	echo "Taking care of ${dir}…";
	# git add -A;
	# git commit -m 'Tweak templates';
	# git push;
	cd ..;
done;
