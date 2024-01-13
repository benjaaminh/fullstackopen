import patients from '../../data/patients'
import { Patient, PatientWithoutSSN } from '../types'
const getPatients = ():Patient[] => {
    return patients;
};

const getPatientsWithoutSSN = ():PatientWithoutSSN[] => {
    return patients.map(({id,name,dateOfBirth,gender,occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export default{
    getPatients,
    getPatientsWithoutSSN
};