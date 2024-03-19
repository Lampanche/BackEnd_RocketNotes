const sqliteConection = require('../')

const creatUsers = require('./createUsers')


async function migrationsRun()
{
    const schema = [
        creatUsers
    ].join('')

    sqliteConection()
    .then(db => db.exec(schema))
    .catch(error => console.log(error))
}

module.exports = migrationsRun