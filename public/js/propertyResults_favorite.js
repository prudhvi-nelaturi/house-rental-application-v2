document.addEventListener('DOMContentLoaded', function() {
    const favoriteButtons = document.querySelectorAll('.add-favorites-btn');
  
    favoriteButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        const propertyId = event.target.getAttribute('data-property-id');
        const property = searchResults.find(property => property._id === propertyId);
  
        if (property.favouriteCount) {
          property.favouriteCount--;
        } else {
          property.favouriteCount = 1;
        }
  
        // Update the UI
        event.target.textContent = property.favouriteCount > 0? `Remove from Favorites (${property.favouriteCount})` : 'Add to Favorites';
      });
    });
  });