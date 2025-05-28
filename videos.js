function changeVideo(videoId, clickedItem) {
    const mainVideoWrapper = document.querySelector('.main-video');
    const oldIframe = document.getElementById("main-video");
  
    if (oldIframe) oldIframe.remove();
  
    const newIframe = document.createElement('iframe');
    newIframe.id = "main-video";
    newIframe.width = "100%";
    newIframe.height = "450";
    newIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    newIframe.frameBorder = "0";
    newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    newIframe.allowFullscreen = true;
  
    mainVideoWrapper.appendChild(newIframe);
  
    const allItems = document.querySelectorAll('.video-item');
    allItems.forEach(item => item.classList.remove('active'));
  
    if (clickedItem) {
      clickedItem.classList.add('active');
    }
  }
  
  