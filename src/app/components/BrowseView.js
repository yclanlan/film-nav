import BrowseMovieCard from "./BrowseMovieCard"

export default function BrowseView({
    movies
}) {
    return (

        <div className="w-full max-w-4xl">

         {/* wrapper for touch/mouse swipe */}
            <div>

            {/* create a card for each movie in the movies array */}
            {movies.map((movie, index) => (
            <BrowseMovieCard 
            movie={movie}
            />
            ))}

            </div>
        </div>

    )
}