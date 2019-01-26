// We want otters! But if you want dogs...
const ANIMAL = 'otter';
// A secret! Shhhh.
const API_KEY = '242b2536eefb4eb5961d2af4c122acbc';
// The number of different otter gifs to choose from at a time
const GIFS_AT_A_TIME = 5;

// Where we will send all of our otter request to:
const API_URL = `https://api.giphy.com/v1/gifs/search?q=${ANIMAL}&api_key=${API_KEY}&limit=${GIFS_AT_A_TIME}`

// We also want the offset to be (GIFS_AT_A_TIME * some multiplier value)
// By starting with a multiplier of 0, the first time the offset will be 0.
let offset_multiplier = 0;
// For example, if there are a 100 total otter gifs, the first time we want to
// choose a random one from the gifs 1-5. The second time, we want a random one
// from gifs 6-10, etc.

// The overall number of different gifs to choose from
const TOTAL_OTTERS = 200;
// Once we reached the last otters to choose from, (after X amount of clicks)
// we will set help set the offset to back 0 using this calculation in the
// getOffset() function below
const CLICKS_UNTIL_REPEAT = TOTAL_OTTERS / GIFS_AT_A_TIME
// For example, 200/5 = 40. So every 40 clicks, we will set the offset to 0
// using the function below
function getOffset() {
  // If we have done X searches, return an offset of 0
  if (offset_multiplier > CLICKS_UNTIL_REPEAT) {
    offset_multiplier = 1 // Set for the next iteration
    return 0 // The offset we return to choose the first group of gifs again
  } else {
    let newOffset = offset_multiplier * GIFS_AT_A_TIME
    offset_multiplier += 1 // Set for the next iteration
    return newOffset
  }
}

// Get random otter from the array of GIF objects that will be fetched from API
function getRandomOtter(otters) {
  let randomIndex = Math.floor(Math.random() * GIFS_AT_A_TIME)
  return otters[randomIndex]
}

// When HTML is all loaded, let's run this JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const getOtterButton = document.getElementById('search') // Get search button
  const gifSection = document.getElementById('gifSection') // Get GIF section
  let randomOtter; // Source of otter that will keep on changing

  getOtterButton.addEventListener('click', () => {
    fetch(API_URL + `&offset=${getOffset()}`) // Dynamically get offset value
    .then(response => response.json())
    .then(JSON => {
      // Version of this is ensured to be GIF downsized to be under 200kb
      // to allow for the best SPEED
      // NOTE: It's technically an MP4 now, but we take what we can get!
      randomOtter = getRandomOtter(JSON.data).images.downsized_small.mp4
      // Manipulate the DOM to render otter on click
      gifSection.innerHTML = `
        <video autoplay loop title="Random Otter">
          <source src="${randomOtter}" type="video/mp4">
        </video>`
    })
  })
})
