## Initial SetUp

npm init -y
npm install express@4.17.1 dotenv express-async-errors http-status-codes jsonwebtoken mongoose
npm install --save-dev nodemon

- create app.js

- edit package.json
    "scripts" : {
        "start":"nodemon app.js"
    },
    
- add .gitignore
    ./node_modules
    .env


