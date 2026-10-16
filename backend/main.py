from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.database import Base, engine
from backend import models
from backend.routers.tasks import router as tasks_router


app = FastAPI(
    title="Task Manager API",
    description="A full-stack Task Manager built with FastAPI and SQLite",
    version="2.0.0"
)
Base.metadata.create_all(bind=engine)


# API routes
app.include_router(tasks_router)


# Serve frontend
app.mount(
    "/",
    StaticFiles(directory="frontend", html=True),
    name="frontend"
)