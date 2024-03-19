const knex = require("../database/knex")


class NotesController
{
    async create(request, response)
    {
        const {title, description, tags, links} = request.body
        const user_id = request.user.id

        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        })

        const insert_links = links.map(link =>{
            return {
                note_id,
                url: link,
            }  
        })

        await knex("links").insert(insert_links)

        const insert_tags = tags.map(name =>{
            return {
                note_id,
                name: name,
                user_id
            }  
          })
  
        await knex("tags").insert(insert_tags)

        return response.json()

    }

    async show(request, response)
    {
        const {id} = request.params
        
        const note = await knex("notes").where({id}).first()
        const links = await knex("links").where({note_id:id}).orderBy("created_at")
        const tags = await knex("tags").where({note_id:id}).orderBy("name")

        return response.json({
            note,
            links, 
            tags
        })
    }

    async delete(request, response)
    {
        const {id} = request.params

        await knex("notes").where({id : id}).delete()
        
        return response.json()
    }

    async index(request, response)
    {
        const { title, tags } = request.query

        const user_id = request.user.id

        let notes

        if(tags)
        {
            const filterTags = tags.split(",").map(tags => tags.trim())

            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id"
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title",`%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .groupBy("notes.id")
                .orderBy("notes.title")
        }
        else
        {
            notes = await knex("notes")
                .where({user_id})
                .whereLike("title", `%${title}%`)
                .orderBy("title")
        }

        const userTags = await knex("tags").where("user_id", user_id)

        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tags => tags.note_id === note.id)

            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags)
    }
}



module.exports = NotesController