/* 
    Por padrão controllers tem no máximo 5 methods    

        * Index - GET - listar varios registros
        * Show - GET - exibir um registro especifico
        * Creat - POST - Criar um novo registro
        * Update - PUT - Atualizar um registro
        * Delete - DELETE - Deletar algum registro
*/

const {hash, compare} = require('bcryptjs')

const AppError = require("../utils/AppError")

const sqliteConection = require('../database/sqlite')

class UsersController
{
    async creat(request, response)
    {
        const {name, email, password} = request.body

        const database = await sqliteConection()

        const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUsersExists)
        {
            throw new AppError('Este email já está em uso.')
        }

        const hashedPassword = await hash(password, 8)

        await database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword])

        return response.status(201).json()
    }
    
    async update(request, response)
    {
        const {name, email, password, old_password} = request.body
        const user_id = request.user.id

        const database = await sqliteConection()

        const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id])

        const emailAttExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if(emailAttExists && emailAttExists.id !== user.id)
        {
            throw new AppError('O email já está em uso.')
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password)
        {
            throw new AppError('Informe a senha antiga para fazer a atualização.')
        }

        if(password && old_password)
        {
            const verify_old_password_inform = await compare(old_password, user.password)

            if(verify_old_password_inform == false)
            {
                throw new AppError('A senha antiga digitada não confere.')
            }

            user.password = await hash(password, 8)
        }

        await database.run(
        ` UPDATE users SET
          name = ?,
          email = ?,
          password = ?,
          update_at = DATETIME('now')
          WHERE id = ?  `, 
          [user.name, user.email, user.password, user_id])
          
        return response.json()

    }

}

module.exports = UsersController