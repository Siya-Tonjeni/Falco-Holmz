function changeVideo(videoId) {
    let mainVideo = document.getElementById("main-video");
    mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
