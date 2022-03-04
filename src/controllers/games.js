import connection from "../../db.js";

export async function getGames(req, res) {

    let games = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games JOIN categories on games."categoryId" = categories.id`);
    let gamesRe = [];
    if(req.query.name){
        let queryName = req.query.name;
        let re = new RegExp(`^${queryName.toLowerCase()}`);
        for(let i = 0; i<games.rows.length;i++){
            if(re.test(games.rows[i].name.toLowerCase())){
                gamesRe.push(games.rows[i]);
            }
        }
    }
    if(gamesRe.length>0){
        res.send(gamesRe);
    }
    else{
        res.send(games.rows);
    }
}
export async function postGames(req,res){
    let games = await connection.query('SELECT * FROM games');
    for(let i = 0; i<games.rows.length;i++){
        if(games.rows[i].name === req.body.name){
            res.sendStatus(409);
            return null;
        }
    }
    let categories = await connection.query('SELECT * FROM categories');
    let categoryMatch = false;
    for(let i = 0; i<categories.rows.length;i++){
        if(categories.rows[i].id === req.body.categoryId){
            categoryMatch = true;
        }
    }
    if(!categoryMatch){
        res.sendStatus(400);
        return null;
    }
    await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${req.body.name}', '${req.body.image}', '${req.body.stockTotal}',
        ${req.body.categoryId}, '${req.body.pricePerDay}')`);
    res.sendStatus(201);
}