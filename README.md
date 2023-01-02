# Donut-vue

Donut-vue is a sample web app tha ilustrates how to use the [METHOD API](https://docs.methodfi.com/api) to simulate apayout dashboard for student loan disbursements to be used at 🍩 Dunkin' Donuts 🍩.

Donut-vue uses the following:

- [Node 18](https://nodejs.org/en/)
- [VueJS 3](https://vuejs.org/)
- [Vuetify 3](https://next.vuetifyjs.com/en/)
- [SQLite 3](https://www.sqlite.org/index.html)

## Instructions

- Get a free method dev account https://dashboard.methodfi.com/login
- Clone the donut-vue repo into your environment `git clone git@github.com:ukulanne/donut-vue.git`
- Run `npm install` inside the donut-vue directory
- Set up the METHOD_KEY_API en var on your .bash_profile `export METHOD_API_KEY=<KEY>`
- Start the application with `npm run startDev`
- Go to http://localhost:8080/ to try the app!

## Database

- Donut-vue uses SQLite. 
- The database is created the first time `npm install` is run and is stored on the `db` directory `db/dunkin.db` 
- The script that is used to create the DB is db/ddl.js
- You can check out the queries that the app uses inside db/dunkin.sql
- The db directory contain one script to check the count of the tables (table-select-all.js) 
- and another to clear all the contents of the DB (table-delete-rows.js)
- You can always use your favorite database query tool that supports SQLite. I have used [RazorSQL](https://razorsql.com/) for years

# Usage

## Upload XML File
<img width="1055" alt="image" src="https://user-images.githubusercontent.com/28586666/210194173-dba30a64-6741-44cd-b7ff-9bfa57e5a3e6.png">


## Report by Account

## Report by Branch

## Methods Report

## Employee Info
# Tools I use
- [git-klone.scm](https://github.com/ukulanne/git-klone-setup)
- [Emacs](https://www.gnu.org/software/emacs/)
- [Fedora Linux](https://getfedora.org/)
- [RazorSQL](https://razorsql.com/)
