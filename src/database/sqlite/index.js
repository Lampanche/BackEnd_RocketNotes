const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")

// Utilizamos o path (modulo do NODE) para padronizar o caminho passado para criarmos o arquivo DB, pois especificação de caminho é diferente em diferentes SO

// Criamos uma função async, pois iremos ter que esperar o retorno da "abertura" do arquivo DB, ele pode existir, ou não.

async function sqliteConection()
{
    const database = await sqlite.open({
        filename: path.resolve(__dirname, '..', "database.db"),
        driver: sqlite3.Database
    })

    return database
}

module.exports = sqliteConection