
# Enklare Technical Assignment




## How to run


Run the following commands on your terminal/cmd inside the cloned project folder:

```bash
  npm install
  npm start
```

After running these commands, you should be presented with a message with a url (default is localhost:8080). Navigate to this page to use the app.
    



## How to run on a docker container


Run the following commands on your terminal/cmd inside the cloned project folder:

```bash
  docker build . -t <your username>/enklare-technical-assignment
  docker run -p 49160:8080 -d <your username>/enklare-technical-assignment
  docker ps
```

After running these commands, you should be presented with a list of running docker processes. Under ports you can see the docker port mapping. Navigate on your browser to the port you mapped 8080 to (if you followed everything correctly, localhost:49160).

To stop the process, run:

```bash
    docker kill <container id>
```
    