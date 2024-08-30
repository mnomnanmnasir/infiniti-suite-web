import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';


function Terms() {


    return (
        <>
            <Header />

            <section class="ud-page-banner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="ud-banner-content">
                                <h1>Terms of Services</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='container'>
                <div className="container m-3">
                    <h1>Terms of Services</h1>

                    <h2>Introduction</h2>
                    <p>Welcome to Infiniti Suite. These Terms of Services ("Terms") govern your use of our software products and services. By using our services, you agree to these Terms. If you do not agree, please do not use our services.</p>

                    <h2>Use of Services</h2>
                    <p><strong>Eligibility:</strong> You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this requirement.</p>
                    <p><strong>Account Registration:</strong> You may need to create an account to access certain features of our services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

                    <h2>User Responsibilities</h2>
                    <p><strong>Compliance:</strong> You agree to use our services in compliance with all applicable laws and regulations.</p>
                    <p><strong>Prohibited Activities:</strong> You agree not to engage in any activity that interferes with or disrupts our services, or that violates these Terms.</p>

                    <h2>Intellectual Property</h2>
                    <p><strong>Ownership:</strong> All intellectual property rights in our software and services are owned by Infiniti Suite or its licensors. You are granted a limited, non-exclusive, non-transferable license to use our services in accordance with these Terms.</p>
                    <p><strong>Restrictions:</strong> You may not copy, modify, distribute, sell, or lease any part of our services or software, nor may you reverse engineer or attempt to extract the source code of our software.</p>

                    <h2>Termination</h2>
                    <p>We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use our services will immediately cease.</p>

                    <h2>Disclaimer of Warranties</h2>
                    <p>Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>

                    <h2>Limitation of Liability</h2>
                    <p>In no event shall Infiniti Suite, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use our services; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from our services; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any third party; (v) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the services; and/or (vi) the defamatory, offensive, or illegal conduct of any third party.</p>

                    <h2>Changes to Terms</h2>
                    <p>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website. You are advised to review these Terms periodically for any changes. Your continued use of the services after any modifications to the Terms will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Terms.</p>

                    <h2>Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Infiniti Suite operates, without regard to its conflict of law provisions.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p><strong>Infiniti Suite Support Team</strong><br />
                        Email: <a href="mailto:support@infinitisuite.com">support@infinitisuite.com</a><br /></p>

                </div>
            </div>
            <Footer />
        </>
    );
}


export default Terms;