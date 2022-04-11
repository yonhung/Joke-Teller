
const btn = document.querySelector("button");
const audioElem = document.querySelector("audio");
let joke;

btn.addEventListener("click", getJoke);
// Enable new joke button
audioElem.addEventListener("ended", toggleBUtton);

/*
  ============================
  Get a new joke and speech it
  ============================
*/
function getJoke() {
  // Disable new joke button
  toggleBUtton();
  // Loading  joke animation
  btn.className="is-loading";
  //Call Joke API
  fetch("https://v2.jokeapi.dev/joke/Programming,Dark,Spooky")
    .then((response) => response.json())
    .then((data) => {
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
        joke = data.joke;
      }
      return joke;
    })
    .then((joke) => speechJoke(joke)) // Call TTS
    .catch((error) => console.log("Fetch joke error: " + error));
}

/*
  =============
  Speech a joke
  =============
*/
function speechJoke(joke) {
  try {
    VoiceRSS.speech({
      key: "5460b3f5f3594097adf1220d52de43a5",
      src: joke,
      hl: "en-us",
      v: "Amy",
      r: 0,
      c: "mp3",
      f: "44khz_16bit_stereo",
      ssml: false,
    });
  } catch (error) {
    console.log("VoiceRSS Error: " + error);
  }
}

function toggleBUtton() {
  btn.disabled = !btn.disabled;
  btn.className='';
}
