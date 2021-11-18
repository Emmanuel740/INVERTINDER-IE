//Modules and files
const Inversionista= require('../models/inversionista');




const getInversionistas = async (req, res) => {
    try {
        const inversionistas = await Inversionista.find()
            .populate('registroUsuario' ,'nombre apellidos')
           
        // allArticles.date.toDateString();

        await
            res.json({
                status: 200,
                ok: true,
                inversionista:inversionistas
            })
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}

const crearInversionista = async (req, res) => {
    const _id = req._id;
  
    //retornaremos el id una vez que se hayan guardado los documentos y la extraremos y la usaremos aqui
    const _idDocumentos="61928f539f796f44374c1481" //simulacio del id


    const newInversionista = new Inversionista({
        registerUser:_id,
        documentosInversionista:_idDocumentos,
         ...req.body
        });
    const ExistsInversionista=newInversionista.registerUser;
   
        const inversionistaDB = await Inversionista.findOne({ registroUsuario: ExistsInversionista});
        try {
            if (inversionistaDB) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya eres inversionista `
                });
            }    
            await newInversionista.save();
            res.status(200).json({
                ok: true,
                newInversionista,
               
            }); 

       


    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: 'No se ha podido registrar el inversionista'
        });

    }
}



const deleteInversionista = async (req, res) => {
    const _id = req.params.id;

    try {

        const inversionistaDB = await Inversionista.findById(_id);
        if (!inversionistaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el inversionista con ese id'
            });
        }
        // await Article.findByIdAndUpdate(_id,{ status: false }, {new: true });
        await Inversionista.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: "Inversionista eliminado"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'El inversionista no ha podido ser eliminado'
        })
    }
}
//Exporting functions for the use in other files
module.exports = {
   crearInversionista,
   getInversionistas,
   deleteInversionista
}