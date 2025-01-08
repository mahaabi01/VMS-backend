"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
require('./model/index'); //db connection code
app.get("/", (req, res) => {
    res.send("Project Started.");
});
app.listen(PORT, () => {
    console.log("Server has started at port,", PORT);
});