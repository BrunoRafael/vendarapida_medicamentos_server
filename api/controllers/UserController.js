var User = require('../models/UserModel.js');
var promotionController = require('./PromotionController.js');
var cloudinary = require('cloudinary');

exports.list = (resolve, reject) => {
    User.find({}, (error, users) => {
        if (error) {
            reject({
                error: 'Não foi possivel retornar os usuários'
            });
        } else {
            resolve(users);
        }
    });
};

exports.user = (query, resolve, reject) => {
    delete query.token;
    User.find(query, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possivel retornar o usuário'
            });
        } else {
            resolve(user);
        }
    });
};

exports.save = (name, email, password, phone, resolve, reject) => {
    this.verificaEmail(email).then((permicao) => {
        if (permicao) {
            new User({
                'name': name,
                'email': email,
                'password': password,
                'phone': phone
            }).save((error, user) => {
                if (error) {
                    console.log(error);
                    reject({
                        error: 'Não foi possível salvar o usuário',
                        code: 400
                    });
                } else {
                    resolve({
                        "msg": "Usuário salvo com sucesso",
                        "user": user
                    });
                }
            });
        } else {
            reject({
                error: 'E-mail já cadastrado. Por favor insira outro e-mail',
                code: 422
            });
        }
    });
};

exports.setPassword = (id, oldPassword, password, resolve, reject) => {
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            reject({
                error: "Erro ao acessar banco de dados"
            });
        } else if (!user) {
            reject({
                error: 'Usuário não encontrado!'
            });
        } else if (user) {
            user.passwordVerification(oldPassword, function(ismatch) {
                if (ismatch) {
                   user.password = password;
                user.save((error,user) => {
                        if (error) {
                            reject({
                                error: 'Não foi possível atualizar o usuário'
                            });
                        } else {
                            resolve({
                                sucess: 'Senha atualizada com sucesso',
                                "user": user
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.update = (id, name, email, phone, language, password, resolve, reject) => {

    var selection = {
        "_id": id
    };

    var update = {
        "name": name,
        "email": email,
        "phone": phone,
        "language": language,
        "password": password
    };

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                "msg": "Usuário atualizado com sucesso",
                "user": user
            });
        }
    });
};

exports.updateLanguage = (id, language, resolve, reject) => {

    var selection = {
        "_id": id
    };

    var update = {
        "settings.language": language
    };

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                "msg": "Usuário atualziado com sucesso",
                "user": user
            });
        }
    });
};

exports.updateFinalizedPromotions = function(user_id, removeFinishPromotions, resolve, reject){
    User.update({
        _id: user_id
    }, {
        $set: {
            'settings.removeFinishPromotions': removeFinishPromotions
        }
    },function(error) {
        if (error) {
            reject({
                content: {
                    success: false,
                    data: error
                }
            });
            console.log(error);
        } else {
            promotionController.listByPage(0, 10, user_id, removeFinishPromotions, null,
                function(promotions){
                    resolve({
                        content: {
                            success: true,
                                data: promotions
                        }
                    })
            }, function(error){
                    reject({
                        content: {
                            success: false,
                            data: error
                        }
                    })
                }
            );
        }
    });
};

exports.updateVibrationSettings = function(user_id, vibration, resolve, reject){
    User.update({
        _id: user_id
    }, {
        $set: {
            'settings.vibration': vibration
        }
    },function(error) {
        if (error) {
            reject({
                content: {
                    success: false,
                    data: error
                }
            });
            console.log(error);
        } else {
            promotionController.listByPage(0, 10, user_id, vibration, null,
                function(promotions){
                    resolve({
                        content: {
                            success: true,
                            data: promotions
                        }
                    })
                }, function(error){
                    reject({
                        content: {
                            success: false,
                            data: error
                        }
                    })
                }
            );
        }
    });
};

exports.updateName = (id, name, resolve, reject) => {

    var selection = {
        "_id": id
    };

    var update = {
        "name": name
    };

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                "msg": "Usuário atualziado com sucesso",
                "user": user
            });
        }
    });
};

exports.updateEmail = (id, email, resolve, reject) => {

    var selection = {
        "_id": id
    };

    var update = {
        "email": email
    };

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                "msg": "Usuário atualziado com sucesso",
                "user": user
            });
        }
    });
};

exports.updatePhone = (id, phone, resolve, reject) => {

    var selection = {
        "_id": id
    };

    var update = {
        "phone": phone
    };

    var option = {
        "new": true
    };

    User.findOneAndUpdate(selection, update, option, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível atualizar o usuário'
            });
        } else {
            resolve({
                "msg": "Usuário atualziado com sucesso",
                "user": user
            });
        }
    });
};

function unescapeHtml(unsafe) {
    return unsafe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#x2F;/g, "\/")
        .replace(/&#039;/g, "'");
}

exports.updatePhoto = (id, photo, resolve, reject) => {
    var image = unescapeHtml(photo);
    console.log("Image URL : " + image);
    cloudinary.uploader.upload(image, function(result) {
        var selection = {
            "_id": id
        };
        
        var update = {
            "photo": result.url
        };
        
        var option = {
            "new": true
        };
        
        User.findOneAndUpdate(selection, update, option, (error, user) => {
            if (error) {
                reject({
                    error: 'Não foi possível atualizar o usuário'
                });
            } else {
                resolve({
                    "msg": "Usuário atualziado com sucesso",
                    "user": user
                });
            }
        });
    }, {public_id:id});
};

exports.delete = (id, resolve, reject) => {
    User.findById(id, (error, user) => {
        if (error) {
            reject({
                error: 'Não foi possível retornar o usuário'
            });
        } else {
            user.remove((error) => {
                if (!error) {
                    resolve({
                        response: 'Usuário excluído com sucesso'
                    });
                }
            });
        }
    });
};

this.verificaEmail = (email) => {
    return User.find({
        'email': email
    }).then((existUser) => {
        if (existUser.length === 0) {
            return true;
        } else {
            return false;
        }
    }, () => {
        return false;
    });
};

exports.findUserByEmail = function(email, resolve, reject) {
    return User.find({
        'email': email
    }, function(error, user) {
        if (error) {
            reject({
                error: 'Não foi possivel retornar o usuário'
            });
        } else {
            resolve(user);
        }
    });
};

exports.find = function(conditions, callback){
    User.find(conditions).exec(function(error, users){
        var result = {
            content: { data: users, success: true }
        };
        if(error){
            result.content.success = false;
        }
        callback(result);
    });
};