const {default: axios} = require ("axios");
const {User, Process} = require("../db");
const { Op } = require("sequelize");

async function createUserDb(req, res){
    try{
        const infoApi = await axios.get("https://app-balance-9e080-default-rtdb.firebaseio.com/personal.json");
        //  console.log(infoApi)
        const infApiMap= infoApi.data.map((e)=>{
            return {
                id:e.id,
                name:e.name,
                adress:e.adress,
                avatar:e.avatar,
                document:e.document,
                phone:e.phone
            };
        });
    // console.log("soy infApi",infApiMap)
    infApiMap.forEach(e=>{
        User.findOrCreate({
            where:{
                id:e.id,
                name:e.name,
                adress:e.adress,
                avatar:e.avatar,
                document:e.document,
                phone:e.phone,
                balance:"0"             
            }
        });
    })
    console.log("Se ha cargado los datos correctamente")
    }catch(error){
        console.log(error)
    }
}
// funcion para enviar todo  el user
const getAllUser= async(req,res)=>{
    try {
       let allUser =  await User.findAll({
            include:[{
                    model:Process,
                    attribute:["description"]
                }]
        });
        res.status(200).send(allUser)
        
    } catch (error) {
        console.log(error)
    } 
}

// funcion para enviar el detalle del user por id
const getUserById = async (req, res)=>{
    let {id} = req.params;
    const userById = await User.findOne({
        include:[{
            model:Process,
            attribute:["description"]
        }],
        where:{id:id}
    })
    res.status(200).send(userById);
}

// funcion para buscar el personal por el nombre
const getUserByName= async(req,res)=>{
    const {name}= req.query;
    if(name){
        try {
            let userByName = await User.findAll({
                include:[{
                    model:Process,
                    attribute:["description"]
                }],
                where:{
                    name:{[Op.iLike ]: name +'%'},
                }
            })
            userByName.length?
            res.status(200).send(userByName): res.status(404).send("No existe registro de la persona a buscar")
        } catch (error) {
            console.log(error)           
        }
    }


}

const postUser = async (req, res)=>{
    let { name,avatar, document,adress,phone} = req.body;
    try {
        const user = {name,avatar, document,adress,phone}
        if(isNaN(name)===false){
            return res.send("El valor ingresado no debe ser numerico");

        }
        if(!name || !avatar || !document || !adress ||  !phone) res.send("Falta informacion");
        const validate = await User.findOne({
            where:{document},
        })
        if(!validate){
            const newUser = await User.create(user);
            // res.status(200).send("creado")
            res.status(200).send(`La persona ${name} con numero de documento ${document} se registro correctamente`)

        }else{
            res.status(400).send(`No se puede registrar la persona ${name}  porque ya existe el numero de documento ${document} en la base de datos`)
        }
    } catch (error) {
        console.log(error)
    }
}

const putUser = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,avatar, document,adress, phone} = req.body;
      const editUser = await User.update(
        {
            name,avatar, document,adress, phone
        },
        { where: { id: id } }
      );
      res.send(`Se ha modificado la persona con id ${editUser}`);
    } catch (error) {
      return error;
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      await User.destroy({
        where: { id: id },
      });
      return res.send("User deleted!");
    } catch (error) {
      return error;
    }
  };
  
  const restoreUser = async(req, res) => {
      let { id } = req.params;
      try {
          await User.restore({
              where: {
                  id: id
              }
          });
          const restoreUser = await user.findOne({
              where: {
                  id: id
              }
          })
          res.status(200).send(`La persona con id ${id} se ha restaurado con exito`)
      } catch (error) {
          res.status(400).send('Hubo un problema recuperando el usuario')
      }
  }


module.exports = {
    createUserDb, 
    getAllUser, 
    getUserById, 
    getUserByName, 
    postUser, 
    putUser,
    deleteUser, 
    restoreUser}