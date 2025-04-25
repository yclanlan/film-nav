// data!

// === content ===
// 1. title( logo Bar )

// 2-1. main content ( carousel )
// touch/mouse swipe to change movie in list
// touch/mouse swipe in detail page

// 2-2. different views (like/dislike)
// map->() with state


// 3.tab bar (bottom) w 3 view 
// -> main: Browse + details
// -> 2 Lists (states) (like / dislike)

'use client';

import{ useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { movies } from "./data";
import BrowseView from "./BrowseView";
import LikedMovieView from "./LikedMovieView";
import DislikedMovieView from "./DislikedMovieView";

export default function MovieCarousel() {

    //State for the default/current movie index
    const [selectedId, setSelectedId] = useState(null);
    const [centerIndex, setCenterIndex] = useState(2);
    const [startX, setStartX] = useState(null);

    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [detailSwipeOffset, setDetailSwipeOffset] = useState(0);

    const [likedMovies, setLikedMovies] = useState([]);
    const [dislikedMovies, setDislikedMovies] = useState([]);

    const [activeTab, setActiveTab] = useState('browse'); // browse, liked, disliked
    const carouselRef = useRef(null);
    
    //carousel card position
    const getCardStyle = (index) => {
        const diff = index - centerIndex;

        //Arc
        const radius = 200; // Radius of the arc
        const angleStep = 15; // Angle step in degrees
        const angle = diff * angleStep; // Calculate the angle for the current card
        const angleRad=(angle * Math.PI) / 180; // Convert angle to radians

        // Calculate position on arc
        const xOffset = Math.sin(angleRad) * radius;
        const zOffset = (Math.cos(angleRad) * radius) - radius;
        const yOffset = Math.abs(diff) * 20; 
        const rotationY = angle;

        return {

            x: xOffset,
            y: yOffset,
            z: zOffset,
            rotateY: rotationY,
            opacity: Math.max(0.7, 1 - Math.abs(diff) * 0.15),

            zIndex:10-Math.abs(diff), 
            // Adjust zIndex based on the difference from the center index
        }
    }

    //handle card click
    const handleCardClick = (id,index) => {
        if(!isSwiping){
            if (index === centerIndex) {
                setSelectedId(id);
                // console.log("Selected Movie ID:", id);
            }else{
                setCenterIndex(index);
                // console.log("Selected Movie index:", index);
            }
        }
    };

    const handleBack = () => {
        setSelectedId(null);
        setSwipeDirection(null);
        setDetailSwipeOffset(0);
      };

// swipe style for the detail card
    const getDetailSwipeStyle = () => {
        const rotation = detailSwipeOffset / 10; // Convert offset to rotation angle
        const opacity = 1 - Math.min(0.5, Math.abs(detailSwipeOffset) / 300);
        
        return {
            x: detailSwipeOffset,
            rotate: rotation,
            opacity: opacity,
            transition: swipeDirection ? { duration: 0 } : { duration: 0.5 }
        };
    };


    // Handle movie like/dislike
    const handleLikeDislike = (movie, isLike) => {
        if (isLike) {
        setLikedMovies(prev => {
            if (!prev.some(m => m.id === movie.id)) {
            return [...prev, movie];
            }
            return prev;
        });
        setDislikedMovies(prev => prev.filter(m => m.id !== movie.id));
        } else {
        setDislikedMovies(prev => {
            if (!prev.some(m => m.id === movie.id)) {
            return [...prev, movie];
            }
            return prev;
        });
        setLikedMovies(prev => prev.filter(m => m.id !== movie.id));
        }
        setSelectedId(null);
        setSwipeDirection(null);
        setDetailSwipeOffset(0);
    };

    //handle swipe
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(false);
    }

    const handleTouchMove = (e) => {

        if (startX === null) return;
    
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        // If the user has moved their finger more than 10px, consider it a swipe
        if (Math.abs(diff) > 10) {
          setIsSwiping(true);
        }
    
    }
    
    const handleTouchEnd = (e) => {

        if (startX === null) return;
    
        const currentX = e.changedTouches[0].clientX;
        const diff = startX - currentX;
        
        // If swipe distance is significant, change the card
        if (Math.abs(diff) > 50) {
          // Swipe left (next card)
          if (diff > 0 && centerIndex < movies.length - 1) {
            setCenterIndex(centerIndex + 1);
          }
          // Swipe right (previous card)
          else if (diff < 0 && centerIndex > 0) {
            setCenterIndex(centerIndex - 1);
          }
        }
        
        setStartX(null);

    }

    // Touch/swipe handlers for detail view
    const handleDetailTouchStart = (e) => {
        if (e.touches) {
        setStartX(e.touches[0].clientX);
        } else {
        setStartX(e.clientX);
        }
        setSwipeDirection('start');
    };

    const handleDetailTouchMove = (e) => {
        if (startX === null) return;
        
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;
        
        setDetailSwipeOffset(diff);
        setSwipeDirection(diff > 0 ? 'right' : 'left');
        // console.log("Direction:", diff > 0 ? 'right' : 'left', "Offset:", diff);
    };

    const handleDetailTouchEnd = () => {
        if (startX === null) return;
        
        const threshold = 100; // Threshold to determine if swipe should trigger action
        
        if (detailSwipeOffset > threshold) {
        // Swiped right - like
        const selectedMovie = movies.find(m => m.id === selectedId);
        handleLikeDislike(selectedMovie, true);
        } else if (detailSwipeOffset < -threshold) {
        // Swiped left - dislike
        const selectedMovie = movies.find(m => m.id === selectedId);
        handleLikeDislike(selectedMovie, false);
        } else {
        // Reset if not swiped far enough
        setDetailSwipeOffset(0);
        setSwipeDirection(null);
        }
        
        setStartX(null);
    };



    // Mouse handlers for detail view
    const handleDetailMouseDown = (e) => {
        handleDetailTouchStart(e);
        
        // Add mouse move and up listeners
        document.addEventListener('mousemove', handleDetailMouseMove);
        document.addEventListener('mouseup', handleDetailMouseUp);
    };

    const handleDetailMouseMove = (e) => {
        handleDetailTouchMove(e);
    };

    const handleDetailMouseUp = () => {
        handleDetailTouchEnd();
        
        // Remove mouse move and up listeners
        document.removeEventListener('mousemove', handleDetailMouseMove);
        document.removeEventListener('mouseup', handleDetailMouseUp);

        setStartX(null);
    };



  const selectedMovie = selectedId ? movies.find(m => m.id === selectedId) : null;

    

return(
    // wrapper
<div className=" relative w-full h-dvh py-4 px-0 flex flex-col content-evenly justify-between items-center">

        {/* Background poster */}
        <div className="fixed inset-0 -z-4 h-dvh">
            <div className="absolute inset-0 bg-black bg-opacity-10" /> {/* Darkening overlay */}
        
            <AnimatePresence mode="wait">
            <motion.div 
            key={selectedId || centerIndex}
            className="absolute inset-0"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 0.2
            }}
            style={{
                backgroundImage: `url(${selectedId 
                ? movies.find(m => m.id === selectedId).poster 
                : movies[centerIndex].poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(16px) brightness(0.4)',
            }}
            />
        </AnimatePresence>
        </div>

        {/* logo bar */} 
        {/* FIXED CONTENT: so no need to wrap by AnimatePresence  */}
        <div className="w-full max-w-4xl text-center items-center justify-center">
        <motion.div 
        className="flex"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}
        >
            {/* svg */}
            <div className=" m-auto z-100"
            onClick={() => setActiveTab('browse')}>
                <svg fill="white" height="10dvh" id="圖層_1" data-name="圖層 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 305 78"><path d="M51,23.79c.15.77.2,1.48.35,8.93.07,5.79-2.08,8.31-8.53,9.56l-3.12.61.2,11-6,1.17-.63-34.15,8.55-1.66C47.32,18.16,50.23,19.74,51,23.79ZM39.41,25.46l.2,12.07,3-.58c2.1-.4,2.79-1,2.71-4.22-.06-5.46-.11-5.95-.2-6.44-.28-1.42-1.14-1.71-2.72-1.4Z"/><path d="M52.09,16.94l6-1.17.06,3.31-6,1.17Zm0,4.28,6-1.17.56,30.16-6,1.18Z"/><path d="M71.54,30.52a43.28,43.28,0,0,0-.19-5.3c-.3-1.54-1.36-1.84-3-1.52-2.19.42-2.94,1.54-2.87,5.35.18,10.43.26,11.09.36,11.62.37,1.86,1.37,2.25,3,1.93,2.19-.42,2.84-1.18,2.79-4.24-.06-1.38-.09-2.84-.08-3.85l6-1.18c0,1.14.06,2.89.06,4.45.14,6.53-2.17,9.37-8.28,10.56-5.35,1-8.6-.72-9.48-5.26-.17-.89-.26-1.76-.46-13.62-.17-6.9,2-10.27,8.36-11.5,5.31-1,8.58.47,9.41,4.73.14.68.23,1.38.29,6.67Z"/><path d="M78.31,12.14l6-1.18.34,18.18,5-15.23,6.41-1.24L90.5,29.19l6.26,13.63L90.65,44l-6-13.31L85,45.11l-6,1.17Z"/><path d="M119.94,32.13,116,45.5l-6.1-.72,9.8-32.72,15,1.78-1.79,6L124,18.76l-2.32,7.67,8.53,1-1.72,5.7Z"/><path d="M135.75,14l6.11.72-9.8,32.72L126,46.68Z"/><path d="M141.93,18.64l6.11.72-8.64,28.9-6.11-.72Zm1.27-4.09,6.11.72-.95,3.17-6.11-.72Z"/><path d="M157.6,33.41A47.78,47.78,0,0,0,159,28.3c.18-1.56-.75-2.16-2.38-2.36-2.22-.26-3.27.57-4.37,4.23-3,10-3.12,10.64-3.19,11.17-.22,1.89.62,2.57,2.3,2.77,2.21.26,3.06-.26,3.95-3.19.36-1.33.78-2.74,1.1-3.7l6.11.72c-.34,1.09-.83,2.77-1.3,4.26-1.86,6.26-4.92,8.27-11.11,7.54-5.41-.64-8-3.31-7.42-7.9.11-.9.29-1.75,3.71-13.11,1.94-6.63,5.07-9.17,11.46-8.42,5.37.64,8,3.07,7.53,7.37-.09.7-.21,1.39-1.76,6.45Z"/><path d="M169.65,18l6.11.72L170.54,36.1l9.43-13,6.48.77-10.39,14,1.82,14.89-6.19-.73-1.61-14.49L166,51.39l-6.11-.72Z"/><polygon points="19.22 67.34 23.34 51.82 29.12 53.35 27.4 59.83 96.72 47.61 97.76 53.5 19.22 67.34"/><polygon points="192.2 65.69 107.23 55 107.97 49.07 185.32 58.8 184.35 50.99 190.28 50.25 192.2 65.69"/><path d="M208.82,19.13h1.82l.08-.5c.53-2.9,1.7-3.92,4.63-3.92h3.25l-.5,3h-2c-.7,0-.91.23-1,.91l-.09.55h2.69l-.61,3.52h-2.7L211.6,38.57h-4.36L210,22.65h-1.81Z"/><path d="M218.66,17.49H223l-3.69,21.08H215Zm.56-3h4.36l-.41,2.31h-4.36Z"/><path d="M224.4,14.71h4.36l-4.18,23.86h-4.37Z"/><path d="M225.45,38.57l3.69-21.08h4.37l-1,5.74c.79-4.27,2.17-5.88,5-5.88s4,1.52,3.34,5.91c.9-4.51,2.34-5.91,5-5.91,2.82,0,4.1,1.66,3.31,6.2l-2.63,15h-4.37l2.49-14.23c.38-2.08-.06-2.75-1.55-2.75-1.32,0-2.05.67-2.49,3.13l-2.4,13.85h-4.39l2.52-14.23c.35-2.08-.06-2.72-1.58-2.72-1.29,0-2,.62-2.43,2.9l-2.46,14.05Z"/><path d="M208.82,46.13h1.82l.08-.5c.53-2.9,1.7-3.92,4.63-3.92h3.25l-.5,3h-2c-.7,0-.91.23-1,.91l-.09.55h2.69l-.61,3.52h-2.7L211.6,65.57h-4.36L210,49.65h-1.81Z"/><path d="M229.2,56.29h-8.69a36.53,36.53,0,0,0-.59,3.84c0,1.32.67,1.73,1.87,1.73,1.5,0,2.11-.38,2.43-2.2.12-.59.21-1.2.33-1.73h4.33c-.09.62-.26,1.53-.38,2.26-.7,4-2.69,5.53-7.09,5.53-3.89,0-5.91-1.7-5.91-4.95,0-.64.06-1.23,1.55-9.57.82-4.78,2.84-6.85,7.44-6.85,3.75,0,5.85,1.49,5.85,4.56C230.34,49.41,230.29,50,229.2,56.29ZM221.09,53h4.33c.44-2.75.5-3.07.5-3.39,0-1.09-.58-1.38-1.84-1.38-1.64,0-2.26.64-2.73,3.34C221.27,52.05,221.18,52.54,221.09,53Z"/><path d="M235.18,62.12c1.37,0,2.07-.41,2.34-1.82a20,20,0,0,0,.32-2.07c0-.77-.5-1.15-3-1.82-3.11-.94-4.16-2-4.16-4a19.88,19.88,0,0,1,.44-3.14c.58-3.45,2.69-4.94,6.82-4.94,3.81,0,5.77,1.31,5.77,4.15a24.83,24.83,0,0,1-.5,3.58h-4.25a23.29,23.29,0,0,0,.41-2.82c0-.93-.52-1.28-1.78-1.28-1.44,0-2.14.49-2.37,1.78a10.82,10.82,0,0,0-.27,1.85c0,.58.41,1,3.05,1.7,2.9.87,4.16,2,4.16,4.1a20.28,20.28,0,0,1-.47,3.42c-.68,3.66-2.7,4.89-6.8,4.89-3.86,0-5.85-1.2-5.85-4.13a24.79,24.79,0,0,1,.55-3.78h4.25a24.28,24.28,0,0,0-.47,3C233.33,61.74,233.86,62.12,235.18,62.12Z"/><path d="M242.5,65.57,245.57,48H244l.62-3.49h1.61l.41-2.4H251l-.44,2.4h2.37L252.34,48h-2.41l-3.1,17.59Z"/><path d="M253.45,44.49h4.36l-3.69,21.08h-4.36Zm.56-3h4.36L258,43.82H253.6Z"/><path d="M271.37,44.49,264.6,65.57h-6.88l.65-21.08h4.33l-1,17.89L267,44.49Z"/><path d="M277.08,60.16c-.73,4-2.05,5.56-4.86,5.56-2.64,0-3.9-1.29-3.9-4.1,0-.82.09-1.58,1.64-10.48.85-4.83,2.29-6.79,5.6-6.79,2.75,0,3.89,1.52,3.34,5.5l.93-5.36h4.37l-3.69,21.08h-4.4Zm-2.84-8.32C273,59,272.89,59.57,272.89,60c0,1.44.68,1.87,1.88,1.87,1.43,0,2.08-.49,2.46-2.69,1.58-9,1.64-9.4,1.64-9.78,0-1-.56-1.29-1.73-1.29C275.56,48.15,274.77,48.77,274.24,51.84Z"/><path d="M285.54,41.71h4.37l-4.19,23.86h-4.36Z"/></svg>
            </div>

        </motion.div>
        </div>

  

        {/* Browse View */}
        {activeTab === 'browse' && (
        <BrowseView
        movies={movies}
        selectedId={selectedId}
        centerIndex={centerIndex}
        selectedMovie={selectedMovie}

        handleBack={handleBack}
        getCardStyle={getCardStyle}

        handleCardClick={handleCardClick}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}

        swipeDirection={swipeDirection}
        getDetailSwipeStyle={getDetailSwipeStyle}
        detailSwipeOffset={detailSwipeOffset}
        likedMovies={likedMovies}
        dislikedMovies={dislikedMovies}

        handleDetailTouchStart={handleDetailTouchStart}
        handleDetailTouchMove={handleDetailTouchMove}
        handleDetailTouchEnd={handleDetailTouchEnd}

        handleDetailMouseDown={handleDetailMouseDown}  
        handleDetailMouseMove= {handleDetailMouseMove}
        handleDetailMouseUp={handleDetailMouseUp}

        carouselRef={carouselRef}
        />
        )}

        {/* Liked Movies View */}
        <AnimatePresence>
        {activeTab === 'liked' && (
                <LikedMovieView
                likedMovies={likedMovies}
                setLikedMovies={setLikedMovies} 
                />
            )}
        </AnimatePresence>
    


        {/* Disliked Movies View */}
        <AnimatePresence>
        {activeTab === 'disliked' && (
                <DislikedMovieView
                dislikedMovies={dislikedMovies}
                setDislikedMovies={setDislikedMovies} 
                />
        )}
        </AnimatePresence>




    {/* Bottom Button Bar */}
    <div className="w-full max-w-4xl z-100">
      {/* Tabs for Browse/Liked/Disliked */}
      <motion.div 
        className="fixed flex bottom-0 w-full h-12 max-w-4xl  gap-2 m-auto "
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* tab1 */}
        <motion.button 
          onClick={() => setActiveTab('disliked')}
          className={`flex-1 py-2 rounded-t-lg font-bold text-sm ${activeTab === 'disliked' ? 'bg-red-600' : 'bg-gray-700'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Disliked ({dislikedMovies.length})
        </motion.button>
        {/* tab2 */}
        <motion.button 
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-2 rounded-t-lg font-bold text-sm ${activeTab === 'browse' ? 'bg-blue-600' : 'bg-gray-700'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse
        </motion.button>
        {/* tab3 */}
        <motion.button 
          onClick={() => setActiveTab('liked')}
          className={`flex-1 py-2 rounded-t-lg font-bold text-sm ${activeTab === 'liked' ? 'bg-green-600' : 'bg-gray-700'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Liked ({likedMovies.length})
        </motion.button>
  
      </motion.div>
      </div>
       
    </div>
)
}