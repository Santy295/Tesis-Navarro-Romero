"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    // public async list (req: Request, res: Response): Promise<void>{
    //     const rad = await pool.query('SELECT * FROM p1')
    //     res.json(rad);
    // };
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registro = yield database_1.default.query('SELECT * FROM registro');
            res.json(registro);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO registro set ?', [req.body]);
            res.json({ message: 'Data Saved' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const rad = yield database_1.default.query('SELECT *FROM ' + id);
            res.json(rad);
        });
    }
    ;
}
const gamesController = new GamesController();
exports.default = gamesController;
