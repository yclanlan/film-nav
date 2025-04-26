import { motion, AnimatePresence } from 'framer-motion';

export default function DislikedMovieView({ 

  dislikedMovies,
  setDislikedMovies
  
  }) {

    return(
    <motion.div 
          className="w-90/100 h-[70svh] overflow-y-auto "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          style={{maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 2%)' }}
        >
          {/* Disliked Movies -TITLE */}
          <h2 className=" sticky top-0 text-2xl font-bold mt-0 mb-6 py-6 px-4 text-red-400 bg-gray-500/40 backdrop-blur-lg mix-blend-screen"
          style={{maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 20%)' }}>
          Movies You're Not Interested In</h2>
          
          {dislikedMovies.length === 0 ? (
            <motion.div 
              className="text-center text-gray-400 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p>You haven't disliked any movies yet.</p>
              <p className="mt-4">Swipe left on movie details to add them to this list.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dislikedMovies.map((movie, idx) => (
                <motion.div 
                  key={movie.id} 
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg opacity-75"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.75, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-48 object-cover grayscale" 
                  />
                  <div className="p-4 flex flex-row place-content-between">
                  <div>
                    <h3 className="text-lg font-bold">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.year} · {movie.director}</p>
                  </div>
                    <div className="flex justify-between mt-4">
                      <motion.button 
                        onClick={() => {
                          setDislikedMovies(prev => prev.filter(m => m.id !== movie.id));
                        }}
                        className="text-red-400 hover:text-red-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

 
    

  


