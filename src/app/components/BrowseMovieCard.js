import {motion, AnimatePresence} from "framer-motion";

export default function BrowseMovieCard({
     movie 
    }) {

        return(
        <motion.div
        key={movie.id} >
            <div >
                <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" />
                
            </div>

        </motion.div>
        )};

