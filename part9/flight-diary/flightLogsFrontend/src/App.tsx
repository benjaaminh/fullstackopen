import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import { getAllDiaries } from './services/diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map(diary =>
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>

      )}
    </div>
  )
}

export default App
