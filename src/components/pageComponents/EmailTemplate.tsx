import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName, email, message
}) => (
  <div>
    <h1>Welcome, {fullName}!</h1>
    <p>From: {email}!</p>
    <p>Message: {message}</p>
  </div>
);

export default EmailTemplate;