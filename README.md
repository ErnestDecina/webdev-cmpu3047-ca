# webdev-cmpu3047-ca
## Access Website on the internet
https://www.idkfitness.com/


## NPM Deployment
Change Directory to backend

```bash
cd backend
```

Install Node Packages
```bash
npm i
```

Make sure .env file is in the backend folder
Start express server
```bash
npm start
```

## Docker Deployment
This deployment is meant for a remote server. This will not work on local machine unless changes are made.
Change branch to "v1.0-docker"
Make sure .env file is in the backend folder

```MAKE SURE THAT CORS OPTIONS IS MATCHING YOUR HOST```
./backend/src/config/express.config.js
```js
// Cors Config
export const cors_options = {
    origin: `https://www.idkfitness.com`, // CHANGE THIS TO "http://127.0.0.1:8000" if running on local device
    credentials: true
};
```

```bash
docker build -t ernestjohndecina/webdev-cmpu3047-ca  .
```

```MAKE SURE TO CHANGE ALL HTTP FETCH REQUEST TO http://localhost:8000 INSTEAD OF https://www.idkfitness.com```
./frontend/bootstrap/js/scripts.js


Run the docker image
```bash
docker run --name webdev-ca -p 8000:8000 -d ernestjohndecina/webdev-cmpu3047-ca
```

