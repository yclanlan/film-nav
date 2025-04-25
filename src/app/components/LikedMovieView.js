import { motion } from 'framer-motion';

export default function LikedMovieView({ 

    likedMovies,
    setLikedMovies
  
  }) {

    return(
        <motion.div 
            className="w-90/100 h-[70svh] overflow-y-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            style={{maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 2%)' }}
            >
            {/* Liked Movies -TITLE */}
            <h2 className="sticky top-0 text-2xl font-bold mt-0 mb-6 py-6 px-4 text-green-400 bg-gray-500/40 backdrop-blur-lg mix-blend-screen" 
            style={{maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 20%)'
             }}>
                Movies You Liked</h2>

            {likedMovies.length === 0 ? (
            <motion.div 
                className="text-center text-gray-400 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <p>You haven't liked any movies yet.</p>
                <p className="mt-4">Swipe right on movie details to add them to this list.</p>
            </motion.div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedMovies.map((movie, idx) => (
                <motion.div 
                    key={movie.id} 
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                >
                    <img 
                    src={movie.horizontalPoster} 
                    alt={movie.title} 
                    className="w-full h-40 object-cover" 
                    />
                    <div className="p-4 flex flex-row place-content-between">
                    <div>
                    <p className="text-lg font-bold">{movie.title}</p>
                    <p className="text-sm text-gray-400">{movie.year} · {movie.director}</p>
                    <p className="text-sm text-white bg-blue-500  py-1 px-1">{movie.festivalTime}</p>
                    </div>
                    <div className="flex justify-between mt-4 ">

                        <motion.button 
                        onClick={() => {
                            setLikedMovies(prev => prev.filter(m => m.id !== movie.id));
                        }}
                        className="text-red-400 hover:text-red-300 font-bold"
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
                )

  }


