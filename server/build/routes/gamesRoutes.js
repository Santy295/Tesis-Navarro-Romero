"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = __importDefault(require("../controllers/gamesController"));
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // this.router.get('/',gamesController.list);
        this.router.get('/registro', gamesController_1.default.list);
        this.router.get('/:id', gamesController_1.default.getOne);
        this.router.post('/registro', gamesController_1.default.create);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
