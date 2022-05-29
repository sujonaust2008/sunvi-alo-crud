const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajkdf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('sunvi-alo').collection('manufacturer');
        app.get('/manufacturer', async(req, res)=>{
            const query={};
            const cursor = serviceCollection.find(query);
            const manufacturers = await cursor.toArray();
            res.send(manufacturers);
        })

        // app.get('/service/:id', async(req,res)=>{
        //     const id = req.params.id;
        //     const query={_id: ObjectId(id)};
        //     const service = await serviceCollection.findOne(query);
        //     res.send(service);
        // });

        // app.post('/service', async(req, res) =>{
        //     const newService = req.body;
        //     const result = await serviceCollection.insertOne(newService);
        //     res.send(result);
        // });

        // app.delete('/service/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await serviceCollection.deleteOne(query);
        //     res.send(result);
        // });

        // app.put('/service/:id', async(req,res)=>{
        //     const id =req.params.id;
        //     const update = req.body;
        //     const filter = {_id: ObjectId(id)};
        //     const options = { upsert: true};
        //     const updatedDoc = {
        //         $set: {
                    
        //             name: update.name,
        //             img: update.img,
        //             price: update.price,
        //             description: update.description,
        //             supName: update.supName,
        //             quantity : update.quantity
                    
                    
        //         }
        //     };
        //     const result = await serviceCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result);
        // })

    }
    finally{

    }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    res.send('Running sunvi alo server');
})
app.listen(port, ()=>{
    console.log('listen to port sunvi alo', port)
})