import React, { useState, useEffect, useRef } from 'react';
import './HeHaven.css';

const HeHaven = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Header scroll effect
      setHeaderScrolled(window.scrollY > 100);
      
      // Active link detection
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          setActiveLink(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    // Initialize counters
    const counters = document.querySelectorAll('.purecounter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-purecounter-end');
      const duration = +counter.getAttribute('data-purecounter-duration');
      let start = 0;
      
      const updateCounter = () => {
        const increment = target / duration;
        if (start < target) {
          counter.innerText = Math.ceil(start + increment);
          start += increment;
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target;
        }
      };
      
      updateCounter();
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Header height
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
      setMobileNavOpen(false);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="hehaven-app">
      <audio ref={audioRef} src="assets/the_lamp_is_low.wav" loop />
      
      {/* Topbar */}
      <div id="topbar" className={`d-flex align-items-center fixed-top ${headerScrolled ? 'topbar-scrolled' : ''}`}>
        <div className="container d-flex justify-content-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope"></i> 
            <a href="mailto:contact@example.com">contact@HeHaven.com</a>
            <i className="bi bi-phone"></i> +91 82545 67825
          </div>
          <div className="d-none d-lg-flex social-links align-items-center">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header id="header" className={`fixed-top ${headerScrolled ? 'header-scrolled' : ''}`}>
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto"><a href="#hero">HeHaven</a></h1>
          
          <nav id="navbar" className={`navbar order-last order-lg-0 ${mobileNavOpen ? 'navbar-mobile' : ''}`}>
            <ul>
              <li>
                <a 
                  className={`nav-link scrollto ${activeLink === 'hero' ? 'active' : ''}`} 
                  onClick={() => scrollToSection('hero')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  className={`nav-link scrollto ${activeLink === 'about' ? 'active' : ''}`} 
                  onClick={() => scrollToSection('about')}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  className={`nav-link scrollto ${activeLink === 'services' ? 'active' : ''}`} 
                  onClick={() => scrollToSection('services')}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  className={`nav-link scrollto ${activeLink === 'therapists' ? 'active' : ''}`} 
                  onClick={() => scrollToSection('therapists')}
                >
                  Therapists
                </a>
              </li>
              <li>
                <a 
                  className={`nav-link scrollto ${activeLink === 'contact' ? 'active' : ''}`} 
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
            <i 
              className={`bi ${mobileNavOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle`} 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            ></i>
          </nav>

          <a 
            href="#appointment" 
            className="appointment-btn scrollto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('appointment');
            }}
          >
            <span className="d-none d-md-inline">Make an Appointment</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <center>
            <button 
              id="audio-button"
              onClick={toggleAudio}
            >
              <i className={`bi ${isPlaying ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'}`}></i>
            </button>
            <h1 className="text-outline clipping" style={{display: 'inline-block'}}>
              <span>HeHaven</span>
            </h1>
            <h2>FOR MEN. ABOUT MEN.</h2>
            <a 
              href="#about" 
              className="btn-get-started scrollto"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              Get Started
            </a>
          </center>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="why-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="content">
                <h3>Who are we?</h3>
                <p>
                  HeHaven is a group of people dedicated to helping men with mental health issues. 
                  We are a group of people who have been through the same and we know how it feels 
                  to be in that position. We are here to help you and guide you through this journey.
                </p>
                <div className="text-center">
                  <a href="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bxs-flag-alt"></i>
                      <h4>Our Story</h4>
                      <p>Learn about our journey and commitment to mental well-being.</p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bx-wrench"></i>
                      <h4>Diverse Support</h4>
                      <p>Comprehensive mental health support tailored to your needs.</p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bx-user"></i>
                      <h4>Meet the Team</h4>
                      <p>Get acquainted with our dedicated therapists.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
              <a href="https://youtu.be/Y0F1cICm9IM" className="glightbox play-btn mb-4"></a>
            </div>

            <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
              <h3>An Insights into Men's Mental Health</h3>
              <p>Depression consumes your day-to-day life and interferes with your ability to work, study, eat, sleep, and have fun.</p>

              <div className="icon-box">
                <div className="icon"><i className="bx bx-fingerprint"></i></div>
                <h4 className="title"><a href="">Stigma and Barriers</a></h4>
                <p className="description">Men often face societal stigma and traditional expectations that discourage them from seeking help for mental health issues.</p>
              </div>

              <div className="icon-box">
                <div className="icon"><i className="bx bx-gift"></i></div>
                <h4 className="title"><a href="">Higher Suicide Rates</a></h4>
                <p className="description">Men generally have higher rates of completed suicides than women.</p>
              </div>
              
              <div className="icon-box">
                <div className="icon"><i className="bx bx-atom"></i></div>
                <h4 className="title"><a href="">Prevalence of Substance Abuse</a></h4>
                <p className="description">Men may be more likely to turn to substance abuse as a coping mechanism.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="appointment section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Make an Appointment</h2>
            <p>Rest assured, we're here to support you. Share a bit about yourself, and we'll connect you with one of our volunteers.</p>
          </div>

          <form className="php-email-form">
            <div className="row">
              <div className="col-md-4 form-group">
                <input type="text" name="name" className="form-control" placeholder="Your Name" />
              </div>
              <div className="col-md-4 form-group mt-3 mt-md-0">
                <input type="email" className="form-control" name="email" placeholder="Your Email" />
              </div>
              <div className="col-md-4 form-group mt-3 mt-md-0">
                <input type="tel" className="form-control" name="phone" placeholder="Your Phone" />
              </div>
            </div>
            <div className="form-group mt-3">
              <textarea className="form-control" name="message" rows="5" placeholder="Message (Optional)"></textarea>
            </div>
            <div className="text-center">
              <button type="submit">Make an Appointment</button>
            </div>
          </form>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Empowering Your Mental Well-being: Explore a Range of Supportive Services Tailored to Your Needs.</p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="icon-box">
                <div className="icon"><i className="fas fa-comments"></i></div>
                <h4><a href="">Anonymous Chat Support</a></h4>
                <p>Connect with a trained volunteer for confidential conversations.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
              <div className="icon-box">
                <div className="icon"><i className="fas fa-book"></i></div>
                <h4><a href="">Mental Health Resources Hub</a></h4>
                <p>Access a comprehensive collection of articles and resources.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
              <div className="icon-box">
                <div className="icon"><i className="fas fa-envelope-open-text"></i></div>
                <h4><a href="">Weekly Support Emails</a></h4>
                <p>Subscribe for uplifting content and coping strategies.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div className="icon-box">
                <div className="icon"><i className="fas fa-users"></i></div>
                <h4><a href="">Virtual Support Groups</a></h4>
                <p>Join moderated online support groups to share experiences.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div className="icon-box">
                <div className="icon"><i className="fas fa-hands-helping"></i></div>
                <h4><a href="">Self-Care Workshops</a></h4>
                <p>Attend virtual workshops focused on self-care techniques.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
              <div className="icon-box">
                <div className="icon"><i className="fas fa-peace"></i></div>
                <h4><a href="">Meditation Sessions</a></h4>
                <p>Participate in guided mindfulness and meditation sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counts Section */}
      <section id="counts" className="counts">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="count-box">
                <i className="fas fa-user-md"></i>
                <span data-purecounter-start="0" data-purecounter-end="12" data-purecounter-duration="1" className="purecounter">12</span>
                <p>Therapists</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
              <div className="count-box">
                <i className="far fa-hospital"></i>
                <span data-purecounter-start="0" data-purecounter-end="28" data-purecounter-duration="1" className="purecounter">28</span>
                <p>Volunteers</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div className="count-box">
                <i className="fas fa-flask"></i>
                <span data-purecounter-start="0" data-purecounter-end="825" data-purecounter-duration="1" className="purecounter">825</span>
                <p>Smiling Faces</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div className="count-box">
                <i className="fas fa-award"></i>
                <span data-purecounter-start="0" data-purecounter-end="4" data-purecounter-duration="1" className="purecounter">4</span>
                <p>Awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section id="therapists" className="therapists">
        <div className="container">
          <div className="section-title">
            <h2>Our Lead Therapists</h2>
            <p>Our team of dedicated therapists is here to guide you on your journey toward mental well-being.</p>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="assets/therapists/1.webp" className="img-fluid" alt="Therapist" /></div>
                <div className="member-info">
                  <h4>Dr. Shaun Murphy</h4>
                  <span>Addiction therapist</span>
                  <p>Nonsensical questions usually imply sarcasm, which I've found people often answer sarcastically.</p>
                  <div className="social">
                    <a href=""><i className="ri-twitter-fill"></i></a>
                    <a href=""><i className="ri-facebook-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""><i className="ri-linkedin-box-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="assets/therapists/2.webp" className="img-fluid" alt="Therapist" /></div>
                <div className="member-info">
                  <h4>Dr. Jackson Han</h4>
                  <span>Clinical therapist</span>
                  <p>If either of us are making decisions based on personal experiences, we're making wrong decisions.</p> 
                  <div className="social">
                    <a href=""><i className="ri-twitter-fill"></i></a>
                    <a href=""><i className="ri-facebook-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""><i className="ri-linkedin-box-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-4">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="assets/therapists/3.webp" className="img-fluid" alt="Therapist" /></div>
                <div className="member-info">
                  <h4>Dr. Hannibal Lecter</h4>
                  <span>Cognitive therapist</span>
                  <p>The worm that destroys you is the temptation to agree with your critics.</p>
                  <div className="social">
                    <a href=""><i className="ri-twitter-fill"></i></a>
                    <a href=""><i className="ri-facebook-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""><i className="ri-linkedin-box-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mt-4">
              <div className="member d-flex align-items-start">
                <div className="pic"><img src="assets/therapists/4.webp" className="img-fluid" alt="Therapist" /></div>
                <div className="member-info">
                  <h4>Dr. Hieter</h4>
                  <span>Marriage and family counselor</span>
                  <p>I'm Dr. Josef Heiter, retired, but still well known as the leading surgeon in separating Siamese twins.</p>
                  <div className="social">
                    <a href=""><i className="ri-twitter-fill"></i></a>
                    <a href=""><i className="ri-facebook-fill"></i></a>
                    <a href=""><i className="ri-instagram-fill"></i></a>
                    <a href=""><i className="ri-linkedin-box-fill"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
            <p>Explore our FAQ section for comprehensive insights into HeHaven's services.</p>
          </div>

          <div className="faq-list">
            <ul>
              <li>
                <i className="bx bx-help-circle icon-help"></i> 
                <a data-bs-toggle="collapse" className="collapse">How do I schedule an appointment?</a>
                <div className="collapse show">
                  <p>Booking an appointment is easy! Simply visit our "Make Appointment" section.</p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i> 
                <a data-bs-toggle="collapse" className="collapsed">What types of services do you offer?</a>
                <div className="collapse">
                  <p>We provide a wide range of mental health services tailored to individual needs.</p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i> 
                <a data-bs-toggle="collapse" className="collapsed">Are your services confidential?</a>
                <div className="collapse">
                  <p>Yes, confidentiality is a top priority.</p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i> 
                <a data-bs-toggle="collapse" className="collapsed">Are virtual appointments available?</a>
                <div className="collapse">
                  <p>Yes, we offer virtual appointments to ensure flexibility and accessibility.</p>
                </div>
              </li>

              <li>
                <i className="bx bx-help-circle icon-help"></i> 
                <a data-bs-toggle="collapse" className="collapsed">What do I do in case of a crisis?</a>
                <div className="collapse">
                  <p>If you're in crisis, please reach out to our crisis intervention services immediately.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="testimonials-slider swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonial-wrap">
                  <div className="testimonial-item">
                    <img src="assets/testimonials/user.webp" className="testimonial-img" alt="User" />
                    <h3>Anonymous User</h3>
                    <h4>Ceo &amp; Founder</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Finding HeHaven was a turning point in my mental health journey.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </div>

              <div className="swiper-slide">
                <div className="testimonial-wrap">
                  <div className="testimonial-item">
                    <img src="assets/testimonials/user.webp" className="testimonial-img" alt="User" />
                    <h3>Anonymous User</h3>
                    <h4>Designer</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      HeHaven is more than a mental health resource; it's a supportive companion.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-title">
            <h2>Gallery</h2>
            <h6>Step Inside the Heart of HeHaven: A Glimpse into Our Offices.</h6>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/gallery/1.webp" className="galelry-lightbox">
                  <img src="assets/gallery/1.webp" alt="" className="img-fluid" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/gallery/2.webp" className="galelry-lightbox">
                  <img src="assets/gallery/2.webp" alt="" className="img-fluid" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/gallery/3.webp" className="galelry-lightbox">
                  <img src="assets/gallery/3.webp" alt="" className="img-fluid" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href="assets/gallery/4.webp" className="galelry-lightbox">
                  <img src="assets/gallery/4.webp" alt="" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-title">
            <h2>Connect with HeHaven</h2>
            <p>Reach Out for Support or Volunteer Opportunities.</p>
          </div>
        </div>

        <div>
          <iframe 
            title="Location Map"
            style={{border:0, width: '100%', height: '350px'}}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5190.924291390076!2d76.84764116441497!3d23.07740197633518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ce9ceaaaaaaab%3A0xa224b6b82b421f83!2sVIT%20Bhopal%20University!5e0!3m2!1sen!2sin!4v1703955301281!5m2!1sen!2sin"
            allowFullScreen
          ></iframe>
        </div>

        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Location:</h4>
                  <p>Kotri Kalan, Bhopal, Madhya Pradesh, India 466114</p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>contact@HeHaven.com</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Call:</h4>
                  <p>+1 5589 55488 55s</p>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">
              <form className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>HeHaven</h3>
                <p>
                  Kotri Kalan, Bhopal<br />
                  Madhya Pradesh 466114<br />
                  India <br /><br />
                  <strong>Phone:</strong> +91 82545 67825<br />
                  <strong>Email:</strong> contact@HeHaven.com<br />
                </p>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <a href="#hero">Home</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#about">About us</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#appointment">Appointment</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Services</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Anonymous Chat Support</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Mental Health Resources Hub</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Weekly Support Emails</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Virtual Support Groups</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Self-Care Workshops</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#services">Meditation Sessions</a></li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>Join our newsletter to get daily updates.</p>
                <form>
                  <input type="email" name="email" placeholder="Your Email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default HeHaven;