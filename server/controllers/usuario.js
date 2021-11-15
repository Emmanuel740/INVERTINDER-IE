//Modules and files

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

//<-------------GET all users  ---------------->

const getUsuarios = async (req, res) => {
    try {
        const pagination = Number(req.query.pagination) || 0;
        console.log(pagination);
        const [usuarios, total] = await Promise.all([
            Usuario.find({}, '_id nombre user email')
                .skip(pagination)
                .limit(5),

            Usuario .countDocuments()
        ])
        res.status(200).json({
            ok: true,
            usuarios,
            total
        });
    } catch (err) {
        res.status(500).send({ error: 'Ha ocurrido un problema con el servidor' });
        console.log(err);
    }
}

//<-------------POST  create new user with password encryption ---------------->
const crearUsuario = async (req, res) => {

    const { nombre, apellidos,user,email,password,telefono,img } = req.body;

    try {

        // Validation of user with username
        const validacionUser = await Usuario.findOne({ user });
        if (validacionUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esta registrado'
            });
        }
         // Validation of user with username
         const validacionEmail = await Usuario.findOne({ email });
         if (validacionEmail) {
             return res.status(400).json({
                 ok: false,
                 msg: 'El email ya esta registrado'
             });
         }
        //password encryption with bycryptjs
        const password = await bcryptjs.hash(req.body.password, 12);
        const newUsuario = new Usuario(
            {
                nombre,
                apellidos,
                user,
                email,
                telefono,
                password,
                img,
            });
        // const salt = bcryptjs.genSaltSync();
        // users.password = bcryptjs.hashSync(password, salt);
        await newUsuario.save();

        const token = await generateJWT(newUsuario._id);

        res.status(200).json({
            ok: true,
            newUsuario,
            token,
            msg: 'Usuario creado con exito'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: 'No se ha podido registrar el usuario'
        });
    }
}

//<-------------------PUT edit user  --------------------------------->
const editarUsuario = async (req, res) => {

    const _id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(_id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese id'
            });
        }
        //Includes all values ​​except those before 3 points
        const { password, user,email, ...dataUsuario} = req.body;

        //validation of if exist user before modify
        if (usuarioDB.user !== req.body.user) {

            const validacionUsuario = await Usuario.findOne({ user });
            if (validacionUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El nombre de usuario ya esta registrado'
                });
            }
        }
            if (usuarioDB.email !== req.body.email) {

            const validacionEmail = await Usuario.findOne({ email });
            if (validacionEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya esta registrado'
                });
            }
        }

        //Update user
        dataUsuario.user = user;
        dataUsuario.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(_id, dataUsuario, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar al usuario'
        })
    }
}

//<-------------DELETE delete user in the database----------------->
const eliminarUsuario = async (req, res) => {
    const _id = req.params.id;

    try {

        //Find user by id in db
        const usuarioDB = await Usuario.findById(_id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese id'
            });
        }
        //Delete user by id in db
        await Usuario.findByIdAndDelete(_id);

        res.json({
            ok: true,
            msg: "Usuario eliminado con exito"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido actualizar al usuario'
        })
    }
}
//Exporting functions for the use in other files
module.exports = {
    getUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}