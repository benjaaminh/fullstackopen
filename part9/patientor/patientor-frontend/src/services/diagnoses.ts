import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";


//get diagnosiscodes
const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};


export default {
  getAll
};

