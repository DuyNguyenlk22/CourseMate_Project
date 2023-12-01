import React, { useEffect } from "react";
import "./contact.scss";

export default function Contact() {
  let itemsLeft = [
    {
      icon: "fa-solid fa-phone-volume",
      title: "Phone Number :",
      info1: "Head-Office : (+011) 948-5481 //",
      info2: "Branch-Office : (+011) 948-56487",
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Location Address :",
      info1: "34th Bridge Road, San Francisco //",
      info2: "3th New Street Road, London",
    },
    {
      icon: "fa-regular fa-envelope-open",
      title: "Email address :",
      info1: "domain@company.com //",
      info2: "info_xyz@domain.com",
    },
  ];
  let itemsRight = [
    { placeholder: "Enter Name*" },
    { placeholder: "Enter Email*" },
    { placeholder: "Enter Subject*" },
    { placeholder: "Enter Number*" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section id='contact' className='searchCourse'>
      <div className='contact__banner search__banner'>
        <div className='overlay_purpil flex items-center justify-center'>
          <div className='container text-center text-white'>
            <h1 className='text-6xl font-bold'>contact</h1>
          </div>
        </div>
      </div>
      <div className='contact__content mb-20'>
        <div className='container'>
          <div className='py-20'>
            <iframe
              className='rounded-3xl'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41843487445!2d106.36555844903441!3d10.755292869070603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1701136673810!5m2!1svi!2s'
              width={"100%"}
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='map'
            />
          </div>
          <div id='contact__info'>
            <div className='pattern_overlay zigzag-patten'></div>
            <div className='contact__form flex flex-wrap lg:flex-nowrap'>
              <div className='info__left w-full lg:w-1/2 px-3 mr-0 lg:mr-[50px]'>
                <h1 className='font-extrabold text-[42px]'>
                  Feel Free To Contact And Reach Us !
                </h1>
                <p className='my-4'>
                  Per sed, mattis. Integer viverra euismod maecenas incidunt,
                  phasellus consequatur aliquam nihil temporibus in assumens
                  deserunt.
                </p>
                <div className='contact_detail_list'>
                  <ul>
                    {itemsLeft.map((item, index) => {
                      return (
                        <li key={`item-${index}`}>
                          <span className='text-center mr-6'>
                            <i
                              className={`${item.icon} w-[80px] h-[80px] leading-[80px] bg-[#41246D] text-white text-[40px] rounded-full`}></i>
                          </span>
                          <div>
                            <h5 className='text-lg font-semibold'>
                              {item.title}
                            </h5>
                            <span>{item.info1}</span>
                            <br />
                            <span>{item.info2}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className='info__right w-full lg:w-1/2 px-3'>
                <div className='contact-from-wrap'>
                  <div className='pattern_overlay circle-patten'></div>
                  <form action='' className='flex flex-wrap'>
                    {itemsRight.map((item, index) => {
                      return (
                        <p
                          key={`item-${index}`}
                          className='w-full lg:w-1/2 px-[15px] mb-[30px]'>
                          <input
                            type='input'
                            placeholder={`${item.placeholder}`}
                            className='px-[12px] py-[20px] w-full bg-[#f8f8f8] rounded-2xl h-[50px] '
                          />
                        </p>
                      );
                    })}
                    <p className='w-full px-[15px] mb-[30px]'>
                      <textarea
                        cols='30'
                        rows='10'
                        placeholder='Enter message'
                        className='px-[12px] py-[20px] w-full bg-[#f8f8f8] rounded-2xl'></textarea>
                    </p>
                    <p className='w-full px-[15px]'>
                      <button className='btnGlobal w-full font-semibold'>
                        Submit now
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
