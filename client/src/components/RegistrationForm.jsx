import { Form, Button, Row, Col } from 'react-bootstrap';
// import Cleave from 'cleave.js';
// import 'cleave.js/dist/addons/cleave-phone.i18n';
import { useEffect, useRef, useState } from 'react';

function RegistrationForm() {

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

    useEffect(() => {
        (() => {
            // new Cleave('#dateOfBirth', {
            //     date: true,
            //     delimiter: '-',
            //     datePattern: ['d', 'm', 'Y'],
            //     onValueChanged: function (e) {
            //         const { name, value } = e.target;
            //         setFormData({
            //             ...formData,
            //             [name]: value
            //         })
            //     }
            // });
            // new Cleave('#admissionDate', {
            //     date: true,
            //     delimiter: '-',
            //     datePattern: ['d', 'm', 'Y'],
            //     onValueChanged: function (e) {
            //         const { name, value } = e.target;
            //         setFormData({
            //             ...formData,
            //             [name]: value
            //         })
            //     }
            // });
            // new Cleave('#phone', {
            //     phone: true,
            //     phoneRegionCode: 'BD',
            //     delimiter: '-',
            //     onValueChanged: function (e) {
            //         const { name, value } = e.target;
            //         setFormData({
            //             ...formData,
            //             [name]: value
            //         })
            //     }
            // });
        })()
    }, []);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();




    }


    return (
        <>
            <h1 className='text-center mb-3 display-5'>Register</h1>
            <Form className='w-75 mx-auto' onSubmit={submitHandler}>
                {console.log(formData)}
                <Row className="mb-3">
                    <Form.Group as={Col} md={6} className="mb-3" controlId='firstName'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" name="firstName" onChange={changeHandler} />
                    </Form.Group>
                    <Form.Group as={Col} md={6} className="mb-3" controlId='lastName'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Lirst name" name="lastName" onChange={changeHandler} />
                    </Form.Group>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Group>
                                <Form.Check inline type="radio" label="Male" name="gender" value="male" id='male' onChange={changeHandler} />
                                <Form.Check inline type="radio" label="Female" name="gender" value="female" id='female' className='me-0' onChange={changeHandler} />
                            </Form.Group>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='dateOfBirth'>Date of Birth</Form.Label>
                            <Form.Control type="tel" placeholder="DD-MM-YYYY" id="dateOfBirth" name="dateOfBirth" onChange={changeHandler} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="Nationality" name="nationality" onChange={changeHandler} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="address" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="1234 Main St" name='address' onChange={changeHandler} />
                    </Form.Group>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Email Address" onChange={changeHandler} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='phone'>Phone</Form.Label>
                            <Form.Control type="tel" placeholder="Phone" name='phone' id='phone' onChange={changeHandler} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='admissionDate'>Admission Date</Form.Label>
                            <Form.Control type="tel" placeholder="DD-MM-YYYY" id="admissionDate" name="admissionDate" onChange={changeHandler} />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='courses'>Courses</Form.Label>
                            <Form.Control type="text" placeholder="Courses" id="courses" name="courses" onChange={changeHandler} />
                        </Form.Group>
                    </Col>
                </Row>


                <Button variant="primary" type="submit">
                    Register Now
                </Button>
            </Form>
        </>
    );
}

export default RegistrationForm;
