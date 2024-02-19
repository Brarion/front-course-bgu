function showPopup(socialMedia) {
    var popup = document.getElementById("popup");
    var popupTitle = document.getElementById("popup-title");

    popupTitle.textContent = socialMedia;
    popup.style.display = "block";
}

function hidePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}
