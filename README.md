## Initial SetUp

npm init -y
npm install express mongoose dotenv
npm install --save-dev nodemon
- create app.js
- edit package.json
    "scripts" : {
        "start":"nodemon app.js"
    },
- add .gitignore
    ./node_modules
    .env
