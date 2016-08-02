/**
 * Created by raul on 5/7/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var Tag = require('../models/tag.js');

    //GET - Obtener todas las tags de la colecccion tags de la BBDD
    ObtenerTags = function (req, res) {
        Tag.find(function (err, tags) {
            if (err) res.send(500, err.message);
            console.log('GET /tags');
            res.status(200).jsonp(tags);
        });
    };

    //POST - Agregar tag
    CrearTag =  function(req, res, next){
        var tag = new Tag(req.body);
        tag.save(function(err, tag){
            if(err){return next(err)}
            res.json(tag);
            console.log('POST /tag/' + req.body.tipo);
        })
    };

    //POST - Agregar tag login v2
    //Creartag = function(req, res){
    //    resultado = res;
    //    var login = req.body.login;
    //    //Comprueba si exite el login en la BD
    //    Usuario.find({login:login},function(err,usuario){
    //        //Si no exite
    //        if(usuario == "") {
    //            console.log('usuario no existente, OK');
    //            var usuario = new Usuario(req.body);
    //            usuario.save(function(err, usuario){
    //                if (err) return resultado.send(500, err.message);
    //                console.log('POST /user/' + req.body.nombre);
    //                resultado.status(200).jsonp(usuario);
    //            });
    //        } else {
    //            console.log('usuario ya existente');
    //            return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
    //        }
    //    });
    //};

    //POST - Añadir usuario en coleccion usuarios
    // CrearUsuario = function (req, res) {
    //     resultado = res;
    //     var login = req.body.login;
    //     //Comprueba si exite el login en la BD
    //     Usuario.find({login:login},function(err,usuario){
    //         //Si no exite
    //         if(usuario == ""){
    //             console.log('usuario no existente, OK');
    //             var usuario = new Usuario({
    //                 nombre:     req.body.nombre,
    //                 apellidos:  req.body.apellidos,
    //                 email:      req.body.email,
    //                 telefono:   req.body.telefono,
    //                 login:      req.body.login,
    //                 password:   req.body.password,
    //                 saldo:      req.body.saldo
    //             })
    //             usuario.save(function (err, usuario) {
    //                 if (err) return resultado.send(500, err.message);
    //                 resultado.status(200).jsonp(usuario);
    //                 console.log('POST /user/' + req.body.nombre);
    //             });
    //         }
    //         //Si existe
    //         else{
    //             console.log('usuario ya existente');
    //             return resultado.status(409).jsonp("El username: " + login + " ya existe, elije otro diferente.");
    //         }
    //     });
    // };

    //GET - Obtner tag a partir de el ID
    ObtenerTagporID = function (req, res) {
        Tag.findById(req.params.id, function (err, tag) {
            if (err) return res.send(500, err.message);
            console.log('GET /tag/' + req.params.id);
            res.status(200).jsonp(tag);
        });
    };

    //PUT Modificar datos de un tag existente por ID
    ModificarTag = function (req, res) {
        Tag.findById(req.params.id, function (err, tag) {
            console.log('PUT');
            console.log(req.body);
                tag.tipo     =  req.body.tipo,
                tag.contador =  req.body.contador
            tag.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(tag);
            });
        });
    };

    //DELETE - Eliminar tag v2
    EliminarTagporID = function(req, res){
        console.log('DELETE tag');
        console.log(req.params.id);
        Tag.findByIdAndRemove(req.params.id, function(err){
            if(err){res.send(err)}
            res.json({message: 'Tag eliminada correctamente'});
        })
    };


    //DELETE Eliminar usuario por ID
    // EliminarUsuarioporID = function (req, res) {
    //     console.log('DELETE usuario');
    //     console.log(req.params.id);
    //
    //     Usuario.findById(req.params.id, function (err, usuario) {
    //         usuario.remove(function (err) {
    //             if (!err)
    //                 console.log('Removed');
    //             else {
    //                 console.log('ERROR' + err);
    //             }
    //         })
    //     });
    //
    //     res.send('Usuario borrado');
    // };



    //GET Obtener todas las tags de la colecccion tags paginado
    ObtenerTagsP = function (req, res){
        console.log('post /obtenertagsP');
        var count  = req.query.count || 5;
        var page   = req.query.page || 1;

        var filter = {
            filters:
            {
                mandatory:
                {
                    contains: req.query.filter
                }
            }
        };
        var pagination =
        {
            start: (page - 1) * count,
            count: count
        };

        var sort =
        {
            sort:
            {
                desc: '_id'
            }
        };

        Tag
            .find({gender: req.params.gender})
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, tags) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(tags);
                }
            });

    };


    //ENDPOINTS
    app.post('/tag/CrearTag', CrearTag);
    app.get('/tag/ObtenerTags', ObtenerTags);
    app.get('/tag/ObtenerTagsPaginados', ObtenerTagsP);
    app.get('/tag/ObtenerTagporID/:id', ObtenerTagporID);
    app.put('/tag/ModificarTag/:id', ModificarTag);
    app.delete('/tag/EliminarTagporID/:id', EliminarTagporID);
}
