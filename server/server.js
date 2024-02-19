 const express = require("express");
 const mongoose = require("mongoose");
 const Seed = require('./api/CreateSchema.js')
 const { MongoClient } = require('mongodb')
 const app = express();


const url = "mongodb://localhost:27017/test";
const client = new MongoClient(url);

const dbName = 'BillingDB';

 app.get("/api", (req, res) => {
    res.json({"users": ["test1", "test2", "test3"]});
 });

 async function seedMongo() {
   await client.connect();
   console.log("connected to DB successfully");
   const db = client.db(dbName);
   const collExists = (await db.listCollections().toArray()).filter((m) => m.name === 'Billing');
   
   if(!(collExists && collExists.length > 0)){
      db.createCollection("Billing", (err, req, res) => {
         if(err)
            throw err;
   
      });
      const collection = db.collection("Billing");
      fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json").then(rep => rep.json())
      .then(data => {
         console.log(data);
         collection.insertMany(data);
         console.log("successfully Inserted!!!..")
      })
   }
   


 }
 seedMongo()

 app.listen(5000, () => { console.log("Server Up at port 5000")});


