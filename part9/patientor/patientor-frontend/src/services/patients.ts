import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

//functions for creating and getting patients and their entries

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: NewEntry, id: string)=>{
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, create, createEntry
};

