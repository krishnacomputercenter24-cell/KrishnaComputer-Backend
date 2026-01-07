import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();


const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)

const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('connected to mongoDb server')
})
db.on('error', (err)=> {
    console.log('MongoDB connection error: ', err)
})
db.on('disconnected', ()=> {
    console.log('Disconnected to mongoDb server')
})

export default db;