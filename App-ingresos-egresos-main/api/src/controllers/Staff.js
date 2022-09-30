const {default: axios} = require ("axios");
const {Staff, Process} = require("../db");
const { Op } = require("sequelize");

async function createStaffDb(req, res){
    try{
        const infoApi = await axios.get("https://app-balance-9e080-default-rtdb.firebaseio.com/personal.json");
        // console.log(infoApi)
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
    console.log("soy infApi",infApiMap)
    infApiMap.forEach(e=>{
        Staff.findOrCreate({
            where:{
                id:e.id,
                name:e.name,
                adress:e.adress,
                avatar:e.avatar,
                document:e.document,
                phone:e.phone

            }
        });
    })
    console.log("Se ha cargado los datos correctamente")
    }catch(error){
        console.log(error)
    }
}
// funcion para enviar todo  el staff
const getAllStaff= async(req,res)=>{
    try {
       let allStaff =  await Staff.findAll({
            include:[{
                    model:Process,
                    attribute:["description"]
                }]
        });
        res.status(200).send(allStaff)
        
    } catch (error) {
        console.log(error)
    } 
}

// funcion para enviar el detalle del personal por id
const getStaffById = async (req, res)=>{
    let {id} = req.params;
    const staffById = await Staff.findOne({
        include:[{
            model:Process,
            attribute:["description"]
        }],
        where:{id:id}
    })
    res.status(200).send(staffById);
}

// funcion para buscar el personal por el nombre
const getStaffByName= async(req,res)=>{
    const {name}= req.query;
    if(name){
        try {
            let staffByName = await Staff.findAll({
                include:[{
                    model:Process,
                    attribute:["description"]
                }],
                where:{
                    name:{[Op.iLike ]: name +'%'},
                }
            })
            staffByName.length?
            res.status(200).send(staffByName): res.status(404).send("No existe registro de la persona a buscar")
        } catch (error) {
            console.log(error)           
        }
    }


}

const postStaff = async (req, res)=>{
    let { name,avatar, document,adress,phone} = req.body;
    try {
        const staff = {name,avatar, document,adress,phone}
        if(isNaN(name)===false){
            return res.send("El valor ingresado no debe ser numerico");

        }
        if(!name || !avatar || !document || !adress ||  !phone) res.send("Falta informacion");
        const validate = await Staff.findOne({
            where:{document},
        })
        if(!validate){
            const newStaff = await Staff.create(staff);
            // res.status(200).send("creado")
            res.status(200).send(`La persona ${name} con numero de documento ${document} se registro correctamente`)

        }else{
            res.status(400).send(`No se puede registrar la persona ${name}  porque ya existe el numero de documento ${document} en la base de datos`)
        }
    } catch (error) {
        console.log(error)
    }
}

const putStaff = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,avatar, document,adress, phone} = req.body;
      const editStaff = await Staff.update(
        {
            name,avatar, document,adress, phone
        },
        { where: { id: id } }
      );
      res.send(`Se ha modificado la persona con id ${editStaff}`);
    } catch (error) {
      return error;
    }
  };
  
  const deleteStaff = async (req, res) => {
    try {
      const id = req.params.id;
      await Staff.destroy({
        where: { id: id },
      });
      return res.send(" Staff deleted!");
    } catch (error) {
      return error;
    }
  };
  
  const restoreStaff = async(req, res) => {
      let { id } = req.params;
      try {
          await Staff.restore({
              where: {
                  id: id
              }
          });
          const restoreStaff = await Staff.findOne({
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
    createStaffDb, 
    getAllStaff, 
    getStaffById, 
    getStaffByName, 
    postStaff, 
    putStaff,
    deleteStaff, 
    restoreStaff}