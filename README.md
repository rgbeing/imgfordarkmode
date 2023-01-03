# Imgfordark
Create image only visible in the dark mode!

![Sample](https://raw.githubusercontent.com/rgbeing/imgfordarkmode/master/main-server/public/images/dark-sample.jpg)

# How to use
## On web
Visit <http://repo2x.net/imgfordark> and enjoy the service!

## Running on your localhost (Windows)
Though this pharagraph is based on Windows environment, similar way can be applied to Linux environment. (Checked by myself on WSL + Ubuntu 22.04)

This programme consists of two server communicating via socket.io.

1. Install image-processing server's requirements. If you want, create and use a virtual environment.

    To create a virtual environment, refer to [here](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment).
```
pip install -r imgprocessing-server/requirements.txt
```

2. Create file named ".env" directly under imgprocessing-server folder.
Then put the following codes in the ".env" file:
```
SERVER_HOST = localhost
SERVER_PORT = 9876
```
Note that any port number which is not occupied is okay for SERVER_PORT in fact.

3. Create file named ".env", but directly under main-server folder this time.
Then put the following codes in the ".env" file:
```
SERVER_HOST = "127.0.0.1"
SERVER_PORT = 9876
```
Note that any port number which is not occupied is okay for SERVER_PORT but you should use the same port number you used in imgprocessing-server folder.

4. Install main server's requirements.
```
cd main-server
npm install
cd ..
```

5. Run the image-processing server.
```
py ./imgprocessing-server/server.py
```

6. Run the main server.

    You may need to run another terminal as the first terminal is occupied by python server.
```
node ./main-server/bin/www
```

7. Connect <localhost:3000/imgfordark> and you can enjoy it.

You may use pm2 or any other process manager to run your server conveniently and continuously.
