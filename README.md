# Donut-vue

Donut-vue is a sample web app tha ilustrates how to use the [METHOD API](https://docs.methodfi.com/api) to simulate apayout dashboard for student loan disbursements to be used at 🍩 Dunkin' Donuts 🍩.

Donut-vue uses the following:

- Node 18.x
- VueJS 3
- Vuetify 3
- SQLite 3

## Instructions

- Get a free method dev account https://dashboard.methodfi.com/login
- Clone the donut-vue repo into your environment `git clonegit@github.com:ukulanne/donut-vue.git`
- Run `npm install` inside the donut-vue directory
- Set up the METHOD_KEY_API en var on your .bash_profile `export METHOD_API_KEY=<KEY>`
- Start the application with `npm run startDev`
- Go to http://localhost:8080/ to try the app!

## Database

-Donut-vue uses SQLite. 
- The database is created the first time `npm install` is run and is stored on the `db` directory `db/dunkin.db` 
- The script that is used to create the DB is db/ddl.js
- You can check out the queries that our app uses inside db/dunkin.sql
