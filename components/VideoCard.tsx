import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

import { Video } from './../types';

interface IProps {
    post:Video;
    isShowingOnHome?: boolean;

}


const VideoCard: NextPage<IProps> = ({post}) => {

  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [debugText, setDebugText] = useState<string>("");

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };
  
  
  console.log(post.video.asset.url)
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleViewChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.intersectionRatio > 0.5) {
          if (videoRef.current) {
            // Note: if the user has not interacted with the page, videos that is not muted will not be allowed to play
            // and will throw out an error. Won't crash the app though.

            // Note2: if you want to pause all other videos, the following line would do so.
            document.querySelectorAll("video").forEach((video) => {
              video.pause();
            });

            // * this is not the best practice if there are some video elements that should not be affected.
            // * Modify the query to select only the videos that you want to pause.

            videoRef.current.play();
            setDebugText(
              `intersectionRatio: ${entry.intersectionRatio.toFixed(
                2
              )}, now play.`
            );
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setDebugText(
              `intersectionRatio: ${entry.intersectionRatio.toFixed(
                2
              )}, now pause.`
            );
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleViewChange, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    });
    setObserver(observer);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [handleViewChange]);
  

   

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div> 
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-16 md:h-16 w-10 h-10'>
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                <Image 
                  width={62} 
                  height={62}
                  className='rounded-full'
                  src={post.postedBy.image}
                  alt='profile-photo'
                  layout='responsive'
                />
              </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex items-center gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text primary'>
                    {post.postedBy.userName}{`
                  `}
                  <GoVerified className='text-blue-400  text-md'/>
                  
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                  
                </div>
              </Link>
              <Link href={''}>
                <p className='mt-2 font-normal '>{post.caption}</p>
              </Link>
            </div>
        
      </div>
    </div>
      

      <div className='lg:ml-20 flex gap-4 relative'>
        {post.TypeID.includes('video')?  
        <div 
          onMouseEnter={  () => setIsHover(true) }
          onMouseLeave={  () => setIsHover(false) }
          className='rounded-3xl'
          >
            <Link href={`/detail/${post._id}`}>
              <video 
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              ></video>
            </Link>


          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
        : null}
        {post.TypeID.includes('image')? 
        <div
        className='rounded-3xl'
        >
          <div className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'>
            <Link href={`/detail/${post._id}`}>
              <Image 
              className='cursor-pointer'
              alt='profile-photo'
              layout='responsive'
              width={600} 
              height={300}
              src={post.video.asset.url}
              ></Image>
            </Link>
          </div>
        </div>
        : null}

      </div>
    </div>
  );
};

export default VideoCard