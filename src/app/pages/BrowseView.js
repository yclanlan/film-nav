import { motion, AnimatePresence } from 'framer-motion';
import BrowseMovieCard from "../components/BrowseMovieCard"
import MovieDetail from "../components/MovieDetailCard";

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

    getCardStyle,
    likedMovies,
    dislikedMovies,
    carouselRef,

}) {
    return (

        <div className="w-full max-w-4xl">

            <motion.div 
            className="w-full flex flex-col items-center flex-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              filter: selectedId ? "blur(4px)" : "blur(0px)",
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
                likedMovies={likedMovies}
                dislikedMovies={dislikedMovies}
                />
            ))}

            </div>

            </motion.div>



            {/* Movie detail overlay */}
            <AnimatePresence>
            {selectedId && (
            <motion.div 
                className="fixed inset-0 z-50 flex items-top justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  
                  // ++ I did a back ( <- ) button fisrt, and thought that we usually can leave card from clicking outside, so I asked what makes this happen to claude
                  // ++ answer: click inside will be seen as click on the element inside! so if clicked target === this whole div (the wrpper of contents), it means that you are not clicking on any content/element in the card.

                  console.log(e.target);
                  // ++ the reason why I need to see the "e.target"
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

                {/* Swipe indicators */}
                <AnimatePresence>
                  {swipeDirection === 'right' && detailSwipeOffset > 50 && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      // ++ most of animation learned on this page
                      // ++ https://motion.dev/docs/react-animation

                      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                      animate={{ opacity: 0.9, scale: 1, rotate: 12 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <div className="bg-green-500 bg-opacity-70 text-white text-5xl font-bold rounded-full p-8">
                        LIKE
                      </div>
                    </motion.div>
                  )}
                  {swipeDirection === 'left' && detailSwipeOffset < -50 && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                      animate={{ opacity: 0.9, scale: 1, rotate: -12 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <div className="bg-red-500 bg-opacity-70 text-white text-5xl font-bold rounded-full p-8">
                        NOPE
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </motion.div>
            
        )}
        </AnimatePresence>

        </div>

    )
}