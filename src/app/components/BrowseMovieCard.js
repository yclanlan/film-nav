import {motion, AnimatePresence} from "framer-motion";

export default function BrowseMovieCard({
     movie,
     index,
     getCardStyle,
    }) {

        return(
        <motion.div
        key={movie.id} 
        initial={getCardStyle(index)}
        animate={getCardStyle(index)}
        style={getCardStyle(index)}
        transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5 
      }}
        >
            <div className="w-full h-full overflow-hidden rounded-lg relative">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                
            </div>

        </motion.div>
        )};

