var timeout = require('../resources/timeout/timeout.js'),
	Promotion = require('../models/promotionModel.js'),
	Notification = require('../models/notificationModel.js'),
	Comment = require('../models/CommentModel.js'),
	User = require('../models/UserModel.js'),
	Establishment = require('../models/EstablishmentModel.js'),
	EstablishmentController = require('../controllers/EstablishmentController.js'),
	mongoose = require('mongoose'),
	utils = require('../../Utils'),
	favoriteController = require('./favoriteController.js'),
	WebSocket = require('../resources/web_socket/WebSocket.js'),
	cloudinary = require('cloudinary');

exports.all = function (id, removeFinalizedPromotions, callback, reject) {
	var query = {};
	if (removeFinalizedPromotions) {
		query.endDate = { $gte: new Date(Date.now()) }
	}
	Promotion.find(query).sort({
		_id: -1
	}).populate('_company').exec(function (err, promotions) {
		if (err) {
			reject({
				error: 'Não foi possível encontrar promoções'
			});
		} else {
			callback(generateResponse(id, promotions));
		}
	});
};

exports.delete = (id, resolve, reject) => {
    Promotion.findByIdAndRemove(id, (error, establishment) => {
        if (error) {
            reject({
                error: 'Não foi possível excluir a Promoção'
            });
        } else {
			resolve({
				response: 'Promoção excluída com sucesso'
			});
        }
    });
};

exports.searchByName = (name, id, resolve) => {
	var where = {
		productName: {
			$regex: utils.createRegex(name),
			$options: 'i'
		}
	};

	console.log("Controller where", where);

	Promotion.find(where, (err, promotions) => {
		if (err) {
			resolve({
				content: {
					"success": false,
					"data": err
				}
			});
		} else {
			resolve({
				content: {
					"success": false,
					"data": generateResponse(id, promotions)
				}
			});
		}
	}).populate('_company').sort({ productName: 1 });
};

exports.listByPage = function (skip, limit, user_id, removeFinalizedPromotions, establishmentId, resolve, reject) {
	var query = establishmentId ? { _company: mongoose.Types.ObjectId(establishmentId) } : {};

	if (removeFinalizedPromotions) {
		query.endDate = { $gte: new Date(Date.now()) }
	}

	Promotion.find(query)
		.populate('_company')
		.sort({ _id: -1 })
		.skip(skip)
		.limit(limit)
		.exec(function (error, promotions) {
			if (error) {
				reject({
					error: 'Não foi possível novas promoçoes'
				});
			} else {
				resolve(generateResponse(user_id, promotions));
			}
		});
};

exports.listNewPromotions = function (firstPromotionId, limit, removeFinalizedPromotions, establishmentId, resolve, reject) {
	var objectId = mongoose.Types.ObjectId(firstPromotionId);
	var query = {
		_id: { $gt: objectId, $ne: objectId }
	};

	if (establishmentId) {
		query._company = mongoose.Types.ObjectId(establishmentId);
	}

	if (removeFinalizedPromotions) {
		query.endDate = { $gte: new Date(Date.now()) }
	}
	Promotion.find(query)
		.populate('_company')
		.sort({ _id: -1 })
		.limit(limit)
		.exec(function (error, promotions) {
			if (error) {
				reject({
					error: 'Não foi possível novas promoçoes'
				});
				console.log(error);
			} else {
				resolve(generateResponse(null, promotions));
			}
		});
};


exports.addLike = function (params, resolve, reject) {
	var user_id = params.user_informations._id;

	Promotion.findOneAndUpdate({
		_id: params.promotion_id
	}, {
			$push: {
				'evaluates.user_likes': user_id
			}
		}, {
			new: true
		}).exec(function (error, document) {
			if (error) {
				reject({
					content: {
						success: false,
						data: error
					}
				});
				console.log(error);
			} else {
				/*Incrementa totalOfPublications do Estabelecimento*/
				EstablishmentController.increaseNumberOfPromotions(document._company, function (result) {

					var success = result.content.success;
					var data = result.content.data;
					

					if (success) {
						
						var valorDoRank =  data.totalOfPublications == 0 ? 0 : (data.likes / data.totalOfPublications);
						
						/*Atualiza rank de um Estabelecimento depois de adicionar uma Promoção*/
						EstablishmentController.setRank(data._id, 1000000000, function (result) {
							if (result.success) {
								WebSocket.updateEstablishmentRank(result.content.data);
								console.log("Rank atualizado para %s", data.rank);
							} else {
								/*Erro ao mudar o rank de um Estabelecimento*/
								console.log(result.data);
							}
						});
					} else {
						/*Erro ao incrementar número de promoções*/
						console.log(result.data);
					}
				});
				
				console.log(document);
				establishmentLikesUpdate(document._company, 1, document, resolve, reject);
			}
		});
};

