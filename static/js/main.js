window.setInterval(play, 1500);

function play() {
    const title = document.getElementById("mainheadingtext");
    title.innerHTML = "Lin-K";
    let index = 0;
    while (index < 3) {
        setTimeout(() => {
            title.innerHTML += "."
        }, (index + 1) * 500);
        index++;
    }
}