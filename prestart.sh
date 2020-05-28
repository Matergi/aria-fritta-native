FILE=sourcemap/sourcemap.json

if [ ! -f "$FILE" ]; then
  cd sourcemap && echo '{}' > sourcemap.json
  yarn build:sourcemap
fi

file_content=$( cat "${FILE}" )
if [[ $file_content == "{}" ]]; then
  yarn build:sourcemap
fi
