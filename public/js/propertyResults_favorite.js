$('.favorite-icon').click(function() {
    $(this).toggleClass('active');

    const isFavorite = $(this).hasClass('active');
    const propertyIndex = $(this).closest('.card').index();
    if(isFavorite) searchResults[propertyIndex].favoriteCount++;
    else searchResults[propertyIndex].favoriteCount--;

    $(this).closest('.card').find('.property-details .favorite-count').text(searchResults[propertyIndex].favoriteCount);
});