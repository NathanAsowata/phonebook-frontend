/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = `http://localhost:8080/api/persons`

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const newPerson = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const updatePerson = (id, updatedObject) => {
    const req = axios.put(`${baseUrl}/${id}`, updatedObject)
    return req.then(res => res.data)
}

export default { getAll, newPerson, deletePerson, updatePerson }