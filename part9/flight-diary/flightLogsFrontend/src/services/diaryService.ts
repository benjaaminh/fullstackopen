import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data);
};

export const createDiary = (object: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, object)
        .then(response => response.data);
};