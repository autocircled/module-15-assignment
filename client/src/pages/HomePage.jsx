import StudentsTable from '../components/StudentsTable'
import AppNavbar from '../components/common/AppNavbar'
import Container from 'react-bootstrap/Container'

const HomePage = () => {
    return (
        <>
            <AppNavbar />
            <Container className='py-5'>
                <StudentsTable />
            </Container>
        </>
    )
}

export default HomePage
