import React, { useState, useEffect } from 'react';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TimezoneSelect from 'react-timezone-select';


const countries = [
    { name: 'Afghanistan', code: 'AF', phone: 93 },
    { name: 'Aland Islands', code: 'AX', phone: 358 },
    { name: 'Albania', code: 'AL', phone: 355 },
    { name: 'Algeria', code: 'DZ', phone: 213 },
    { name: 'American Samoa', code: 'AS', phone: 1684 },
    // ...add all countries
];

const SignUpForm = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const optionsList = countries.map((country) => (
            <li key={country.code} className="option">
                <div>
                    <span className="iconify" data-icon={`flag:${country.code.toLowerCase()}-4x3`} />
                    <span className="country-name">{country.name}</span>
                </div>
                <strong>+{country.phone}</strong>
            </li>
        ));
        setOptions(optionsList);
    }, []);

    const handleSelectOption = (option) => {
        setSelectedCountry(option);
        setSearchQuery('');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const filteredOptions = options.filter((option) => {
            const countryName = option.querySelector('.country-name').innerText.toLowerCase();
            return countryName.includes(e.target.value.toLowerCase());
        });
        setOptions(filteredOptions);
    };
    const [currentStep, setCurrentStep] = useState(1);
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     phoneNumber: '',
    //     yourPosition: '',
    //     saleBefore: '',
    //     wantFirst: '',
    //     companyName: '',
    //     noOfEmployess: '',
    //     selectCompanyType: '',
    //     employeeWillUse: '',
    //     address: '',
    //     postalCode: '',
    //     country: '',
    // });

    let token = localStorage.getItem('token');
    const [model, setModel] = useState({});
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const [fullName, setFullName] = useState('');
    const [emailAdress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [selectCompanyType, setSelectCompanyType] = useState('');
    const [yourPosition, setYourPosition] = useState('');
    const [noOfEmployees, setNoOfEmployees] = useState('');
    const [streetAdress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    // const [timeeZone, settimeZone] = useState('');
    const [address, setFullAddress] = useState('');
    const [timeeZone, settimeZone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeeZone
    )
    const items = JSON.parse(localStorage.getItem('items'));

    let headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }

    const handleStartDateChange = (timeeZone) => {
        console.log(timeeZone);
        settimeZone(timeeZone);
        const newtime = timeeZone?.value;
        setModel({ "timezoneOffset": timeeZone?.offset })
        setModel((prevUserInfo) => ({
            ...prevUserInfo,
            timeeZone: newtime,
        }));
    };


    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

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


    useEffect(() => {
        const concatenatedAddress = `${streetAdress}, ${city}, ${postalCode}, ${country}`;
        setFullAddress(concatenatedAddress);
    }, [streetAdress, city, postalCode, country]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const registerData = {
            fullName,
            emailAdress,
            password,
            phoneNumber,
            companyName,
            selectCompanyType,
            yourPosition,
            noOfEmployees,
            address,
            timeeZone,
        };
        console.log('Register Data:', registerData);

        const infinitiDataObject = new FormData();
        infinitiDataObject.append('name', fullName);
        infinitiDataObject.append('email', emailAdress)
        infinitiDataObject.append('password', password)
        infinitiDataObject.append('phoneNumber', phoneNumber)
        infinitiDataObject.append('yourPosition', yourPosition)
        infinitiDataObject.append('saleBefore', 'no')
        infinitiDataObject.append('companyName', companyName)
        infinitiDataObject.append('noOfEmployees', noOfEmployees)
        infinitiDataObject.append('selectCompanyType', selectCompanyType)
        // infinitiDataObject.append('employeeWillUse', )
        infinitiDataObject.append('address', address)
        infinitiDataObject.append('postalCode', postalCode)
        infinitiDataObject.append('country', country)

        // Prepare data for each API endpoint using FormData
        const verdeDataObject = new FormData();
        verdeDataObject.append('orgname', companyName);
        verdeDataObject.append('postalcode', postalCode);
        verdeDataObject.append('street', streetAdress);
        verdeDataObject.append('city', city);
        verdeDataObject.append('email', emailAdress);
        verdeDataObject.append('password', password);

        const universalLanguageData = {
            name: fullName,
            password: password,
            email: emailAdress,
            userType: "owner",
            timezone: timeeZone,
            timezoneOffset: "Asia/Karachi",
            company: companyName
        };

        const clickhrData = new FormData();            
        clickhrData.append('company', companyName);
        clickhrData.append('com_email', emailAdress);
        clickhrData.append('com_number', phoneNumber);
        clickhrData.append('num', phoneNumber);
        clickhrData.append('email',  emailAdress);
        clickhrData.append('com_web', 'sstrack.io');
        clickhrData.append('nemp', noOfEmployees);
        clickhrData.append('fname', fullName);
        clickhrData.append('lname', fullName);
        clickhrData.append('com_address', address);
        clickhrData.append('password', password)


        try {
            const response = await fetch('https://infinitisuiteapi.vercel.app/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(infinitiDataObject),
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
            body: verdeDataObject, // Send FormData directly
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
            if(response.ok && response1.ok && response2.ok && response3.ok){
                toast.success('Account created successfully!');
            }
            else{
                toast.error('An error occurred. Please try again.');

            }
           
        } catch (error) {
            event.target.reset(); // Reset form fields

            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }

    };
    // console.log('Handle Submit ....', handleSubmit())no

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
                        <div className="ud-contact-content-wrapper">
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
                            <div className="ud-banner-content">
                                <h1 style={{ color: "#3056d3" }}>Let's Get Started</h1>
                                <p style={{ color: "#050505" }}>First You'll need to create the Account.</p>
                            </div>
                            <form onSubmit={handleSubmit} >
                                {currentStep === 1 && (
                                    <div>
                                        <div className="form-group">
                                            <label>Full Name:</label>
                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Email Address:</label>
                                            <input type="email" value={emailAdress} onChange={(e) => setEmailAdress(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Password:</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        {/* <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /> */}

                                        <div className="form-group">
                                            <label>Phone Number:</label>
                                            <div className="selected-option">
                                                <div className="ahad-custom-mobile">
                                                    <strong>+44</strong>
                                                </div>
                                                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="nav-buttons">
                                            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div>
                                        {/* <div className="form-group">
                                                                            <label>Number of Employees:</label>
                                                                            <select value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)}>
                                                                                <option value="10-50">10-50</option>
                                                                                <option value="50-100">50-100</option>
                                                                                <option value="100-200">100-200</option>
                                                                            </select>
                                                                        </div> */}

                                        {/* <div className="form-group">
                                                                            <label>Select Company Type:</label>
                                                                            <select value={selectCompanyType} onChange={(e) => setSelectCompanyType(e.target.value)}>
                                                                                <option value="technology-startup">Technology Startup</option>
                                                                                <option value="ecommerce-business">E-commerce Business</option>
                                                                                <option value="manufacturing-company">Manufacturing Company</option>
                                                                                <option value="consulting-firm">Consulting Firm</option>
                                                                                <option value="healthcare-services">Healthcare Services</option>
                                                                                <option value="financial-services">Financial Services</option>
                                                                            </select>
                                                                        </div>
                                
                                                                        <div className="form-group">
                                                                            <label>Number of Employees who will use Infiniti Suite:</label>
                                                                            <select value={employeeWillUse} onChange={(e) => setEmployeeWillUse(e.target.value)}>
                                                                                <option value="1-5">1-5</option>
                                                                                <option value="6-10">6-10</option>
                                                                                <option value="11-20">11-20</option>
                                                                                <option value="21-50">21-50</option>
                                                                                <option value="51-100">51-100</option>
                                                                                <option value="100+">100+</option>
                                                                            </select>
                                                                        </div> */}

                                        <div className="form-group">
                                            <label>Street Address:</label>
                                            <input type="text" value={streetAdress} onChange={(e) => setStreetAddress(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>City:</label>
                                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Postal Code:</label>
                                            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Country:</label>
                                            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Timezone:</label>
                                            {/* <input type="text" value={timeeZone} onChange={(e) => settimeZone(e.target.value)} /> */}
                                            <div className="dropdown" style={{ zIndex: '3' }}>
                                                <div>
                                                    <TimezoneSelect value={items ? items.timeeZone : timeeZone}
                                                        onChange={handleStartDateChange} />
                                                </div>
                                                {/* <Timezone /> */}
                                            </div>
                                        </div>
                                        {/* </div>
                                                                        {/* <button type="button" onClick={handlePrevious}>
                                                                            Previous
                                                                        </button> */}
                                        <div className="nav-buttons">
                                            <button type="button" onClick={prevStep}>
                                                Previous
                                            </button>
                                            <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div>
                                        <div className="form-group">
                                            <label>Company Name:</label>
                                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                        </div>
                                        {/* <button type="button" onClick={handleNext}>
                                        Next
                                    </button> */}


                                        <div className="form-group">
                                            <label>Select Company Type:</label>
                                            <select value={selectCompanyType} onChange={(e) => setSelectCompanyType(e.target.value)}>
                                                <option value="technology-startup">Technology Startup</option>
                                                <option value="ecommerce-business">E-commerce Business</option>
                                                <option value="manufacturing-company">Manufacturing Company</option>
                                                <option value="consulting-firm">Consulting Firm</option>
                                                <option value="healthcare-services">Healthcare Services</option>
                                                <option value="financial-services">Financial Services</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Position (optional):</label>
                                            <input type="text" value={yourPosition} onChange={(e) => setYourPosition(e.target.value)} />
                                        </div>
                                        {/* <div className="form-group">
                                        <label>Position (optional):</label>
                                        <select value={wantFirst} onChange={(e) => setWantFirst(e.target.value)}>
                                            <option value="Close deals faster">Close deals faster</option>
                                            <option value="Find new leads">Find new leads</option>
                                            <option value="Manage relationships better">Manage relationships better</option>
                                            <option value="Set goals and track progress">Set goals and track progress</option>
                                            <option value="Set up a team and permissions">Set up a team and permissions</option>
                                        </select>
                                    </div> */}
                                        <div className="form-group">
                                            <label>Number of Employees (optional):</label>
                                            <select value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)}>
                                                <option value="10-50">10-50</option>
                                                <option value="50-100">50-100</option>
                                                <option value="100-200">100-200</option>
                                            </select>
                                        </div>
                                        {/* <div className="form-group">
                                        <label>Company Name:</label>
                                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                    </div> */}
                                        <div className="nav-buttons">
                                            <button type="button" onClick={prevStep}>
                                                Previous
                                            </button>
                                            <button type="submit" className="next-btn">Submit</button>
                                        </div>
                                        {/* <button type="button" onClick={handleNext}>
                                        Next
                                    </button> */}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div >
            </section >
            // <Footer />
        </>
    );
};

export default SignUpForm;
