"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("./database/db");
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
})
    .catch((error) => {
    console.log(error);
});
