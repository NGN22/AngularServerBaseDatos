import { Request, Response } from 'express';


import pool from '../database';

class GamesController {

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM contenido');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM contenido WHERE id_contenido = ?', [id]);
        console.log(games.length);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "El contenido no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        //const result = await pool.query('INSERT INTO contenido set ?', [req.body]);

        res.json({ message: 'Contenido Guardado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE contenido set ? WHERE id_contenido = ?', [req.body, id]);
        res.json({ message: "El contenido fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM contenido WHERE id_contenido = ?', [id]);
        res.json({ message: "El contenido fue eliminado" });
    }
}

const gamesController = new GamesController;
export default gamesController;