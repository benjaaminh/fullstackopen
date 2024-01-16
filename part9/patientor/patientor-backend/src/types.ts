export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;//latin is optional
}

export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;//patient without ssn included

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;//patient without ssn included

export type NewPatient = Omit<Patient, 'id'>;//patient without id, since uuid generates it for us