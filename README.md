# 🍩 Donut-vue 🍩 

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

Download the zip file that contains the sample xml file and upload the file at the submit payment screen:
[dunkin.zip](https://github.com/ukulanne/donut-vue/files/10330036/dunkin.zip)

After a few moments the app will give show a small dialog asking if you wish to proceed:

<img width="335" alt="image" src="https://user-images.githubusercontent.com/28586666/210195836-2a1ee61d-fffb-4ea2-9cda-7a7e41ae553f.png">

## Report by Account
Shows a report on how much money has been paid per Dunkin Donut Source account
<img width="1065" alt="image" src="https://user-images.githubusercontent.com/28586666/210195036-33c3d6b5-943f-49aa-807c-15869d07d547.png">

You can always select specific pay periods.
<img width="1063" alt="image" src="https://user-images.githubusercontent.com/28586666/210195053-1ee1ad50-44eb-4a08-b9d4-d19c4e1c991b.png">

Pressing the CSV button will download a CSV file of this report

## Report by Branch
Shows a report of how much money has been paid to employees loans per branch
<img width="1069" alt="image" src="https://user-images.githubusercontent.com/28586666/210195070-4517a41f-45ce-41e4-b0cd-8520905d4046.png">


## Methods Report
Download Method generated reports on CSV format
<img width="1070" alt="image" src="https://user-images.githubusercontent.com/28586666/210195094-05b8f835-2e4c-456e-9835-97ddbcfc84ad.png">


## Employee Info
SHows a list of employees and how much money has been paid to their Student Loans.
<img width="1068" alt="image" src="https://user-images.githubusercontent.com/28586666/210195116-41c8f93c-ee56-4225-8870-bb9fe62da7c9.png">


# Tools I use
- [git-klone.scm](https://github.com/ukulanne/git-klone-setup)
- [Emacs](https://www.gnu.org/software/emacs/)
- [Fedora Linux](https://getfedora.org/)
- [RazorSQL](https://razorsql.com/)
