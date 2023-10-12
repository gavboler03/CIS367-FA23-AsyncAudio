// Background Gradients

const color0 = "linear-gradient(to bottom, #87CEEB, #FFA500)"
const color1 = "linear-gradient(to bottom, #FFA500, #FFFFFF)"
const color2 = "linear-gradient(to bottom, #FFFFFF, #87CEEB)"
const color3 = "linear-gradient(to bottom, #FFA500, #000000)"
const color4 = "linear-gradient(to bottom, #87CEEB, #FFFFED)"
const color5 = "linear-gradient(to bottom, #FFC0CB, #65A765)"
const color6 = "linear-gradient(to bottom, #FF0000, #ADD8E6)"
const color7 = "linear-gradient(to bottom, #00FFFF, #0000FF)"
const color8 = "linear-gradient(to bottom, #000000, #FDE5B4)"
const color9 = "linear-gradient(to bottom, #B19CD9, #FFFFFF)"

// Variables

const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
const btn_1 = document.querySelector('.btn_1');
const btn_2 = document.querySelector('.btn_2');
const background = document.querySelector('.background');
const song_name = document.querySelector('#song_name');
const artist_name = document.querySelector('#artist_name');
const album_cover = document.querySelector('#album_cover');
const audio = document.querySelector('.audio');
const seekBar = document.querySelector('.seekbar');
const progress = document.querySelector('.progress');
const progress_time = document.querySelector('.progress_time');
const duration_time = document.querySelector('.duration_time');
const songs = ['Aidan', 'Autumn Sun', 'Best Part of Me', 'Better Days', `I Can't Make You Love Me`, 'Just Relax', 'The Paranormal is Real', 'Perfect', 'Polarity', 'Your Shoulder'];
const artists = ['Jonathan Ceaser', 'Bryce Greene', 'The Dunwells', 'LAKEY INSPIRED', 'Bryce Greene', 'Purrple Cat', 'Leonell Cassio', 'Ed Sheeran', 'Ethos', 'Kaitlyn Thompson'];
const covers = ['Aidan', 'Autumn Sun', 'Best Part of Me', 'Better Days', `I Can't Make You Love Me`, 'Just Relax', 'The Paranormal is Real', 'Perfect', 'Polarity', 'Your Shoulder'];
const bg_colors = [color0, color1, color2, color3, color4, color5, color6, color7, color8, color9];
let songIndex = 0;
let artistIndex = 0;
let bgIndex = 0;
let playerIndex = 0;
let coverIndex = 0;

// Functions

function loadGradient(grad){
    document.body.style.backgroundImage = grad
}

function loadCover(cov){
    album_cover.innerText = cov
    album_cover.src = `albumart/${cov}.jpg`
}

function loadSong(song){
    song_name.innerText = song
    audio.src = `songs/${song}.mp3`
}

function loadArtist(artist){
    artist_name.innerText = artist
}

function playSong(){
    if(pause.classList.contains('hidden')){
        audio.play()
        pause.classList.remove('hidden')
        play.classList.add('hidden')
    }
}

function pauseSong(){
    if(play.classList.contains('hidden')){
        audio.pause()
        play.classList.remove('hidden')
        pause.classList.add('hidden')
    }
}

function prevSong(){
    songIndex--
    artistIndex--
    bgIndex--
    coverIndex--
    if(songIndex < 0 && artistIndex < 0 && bgIndex < 0 && coverIndex < 0){
        songIndex = songs.length - 1
        artistIndex = artists.length - 1
        bgIndex = bg_colors.length - 1
        coverIndex = covers.length - 1
    }
    
    loadSong(songs[songIndex])
    loadArtist(artists[artistIndex])
    loadGradient(bg_colors[bgIndex])
    loadCover(covers[coverIndex])
    audio.play()
    pause.classList.remove('hidden')
    play.classList.add('hidden')
}

function nextSong(){
    songIndex++
    artistIndex++
    bgIndex++
    coverIndex++
    if(songIndex > songs.length - 1 && artistIndex > artists.length - 1 && bgIndex > bg_colors.length - 1 && coverIndex > covers.length - 1){
        songIndex = 0
        artistIndex = 0
        bgIndex = 0
        coverIndex = 0
    }
    
    loadSong(songs[songIndex])
    loadArtist(artists[artistIndex])
    loadGradient(bg_colors[bgIndex])
    loadCover(covers[coverIndex])
    audio.play()
    pause.classList.remove('hidden')
    play.classList.add('hidden')
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}

// Load the page

loadSong(songs[songIndex]);
loadArtist(artists[artistIndex]);
loadGradient(bg_colors[bgIndex]);
loadCover(covers[coverIndex]);
pause.classList.add('hidden');

// Event listeners

btn_1.addEventListener('click', playSong)

btn_2.addEventListener('click', pauseSong)

back.addEventListener('click', prevSong)

forward.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

seekBar.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)