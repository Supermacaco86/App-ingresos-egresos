const Sequelize = require("sequelize");
const axios = require("axios");
const {Account} = require("../db");

const getInfoApiAccont = async (req, res)=>{
  try { 
    const apiAccount = await axios.get('https://api-ingresos-egresos-default-rtdb.firebaseio.com/cuentas.json');
    const account = await apiAccount.data;
    account.forEach((e) => {
        Account.findOrCreate({
            where:{
                id: e.id,
                name_account: e.name_account,
                id_account: e.id_account
            }
        })
    })
    console.log(account)
    res.status(200).send(account);
}catch(error){
    console.log(error)
}
    

}

module.exports ={
    getInfoApiAccont
}