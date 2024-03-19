const config_knex = require('../../../knexfile')
const knex = require('knex')

const connection = knex(config_knex.development)

module.exports = connection