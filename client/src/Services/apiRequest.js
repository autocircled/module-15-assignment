import axios from 'axios';

export const GetStudentsList = () => {
    const EndPoint = 'http://localhost:5000/api/v1/students-list/';
    return axios.get(EndPoint).then((res) => {
        if (res.status === 200) {
            return res.data['data'];
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err)
        return false;
    });
}
export const GetStudentByID = (id) => {
    const EndPoint = 'http://localhost:5000/api/v1/student/' + id;
    return axios.get(EndPoint).then((res) => {
        if (res.status === 200) {
            return res.data['data'];
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err)
        return false;
    });
}

export const CreateStudentProfile = (postBody) => {
    const EndPoint = 'http://localhost:5000/api/v1/create-profile/';
    return axios.post(EndPoint, postBody).then((res) => {
        if (res.status === 200) {
            return res.data['data'];
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err)
        return false;
    });
}

export const UpdateStudentProfile = (postBody, id) => {
    const EndPoint = 'http://localhost:5000/api/v1/update-profile/' + id;
    return axios.post(EndPoint, postBody).then((res) => {
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err)
        return false;
    });
}

export const DeleteStudentProfile = (postBody) => {
    // console.log(postBody);
    // return;
    const EndPoint = 'http://localhost:5000/api/v1/delete-profile/';
    return axios.post(EndPoint, postBody).then((res) => {
        if (res.status === 200) {
            return res.data['data'];
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err)
        return false;
    });
}