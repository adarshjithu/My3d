import { server } from "./app";
import dotenv from "dotenv";
import { connectDatabase } from "./Config/db";
dotenv.config();
 connectDatabase()
const PORT = process.env.PORT || 3000;
server.listen(PORT,() => console.log("Server Started Successfully"));
