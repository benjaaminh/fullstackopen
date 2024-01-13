export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;//latin is optional
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;//patient without ssn included