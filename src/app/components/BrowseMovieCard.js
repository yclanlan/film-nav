import {motion, AnimatePresence} from "framer-motion";

export default function BrowseMovieCard({
     movie,
     index,
     centerIndex, 
     getCardStyle,
     handleCardClick,
     likedMovies,
     dislikedMovies,
    }) {

        return(
    <motion.div
        key={movie.id} 
        className="absolute w-64 h-108 bg-gray-800 rounded-lg shadow-xl cursor-pointer"
        initial={getCardStyle(index)}
        animate={getCardStyle(index)}
        style={getCardStyle(index)}
        transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5 
            }}
            onClick={() => handleCardClick(movie.id, index)}
            whileHover={{ scale: index === centerIndex ? 1.05 : 1 }}
        >
            <div className="w-full h-full overflow-hidden rounded-lg relative">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex flex-row justify-between items-center mb-2">
                <p className="text-xl font-bold text-white">{movie.title}</p>
                <p className="text-sm text-white">{movie.year}</p>
                 </div>
                <p className="text-sm bg-blue-500 px-6 py-2 text-center">{movie.festivalTime} </p>
  

                    
          {/* Show status badges if liked/disliked */}
          <AnimatePresence>
            {likedMovies.some(m => m.id === movie.id) && (
              <motion.span 
                className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                Liked
              </motion.span>
            )}

            {dislikedMovies.some(m => m.id === movie.id) && (
              <motion.span 
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                Not Interested
              </motion.span>
            )}
          </AnimatePresence>


        </div>
            </div>

    </motion.div>
)};

