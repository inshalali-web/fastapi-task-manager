# FastAPI Task Manager

A full-stack Task Manager application built using FastAPI, SQLAlchemy, SQLite, HTML, CSS, and JavaScript.

## Features

- Create tasks
- View all tasks
- View individual tasks
- Update tasks
- Mark tasks as completed or pending
- Delete tasks
- Search tasks
- Filter tasks by status
- Task statistics
- SQLite database persistence
- RESTful API
- Interactive Swagger API documentation

## Tech Stack

### Backend
- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic

### Database
- SQLite

### Frontend
- HTML
- CSS
- JavaScript
- Fetch API

## Project Structure

```text
fastapi-task-manager/
│
├── backend/
│   ├── routers/
│   │   ├── __init__.py
│   │   └── tasks.py
│   ├── database.py
│   ├── init_db.py
│   ├── main.py
│   ├── models.py
│   └── schemas.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
├── README.md
├── requirements.txt
└── tasks.db