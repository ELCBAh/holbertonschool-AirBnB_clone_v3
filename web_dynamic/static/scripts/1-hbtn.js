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
});
