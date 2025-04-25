import BrowseMovieCard from "./BrowseMovieCard"

export default function BrowseView({
    movies,
    selectedId,
    centerIndex,
    selectedMovie,
    carouseRef,
    getCardStyle,
}) {
    return (

        <div className="w-full max-w-4xl">

         {/* wrapper for touch/mouse swipe */}
            <div
            ref={carouseRef}
            className="relative w-full h-124 perspective-1000 flex items-center justify-center overflow-hidden m-auto pb-16">

            {/* create a card for each movie in the movies array */}
            {movies.map((movie, index) => (
            <BrowseMovieCard 
            key={movie.id}
            movie={movie}
            getCardStyle={getCardStyle}
            />
            ))}

            </div>
        </div>

    )
}