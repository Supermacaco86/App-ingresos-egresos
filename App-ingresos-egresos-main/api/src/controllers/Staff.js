const {default: axios} = require ("axios");
const {Staffs, Process} = require("../db");
const { Op } = require("sequelize");

async function createStaffDb(req, res){
    try{
        const infoApi = await axios.get("https://app-balance-9e080-default-rtdb.firebaseio.com/personal.json");
        // console.log(infoApi)
        const infApiMap= infoApi.data.map((e)=>{
            return {
                id:e.id,
                name:e.name,
                address:e.adress,
                avatar:e.avatar,
                document:e.document,
                phone:e.phone
            };
        });
    console.log("soy infApi",infApiMap)
    infApiMap.forEach(e=>{
        Staffs.findOrCreate({
            where:{
                id:e.id,
                name:e.name,
                addres:e.address,
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
       let allStaffs =  await Staffs.findAll({
            include:[{
                    model:Process,
                    attribute:["description"]
                }]
        });
        res.status(200).send(allStaffs)
        
    } catch (error) {
        console.log(error)
    } 
}

// funcion para enviar el detalle del personal por id
const getStaffById = async (req, res)=>{
    let {id} = req.params;
    const staffById = await Staffs.findOne({
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
            let staffByName = await Staffs.findAll({
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
    let { name,avatar, document,addres,phone} = req.body;
    try {
        const staff = {name,avatar, document,addres,phone}
        if(isNaN(name)===false){
            return res.send("El valor ingresado no debe ser numerico");

        }
        if(!name || !avatar || !document || !addres ||  !phone) res.send("Falta informacion");
        const validate = await Staffs.findOne({
            where:{document},
        })
        if(!validate){
            const newStaff = await Staffs.create(staff);
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
        name,avatar, document,addres, phone} = req.body;
      const editStaff = await Staffs.update(
        {
            name,avatar, document,addres, phone
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
      await Staffs.destroy({
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
          await Staffs.restore({
              where: {
                  id: id
              }
          });
          const restoreStaff = await Staffs.findOne({
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