  // Touch/swipe handlers for detail view
  export const handleDetailTouchStart = (e) => {
    if (e.touches) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
    setSwipeDirection('start');
  };

  export const handleDetailTouchMove = (e) => {
    if (startX === null) return;
    
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    
    setDetailSwipeOffset(diff);
    setSwipeDirection(diff > 0 ? 'right' : 'left');
  };

  export const handleDetailTouchEnd = () => {
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
  export const handleDetailMouseDown = (e) => {
    handleDetailTouchStart(e);
      
      // Add mouse move and up listeners
      document.addEventListener('mousemove', handleDetailMouseMove);
      document.addEventListener('mouseup', handleDetailMouseUp);
  };

  export const handleDetailMouseMove = (e) => {
    handleDetailTouchMove(e);
  };

  export const handleDetailMouseUp = () => {
    handleDetailTouchEnd();
      
    // Remove mouse move and up listeners
    document.removeEventListener('mousemove', handleDetailMouseMove);
    document.removeEventListener('mouseup', handleDetailMouseUp);

    setStartX(null);
  };