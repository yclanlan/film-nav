import {motion, AnimatePresence} from "framer-motion";

export default function BrowseMovieCard({
     movie,
     index,
     centerIndex, 
     getCardStyle,
     handleCardClick,
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
                
            </div>

        </motion.div>
        )};

