import { useState } from "react";
import { Helmet } from "react-helmet";
import * as Yup from 'yup';

const schema = Yup.object().shape({
  fullName: Yup.string().min(3, 'Too short!').required('Required'),
  subject: Yup.string().min(3, 'Too short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().trim().min(3).max(200).required('Required')
});

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: ""
  });

  const [useSubmit, setUseSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      await schema.validate(formData);
      setUseSubmit(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>Contact Us | Holidaze</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">Contact Us</h1>
        <div className="max-w-md mx-auto p-6 rounded-lg">
          {useSubmit ? (
            <div className="text-green-600 text-lg text-center mb-4">Form submitted successfully!</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full lg:w-96 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  minLength={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full lg:w-96 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  minLength={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full lg:w-96 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full lg:w-96 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  minLength={3}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue text-white py-2 rounded-md hover:bg-darkblue transition duration-300">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
