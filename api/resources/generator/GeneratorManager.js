/**
 * Created by Bruno Rafal on 25/07/2016.
 */

var mongoose = require('mongoose');

var promotions = [
    {
        _company: null,
        productName: 'Cerveja Itaipava 550ML',
        productType: 'Bebidas',
        price: { unit: 'Unidade', actual: 5, old: 7},
        startDate: 1497352835668,
        endDate: 1500722327034,
        reason: 'Vencimento',
        shelf_life: 1503919127034,
        conservation: 'Natural',
        images: ['http://recursos.decisaoentrega.com.br/Imagem/Produto/420/435650-3/cerveja-itaipava-latao-473ml-267824.jpg?v=20170612_05'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Caixa de morangos',
        productType: 'Frutas',
        price: { unit: 'Caixa', actual: 4.99, old: 9.80},
        startDate: 1497352835668,
        endDate: 1496834579823,
        reason: 'Danificação',
        shelf_life: 1497007401651,
        conservation: 'Natural',
        images: ['http://www.dicademusculacao.com.br/wp-content/uploads/2015/03/Morango.jpg'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Leite Molico',
        productType: 'Leite',
        price: { unit: 'Unidade', actual:10.99 , old: 19.99},
        startDate: 1497353460663,
        endDate: 1499859060663,
        reason: 'Vencimento',
        shelf_life: 1502969460663,
        conservation: 'Natural',
        images: ['https://3.bp.blogspot.com/-AvdlyDPkIto/V1jdrdjpMbI/AAAAAAAAkFs/aB7a9D08sWQnC88C1dQ7YofSb6w78N2KgCKgB/s1600/bbb%2B200%2Bl.jpg'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Shampoo + condicionador Pantene',
        productType: 'Beleza',
        price: { unit: 'Caixa', actual: 14.50, old: 18.99},
        startDate: 1497353460663,
        endDate: 1500135128237,
        reason: 'Promoção',
        shelf_life: 1502797260279,
        conservation: 'Natural',
        images: ['http://smredemais.com.br/admin/Produtos/Facebook/60647ebbe3e0e38dc0aab0951da79cf2.png'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Picanha bovina',
        productType: 'Perecíveis',
        price: { unit: 'Kg', actual:18.40, old: 25.90},
        startDate: 1497353460663,
        endDate: 1496835605730,
        reason: 'Promoção',
        shelf_life: 1497094805730,
        conservation: 'Congelado',
        images: ['http://mambo.vteximg.com.br/arquivos/ids/176492-1000-1000/194901_24571.jpg'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Carne suína',
        productType: 'Perecíveis',
        price: { unit: 'kg', actual: 12.99, old: 15.99},
        startDate: 1497353460663,
        endDate: 1471400413221,
        reason: 'Danificação',
        shelf_life: 1472610013221,
        conservation: 'Congelado',
        images: ['http://nutribrasalimentos.com.br/wp-content/uploads/2015/12/produto_in-natura.png'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Coca cola 2 litros',
        productType: 'Bebidas',
        price: { unit: '6 unid', actual: 19.70, old: 30},
        startDate: 1497353460663,
        endDate: 1500135128237,
        reason: 'Data de validade',
        shelf_life: 1477534813221,
        conservation: 'Natural',
        images: ['http://www.sushicampogrande.com.br/pedido/wp-content/uploads/2015/07/coke.jpg'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Biscoito recheado bono',
        productType: 'Biscoitos',
        price: { unit: 'Caixa', actual: 35.99, old: 55.99},
        startDate: 1497353460663,
        endDate: 1503316128711,
        reason: 'Data de validade',
        shelf_life: 1508759328711,
        conservation: 'Natural',
        images: ['http://www.arrumeolaco.com/wp-content/uploads/2015/02/Biscoito-Bono.jpg'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Torta de chocolate com morango',
        productType: 'Torta',
        price: { unit: 'kg', actual: 19.90, old: 28.70},
        startDate: 1497353460663,
        endDate: 1475634013221,
        reason: 'Danificação',
        shelf_life: 1479349213221,
        conservation: 'Natural',
        images: ['http://carpediemchocolataria.com.br/loja/wp-content/uploads/2016/01/torta-de-chocolate-com-morango.jpg'],
        evaluates: {
            user_likes: []
        }
    },

    {
        _company: null,
        productName: 'Refrigerante Sprite lata 350ML',
        productType: 'Bebidas',
        price: { unit: 'unid', actual: 0.99, old: 3.99},
        startDate: 1497353460663,
        endDate: 1500291946988,
        reason: 'Danificação',
        shelf_life: 1502970346988,
        conservation: 'Natural',
        images: ["https://cdn.awsli.com.br/300x300/183/183316/produto/5390885/2bdb9c42fd.jpg"],
        evaluates: {
            user_likes: []
        }
    }
];

var hints = [
    {
        title: "Evite o apodrecimento de frutas e verduras",
        imgUrl: "http://mundoeducacao.bol.uol.com.br/upload/conteudo_legenda/74e4df18866c63e708ba2485154f0403.jpg",
        text: "Ao verificar se a fruta está madura, não aperte com força para evitar um machucado e posteriormente o apodrecimento da fruta. O correto é simplesmente pegar na fruta ou verdura e observar sua consistencia.",
        establishment: mongoose.Types.ObjectId("57975fadd9091b343530b067")
    },

    {
        title: "Não misture as frutas podres com as saudáveis",
        text: "Frutas podres com frutas saudáveis não podem se misturar. Se isso ocorrer todas as frutas boas irão ficar podres com o passar do tempo. Evite o desperdicio de comida",
        imgUrl: "https://imgnzn-a.akamaized.net/2014/08/11/11171520449752.jpg",
        establishment: mongoose.Types.ObjectId("57975fadd9091b343530b066")
    }
];

var Generator = {
    generatePromotion: function(){
        var i = Math.floor((Math.random() * promotions.length));
        return promotions[i];
    },

    generateHint: function(){
        var i = Math.floor((Math.random() * hints.length));
        return hints[i];
    }
};

module.exports = Generator;