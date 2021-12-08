
const Inversion = require('../models/inversion');
const Proyecto = require('../models/proyecto');

//<-------------POST  create new user with password encryption ---------------->
const crearInversion = async (req, res) => {

    const {  investorUser,proyecto,comentario,ofrece, registroUsuario } = req.body;

    try {
        const newInvest = new Inversion(
            {
                investorUser, 
                proyecto,
                comentarios: comentario,
                registroUsuario,
                ofrece
            });
        await newInvest.save();
        
        if(newInvest){
            const _id = proyecto;
            const proyectoVal = await Proyecto.findOne({ _id });
            if (proyectoVal) {
                if(proyectoVal.inversion){
                    console.log(newInvest._id)
                    console.log(proyectoVal.inversion)
                    await proyectoVal.inversion.push(newInvest._id)
                    console.log(proyectoVal.inversion)
                    const data = {
                        inversion: proyectoVal.inversion
                    }
                    const updatedProject = await Proyecto.findByIdAndUpdate(_id, data, { new: true });
                    if (updatedProject) {
                        console.log('inversion creada')
                        res.status(200).json({
                            ok: true,
                            newInvest,
                            updatedProject,
                            msg: 'Inversion creada con exito'
                        });    
                    }else{
                        console.log('No se pudo actualizar el proyecto')
                        res.status(400).json({
                            ok: false,
                            msg: 'No se pudo actualizar el proyecto'
                        });    
                    }  
                }else{
                    
                }
                
            }else{
                console.log('El proyecto no existe')

                res.status(400).json({
                    ok: false,
                    msg: 'El proyecto no existe'
                });    
            }
            
        }else{
            console.log('No se pudo crear la inversion')
            res.status(400).json({
                ok: false,
                msg: 'No se pudo crear la inversion'
            });  
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: 'No se ha podido registrar la inversion'
        });
    }
}
const getInversiones = async (req, res) => {
    try {
        console.log(req.query)
        const registroUsuario = req.query.id
        const [inversiones, total] = await Promise.all([
            Inversion.find({registroUsuario})
                .populate({path: 'proyecto', populate: {path: 'Proyectos'}})
                // .populate({path: 'inversion', populate: {path: 'Inversion'}})
                // .limit()
                ,

            Inversion.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            inversiones,
            total
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const getInversion = async (req, res) => {
    try {
        console.log(req.query)
        const _id = req.query.id
        const [inversion, total] = await Promise.all([
            Inversion.findOne({_id})
                .populate({path: 'proyecto', populate: {path: 'Proyectos'}})
                // .populate({path: 'inversion', populate: {path: 'Inversion'}})
                // .limit()
                ,

            Inversion.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            inversion,
            total
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const aceptarInversion = async (req, res) => {
    try {
        console.log(req.body)
        const {idInv, idProyecto, comentario} = req.body
        let data ={
            tieneInversionista: true
        }
        const updatedProject = await Proyecto.findByIdAndUpdate(idProyecto, data, { new: true });
        if(updatedProject){
            const inversion = await Inversion.findOne({_id: idInv})
            inversion.comentarios.push(comentario)
            let dataInv = {
                status: 'aceptada',
                comentarios: inversion.comentarios
            }
            const [UpdatedInv, total] = await Promise.all([
                Inversion.findByIdAndUpdate(idInv, dataInv, { new: true })
                ,
    
                Inversion.countDocuments()
            ])
            res.status(200).json({
                ok: true,
                UpdatedInv,
                updatedProject
            });
        }else{
            console.log('No se pudo crear la inversion')
            res.status(400).json({
                ok: false,
                msg: 'No se pudo actualizar el proyecto'
            });
        }
        
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const postComentario = async (req, res) => {
    try {
        const {id, comentario} = req.body
    
        const inversion = await Inversion.findOne({_id: id})
        inversion.comentarios.push(comentario)
         let data = {
         comentarios: inversion.comentarios
         }
        console.log(id)
        const [investUpdated] = await Promise.all([
            Inversion.findByIdAndUpdate(id, data, { new: true })      
        ])
        res.status(200).json({
            ok: true,
            investUpdated
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const deleteInversiones = async (req, res) => {
    try {
        const [inversiones] = await Promise.all([
            Inversion.deleteMany({})
                
        ])
        res.status(200).json({
            ok: true,
            inversiones
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}


//Exporting functions for the use in other files
module.exports = {
    crearInversion,
    getInversiones,
    deleteInversiones,
    postComentario,
    getInversion,
    aceptarInversion
}