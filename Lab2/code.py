from fastapi import FastAPI, Form
from pydantic import BaseModel

app = FastAPI()

class Adder(BaseModel):
    arg1: int
    arg2: int

@app.get("/add-1/{arg1}/{arg2}")
def func1(arg1: int, arg2: int):
    return {"result-1":arg1 + arg2}

@app.post("/add-2/")
def func2(arg1: int = Form(...), arg2: int = Form(...)):
    return {"result-2":arg1 + arg2}

@app.post("/add-3/")
def func3(args: Adder):
    return {"result-3":args.arg1 + args.arg2}
