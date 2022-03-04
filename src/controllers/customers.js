import connection from "../../db.js";

export async function postCustomers(req, res) {

    let customers = await connection.query('SELECT * FROM customers');
    for(let i = 0; i<customers.rows.length;i++){
        if(customers.rows[i].cpf === req.body.cpf){
            res.sendStatus(409);
            return null;
        }
    }
    await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.cpf}', '${req.body.birthday}')`);
    res.sendStatus(201);
}
export async function putCustomers(req, res) {

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(400);
    }
    const result = await connection.query('SELECT * FROM customers WHERE id=$1', [id]);
    if (result.rows.length === 0) {
        return res.sendStatus(404);
    }
    await connection.query(`UPDATE customers SET name = '${req.body.name}', phone = '${req.body.phone}', cpf = '${req.body.cpf}', birthday = '${req.body.birthday}' WHERE id=$1`, [id]);
    res.sendStatus(200);
}
export async function getCustomers(req, res){

    let customers = await connection.query('SELECT * FROM customers');
    let customersRe = [];
    if(req.query.cpf){
        let queryCpf = req.query.cpf;
        let re = new RegExp(`^${queryCpf}`);
        for(let i = 0; i<customers.rows.length;i++){
            if(re.test(customers.rows[i].cpf)){
                customersRe.push(customers.rows[i]);
            }
        }
    }
    if(customersRe.length>0){
        res.send(customersRe);
    }
    else{
        res.send(customers.rows);
    }
}
export async function getCustomersId(req, res){

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.sendStatus(400);
    }
    const result = await connection.query('SELECT * FROM customers WHERE id=$1', [id]);
    if (result.rows.length === 0) {
        return res.sendStatus(404);
    }
    res.send(result.rows[0])
}