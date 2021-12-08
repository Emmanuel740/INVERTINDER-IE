const Comentario = require('../models/Comentario');

const crearComentario = async (req, res) => {
    try {
        const {user, fecha, comentario} = req.body;
        const newComment = new Comentario(
            {
                user, 
                fecha,
                comentario
            });
        await newComment.save();
        res.status(200).json({
            ok: true,
            newComment
        });

    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}
const getComentarios = async (req, res) => {
    try {
        
        const [comments, total] = await Promise.all([
            Comentario.find({})
                .populate({path: 'user', populate: {path: 'Usuarios'}})
                
                //.populate({path: 'investorUser', populate: {path: 'Usuarios'}})

                //.populate('')
                ,
            Comentario.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            comments,
            total
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}

module.exports = {
    crearComentario,
    getComentarios
}