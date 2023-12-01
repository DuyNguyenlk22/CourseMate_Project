import React, { useEffect, useState } from "react";
import { dangKyKhoaHoc, layThongTinKhoaHoc } from "../../../Services/api";
import { ConfigProvider, Tabs, Tag, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { localServices } from "../../../Services/localServices";
import { useSelector } from "react-redux";

export default function CourseDetailPage() {
  let param = useParams();
  let navigate = useNavigate();
  let maKhoaHoc = param.courseId;
  let [courseDetail, setCourseDetail] = useState();
  console.log("courseDetail: ", courseDetail);
  const { info } = useSelector((state) => state.userSlice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let fakeData = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div className='p-5 text-base'>
          <h3 className='text-purple-800 text-lg my-2 font-bold'>
            Foundations of IT:
          </h3>
          <p>
            Introduction to basic concepts in IT. Fundamentals of computer
            systems, hardware, and software.
          </p>
          <h3 className='text-purple-800 text-lg my-2 font-bold'>
            Programming and Software Development:
          </h3>
          <p>
            Learning programming languages such as Python, Java, C++, etc.
            Software design principles and development methodologies.
          </p>
          <h3 className='text-purple-800 text-lg my-2 font-bold'>
            Database Management:
          </h3>
          <p>
            Database concepts and design. SQL (Structured Query Language) for
            database management.
          </p>
          <h3 className='text-purple-800 text-lg my-2 font-bold'>
            Networking:
          </h3>
          <p>
            Understanding computer networks and protocols. Network design,
            implementation, and maintenance.
          </p>
          <h3 className='text-purple-800 text-lg my-2 font-bold'>
            System Administration:
          </h3>
          <p>
            Managing operating systems (e.g., Windows, Linux). Server
            administration and configuration.
          </p>
          <h3 className='text-purple-800 text-lg my-2 font-bold'>
            Cybersecurity:
          </h3>
          <p>
            Security measures for networks, systems, and applications. Basics of
            cybersecurity, including threat detection and prevention.
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Instructor",
      children: (
        <div>
          <div className='flex flex-center'>
            <div className='w-36 h-36 overflow-hidden rounded-lg lg:mr-10 mr-3'>
              <img
                className='w-36'
                src='https://i.pinimg.com/564x/05/47/51/0547519801f44af26fd6756552330333.jpg'
                alt=''
              />
            </div>
            <div className='flex flex-center items-center'>
              <div className='name'>
                <h3 className='mt-3 font-bold text-3xl'>
                  Dr. Amanda Techsmith
                </h3>
                <span className='py-4 mb-2 font-semibold'>
                  Senior Software Architect
                </span>
              </div>
            </div>
          </div>
          <p className='text-base pt-3'>
            Dr. Amanda Techsmith is a seasoned professional in the field of
            software architecture with over 15 years of experience. She
            specializes in designing robust and scalable software solutions for
            diverse industries. Dr. Techsmith has a Ph.D. in Computer Science
            and has contributed to several open-source projects. Known for her
            innovative thinking, she often speaks at industry conferences on the
            latest trends in software development.
          </p>
          <div className='flex flex-center'>
            <div className='w-36 h-36 overflow-hidden rounded-lg mt-5 lg:mr-10 mr-3'>
              <img
                className='w-36'
                src='https://i.pinimg.com/564x/30/4b/32/304b32ba8f39b796b2dc0e5a45067e20.jpg'
                alt=''
              />
            </div>
            <div className='flex flex-center items-center'>
              <div className='name'>
                <h3 className='mt-3 font-bold text-3xl'>Alex Cyberguard</h3>
                <span className='py-4 mb-2 font-semibold'>
                  Cybersecurity Analyst
                </span>
              </div>
            </div>
          </div>
          <p className='text-base pt-3'>
            Alex Cyberguard is a skilled cybersecurity professional dedicated to
            safeguarding digital assets and ensuring the integrity of
            information systems. With a background in ethical hacking and
            penetration testing, Alex is adept at identifying and mitigating
            security vulnerabilities. Passionate about staying ahead of cyber
            threats, Alex holds several industry certifications and actively
            participates in cybersecurity communities. Known for a strategic and
            proactive approach, Alex is a go-to expert for securing networks and
            data.
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Reviews",
      children: (
        <div>
          <p className='my-4'>
            "I enrolled in the Advanced Web Development Mastery course, and it
            exceeded my expectations! The curriculum covers a comprehensive
            range of topics, from the latest frontend frameworks to backend
            technologies. The hands-on projects were challenging but immensely
            rewarding. The instructors were knowledgeable, and the support from
            the online community made the learning experience even better. I
            highly recommend this course for anyone looking to take their web
            development skills to the next level."
          </p>
          <p className='my-4'>
            "As a beginner in cybersecurity, I found the Cybersecurity
            Essentials course incredibly helpful. The instructors broke down
            complex concepts into digestible modules, and the practical labs
            were instrumental in reinforcing the learning. The real-world
            scenarios presented in the course gave me a solid foundation in
            cybersecurity principles. The course forums were active, and I
            appreciated the quick responses from both instructors and fellow
            students. Overall, a fantastic starting point for anyone entering
            the field of cybersecurity."
          </p>
        </div>
      ),
    },
    {
      key: "4",
      label: "Description",
      children: (
        <div>
          <p className='my-4'>{courseDetail?.moTa ? courseDetail.moTa : ""}</p>
        </div>
      ),
    },
  ];
  let handleEnrollCourse = async (maKhoaHoc) => {
    if (info) {
      try {
        let dataEnroll = {
          maKhoaHoc,
          taiKhoan: localServices?.get().taiKhoan,
        };
        await dangKyKhoaHoc(dataEnroll);
        message.success("Assign Successfully");
        setTimeout(() => {
          navigate("/Personal");
          window.location.reload();
        }, 1000);
      } catch (err) {
        message.error("You Have already assign to this course.");
      }
    } else {
      navigate("/signIn");
    }
  };
  useEffect(() => {
    const fetchDataCourseDetail = async () => {
      try {
        const response = await layThongTinKhoaHoc(maKhoaHoc);
        setCourseDetail(response.data);
      } catch {
        message.error("An Error occurs, please try again later");
      }
    };
    fetchDataCourseDetail();
  }, []);

  return (
    <section>
      <div className='CourseDetailBanner w-full h-36 md:h-96 relative flex items-center text-center'>
        <div className='bg absolute top-0 left-0 w-full h-full'></div>
        <h1 className='text-white font-bold lg:text-8xl text-4xl w-full'>
          Course Detail
        </h1>
      </div>
      <div className='courseDetail my-20'>
        <div className='container'>
          <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 my-10'>
            <div className='left-center lg:grid lg:grid-cols-1 md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1'>
              <div className='course-info shadow-pink-100 shadow-lg rounded-lg p-5 my-5'>
                <div className='m-4'>
                  <img
                    className='rounded-xl'
                    src={courseDetail?.hinhAnh ? courseDetail.hinhAnh : ""}
                    alt=''
                  />
                </div>
                <ul className='ml-5'>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-clock"></i>Name : {courseDetail?.tenKhoaHoc ? courseDetail.tenKhoaHoc : ''}</li>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-clock"></i>Time Duration : 12 weeks</li>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-book-open-reader"></i>Study Lecture : 24 Lectures</li>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-bars"></i>Skill Level : Advance Course</li>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-people-group"></i>Nu. Of Students : {courseDetail?.soLuongHocVien} Students</li>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-star"></i>Pass Percentage : 90%</li>
                  <li><i className="mr-3 py-3 text-pink-500 fa-solid fa-graduation-cap"></i>Certificate : Yes</li>
                </ul>
                <div className='text-center my-5 px-10'>
                  <button
                    className='btnGlobalPurple font-bold w-5/6'
                    onClick={() => handleEnrollCourse(maKhoaHoc)}>
                    Enrroll
                  </button>
                </div>
              </div>
              <div className='othersCourse bg-pink-600 rounded-3xl p-2 my-10'>
                <div className='btnGlobalPurple text-lg font-bold text-center m-4'>
                  More Courses For You !
                </div>
                <ul>
                  <li className='flex border-b-2 border-white-500 border-dotted'>
                    <img
                      className='w-20 m-3 rounded-md'
                      src='https://demo.bosathemes.com/html/educator/assets/img/educator-img12.jpg'
                      alt=''
                    />
                    <div className='flex items-center'>
                      <p className='text-white font-semibold'>
                        {" "}
                        Full Stack Web Development Bootcamp
                      </p>
                    </div>
                  </li>
                  <li className='flex border-b-2 border-white-500 border-dotted'>
                    <img
                      className='w-20 m-3 rounded-md'
                      src='https://i.pinimg.com/236x/2b/59/ce/2b59ceac8b9e2324d8f8ea3261a4a04c.jpg'
                      alt=''
                    />
                    <div className='flex items-center'>
                      <p className='text-white font-semibold'>
                        Data Science Fundamentals: From Basics to Advanced
                      </p>
                    </div>
                  </li>
                  <li className='flex border-b-2 border-white-500 border-dotted'>
                    <img
                      className='w-20 m-3 rounded-md'
                      src='https://i.pinimg.com/236x/4b/6a/37/4b6a37c56b81a18713f655f6bcc3e3f0.jpg'
                      alt=''
                    />
                    <div className='flex items-center'>
                      <p className='text-white font-semibold'>
                        Network Security Essentials
                      </p>
                    </div>
                  </li>
                  <li className='flex'>
                    <img
                      className='w-20 m-3 rounded-md'
                      src='https://i.pinimg.com/236x/87/db/b7/87dbb7f8bee7c3b802b8d7c453fcba87.jpg'
                      alt=''
                    />
                    <div className='flex items-center'>
                      <p className='text-white font-semibold'>
                        Cloud Computing and DevOps Certification
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='main-img lg:col-span-2'>
              <div className='title grid lg:grid-cols-9 md:grid-cols-4 grid-cols-1 lg:gap-2 gap-2 mb-5'>
                <div className='course_item flex lg:col-span-3 mx-5 lg:m-0 md:border-r-2 border-pink-300 md:col-span-2'>
                  <img
                    src={`https://i.pravatar.cc/150?u=${courseDetail?.nguoiTao.hoTen}`}
                    className='w-12 rounded-full'
                    alt='...'
                  />
                  <div className="teacher ml-4">
                    <p className='font-bold'>{courseDetail?.nguoiTao.hoTen}</p>
                    <span>Chief Instructor</span>
                  </div>
                  <Tag
                    className='lg:hidden d-block max-h-6 rounded-lg ml-10'
                    bordered={false}
                    color='purple'>
                    {courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc
                      ? courseDetail.danhMucKhoaHoc.maDanhMucKhoahoc
                      : ""}
                  </Tag>
                </div>
                <div className='course_item lg:flex items-center hidden lg:col-span-2 lg:border-r-2 border-pink-300'>
                  <p className='font-bold mx-5 lg:m-0'>Category :</p>
                  <Tag bordered={false} color='purple'>
                    {courseDetail?.danhMucKhoaHoc.maDanhMucKhoahoc
                      ? courseDetail.danhMucKhoaHoc.maDanhMucKhoahoc
                      : ""}
                  </Tag>
                </div>
                <div className='course_item flex items-center lg:col-span-2 border-r-2 md:border-pink-300 md:col-span-1'>
                  <p className='font-bold mx-5 lg:m-0'>Reviews:</p>
                  <span className='ml-2'>
                    {courseDetail?.luotXem ? courseDetail.luotXem : ""}
                  </span>
                </div>
                <div className='course_item flex items-center lg:col-span-2 md:col-span-1'>
                  <p className='font-bold mx-5 lg:m-0'>Price :</p>
                  <span className='font-bold text-pink-500 text-3xl'>
                    $39.99
                  </span>
                </div>
              </div>
              <img
                className='rounded-3xl'
                src='https://demo.bosathemes.com/html/educator/assets/img/educator-img14.jpg'
                alt=''
              />
              <div className='content-title mt-10 border rounded-xl p-2'>
                <ConfigProvider
                  theme={{
                    components: {
                      Tabs: {
                        colorPrimary: "#f24080",
                        colorPrimaryHover: "#f24080",
                      },
                    },
                  }}>
                  <Tabs defaultActiveKey='1' items={fakeData} />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
