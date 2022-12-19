import os
import eventlet
import socketio
import imageConverter

HOST = 'localhost'
PORT = 5505

sio = socketio.Server(
    cors_allowed_origins=["127.0.0.1"],
    max_http_buffer_size=3145728
)
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ, auth):
    print('connect ', sid)

@sio.on('*')
def convert(fileFullName, sid, data):
    fileName, fileExtension = os.path.splitext(fileFullName)
    
    converted = imageConverter.converter(data)
    return converted
    # convert image and re-emit

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen((HOST, PORT)), app)