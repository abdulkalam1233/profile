import React from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaTwitterSquare,
} from "react-icons/fa";
import profile from "../../assets/profile.png";
import Resume from "../../assets/resume.pdf";

function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="profile border-8 rounded-full border-red-500">
        <img src={profile} alt="Profile" width={"200px"} height="200px" />
      </div>
      <div className="name text-4xl sm:text-2xl font-bold m-2 self-center">
        Abdul Kalam
      </div>
      <div className="designation text-xl text-bold text-slate-500 m-2">
        Software CraftsPerson
      </div>
      <div className="network m-2 flex space-x-3">
        <a href="https://github.com/abdulkalam1233" target="_blank">
          <FaGithub size={"1.5rem"} />
        </a>
        <a
          href="https://www.linkedin.com/in/abdulkalamshaik33/"
          target="_blank"
        >
          <FaLinkedin size={"1.5rem"} />
        </a>
        <a href="https://twitter.com/abdulkalam1233" target="_blank">
          <FaTwitterSquare size={"1.5rem"} />
        </a>
        <a href="https://medium.com/@abdulkalamshaik1233" target="_blank">
          <FaMedium size={"1.5rem"} />
        </a>
        <a href="https://www.instagram.com/iam_sk.ak/" target="_blank">
          <FaInstagram size={"1.5rem"} />
        </a>
      </div>
      <div className="resume mt-2">
        <a
          className="bg-contain bg-red-500 p-2 rounded-lg text-white w-[6rem]"
          href={Resume}
          target="_blank"
        >
          Resume
        </a>
      </div>
    </div>
  );
}

export default About;
