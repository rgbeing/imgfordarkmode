import os
import eventlet
import socketio
from dotenv import load_dotenv
import imageConverter

load_dotenv()

HOST = os.environ.get('SERVER_HOST')
PORT = int(os.environ.get('SERVER_PORT'))

sio = socketio.Server(
    cors_allowed_origins=["127.0.0.1"],
    max_http_buffer_size=3145728 # 3MB
)
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)

@sio.on('*')
def convert(fileFullName, sid, data):
    converted = imageConverter.converter(data)
    return converted

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen((HOST, PORT)), app)