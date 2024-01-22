import { Discharge, HealthCheckRating, NewEntry, SickLeave, Diagnosis } from "../types";

const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object' || !("type" in object)) {//type guard that checks that object exists and is of type object
        //we also need to check for type in object so switch case works
        throw new Error('Incorrect or missing data');
    }

    if (!("description" in object && "date" in object && "specialist" in object)) {
        throw new Error('Incorrect or missing data');
    }

    switch (object.type) {
        case "OccupationalHealthcare": {
            if ('employerName' in object && 'sickLeave' in object) {
                const newEntry: NewEntry = {
                    employerName: parseEmployer(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave),
                    date: parseDate(object.date),
                    description: parseDescription(object.description),
                    specialist: parseSpecialist(object.specialist),
                    type: object.type,
                    diagnosisCodes: parseDiagnosisCodes(object)
                };
                return newEntry;
            }
            else {
                throw new Error('Incorrect or missing data');
            }
        }
        case "Hospital": {
            if ('discharge' in object) {
                const newEntry: NewEntry = {
                    discharge: parseDischarge(object.discharge),
                    date: parseDate(object.date),
                    description: parseDescription(object.description),
                    specialist: parseSpecialist(object.specialist),
                    type: object.type,
                    diagnosisCodes: parseDiagnosisCodes(object)
                };
                return newEntry;
            } else {
                throw new Error('Incorrect or missing data');
            }
        }
        case "HealthCheck": {
            if ('healthCheckRating' in object) {
                const newEntry: NewEntry = {
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                    date: parseDate(object.date),
                    description: parseDescription(object.description),
                    specialist: parseSpecialist(object.specialist),
                    type: object.type,
                    diagnosisCodes: parseDiagnosisCodes(object)
                };
                return newEntry;
            } else {
                throw new Error('Incorrect or missing data');
            }
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

const isHealthCheckRating = (param: number): param is HealthCheckRating => {//checks from gender enum that the param is included in it
    //healthcheckrating is a number, so we need to map it as number
    return Object.values(HealthCheckRating).map(v => v as number).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing visibility: ' + rating);
    }
    return rating;
};

const isString = (text: unknown): text is string => {//type guard that checks if text is string
    return typeof text === 'string' || text instanceof String;//returns true or false
};

const isNumber = (number: unknown): number is number => {//type guard that checks if text is string
    return typeof number === 'number' || number instanceof Number;//returns true or false
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));//checks if input is of date object
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseDescription = (description: unknown): string => {
    if (!isString(description)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing description');
    }

    return description;
};
const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing specialist');
    }

    return specialist;
};
const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing criteria');
    }

    return criteria;
};
const parseEmployer = (employer: unknown): string => {
    if (!isString(employer)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing specialist');
    }

    return employer;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object' || !("startDate" in sickLeave) || !("endDate" in sickLeave)) {//sick leave is an interface
        throw new Error('Incorrect or missing sick leave');
    }
    const newSickLeave: SickLeave = {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate),
    };
    return newSickLeave;

};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || typeof discharge !== 'object' || !("date" in discharge) || !("criteria" in discharge)) {//sick leave is an interface
        throw new Error('Incorrect or missing sick leave');
    }
    const newDischarge: Discharge = {
        date: parseDate(discharge.date),
        criteria: parseCriteria(discharge.criteria),
    };
    return newDischarge;

};

export default toNewEntry;