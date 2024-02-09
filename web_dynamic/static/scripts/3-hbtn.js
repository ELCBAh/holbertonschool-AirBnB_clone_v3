$(document).ready(function () {
    // Event handler for checkbox clicks
    $('input[type="checkbox"]').click(function () {
        const amenityId = $(this).data('id');
        if ($(this).is(':checked')) {
            amenities.push(amenityId);
        } else {
            amenities = amenities.filter((id) => id !== amenityId);
        }
        const amenitiesList = amenities.join(', ');
        $('#amenities h4').text(amenitiesList);
    });

    // Check API status and update UI
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {

            data.forEach(function (place) {
                const article = $('<article>');
                const titleBox = $('<div class="title_box">').append($('<h2>').text(place.name)).append($('<div class="price_by_night">').text('$' + place.price_by_night));
                const information = $('<div class="information">').append($('<div class="max_guest">').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''))).append($('<div class="number_rooms">').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''))).append($('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
                const description = $('<div class="description">').html(place.description);
                article.append(titleBox).append(information).append(description);
                $('.places').append(article);
            });
        }
    });
});
