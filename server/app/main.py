from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.host import router as host_router


app = FastAPI()

app.include_router(auth_router)
app.include_router(host_router)


@app.get("/")
async def root():
    return {"message": "Welcome to Kaeya "}
