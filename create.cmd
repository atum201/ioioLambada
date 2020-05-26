node index.js %1
cd zip
aws lambda create-function --function-name %1 --runtime nodejs12.x --zip-file fileb://source.zip --handler index.handler --role arn:aws:iam::278472577700:role/ioioDynamoDBCRUD
del index.js
del source.zip
cd ..
