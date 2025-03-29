# Plane-Tracking
מתוך הקבצים בrepositry קיימות 2 תיקיות, אחת לחלק של השרת והשניה לחלק של הקליינט 
plane-tracking-frontend - client side
plane-tracking-backend - server side

הקבצים החשובים בכל תיקיה הם:
plane-tracking-frontend :
App.js - קובץ המכיל את הגדרות העמוד בעזרת react
App.css - קובץ המכיל אפיון של מיקומים על המסך של חלקים מהעמוד

plane-tracking-backend :
server.js - קובץ השרת המשתמש ב MONGODB ומכיל שרת עם RESTAPI



קובץ זה הוא קובץ אפיון שרשמתי לעצמי כדי לסדר את המשימות בשביל לעשות את המשימה
בנוסף לכך רשמתי לעצמי בקובץ על המושגים שאני צריך ללמוד ולחזקור עליהם ועל אפיון המשימה עצמה
mongoDB:

MongoDB is a Nosql database(a database that doesn’t use the traditional database structure which is rows and columns but instead provides a flexible design which can be optimized for the needed task). MongoDB uses  a JSON like format called BSON, which allows for dynamic schemas making it ideal for applications with evolving and updating data unlike regular traditional databases with a fixed table and schema.

Node.js:

Node.js is a runtime environment that allows execution of  javascript code outside of a browser primarily for serverside(back end) applications it uses an event driven ,non blocking io making it highly efficient for handling multiple concurrent requests and its commonly used for REST APIs, real time applications and micro services.

React:

React is a javascript library developed by facebook for building dynamic interfaces, it uses a component based architecture allowing the creation of reusable UI components. React employs a virtual DOM(a programming concept where a virtual representation of a UI is kept in memory and synced with the realtime UI) to optimize rendering and improve performance by updating only the necessary parts of the UI.
 
Explanation of the project:

The project will contain:
A server that is accessible to every computer in a local web written using javascript
A web page whose design will be written using react
The information between the back and front end of the project will transferred using Mongo DB and rest API functions

The web page will build a plane tracking system using 3 parameters in the following ranges:
altitude 0 - 3000
HIS 0 - 360
ADI -100 - 100
After the 3 parameters are sent to the server a visual representation of them will be shown in their own respective way, the altitude will be shows in a column like graph where an arrow will show where the value entered is on the column the HIS and ADI whill be shown in circles, in the HIS field the circle will represent a compass and will show the angle at which the aircraft is flying using an orange arrow and will be rotated from the center depending on the value entered, the second circle will show the ADI parameter which will be green if the value entered in the ADI parameter is less or equal to 0 and will fill up with blue the closer the value is to 100


In addition to that there will be 3 additional button:
“Visual”: which will show all the parameters in a visual way
 “Text”: will show all the parameters in a textual way
 “+”: will open the screen for adding new values to the parameters
