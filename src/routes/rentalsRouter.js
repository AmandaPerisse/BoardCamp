import { Router } from 'express';
import { getRentals, postRentals, returnRentals, deleteRentals } from '../controllers/rentals.js';

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", postRentals);
rentalsRouter.post("/rentals/:id/return", returnRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;