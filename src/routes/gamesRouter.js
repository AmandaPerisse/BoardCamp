import { Router } from 'express';
import { getGames, postGames } from '../controllers/games.js';
import validatePostGamesSchemaMiddleware from '../middlewares/validatePostGamesSchemaMiddleware.js';

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validatePostGamesSchemaMiddleware, postGames);

export default gamesRouter;