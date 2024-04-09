import { useRouter } from 'next/router';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailPage = () => {
  const router = useRouter();
  const meetupId = router.query.meetupId;

  return (
    <MeetupDetail
      title='A title...'
      description='A description... '
      address='123 Address St'
      image='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg'
    />
  );
};

export default MeetupDetailPage;
