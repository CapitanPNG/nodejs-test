# Usage

<ol>
  <li>Enable MySQL server on the machine (ex. LAMP, MAMP or XAMPP) on localhost at port 3306</li>
  <li>Open the project in VS Code and run terminal</li>
  <li>Execute './mysql.sh' (generating a 'merge.sql' file to copy and import into MySQL server)</li>
  <li>Execute 'npm install' (installing all of the nodejs modules)</li>
  <li>Execute 'node server.js' (run nodejs server)</li>
  <li>Reach the app at localhost:8000 (test the app with some browser)</li>
</ol>



# Tools

You can run from terminal './setup.sh' to make all of the operation at one time



# Summary

This app allow to registrate an user as <b>base</b> or <b>administrator</b>

Each user can manage and delete his own account

Each <b>administrator</b> user can manage and delete each base account

The password for each of the example users created is 'pass'