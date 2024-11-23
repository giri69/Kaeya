from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.host import router as host_router
from app.routes.logs import router as log_router
from app.routes.alerts import router as alert_router
from app.routes.model import router as model_router
from app.routes.honeypot import router as honey_router

app = FastAPI()

# Include CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth_router)
app.include_router(host_router)
app.include_router(log_router)
app.include_router(alert_router)
app.include_router(model_router)
app.include_router(honey_router)


@app.get("/")
async def root():
    return {"message": "Welcome to Kaeya"}
