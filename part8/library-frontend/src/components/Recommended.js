import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { USER } from '../queries'
const Recommended = ({ show, books }) => {
    const [favoriteGenre, setFavoriteGenre] = useState(null)
    const result = useQuery(USER)//get the logged in user


    useEffect(() => {
        if (result.data && result.data.me) {//if we find user
            const userFavoriteGenre = result.data.me.favoriteGenre//update favorite genre
            setFavoriteGenre(userFavoriteGenre)//set favorite genre
        }
    }, [result.data])//if data changes, update 

    const { data: genreData, loading: genreLoading, error: genreError } = useQuery(BOOKS_BY_GENRE, {
        variables: { genre: favoriteGenre },//variable which is favoriteGenre to display books by favorite genre of user
        skip: !favoriteGenre//skip query if favorite genre is null
    })//use query to get books by genre

    if (result.loading || genreLoading) {
        return <div>loading...</div>
    }//render loading if data is loading to prevent errors


    if (result.error || genreError) {//error logger
        console.error('Error fetching data:', result.error || genreError);
        return <div>Error fetching data</div>;
    }



    const genreBooks = genreData ? genreData.allBooks : [];
    //if genredata is null, then books are empty array, otherwise genredata.allbooks
    if (!show) {
        return null
    }


    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {genreBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}




export default Recommended
