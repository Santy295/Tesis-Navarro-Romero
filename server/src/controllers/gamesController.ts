import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    // public async list (req: Request, res: Response): Promise<void>{
    //     const rad = await pool.query('SELECT * FROM p1')
    //     res.json(rad);
    // };

    public async list(req: Request, res: Response): Promise<void> {
        const registro = await pool.query('SELECT * FROM registro');
        res.json(registro);
    }
    
    public async create (req: Request, res: Response):Promise<void> {
        const result = await pool.query('INSERT INTO registro set ?', [req.body]);
        res.json({ message: 'Data Saved' });
    }
   
    public async getOne (req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const rad = await pool.query('SELECT *FROM ' + id)
    res.json(rad);
    };


    // public async getOne(req: Request, res: Response): Promise<any> {
    //     const { id } = req.params;
    //     const rad = await pool.query('SELECT * FROM id', [id]);
    //     res.json(rad);
    // }
}

const gamesController = new GamesController();
export default gamesController;