# Day 6 - React and Django Integration

## Objective

Connect the React frontend with the Django backend API and understand how task data is exchanged between the frontend and backend using the Fetch API.

## Commands Used

```text id="m8v2qa"
npm run dev
python manage.py runserver
python manage.py check
```

## Work Done

* Connected the React Task Tracker frontend with the Django backend API.
* Used the Fetch API to communicate with the Django server.
* Implemented GET request to fetch tasks from the backend.
* Implemented POST request to add new tasks.
* Implemented PUT request to update task status.
* Implemented DELETE request to remove tasks.
* Displayed task name, description, status, and created date in the React UI.
* Verified that task changes were stored in the SQLite database.
* Tested the complete task workflow through the React interface.

## API Operations Tested

| Operation      | Method | Status     |
| -------------- | ------ | ---------- |
| Retrieve Tasks | GET    | Successful |
| Add Task       | POST   | Successful |
| Update Task    | PUT    | Successful |
| Delete Task    | DELETE | Successful |

## Technologies Used

* React
* JavaScript
* Fetch API
* Vite
* Python
* Django
* SQLite
* JSON
* Tailwind CSS

## Outcome

The React frontend was successfully connected to the Django backend API. Tasks can be retrieved, added, updated, and deleted through the React interface, with the data stored in the SQLite database.
