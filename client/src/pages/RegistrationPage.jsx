import Container from "react-bootstrap/Container"
import AppNavbar from "../components/common/AppNavbar"
import RegistrationForm from "../components/RegistrationForm"

const RegistrationPage = () => {
    return (
        <>
            <AppNavbar />
            <Container className='py-5'>
                <RegistrationForm action='register' />
            </Container>
        </>
    )
}

export default RegistrationPage
