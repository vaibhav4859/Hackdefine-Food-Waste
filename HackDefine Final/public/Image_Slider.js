let index = 0, index1 = 0;

show_slide = (i) => {
    index += i;
    var images = document.getElementsByClassName("image");

    for (i = 0; i < images.length; i++)
        images[i].style.display = "none";

    if (index > images.length - 1) index = 0;
    else if (index < 0) index = images.length - 1;

    images[index].style.display = "block";
}

setInterval(() => {
    show_slide(index++);
}, 3000);

window.addEventListener("onload", show_slide(index));