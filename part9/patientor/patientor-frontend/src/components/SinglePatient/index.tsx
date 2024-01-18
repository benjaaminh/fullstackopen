import { useParams } from "react-router";
import { Diagnosis, Entry, Gender, NewEntry, Patient } from "../../types";
import { Container, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";
import EntryForm from "../AddEntryModal/AddEntryForm";
import  patientService  from '../../services/patients'
import {  useState } from "react";
import axios from "axios";
import AddEntryModal from "../AddEntryModal";

interface Props {
    patients: Patient[];
    diagnoses: Diagnosis[];
}

const genderToShow = (gender: Gender) => {
    if (gender == 'male') {
        return <MaleIcon />;
    } else if (gender == 'female') {
        return <FemaleIcon />;
    } else {
        return;
    }//return different icon depending on patient gender
};


const SinglePatient = ({ patients, diagnoses }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
    const id = useParams().id;
    let patient = patients.find(p => p.id === id);
    const submitNewEntry = async (values: NewEntry) => {
        try {
            if (patient){
                const entry = await patientService.createEntry(values, patient.id);
                patient={...patient, entries:patient.entries.concat(entry)}
               // setModalOpen(false);
            }
         
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };
    if (patient) {
        return (
            <Container>
                <p>{error}</p>
                <Typography variant="h4" style={{ paddingTop: "10px" }}>{/*typography changes text style with materialUI*/}
                    {patient.name} {genderToShow(patient.gender)}
                </Typography>{/*render gendertoshow component which returns gender icon*/}
                <p>ssh: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <AddEntryModal onSubmit={submitNewEntry} onClose={closeModal} modalOpen={modalOpen} error={error}/>
                <h2>entries</h2>  
                {patient.entries.map((entry: Entry) => (//map patient entries
                    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>         
                )
                )}
            </Container>
        );
    }
};

export default SinglePatient;