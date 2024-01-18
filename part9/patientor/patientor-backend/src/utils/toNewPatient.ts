import { NewPatient } from '../types';
import { Gender } from '../types';
const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {//type guard that checks that object exists and is of type object
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {//second type guard that checks all fields are included
      const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDOB(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
        entries: []//entries is just an empty array on creation
      };
  
      return newPatient;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };

const isGender = (param: string): param is Gender => {//checks from gender enum that the param is included in it
    //we need to map the object as string to be able to check
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if ( !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing visibility: ' + gender);
    }
    return gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));//checks if input is of date object
};

const parseDOB = (dob: unknown): string => {
    if (!isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing date: ' + dob);
    }
    return dob;
};
const parseName = (name: unknown): string => {
    if ( !isString(name)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing comment');
    }

    return name;
};
const parseOccupation = (occupation: unknown): string => {
    if ( !isString(occupation)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing comment');
    }

    return occupation;
};

const parseSSN = (ssn: unknown): string => {
    if ( !isString(ssn)) {//checks if primitive string or string Object
        throw new Error('Incorrect or missing comment');
    }

    return ssn;
};
const isString = (text: unknown): text is string => {//type guard that checks if text is string
    return typeof text === 'string' || text instanceof String;//returns true or false
};



export default toNewPatient;