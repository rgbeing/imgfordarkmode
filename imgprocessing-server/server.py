import os
from aiohttp import web
import socketio
from dotenv import load_dotenv
import imageConverter

load_dotenv()

HOST = os.environ.get('SERVER_HOST')
PORT = int(os.environ.get('SERVER_PORT'))

sio = socketio.AsyncServer(
    cors_allowed_origins=["127.0.0.1"],
    max_http_buffer_size=2359296 # 2.25MB
)
app = web.Application()
sio.attach(app)

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)

@sio.on('*')
async def convert(fileFullName, sid, data):
    converted = await imageConverter.converter(data["buffer"], data["cont"])
    return converted

if __name__ == '__main__':
    web.run_app(app, host=HOST, port=PORT)
