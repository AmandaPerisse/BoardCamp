import connection from "../../db.js";

function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}

export async function getRentals(req, res) {

    const result = await connection.query(`SELECT rentals.*, customers.name as "customerName", customers.id as "customerId", games.id as "gameId", games.name as "gameName", games."categoryId", categories.name as "categoryName" FROM rentals 
    JOIN customers on rentals."customerId" = customers.id 
    JOIN games on rentals."gameId" = games.id
    JOIN categories on games."categoryId" = categories.id`);

    let queryCustomerId = req.query.customerId;
    let queryGameId = req.query.gameId;
    const rentals = result.rows;
    let rentalsArray = [];
    for(let i = 0; i<rentals.length;i++){
        let thisRental = [];
        thisRental.push(rentals[i]);
        if(queryCustomerId || queryGameId){
            if(rentals[i].customerId == queryCustomerId || rentals[i].gameId == queryGameId){
                const rental = {
                    ...rentals[i], customer: thisRental.map(value => ({
                        id: value.customerId, name: value.customerName
                    })), 
                    game: thisRental.map(value => ({
                        id: value.gameId, name: value.gameName, categoryId: value.categoryId, categoryName: value.categoryName
                    }))
                }
                rental.customerName = undefined;
                rental.gameName = undefined;
                rental.categoryId = undefined;
                rental.categoryName = undefined;
                rentalsArray.push(rental);
            }
        }
        else{
            const rental = {
                ...rentals[i], customer: thisRental.map(value => ({
                    id: value.customerId, name: value.customerName
                })), 
                game: thisRental.map(value => ({
                    id: value.gameId, name: value.gameName, categoryId: value.categoryId, categoryName: value.categoryName
                }))
            }
            rental.customerName = undefined;
            rental.gameName = undefined;
            rental.categoryId = undefined;
            rental.categoryName = undefined;
            rentalsArray.push(rental);
        }
        
    }
    res.send(rentalsArray)
    
}
export async function postRentals(req, res) {
    let date = new Date;
    let dateCompleted = `${date.getFullYear()}-${adicionaZero(date.getMonth()+1)}-${adicionaZero(date.getDate())}`;
    const game = await connection.query(`SELECT * FROM games WHERE id = ${req.body.gameId}`);
    if(!game){
        res.sendStatus(400);
        return null;
    }
    const customer = await connection.query(`SELECT * FROM customers WHERE id = ${req.body.customerId}`);
    if(!customer){
        res.sendStatus(400);
        return null;
    }
    const rentals = await connection.query(`SELECT * FROM rentals`);
    if (game.rows[0].stockTotal<=rentals.rows.length){
        res.sendStatus(400);
        return null;
    }
    let originalPrice = (req.body.daysRented)*(game.rows[0].pricePerDay);
    await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
    VALUES (${req.body.customerId}, ${req.body.gameId}, '${dateCompleted}', ${req.body.daysRented}, null, ${originalPrice}, null)`);
    res.sendStatus(201);
}
export async function returnRentals(req, res) {
    let date = new Date;
    let dateCompleted = `${date.getFullYear()}-${adicionaZero(date.getMonth()+1)}-${adicionaZero(date.getDate())}`;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(400);
    }
    const result = await connection.query('SELECT * FROM rentals WHERE id=$1', [id]);
    if (result.rows.length === 0) {
        return res.sendStatus(404);
    }
    if(result.rows[0].returnDate){
        return res.sendStatus(400);
    }
    let game = await connection.query(`SELECT * FROM games WHERE id = ${result.rows[0].gameId}`);
    let timeDiff = Math.abs(result.rows[0].rentDate.getTime() - date.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let delay = (diffDays-1) * (game.rows[0].pricePerDay);
    await connection.query(`UPDATE rentals SET "returnDate" = '${dateCompleted}', "delayFee" = ${delay} WHERE id=$1`, [id]);
    res.sendStatus(200)
}
export async function deleteRentals(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(400);
    }
    const result = await connection.query('SELECT * FROM rentals WHERE id=$1', [id]);
    if (result.rows.length === 0) {
        return res.sendStatus(404);
    }
    if(!result.rows[0].returnDate){
        return res.sendStatus(400);
    }
    await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);
    res.sendStatus(200)
}