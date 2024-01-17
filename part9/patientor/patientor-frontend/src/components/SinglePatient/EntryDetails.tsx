import { Entry, HealthCheckRating } from "../../types";
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


//renders part data depending on kind of part
const EntryDetails = ({ entry }: { entry: Entry }) => {//prop is part and of object coursepart
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
                <div>
                    <p>{entry.date}<MedicalServicesIcon /></p>
                    <em>{entry.description}</em>
                    <p>{heartByHealth(entry.healthCheckRating)}</p>
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        case "OccupationalHealthcare"://if group, render project exercises etc..
            return (
                <div>
                    <p>{entry.date}<WorkIcon /> <em>{entry.employerName}</em></p>
                    <em>{entry.description}</em>
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        case "Hospital":
            return (<div>
                <p>{entry.date}<LocalHospitalIcon /></p>
                <em>{entry.description}</em>
                <p></p>
                <p>diagnose by {entry.specialist}</p>
            </div>
            );

        default://if unexpected value set never type
            return assertNever(entry);
    }

};

export default EntryDetails;