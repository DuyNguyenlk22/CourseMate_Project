import React from "react";
import ListEducator from "../HomePage/ListEducator/ListEducator";
import Slider from "../HomePage/Slider/Slider";
import NumberCounter from "../HomePage/NumberCounter/NumberCounter";
export default function AboutUsPage() {
  return (
    <div id='aboutUsPage' className='searchCourse'>
      <div className='aboutUs__banner search__banner'>
        <div className='overlay_purpil flex items-center justify-center'>
          <div className='container text-center text-white'>
            <h1 className='text-6xl font-bold'>About Us</h1>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-24'>
          <h1 className='title text-2xl md:text-5xl font-bold text-center'>
            Introduction About Our Institute
          </h1>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10'>
            <p className='m-5'>
              Become the webinar virtuoso you never knew you could be! From
              virtual backgrounds to perfect lighting, our "Webinar Wizardry"
              course will teach you how to shine in the digital spotlight. Your
              online presence will be so captivating; even your pet cat will
              give you a standing ovation.
            </p>
            <p className='m-5'>
              Embark on a cosmic journey through the IT universe! Our "Galactic
              IT Explorer" course will take you from the basics of coding to the
              mysteries of AI and beyond. By the end, you'll be navigating the
              digital cosmos like a seasoned space cadet!
            </p>
          </div>
        </div>
      </div>
      <NumberCounter />
      <Slider />
      <div className='pb-24'>
        <ListEducator />
      </div>
    </div>
  );
}
