from typing import Union
from fastapi import FastAPI
import logging
from logstash_async.handler import AsynchronousLogstashHandler
from logstash_async.handler import LogstashFormatter

# Create the logger and set it's logging level
logger = logging.getLogger("logstash")
logger.setLevel(logging.INFO)

# Create the handler
handler = AsynchronousLogstashHandler(
    host='08e1de76-d5e5-40f2-b0b9-974a6d26127b-ls.logit.io',
    port=11597,
    ssl_enable=False,
    ssl_verify=False,
    database_path='')
# Here you can specify additional formatting on your log record/message
formatter = LogstashFormatter()
handler.setFormatter(formatter)

# Assign handler to the logger
logger.addHandler(handler)

# Fast api
app = FastAPI()

@app.get("/")
def read_item(param: Union[str, None] = None):
    logger.info(param)
    return param

# Muhammad Fayaad
