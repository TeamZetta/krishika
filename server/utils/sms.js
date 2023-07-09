const { Vonage } = require("@vonage/server-sdk");
const { VONAGE_APIKEY, VONAGE_APISECRET, FAKE_SMS } = require("../config");

const vonage = new Vonage({
  apiKey: VONAGE_APIKEY,
  apiSecret: VONAGE_APISECRET,
});

const from = "Vonage APIs";

let sendSMS = async (to, OTP) => {
  const text = `${OTP} is you OTP for authorization.\nGreetings,\nTeam Krishika`;
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
};

if (FAKE_SMS){
  sendSMS = async (to, OTP) => {
    console.log("Message sent successfully");
  };
}

module.exports = { sendSMS };
