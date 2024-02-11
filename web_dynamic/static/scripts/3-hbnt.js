$(document).ready(function() {

    $('input[type="checkbox"]').click(function() {
        const amenityId = $(this).val();
        if ($(this).is(':checked')) {
            amenities.push(amenityId);
        } else {
            amenities = amenities.filter((id) => id !== amenityId);
        }
        const amenitiesList = amenities.join(', ');
        $('#amenities h4').text(amenitiesList);
    });


    $.ajax({
        method: "GET",
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function(data) {
            if (data.status === 'OK') {
                $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        },
    });


    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: "POST",
        contentType: 'application/json',
        body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(function(place) {
            var article = $('<article>');
            article.append('<h2>' + place.name + '</h2>');
            article.append('<p>' + place.price_by_night + '</p>');
            article.append('<p>' + place.description + '<p>');
            article.append('<p>' + place.max_guest + '<p>');
            article.append('<p>' + place.number_rooms + ' Bedrooms' + '<p>');
            article.append('<p>' + place.number_bathrooms + ' Bathrooms' + '<p>');
            $('section.places').append(article);
        });
    })
});
