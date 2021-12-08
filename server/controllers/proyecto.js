//Modules and files
const AWS = require('aws-sdk');
const S3 = new AWS.S3({ apiVersion: 'latest', accessKeyId: "AKIA3MPXGIUB5WGKE4SB"	, secretAccessKey: "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" });
const bucket = "movile-apps"

const Proyecto = require('../models/proyecto');

//<-------------POST  create new user with password encryption ---------------->
const crearProyecto = async (req, res) => {

    const { titulo, propuesta,presupuesto,recaudado,tipo,registroUsuario,vistaPrevia } = req.body;
    let imagen = "";

    try {

        if(vistaPrevia !== ""){
            imagen = await uploadIMG(vistaPrevia, titulo)
        }
        const newProject = new Proyecto(
            {
                titulo, 
                propuesta,
                presupuesto,
                recaudado,
                tipo,
                registroUsuario,
                vistaPrevia: imagen
            });
        await newProject.save();
        res.status(200).json({
            ok: true,
            newProject,
            msg: 'Proyecto creado con exito'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: 'No se ha podido registrar el proyecto'
        });
    }
}
const getProyectos = async (req, res) => {
    try {
        console.log(req.params)
        const pagination = Number(req.query.pagination) || 0;
        console.log(pagination);
        const [proyectos, total] = await Promise.all([
            Proyecto.find({})
                .skip(pagination)
                .populate({path: 'registroUsuario', populate: {path: 'Usuarios'}})
                .populate({path: 'inversion', populate: {path: 'Inversion'}})
                .limit(),

            Proyecto.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            proyectos,
            total
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const getProyectosTipo = async (req, res) => {
    try {
        console.log(req.params)
        const pagination = Number(req.query.pagination) || 0;
        console.log(pagination);
        if(req.query.tipo === 'todos'){
            const [proyectos, total] = await Promise.all([
                Proyecto.find({})
                    .skip(pagination)
                    .populate({path: 'registroUsuario', populate: {path: 'Usuarios'}})
                    .limit(),
    
                Proyecto.countDocuments()
            ])
            res.status(200).json({
                ok: true,
                proyectos,
                total
            });
        }else{
        const [proyectos, total] = await Promise.all([
            Proyecto.find({tipo: req.query.tipo})
                .skip(pagination)
                .populate({path: 'registroUsuario', populate: {path: 'Usuarios'}})
                .populate({path: 'inversion', populate: {path: 'Inversion'}})
                .limit(),

            Proyecto.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            proyectos,
            total
        });
        }
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const getMisProyectos = async (req, res) => {
    try {
        console.log(req.query.id)
        const pagination = Number(req.query.pagination) || 0;
        console.log(pagination);
        const [proyectos, total] = await Promise.all([
            Proyecto.find({registroUsuario: req.query.id})
                .populate({path: 'registroUsuario', populate: {path: 'Usuarios'}})
                .populate({path: 'inversion', populate: {path: 'Inversion'}})
                //.populate({path: 'investorUser', populate: {path: 'Usuarios'}})

                //.populate('')
                ,
            Proyecto.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            proyectos,
            total
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}



//funcion subir img
async function uploadIMG(foto, propuesta) {
    let date = new Date()
    let fecha = date.getDate();
    let sec = date.getSeconds();
    let Key = `images/${propuesta}-${fecha}-${sec}.jpg`;
    let Img = Buffer.from(foto.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
        Key,
        Body: Img,
        Bucket: bucket,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    };
    const result = await S3.upload(data).promise();
    console.log(result)
    
    return result.Location
}
const deleteProyecto = async (req, res) => {
    try {
        const [inversiones] = await Promise.all([
            Proyecto.deleteMany({})
                
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
    crearProyecto,
    getProyectos,
    getMisProyectos,
    getProyectosTipo,
    deleteProyecto
}