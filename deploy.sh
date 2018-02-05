npm run build
rsync -avp build awshost1:~/tulasi-web
rsync -avp server/app.js awshost1:~/tulasi-web
