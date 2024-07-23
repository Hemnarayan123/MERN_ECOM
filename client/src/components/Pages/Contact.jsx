import React from 'react';

function Contact() {
  return (
  
    <>
     <div className="bg-black text-gray-300 font-Roboto min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-8 md:flex md:justify-between md:flex-row flex-col gap-10 ">
        {/* Left section */}
        <div className="md:w-1/2 mb-8 md:mb-0 bg-blurr-0 p-5 rounded-lg">
          <h2 className="text-2xl font-Roboto mb-1 text-gray-200">Other ways to connect</h2>
          <p className="mb-8 text-gray-500  ms-9">
          We'd love to hear from you. Our friendly team is always here to chat.
          </p>
          <div className="mb-4">
            <h3 className="text-xl  mb-2 text-gray-200">Reach us on email</h3>
            <p className='text-gray-500  ms-9'>Our friendly team is here to help.</p>
            <a href="mailto:info@lkphotography.com" className="text-gray-500  ms-9">info@xapxem.com</a>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-Roboto mb-2 text-gray-200">Our Services</h3>
          <ul className='list-disc ms-10 text-sm text-gray-500'>
            <li>Comprehensive and detailed product listings to attract customers.</li>
            <li>Comprehensive and detailed product listings to attract customers.</li>
            <li> Efficient order processing and management to ensure timely deliveries.
            </li>
            <li> 24/7 customer support to assist with any inquiries or issues.</li>
            <li> Customized marketing strategies to boost your online presence and sales.</li>
            <li> Safe and secure payment processing for a hassle-free shopping experience.</li>
            <li> Detailed analytics and reporting to help you make informed business decisions.</li>
          </ul>
          </div>
          
        </div>

        {/* Right section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Love to hear from you, Get in touch </h2>
          <form className="space-y-4">
            <input type="email" placeholder="Your Email" className="w-full p-2 rounded bg-primbtncolor-0 focus:outline-none focus:ring-2 " />
         
            <textarea placeholder="Message" className="w-full p-2 rounded bg-primbtncolor-0 focus:outline-none focus:ring-2 " rows="4"></textarea>
            <button type="submit" className="w-full p-2 rounded bg-yellow-500 text-gray-500 bg-primbtnhover-0  hover:bg-primbtncolor-0 transition">Send message</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
