import {motion, AnimatePresence} from "framer-motion";

export default function BrowseMovieCard({
     movie 
    }) {

        return(
        <motion.div
        key={movie.id} 
        className=" w-64 h-108 bg-gray-800 rounded-lg shadow-xl">
            <div >
                <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" />
                
            </div>

        </motion.div>
        )};

