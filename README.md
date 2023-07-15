# VitalDrop
This project aims to connect people to blood donation centers and effectively manage donations, request and blood banks.

## Table Of Contents

  1. [Technologies used](https://github.com/saniaahmad6/VitalDrop_/tree/master#technologies-used)
  2. [How the project works](https://github.com/saniaahmad6/VitalDrop_/tree/master#flow)
  3. [Screenshots](https://github.com/saniaahmad6/VitalDrop_/tree/master#screenshots)
  4. [Tech Stack](https://github.com/saniaahmad6/VitalDrop_/tree/master#tech-stack)
  5. [Installation](https://github.com/saniaahmad6/VitalDrop_/tree/master#installation)

  

<a name="technologies-used"/>

## Technologies used

- [React.js](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/) 
- [Express.js](https://expressjs.com/)

<a name="flow"/>

## How the project works?
 * This project has two sides - client and admin.
 * User (client) can signup and create an account and can choose to either donate blood or make a request to a particular center.
 * Donation centers can register via their admin in charge. The admin of each donation center is responsible:
    - to view their blood bank
    - to generate appointments
    - to accept or decline donations
    - to accept or decline requests for blood

<a name="screenshots"/>

## Screenshots

### Search by map
<p align="center" width="100%">
    <img width="70%" src="https://github.com/saniaahmad6/saniaahmad6/assets/94756953/7ab980d6-7956-4a9f-bcfa-ae48e5ce4ab9">
</p>

### Admin side
<p align="center" width="100%">
    <img width="70%" src="https://github.com/saniaahmad6/VitalDrop_/assets/94756953/c22c6990-936b-47d4-b7e2-5718e8679644">
</p>

### Client side
<p align="center" width="100%">
    <img width="70%" src="https://github.com/saniaahmad6/VitalDrop_/assets/94756953/7e77648c-c1c2-4931-8233-e5b01ae289ce">
</p>

<p align="center" width="100%">
    <img width="70%" src="https://github.com/saniaahmad6/VitalDrop_/assets/94756953/6b8df8eb-163d-4576-a695-a091bffaa5e9">
</p>

<a name="tech-stack"/>

## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** MySQL

### Dependencies

#### Frontend: 
- react-bootstrap
- react-data-grid
- react-dom
- react-icons
- react-leaflet
- reactstrap

#### Backend: 
- body-parser
- cookie-parser
- cors
- csv
- dotenv
- express
- express-session
- morgan
- mysql
- nodemon

<a name="installation"/>

## Installation 

**Git** and **npm** should be globally installed in your system.

- Fork this repository

- Clone
```bash
  git clone <your-forked-repository>
```
- Frontend
```bash
  cd Frontend 
  npm install
```
- Backend
```bash
  cd Backend
  npm install
```
### Run
- Frontend
```bash
  cd Frontend 
  npm start
```
- Backend
```bash
  cd Backend
  node server.js
```
