//Modules and files
const DocUsuario= require('../models/documentoUsuario');




const getDocUsuario = async (req, res) => {
    try {
        const documentacion= await DocUsuario.find()
            .populate('perteneceUsuario','nombre apellidos')
        await
            res.json({
                status: 200,
                ok: true,
                docuemntacion:documentacion
            })
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}

const uploadDocUsuario = async (req, res) => {
    const _id = req._id;
    const newDocUsuario = new DocUsuario({
        registerUser:_id,
         ...req.body
        });
        
    const ExistsDoc=newDocUsuario.registerUser;
   
        const docUsuarioDB = await DocUsuario.findOne({ registroUsuario: ExistsDoc});
        try {
            if (docUsuarioDB) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya haz registrado tu documentacion `
                });
            }    
            await newDocUsuario.save();
            res.status(200).json({
                ok: true,
                msg:`Se agrego la documentacion de ${newDocUsuario.registerUser?.name}`,
                newDocUsuario,
               
            }); 

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: 'No se ha podido registrar el inversionista'
        });

    }
}



const deleteDocUsuario = async (req, res) => {
    const _id = req.params.id;
    try {
        const docUsuarioDB = await DocUsuario.findById(_id);
        if (!docUsuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha agregado documentacionde usuario'
            });
        }
        // await Article.findByIdAndUpdate(_id,{ status: false }, {new: true });
        await DocUsuario.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: "La documentacion se ha eliminado"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un problema con el servidor'
        })
    }
}
//Exporting functions for the use in other files
module.exports = {
  getDocUsuario,
  uploadDocUsuario,
  deleteDocUsuario
}