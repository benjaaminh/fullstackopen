import { NewEntry, Types, Diagnosis, HealthCheckRating } from "../../types";
import { useState, SyntheticEvent } from "react";
import { TextField, Button, Grid, InputLabel, Select, SelectChangeEvent, MenuItem, Typography } from "@mui/material";

interface Props {
    onCancel: () => void;
    onSubmit: (values: NewEntry) => void;
    diagnoses: Diagnosis[];
}


interface TypeOption {
    value: Types;
    label: string;
}

interface HealthCheckOption {
    value: HealthCheckRating;
    label: string;
}

//healthcheckratings are numbers, so we need to specify them so
const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating).filter((value) => typeof value === "number")//value should be number
    .map((v) => ({
        value: v as number,
        label: HealthCheckRating[v as number],//take the string values as label
    }));
const typeOptions: TypeOption[] = Object.values(Types).map(v => ({
    value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {//copied from addpatientform
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [employerName, setEmployerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');
    const [diagnosisCodes, setDiagnosiscodes] = useState<Array<Diagnosis["code"]>>([]);
    const [diagnosisType, setDiagnosisType] = useState('');

    const entryCreation = (event: SyntheticEvent) => {
        event.preventDefault();
        const baseEntry = {//base data for all entries
            specialist,
            date,
            description,
            diagnosisCodes,
        };
        switch (diagnosisType) {//depending on type
            case "Hospital":
                onSubmit({
                    type: "Hospital",
                    ...baseEntry,
                    discharge: {
                        date: dischargeDate,
                        criteria: criteria
                    }
                });
                break;
            case "Occupational healthcare":
                onSubmit({
                    type: "OccupationalHealthcare",
                    ...baseEntry,
                    employerName: employerName,
                    sickLeave: {
                        startDate: startDate,
                        endDate: endDate
                    }
                });
                break;
            case "Health check":
                onSubmit({
                    type: "HealthCheck",
                    ...baseEntry,
                    healthCheckRating: healthCheckRating
                });
        }
    };

    const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
        event.preventDefault();
        if (typeof event.target.value === "string") {
            setDiagnosiscodes(event.target.value.split(', '));//split diagnosis codes with a comma inbetween
        } else {
            setDiagnosiscodes(event.target.value);
        }
    };
    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {//label is still string, so the event takes string as param
        event.preventDefault();

        if (typeof event.target.value === "number") {//value should be number
            const value = Number(event.target.value);//the value of the healthcheckrating
            const healthCheckRating = Object.values(HealthCheckRating);//array of values
            if (healthCheckRating) {
                setHealthCheckRating(value);
            }
        }
    };

    return (
        <div>
            <Typography component="h5" variant="h5">New Entry</Typography>
            <InputLabel style={{ marginTop: 20 }}>Entry Options</InputLabel>
            <Select
                label="Option"
                fullWidth
                value={diagnosisType}
                onChange={({ target }) => setDiagnosisType(target.value)}//outside the form
            >
                {typeOptions.map(option =>
                    <MenuItem
                        key={option.label}
                        value={option.value}
                    >
                        {option.label
                        }</MenuItem>
                )}
            </Select>
            <form onSubmit={entryCreation}>
                <TextField
                    label="description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
                <TextField
                    fullWidth
                    type="date"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <Select
                    label="diagnosis codes"
                    fullWidth
                    multiple
                    value={diagnosisCodes}
                    onChange={onDiagnosisCodesChange}
                >
                    {diagnoses.map(diag =>
                        <MenuItem
                            key={diag.code}
                            value={diag.code}
                        >
                            {diag.code
                            }</MenuItem>
                    )}
                </Select>
                {diagnosisType === "Health check" &&
                    <Select
                        label="health check"
                        fullWidth
                        type="number"
                        value={healthCheckRating.toString()}
                        onChange={onHealthCheckRatingChange}
                    >
                        {healthCheckOptions.map(option =>
                            <MenuItem
                                key={option.label}
                                value={option.value}
                            >
                                {option.label
                                }</MenuItem>
                        )}
                    </Select>

                }
                {diagnosisType === "Hospital" &&
                    <div>
                        <InputLabel style={{ marginTop: 10 }}>Discharge date</InputLabel>
                        <TextField
                            fullWidth
                            type="date"
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                        />
                        <TextField
                            label="Discharge criteria"
                            fullWidth
                            value={criteria}
                            onChange={({ target }) => setCriteria(target.value)}
                        />
                    </div>
                }
                {diagnosisType === "Occupational healthcare" &&
                    <div>
                        <InputLabel style={{ marginTop: 15 }}>Sick leave</InputLabel>
                        <InputLabel style={{ marginTop: 5 }}>Start date</InputLabel>
                        <TextField
                            fullWidth
                            type="date"
                            value={startDate}
                            onChange={({ target }) => setStartDate(target.value)}
                        />
                        <InputLabel style={{ marginTop: 5 }}>End date</InputLabel>
                        <TextField
                            fullWidth
                            type="date"
                            value={endDate}
                            onChange={({ target }) => setEndDate(target.value)}
                        />
                        <TextField
                            label="Employer name"
                            fullWidth
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                        />
                    </div>
                }
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </div>
    );
};



export default AddEntryForm;