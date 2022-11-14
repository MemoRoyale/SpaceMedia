import axios from 'axios';
import { BASE_URL } from '../utils';
import {Video} from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

interface IProps {
  videos: Video[] 
}

const Home = ({videos}:IProps) => {
  console.log(videos);
  return (
    
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ?(
        videos.map((video:Video)=>(
          //*for later: edit to add "if" for image funtion-
          <VideoCard post={video} key={video._id}/>
        ))
      ):(
        <NoResults text={'No Videos'}/>
      )}

    </div>
  )
}


export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};

export default Home

