import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:rohitpanwar590@gmail.com">
        <Button>Contact: rohitpanwar590@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
