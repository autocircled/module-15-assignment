import { useEffect, useState } from 'react'
import { DeleteStudentProfile, GetStudentsList } from '../Services/apiRequest'
import { Button, Modal } from 'react-bootstrap'
import { FaEdit, FaTrash } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { createPortal } from 'react-dom'
import Swal from 'sweetalert2'
import RegistrationForm from './RegistrationForm';
import SingleStudentProfile from './SingleStudentProfile';

const StudentsTable = () => {

    const [students, setStudents] = useState([])

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState([]); // [id, action]
    const modalClose = () => setShowModal(false);
    const modalShow = (id, action) => {
        setShowModal(true);
        console.log(id, action);
        setModalAction([id, action]); // [id, action);
    }

    // SweetAlert
    const [swalShown, setSwalShown] = useState(false)
    const showSwal = (id) => {
        Swal.fire({
            didOpen: () => setSwalShown(true),
            didClose: async () => {
                setSwalShown(false)
            },
            title: 'Do you want to delete it?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'delete-action',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                (async () => {
                    await DeleteStudentProfile({ '_id': id }).then(res => {

                        if (res) {
                            (async () => {
                                Swal.fire('Deleted!', '', 'success')
                                setStudents('')
                                const updatedData = await GetStudentsList();
                                setStudents(updatedData)
                            })()
                        }
                    });
                })()
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
                                <Button variant="outline-primary" className='me-2' onClick={() => modalShow(student._id, 'view')}><CiRead /></Button>
                                <Button variant="outline-info" className='me-2' onClick={() => modalShow(student._id, 'edit')} ><FaEdit /></Button>
                                <Button variant="outline-danger" onClick={() => showSwal(student._id)}><FaTrash /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <Modal show={showModal} onHide={modalClose}>
                <Modal.Header closeButton>
                    {modalAction[1] === 'edit' && <Modal.Title>Update Student Profile</Modal.Title>}
                    {modalAction[1] === 'view' && <Modal.Title>Student Details</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    {modalAction[1] === 'edit' && <RegistrationForm action='edit' id={modalAction[0]} />}
                    {modalAction[1] === 'view' && <SingleStudentProfile id={modalAction[0]} />}
                </Modal.Body>

            </Modal>

            {swalShown &&
                createPortal(
                    // <Link to="/register" onClick={() => Swal.close()}>
                    //     Go to Register
                    // </Link>,
                    <>
                        <button onClick={() => Swal.close()}>Go to Register</button>,
                        <p>Hello there</p>
                    </>,
                    Swal.getHtmlContainer()
                )
            }

        </div>
    )
}

export default StudentsTable
