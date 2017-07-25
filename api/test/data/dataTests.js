/**
 * Created by Bruno Rafal on 21/02/2016.
 */

/*establishments
* {name: 'Maxxi', email:'maxxi@mail.com', subtitle:'O melhor preço da cidade!', imageUrl: 'http://www.minalice.com.br/images/clientes/maxxi-atacado.jpg', type:'Supermercado', cnpj: '11476698455', phones:['(83)32225598'], address: {street: 'Av Floriano Peixoto', neighborhood: 'Cinza', number: '852', cep: '5840000'}}
* {name: 'Carrefour', email:'carrefour@mail.com', subtitle:'Aqui a gente te entende', imageUrl: 'http://media.lovemondays.com.br/logos/2194da/carrefour-original.png', type:'Supermercado', cnpj: '32457698455', phones:['(83)981146555','(83)32004855'], address: {street: 'Av Presidente Deodoro da Fonseca', neighborhood: 'Centenário', number: '1220', cep: '5840000'}}
* {name: 'Assaí', email:'assai@mail.com', subtitle:'Supermercado e varejo', imageUrl: 'http://jovemaprendiz.org/wp-content/uploads/2016/03/cadastro-vagas-de-jovem-aprendiz-assai-2016.jpg', type:'Supermercado', cnpj: '32501229845', phones:['(83)984726555','(83)32211155','(83)32005477'], address: {street: 'Rua das acerolas', neighborhood: 'Centro', number: '110', cep: '5840000'}}
* {name: 'Sinhá Doces', email:'sinha.doces@mail.com', subtitle:'Tortas, bolos e salgados para sua festa', imageUrl: 'http://pbs.twimg.com/profile_images/1101562505/Logo_-_Copy.jpg', type:'Doceteria', cnpj: '00000698455', phones:['(83)981226555','(83)982115566','(83)33215266'], address: {street: 'Rua do sol', neighborhood: 'Santa Rosa', number: '220', cep: '5840111'}}
* {name: 'Pedro fogueteiro', email:'pedrof@mail.com', subtitle:'Fogos de artifício o ano inteiro!', imageUrl: 'http://www.bombeiros.pr.gov.br/arquivos/Image/bombeiros/OrientacoesDeSeguranca/fogos.jpg', type:'Vendedor', cnpj: '30157498455', phones:['(83)81669955'], address: {street: 'Rua do azul do céu', neighborhood: 'Bairro das nações', number: '100', cep: '52665544'}}
* {name: 'Lanchonete do paulista', email:'paulista@mail.com', subtitle:'A lanchonete do melhor preço', imageUrl: 'http://img.olx.com.br/images/26/265626008654166.jpg', type:'Lanchonete', cnpj: '0852336471', phones:['(83)987726555','(83)33335599','(83)33334744'], address: {street: 'Rua Pacífico Licarião da Trindade', neighborhood: 'Bodocongo', number: '240', cep: '5885200'}}
* {name: 'Panificadora união', email:'uniao@mail.com', subtitle:'pães, massas lanches e conveniências!', imageUrl: 'http://www.calilanoticias.com/wp-content/uploads/2015/02/padaria-de-eduardo.jpg', type:'Panificadora', cnpj: '289336405', phones:['(83)982065544','(83)32214000','(83)32115050'], address: {street: 'Rua leao da corte', neighborhood: 'Cruzeiro', number: '140', cep: '5821500'}}
* {name: 'José feirante', email:'josef@mail.com', subtitle:'O alface mais barato da feira central', imageUrl: 'http://editora3-cdnmed-idin.agilecontents.com/resources/jpg/9/0/1412968331709.jpg', type:'Vendedor', cnpj: '852233647877', phones:['(83)991121314','(83)33312544','(83)33314040'], address: {street: 'Av Humberto da Silva', neighborhood: 'José Pinheiro', number: '654', cep: '5842222'}}
* {name: 'Assaí na tigela', email:'assai.natigela@mail.com', subtitle:'Aqui tem o melhor assaí da cidade!', imageUrl: 'http://recantodoacai.com/site/wp-content/uploads/2014/12/BANNER_acai-na-tigela.jpg', type:'Lanchonete', cnpj: '8522336655', phones:['(83)982006666', '(83)999889966'], address: {street: 'Lobão dos gatos', neighborhood: 'Catolé', number: '98', cep: '5544000'}}
*
* {name: 'Gato e Sapato', email:'gatoesapato@mail.com', subtitle:'Calçados, roupas e acessórios', imageUrl: 'http://www.engclima.com/sistema/imagens/obras/gato-sapato/01.jpg', type:'Loja', cnpj: '885547155', phones:['(83)998855452', '(83)981554477'], address: {street: 'Rua das amburanas', neighborhood: 'Centro', number: '900', cep: '58400'}}
*
* */
var promotions =
    [
        {
            company:{
                name: "Atacadão",
                description: "Supermercado atacado e varejo"
            },
            productName:'Alfaces',
            price: 2.50,
            old_price: 8.00,
            startDate: '2016-02-21T15:00:00',
            endDate: '2016-02-25T17:00:00',
            reason: "Danificação",
            shelf_life: '2016-03-01T17:00:00',
            conservation: 'freezer',
            images: ['http://hortas.info/sites/default/files/field/image/alface001.jpg'],
            evaluates: {
                likes: 25,
                comments: [
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    },
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    },
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    },
                    {
                        date: '2016-03-01T17:00:00',
                        text: "Não gostei, os alimentos pareciam podres",
                        user_id: ''
                    }
                ]
            }
        },
        {
            company:{
                name: 'Maxxi',
                description: "Distribuidor"
            },
            productName: 'Carnes',
            price: 25,
            old_price: 50,
            startDate: '2016-02-19T17:00:00',
            endDate: '2016-02-22T17:00:00',
            reason: 'Validade',
            shelf_life: '2016-02-25T17:00:00',
            conservation: "freezer",
            images: ["http://thumbs.dreamstime.com/z/iogurtes-para-venda-35553105.jpg]"],
            evaluates: {
                likes: 250,
                    comments: []
            }
},
/*{
 company:{
 name: "Doceteria amor e comanhia",
 subtitle: "Doces e "
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 description: String
 },
 value: String,
 old_value: String,
 discount: String,
 start: Date,
 end: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 }
];*/




