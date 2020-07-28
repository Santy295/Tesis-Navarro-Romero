import { Router } from 'express';

import gamesController from '../controllers/gamesController'

class GamesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // this.router.get('/',gamesController.list);
        this.router.get('/registro', gamesController.list);
        this.router.get('/:id',gamesController.getOne);
        this.router.post('/registro', gamesController.create);
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;