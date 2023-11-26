import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { GetStudentByID } from '../Services/apiRequest'
import PropTypes from 'prop-types'

const SingleStudentProfile = (props) => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        (async () => {
            const result = await GetStudentByID(props.id)
            setUserData(result)
        })()

        return () => {
            setUserData({})
        }
    }, [props])

    if (Object.keys(userData).length === 0) {
        return (
            <div className='text-center'>
                <span className='spinner-border me-2 align-middle'></span>
            </div>
        )
    }
    return (
        <Table>
            <tbody>
                {Object.keys(userData).map((key, index) => (
                    <tr key={index}>
                        <th>{key}</th>
                        <td>{userData[key]}</td>
                    </tr>
                ))}
            </tbody>

        </Table>
    )
}

SingleStudentProfile.propTypes = {
    id: PropTypes.string
}

export default SingleStudentProfile
