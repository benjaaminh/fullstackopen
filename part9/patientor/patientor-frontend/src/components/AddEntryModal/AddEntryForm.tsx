import { Entry, NewEntry, Patient } from "../../types"
import { useState } from "react";


interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}
const AddEntryForm = ({ onSubmit, onCancel }: Props ) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [employerName, setEmployerName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dischargeDate, setDischargeDate] = useState('')
    const [criteria, setCriteria] = useState('')
    const [entries, setEntries] = useState<Entry[]>([])
    const [error, setError] = useState('');
    const [diagnosisCodes, setDiagnosiscodes]= useState<string[]>([])
    const [type, setType]=useState('')
    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let entrytoAdd: NewEntry

        const baseEntry = {
            specialist: specialist,
            date: date,
            description: description,
            diagnosisCodes: diagnosisCodes
        }
        switch (type) {
            case "Hospital":
                onSubmit( {
                    type: "Hospital",
                    ...baseEntry,
                    discharge:{
                        date: dischargeDate,
                        criteria: criteria
                    }
                });
                break;
            case "OccupationalHealthcare":
                onSubmit( {
                    type:"OccupationalHealthcare",
                    ...baseEntry,
                    employerName: employerName,
                    sickLeave:{
                        startDate: startDate,
                        endDate: endDate
                    }
                });
                break;
            case "HealthCheck":
                onSubmit(entrytoAdd = {
                    type:"HealthCheck",
                    ...baseEntry,
                    healthCheckRating: healthCheckRating
                });
        }
    }

        return (
            <div>
                <form onSubmit={entryCreation}>
                    <div>
                        ELO
                        description <input onChange={(event) => setDescription(event.target.value)} />
                        Date <input onChange={(event) => setDate(event.target.value)} />
                        specialist <input onChange={(event) => setSpecialist(event.target.value)} />
                    </div>
                    <button type="submit">add</button>

                </form>
            </div>
        )
    }



    export default AddEntryForm;