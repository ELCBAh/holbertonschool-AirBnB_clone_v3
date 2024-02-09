$(document).ready(function () {
  $('input[type="checkbox"]').click(function () {
    const amenityId = $(this).val();
    if ($(this).is(':checked')) {
      amenities.push(amenityId);
    } else {
      amenities = amenities.filter((id) => id !== amenityId);
    }
    const amenitiesList = amenities.join(', ');
    $('#amenities h4').text(amenitiesList);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
