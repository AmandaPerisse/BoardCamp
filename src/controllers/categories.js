import connection from "../../db.js";

export async function postCategories(req, res) {

    let categories = await connection.query('SELECT * FROM categories');
    for(let i = 0; i<categories.rows.length;i++){
        if(categories.rows[i].name === req.body.name){
            res.sendStatus(409);
            return null;
        }
    }
    await connection.query(`INSERT INTO categories (name) VALUES ('${req.body.name}')`);
    res.sendStatus(201);
}
export async function getCategories(req, res){

    let categories = await connection.query('SELECT * FROM categories');
    res.send(categories.rows);
}