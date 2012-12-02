#!/usr/bin/sh

\rm -rf dist
mkdir dist
java -jar ./tools/compiler/compiler.jar --js src/*.js --js_output_file=dist/ticss.js
cp tools/parse_ticss.pl dist/parse_ticss.pl