exports.removeLike = function (params, resolve, reject) {
	var user_id = params.user_informations._id;

	Promotion.findOneAndUpdate({
		_id: params.promotion_id
	}, {
			$pull: {
				'evaluates.user_likes': user_id
			}
		}, {
			new: true
		}).exec(function (error, document) {
			if (error) {
				reject({
					content: {
						success: false,
						data: error
					}
				});
				console.log(error);
			} else {
				/*Incrementa totalOfPublications do Estabelecimento*/
				EstablishmentController.increaseNumberOfPromotions(document._company, function (result) {

					var success = result.content.success;
					var data = result.content.data;
					
					if (success) {
						
						var valorDoRank = (data.likes / data.totalOfPublications);
						
						/*Atualiza rank de um Estabelecimento depois de adicionar uma Promoção*/
						EstablishmentController.setRank(data._id, valorDoRank, function (result) {
							if (result.success) {
								WebSocket.updateEstablishmentRank(result.content.data);
								console.log("Rank atualizado para %s", data.rank);
							} else {
								/*Erro ao mudar o rank de um Estabelecimento*/
								console.log(result.data);
							}
						});
					} else {
						/*Erro ao incrementar número de promoções*/
						console.log(result.data);
					}
				});
				establishmentLikesUpdate(document._company, -1, document, resolve, reject);
			}
		});
};

exports.addComment = function (comment, resolve) {
	var newComment = new Comment(comment);
	newComment.save(function (error) {
		if (!error) {
			Comment.populate(newComment, [{ path: '_user' }, { path: '_promotion' }], function (error, savedComment) {
				if (error) {
					resolve({ content: { success: false, data: error } });
					console.log(error);
				} else {
					resolve({ content: { success: true, data: savedComment } });
				}
			});

		} else {
			resolve({ content: { success: false, data: error } });
			console.log(error);
		}
	});
};

exports.removeComment = function (comment_id, resolve, reject) {
	Comment.findOne({
		_id: comment_id
	}).exec(function (error, comment) {
		if (!error) {
			comment.remove(function (error) {
				if (!error) {
					resolve({ content: { success: true, data: comment } });
				} else {
					reject({ content: { success: false, data: error } });
					console.log(error);
				}
			});
		} else {
			reject({ content: { success: false, data: error } })
		}
	});
};

exports.updateComment = function (comment_id, newText, resolve, reject) {
	Comment.findOneAndUpdate(
		{ _id: comment_id },
		{ $set: { text: newText } },
		{ new: true })
		.populate('_user _promotion')
		.exec(function (error, result) {
			if (error) {
				reject({ content: { success: false, data: error } });
				console.log(error);
			} else {
				resolve({ content: { success: true, data: result } });
			}
		});
};

exports.getOldComments = function (skip, limit, promotion_id, resolve, reject) {
	Comment.find({
		_promotion: promotion_id
	})
		.populate('_user _promotion')
		.sort({ _id: -1 })
		.skip(skip)
		.limit(limit)
		.exec(function (exception, comments) {
			if (exception) {
				reject({
					content: {
						success: false,
						data: exception
					}
				});
			} else {
				resolve({
					content: {
						success: true,
						data: comments
					}
				});
			}
		});
};

