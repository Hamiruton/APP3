const jwt = require('jsonwebtoken');

const send_token = data =>{
    return new Promise((resolve, reject)=>{
        try {
            const token_confirm_inscrip = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60*30),
                data: data
            }, process.env.SECRET);
            resolve(token_confirm_inscrip);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    send_token: send_token
}