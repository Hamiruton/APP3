const db = require('./db');
const compareMdp = require('../tools/hash_psw').compare;

class Data {
    constructor(infos) {
        this.pseudo = infos.pseudo;
        this.num_acte_nais = infos.num_acte_nais;
        this.psw = infos.psw;
        this.confirm_psw = confirm_psw;
        this.ville_nais = infos.ville_nais;
        this.email = infos.email;
    }

    inscrire() {
        let sql = `INSERT INTO data(pseudo, num_acte_nais, psw, ville_nais, email, date_inscription) VALUES(?,?,?,?,?,?)`;
        let insert = [this.pseudo, this.num_acte_nais, this.psw, this.ville_nais, this.email, new Date()];

        return new Promise((resolve, reject)=>{
            db.query(sql, insert, (err)=>{
                if (err) throw reject(err);
                resolve();
            });
        });
    }

    static connecter(pseudo, mdp) {
        let sql = `SELECT * FROM data WHERE pseudo = ? AND accept_email = 1`;
        let insert = [pseudo];
        
        return new Promise((resolve, reject)=>{
            db.query(sql, insert, (err, results)=>{
                if (err) throw err;
                if (results[0]) {
                    compareMdp(mdp, results[0].psw).then(()=>{
                        resolve(results[0]);
                    }).catch(()=>{
                        reject();
                    });
                } else {
                    reject();
                }
            });
        });
    }
    
/*
    static admin(pseudo, mdp) {
        // cette méthode vérifie si les infos entrées sont celles d'un admin
        let sql = `SELECT * FROM admin WHERE pseudo = ?`; 
        let insert = [pseudo];

        return new Promise((resolve, reject)=>{
            db.query(sql, insert, (err, results)=>{
                if (err) throw err;
                if (results[0]) {
                    compareMdp(mdp, results[0].psw).then(()=>{
                        resolve()
                    }).catch(()=>{
                        reject();
                    });
                }
            });
        });
    }
    */

    static accepter_inscription(email) {
        let sql = `UPDATE data SET accept_email = 1 WHERE email = ?`;
        let insert = [email];

        return new Promise((resolve, reject)=>{
            db.query(sql, insert, (err)=>{
                if (err) throw reject(err);
                resolve();
            });
        });
    }
}

module.exports = Data;