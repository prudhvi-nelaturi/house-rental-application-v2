// document.addEventListener('DOMContentLoaded', function() {
//     const favoriteButtons = document.querySelectorAll('.add-favorites-btn');

//     favoriteButtons.forEach(button => {
//       button.addEventListener('click', function(event) {
//         const propertyId = event.target.getAttribute('data-property-id');
//         const property = searchResults.find(property => property._id === propertyId);

//         if (property.favouriteCount) {
//           property.favouriteCount--;
//         } else {
//           property.favouriteCount = 1;
//         }

//         // Update the UI
//         event.target.textContent = property.favouriteCount > 0? `Remove from Favorites (${property.favouriteCount})` : 'Add to Favorites';
//       });
//     });
//   });

// $(document).ready(function (e) {
//   $("#addToFav").click((e) => {
//     alert("hi");
//     e.preventDefault();
//     let propertyId = $("#propId").val();

//     $.ajax({
//       method: "GET",
//       url: `/search/addFavFromSearch/${propertyId}`,

//       success: function (resMsg) {
//         console.log(resMsg);
//         alert(resMsg);
//         // $("#addToFav").text("Remove Favorite");
//         // $("#addToFav").attr("id", "removeFav");
//         $("#addToFav").hide();
//         $("#removeFav").show();
//       },
//     });
//   });

//   $("#removeFav").click((e) => {
//     alert("hi");
//     e.preventDefault();
//     let propertyId = $("#propId").val();

//     $.ajax({
//       method: "GET",
//       url: `/search/removeFavFromSearch/${propertyId}`,

//       success: function (resMsg) {
//         console.log(resMsg);
//         alert(resMsg);
//         // $("#removeFav").text("Add Favorite");
//         // $("#removeFav").attr("id", "addToFav");
//         $("#addToFav").show();
//         $("#removeFav").hide();
//       },
//     });
//   });
// });
$(document).ready(function () {
  $(".card-content").on("click", "#addToFav", function (e) {
    e.preventDefault();
    let propertyId = $(this).closest(".card-content").find("#propId").val();
    let favoriteCountElement = $(this)
      .closest(".card-content")
      .find(".favorite-count");
    addToFavorite(propertyId, $(this), favoriteCountElement);
  });

  $(".card-content").on("click", "#removeFav", function (e) {
    e.preventDefault();
    let propertyId = $(this).closest(".card-content").find("#propId").val();
    let favoriteCountElement = $(this)
      .closest(".card-content")
      .find(".favorite-count");
    removeFromFavorite(propertyId, $(this), favoriteCountElement);
  });

  function addToFavorite(propertyId, addButton, favoriteCountElement) {
    $.ajax({
      method: "GET",
      url: `/search/addFavFromSearch/${propertyId}`,
      success: function (resMsg) {
        console.log(resMsg);
        addButton.hide();
        addButton.closest(".card-content").find("#removeFav").show();
        updateFavoriteCount(favoriteCountElement, true);
      },
    });
  }

  function removeFromFavorite(propertyId, removeButton, favoriteCountElement) {
    $.ajax({
      method: "GET",
      url: `/search/removeFavFromSearch/${propertyId}`,
      success: function (resMsg) {
        console.log(resMsg);
        removeButton.hide();
        removeButton.closest(".card-content").find("#addToFav").show();
        updateFavoriteCount(favoriteCountElement, false);
      },
    });
  }

  function updateFavoriteCount(favoriteCountElement, increment) {
    let currentCount =
      parseInt(favoriteCountElement.attr("data-favorite-count")) || 0;
    if (increment) {
      currentCount++;
    } else {
      currentCount--;
    }
    currentCount = Math.max(0, currentCount);
    favoriteCountElement.attr("data-favorite-count", currentCount);
    favoriteCountElement.text(
      currentCount + " user(s) added this property as their Favorite"
    );
  }
});
