import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());//to get ssn when viewing single patient
});

router.get('/:id',(req,res)=> {
    const patient = patientService.findById(req.params.id);
    if (patient){
        res.send(patient);
    }else{
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);//tonewpatient takes unknown type and changes it to newpatient type
        const addedPatient = patientService.addPatient(newPatient);//patientservice changes newpatient to patient
        res.json(addedPatient);
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error:' + error.message;
        }
        res.status(400).send(errorMessage);
    }

});

export default router;