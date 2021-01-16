const joi = require('joi');

const schema_inscription = joi.object({
    pseudo: joi.string().max(30).required(),
    num_acte_nais: joi.string().max(30),
    psw: joi.string().pattern(new RegExp('')).required(),
    confirm_psw: joi.ref('psw'),
    ville_nais: joi.string().required(),
    email: joi.string().email().required()
})

module.exports = {
    schema_inscription: schema_inscription
}