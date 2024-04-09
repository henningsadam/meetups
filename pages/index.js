import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='New desciption...' />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   return {
//     props: {
//       meetups: meetups,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@udemy-meetups.xokvrzp.mongodb.net/meetups`
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
