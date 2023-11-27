import { Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { CreateStudentProfile, GetStudentByID, UpdateStudentProfile } from '../Services/apiRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment/moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

import '../assets/css/RegistrationForm.css';

const options = [
    { value: 'Bahamian', label: 'Bahamian' },
    { value: 'Bahraini', label: 'Bahraini' },
    { value: 'Bangladeshi', label: 'Bangladeshi' },
    { value: 'Barbadian', label: 'Barbadian' },
];

function RegistrationForm(prop) {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        nationality: '',
        address: '',
        email: '',
        phone: '',
        admissionDate: '',
        courses: ''
    });
    const [formErrors, setFormErrors] = useState({})
    const [dob, setDob] = useState(null);
    const [adm, setAdm] = useState(new Date());

    const notify = (txt) => toast(txt);

    // Filling the update form with data
    useEffect(() => {
        if (prop.action === 'edit') {
            GetStudentByID(prop.id).then(res => {
                let { firstName, lastName, gender, dateOfBirth, nationality, address, email, phone, admissionDate, courses } = res;
                setDob(new Date(dateOfBirth));
                setAdm(new Date(admissionDate));
                dateOfBirth = moment(dateOfBirth, 'YYYY-MM-DD').format('DD-MM-YYYY');
                admissionDate = moment(admissionDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
                setFormData({
                    firstName,
                    lastName,
                    gender,
                    dateOfBirth,
                    nationality,
                    address,
                    email,
                    phone,
                    admissionDate,
                    courses
                });
            })
        }

        return () => {
            setFormData({
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                nationality: '',
                address: '',
                email: '',
                phone: '',
                admissionDate: '',
                courses: ''
            })
        }
    }, [prop.action, prop.id])

    const changeHandler = (e) => {
        let { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();

        setFormErrors(validate(formData));

        if (Object.keys(formErrors).length === 0 && prop.action === 'register') {
            console.log(formData);
            CreateStudentProfile(formData).then(res => {
                if (res) {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        gender: '',
                        dateOfBirth: '',
                        nationality: '',
                        address: '',
                        email: '',
                        phone: '',
                        admissionDate: '',
                        courses: ''
                    });

                    notify('Registration is success!')
                }
            }).catch(err => {
                console.log(err);
            })
        } else if (Object.keys(formErrors).length === 0 && prop.action === 'edit') {
            UpdateStudentProfile(formData, prop.id).then(res => {
                if (res) {
                    notify('Update Done!')
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const validate = (values) => {
        const errors = {};

        if (!values.firstName) {
            errors.firstName = "First name is required!";
        }
        if (!values.lastName) {
            errors.lastName = "Last name is required!";
        }
        if (!values.gender) {
            errors.gender = "Gender is required!";
        }

        if (!values.dateOfBirth) {
            errors.dateOfBirth = "Date of Birth is required!";
        }

        if (!values.nationality) {
            errors.nationality = "Nationality is required!";
        }
        if (!values.address) {
            errors.address = "Address is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        }

        if (!values.phone) {
            errors.phone = "Phone is required!";
        }

        if (!values.admissionDate) {
            errors.admissionDate = "Admission Date is required!";
        }
        if (!values.courses) {
            errors.courses = "Courses is required!";
        }

        return errors;
    }


    return (
        <>
            {prop.action === 'register' && <h1 className='text-center mb-3 display-5'>Register</h1>}
            <Form className={`mx-auto ${prop.action === 'edit' ? 'w-100' : 'w-75'}`} onSubmit={submitHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col} md={6} className="mb-3" controlId='firstName'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" name="firstName" value={formData.firstName} onChange={changeHandler} />
                        <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} md={6} className="mb-3" controlId='lastName'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Lirst name" name="lastName" value={formData.lastName} onChange={changeHandler} />
                        <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>
                    </Form.Group>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Group>
                                {/* {formData.gender} */}
                                <Form.Check inline type="radio" label="Male" name="gender" value="male" id='male' checked={formData.gender === 'male'} onChange={changeHandler} />
                                <Form.Check inline type="radio" label="Female" name="gender" value="female" id='female' className='me-0' checked={formData.gender === 'female'} onChange={changeHandler} />
                            </Form.Group>
                            <Form.Text className="text-danger">{formErrors.gender}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='dateOfBirth'>Date of Birth</Form.Label>
                            <DatePicker
                                selected={dob}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="DD-MM-YYYY"
                                name="dateOfBirth"
                                className="form-control"
                                id='dateOfBirth'
                                onChange={(date) => {
                                    setDob(date)
                                    changeHandler({ target: { name: 'dateOfBirth', value: moment(date).format('YYYY-MM-DD') } })
                                }} />
                            <Form.Text className="text-danger">{formErrors.dateOfBirth}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Select
                                defaultValue={formData.nationality}
                                id='nationality'
                                name='nationality'
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        nationality: e.value
                                    })
                                }}
                                options={options} />
                            <Form.Text className="text-danger">{formErrors.nationality}</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="address" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="1234 Main St" name='address' value={formData.address} onChange={changeHandler} />
                        <Form.Text className="text-danger">{formErrors.address}</Form.Text>
                    </Form.Group>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Email Address" value={formData.email} onChange={changeHandler} />
                            <Form.Text className="text-danger">{formErrors.email}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='phone'>Phone</Form.Label>
                            <Form.Control type="tel" placeholder="Phone" name='phone' id='phone' value={formData.phone} onChange={changeHandler} />
                            <Form.Text className="text-danger">{formErrors.phone}</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='admissionDate'>Admission Date</Form.Label>
                            <DatePicker
                                selected={adm}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="DD-MM-YYYY"
                                name="admissionDate"
                                className="form-control"
                                id='admissionDate'
                                onChange={(date) => {
                                    setAdm(date)
                                    changeHandler({ target: { name: 'admissionDate', value: moment(date).format('YYYY-MM-DD') } })
                                }} />
                            <Form.Text className="text-danger">{formErrors.admissionDate}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='courses'>Courses</Form.Label>
                            <Form.Control type="text" placeholder="Courses" id="courses" name="courses" value={formData.courses} onChange={changeHandler} />
                            <Form.Text className="text-danger">{formErrors.courses}</Form.Text>
                        </Form.Group>
                    </Col>
                </Row>


                <Button variant="primary" type="submit">
                    {prop.action === 'register' && 'Register Now'}
                    {prop.action === 'edit' && 'Update'}
                </Button>
            </Form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default RegistrationForm;
