import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';


function RefundPolicy() {
  

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
                    <h1>Refund Policy</h1>
                    <h3>Introduction</h3>
                    <p>At Infiniti Suite, we strive to provide high-quality software and services. If for any reason you are not satisfied with your purchase, we offer a straightforward refund policy to ensure your satisfaction.</p>
                    <h2>Eligibility for Refunds</h2>
                    <p><strong>Software Products:</strong> Refunds for software products are available within 30 days of purchase. To be eligible for a refund, you must provide proof of purchase and explain the reason for your dissatisfaction.</p>
                    <p><strong>Services:</strong> Refunds for services such as consulting, training, or customization are considered on a case-by-case basis. Please contact our support team to discuss your specific situation.</p>
                    <h2>Non-Refundable Items</h2>
                    <p>The following items are non-refundable:</p>
         
                        <li>Products purchased at a discounted rate or during a promotional period.</li>
                        <li>Services that have been fully delivered or completed.</li>
                        <li>Any third-party products or services integrated with Infiniti Suite.</li>
          
                    <h2 className='mt-3'>How to Request a Refund</h2>
                    <p>To request a refund, please follow these steps:</p>
                    <li>Contact our support team at <a href="mailto:support@infinitisuite.com">support@infinitisuite.com</a></li>
                    <li>Provide your order details, including your name, purchase date, and order number </li>
                    <li>Explain the reason for your refund request.</li>
                    <li>Our support team will review your request and respond within 5 business days.</li>
                    <h2 className='mt-3'>Processing Refunds</h2>
                    <p>If your refund request is approved, the following process will be followed:</p>
                    <li>Refunds will be processed to the original payment method within 10 business days.</li>
                    <li>You will receive a confirmation email once the refund has been issued.</li>
                    <h2 className='mt-3'>Contact Us</h2>
                    <p>If you have any questions or concerns about our refund policy, please contact our support team:</p>
                    <p><strong>Infiniti Suite Support Team</strong><br />
                        Email: <a href="mailto:support@infinitisuite.com">support@infinitisuite.com</a></p>
                    <p>We are committed to providing excellent customer service and ensuring your satisfaction with Infiniti Suite.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RefundPolicy;