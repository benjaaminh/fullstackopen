import { useEffect, useState } from 'react';
import { DiaryEntry, Weather, Visibility } from './types';
import { createDiary, getAllDiaries } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');
  //all fields of diaryentry get a state for creating a new diary entry
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: date,
      weather: weather as Weather,//assert type as weather from string
      visibility: visibility as Visibility,
      comment: comment,
    };//diarytoAdd is of newDiaryEntry object

    createDiary(diaryToAdd).then(data => {//use creatediary from diaryservices which takes in newdiaryentry object
      setDiaries(diaries.concat(data));
      setDate('');
      setComment('');
      setWeather('');
      setVisibility('');
    }).catch(error => setError(error.response.data));//use error.response.data to get error reason
  };//by putting catch block here, and not in backend, we are sure that object is returned here as DiaryEntry



  return (
    <div>
      <p style={{ color: 'red' }}>{error}</p>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          weather
          sunny<input type="radio" name="weather" value="sunny" onChange={(event) => setWeather(event.target.value)} />
          rainy<input type="radio" name="weather" value="rainy" onChange={(event) => setWeather(event.target.value)} />
          cloudy<input type="radio" name="weather" value="cloudy" onChange={(event) => setWeather(event.target.value)} />
          stormy<input type="radio" name="weather"value="stormy" onChange={(event) => setWeather(event.target.value)} />
          windy<input type="radio" name="weather" value="windy" onChange={(event) => setWeather(event.target.value)} />
        </div>
        <div> {/*name property forms button group, so only one option can be selected at a time*/}
          visibility
          great<input type="radio" name="visibility" value="great" onChange={(event) => setVisibility(event.target.value)} />
          good<input type="radio" name="visibility" value="good" onChange={(event) => setVisibility(event.target.value)} />
          ok<input type="radio" name="visibility" value="ok" onChange={(event) => setVisibility(event.target.value)} />
          poor<input type="radio" name="visibility" value="poor" onChange={(event) => setVisibility(event.target.value)} />
        </div>
        <div>
          comment<input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(diary =>//mapping the diaries 
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;
