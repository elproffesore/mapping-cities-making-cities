import data from '@/server/files/sosec.json'

export default defineEventHandler(async (event) => { //this function returns the whole dataset (not advised due to size)
    const query = getQuery(event)
    let padding = Number(query.padding)
    let range = Number(query.range)
    return {
        data: data.slice(padding*range,(padding+1)*range)
    }
})