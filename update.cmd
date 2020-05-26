node index.js %1
cd zip
7z a source.zip index.js
aws lambda update-function-code --function-name %1  --zip-file fileb://source.zip
del index.js
del source.zip
cd ..