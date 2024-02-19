//
var imageInput = document.getElementById('imageInput');
var previewImage = document.getElementById('previewImage');
var hotspotsContainer = document.getElementById('hotspots');
// хотспот это точка для выделения части imagemap, несколько хотспотов образуют прямоугольник, на который можно нажать
// и перейти на какую-либо страницу (redirect) и увидеть описание без перехода (title)
var hotspots = [];
var selectedHotspotIndex = -1;
//  слушатель события  изменения в imageInput, при выборе нового изображения обновляет предварительный просмотр и очищает горячие точки
//
imageInput.addEventListener('change', function (event) {
    var _a;
    var selectedImage = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (selectedImage) {
        previewImage.src = URL.createObjectURL(selectedImage);
        hotspotsContainer.innerHTML = '';
        hotspots = [];
        updateImagemapCode();
    }
});
previewImage.addEventListener('click', function (event) {
    var rect = this.getBoundingClientRect();
    var x = ((event.clientX - rect.left) / rect.width * 100).toFixed(2);
    var y = ((event.clientY - rect.top) / rect.height * 100).toFixed(2);
    if (selectedHotspotIndex === -1) {
        selectedHotspotIndex = hotspots.length;
        var hotspotElement = document.createElement('div');
        hotspotElement.className = 'hotspot';
        hotspotElement.style.left = "".concat(x, "%");
        hotspotElement.style.top = "".concat(y, "%");
        hotspotsContainer.appendChild(hotspotElement);
        hotspots.push({ x: x, y: y, width: '0', height: '0', redirect: '#', title: '#' });
    }
    else {
        var selectedHotspot = hotspots[selectedHotspotIndex];
        var width = Number(x) - Number(selectedHotspot.x);
        var height = Number(y) - Number(selectedHotspot.y);
        selectedHotspot.width = Math.abs(width).toFixed(2);
        selectedHotspot.height = Math.abs(height).toFixed(2);
        selectedHotspot.x = width < 0 ? x : selectedHotspot.x;
        selectedHotspot.y = height < 0 ? y : selectedHotspot.y;
        selectedHotspotIndex = -1;
        updateImagemapCode();
    }
});
hotspotsContainer.addEventListener('click', function (event) {
    var clickedHotspot = event.target;
    var hotspotIndex = Array.prototype.indexOf.call(hotspotsContainer.children, clickedHotspot);
    if (hotspotIndex !== -1) {
        selectedHotspotIndex = hotspotIndex;
        var selectedHotspot = hotspots[selectedHotspotIndex];
        previewImage.style.pointerEvents = 'none';
        clickedHotspot.style.pointerEvents = 'none';
        clickedHotspot.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        clickedHotspot.style.width = "".concat(selectedHotspot.width, "%");
        clickedHotspot.style.height = "".concat(selectedHotspot.height, "%");
    }
});
function updateImagemapCode() {
    var imagemapCodeTextArea = document.getElementById('imagemapCode');
    var code = '[imagemap]\n';
    code += "".concat(previewImage.src, "\n");
    for (var _i = 0, hotspots_1 = hotspots; _i < hotspots_1.length; _i++) {
        var hotspot = hotspots_1[_i];
        if (Number(hotspot.width) > 0 && Number(hotspot.height) > 0) {
            code += "".concat(hotspot.x, " ").concat(hotspot.y, " ").concat(hotspot.width, " ").concat(hotspot.height, " ").concat(hotspot.redirect, " ").concat(hotspot.title, "\n");
        }
    }
    code += '[/imagemap]';
    imagemapCodeTextArea.value = code;
}
