import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const handler = async (req, res) => {
  let data 
  if (req.method === 'POST') {
    data = req.body;
  }

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@udemy-meetups.xokvrzp.mongodb.net/meetups`
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const result = await meetupsCollection.insertOne(data);

  console.log(result);

  client.close();

  res
    .status(201)
    .json({ message: 'Meetup successfully created.', meetup: result });
};

export default handler