import React, { useState } from 'react';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";


const countries = [
    { name: "Afghanistan", code: "AF", phone: 93 },
    { name: "Aland Islands", code: "AX", phone: 358 },
    { name: "Albania", code: "AL", phone: 355 },
    { name: "Algeria", code: "DZ", phone: 213 },
    { name: "American Samoa", code: "AS", phone: 1684 },
    { name: "Andorra", code: "AD", phone: 376 },
    { name: "Angola", code: "AO", phone: 244 },
    { name: "Anguilla", code: "AI", phone: 1264 },
    { name: "Antarctica", code: "AQ", phone: 672 },
    { name: "Antigua and Barbuda", code: "AG", phone: 1268 },
    { name: "Argentina", code: "AR", phone: 54 },
    { name: "Armenia", code: "AM", phone: 374 },
    { name: "Aruba", code: "AW", phone: 297 },
    { name: "Australia", code: "AU", phone: 61 },
    { name: "Austria", code: "AT", phone: 43 },
    { name: "Azerbaijan", code: "AZ", phone: 994 },
    { name: "Bahamas", code: "BS", phone: 1242 },
    { name: "Bahrain", code: "BH", phone: 973 },
    { name: "Bangladesh", code: "BD", phone: 880 },
    { name: "Barbados", code: "BB", phone: 1246 },
    { name: "Belarus", code: "BY", phone: 375 },
    { name: "Belgium", code: "BE", phone: 32 },
    { name: "Belize", code: "BZ", phone: 501 },
    { name: "Benin", code: "BJ", phone: 229 },
    { name: "Bermuda", code: "BM", phone: 1441 },
    { name: "Bhutan", code: "BT", phone: 975 },
    { name: "Bolivia", code: "BO", phone: 591 },
    { name: "Bonaire, Sint Eustatius and Saba", code: "BQ", phone: 599 },
    { name: "Bosnia and Herzegovina", code: "BA", phone: 387 },
    { name: "Botswana", code: "BW", phone: 267 },
    { name: "Bouvet Island", code: "BV", phone: 55 },
    { name: "Brazil", code: "BR", phone: 55 },
    { name: "British Indian Ocean Territory", code: "IO", phone: 246 },
    { name: "Brunei Darussalam", code: "BN", phone: 673 },
    { name: "Bulgaria", code: "BG", phone: 359 },
    { name: "Burkina Faso", code: "BF", phone: 226 },
    { name: "Burundi", code: "BI", phone: 257 },
    { name: "Cambodia", code: "KH", phone: 855 },
    { name: "Cameroon", code: "CM", phone: 237 },
    { name: "Canada", code: "CA", phone: 1 },
    { name: "Cape Verde", code: "CV", phone: 238 },
    { name: "Cayman Islands", code: "KY", phone: 1345 },
    { name: "Central African Republic", code: "CF", phone: 236 },
    { name: "Chad", code: "TD", phone: 235 },
    { name: "Chile", code: "CL", phone: 56 },
    { name: "China", code: "CN", phone: 86 },
    { name: "Christmas Island", code: "CX", phone: 61 },
    { name: "Cocos (Keeling) Islands", code: "CC", phone: 672 },
    { name: "Colombia", code: "CO", phone: 57 },
    { name: "Comoros", code: "KM", phone: 269 },
    { name: "Congo", code: "CG", phone: 242 },
    { name: "Congo, Democratic Republic of the Congo", code: "CD", phone: 242 },
    { name: "Cook Islands", code: "CK", phone: 682 },
    { name: "Costa Rica", code: "CR", phone: 506 },
    { name: "Cote D'Ivoire", code: "CI", phone: 225 },
    { name: "Croatia", code: "HR", phone: 385 },
    { name: "Cuba", code: "CU", phone: 53 },
    { name: "Curacao", code: "CW", phone: 599 },
    { name: "Cyprus", code: "CY", phone: 357 },
    { name: "Czech Republic", code: "CZ", phone: 420 },
    { name: "Denmark", code: "DK", phone: 45 },
    { name: "Djibouti", code: "DJ", phone: 253 },
    { name: "Dominica", code: "DM", phone: 1767 },
    { name: "Dominican Republic", code: "DO", phone: 1809 },
    { name: "Ecuador", code: "EC", phone: 593 },
    { name: "Egypt", code: "EG", phone: 20 },
    { name: "El Salvador", code: "SV", phone: 503 },
    { name: "Equatorial Guinea", code: "GQ", phone: 240 },
    { name: "Eritrea", code: "ER", phone: 291 },
    { name: "Estonia", code: "EE", phone: 372 },
    { name: "Ethiopia", code: "ET", phone: 251 },
    { name: "Falkland Islands (Malvinas)", code: "FK", phone: 500 },
    { name: "Faroe Islands", code: "FO", phone: 298 },
    { name: "Fiji", code: "FJ", phone: 679 },
    { name: "Finland", code: "FI", phone: 358 },
    { name: "France", code: "FR", phone: 33 },
    { name: "French Guiana", code: "GF", phone: 594 },
    { name: "French Polynesia", code: "PF", phone: 689 },
    { name: "French Southern Territories", code: "TF", phone: 262 },
    { name: "Gabon", code: "GA", phone: 241 },
    { name: "Gambia", code: "GM", phone: 220 },
    { name: "Georgia", code: "GE", phone: 995 },
    { name: "Germany", code: "DE", phone: 49 },
    { name: "Ghana", code: "GH", phone: 233 },
    { name: "Gibraltar", code: "GI", phone: 350 },
    { name: "Greece", code: "GR", phone: 30 },
    { name: "Greenland", code: "GL", phone: 299 },
    { name: "Grenada", code: "GD", phone: 1473 },
    { name: "Guadeloupe", code: "GP", phone: 590 },
    { name: "Guam", code: "GU", phone: 1671 },
    { name: "Guatemala", code: "GT", phone: 502 },
    { name: "Guernsey", code: "GG", phone: 44 },
    { name: "Guinea", code: "GN", phone: 224 },
    { name: "Guinea-Bissau", code: "GW", phone: 245 },
    { name: "Guyana", code: "GY", phone: 592 },
    { name: "Haiti", code: "HT", phone: 509 },
    { name: "Heard Island and McDonald Islands", code: "HM", phone: 0 },
    { name: "Holy See (Vatican City State)", code: "VA", phone: 39 },
    { name: "Honduras", code: "HN", phone: 504 },
    { name: "Hong Kong", code: "HK", phone: 852 },
    { name: "Hungary", code: "HU", phone: 36 },
    { name: "Iceland", code: "IS", phone: 354 },
    { name: "India", code: "IN", phone: 91 },
    { name: "Indonesia", code: "ID", phone: 62 },
    { name: "Iran, Islamic Republic of", code: "IR", phone: 98 },
    { name: "Iraq", code: "IQ", phone: 964 },
    { name: "Ireland", code: "IE", phone: 353 },
    { name: "Isle of Man", code: "IM", phone: 44 },
    { name: "Israel", code: "IL", phone: 972 },
    { name: "Italy", code: "IT", phone: 39 },
    { name: "Jamaica", code: "JM", phone: 1876 },
    { name: "Japan", code: "JP", phone: 81 },
    { name: "Jersey", code: "JE", phone: 44 },
    { name: "Jordan", code: "JO", phone: 962 },
    { name: "Kazakhstan", code: "KZ", phone: 7 },
    { name: "Kenya", code: "KE", phone: 254 },
    { name: "Kiribati", code: "KI", phone: 686 },
    { name: "Korea, Democratic People's Republic of", code: "KP", phone: 850 },
    { name: "Korea, Republic of", code: "KR", phone: 82 },
    { name: "Kosovo", code: "XK", phone: 383 },
    { name: "Kuwait", code: "KW", phone: 965 },
    { name: "Kyrgyzstan", code: "KG", phone: 996 },
    { name: "Lao People's Democratic Republic", code: "LA", phone: 856 },
    { name: "Latvia", code: "LV", phone: 371 },
    { name: "Lebanon", code: "LB", phone: 961 },
    { name: "Lesotho", code: "LS", phone: 266 },
    { name: "Liberia", code: "LR", phone: 231 },
    { name: "Libyan Arab Jamahiriya", code: "LY", phone: 218 },
    { name: "Liechtenstein", code: "LI", phone: 423 },
    { name: "Lithuania", code: "LT", phone: 370 },
    { name: "Luxembourg", code: "LU", phone: 352 },
    { name: "Macao", code: "MO", phone: 853 },
    { name: "Macedonia, the Former Yugoslav Republic of", code: "MK", phone: 389 },
    { name: "Madagascar", code: "MG", phone: 261 },
    { name: "Malawi", code: "MW", phone: 265 },
    { name: "Malaysia", code: "MY", phone: 60 },
    { name: "Maldives", code: "MV", phone: 960 },
    { name: "Mali", code: "ML", phone: 223 },
    { name: "Malta", code: "MT", phone: 356 },
    { name: "Marshall Islands", code: "MH", phone: 692 },
    { name: "Martinique", code: "MQ", phone: 596 },
    { name: "Mauritania", code: "MR", phone: 222 },
    { name: "Mauritius", code: "MU", phone: 230 },
    { name: "Mayotte", code: "YT", phone: 262 },
    { name: "Mexico", code: "MX", phone: 52 },
    { name: "Micronesia, Federated States of", code: "FM", phone: 691 },
    { name: "Moldova, Republic of", code: "MD", phone: 373 },
    { name: "Monaco", code: "MC", phone: 377 },
    { name: "Mongolia", code: "MN", phone: 976 },
    { name: "Montenegro", code: "ME", phone: 382 },
    { name: "Montserrat", code: "MS", phone: 1664 },
    { name: "Morocco", code: "MA", phone: 212 },
    { name: "Mozambique", code: "MZ", phone: 258 },
    { name: "Myanmar", code: "MM", phone: 95 },
    { name: "Namibia", code: "NA", phone: 264 },
    { name: "Nauru", code: "NR", phone: 674 },
    { name: "Nepal", code: "NP", phone: 977 },
    { name: "Netherlands", code: "NL", phone: 31 },
    { name: "Netherlands Antilles", code: "AN", phone: 599 },
    { name: "New Caledonia", code: "NC", phone: 687 },
    { name: "New Zealand", code: "NZ", phone: 64 },
    { name: "Nicaragua", code: "NI", phone: 505 },
    { name: "Niger", code: "NE", phone: 227 },
    { name: "Nigeria", code: "NG", phone: 234 },
    { name: "Niue", code: "NU", phone: 683 },
    { name: "Norfolk Island", code: "NF", phone: 672 },
    { name: "Northern Mariana Islands", code: "MP", phone: 1670 },
    { name: "Norway", code: "NO", phone: 47 },
    { name: "Oman", code: "OM", phone: 968 },
    { name: "Pakistan", code: "PK", phone: 92 },
    { name: "Palau", code: "PW", phone: 680 },
    { name: "Palestinian Territory, Occupied", code: "PS", phone: 970 },
    { name: "Panama", code: "PA", phone: 507 },
    { name: "Papua New Guinea", code: "PG", phone: 675 },
    { name: "Paraguay", code: "PY", phone: 595 },
    { name: "Peru", code: "PE", phone: 51 },
    { name: "Philippines", code: "PH", phone: 63 },
    { name: "Pitcairn", code: "PN", phone: 64 },
    { name: "Poland", code: "PL", phone: 48 },
    { name: "Portugal", code: "PT", phone: 351 },
    { name: "Puerto Rico", code: "PR", phone: 1787 },
    { name: "Qatar", code: "QA", phone: 974 },
    { name: "Reunion", code: "RE", phone: 262 },
    { name: "Romania", code: "RO", phone: 40 },
    { name: "Russian Federation", code: "RU", phone: 7 },
    { name: "Rwanda", code: "RW", phone: 250 },
    { name: "Saint Barthelemy", code: "BL", phone: 590 },
    { name: "Saint Helena", code: "SH", phone: 290 },
    { name: "Saint Kitts and Nevis", code: "KN", phone: 1869 },
    { name: "Saint Lucia", code: "LC", phone: 1758 },
    { name: "Saint Martin", code: "MF", phone: 590 },
    { name: "Saint Pierre and Miquelon", code: "PM", phone: 508 },
    { name: "Saint Vincent and the Grenadines", code: "VC", phone: 1784 },
    { name: "Samoa", code: "WS", phone: 684 },
    { name: "San Marino", code: "SM", phone: 378 },
    { name: "Sao Tome and Principe", code: "ST", phone: 239 },
    { name: "Saudi Arabia", code: "SA", phone: 966 },
    { name: "Senegal", code: "SN", phone: 221 },
    { name: "Serbia", code: "RS", phone: 381 },
    { name: "Serbia and Montenegro", code: "CS", phone: 381 },
    { name: "Seychelles", code: "SC", phone: 248 },
    { name: "Sierra Leone", code: "SL", phone: 232 },
    { name: "Singapore", code: "SG", phone: 65 },
    { name: "St Martin", code: "SX", phone: 721 },
    { name: "Slovakia", code: "SK", phone: 421 },
    { name: "Slovenia", code: "SI", phone: 386 },
    { name: "Solomon Islands", code: "SB", phone: 677 },
    { name: "Somalia", code: "SO", phone: 252 },
    { name: "South Africa", code: "ZA", phone: 27 },
    { name: "South Georgia and the South Sandwich Islands", code: "GS", phone: 500 },
    { name: "South Sudan", code: "SS", phone: 211 },
    { name: "Spain", code: "ES", phone: 34 },
    { name: "Sri Lanka", code: "LK", phone: 94 },
    { name: "Sudan", code: "SD", phone: 249 },
    { name: "Suriname", code: "SR", phone: 597 },
    { name: "Svalbard and Jan Mayen", code: "SJ", phone: 47 },
    { name: "Swaziland", code: "SZ", phone: 268 },
    { name: "Sweden", code: "SE", phone: 46 },
    { name: "Switzerland", code: "CH", phone: 41 },
    { name: "Syrian Arab Republic", code: "SY", phone: 963 },
    { name: "Taiwan, Province of China", code: "TW", phone: 886 },
    { name: "Tajikistan", code: "TJ", phone: 992 },
    { name: "Tanzania, United Republic of", code: "TZ", phone: 255 },
    { name: "Thailand", code: "TH", phone: 66 },
    { name: "Timor-Leste", code: "TL", phone: 670 },
    { name: "Togo", code: "TG", phone: 228 },
    { name: "Tokelau", code: "TK", phone: 690 },
    { name: "Tonga", code: "TO", phone: 676 },
    { name: "Trinidad and Tobago", code: "TT", phone: 1868 },
    { name: "Tunisia", code: "TN", phone: 216 },
    { name: "Turkey", code: "TR", phone: 90 },
    { name: "Turkmenistan", code: "TM", phone: 7370 },
    { name: "Turks and Caicos Islands", code: "TC", phone: 1649 },
    { name: "Tuvalu", code: "TV", phone: 688 },
    { name: "Uganda", code: "UG", phone: 256 },
    { name: "Ukraine", code: "UA", phone: 380 },
    { name: "United Arab Emirates", code: "AE", phone: 971 },
    { name: "United Kingdom", code: "GB", phone: 44 },
    { name: "United States", code: "US", phone: 1 },
    { name: "United States Minor Outlying Islands", code: "UM", phone: 1 },
    { name: "Uruguay", code: "UY", phone: 598 },
    { name: "Uzbekistan", code: "UZ", phone: 998 },
    { name: "Vanuatu", code: "VU", phone: 678 },
    { name: "Venezuela", code: "VE", phone: 58 },
    { name: "Viet Nam", code: "VN", phone: 84 },
    { name: "Virgin Islands, British", code: "VG", phone: 1284 },
    { name: "Virgin Islands, U.s.", code: "VI", phone: 1340 },
    { name: "Wallis and Futuna", code: "WF", phone: 681 },
    { name: "Western Sahara", code: "EH", phone: 212 },
    { name: "Yemen", code: "YE", phone: 967 },
    { name: "Zambia", code: "ZM", phone: 260 },
    { name: "Zimbabwe", code: "ZW", phone: 263 }
]


const SignUpForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [phone, setPhone] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        yourPosition: '',
        saleBefore: '',
        wantFirst: '',
        companyName: '',
        noOfEmployees: '',
        selectCompanyType: '',
        employeeWillUse: '',
        address: '',
        postalCode: '',
        country: '',
    });


    const [selectedCountryPhone, setSelectedCountryPhone] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber" && e.target.tagName === "SELECT") {
            const selectedIndex = e.target.selectedIndex;
            const option = e.target.options[selectedIndex];
            const countryName = option.getAttribute('data-country-name');
            setSelectedCountryPhone(value);
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const [selectedCountry, setSelectedCountry] = useState({ code: '+44', phone: '44' });

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setFormData({ ...formData, phoneNumber: `+${country.phone}` });
    };


    const validateStep = (step) => {
        let isValid = true;
        const requiredFields = document.querySelectorAll(`#step-${step} input[required], #step-${step} select[required]`);
        requiredFields.forEach((field) => {
            if (!field.value) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            toast.warning('Please fill in all required fields.');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log('Form Data:', formData); // Log form data for debugging

    //     try {
    //         const response = await fetch('https://infinitisuiteapi.vercel.app/api/v1/signup', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             if (data.error && data.error.includes('duplicate key error')) {
    //                 toast.error('This email is already registered. Please use a different email.');
    //             } else {
    //                 throw new Error('Network response was not ok');
    //             }
    //         } else {
    //             console.log('Success:', data);
    //             toast.success('Account created successfully!');

    //             event.target.reset(); // Reset form fields
    //             // Optionally, redirect to another page
    //             // window.location.href = 'http://localhost:3001/gmail';
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         toast.error('This email is already registered. Please use a different email.');
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form Data:', formData); // Log form data for debugging

        // Prepare data for each API endpoint
        // Prepare data for each API endpoint using FormData
        const formDataObject = new FormData();
        formDataObject.append('orgname', formData.companyName);
        formDataObject.append('postalcode', '676yz');
        formDataObject.append('street', '2');
        formDataObject.append('city', 'karachi');
        formDataObject.append('email', formData.email);
        formDataObject.append('password', formData.password);

        const universalLanguageData = {
            name: formData.name,
            password: formData.password,
            email: formData.email,
            userType: "owner",
            timezone: "5",
            timezoneOffset: "Asia/Karachi",
            company: formData.companyName
        };

        const clickhrData = new FormData();
        clickhrData.append('company', formData.companyName);
        clickhrData.append('com_email', formData.email);
        clickhrData.append('com_number', formData.phoneNumber);
        clickhrData.append('num', formData.phoneNumber);
        clickhrData.append('email', formData.email);
        clickhrData.append('com_web', 'sstrack.io');
        clickhrData.append('nemp', formData.noOfEmployees);
        clickhrData.append('fname', formData.name);
        clickhrData.append('lname', formData.name);
        clickhrData.append('com_address', formData.address);
        clickhrData.append('password', formData.password)


        try {
            const response = await fetch('https://infinitisuiteapi.vercel.app/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error && data.error.includes('duplicate key error')) {
                    toast.error('This email is already registered. Please use a different email.');
                } else {
                    console.log(data, 'signup infiniti suite response was not ok');
                }
            } else {
                console.log('Success infiniti suite:', data);
                // toast.success('Account created successfully!');
                // event.target.reset(); // Reset form fields
            }

            // Send data to the first API
            const response1 = await fetch('https://verdebooks-backend.vercel.app/api/addOrganization', {
                method: 'POST',
                body: formDataObject, // Send FormData directly
            });

            const data1 = await response1.json();

            if (!response1.ok) {
                if (data1.error && data1.error.includes('duplicate key error')) {
                    toast.error('verdebooks Organization data error: ' + data1.error);
                } else {
                    console.log(data1, 'verdebooks Organization response was not ok for addOrganization API');
                }
            } else {
                console.log('Success (addOrganization) verdebooks:', data1);
                // toast.success('Account created successfully!');

            }

            // Send data to the second API
            const response2 = await fetch('https://ss-track-xi.vercel.app/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(universalLanguageData),
            });

            const data2 = await response2.json();

            if (!response2.ok) {
                if (data2.error && data2.error.includes('duplicate key error')) {
                    toast.error('User signup sstrack error: ' + data2.error);
                } else {
                    console.log(data2, 'User signup sstrack response was not ok for signup API');
                }
            } else {
                console.log('Success sstrack (signup):', data2);
                // toast.success('Account created successfully!');
                // event.target.reset(); // Reset form fields
                // Optionally, redirect to another page
                // window.location.href = 'http://localhost:3001/gmail';
            }
            // Send data to the second API
            const response3 = await fetch('https://click-hr.vercel.app/addorg', {
                method: 'POST',
                body: clickhrData // Convert the data to JSON string
            });

            const data3 = await response3.json();

            if (!response3.ok) {
                event.target.reset(); // Reset form fields

                if (data3.error && data3.error.includes('duplicate key error')) {
                    toast.error('User signup clickhr error: ' + data3.error);
                } else {
                    console.log(data3, 'User signup clickhr response was not ok for signup API');
                }
            } else {
                console.log('Success clickhr (signup):', data3);
                // toast.success('Account created successfully!');
                event.target.reset(); // Reset form fields
                // Optionally, redirect to another page
                // window.location.href = 'http://localhost:3001/gmail';
            }
            if (response.ok && response1.ok && response2.ok && response3.ok) {
                toast.success('Account created successfully!');
            }
            else {
                toast.error('An error occurred. Please try again.');

            }

        } catch (error) {
            event.target.reset(); // Reset form fields

            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }

    };

    const { country, setRegion } = useState([]);

    return (


        <>
            <Header />
            <ToastContainer /> {/* Add this line to display toasts */}
            <section className="ud-page-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-banner-content">
                                <span style={{ color: '#ddd' }}>Infiniti Suite</span>
                                <h1>Create Account</h1>
                                <p style={{ color: '#ddd' }}>
                                    Fill in the details below to create an account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="ud-contact">
                <div className="container">
                    <div className="signpwrapper" style={{ width: '40%', display: 'block', margin: '0 auto' }}>
                        <div className="ud-contact-content-wrapper wow fadeInUp" data-wow-delay=".2s">
                            <div className="step-indicator">
                                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}></div>
                                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}></div>
                                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}></div>
                            </div>
                            <ul id="progressbarahad" className="progressbarahad">
                                <li className={currentStep >= 1 ? 'active' : ''} id="account"><strong>Account</strong></li>
                                <li className={currentStep >= 2 ? 'active' : ''} id="personal"><strong>About You</strong></li>
                                <li className={currentStep >= 3 ? 'active' : ''} id="payment"><strong>Company</strong></li>
                                <li id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <br /><br /><br />
                            <div class="ud-banner-content">
                                <h1 style={{ color: "#3056d3" }}>Let's Get Started</h1>
                                <p style={{ color: "#050505" }}>First You'll need to create the Account.</p>
                            </div>
                            <form id="signup-form" onSubmit={handleSubmit}>
                                {currentStep === 1 && (
                                    <div className="form-container active" id="step-1">
                                        <div className="form-group">
                                            <label htmlFor="name">Your Name:</label>
                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Your Work Email:</label>
                                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Set a Password:</label>
                                            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                        </div>
                                        {/* <div className="form-group">
                                            <div className="select-box">
                                                <label for="tel">Phone Number:</label>
                                                <div className="selected-option">
                                                    <select id="country" name="phoneNumber" value={formData.country.phone} onChange={handleInputChange} required style={{ width: '20%' }}>
                                                        {countries.map(country => (
                                                            <option key={country.code} value={country.phone} data-country-name={country.name}>
                                                                {country.name} (+{country.phone})
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input type="phone" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required style={{ width: '80%' }} />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group">
                                            <div className="select-box">
                                                <label for="tel">Phone Number:</label>
                                                <div className="selected-option">
                                                    <select id="country" name="phoneNumber" value={formData.country.phone} onChange={handleInputChange} required style={{ width: '50%' }}>
                                                        {countries.map(country => (
                                                            <option key={country.code} value={country.phone}>
                                                                (+{country.phone})
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input type="phone" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required style={{ width: '80%' }} />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group">
                                            <div className="select-box">
                                                <label for="tel">Phone Number:</label>
                                                <div className="selected-option">
                                                    <select id="country" name="phoneNumber" value={formData.country.phone} onChange={handleInputChange} required style={{ width: '15%' }}>
                                                        {countries.map(country => (
                                                            <option key={country.code} value={country.phone} data-name={country.name}>
                                                                (+{country.phone})
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <input type="phone" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required style={{ width: '85%' }} />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="form-group">
                                            <div class="select-box">
                                                <label for="tel">Phone Number:</label>
                                                <div class="selected-option">
                                                    <div class="ahad-custom-mobile">
                                                <span class="iconify" data-icon="flag:gb-4x3"></span>
                                                        <strong>+44</strong>
                                                    </div>
                                                    <input type="tel" name="tel" placeholder="Phone Number" />
                                                </div>
                                                <div class="options">
                                                    <input type="text" class="search-box" placeholder="Search Country Name" />
                                                        <ol>
                                                        </ol>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="password">Set a Password:</label>
                                            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="tel">Phone Number:</label>
                                            <div style={{ display: 'flex' }}>
                                                <PhoneInput
                                                    country={"eg"}
                                                    enableSearch={true}
                                                    value={phone}
                                                    onChange={(phone) => setPhone(phone)}
                                                    containerStyle={{ flex: 2 }}
                                                    inputStyle={{ padding: '10px', fontSize: '16px', width: '100%' }}
                                                />

                                            </div>
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="tel">Phone Number:</label>
                                            <div style={{ display: 'flex' }}>
                                                <PhoneInput
                                                    country={"eg"}
                                                    enableSearch={true}
                                                    value={phone}
                                                    onChange={(phone) => setPhone(phone)}
                                                    containerStyle={{ flex: 1 }}
                                                    inputStyle={{ fontSize: '16px', padding: '10px', width: '230%' }}
                                                />

                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    style={{ fontSize: '16px', padding: '10px', width: '230%', marginLeft: 20 }}
                                                />

                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="tel">Phone Number:</label>
                                            <div style={{ display: 'flex' }}>
                                                <PhoneInput
                                                    country={"eg"}
                                                    enableSearch={true}
                                                    value={phone}
                                                    onChange={(phone) => setPhone(phone)}
                                                    containerStyle={{ flex: 0 }}
                                                    inputStyle={{ fontSize: '16px', width: '90%' }}
                                                />

                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    style={{ padding: '10px', fontSize: '16px', width: '100%' }}
                                                />
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label htmlFor="tel">Phone Number:</label>
                                            <div style={{ display: 'flex' }}>
                                                <PhoneInput
                                                    country={"eg"}
                                                    enableSearch={true}
                                                    value={phone}
                                                    onChange={(phone) => setPhone(phone)}
                                                    containerStyle={{ flex: 1 }}
                                                    inputStyle={{ padding: '10px', fontSize: '16px', width: '100%' }}
                                                />
                                                <div style={{ marginLeft: 10, flex: 1 }}>
                                                    <img
                                                        src={`https://flagcdn.com/16x12/${phone?.countryCode?.toLowerCase()}.png`}
                                                        alt={phone?.countryCode}
                                                        style={{ width: 20, height: 15 }}
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label htmlFor="tel">Phone Number:</label>
                                            <div style={{ display: 'flex' }}>
                                                <PhoneInput
                                                    country={"eg"}
                                                    enableSearch={true}
                                                    value={phone}
                                                    onChange={(phone) => setPhone(phone)}
                                                    containerStyle={{ flex: 1 }}
                                                    inputStyle={{ padding: '10px', fontSize: '16px', width: '100%' }}
                                                    flags={{ EG: '🇪🇬' }}
                                                />

                                            </div>
                                        </div> */}
                                        <div className="nav-buttons">
                                            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="form-container active" id="step-2">
                                        <div className="form-group">
                                            <label htmlFor="yourPosition">Your Position:</label>
                                            <input type="text" id="yourPosition" name="yourPosition" value={formData.yourPosition} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="saleBefore">Have you used any sales tool before:</label>
                                            <input type="text" id="saleBefore" name="saleBefore" value={formData.saleBefore} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="wantFirst">What do you want to do first:</label>
                                            <select id="wantFirst" name="wantFirst" value={formData.wantFirst} onChange={handleInputChange} required>
                                                <option value="Close deals faster">Close deals faster</option>
                                                <option value="Find new leads">Find new leads</option>
                                                <option value="Manage relationships better">Manage relationships better</option>
                                                <option value="Set goals and track progress">Set goals and track progress</option>
                                                <option value="Set up a team and permissions">Set up a team and permissions</option>
                                            </select>
                                        </div>
                                        <div className="nav-buttons">
                                            <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>
                                            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                        </div>
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div className="form-container active" id="step-3">
                                        <div className="form-group">
                                            <label htmlFor="companyName">Company Name:</label>
                                            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="noOfEmployees">Number of Employees:</label>
                                            <select id="noOfEmployees" name="noOfEmployees" value={formData.noOfEmployees} onChange={handleInputChange} required>
                                                <option value="10-50">10-50</option>
                                                <option value="50-100">50-100</option>
                                                <option value="100-200">100-200</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="selectCompanyType">Select Company Type:</label>
                                            <select id="selectCompanyType" name="selectCompanyType" value={formData.selectCompanyType} onChange={handleInputChange} required>
                                                <option value="technology-startup">Technology Startup</option>
                                                <option value="ecommerce-business">E-commerce Business</option>
                                                <option value="manufacturing-company">Manufacturing Company</option>
                                                <option value="consulting-firm">Consulting Firm</option>
                                                <option value="healthcare-services">Healthcare Services</option>
                                                <option value="financial-services">Financial Services</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="employeeWillUse">Number of Employees who will use Infiniti Suite:</label>
                                            <select id="employeeWillUse" name="employeeWillUse" value={formData.employeeWillUse} onChange={handleInputChange} required>
                                                <option value="1-10">1-10</option>
                                                <option value="10-50">10-50</option>
                                                <option value="50-100">50-100</option>
                                            </select>
                                        </div>
                                        <div className="nav-buttons">
                                            <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>
                                            {/* <Link to='/login'> */}
                                            <button type="submit" className="submit-btn">Submit</button>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SignUpForm;
