import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { CreateStudentProfile } from '../Services/apiRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const notify = () => toast("Registration is success!");



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

        if (Object.keys(formErrors).length === 0) {
            console.log("Form Submitted");
            CreateStudentProfile(formData).then(res => {
                if (res) {
                    console.log(res);
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

                    notify()
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
            <Form className='w-75 mx-auto' onSubmit={submitHandler}>
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
                            <Form.Control type="tel" placeholder="DD-MM-YYYY" id="dateOfBirth" name="dateOfBirth" onChange={changeHandler} value={formData.dateOfBirth} />
                            <Form.Text className="text-danger">{formErrors.dateOfBirth}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="Nationality" name="nationality" value={formData.nationality} onChange={changeHandler} />
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
                            <Form.Control type="tel" placeholder="DD-MM-YYYY" id="admissionDate" name="admissionDate" onChange={changeHandler} value={formData.admissionDate} />
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
