import React, { useState } from "react";
import "../styles/FAQs.css";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding them to your cart, and proceeding to checkout."
    },
    {
      question: "What are your delivery options?",
      answer: "We offer standard delivery within 3-5 business days and express delivery within 1-2 business days."
    },
    {
      question: "Do you require a prescription for all medicines?",
      answer: "Yes, prescription medicines require a valid prescription. Over-the-counter products do not."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email to monitor your delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for unopened products. Please contact customer service for assistance."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs">
      <div className="faqs-hero">
        <div className="hero-overlay">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services and products.</p>
        </div>
      </div>
      <div className="faqs-content">
        <div className="faqs-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className={`faq-icon ${activeIndex === index ? 'active' : ''}`}>+</span>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
