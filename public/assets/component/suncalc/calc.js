function calculateSunscreen() {
    const uvLevel = parseInt(document.getElementById('uv-level').value);
    let sunscreenRecommendation = '';
 
    if (uvLevel >= 1 && uvLevel <= 2) {
        sunscreenRecommendation = 'Use SPF 15+ sunscreen.';
    } else if (uvLevel >= 3 && uvLevel <= 5) {
        sunscreenRecommendation = '<li>Use SPF 30+ sunscreen.</li> <li>wear protective clothing</li><li> a wide-brimmed hat</li><li> wear sunglasses.</li>';
    } else if (uvLevel >= 6 && uvLevel <= 7) {
        sunscreenRecommendation = '<li>Use SPF 30+ sunscreen</li><li> wear protective clothing</li><li>a wide-brimmed hat</li><li>wear sunglasses.</li>';
    } else if (uvLevel >= 8 && uvLevel <= 10) {
        sunscreenRecommendation = '<li>Use SPF 30+ sunscreen</li><li>avoid the sun between 10 a.m. and 4 p.m.</li>';
    } else if (uvLevel >= 11) {
        sunscreenRecommendation = 'Stay indoors.';
    } else {
        sunscreenRecommendation = 'Invalid UV level. Please enter a number between 1 and 11.';
    }
 
    document.getElementById('sunscreen-output').innerHTML = sunscreenRecommendation;
}