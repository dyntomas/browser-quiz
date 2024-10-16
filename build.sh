id=browser-quiz
tag=1.0
name=./build/${id}_${tag}.zip

rm build -r
mkdir build

if [! -d "node_modules" ]; then
  npm ci
fi

echo [Build] Building with webpack
npm run build:prod

echo [Build] Zipping public folder
zip -r -q ${name} ./public

echo [Build] Saved to ${name}

echo [Build] Getting hash of file
md5sum ./build/*.zip > ./build/checksum.md5
cat build/checksum.md5
