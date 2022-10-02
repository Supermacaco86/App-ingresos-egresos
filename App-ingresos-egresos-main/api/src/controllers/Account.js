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
    console.log("Se han cargado las cuentas correctamente.")
}catch(error){
    console.log(error)
}
}

const getAllAccount= async(req,res)=>{
    try {
       let allAccount =  await Account.findAll();
        res.status(200).send(allAccount)
        
    } catch (error) {
        console.log(error)
    } 
}

module.exports ={
    getInfoApiAccont,
    getAllAccount
}