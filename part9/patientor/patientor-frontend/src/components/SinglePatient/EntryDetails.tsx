import { Entry, HealthCheckRating, Diagnosis } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const entryStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 0.7,
    marginBottom: 5,
    borderRadius: 10,
}



//renders part data depending on kind of part
const EntryDetails = ({ entry, diagnoses }: Props) => {
    const findDiagnosis = (code: string) => {//function to find diagnosis based on code parameter
        const diagnose = diagnoses.find(d => d.code === code)
        return diagnose?.name
    }

    const BaseDetails = ({ entry }: { entry: Entry }) => {
        const IconByType = (entry: Entry) => {
            switch (entry.type) {
                case "HealthCheck":
                    return (
                        <MedicalServicesIcon />
                    )
                case "OccupationalHealthcare":
                    return (
                        <div style={{display:"inline-block"}}><WorkIcon /> {entry.employerName}</div>
                    /*inline block so divs stay on same line*/
                        )
                case "Hospital":
                    return (
                        <LocalHospitalIcon />
                    )
            }
        }
        return (
            <div>
                <p>{entry.date} {IconByType(entry)}</p>
                <em>{entry.description}</em>
                <ul>
                    {entry.diagnosisCodes?.map(code => (//map diagnosiscodes (if they exist) from entries (nested mapping)
                        <li>{code} {findDiagnosis(code = code)} {/*renders diagnosis name from code*/}</li>
                    ))}
                </ul>
                <p>diagnose by {entry.specialist}</p>
            </div>
        )
    }

    switch (entry.type) {
        case "HealthCheck":
            const heartByHealth = (healthCheckRating: HealthCheckRating) => {
                if (healthCheckRating.toString() == "0") {
                    return <FavoriteIcon sx={{ color: "green" }} />
                } else if (healthCheckRating.toString() == "1") {
                    return <FavoriteIcon sx={{ color: "yellow" }} />
                } else if (healthCheckRating.toString() == "2") {
                    return <FavoriteIcon sx={{ color: "red" }} />
                } else {
                    return <FavoriteIcon />
                }
            }
            return (
                <div style={entryStyle}>
                    <BaseDetails entry={entry} />
                    <p>health status: {heartByHealth(entry.healthCheckRating)}</p>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div style={entryStyle}>
                    <BaseDetails entry={entry} />
                </div>
            );
        case "Hospital":
            return (<div style={entryStyle}>
                <BaseDetails entry={entry}/>
            </div>
            );

        default://if unexpected value set never type
            return assertNever(entry);
    }

};

export default EntryDetails;