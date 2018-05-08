# YNAB Snowball
This project has two sub-directories:
* api
* snowball-react

General stuff to install:
* Yarn
* Gulp-cli
* Node 8.8 (as of now, upgrading to 10 very soon)
* Install Mongo (or be able to create a new db)

API
1. Run `yarn install`
1. Override mongo db info in local_config.json
1. Get a db dump from Warner
1. Run `gulp` (default task for now)
1. This will compile to current version of Node
1. Run `nvm use --delete-prefix v8.8.0; node dist/app.js`
1. API is now up and running on port 4040!

React
1. Run `yarn install`
1. Run `yarn start`
1. React is now up and running on port 3000!