# Rotas para o servidor

# Users

Modelo de Users

``` 
name: {
	type: String,
	required: true
},
email: {
	type: String,
	required: true,
	unique: true
},
password: {
	type: String,
	required: true
},
phone: {
	type: String,
	unique: true
}
```

#### GET /users

Retona todos os usuarios cadastrados. Recebe uma **query** de pesquisa no formato **Json**.

>**Exemplos:**

> - <http://localhost:1337/users> - Retorna uma lista de todos os usuarios.

> - <http://localhost:1337/users?name=Diego> - Retorna o(s) usuario(s) pelo nome.

> - <http://localhost:1337/users?name=Diego&email=diego@email.com> - Retorna o(s) usuario(s) pelo nome e email.

>**Obs.:** Um json pode ser usado para pesquisar.

>
```
{
    "name": "Diego Augusto",
    "email": "diego@email.com"
}
```

#### POST /users

Cria um usuario recebendo seus respectivos parametros.

#### PUT /users
Edita um usuario recebendo seus respectivos parametros.

#### DELETE /users
Deleta um usuario.

# Promotions

Modelo de Promotions

``` 
_company: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Establishment'
},
productName: String,
price: {
	unit: String,
	actual: Number,
	old: Number
},
startDate: Date,
endDate: Date,
reason: String,
shelf_life: Date,
conservation: String,
description: String,
images: [String],
evaluates: {
	user_likes: [mongoose.Schema.Types.ObjectId],
	comments: [{
		_user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		date: Date,
		text: String
	}]
}
```

#### POST /promotions
#### GET /promotions/search/name
#### POST /promotions/oldPromotions
#### POST /promotions/newPromotions
#### POST /promotions/addPromotion
#### POST /promotions/oldComments
#### POST /promotions/oldComments/newComments

#Establishment

Modelo de Establishment

``` 
name:{
	type: String,
	required: true
},
email: {
	type: String,
},
subtitle: {
	type: String,
},
imageUrl: {
	type: String
},
type: {
	type: String,
	required: true
},
cnpj: {
	type : String
},
phones:{
	 type: [String],
	 required: true
},
address: {
	street: {
		type: String,
		required: true
	},
	neighborhood: {
		type: String,
		required: true
	},
	number: {
		type: Number,
	},
	cep: {
	  	type: String
	}
}
```

#### GET /establishment/
#### GET /establishment/search
#### GET /establishment/byCity
#### POST /establishment
#### POST /establishment/promotions
#### POST /establishment/beginPromotions