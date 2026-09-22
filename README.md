# Task Tracker

A full-stack Task Tracker application developed as part of the **ZoyaSofts Internship Training Program – Week 4: Python Backend & Django Fundamentals**.

The project demonstrates Django backend development, SQLite database integration, JSON API development, Postman testing, and React frontend integration.

## Features

* Add new tasks with title and description
* Update existing tasks
* Mark tasks as Completed or Pending
* Delete tasks
* Search and filter tasks
* View task statistics and progress
* Form validation
* Database-based task storage

## Technologies Used

* Python
* Django
* SQLite
* React.js
* JavaScript
* HTML
* CSS
* Fetch API
* JSON
* CORS
* Postman
* Git and GitHub

## Project Structure

```text
Week-4-Django/
├── Day-1/
├── Day-2/
├── Day-3/
├── Day-4/
├── Day-5/
├── Day-6/
├── Day-7/
├── config/
├── task_tracker/
├── frontend/
├── manage.py
└── README.md
```

## Backend

The backend is developed using Django and provides JSON-based APIs for task management.

Supported operations:

* GET — Retrieve tasks
* POST — Create a task
* PUT — Update a task
* DELETE — Delete a task

The project uses SQLite for storing task data.

## Frontend

The frontend is developed using React.js and communicates with the Django backend using the Fetch API.

The interface provides task management, status updates, search, filtering, validation, and progress tracking.

## API Testing

The backend APIs were tested using Postman for GET, POST, PUT, and DELETE operations.

## Running the Project

### Start Django Backend

```bash
python manage.py runserver
```

### Start React Frontend

```bash
cd frontend/Day-7-Task-Tracker
npm install
npm run dev
```


## Repository

https://github.com/snehalBedage/ZoyaSofts-Week-4-Django

**Project Status:** Completed
