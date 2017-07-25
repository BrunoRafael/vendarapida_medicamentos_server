/**
 * Created by Bruno Rafal on 29/02/2016.
 */
var webSocket = require('../web_socket/WebSocket');

var timeouts = {};

exports.insertNewTimeout = function(json){
    var endDate = json.endDate;
    var delay = calculateDelay(endDate);
    timeouts[json.promotion_id] = setTimeout(function(){
        json.endPromotion = true;
        webSocket.broadcast.emit('endPromotion', json);
        delete timeouts[json.promotion_id];
    }, delay);

};

function calculateDelay(date){

}