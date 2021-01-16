const db = require('./db');

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
        let sql = `INSERT INTO data(pseudo, num_acte_nais, psw, ville_nais, email, data_inscription) VALUES(?,?,?,?,?,?)`;
        let insert = [this.pseudo, this.num_acte_nais, this.psw, this.ville_nais, this.email, new Date()];

        return new Promise((resolve, reject)=>{
            db.query(sql, insert, (err)=>{
                if (err) throw reject(err);
                resolve();
            });
        });
    }
}

module.exports = Data;