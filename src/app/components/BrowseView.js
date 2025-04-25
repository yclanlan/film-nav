import { motion, AnimatePresence } from 'framer-motion';
import BrowseMovieCard from "./BrowseMovieCard"
import MovieDetail from "./MovieDetail";

export default function BrowseView({
    movies,
    selectedId,
    centerIndex,
    handleCardClick,
    selectedMovie,
    handleBack,
    swipeDirection,
    detailSwipeOffset,

    handleDetailTouchStart,
    handleDetailTouchMove,
    handleDetailTouchEnd,

    handleDetailMouseDown,  
    handleDetailMouseMove,
    handleDetailMouseUp,

    getDetailSwipeStyle,

    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,

    handleMouseDown,  
    handleMouseMove,
    handleMouseUp,

    getCardStyle,
    likedMovies,
    dislikedMovies,
    carouselRef,
    festivalTime

}) {
    return (

        <div className="w-full max-w-4xl">

            <motion.div 
            className="w-full flex flex-col items-center flex-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
            //   filter: selectedId ? "blur(4px)" : "blur(0px)",
              scale: selectedId ? 0.95 : 1
            }}
            transition={{ duration: 0.4 }}
          >

         {/* wrapper for touch/mouse swipe */}
            <div
            ref={carouselRef}
            className="relative w-full h-124 perspective-1000 flex items-center justify-center overflow-hidden m-auto pb-16"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* create a card for each movie in the movies array */}
            {movies.map((movie, index) => (
                <BrowseMovieCard 
                key={movie.id}
                movie={movie}
                index={index}
                centerIndex={centerIndex}
                getCardStyle={getCardStyle}
                handleCardClick={handleCardClick}
                />
            ))}

            </div>

            </motion.div>


            {selectedId && (
            <motion.div 
                className="fixed inset-0 z-50 flex items-top justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    handleBack();
                  }
                }}
              >
                <MovieDetail 
                  key={selectedMovie.id} 
                  movie={selectedMovie} 
                  swipeDirection={swipeDirection}
    
                  handleDetailTouchStart={handleDetailTouchStart}
                  handleDetailTouchMove={handleDetailTouchMove}
                  handleDetailTouchEnd={handleDetailTouchEnd}

                  handleDetailMouseDown={handleDetailMouseDown}  
                  handleDetailMouseMove={handleDetailMouseMove}
                  handleDetailMouseUp={handleDetailMouseUp}

                  swipeProps={getDetailSwipeStyle()}
                />

            </motion.div>
            )}



        </div>

    )
}