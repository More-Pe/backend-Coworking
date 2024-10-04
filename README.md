# "Las Naves - Coworking "

Welcome to the backend part of NavDesk. This is a Co-Working App project utilizing state-of-the-art technologies to manage access and administration within "Las Naves" facility in Valencia!

## Coworking Managment System


<img src="./img/logo.webp" width="600" height="600" align="center">
<br>

##  <summary> Table of contents 📝</summary>
  <ol>
    <li><a href="#about-the-project-📁">About the project</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#er-diagram-from-sql">ER Diagram from SQL</a></li>
    <li><a href="#local-installation-option">Clone</a></li>
    <li><a href="#endpoints-⚒">Endpoints</a></li>
    <li><a href="#future-functionalities">Future functionalities</a></li>
    <li><a href="#contributions">Contribution</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## 🛠️ Features

This project is an efficient implementation of an Access Control System using Node.js, Express, TypeORM, TypeScript and more technologies. It emphasizes robust data handling and seamless access management for StartUp companies who want to create a petition to use a Meeting room or Event room in our building. Through the system, administrators can manage user access to different rooms and track access history efficiently. There is also a possibility to get a detailed report for an enterprise, room or even a person as well as availability view in real time.

More functionalities are on the way!

## Deploy 🚀

<div align="center">
    <a href="https://tattoo-studio.zeabur.app/"><strong> Click here! </strong></a>🚀🚀🚀
</div>

## ⚙️ Stack

Used technologies for the project:

<div align="center">
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a><a href="https://typescriptlang.org">
     <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</a>    <a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a></a><a href="">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</a><a href="">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</a><a href="">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a><a href="">
    <img src="https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&" alt="TypeScript" /></a>
</div>

## 🗄️ Database Schema

- The database schema includes entities like `Person`, `Room`, `Access`, `Access_history`, and `Administration`. These tables are interconnected to provide a comprehensive system for managing access controls dynamically. The relationships between them provide a faster and more capable way of updating the data in real time environment. It is designed in SQL together with TypeORM.

## Local installation option ⚙️
- Before starting it is important to have SQL and MySQLWorkbench installed locally in order to work with the database. If you dont have it or simply prefer to use a Docker configuration please follow the steps bellow and then you can continue with the clone.
  -1- Create docker SQL Image `docker build -t mssql-app`
  -2- Create a SQL container `docker run -d --name mssql-container -p 3306:3306 mssql-app`
  -3- Run Docker Desktop App and run the container from there

1. Clone the repository from the url
2. `$ npm install` (to get all the node packages)
3. Connect the cloned repo with our Database (if you dont have docker make a mysql container and run it on the wanted port such as:
` docker run -d --name mysqlc -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root  -v mysql_data:/var/lib/mysql mysql `)
4. Change variables in .env with the PORT given from Docker (default is 3306)
5. `$ npm run migrations`
6. `$ npm run db:seed`
7. `$ npm run db:refresh` to execute everything from the beginning
8. `$ npm run dev` to run our server

## 🌐 Endpoints

### 🔒 Authentication

| Method | URI       | Action         | Auth                | Body                                                                                   |
|--------|-----------|----------------|---------------------|----------------------------------------------------------------------------------------|
| POST   | /api/register  | Register user  | N/A (public)        | `{  "email": "userEmail", "password": "userPassword" }` |
| POST   | /api/login     | Login user     | N/A (public)        | `{ "email": "userEmail", "password": "userPassword" }`                                |

### 👤 Persons

| Method | URI           | Action              | Auth      | Body                                                                                   |
|--------|---------------|---------------------|-----------|----------------------------------------------------------------------------------------|
| GET    | /api/persons/:id/current-access       | Display all current accesses of users ID   | Token (user) | N/A                                                                                    |
| GET    | /api/persons/:id/access-history | View user access histories   | Token (user) | N/A                                                                                    |

### 🏠 Rooms

| Method | URI            | Action              | Auth        | Body                                                                                   |
|--------|----------------|---------------------|-------------|----------------------------------------------------------------------------------------|
| GET    | /rooms/all      | View all rooms   | Token(user) | N/A                                                                                    |
| GET   | /rooms/{id}/current-state     | Display current state of a room      | Token (user) |             |
| GET    | /rooms/{id} | Display room by ID  | Token (user) | N/A                                                                                    |
| PUT    | /rooms/{id} | Update a room by ID | Token (admin) |    name, capacity, type  |
| DELETE | /rooms/{id} | Delete room by ID | Token (admin) | N/A                                                                                    |

### 🗓 Access

| Method | URI          | Action             | Auth      | Body                                                |
|--------|--------------|--------------------|-----------|-----------------------------------------------------|
| GET    | /access/room/{id}    | View current room state by ID   | Token (admin) | N/A                                                 |
| POST   | /access/reserve     | Create new booking       | Token (user) | `{ "room_id": "id" }` ,  `{ "date": "YYYY-MM-DD" }`            |
| POST    | /access/check-in/{id} | Check-in to a booking by ID   | Token (user) | N/A                                                 |
| POST    | /access/check-out/{id}| Check-out to a booking by ID  | Token (user) | N/A        |
| DEL | /access/cancel/{id} | Delete a booking by ID| Token (user) | N/A                                                 |

### 🗓 Access History

| Method | URI          | Action             | Auth      | Body                                                |
|--------|--------------|--------------------|-----------|-----------------------------------------------------|
| GET    | /history/period   | View all accesses for certain date period   | Token (admin) | `{ "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD"}`                             |
| GET   | /history/room/{id}     | Create order       | Token (admin) | N/A            |

### 📚 Administration

| Method | URI          | Action             | Auth      | Body                                                |
|--------|--------------|--------------------|-----------|-----------------------------------------------------|
| POST    | /report/daily | Create a daily report for all bookings  | Token (admin) | N/A                                                 |
| GET   | /report/room-usage/{id}    | Create report for a room by ID       | Token (admin) | N/A     |
| GET    | /report/period | Create a report for specific date period   | Token (admin) | `{"start_date" : "YYYY-MM-DD", "end_date": "YYYY-MM-DD"`                                                |

## Future functionalities 
<br>
✅ Add reports and details inside <br>
⬜ Add more calendar options <br>
⬜ StartUp and old users validations <br>
