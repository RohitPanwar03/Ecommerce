import React from "react";
import "./About.css";
import { Typography, Button, Avatar } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";

import InstagramIcon from "@mui/icons-material/Instagram";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/rohit_panwar31";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://avatars.githubusercontent.com/u/108470973?s=400&u=11e99a1192e4ec9f294ec82ea1a5e1ed6029a432&v=4"
              alt="Founder"
            />
            <Typography>Abhishek Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @Rohit_Panwar. Fully Resposnive
              MERN Stack Ecommerce Platform.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://github.com/RohitPanwar03" target="blank">
              <GitHubIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/rohit_panwar31" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
