import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.i18n';
import { useEffect } from 'react';

function RegistrationForm() {

    useEffect(() => {
        (() => {
            new Cleave('#dob', {
                date: true,
                delimiter: '-',
                datePattern: ['d', 'm', 'Y'],
            });
            new Cleave('#admissionDate', {
                date: true,
                delimiter: '-',
                datePattern: ['d', 'm', 'Y'],
            });
            new Cleave('#phone', {
                phone: true,
                phoneRegionCode: 'BD',
                delimiter: '-',
            });
        })()
    }, [])

    return (
        <>
            <h1 className='text-center mb-3 display-5'>Register</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} md={6} className="mb-3" controlId='firstname'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" name="firstname" />
                    </Form.Group>
                    <Form.Group as={Col} md={6} className="mb-3" controlId='lastname'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Lirst name" name="lastname" />
                    </Form.Group>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Group controlId="nationality">
                                <Form.Check inline type="radio" label="Male" name="gender" value="male" id='male' />
                                <Form.Check inline type="radio" label="Female" name="gender" value="female" id='female' className='me-0' />
                            </Form.Group>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='dob'>Date of Birth</Form.Label>
                            <Form.Control type="tel" placeholder="DD-MM-YYYY" id="dob" name="dob" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="Nationality" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="address" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="1234 Main St" />
                    </Form.Group>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Email Address" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='phone'>Phone</Form.Label>
                            <Form.Control type="tel" placeholder="Phone" name='phone' id='phone' />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='admissionDate'>Admission Date</Form.Label>
                            <Form.Control type="tel" placeholder="DD-MM-YYYY" id="admissionDate" name="admissionDate" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='courses'>Courses</Form.Label>
                            <Form.Control type="text" placeholder="Courses" id="courses" name="courses" />
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
