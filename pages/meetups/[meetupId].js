import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
import Head from 'next/head';

import { useRouter } from 'next/router';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailPage = (props) => {
  const router = useRouter();
  const meetupId = router.query.meetupId;

  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name='description' content='New desciption...' />
      </Head>
      <MeetupDetail
        title={props.meetup.title}
        description={props.meetup.description}
        address={props.meetup.address}
        image={props.meetup.image}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@udemy-meetups.xokvrzp.mongodb.net/meetups`
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@udemy-meetups.xokvrzp.mongodb.net/meetups`
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
      },
    },
  };
};

export default MeetupDetailPage;
