import { useEffect, useState } from 'react'
import { GetStudentsList } from '../Services/apiRequest'
import { Button, Modal } from 'react-bootstrap'
import { FaEdit, FaTrash } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const StudentsTable = () => {

    const [students, setStudents] = useState([])

    // Modal
    const [showModal, setShowModal] = useState(false);
    const modalClose = () => setShowModal(false);
    const modalShow = () => setShowModal(true);

    // SweetAlert
    const [swalShown, setSwalShown] = useState(false)
    const showSwal = () => {
        Swal.fire({
            didOpen: () => setSwalShown(true),
            didClose: () => setSwalShown(false),
            title: 'Do you want to delete it?',
            // showClass: {
            //     popup: 'animate__animated animate__fadeInDown'
            // },
            // hideClass: {
            //     popup: 'animate__animated animate__fadeOutUp'
            // },
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
            } else if (result.isDenied) {
                setSwalShown(false)
            }
        })
    }

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
            <table className="table table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index.toString()}>
                            <th scope="row">{index + 1}</th>
                            <td>{`${student.firstName} ${student.lastName}`}</td>
                            <td>{student.address}</td>
                            <td className='d-flex justify-content-center'>
                                <Button variant="outline-primary" className='me-2' onClick={modalShow}><CiRead /></Button>
                                <Button variant="outline-info" className='me-2' onClick={modalShow} ><FaEdit /></Button>
                                <Button variant="outline-danger" onClick={showSwal}><FaTrash /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={modalClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {swalShown &&
                createPortal(
                    // <Link to="/register" onClick={() => Swal.close()}>
                    //     Go to Register
                    // </Link>,
                    <>
                        <button onClick={() => alert("Deleted")}>Go to Register</button>,
                        <p>Hello there</p>
                    </>,
                    Swal.getHtmlContainer()
                )
            }

        </div>
    )
}

export default StudentsTable
