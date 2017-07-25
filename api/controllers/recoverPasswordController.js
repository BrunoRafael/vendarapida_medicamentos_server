var gpc = require('generate-pincode'),
  sg = require("sendgrid").SendGrid("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"),
  PinCodeController = require('./pinCodeController.js');

exports.sendEmail = (email, result) => {
  var pinCode = gpc(4);
  PinCodeController.save(email, pinCode, (resolve) => {
    if (resolve.content.success) {
      send(helloEmail(email, pinCode));
    }
  });
};

function send(toSend) {
  var requestBody = toSend;
  var emptyRequest = require('sendgrid-rest').request;
  var requestPost = JSON.parse(JSON.stringify(emptyRequest));
  requestPost.method = 'POST';
  requestPost.path = '/v3/mail/send';
  requestPost.body = requestBody;
  sg.API(requestPost, function (response) {
    //console.log(response);
  });
}

function helloEmail(mail, pinCode) {
  var helper = require('sendgrid').mail;
  from_email = new helper.Email("noreply@isnottrash.com");
  to_email = new helper.Email(mail);
  subject = "Recuperação de senha IsNotTrash";
  content = new helper.Content("text/html", "Digite o codigo seguinte no app: <h1>" + pinCode + "</h1>");
  mail = new helper.Mail(from_email, subject, to_email, content);
  return mail.toJSON();
}