from fastapi import FastAPI, Request, Depends, HTTPException, status, Cookie, APIRouter
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from sqlalchemy.sql.functions import current_user
from sqlalchemy.orm import Session
app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/src", StaticFiles(directory="src"), name="src")

#pages_gets
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
   return templates.TemplateResponse("index.html", {"request": request})


@app.get("/shop")
async def shop(request: Request):
    return templates.TemplateResponse("shop.html", {"request": request})

@app.get("/sale")
async def sale(request: Request):
    return templates.TemplateResponse("sale.html", {"request": request})

