const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS;

const hasher = (mdp)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.hash(mdp, saltRounds, (err, hash)=>{
            if (err) throw reject(err);
            resolve(hash);
        });
    });
}

const compare = (psw, psw_hash, (err, res)=>{
    return new Promise((resolve, reject)=>{
        if (err) throw reject(err);
        if (res) {
            resolve();
        } else {
            reject();
        }
    });
});

module.exports = {
    hasher: hasher,
    compare: compare
}