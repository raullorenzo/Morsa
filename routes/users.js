/**
 * Created by raul on 5/7/16.
 */

module.exports = function (app) {

    var mongoose = require('mongoose');
    var User = require('../models/user.js');

    //GET - Obtener todos los users de la colecccion users de la BBDD
    ObtenerUsers = function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(500, err.message);

            console.log('GET /users')
            res.status(200).jsonp(users);
        });
    };

    //POST - Agregar user username v2
    CrearUser = function(req, res){
      resultado = res;
      var username = req.body.username;
      //Comprueba si exite el username en la BD
      User.find({username:username},function(err,user){
        //Si no exite
        if(user == "") {
          console.log('user no existente, OK');
          var user = new User(req.body);
          user.save(function(err, user){
            if (err) return resultado.send(500, err.message);
            console.log('POST /user/' + req.body.nombre);
            resultado.status(200).jsonp(user);
          });
        } else {
          console.log('user ya existente');
          return resultado.status(409).jsonp("El username: " + username + " ya existe, elije otro diferente.");
        }
      });
    };

    //GET - Obtner user a partir de el ID
    ObtenerUserporID = function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) return res.send(500, err.message);
            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(user);
        });
    };

    //PUT Modificar datos de un user existente por ID
    ModificarUser = function (req, res) {
        console.log('PUT/  = '+req.body.username );
        User.findById(req.params.id, function (err, user) {
                user.nombre     =  req.body.nombre,
                user.apellidos  =  req.body.apellidos,
                user.email      =  req.body.email,
                user.telefono   =  req.body.telefono,
                user.username   =  req.body.username,
                user.password   =  req.body.password,
                user.activo     =  req.body.activo,
                user.foults     =  req.body.foults,
                user.relevancia =  req.body.relevancia,
                user.followers  =  req.body.followers,
                user.followings =  req.body.followings
            user.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(user);
            });
        });
    };

    //DELETE - Eliminar user v2
    EliminarUserporID = function(req, res){
      console.log('DELETE user');
      console.log(req.params.id);
      User.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
        res.json({message: 'User eliminado correctamente'});
      })
    };

    //POST loginIN Hacer username user
    loginIN = function (req, res) {
        console.log('post /username');
        console.log(req.body);
        resultado = res;
        var username = req.body.username;
        User.find({username:username},function(err,user){
            if(user.length == 0){
                return resultado.status(404).jsonp({"loginSuccessful": false, "username": username});
            }
            else {
                console.log(user);
                //console.log("username",user.username);
                if (user[0].password==req.body.password) {
                    console.log("OK",req.body.password);
                    return resultado.status(200).jsonp({"loginSuccessful": true, "user": user});
                }
                else {
                    console.log("KO", req.body.password);
                    console.log("KO", user[0].password)
                    return resultado.status(404).jsonp({"loginSuccessful": false, "username": username});
                }
            }
        });
    };

    //GET Obtener todos los users de la colecccion users paginado
    ObtenerUsersP = function (req, res){
        console.log('post /obtenerusersP');

        var sort;
        var sortObject = {};
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

        if (req.query.sorting) {
            var sortKey = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject.desc = '_id';
        }

        sort = {
            sort: sortObject
        };

        User
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function(err, users) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(users);
                }
        });

    };

    //ENDPOINTS
    app.post('/user/CrearUser', CrearUser);
    app.get('/user/ObtenerUsers', ObtenerUsers);
    app.get('/user/ObtenerUsersPaginados', ObtenerUsersP);
    app.get('/user/ObtenerUserPorID/:id', ObtenerUserporID);
    app.put('/user/ModificarUserPorID/:id', ModificarUser);
    app.delete('/user/EliminarUserPorID/:id', EliminarUserporID);
    app.post('/user/Login', loginIN);
}
