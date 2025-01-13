import React from 'react';
import herosection_video from '../assets/video/herosection_video.mp4';

const Herosection = () => {
  return (
    <div className="h-[100vh] relative max-sm:h-[34vh]">
      {/* Video Background */}
      <div className="w-full h-full">
        <video
          src={herosection_video}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Overlay Content */}
      <div className="w-full h-full bg-white/40 absolute top-0 flex justify-center items-start text-white px-6 md:px-24 flex-col text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold text-[#FFFFFF] md:w-[55%] max-sm:mt-10">
          "Discover the Perfect Brew <br className="hidden md:block" />
          for Every Moment"
        </h1>
        <p className="mt-4 md:mt-20 text-sm md:text-base">
          – Shop Our Premium Coffee Blends Now!
        </p>
        <div className="mt-6 md:mt-10 flex items-center justify-center md:justify-start">
          <button className="bg-[#FFEAC5] text-lg text-black px-6 md:px-9 py-2 rounded-lg">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
