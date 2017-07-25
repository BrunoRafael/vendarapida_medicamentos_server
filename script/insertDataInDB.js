var Promotion =require('../api/models/promotionModel.js'),
    Hint =require('../api/models/HintModel.js'),
    User = require('../api/models/UserModel.js'),
    Establishment = require('../api/models/EstablishmentModel.js');

var promotions = [
  {
    _company: null,
    productName: 'Amoxicilina 500MG',
    productType: 'Antibiotico',
    price: { unit: '4 Unid.', actual: 15.00, old: 22.80},
    startDate: 1496890800000,
    endDate: 1498014000000,
    reason: 'Validade',
    conservation: 'Natural',
    images: ['http://cervejastore.vteximg.com.br/arquivos/ids/158557-1000-1000/Budweiser-Lt350.jpg'],
    evaluates: {
      user_likes: []
    }
  },

  {
    _company: null,
    productName: 'Amaciante Mon Biju 2L',
    productType: 'Amaciante',
    price: { unit: 'Unidade', actual: 15.58, old: 23.37},
    startDate: 1496890800000,
    endDate: 1498014000000,
    reason: 'Promoção',
    conservation: 'Natural',
    images: ['https://http2.mlstatic.com/amaciante-mon-bijou-magia-perfume-sedutor-2-litros-D_NQ_NP_892405-MLB20864558544_082016-F.jpg'],
    evaluates: {
      user_likes: []
    }
  },
  {
    _company: null,
    productName: 'Cerveja Skol 473ML',
    productType: 'Cerveja',
    price: { unit: 'Unidade', actual: 2.39, old: 2.99},
    startDate: 1496890800000,
    endDate: 1498014000000,
    reason: 'Promoção',
    conservation: 'Natural',
    images: ['http://savegnago.vteximg.com.br/arquivos/ids/278451-1000-1000/CERVEJA-SKOL-473ML-LATA.jpg'],
    evaluates: {
      user_likes: []
    }
  },
  {
    _company: null,
    productName: 'Refrigerantes Fanta e Sprite',
    productType: 'Refrigerante',
    price: { unit: '3 Unid.', actual: 11.37, old: 17.07},
    startDate: 1496890800000,
    endDate: 1498014000000,
    reason: 'Promoção',
    conservation: 'Natural',
    images: ['http://www.centralcarioca24horas.com.br/wp-content/uploads/2015/10/FANTA_SPRITE_2_L.png'],
    evaluates: {
      user_likes: []
    }
  }

];
  var establishments = [
        {
          name: 'Supermercado Ideal',
          email: 'ideal_supermercado@mail.com',
          password: '123456',
          subtitle: 'Este sim, é da nossa terra',
          imageUrl: 'http://images.comunidades.net/ivu/ivultra/IDEAL2.png',
          type: 'Supermercado',
          cnpj: '08.957.326/0001-13',
          likes: undefined,
          totalNumberOfPublications: 0,
          phones: ['08333416302'],
          address: {
            street: 'Rua Vigolvino Wanderley',
            neighborhood: 'Centro',
            number: 290,
            cep: "58400-126",
            city: 'Campina Grande',
            uf: 'PB'
          }
        }
  ],

  users = [{
    name: 'Bruno Rafael Araújo Vasconcelos',
    email: 'bruno@mail.com',
    password: 'SecretIsNot4569',
    phone: '83998560253',
    photo: undefined,
    settings: {
      language: undefined,
      removeFinishPromotions: undefined
    }
  }];

exports.startDataBase = function addDatabase() {

  //removeHints();
  User.remove({}, function(err){
    if(err){
      console.log("Erro ao remover a coleção : users" );
    } else {
      console.log("coleção removida : users");
      addUsers();
    }
  });

  Promotion.remove({}, function(err){
    if(err){
      console.log("Erro ao remover a coleção : promotions" );
    } else {
      console.log("coleção removida : promotions");
      Establishment.remove({}, function (err) {
        if (err) {
          console.log("Erro ao remover a coleção : establishments");
        } else {
          console.log("coleção removida : establishments");
          addEstablishments();
        }
      });
    }
  });
};

function addEstablishments() {
  var item = establishments.pop();
  var establishment = new Establishment(item);
  establishment.save(function (err, savedDocument) {
    if (err) {
      throw err;
    }
    if (establishments.length > 0) {
      console.log('Document saved name ' + savedDocument.name);
      addEstablishments();
    } else {
      addPromotions();
    }

  });
}

