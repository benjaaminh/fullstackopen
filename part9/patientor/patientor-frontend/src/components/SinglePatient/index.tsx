import { useParams } from "react-router";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import { Container, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";
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
    const id = useParams().id;
    const patient = patients.find(p => p.id === id);
    const findDiagnosis = (code: string) => {//function to find diagnosis based on code parameter
        const diagnose = diagnoses.find(d => d.code === code)
        return diagnose?.name
    }
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
                    <div key={entry.id}>{entry.date}
                    <p>{entry.description}</p>
                        <ul>
                            {entry.diagnosisCodes?.map(code => (//map diagnosiscodes (if they exist) from entries (nested mapping)
                                <li>{code} {findDiagnosis(code=code)} {/*renders diagnosis name from code*/}</li>
                            ))}
                        </ul>
                        <p>diagnose by {entry.specialist}</p>

                        ENTRY DETAILS::
                        <EntryDetails entry={entry}/>
                        END
                    </div>
                )
                )}
            </Container>
        );
    }
};

export default SinglePatient;