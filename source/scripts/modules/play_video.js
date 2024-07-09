const video = document.getElementById('video');
const videoBtn = document.querySelector('.video__button');

let isPlay = false;
const isMobile = window.innerWidth < 1024;

function handleVideo() {
    isPlay = !isPlay;
    videoBtn.classList.toggle('hidden');
    isPlay ? video.play() : video.pause();

    if (isMobile && isPlay) {
        setTimeout(() => {
            videoBtn.style.opacity = 0;
        }, 1000)
    } else if (isMobile && !isPlay) {
        videoBtn.style.opacity = 1;
    }
}


if (videoBtn !== null) {
    videoBtn.addEventListener('click', handleVideo)
}

 