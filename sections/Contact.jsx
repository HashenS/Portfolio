'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import CinematicBackgroundText from '../components/Effects/CinematicBackgroundText';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
  const form = useRef();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Add time field for the template
    const templateParams = {
      ...formState,
      time: new Date().toLocaleString()
    };

    emailjs.send(
      'service_4ld8kob',
      'template_eo7bmpg',
      templateParams,
      '2CCddglAJ8D9_9FMr'
    )
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error('Email failed to send...', error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hashenshehara4@gmail.com',
      link: 'mailto:hashenshehara4@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kegalle, Sri Lanka',
      link: null
    }
  ];

  const socialLinks = [
    { icon: Github, link: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, link: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, link: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <section className="contact-section">
      <CinematicBackgroundText text="HIRE ME" top="15%" left="5%" />
      <div className="container">
        <div className="section-header">
          <span className="pre-text">COMMUNICATION ARCHIVE</span>
          <h2 className="main-title text-gradient">Get In Touch</h2>
          <div className="scanner-line" />
          <p className="section-subtitle">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </div>

        <div className="contact-grid">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="contact-info">
              <div className="info-card glass">
                <h3 className="info-title">Let's Talk</h3>
                <p className="info-description">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="info-items">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="info-item">
                      <div className="info-icon">
                        <item.icon size={20} />
                      </div>
                      <div className="info-content">
                        <div className="info-label">{item.label}</div>
                        {item.link ? (
                          <a href={item.link} className="info-value link">
                            {item.value}
                          </a>
                        ) : (
                          <div className="info-value">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="social-links">
                  <div className="social-title">Follow Me</div>
                  <div className="social-icons">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label={social.label}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <form ref={form} onSubmit={handleSubmit} className="contact-form glass">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="How can I help you?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className={`submit-btn contrast-text ${status !== 'idle' ? 'disabled' : ''}`}
                disabled={status !== 'idle'}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <span>Send Message</span>
                      <Send size={18} />
                    </motion.div>
                  )}
                  {status === 'sending' && (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <span>Sending...</span>
                      <div className="btn-loader" />
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <span>Transmitted</span>
                      <CheckCircle2 size={18} />
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="btn-content"
                    >
                      <span>Error</span>
                      <AlertCircle size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 6rem 0;
          position: relative;
        }

        /* Contrast Fix */
        .contrast-text {
            color: white;
            transition: color 0.3s ease;
        }

        /* If white theme active */
        [style*="--active-color: #ffffff"] .contrast-text,
        [style*="--active-color: #fff"] .contrast-text {
            color: #000000 !important;
        }

        .section-header {
          text-align: center;
          margin-bottom: 6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pre-text {
          font-size: 0.75rem;
          color: var(--active-color);
          letter-spacing: 0.6em;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .main-title {
          font-size: clamp(3rem, 10vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, var(--active-color, #a855f7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .scanner-line {
          width: 120px;
          height: 2px;
          background: var(--active-color);
          box-shadow: 0 0 15px var(--active-color), 0 0 30px var(--active-color);
          margin-bottom: 2rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #94a3b8;
          line-height: 1.6;
          max-width: 600px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1.3fr;
            gap: 3rem;
          }
        }

        .info-card, .contact-form {
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .info-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }

        .info-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 2rem;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .info-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--active-color);
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .info-value {
          font-size: 1rem;
          color: white;
          font-weight: 600;
        }

        .info-value.link {
          color: var(--active-color);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .info-value.link:hover {
          color: white;
        }

        .social-links {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .social-title {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .social-icons {
          display: flex;
          gap: 0.75rem;
        }

        .contact-info .social-icon {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .contact-info .social-icon:hover {
          background: rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
          border-color: rgba(var(--active-color-rgb, 168, 85, 247), 0.3);
          color: var(--active-color);
          transform: translateY(-2px);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 0.5rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          color: white;
          font-size: 0.95rem;
          font-family: var(--font-main);
          transition: all 0.2s ease;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--active-color);
          box-shadow: 0 0 0 3px rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: #64748b;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          background: var(--active-color);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 5px 15px rgba(var(--active-color-rgb, 168, 85, 247), 0.4);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 30px rgba(var(--active-color-rgb, 168, 85, 247), 0.6), 0 0 60px rgba(var(--active-color-rgb, 168, 85, 247), 0.4);
          filter: brightness(1.2);
          border-color: #fff;
        }

        /* White theme special case */
        [style*="--active-color: #ffffff"] .submit-btn,
        [style*="--active-color: #fff"] .submit-btn {
            background: #ffffff !important;
            color: #000 !important;
            border-color: #ccc !important;
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn.disabled {
          cursor: not-allowed;
          filter: grayscale(0.5);
          opacity: 0.8;
          transform: none !important;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
        }

        .btn-loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .contact-info, .contact-form {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 2rem 0;
            min-height: auto;
          }
          
          .section-header {
            margin-bottom: 2.5rem;
          }
          
          .info-card, .contact-form {
            padding: 1.5rem;
          }
          
          .info-title {
            font-size: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
