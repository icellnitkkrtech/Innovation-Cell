import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import styled from "styled-components";

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_a5rxnoh",
        "template_eny2ccs",
        form.current,
        "qQ1xR7DJ4-QB-OWoz"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message delivered successfully"); // Show success notification
          setFormData({ // Reset form data
            user_name: "",
            user_email: "",
            message: ""
          });
        },
        (error) => {
          console.log(error.text);
          toast.error("Error sending message"); // Show error notification
        }
      );
  };
