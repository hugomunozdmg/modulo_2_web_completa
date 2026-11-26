import { MongoClient } from "mongodb"

export async function connectDb(){
    const client = await MongoClient.connect(process.env.DB_URL)
    return client.db("libreria")
}
