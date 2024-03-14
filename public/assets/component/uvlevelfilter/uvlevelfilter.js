function filterMap(selectedLevel) {
    // Get the image element
    var mapImage = document.querySelector('.map-image');

    // Update the image source based on the selected UV level
    switch(selectedLevel) {
        case 'low':
            mapImage.src = '../images/uvmap.png';
            break;
        case 'moderate':
            mapImage.src = '../images/moderate.png';
            break;
        case 'high':
            mapImage.src = '../images/high_uv_level_image.png';
            break;
        case 'very high':
            mapImage.src = '../images/very_high_uv_level_image.png';
            break;
        case 'extreme':
            mapImage.src = '../images/extreme_uv_level_image.png';
            break;
        default:
            // For the default option or invalid option, set image source to an empty string or a placeholder image
            mapImage.src = '';
            break;
    }
}
