import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';


function Privacy() {


    return (
        <>
            <Header />

            <section class="ud-page-banner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="ud-banner-content">
                                <h1>Refund Policy</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='container'>
                <div className="container m-3">
                    <h1>Privacy Policy</h1>

                    <h2>Introduction</h2>
                    <p>Welcome to the Infiniti Suite Privacy Policy page. Your privacy is of utmost importance to us. This policy outlines how we collect, use, and protect your personal information when you use our software products and services.</p>

                    <h2>Information We Collect</h2>
                    <p><strong>Personal Information:</strong> When you register for our services, we may collect personal information such as your name, email address, phone number, and company details.</p>
                    <p><strong>Usage Data:</strong> We collect information on how you interact with our software, including features used, pages visited, and actions taken.</p>
                    <p><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience on our site and gather analytical data.</p>

                    <h2>How We Use Your Information</h2>
                    <p><strong>To Provide Services:</strong> We use your personal information to deliver, maintain, and improve our software and services.</p>
                    <p><strong>To Communicate:</strong> We may use your contact information to send you updates, support, and administrative messages.</p>
                    <p><strong>To Improve Our Products:</strong> Usage data helps us understand how our products are used, allowing us to enhance and develop new features.</p>

                    <h2>Information Sharing and Disclosure</h2>
                    <p><strong>With Your Consent:</strong> We will share your information with third parties when we have your consent to do so.</p>
                    <p><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our services, provided they adhere to strict confidentiality obligations.</p>
                    <p><strong>Legal Requirements:</strong> We may disclose your information if required by law or to protect the rights and safety of our company, our users, and others.</p>

                    <h2>Data Security</h2>
                    <p>We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.</p>

                    <h2>Your Rights</h2>
                    <p><strong>Access and Update:</strong> You have the right to access and update your personal information at any time.</p>
                    <p><strong>Delete:</strong> You can request the deletion of your personal information, subject to certain legal obligations.</p>
                    <p><strong>Opt-Out:</strong> You may opt out of receiving promotional communications from us by following the instructions in those messages.</p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on our website and, where appropriate, notify you via email.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                    <p><strong>Infiniti Suite Support Team</strong><br />
                        Email: <a href="mailto:support@infinitisuite.com">support@infinitisuite.com</a><br /></p>

                        <p>Thank you for trusting Infiniti Suite with your personal information. We are committed to ensuring your privacy and security.</p>
                    </div>
                </div>
                <Footer />
            </>
            );
}

            export default Privacy;