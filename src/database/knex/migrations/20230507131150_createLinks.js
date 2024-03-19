const { default: knex } = require("knex")

exports.up = async knex => 
{
        await knex.schema.createTable("links", table => {
        table.increments('id')
        table.text('url').notNullable()
       
        table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE")
        table.timestamp('created_at').default(knex.fn.now())
        
    })
}


exports.down = async knex => await knex.schema.dropTable("links")