exports.getNewComments = function (limit, promotion_id, lastCommentId, resolve) {
	Comment.find({_promotion: promotion_id, _id: {$gt: lastCommentId}})
	.populate("_user _promotion")
	.sort({_id: -1})
	.limit(limit)
	.exec(function(error, comments){
		if(!error){
			resolve({
				content: {
					success: true,
					data: comments
				}
			});
		} else {
			resolve({
				content: {
					success: false,
					data: error
				}
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

exports.addPromotion = function (json, resolve, reject) {
	var imageUrl = unescapeHtml(json.images[0]);
	//cloudinary.uploader.upload(image, function (image) {
		json.images[0] = imageUrl;

		var promo = new Promotion(json);
		promo.save(function (error, promotion) {
			if (error) {
				console.log(error);
				reject({
					"content": {
						"success": false,
						"msg": 'Não foi possível adicionar promoção',
						"data": error
					}
				});
			} else {
				
				/*Incrementa totalOfPublications do Estabelecimento*/
				EstablishmentController.increaseNumberOfPromotions(promotion._company, function (result) {

					var success = result.content.success;
					var data = result.content.data;
					

					if (success) {
						
						var valorDoRank = (data.likes / data.totalOfPublications);
						
						/*Atualiza rank de um Estabelecimento depois de adicionar uma Promoção*/
						EstablishmentController.setRank(data._id, valorDoRank, function (result) {
							if (result.success) {
								WebSocket.updateEstablishmentRank(result.content.data);
								console.log("Rank atualizado para %s", data.rank);
							} else {
								/*Erro ao mudar o rank de um Estabelecimento*/
								console.log(result.data);
							}
						});
					} else {
						/*Erro ao incrementar número de promoções*/
						console.log(result.data);
					}
				});

				resolve({
					"content": {
						"success": true,
						"msg": 'Promoção criada com sucesso',
						"data": promotion
					}
				});
				favoriteController.getUsersByFavorite(promotion.productType, function (res) {
					if (res.content.success && res.content.data != null) {
						var users = res.content.data.users;
						//Itera sobre os usuários do favorito
						users.forEach(function (user) {
							new Notification({
								type: 'favorite',
								info: promotion,
								user: user._id
							})
								.save({ new: true }, function (error, notification) {
									if (!error) {
										Establishment.findOne({ _id: notification.info._company }).exec(function (error, company) {
											if (error) {

											} else {
												notification.info._company = company;
												WebSocket.notification(user._id, notification);
											}

										});

									} else {
										resolve({
											"content": {
												"success": false,
												"msg": 'Não foi possível adicionar promoção',
												"data": error
											}
										});
									}

								});

						});

					} else {
						//error
						console.error("Error no recuperar favoritos");
					}
				});

			}
		});
	//});
};

exports.remove = function (promotionId, user, callback) {
	Promotion.findOneAndUpdate({ _id: promotionId }, { $set: { favorite: true } }, { new: true },
		function (err, promotion) {
			if (err) {
				callback({
					"content": {
						"success": false,
						"data": err
					}
				});
			} else {
				callback({
					"content": {
						"success": true,
						"data": promotion
					}
				});
			}
		}
	);
};

function establishmentLikesUpdate(establishmentId, inc, promotionResult, resolve, reject) {
	var selection = {
		"_id": establishmentId
	};

	var update = {
		$inc: { likes: inc }
	};
	Establishment.update(selection, update, (error, estab) => {
		if (error) {
			reject({
				content: {
					success: false,
					data: error
				}
			});
		} else {
			
			var valorDoRank = (estab.likes / estab.totalOfPublications);
			
			/*Atualiza rank de um Estabelecimento depois de adicionar uma Promoção*/
			EstablishmentController.setRank(establishmentId, valorDoRank, function (result) {
				if (result.success) {
					WebSocket.updateEstablishmentRank(result.content.data);
					console.log("Rank atualizado para %s", result.data.rank);
				} else {
					/*Erro ao mudar o rank de um Estabelecimento*/
					console.log(result.data);
				}
			});
			resolve({
				content: {
					success: true,
					data: promotionResult
				}
			});
		}
	});
}

exports.saveFavorite = function (promotionId, name, user, callback) {
	Promotion.findOneAndUpdate({ _id: promotionId }, { $set: { favorite: true } }, { new: true },
			function (err, promotion) {
				var conditions = {
					name: promotion.productType
				};
				var update = {
					'$addToSet': {
						users: user
					}
				};
				var options = {
					upsert: true,
					new: true
				};
				Favorite.findOneAndUpdate(conditions, update, options, function (err, favorite) {
					if (err) {
						callback({
							"content": {
								"success": false,
								"data": err
							}
						});
					} else {
						callback({
							"content": {
								"success": true,
								"data": favorite
							}
						});
					}
				});
			}
	);
};

function generateResponse(user_id, promotions) {
	var promotion = [];
	for (var key in promotions) {
		var doc = promotions[key];

		var item = {
			_id: doc._id,
			company: doc._company,
			productName: doc.productName,
			productType: doc.productType,
			price: doc.price,
			startDate: doc.startDate,
			endDate: doc.endDate,
			reason: doc.reason,
			shelf_life: doc.shelf_life,
			conservation: doc.conservation,
			description: doc.description,
			images: doc.images,
			publishDate: doc._id.getTimestamp()
		};

		item.favorite = false;
		var objectId =  mongoose.Types.ObjectId(user_id);
		for(var i in doc.mark_as_favorite){

			if(objectId.toString() == doc.mark_as_favorite[i].toString()){
				item.favorite = true;
				break;
			}
		}

		var user_likes = promotions[key].evaluates.user_likes;
		if (user_likes.indexOf(user_id) > -1) {
			item.like = true;
		}
		item.likes = user_likes.length;
		item.finalized = isEnded(item.endDate);

		promotion.push(item);
	}
	return promotion;
}

function isEnded(date) {
	return Date.now() > new Date(date);
}

exports.promotionByTypes = function (productType, skip, limit, result) {
	Promotion.find({ productType: productType })
		.sort({ _id: -1 })
		.skip(skip)
		.limit(limit)
		.exec(function (err, promotions) {
			if (err) {
				result({
					"content": {
						"success": false,
						"data": err
					}
				});
			} else {
				result({
					"content": {
						"success": true,
						"data": promotions
					}
				});
			}
		});
};
