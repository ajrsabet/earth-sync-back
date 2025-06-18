# Earth Sync Backend

This repository contains the backend API for the Earth Sync application. The backend provides vehicle data, user authentication, garage management, and emissions calculations. It is built with Node.js, Express, and Firebase, and is designed for deployment on Google Cloud Run.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [API Endpoints](#api-endpoints)
- [Deployment (Google Cloud Run)](#deployment-google-cloud-run)
- [Environment Variables](#environment-variables)
- [Notes](#notes)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication** (via Firebase)
- **Vehicle Data API** (search, compare, and retrieve vehicle information)
- **Garage Management** (save, edit, and delete user vehicles)
- **Emissions Calculation** (based on vehicle and mileage)
- **CORS Support** for secure frontend-backend communication


## Prerequisites

- Node.js 18 or higher
- Firebase project with a service account key
- Google Cloud project with billing enabled (for Cloud Run deployment)



## Local Development

1. **Clone the repository:**
   ```git clone https://github.com/ajrsabet/earth-sync-back.git```
   ```cd earth-sync-back```
2. **Install dependencies:**
```npm install```
3. **Add your Firebase service account key:**
- Download serviceAccountKey.json from your Firebase Console.
- Place it in the project root.
4. **Start the server:**
``` npm start```
    The server will run on http://localhost:8080 by default.

## API Endpoints
- GET / — Health check
- POST [..](http://_vscodecontentref_/0). — Authentication routes
- GET [..](http://_vscodecontentref_/1). — Vehicle data routes
- GET /garage/:userId/cars — Get user's garage
- POST /garage/:userId/cars — Add vehicle to garage
- DELETE /garage/:userId/cars/:carId — Remove vehicle from garage

## Deployment (Google Cloud Run)

1. **Build and push the Docker image:**
```gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/earth-sync-back```
2. **Deploy to Cloud Run:**
```gcloud run deploy earth-sync-back``` 
```--image=gcr.io/YOUR_PROJECT_ID/earth-sync-back```
```--platform managed \```
```--region us-central1 \```
```--allow-unauthenticated```

3. **Set environment variables and secrets as needed in Cloud Run.**

## Environment Variables
- PORT — Port for the server (Cloud Run sets this automatically)
- Any other secrets should be managed via Google Cloud Secret Manager or environment variables in Cloud Run.

## Notes
- Ensure serviceAccountKey.json is present in the container for Firebase Admin SDK.
- CORS is configured for your frontend’s Firebase Hosting URLs.
- For production, secure your endpoints as needed.


## License
MIT

The MIT License is a short, permissive open-source license that allows anyone to use, copy, modify, and distribute the software for any purpose, provided the original copyright and license notice are included.  
It provides the software “as is,” without warranty of any kind.

[Read the full MIT License](https://opensource.org/licenses/MIT)


## Contact
For questions or support, open an issue or contact Adam Sabet @ arishel@gmail.com