function removeHints(){
  Hint.remove({}, function(err){
    if(err){
      console.log("Erro ao remover a coleção : hints" );
    } else {
      console.log("coleção removida : hints");
    }
  });
}

function addUsers(){
  var user = new User(users.pop());
  user.save(function (err, savedDocument) {
    if (err) {
      throw err;
    }
    console.log('User saved name ' + savedDocument.name);

    if (users.length > 0) {
      addUsers();
    }
  });
}

function addPromotions() {
  Establishment.find({}, function (err, documents) {
    for (var i in promotions) {
      var promotion = new Promotion(promotions[i]);
      promotion._company = documents[0]._id;
      promotion.save(function (err, savedDocument) {
        if (err) {
          throw err;
        }
        console.log('Promotion saved name ' + savedDocument.productName);
      });
    }
  });
}

/*MongoClient.connect("mongodb://localhost/isnottrash", function(err, db) {
  if (err) {
    console.log("Nao foi possivel conectar a banco de Dados: ", err);
  } else {

    var userCollection = db.collection("users");

    userCollection.drop((err, reply) => {

      if (err) {
        console.log("Erro ao dropar a colecao: ", err);
      } else {
        console.log("Colecao users removida? ", reply);
      }
    });

    userCollection.

    var establishmentCollection = db.collection("establishments");

    establishmentCollection.drop((err, reply) => {
      if (err) {
        console.log("Erro ao dropar a colecao: ", err);
      } else {
        console.log("Colecao establishment removida? ", reply);
      }
    });

    var promotionsCollection = db.collection("promotions");

    promotionsCollection.drop((err, reply) => {
      if (err) {
        console.log("Erro ao dropar a colecao: ", err);
      } else {
        console.log("Colecao establishment removida? ", reply);
      }
    });

    promotions = []

    establishments = [{
      name: "Atacadão",
      subtitle: "Subtitle",
      type: "Supermercado",
      imageUrl: "",
      cnpj: "00.111.222/3333-44",
      phones: "+5583911223344",
      address: {
        street: "Rua da Qualquer Coisa",
        neighborhood: "Bairro de qualquer coisa",
        number: 51,
        cep: "58000000"
      }
    }, {
      name: "Hiper",
      subtitle: "Subtitle",
      type: "Supermercado",
      imageUrl: "",
      cnpj: "11.111.222/3333-44",
      phones: "+5583911113344",
      address: {
        street: "Rua da Qualquer Coisa",
        neighborhood: "Bairro de qualquer coisa",
        number: 53,
        cep: "58000222"
      }
    }, {
      name: "Mercadinho do Zé",
      subtitle: "Subtitle",
      type: "Mercadinho",
      imageUrl: "",
      cnpj: "22.111.222/3333-44",
      phones: "+5583922223344",
      address: {
        street: "Rua da Qualquer Coisa",
        neighborhood: "Bairro de qualquer coisa",
        number: 52,
        cep: "58000111"
      }
    }]

    users = [{
      name: 'Ygor Santos',
      email: 'ygor.gsan@gmail.com',
      password: '123456789',
      phone: '+5583988776655'
    }, {
      name: 'Zezinho Transão',
      email: 'zezinho.pegador@email.com',
      password: '123',
      phone: '+5581988776655'
    }, {
      name: 'Esquilo Negão',
      email: 'esquilo@email.com',
      password: '321',
      phone: '+5583999887766'
    }, {
      name: 'Ash Katchum',
      email: 'ilovepikachu@email.com',
      password: 'tenhoquepegar',
      phone: '+5581999887766'
    }, {
      name: 'Son Goku',
      email: 'goku@email.com',
      password: 'kamehameha!',
      phone: '+5583999887755'
    }, {
      name: 'John Cena',
      email: 'cena@email.com',
      password: 'smackdown',
      phone: '+5583999887744'
    }, {
      name: 'Bruce Wayne',
      email: 'bruce@email.com',
      password: 'eusouobatman',
      phone: '+5583966778899'
    }, {
      name: 'Jimmy Neutron',
      email: 'neutrons@email.com',
      password: 'souumgenio',
      phone: '+5583966778888'
    }]

    establishmentCollection.insert(establishments, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Foram inseridos %d documentos em establishments", result.insertedCount);
      }
    })

    userCollection.insert(users, (err, result) => {
      if (err) {
        console.log(err);
        db.close()
      } else {
        console.log("Foram inseridos %d documentos users", result.insertedCount);
      }
    });
  }
});*/



