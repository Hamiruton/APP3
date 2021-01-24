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

const verify_token = token =>{
    return new Promise((resolve, reject)=>{
        try {
            jwt.verify(token, process.env.SECRET);
            resolve(jwt.verify(token, process.env.SECRET).data);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    send_token: send_token,
    verify_token: verify_token
}