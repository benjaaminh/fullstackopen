import { useParams } from "react-router";
import { Gender, Patient } from "../../types";
import { Container } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
interface Props {
    patients: Patient[]
}

const genderToShow = (gender: Gender) => {
    if (gender=='male'){
        return <MaleIcon/>;
    }else if (gender=='female'){
        return <FemaleIcon/>;
    }else{
        return;
    }//return different icon depending on patient gender
};

const SinglePatient = ({patients}:Props) => {
    const id = useParams().id;
    const patient = patients.find(p => p.id === id);
    if (patient) {
        return (
            <Container>
            <h2>{patient.name} {genderToShow(patient.gender)}</h2>{/*render gendertoshow component which returns gender icon*/}
            <p>ssh: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            </Container>
        );
    }
};

export default SinglePatient;