# PetFind.Me is a platform for lost and found animals

# Web

## Download and Install Node.js
If you don't have Node.js installed, download it from here https://nodejs.org/en/download

## To Install Angular cli
Navigate to `/web` folder and run this command `npm install -g @angular/cli`

## Download all dependencies
Next in `/web` folder run `npm install`

## Development server
Inside `/web` run `ng serve` for a dev server. Navigate to http://localhost:4200. The application will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build for production 
Run `ng build --configuration=production`


# REST-API - Server

## Download all dependencies while running this command
Navigate to `/server` folder and run `npm install` to install all dependencies

## Start server
Inside `/server` run `npm start` to start the API service on port `3030`

## REST-API Endpoint
Base Url: https://localhost:3030/api

| HTTP Method |    Description    |      Endpoint     | Login Required |
| :---------- | :--------------  | :---------------- | :------------: |
|     POST    | Signing up       | /auth/register    |       No       |
|     POST    | Signing in       | /auth/login       |       No       |
|     POST    | Logging out      | /auth/logout      |       Yes      |
|     GET     | Latest pets      | /catalog/latest   |       No       |
|     GET     | Lost pets        | /catalog/lost     |       No       |
|     GET     | Found pets       | /catalog/found    |       No       |
|     GET     | Adoption pets    | /catalog/adoption |       No       |
|     GEt     | Get pet          | /pet/:id          |       No       |
|     POST    | Create pet       | /pet/create       |       Yes      |
|     PUT     | Update pet       | /pet/:id          |       Yes      |
|    DELETE   | Delete pet       | /pet/:id          |       Yes      |
|     GET     | My Profile info  | /user/user-info   |       Yes      |
|     GET     | My Profile pets  | /user/user-pets   |       Yes      |
|     GET     | My Profile liked | /user/user-liked  |       Yes      |
|     POST    | Sent message     | /api/contact-us   |       No       |