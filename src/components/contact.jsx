import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.min.css';
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

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input 
          type="text" 
          name="user_name" 
          value={formData.user_name} 
          onChange={(e) => setFormData({ ...formData, user_name: e.target.value })} 
        />
        <label>Email</label>
        <input 
          type="email" 
          name="user_email" 
          value={formData.user_email} 
          onChange={(e) => setFormData({ ...formData, user_email: e.target.value })} 
        />
        <label>Message</label>
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
        />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  margin: 0 auto; 
  display: flex;
  justify-content: center; 
  padding-top: 100px;
 

  form {
    text-algin: center;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;




// import React, { useRef , useState } from "react";
// import emailjs from "@emailjs/browser";
// import { toast } from "react-toastify";
// import styled from "styled-components";

// // npm i @emailjs/browser

// const Contact = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         "service_a5rxnoh",
//         "template_eny2ccs",
//         form.current,
//         "qQ1xR7DJ4-QB-OWoz"
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//           toast.success("Message delivered successfully"); // Show success notification
//           setFormData({ // Reset form data
//             user_name: "",
//             user_email: "",
//             message: ""
//           });
//         },
//         (error) => {
//           console.log(error.text);
//           toast.error("Error sending message"); // Show error notification
//         }
//       );
//   };
//   //       (result) => {
//   //         console.log(result.text);
//   //         console.log("message sent");
//   //       },
//   //       (error) => {
//   //         console.log(error.text);
//   //       }
//   //     );
//   // };

//   return (
//     <StyledContactForm>
//     <form ref={form} onSubmit={sendEmail}>
//       <label>Name</label>
//       <input type="text" name="user_name" />
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>

//     </StyledContactForm>
//   );
// };

// export default Contact;

// // Styles
// const StyledContactForm = styled.div`
//   width: 400px;
//   margin: 0 auto; 
//   display: flex;
//   justify-content: center; 
//   padding-top: 100px;
 

//   form {
//     text-algin: center;
//     display: flex;
//     align-items: flex-start;
//     flex-direction: column;
//     width: 100%;
//     font-size: 16px;

//     input {
//       width: 100%;
//       height: 35px;
//       padding: 7px;
//       outline: none;
//       border-radius: 5px;
//       border: 1px solid rgb(220, 220, 220);

//       &:focus {
//         border: 2px solid rgba(0, 206, 158, 1);
//       }
//     }

//     textarea {
//       max-width: 100%;
//       min-width: 100%;
//       width: 100%;
//       max-height: 100px;
//       min-height: 100px;
//       padding: 7px;
//       outline: none;
//       border-radius: 5px;
//       border: 1px solid rgb(220, 220, 220);

//       &:focus {
//         border: 2px solid rgba(0, 206, 158, 1);
//       }
//     }

//     label {
//       margin-top: 1rem;
//     }

//     input[type="submit"] {
//       margin-top: 2rem;
//       cursor: pointer;
//       background: rgb(249, 105, 14);
//       color: white;
//       border: none;
//     }
//   }
// `;