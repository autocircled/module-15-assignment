import { useEffect, useState } from 'react'
import { GetStudentsList } from '../Services/apiRequest'
import { Button } from 'react-bootstrap'

const StudentsTable = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        (async () => {
            const res = await GetStudentsList();
            if (res) {
                setStudents(res);
            }
        })()
    }, [])

    if (students.length === 0) {
        return (
            <div className='text-center'>
                <span className='spinner-border me-2 align-middle '></span>
            </div>
        )
    }

    return (
        <div className='students-list'>
            <h1 className='text-center mb-3 display-5'>All Our Members</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index.toString()}>
                            <th scope="row">{index + 1}</th>
                            <td>{`${student.firstName} ${student.lastName}`}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.address}</td>
                            <td className='d-flex justify-content-center'>
                                <Button variant="outline-primary">Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default StudentsTable
