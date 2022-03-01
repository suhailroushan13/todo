import twilio from 'twilio'
import { scheduleJob } from 'node-schedule'

const accountSid = 'AC1ac5cb2ae08072d4f712601f56517a01'
const authToken = '522ebe8c6f206e1a43f5ed1abbfb7d5d'

const client = new twilio(accountSid, authToken)

async function sendSMS(otp, mobile) {
    try {
        await client.messages
            .create({
                body: `Your Login verification code is: ${otp}`,
                to: mobile,
                from: '+19362431346'
            })
        console.log('OTP successfully sent to your mobile number 👍')
    } catch (err) {
        throw err
    }
}
export default sendSMS

// scheduleJob('1', '2022-03-01T11:32:45.000Z', () => {
//     sendSMS("hello Sara", "+919989151967")
// });



