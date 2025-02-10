import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (personWithNewNumber) => {
    return axios.put(`${baseUrl}/${personWithNewNumber.id}`, personWithNewNumber)
}

export default { getAll, create, remove, updateNumber }