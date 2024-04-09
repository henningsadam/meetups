import MeetupList from '../components/meetups/MeetupList';

const HomePage = () => {
  const meetups = [
    {
      id: 'm1',
      title: 'Meetup #1',
      image:
        'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg',
      address: '123 Something St.',
      description: 'A new description...',
    },
    {
      id: 'm2',
      title: 'Meetup #2',
      image:
        'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg',
      address: '123 Something St.',
      description: 'A new description...',
    },
  ];
  return (
    <>
      <MeetupList meetups={meetups} />
    </>
  );
};

export default HomePage;
