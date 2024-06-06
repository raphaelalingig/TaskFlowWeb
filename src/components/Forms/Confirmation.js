import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Confirmation = () => {
  const { token } = useParams();

  useEffect(() => {
    // Call the confirm_email function when the component mounts
    confirm_email(token);
  }, [token]);

  const confirm_email = async (token) => {
    try {
      // Make a request to your backend to confirm the email
      const response = await fetch(`/api/confirm-email/?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Email confirmed successfully
        console.log("Email confirmed successfully");
      } else {
        // Handle error
        console.error("Failed to confirm email");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h2>Email Confirmed Successfully</h2>
      <p>Your email has been confirmed. You can now login to your account.</p>
    </div>
  );
};

export default Confirmation;
