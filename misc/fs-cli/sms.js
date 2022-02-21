import twilio from "twilio";
const accountSid = "ACa02dcce05940fdbbc155f0bcf1890f8d";
const authToken = "81777786c32debbe091ebcf7c8af92c7";
import color from "colors-cli";

const client = new twilio(accountSid, authToken);

async function sendSMS(smsData) {
  try {
    await client.messages.create({
      body: smsData.msg,
      to: smsData.mobile,
      from: "+19377350078",
    });
    console.log(color.green_bt("OTP Sent"));
  } catch (error) {
    console.log(error);
  }
}

export default sendSMS;
