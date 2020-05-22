node index.js
cd zip
7z a ioioLambdaBasicCG.zip index.js
aws lambda update-function-code --function-name ioioLambdaBasicCG  --zip-file fileb://ioioLambdaBasicCG.zip
cd ..