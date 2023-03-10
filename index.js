const express = require('express');
const cors = require('cors');
const app = express();
 require('dotenv').config()
const port = process.env.PORT ||5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middle wares

app.use(cors())
app.use(express.json());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w5yg5ut.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function  run(){

    try{
 const yachtServiceCollection =client.db("yachtClub").collection('yachtService')
 const reviewsCollection = client.db("yachtClub").collection('reviews')

   app.get ('/service', async (req,res)=>{
 const query = {}
 const cursor =  yachtServiceCollection.find(query)
 const result = await cursor.toArray()
 res.send(result)
 



   });

app.post('/service',async (req,res)=>{

  const service = req.body;
  const result = await yachtServiceCollection.insertOne(service)
  res.send(result)
})

   app.get('/service/:id',async (req,res)=>{
 
    const id = req.params.id;

    const query = { _id: new ObjectId(id)}
    const service = await yachtServiceCollection.findOne(query)
  res.send(service)
    
   })

 app.get('/reviews',async(req,res)=>{
  const query ={}
  const cursor = reviewsCollection.find(query)
  const result= await cursor.toArray()
  res.send(result)
 })

 app.get('/review',async(req,res)=>{

  const name = req.query.name;
  const query = { name:name}
  
  const review = await reviewsCollection.find(query).toArray()

  res.send(review)

 })

   app.post('/reviews',async(req,res)=>{
   const review = req.body;
   const result = await reviewsCollection.insertOne(review);
   res.send(result)

   })

    }
    finally{}

}run().catch(err => console.log(err))




















app.get('/',(req,res)=>{

    res.send('yacht club server is running')
})
app.listen(port, ()=>{console.log(`yacht server is running on ${port}`) })