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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM contenido');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM contenido WHERE id_contenido = ?', [id]);
            console.log(games.length);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(404).json({ text: "El contenido no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const result = yield database_1.default.query('INSERT INTO contenido set ?', [req.body]);
            console.log(req.body);
            const result = yield database_1.default.query('CALL INS_CONTENIDO(\''+ req.body.titulo +'\', \''+ req.body.fec_publicacion +'\', \''+ req.body.extension +'\', \'reproducible\', \''+ req.body.descripcion +'\', \''+ req.body.image +'\')');
            res.json({ message: 'Contenido Guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            yield database_1.default.query('UPDATE contenido set ? WHERE id_contenido = ?', [req.body, id]);
            res.json({ message: "El contenido fue actualizado" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM contenido WHERE id_contenido = ?', [id]);
            res.json({ message: "El contenido fue eliminado" });
        });
    }
}
const gamesController = new GamesController;
exports.default = gamesController;