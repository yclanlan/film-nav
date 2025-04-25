import { motion } from 'framer-motion';
export default function MovieDetail({ 
    movie, 
    swipeDirection,
    handleDetailTouchStart,
    handleDetailTouchMove,
    handleDetailTouchEnd,
    
    handleDetailMouseDown,  
    handleDetailMouseMove,
    handleDetailMouseUp,

    swipeProps  

}) 


// Class for swipe direction hints
{
const getCardBorderClass = () => {
  if (swipeDirection === 'right') return 'border-green-500';
  if (swipeDirection === 'left') return 'border-red-500';
  return 'border-transparent';
};


return (
  
    // Detail Card
    <div className="m-auto">
    <div className={`w-full -mt-4 items-center justify-center flex `}>

    {/* DetailCard - Body */}
    <motion.div
      className={`relative w-95/100 max-w-3xl -p-20 bg-gray-800/60 backdrop-blur-lg  rounded-xl shadow-2xl border-4 ${getCardBorderClass()}`}
      initial={{ opacity: 0, y: 100, scale: 0.8, x: 0  }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        x: swipeProps.x,          
        rotate: swipeProps.rotate, 
        opacity: swipeProps.opacity 
      }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ type: "spring", damping: 20 }}
    >
 
      <div className="flex flex-col md:flex-row overflow-y-scroll">
        <div className=" overflow-hidden w-full h-[70svh] mx-auto md:mx-0 rounded-tl-xl rounded-tr-xl ">
          {/* DetailCard - image */}
          <motion.div
            src={movie.horizontalPoster} 
            alt={movie.title} 
            className="h-[25svh] w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundImage: `url(${movie.horizontalPoster})`,
              maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0.5) 30%, rgba(0, 0, 0, 1) 60% )',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}

            onTouchStart={handleDetailTouchStart}
            onTouchMove={handleDetailTouchMove}
            onTouchEnd={handleDetailTouchEnd}

            onMouseDown={handleDetailMouseDown}  
            onMouseMove={handleDetailMouseMove}  
            onMouseUp={handleDetailMouseUp}      
            onMouseLeave={handleDetailMouseUp}
            {...swipeProps}
          />          

          {/* DetailCard - info */}
          <div className="p-4 m-0 w-full h-[45svh] overflow-y-scroll">
          {/* DetailCard - info- swipe area */}
          < div                
            onTouchStart={handleDetailTouchStart}
            onTouchMove={handleDetailTouchMove}
            onTouchEnd={handleDetailTouchEnd}

            onMouseDown={handleDetailMouseDown}  
            onMouseMove={handleDetailMouseMove}  
            onMouseUp={handleDetailMouseUp}      
            onMouseLeave={handleDetailMouseUp}

            {...swipeProps}>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {movie.title}
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {movie.year} · Director: {movie.director}
          </motion.p>
          
          {/* Rating and genres */}
          <motion.div 
            className="mb-4 flex flex-wrap items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >

            {movie.genres.map(genre => (
              <motion.span 
                key={genre} 
                className="bg-gray-700 px-2 py-1 rounded-full text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + movie.genres.indexOf(genre) * 0.1 }}
              >
                {genre}
              </motion.span>
            ))}
          </motion.div>
          </div>

          {/* DetailCard - info- scroll only area */}
          <motion.p 
            className="text-sm md:text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {movie.description}
          </motion.p>
          
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
          <h3 className="text-lg font-semibold mb-2">Movie Info</h3>
            <div className="grid grid-cols-2 gap-2 text-sm md:text-sm">
              <div>
                <p className="text-gray-400">Runtime</p>
                <p>{movie.runtime} minutes</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-gray-400">Box Office</p>
                <p>{movie.boxOffice}</p>
              </motion.div>
            </div>

          <div className="text-sm">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gray-400">Cast</p>
                <span className="w-full text-pretty "> {movie.actors}</span>
              </motion.div>

              <motion.div className="col-span-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-gray-400">Awards</p>
                <p>{movie.awards}</p>
              </motion.div>
          </div>
          </motion.div>


          </div>
          
        
        
        </div>
        

      </div>
    </motion.div>

    </div>

    </div>
  
);
}