/*
* var promotions =
 [
 {company:{ name: 'Atacadão', subtitle: 'Supermercado atacado e varejo' }, productName:'Alfaces', price:{ actual: 2.50, old: 8.00, unit:'kg'}, startDate: 1456066800000, endDate: 1456419600000, reason: 'Danificação', shelf_life:1456851600000, conservation: 'freezer', images: ['http://hortas.info/sites/default/files/field/image/alface001.jpg'], evaluates: { user_likes: [ObjectId('56d13ba9a19b0e142ad37156')], comments: [ { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: ObjectId('56d13ba9a19b0e142ad37156') }, { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: ObjectId('56d13ba9a19b0e142ad37156') }, { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: ObjectId('56d13ba9a19b0e142ad37156') }, { date: 1456851600000, text: 'Não gostei, os alimentos pareciam podres', user_id: ObjectId('56d13ba9a19b0e142ad37156') } ] } },
 {
 company:{
 name: 'Maxxi',
 description: "Distribuidor"
 },
 productName: 'Carnes',
 price: 25,
 old_price: 50,
 startDate: 1455901200000,
 endDate: 1456160400000,
 reason: 'Validade',
 shelf_life: 1456419600000,
 conservation: "freezer",
 images: [http://thumbs.dreamstime.com/z/iogurtes-para-venda-35553105.jpg],
 evaluates: {
 likes: 250,
 comments: []
 }
 },


 {_company: ObjectId("5720175f502223de1b898a16"),productName:"Tortas de chocolate",price:{unit:"unidade", actual:35.99, old:82.00},startDate: 1468286585668,endDate: 1468718585668,reason: "validade",shelf_life: 1468804985668,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {_company: ObjectId("5720175f502223de1b898a16"),productName:"Morangos", price:{unit:"kg", actual:15.00 ,old:28.00 },startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://static.bolsademulher.com/sites/www.bolsademulher.com/files/receita/imagecache/completa/morangos-108717982-630.jpg"],evaluates: {user_likes:[],comments: []}}
 {_company: ObjectId("5720175f502223de1b898a16"),productName:"Vassouras e rôdos tupperware",price:{unit:"unidade", actual:5.00 ,old:10.00 },startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://www.benzol.com.br/images/vassoura.jpg"],evaluates: {user_likes:[],comments: []}}
 {_company: ObjectId("5720175f502223de1b898a16"),productName:"Laranjas cravo(Mexericas)",price:{unit:"kg", actual:8.00, old:12.00 },startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://www.mercadotododia.com.br/wp-content/uploads/2015/02/shutterstock_170185463.jpg"],evaluates: {user_likes:[],comments: []}}
 {_company: ObjectId("5749e2ec03f26f02825eb2ba"),productName:"Sapato Weast Coast",price:{unit:"par", actual: 80.0, old: 150.0},startDate: new Date(1466187052759),endDate: new Date(1466187052759),reason: "Danificação",shelf_life: new Date(1456684186270),conservation: "Natural" ,images: ["http://mlb-s2-p.mlstatic.com/sapato-social-stilo-ferracin-democra-osklen-rafarillo-gofer-18005-MLB20148461154_082014-F.jpg"],evaluates: {user_likes:[],comments: []}}

 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}
 {company:,productName:"Tortas de chocolate",price:{unit:unidade},startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://2.bp.blogspot.com/-wAzr_JMoIrk/UcxM0xpzLLI/AAAAAAAAOeg/7EUfVSBHqSk/s1600/torta-chocolate-especial.jpg"],evaluates: {user_likes:[],comments: []}}



 _company: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'Establishment'
 },
 productName: String,price: { unit: String, actual: Number, old: Number },
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
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

 /*{company:{name: "Amor e comanhia",subtitle: "Doceteria e lanchonete"},productName:"M&Ms de castanha e amendoin",price: 10,old_price: 15,startDate: 1456079417348,endDate: 1456252186270,reason: "validade",shelf_life: 1456684186270,conservation: "freezer",images: ["http://thumbs.dreamstime.com/z/chocolates-coloridos-do-c%C3%ADrculo-40198766.jpg"],evaluates: {likes: 28,comments: []}},
 {company:{name: "Tiago calçados",subtitle: "A últims tendência da moda"},productName:"Tenis rainha",price: 82,old_price: 120,startDate: 1456266306049,endDate: 1456439106049,reason: "Danificação",shelf_life: 1456698306049,conservation: "normal",images: ["http://www.deckeronline.com.br/FILES/produtos/imagens/a10b427575427761b45c7cf5710a0e3e.jpg"],evaluates: {likes: 32,comments: []}},
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 },
 {
 company:{
 name: String,
 subtitle: String
 },
 price: String,
 old_price: String,
 "": String,
 startDate: Date,
 endDate: Date,
 reason: String,
 shelf_life: Date,
 conservation: String,
 images: [String],
 evaluates: {
 likes: Number,
 comments: []
 }
 }*/
];