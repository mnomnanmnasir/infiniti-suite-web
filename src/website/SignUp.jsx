import React, { useState, useEffect } from 'react';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TimezoneSelect from 'react-timezone-select';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { FerrisWheelSpinner } from "react-spinner-overlay";
import { Email } from '@mui/icons-material';


const countries = [
    { name: 'Afghanistan', code: 'AF', phone: 93 },
    { name: 'Aland Islands', code: 'AX', phone: 358 },
    { name: 'Albania', code: 'AL', phone: 355 },
    { name: 'Algeria', code: 'DZ', phone: 213 },
    { name: 'American Samoa', code: 'AS', phone: 1684 },
    // ...add all countries
];


const CompanyTypeSelect = ({ value, onChange, options }) => {
    return (
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};


const SignUpForm = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedCountryPhone, setSelectedCountryPhone] = useState('');
    const [formData, setFormData] = useState({
        name: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        // Add other error states here
    });

    const [existingEmail, setExistingEmail] = useState(null);

    useEffect(() => {
        const optionsList = countries.map((country) => (
            <li key={country.code} className="option">
                <div>
                    <span className="iconify" data-icon={`flag:`} />
                    {/* <span className="country-name">{country.name}</span> */}
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


    // const checkForDuplicateValue = (name, value) => {
    //     const existingValue = formData[name];
    //     if (existingValue && existingValue.trim() === value.trim()) {
    //         toast.warning('Duplicate value detected! Please use a different value.');
    //         return true;
    //     }
    //     return false;
    // };




    const handleInputChange1 = (e) => {
        let name, value;

        if (e.target) {
            ({ name, value } = e.target);
        } else {
            value = e;
            name = 'phoneNumber';
        }
        if (name === "phoneNumber") {
            setPhoneNumber(value);
            console.log("Phone Number:", value); // Add this line to log the phone number to the console
        }
        setFormData({
            ...formData,
            [name]: value,
        });
        const formattedValue = value.replace(/\D+/g, '').slice(0, 11);
        setFormData({ ...formData, phoneNumber: formattedValue });
        // Clear error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: '',
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Check if field is empty
        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'This field is required.',
            }));
        }
    };
    const handlePhoneBlur = () => {
        if (!formData.phoneNumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phoneNumber: 'Please Enter Phone Number',
            }));
        }
    };
    const [currentStep, setCurrentStep] = useState(1);


    let token = localStorage.getItem('token');
    const [model, setModel] = useState({});
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const [name, setFullName] = useState('');
    const [email, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [saleBefore, setSaleBefore] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [noOfEmployess, setNoOfEmployees] = useState('');
    const [selectCompanyType, setSelectCompanyType] = useState('');
    const [address, setFullAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [yourPosition, setYourPosition] = useState('');
    const [city_Address, setCity] = useState('');
    const [wantFirst, setWantFirst] = useState('');

    const [loading, setLoading] = useState(false)


    const [phone, setPhone] = useState("");



    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [timezoneOffset, setTimezoneOffset] = useState(null);

    const items = JSON.parse(localStorage.getItem('items'));

    let headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }




    // Modify the handleStartDateChange function to update both state variables
    const handleStartDateChange = (selectedTimezone) => {
        console.log(selectedTimezone)
        setTimezone(selectedTimezone.value); // Assuming the TimezoneSelect component provides the selected value
        setTimezoneOffset(selectedTimezone.offset); // Assuming the TimezoneSelect component also provides the offset
        if (timezoneerror) setTimezoneerror('');
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
        if (currentStep === 1) {
            let hasError1 = false;
            // Validate Name
            if (!formData.name) {
                setnameError('This enter your name required.')
                hasError1 = true; // Mark that there's an error
            } else {
                setnameError('')  // Clear error if name is valid
            }
            if (!formData.phoneNumber) {
                setphnumberError('Please Enter Phone Number')
                hasError1 = true; // Mark that there's an error
            } else {
                setphnumberError('')  // Clear error if name is valid
            }

            if (!email) {
                setemailError('Please select the Country');
                hasError1 = true;  // Mark that there's an error
            } else {
                setemailError('');  // Clear error if country is selected
            }
            if (!password) {
                setpasswordError('Please select the Country');
                hasError1 = true;  // Mark that there's an error
            } else {
                setpasswordError('');  // Clear error if country is selected
            }
            if (hasError1) {
                return;  // Exit function if there are any errors
            }

        }

        if (currentStep === 2) {
            let hasError = false;
            console.log('dfsdfsdfsdf', timezoneOffset)
            if (!city_Address) {
                setError('Please enter Country name');
                hasError = true;  // Mark that there's an error
            } else {
                setError('')
            }
            if (!yourPosition) {
                setPositionError('please enter your position');
                setIsSubmitted(false);
            }
            if (!street_address) {
                setStreetError('Please enter street address');
                hasError = true;  // Mark that there's an error
            } else {
                setStreetError('')
            }
            if (!postalCode) {
                setPostalError('Please enter postal code');
                hasError = true;  // Mark that there's an error
            } else {
                setPostalError('')
            }
            if (!country) {
                setCountryerror('Please select the Country');
                hasError = true;  // Mark that there's an error
            } else {
                setCountryerror('');  // Clear error if country is selected
            }

            if (!wantFirst) {
                setWantFirsterror('Please select any field');
                hasError = true;  // Mark that there's an error
            } else {
                setWantFirsterror('');  // Clear error if wantFirst is selected
            }
            if (!timezoneOffset) {
                setTimezoneerror('Please fill this field');
                hasError = true;  // Mark that there's an error
            } else {
                setWantFirsterror('');  // Clear error if wantFirst is selected
            }

            if (hasError) {
                return;  // Exit function if there are any errors
            }
        }

        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            enqueueSnackbar('Please fill in all required fields.', {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


    // const [city_Address, setCity] = useState('');
    const [error, setError] = useState('');

    const [streetError, setStreetError] = useState('');
    const [postalError, setPostalError] = useState('');
    const [companyError, setCompanyError] = useState('');
    const [positionError, setPositionError] = useState('');
    const [salesToolError, setSalesToolError] = useState('');
    const [employeeError, setEmployeeError] = useState('');
    const [companyTypeError, setCompanyTypeError] = useState('');
    const [countryerror, setCountryerror] = useState('');
    const [wantFirsterror, setWantFirsterror] = useState('');
    const [timezoneerror, setTimezoneerror] = useState('');
    const [emailError, setemailError] = useState('')
    const [passwordError, setpasswordError] = useState('')
    const [nameError, setnameError] = useState('')
    const [phnumberError, setphnumberError] = useState('')

    const handleChangecity = (e) => {
        setCity(e.target.value);
        if (error) setError(''); // Clear error when user starts typing
    };

    // Function to validate input on blur
    const handleBlurcity = () => {
        if (!city_Address.trim()) {
            setError('City is required');
        }
    };

    // Function to handle street address change
    const handleStreetChange = (e) => {
        setStreetAddress(e.target.value);
        if (streetError) setStreetError(''); // Clear error when user starts typing
    };

    // Function to validate street address on blur
    const handleStreetBlur = () => {
        if (!street_address.trim()) {
            setStreetError('Street Address is required');
        }
    };

    // Function to handle postal code change
    const handlePostalChange = (e) => {
        setPostalCode(e.target.value);
        if (postalError) setPostalError(''); // Clear error when user starts typing
    };

    // Function to validate postal code on blur
    const handlePostalBlur = () => {
        if (!postalCode.trim()) {
            setPostalError('Postal Code is required');
        } else if (!/^[A-Za-z0-9\s-]+$/.test(postalCode)) {
            // Example regex to allow letters, numbers, spaces, and dashes
            setPostalError('Invalid Postal Code format');
        }
    };

    // Function to handle company name change
    const handleCompanyChange = (e) => {
        setCompanyName(e.target.value);
        if (companyError) setCompanyError(''); // Clear error when user starts typing
    };

    // Function to validate company name on blur
    const handleCompanyBlur = () => {
        if (!companyName.trim()) {
            setCompanyError('Company Name is required');
        }
    };

    // Function to handle position change
    const handlePositionChange = (e) => {
        setYourPosition(e.target.value);
        if (positionError) setPositionError(''); // Clear error when user starts typing
    };

    // Function to validate position on blur
    const handlePositionBlur = () => {
        if (!yourPosition.trim()) {
            setPositionError('Position is required');
        }
    };

    // Function to handle sales tool input change
    const handleSalesToolChange = (e) => {
        setSaleBefore(e.target.value);
        if (salesToolError) setSalesToolError(''); // Clear error when user starts typing
    };

    // Function to validate sales tool input on blur
    const handleSalesToolBlur = () => {
        if (!saleBefore.trim()) {
            setSalesToolError('This field is required');
        }
    };

    const handleNoOfEmployeesChange = (e) => {
        setNoOfEmployees(e.target.value);
        if (employeeError) setEmployeeError(''); // Clear error when user starts selecting an option
    };
    const handleselectCompanyTypeChange = (e) => {
        setSelectCompanyType(e.target.value);
        if (companyTypeError) setCompanyTypeError(''); // Clear error when user starts selecting an option
    };
    const handlecountryChange = (e) => {
        setCountry(e.target.value);
        if (countryerror) setCountryerror(''); // Clear error when user starts selecting an option
    };
    const handlewantFirstChange = (e) => {
        setWantFirst(e.target.value);
        if (wantFirsterror) setWantFirsterror(''); // Clear error when user starts selecting an option
    };









    useEffect(() => {
        const concatenatedAddress = `${street_address}, ${city_Address}, ${postalCode}, ${country}`;
        setFullAddress(concatenatedAddress);
    }, [street_address, city_Address, postalCode, country]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true); // Disable the button when clicked

        const registerData = {
            name: formData.name,
            email,
            password,
            phoneNumber,
            yourPosition,
            saleBefore,
            companyName,
            noOfEmployess,
            selectCompanyType,
            address,
            postalCode,
            country,
            timezone,
            timezoneOffset,
            street_address,
            city_Address,
        };
        // Validation logic

        // Validation logic with else if
        if(!saleBefore){
            setSalesToolError('please enter this field');
            setIsSubmitted(false);
        }

      

        if (!companyName) {
            setCompanyError('please enter Company Name');
            setIsSubmitted(false);
        }

        if (!selectCompanyType) {
            setCompanyTypeError('Please select the Company Type');
            setIsSubmitted(false);

        }
        if (!noOfEmployess) {
            setEmployeeError('Please select the number of employees.');
            setIsSubmitted(false);

        }
        if (!registerData.name || !registerData.email || !registerData.password || !registerData.phoneNumber || !registerData.yourPosition || !registerData.saleBefore || !registerData.companyName || !registerData.noOfEmployess || !registerData.selectCompanyType || !registerData.address || !registerData.postalCode || !registerData.country || !registerData.timezone || !registerData.timezoneOffset || !registerData.street_address || !registerData.city_Address) {
            enqueueSnackbar("Please fill in all required fields.", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            });
            setIsSubmitted(false); // Re-enable the button
            return;
        }

        console.log('Register Data:', registerData);

        try {
            const response = await axios.post('https://infinitisuiteapi.vercel.app/api/v1/signup', registerData);
            console.log('Registration successful!');
            // console.log('ressssssssss', response.message);
            // navigate('/login', { replace: true });
            if (response.status === 200) {
                setLoading(false);
                // Redirect to login page immediately
                setIsSubmitted(false);
                // Show success message and navigate after snackbar is shown
                enqueueSnackbar('Registration successful!', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    onClose: () => {
                        // Navigate after snackbar appears and is dismissed
                        navigate('/login', { replace: true });
                    }
                });
                // Re-enable the button
            } else {
                enqueueSnackbar(response.data.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                });
                setIsSubmitted(false); // Re-enable the button
            }
        } catch (error) {
            // console.log('ressssssssss', error.response.data.message)
            if (error.response && error.response.data && error.response.data.message) {
                // Display the specific error message from the API
                enqueueSnackbar(error.response.data.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                });
                console.error('Error from API:', error.response.data.message); // Print error to console
            } else {
                // Fallback for unknown errors
                enqueueSnackbar('An unexpected error occurred. Please try again.', {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right"
                    }
                });
                console.error('Unexpected error:', error); // Print full error object to console
            }
            setIsSubmitted(false); // Re-enable the button
        }
    };


    return (
        <>
            <Header />
            <SnackbarProvider />
            <section className="ud-page-banner">
                <div className="container" id='#signup'>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-banner-content"
                            >
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
                                    <div className="form-container active" id="step-1">
                                        <div>
                                            <div className="form-group">
                                                <label>Full Name*</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    onBlur={handleBlur}  // Add onBlur handler
                                                    required
                                                />
                                                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                                                {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address*</label>
                                                <input type="email" name='email' value={email} onChange={(e) => {
                                                    setEmailAdress(e.target.value);
                                                    if (existingEmail) {
                                                        setExistingEmail("Email already exists. Please enter a different email.");
                                                    } else {
                                                        setExistingEmail("");
                                                    }
                                                }} style={{ borderColor: existingEmail ? 'red' : '' }}
                                                    required />
                                                {/* {emailError && <div style={{ color: 'red' }}>{errorMes  sage}</div>} */}
                                                {existingEmail && <div style={{ color: 'red' }}>Email already exists. Please enter a different email.</div>}
                                                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label>Password*</label>
                                                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}


                                            <div className="form-group">
                                                <label htmlFor="text">Phone Number*</label>
                                                <PhoneInput
                                                    name='phoneNumber'
                                                    value={formData.phoneNumber}
                                                    onChange={handleInputChange1}
                                                    onBlur={handlePhoneBlur} // Add onBlur handler for PhoneInput
                                                    containerStyle={{ flex: 1, marginRight: '-50px' }}
                                                    inputStyle={{ fontSize: '16px', padding: '9px 50px', width: '100%', marginRight: '-50px' }}
                                                    placeholder="" // Add this prop to remove the placeholder
                                                />
                                                {/* Inline style for error message */}
                                                {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>}
                                                {phnumberError && <span style={{ color: 'red' }}>{phnumberError}</span>}
                                            </div>

                                            <div className="nav-buttons">
                                                <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="form-container active" id="step-2">

                                        <div>

                                            <div className="form-group">
                                                <label>Country*</label>
                                                <div className="dropdown" style={{
                                                    zIndex: '3',
                                                    backgroundColor: '#f9f9f9',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    padding: '0px',
                                                    width: '100%',
                                                    position: 'relative'
                                                }}>

                                                    <select
                                                        placeholder='Select...'
                                                        name='country'
                                                        value={country || ''}
                                                        onChange={handlecountryChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '42px',
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            appearance: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none',
                                                        }}
                                                    >
                                                        <option value="" disabled hidden>{country ? '' : 'Select...'}</option>
                                                        <option value="Afghanistan">Afghanistan</option>
                                                        <option value="Albania">Albania</option>
                                                        <option value="Algeria">Algeria</option>
                                                        <option value="Andorra">Andorra</option>
                                                        <option value="Angola">Angola</option>
                                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                        <option value="Argentina">Argentina</option>
                                                        <option value="Armenia">Armenia</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="Austria">Austria</option>
                                                        <option value="Azerbaijan">Azerbaijan</option>
                                                        <option value="Bahamas">Bahamas</option>
                                                        <option value="Bahrain">Bahrain</option>
                                                        <option value="Bangladesh">Bangladesh</option>
                                                        <option value="Barbados">Barbados</option>
                                                        <option value="Belarus">Belarus</option>
                                                        <option value="Belgium">Belgium</option>
                                                        <option value="Belize">Belize</option>
                                                        <option value="Benin">Benin</option>
                                                        <option value="Bhutan">Bhutan</option>
                                                        <option value="Bolivia">Bolivia</option>
                                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                        <option value="Botswana">Botswana</option>
                                                        <option value="Brazil">Brazil</option>
                                                        <option value="Brunei">Brunei</option>
                                                        <option value="Bulgaria">Bulgaria</option>
                                                        <option value="Burkina Faso">Burkina Faso</option>
                                                        <option value="Burundi">Burundi</option>
                                                        <option value="Cambodia">Cambodia</option>
                                                        <option value="Cameroon">Cameroon</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="Central African Republic">Central African Republic</option>
                                                        <option value="Chad">Chad</option>
                                                        <option value="Chile">Chile</option>
                                                        <option value="China">China</option>
                                                        <option value="Colombia">Colombia</option>
                                                        <option value="Comoros">Comoros</option>
                                                        <option value="Congo">Congo</option>
                                                        <option value="Costa Rica">Costa Rica</option>
                                                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                                        <option value="Croatia">Croatia</option>
                                                        <option value="Cuba">Cuba</option>
                                                        <option value="Cyprus">Cyprus</option>
                                                        <option value="Czech Republic">Czech Republic</option>
                                                        <option value="Denmark">Denmark</option>
                                                        <option value="Djibouti">Djibouti</option>
                                                        <option value="Dominica">Dominica</option>
                                                        <option value="Dominican Republic">Dominican Republic</option>
                                                        <option value="Ecuador">Ecuador</option>
                                                        <option value="Egypt">Egypt</option>
                                                        <option value="El Salvador">El Salvador</option>
                                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                        <option value="Eritrea">Eritrea</option>
                                                        <option value="Estonia">Estonia</option>
                                                        <option value="Ethiopia">Ethiopia</option>
                                                        <option value="Fiji">Fiji</option>
                                                        <option value="Finland">Finland</option>
                                                        <option value="Gabon">Gabon</option>
                                                        <option value="Gambia">Gambia</option>
                                                        <option value="Georgia">Georgia</option>
                                                        <option value="Germany">Germany</option>
                                                        <option value="Ghana">Ghana</option>
                                                        <option value="Greece">Greece</option>
                                                        <option value="Grenada">Grenada</option>
                                                        <option value="Guatemala">Guatemala</option>
                                                        <option value="Guinea">Guinea</option>
                                                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                                                        <option value="Guyana">Guyana</option>
                                                        <option value="Haiti">Haiti</option>
                                                        <option value="Honduras">Honduras</option>
                                                        <option value="Hungary">Hungary</option>
                                                        <option value="Iceland">Iceland</option>
                                                        <option value="India">India</option>
                                                        <option value="Indonesia">Indonesia</option>
                                                        <option value="Iran">Iran</option>
                                                        <option value="Iraq">Iraq</option>
                                                        <option value="Ireland">Ireland</option>
                                                        <option value="Israel">Israel</option>
                                                        <option value="Italy">Italy</option>
                                                        <option value="Jamaica">Jamaica</option>
                                                        <option value="Japan">Japan</option>
                                                        <option value="Jordan">Jordan</option>
                                                        <option value="Kazakhstan">Kazakhstan</option>
                                                        <option value="Kenya">Kenya</option>
                                                        <option value="Kiribati">Kiribati</option>
                                                        <option value="North Korea">North Korea</option>
                                                        <option value="South Korea">South Korea</option>
                                                        <option value="Kosovo">Kosovo</option>
                                                        <option value="Kuwait">Kuwait</option>
                                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                        <option value="Laos">Laos</option>
                                                        <option value="Latvia">Latvia</option>
                                                        <option value="Lebanon">Lebanon</option>
                                                        <option value="Lesotho">Lesotho</option>
                                                        <option value="Liberia">Liberia</option>
                                                        <option value="Libya">Libya</option>
                                                        <option value="Lithuania">Lithuania</option>
                                                        <option value="Luxembourg">Luxembourg</option>
                                                        <option value="Macedonia">Macedonia</option>
                                                        <option value="Madagascar">Madagascar</option>
                                                        <option value="Malawi">Malawi</option>
                                                        <option value="Malaysia">Malaysia</option>
                                                        <option value="Maldives">Maldives</option>
                                                        <option value="Mali">Mali</option>
                                                        <option value="Malta">Malta</option>
                                                        <option value="Marshall Islands">Marshall Islands</option>
                                                        <option value="Mauritania">Mauritania</option>
                                                        <option value="Mauritius">Mauritius</option>
                                                        <option value="Mexico">Mexico</option>
                                                        <option value="Micronesia">Micronesia</option>
                                                        <option value="Moldova">Moldova</option>
                                                        <option value="Monaco">Monaco</option>
                                                        <option value="Mongolia">Mongolia</option>
                                                        <option value="Montenegro">Montenegro</option>
                                                        <option value="Morocco">Morocco</option>
                                                        <option value="Mozambique">Mozambique</option>
                                                        <option value="Myanmar">Myanmar</option>
                                                        <option value="Namibia">Namibia</option>
                                                        <option value="Nauru">Nauru</option>
                                                        <option value="Nepal">Nepal</option>
                                                        <option value="Netherlands">Netherlands</option>
                                                        <option value="New Zealand">New Zealand</option>
                                                        <option value="Nicaragua">Nicaragua</option>
                                                        <option value="Niger">Niger</option>
                                                        <option value="Nigeria">Nigeria</option>
                                                        <option value="Norway">Norway</option>
                                                        <option value="Oman">Oman</option>
                                                        <option value="Pakistan">Pakistan</option>
                                                        <option value="Palau">Palau</option>
                                                        <option value="Panama">Panama</option>
                                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                                        <option value="Paraguay">Paraguay</option>
                                                        <option value="Peru">Peru</option>
                                                        <option value="Philippines">Philippines</option>
                                                        <option value="Poland">Poland</option>
                                                        <option value="Portugal">Portugal</option>
                                                        <option value="Qatar">Qatar</option>
                                                        <option value="Romania">Romania</option>
                                                        <option value="Russia">Russia</option>
                                                        <option value="Rwanda">Rwanda</option>
                                                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                        <option value="Saint Lucia">Saint Lucia</option>
                                                        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                                        <option value="Samoa">Samoa</option>
                                                        <option value="San Marino">San Marino</option>
                                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                                        <option value="Senegal">Senegal</option>
                                                        <option value="Serbia">Serbia</option>
                                                        <option value="Seychelles">Seychelles</option>
                                                        <option value="Sierra Leone">Sierra Leone</option>
                                                        <option value="Singapore">Singapore</option>
                                                        <option value="Sint Maarten">Sint Maarten</option>
                                                        <option value="Slovakia">Slovakia</option>
                                                        <option value="Slovenia">Slovenia</option>
                                                        <option value="Solomon Islands">Solomon Islands</option>
                                                        <option value="Somalia">Somalia</option>
                                                        <option value="South Africa">South Africa</option>
                                                        <option value="South Sudan">South Sudan</option>
                                                        <option value="Spain">Spain</option>
                                                        <option value="Sri Lanka">Sri Lanka</option>
                                                        <option value="Sudan">Sudan</option>
                                                        <option value="Suriname">Suriname</option>
                                                        <option value="Swaziland">Swaziland</option>
                                                        <option value="Sweden">Sweden</option>
                                                        <option value="Switzerland">Switzerland</option>
                                                        <option value="Syria">Syria</option>
                                                        <option value="Tajikistan">Tajikistan</option>
                                                        <option value="Tanzania">Tanzania</option>
                                                        <option value="Thailand">Thailand</option>
                                                        <option value="Timor-Leste">Timor-Leste</option>
                                                        <option value="Togo">Togo</option>
                                                        <option value="Tonga">Tonga</option>
                                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                        <option value="Tunisia">Tunisia</option>
                                                        <option value="Turkey">Turkey</option>
                                                        <option value="Turkmenistan">Turkmenistan</option>
                                                        <option value="Tuvalu">Tuvalu</option>
                                                        <option value="Uganda">Uganda</option>
                                                        <option value="Ukraine">Ukraine</option>
                                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                                        <option value="United Kingdom">United Kingdom</option>
                                                        <option value="United States">United States</option>
                                                        <option value="Uruguay">Uruguay</option>
                                                        <option value="Uzbekistan">Uzbekistan</option>
                                                        <option value="Vanuatu">Vanuatu</option>
                                                        <option value="Vatican City">Vatican City</option>
                                                        <option value="Venezuela">Venezuela</option>
                                                        <option value="Vietnam">Vietnam</option>
                                                        <option value="Yemen">Yemen</option>
                                                        <option value="Zambia">Zambia</option>
                                                        <option value="Zimbabwe">Zimbabwe</option>
                                                    </select>
                                                    <span className="custom-arrow" style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-55%)',
                                                        fontSize: 'px',
                                                        color: '#ccc',
                                                        backgroundColor: 'transparent',/* add this line to remove fill color */
                                                        textShadow: '-1px -1px 0 #fff' /* add this line to remove fill color */
                                                    }}>
                                                        | {`▼`}

                                                    </span>
                                                </div>
                                                {countryerror && (
                                                    <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{countryerror}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label>City*</label>
                                                <input
                                                    type="text"
                                                    name="city_Address"
                                                    value={city_Address}
                                                    onChange={handleChangecity}
                                                    onBlur={handleBlurcity} // Add onBlur event for validation
                                                />
                                                {/* Display error message if there's an error */}
                                                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label>Street Address*</label>
                                                <input
                                                    type="text"
                                                    name="street_address"
                                                    value={street_address}
                                                    onChange={handleStreetChange}
                                                    onBlur={handleStreetBlur} // Add onBlur event for validation
                                                />
                                                {/* Display error message if there's an error */}
                                                {streetError && <p style={{ color: 'red', fontSize: '14px' }}>{streetError}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label>Position</label>
                                                <input
                                                    type="text"
                                                    name="yourPosition"
                                                    value={yourPosition}
                                                    onChange={handlePositionChange}
                                                    onBlur={handlePositionBlur} // Add onBlur event for validation
                                                />
                                                {positionError && <p style={{ color: 'red', fontSize: '14px' }}>{positionError}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label>Postal Code</label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={postalCode}
                                                    onChange={handlePostalChange}
                                                    onBlur={handlePostalBlur} // Add onBlur event for validation
                                                />
                                                {/* Display error message if there's an error */}
                                                {postalError && <p style={{ color: 'red', fontSize: '14px' }}>{postalError}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label>What do you want to do first</label>
                                                <div className="dropdown" style={{
                                                    zIndex: '3',
                                                    backgroundColor: '#f9f9f9',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    // padding: '0px',
                                                    width: '100%',
                                                    position: 'relative'
                                                }}>
                                                    <select
                                                        placeholder='Select...'
                                                        name='selectCompanyType'
                                                        value={wantFirst || ''}
                                                        onChange={handlewantFirstChange}
                                                        style={{
                                                            width: '100%',
                                                            // height: '42px',
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            // backgroundColor: '#f9f9f9',
                                                            appearance: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none',

                                                        }}
                                                    >
                                                        <option value="" disabled hidden>{selectCompanyType ? '' : 'Select...'}</option>
                                                        {/* <option value="technology-startup">Technology Startup</option>
                                                        <option value="ecommerce-business">E-commerce Business</option>
                                                        <option value="manufacturing-company">Manufacturing Company</option>
                                                        <option value="consulting-firm">Consulting Firm</option>
                                                        <option value="healthcare-services">Healthcare Services</option>
                                                        <option value="financial-services">Financial Services</option>
                                                        <option value="" disabled hidden>{wantFirst ? '' : 'Select...'}</option> */}
                                                        <option value="Close deals faster">Close deals faster</option>
                                                        <option value="Find new leads">Find new leads</option>
                                                        <option value="Manage relationships better">Manage relationships better</option>
                                                        <option value="Set goals and track progress">Set goals and track progress</option>
                                                        <option value="Set up a team and permissions">Set up a team and permissions</option>
                                                    </select>
                                                    <span className="custom-arrow" style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-55%)',
                                                        fontSize: 'px',
                                                        color: '#ccc',
                                                        backgroundColor: 'transparent',/* add this line to remove fill color */
                                                        textShadow: '-1px -1px 0 #fff' /* add this line to remove fill color */
                                                    }}>
                                                        | {`▼`}

                                                    </span>
                                                </div>
                                                {wantFirsterror && (
                                                    <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{wantFirsterror}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label className="countryLabel">Time Zone*</label>
                                                <div className="dropdown" style={{ zIndex: '3' }}>
                                                    <TimezoneSelect value={timezone ? timezone : items.timezone} onChange={handleStartDateChange} styles={{
                                                        indicatorSeparator: () => ({ display: 'none' }),
                                                        indicator: () => ({ display: 'none' }),
                                                        width: '100%',
                                                        // height: '42px',
                                                        // padding: '10px',
                                                        fontSize: '6px',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        // backgroundColor: '#f9f9f9',
                                                        appearance: 'none',
                                                        WebkitAppearance: 'none',
                                                        MozAppearance: 'none',
                                                        control: (base) => ({
                                                            ...base,
                                                            // height: '5px', // increase the height to 50px
                                                            width: '100%',
                                                            padding: '3px',
                                                            fontSize: '16px',
                                                            // border: 'none',
                                                            borderRadius: '5px',
                                                            // appearance: 'none',
                                                            // WebkitAppearance: 'none',
                                                            // MozAppearance: 'none',
                                                            textShadow: '-1px -1px 0 #fff' /* add this line to remove fill color */
                                                        }),
                                                    }}
                                                        components={{
                                                            DropdownIndicator: () => null,
                                                            IndicatorSeparator: () => null,
                                                        }}
                                                    />
                                                    {/* <Timezone /> */}
                                                    {/* <button className="btn btn-secondary dropdown-toggle  countryDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                (UTC+05:00) Islamabad, Karachi
                                            </button> */}
                                                    <span className="custom-arrow" style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-55%)',
                                                        fontSize: '17px',
                                                        color: '#ccc',
                                                        backgroundColor: 'transparent',/* add this line to remove fill color */
                                                        textShadow: '-1px -1px 0 #fff' /* add this line to remove fill color */
                                                    }}>
                                                        | {`▼`}

                                                    </span>
                                                </div>
                                                {timezoneerror && (
                                                    <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{timezoneerror}</p>
                                                )}
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
                                    </div>
                                )}
                                {currentStep === 3 && (
                                    <div className="form-container active" id="step-3">
                                        <div>
                                            <div className="form-group">
                                                <label>Company Name*</label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={companyName}
                                                    onChange={handleCompanyChange}
                                                    onBlur={handleCompanyBlur} // Add onBlur event for validation
                                                />
                                                {companyError && <p style={{ color: 'red', fontSize: '14px' }}>{companyError}</p>}
                                            </div>

                                            <div className="form-group">
                                                <label>Select Company Type*</label>
                                                <div className="dropdown" style={{
                                                    zIndex: '3',
                                                    backgroundColor: '#f9f9f9',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    padding: '0px',
                                                    width: '100%',
                                                    position: 'relative'
                                                }}>
                                                    <select
                                                        placeholder='Select...'
                                                        name='selectCompanyType'
                                                        value={selectCompanyType || ''}
                                                        onChange={handleselectCompanyTypeChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '42px',
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            // backgroundColor: '#f9f9f9',
                                                            appearance: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none',

                                                        }}
                                                    >
                                                        <option value="" disabled hidden>{selectCompanyType ? '' : 'Select...'}</option>
                                                        <option value="technology-startup">Technology Startup</option>
                                                        <option value="ecommerce-business">E-commerce Business</option>
                                                        <option value="manufacturing-company">Manufacturing Company</option>
                                                        <option value="consulting-firm">Consulting Firm</option>
                                                        <option value="healthcare-services">Healthcare Services</option>
                                                        <option value="financial-services">Financial Services</option>
                                                    </select>
                                                    <span className="custom-arrow" style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-55%)',
                                                        fontSize: 'px',
                                                        color: '#ccc',
                                                        backgroundColor: 'transparent',/* add this line to remove fill color */
                                                        textShadow: '-1px -1px 0 #fff' /* add this line to remove fill color */
                                                    }}>
                                                        | {`▼`}

                                                    </span>
                                                </div>
                                                {companyTypeError && (
                                                    <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{companyTypeError}</p>
                                                )}
                                            </div>

                                          

                                            <div className="form-group">
                                                <label>Have you used any sales tool before</label>
                                                <input
                                                    type="text"
                                                    name="saleBefore"
                                                    value={saleBefore}
                                                    onChange={handleSalesToolChange}
                                                    onBlur={handleSalesToolBlur} // Add onBlur event for validation
                                                />
                                                {salesToolError && <p style={{ color: 'red', fontSize: '14px' }}>{salesToolError}</p>}
                                            </div>

                                            <div className="form-group">
                                                <label>Number of Employees</label>
                                                <div className="dropdown" style={{
                                                    zIndex: '3',
                                                    backgroundColor: '#f9f9f9',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    padding: '0px',
                                                    width: '100%',
                                                    position: 'relative'
                                                }}>
                                                    <select
                                                        placeholder='Select...'
                                                        name='noOfEmployess'
                                                        value={noOfEmployess || ''}
                                                        // value={noOfEmployess}
                                                        onChange={handleNoOfEmployeesChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '42px',
                                                            padding: '10px',
                                                            fontSize: '16px',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            // backgroundColor: '#f9f9f9',
                                                            appearance: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none',

                                                        }}
                                                    >
                                                        <option value="" disabled hidden>{noOfEmployess ? '' : 'Select...'}</option>
                                                        <option value="10-50">10-50</option>
                                                        <option value="50-100">50-100</option>
                                                        <option value="100-200">100-200</option>
                                                    </select>
                                                    <span className="custom-arrow" style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-55%)',
                                                        fontSize: 'px',
                                                        color: '#ccc',
                                                        backgroundColor: 'transparent',/* add this line to remove fill color */
                                                        textShadow: '-1px -1px 0 #fff' /* add this line to remove fill color */
                                                    }}>
                                                        | {`▼`}

                                                    </span>
                                                </div>
                                                {employeeError && (
                                                    <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{employeeError}</p>
                                                )}
                                            </div>

                                            <div className="nav-buttons">
                                                <button type="button" onClick={prevStep}>
                                                    Previous
                                                </button>
                                                {isSubmitted ? (
                                                    <button type="submit" className="next-btn" style={{ backgroundColor: 'grey', cursor: 'none' }} disabled
                                                    >
                                                        Loading...
                                                    </button>
                                                ) : (
                                                    <button type="submit" className="next-btn">
                                                        Submit
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            // <Footer />
        </>
    );
};

export default SignUpForm;
