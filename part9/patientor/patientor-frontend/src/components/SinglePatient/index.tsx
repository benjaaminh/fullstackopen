import { useParams } from "react-router";
import { Entry, Gender, Patient } from "../../types";
import { Container, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
interface Props {
    patients: Patient[]
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

const SinglePatient = ({ patients }: Props) => {
    const id = useParams().id;
    const patient = patients.find(p => p.id === id);
    if (patient) {
        return (
            <Container>
                <Typography variant="h4" style={{ paddingTop: "10px" }}>{/*typography changes text style with materialUI*/}
                    {patient.name} {genderToShow(patient.gender)}
                </Typography>{/*render gendertoshow component which returns gender icon*/}
                <p>ssh: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h2>entries</h2>
                {patient.entries.map((entry: Entry) => (//map patient entries
                    <div key={entry.id}>{entry.date} {entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map(code => (//map diagnosiscodes (if they exist) from entries (nested mapping)
                                <li>{code}</li>
                            ))}
                        </ul>
                    </div>
                )
                )}
            </Container>
        );
    }
};

export default SinglePatient;