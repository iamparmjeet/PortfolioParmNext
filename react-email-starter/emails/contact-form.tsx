interface ContactFormEmailProps {
    fullName: string
    email: string
    message: string
  }
  
  const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
    fullName,
    email,
    message
  }) => (
    <div className="border-2 border-gray-500 shadow-md rounded-md p-4">
      <h1>Contact form submission</h1>
      <p>
        From <strong>{fullName}</strong> at {email}
      </p>
      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  )
  
  export default ContactFormEmail