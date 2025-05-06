"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const adminRoutes_1 = __importDefault(require("./Routes/adminRoutes"));
const errorHandler_1 = require("./Middlewares/errorHandler");
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.server = server;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use("/admin", adminRoutes_1.default);
app.use('/api', userRoutes_1.default);
app.use(errorHandler_1.errorHandler);
