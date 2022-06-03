const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const userCollection = client.db('sunvi-alo').collection('userProfileCreate');

        const orderCollection = client.db('sunvi-alo').collection('orderProducts');
        const commentCollection = client.db('sunvi-alo').collection('userComment');

        app.get('/manufacturer', async(req, res)=>{
            const query={};
            const cursor = serviceCollection.find(query);
            const manufacturers = await cursor.toArray();
            res.send(manufacturers);
        })
        app.get('/userComment', async(req, res)=>{
            const query={};
            const cursor = commentCollection.find(query);
            const comments = await cursor.toArray();
            res.send(comments);
        })
        app.post('/orderProduct', async(req, res)=>{
            const orderProduct = req.body;
            const query = {userName: orderProduct.userName, userEmail: orderProduct.userEmail, productName: orderProduct.produceName};
            const exists = await orderCollection.findOne(query);
            if(exists){
                return res.send({success: false, orderProduct: exists})
            }
            const result = await orderCollection.insertOne(orderProduct);
            res.send(result);
        })

       
        app.post('/userComment', async(req, res)=>{
            const userComment = req.body;
           
            const result = await commentCollection.insertOne(userComment);
            res.send(result);
        })
        app.post('/userProfileCreate', async(req, res)=>{
            const userProfileCreate = req.body;
           
            const result = await userCollection.insertOne(userProfileCreate);
            res.send(result);
        })

        app.get('/orderProduct', async(req, res)=>{
            const userEmail = req.query.userEmail;
            const query = {userEmail: userEmail};
            const orderProduct = await orderCollection.find(query).toArray(); 
            res.send(orderProduct);
        })
       
        app.get('/manufacturer/:id', async(req,res)=>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const manufacturer = await serviceCollection.findOne(query);
            res.send(manufacturer);
        });
          
            
        app.post('/manufacturer', async(req, res) =>{
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        });
        app.delete('/orderProduct/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        });

        app.delete('/manufacturer/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/orderProduct/:id', async(req,res)=>{
            const id =req.params.id;
            const update = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updatedDoc = {
                $set: {
                    
                    name: update.name,
                    img: update.img,
                    price: update.price,
                    description: update.description,
                    minimumOrder: update.minimumOrder,
                    Price : update.Price,
                    stock: update.stock
                    
                    
                }
            };
            const result = await serviceCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

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