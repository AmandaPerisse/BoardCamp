import express from 'express';
import cors from 'cors';

import categories from './src/routes/categoriesRouter.js';
import games from './src/routes/gamesRouter.js';
import customers from './src/routes/customersRouter.js';
import rentals from './src/routes/rentalsRouter.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use(categories);
app.use(games);
app.use(customers);
app.use(rentals);

app.listen(4000, () =>{
    console.log("Server listening on port 4000.");
});