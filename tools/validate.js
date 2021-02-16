const joi = require('joi');

const schema_inscription = joi.object({
    pseudo: joi.string().max(30).required(),
    email: joi.string().email().required(),
    acte_nais: joi.number().required(),
    date_etab: joi.date().required(),
    ville_nais: joi.string().required(),
    psw: joi.string().pattern(new RegExp('')).required(),
    confirm_psw: joi.ref('psw')
})

module.exports = {
    schema_inscription: schema_inscription
}