"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./Config/db");
dotenv_1.default.config();
(0, db_1.connectDatabase)();
const PORT = process.env.PORT || 3000;
app_1.server.listen(PORT, () => console.log("Server Started Successfully"));