/*Inserindo Promoções
db.promotions.save({
   company: {
       name: 'Atacadão',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Alfaces',
   price: 2.5,
   old_price: 8,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Danificação',
   shelf_life: 1456851600000,
   conservation: 'freezer',
   images: [
       'http://hortas.info/sites/default/files/field/image/alface001.jpg'
   ],
   evaluates: {
       likes: 25,
       comments: [
           {
               date: 1456851600000,
               text: 'Não gostei, os alimentos pareciam podres',
               user_id: ""
           }
       ]
   }
},

db.promotions.save({
   company: {
       name: 'Feirinha S2',
       subtitle: 'Tudo natural'
   },
   productName: 'Macaxeira',
   price: 0.5,
   old_price: 4,
   startDate: 1956066800000,
   endDate: 1456419600000,
   reason: 'Ninguem quer',
   shelf_life: 1456851600000,
   conservation: 'caixas',
   images: [
       'http://1.bp.blogspot.com/_QLpEuns8fn4/TJZLFefXC7I/AAAAAAAAGrw/fIp06v3sTZA/s1600/macaxeira_na_brasa.jpg'
   ],
   evaluates: {
       likes: 10,
       comments: [
           {
               date: 1456851600000,
               text: 'Não gostei, ta fedendo',
               user_id: ""
           },{
               date: 1456851800000,
               text: 'Com carne de sol, fica o ouro',
               user_id: ""
           }
       ]
   }
},

db.promotions.save({
   company: {
       name: 'Rede Compras',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Leite Condensado Moça',
   price: 2.0,
   old_price: 5,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Próximo do vencimento',
   shelf_life: 1456851600000,
   conservation: 'caixas',
   images: [
       'http://designices.com/wp-content/uploads/2010/01/leite-moca-retro-1983.jpg'
   ],
   evaluates: {
       likes: 6,
       comments: [
           {
               date: 1456851600000,
               text: 'Não gostei, os alimentos pareciam podres',
               user_id: ""
           }
       ]
   }
},

db.promotions.save({
   company: {
       name: 'Assai',
       subtitle: 'Atacadista'
   },
   productName: 'Doritos',
   price: 5,
   old_price: 15,
   startDate: new Date(,getTime(,
   endDate: 1456419600000,
   reason: 'Próximo do vencimento',
   shelf_life: 1456851600000,
   conservation: 'prateleiras',
   images: [
       'http://ig-wp-colunistas.s3.amazonaws.com/blogjovem/wp-content/uploads/2008/10/doritos-011a.jpg'
   ],
   evaluates: {
       likes: 100000,
       comments: [
           {
               date: new Date(,getTime(,
               text: '*-*',
               user_id: ""
           }, {
               date: new Date(,getTime(,
               text: 'Ô loko!',
               user_id: ""
           }, {
               date: new Date(,getTime(,
               text: 'Perfeito',
               user_id: ""
           }, {
               date: new Date(,getTime(,
               text: 'Kill me, please!',
               user_id: ""
           }
       ]
   }
},

db.promotions.save({
   company: {
       name: 'Atacadão',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Iogurte Nestle Grego',
   price: 3,
   old_price: 6,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Danificação',
   shelf_life: 1456851600000,
   conservation: 'freezer',
   images: [
       'http://www.esopave.com.br/wp-content/uploads/2012/08/iogurte-grego-nestle03.jpg'
   ],
   evaluates: {
       likes: 0,
       comments: [
           {
               date: 1456851600000,
               text: 'Dé pro gasto',
               user_id: ""
           }
       ]
   }
},

db.promotions.save({
   company: {
       name: 'Atacadão',
       subtitle: 'Supermercado atacado e varejo'
   },
   productName: 'Chocolate Bis',
   price: 0.99,
   old_price: 3.50,
   startDate: 1456066800000,
   endDate: 1456419600000,
   reason: 'Próximo ao vencimento',
   shelf_life: 1456851600000,
   conservation: 'caixas',
   images: [
       'http://www.trash80s.com.br/wp-content/uploads/2010/03/bis2.jpg'
   ],
   evaluates: {
       likes: 0,
       comments: [
           {
               date: 1456851600000,
               text: 'Eu amo bis!',
               user_id: ""
           }
       ]
   }
},
*/
/*db.promotions.save({
  company: {
    name: 'Atacadão',
    subtitle: 'Supermercado atacado e varejo'
  },
  productName: 'Alfaces',
  price: 2.5,
  old_price: 8,
  startDate: 1456066800000,
  endDate: 1456419600000,
  reason: 'Danificação',
  shelf_life: 1456851600000,
  conservation: 'freezer',
  images: [
    'http://hortas.info/sites/default/files/field/image/alface001.jpg'
  ],
  evaluates: {
    likes: 25,
    comments: [{
      date: 1456851600000,
      text: 'Não gostei, os alimentos pareciam podres',
      user_id: ""
    }]
  }
});

db.promotions.save({
  company: {
    name: 'Feirinha S2',
    subtitle: 'Tudo natural'
  },
  productName: 'Macaxeira',
  price: 0.5,
  old_price: 4,
  startDate: 1956066800000,
  endDate: 1456419600000,
  reason: 'Ninguem quer',
  shelf_life: 1456851600000,
  conservation: 'caixas',
  images: [
    'http://1.bp.blogspot.com/_QLpEuns8fn4/TJZLFefXC7I/AAAAAAAAGrw/fIp06v3sTZA/s1600/macaxeira_na_brasa.jpg'
  ],
  evaluates: {
    likes: 10,
    comments: [{
      date: 1456851600000,
      text: 'Não gostei, ta fedendo',
      user_id: ""
    }, {
      date: 1456851800000,
      text: 'Com carne de sol, fica o ouro',
      user_id: ""
    }]
  }
});

db.promotions.save({
  company: {
    name: 'Rede Compras',
    subtitle: 'Supermercado atacado e varejo'
  },
  productName: 'Leite Condensado Moça',
  price: 2.0,
  old_price: 5,
  startDate: 1456066800000,
  endDate: 1456419600000,
  reason: 'Próximo do vencimento',
  shelf_life: 1456851600000,
  conservation: 'caixas',
  images: [
    'http://designices.com/wp-content/uploads/2010/01/leite-moca-retro-1983.jpg'
  ],
  evaluates: {
    likes: 6,
    comments: [{
      date: 1456851600000,
      text: 'Não gostei, os alimentos pareciam podres',
      user_id: ""
    }]
  }
});

db.promotions.save({
  company: {
    name: 'Assai',
    subtitle: 'Atacadista'
  },
  productName: 'Doritos',
  price: 5,
  old_price: 15,
  startDate: new Date().getTime(),
  endDate: 1456419600000,
  reason: 'Próximo do vencimento',
  shelf_life: 1456851600000,
  conservation: 'prateleiras',
  images: [
    'http://ig-wp-colunistas.s3.amazonaws.com/blogjovem/wp-content/uploads/2008/10/doritos-011a.jpg'
  ],
  evaluates: {
    likes: 100000,
    comments: [{
      date: new Date().getTime(),
      text: '*-*',
      user_id: ""
    }, {
      date: new Date().getTime(),
      text: 'Ô loko!',
      user_id: ""
    }, {
      date: new Date().getTime(),
      text: 'Perfeito',
      user_id: ""
    }, {
      date: new Date().getTime(),
      text: 'Kill me, please!',
      user_id: ""
    }]
  }
});

db.promotions.save({
  company: {
    name: 'Atacadão',
    subtitle: 'Supermercado atacado e varejo'
  },
  productName: 'Iogurte Nestle Grego',
  price: 3,
  old_price: 6,
  startDate: 1456066800000,
  endDate: 1456419600000,
  reason: 'Danificação',
  shelf_life: 1456851600000,
  conservation: 'freezer',
  images: [
    'http://www.esopave.com.br/wp-content/uploads/2012/08/iogurte-grego-nestle03.jpg'
  ],
  evaluates: {
    likes: 0,
    comments: [{
      date: 1456851600000,
      text: 'Dé pro gasto',
      user_id: ""
    }]
  }
});

db.promotions.save({
  company: {
    name: 'Atacadão',
    subtitle: 'Supermercado atacado e varejo'
  },
  productName: 'Chocolate Bis',
  price: 0.99,
  old_price: 3.50,
  startDate: 1456066800000,
  endDate: 1456419600000,
  reason: 'Próximo ao vencimento',
  shelf_life: 1456851600000,
  conservation: 'caixas',
  images: [
    'http://www.trash80s.com.br/wp-content/uploads/2010/03/bis2.jpg'
  ],
  evaluates: {
    likes: 0,
    comments: [{
      date: 1456851600000,
      text: 'Eu amo bis!',
      user_id: ""
    }]
  }
});*/