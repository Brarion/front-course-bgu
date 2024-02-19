//

const imageInput = document.getElementById('imageInput') as HTMLInputElement;
const previewImage = document.getElementById('previewImage') as HTMLImageElement;
const hotspotsContainer = document.getElementById('hotspots') as HTMLElement;

interface Hotspot {
    x: string;
    y: string;
    width: string;
    height: string;
    redirect: string;
    title: string;
}
// хотспот это точка для выделения части imagemap, несколько хотспотов образуют прямоугольник, на который можно нажать
// и перейти на какую-либо страницу (redirect) и увидеть описание без перехода (title)
let hotspots: Hotspot[] = [];
let selectedHotspotIndex = -1;

// слушатель события  изменения в imageInput,
// при выборе нового изображения обновляет предварительный просмотр и очищает горячие точки
imageInput.addEventListener('change', function(event) {
    const selectedImage = (event.target as HTMLInputElement).files?.[0];
    if (selectedImage) {
        previewImage.src = URL.createObjectURL(selectedImage);
        hotspotsContainer.innerHTML = '';
        hotspots = [];
        updateImagemapCode();
    }
});


previewImage.addEventListener('click', function(event) {
    const rect = this.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(2);
    const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(2);

    if (selectedHotspotIndex === -1) {
        selectedHotspotIndex = hotspots.length;
        const hotspotElement = document.createElement('div');
        hotspotElement.className = 'hotspot';
        hotspotElement.style.left = `${x}%`;
        hotspotElement.style.top = `${y}%`;

        hotspotsContainer.appendChild(hotspotElement);
        hotspots.push({ x, y, width: '0', height: '0', redirect: '#', title: '#' });
    } else {
        const selectedHotspot = hotspots[selectedHotspotIndex];
        const width = Number(x) - Number(selectedHotspot.x);
        const height = Number(y) - Number(selectedHotspot.y);
        selectedHotspot.width = Math.abs(width).toFixed(2);
        selectedHotspot.height = Math.abs(height).toFixed(2);
        selectedHotspot.x = width < 0 ? x : selectedHotspot.x;
        selectedHotspot.y = height < 0 ? y : selectedHotspot.y;
        selectedHotspotIndex = -1;
        updateImagemapCode();
    }
});

hotspotsContainer.addEventListener('click', function(event) {
    const clickedHotspot = event.target as HTMLElement;
    const hotspotIndex = Array.prototype.indexOf.call(hotspotsContainer.children, clickedHotspot);

    if (hotspotIndex !== -1) {
        selectedHotspotIndex = hotspotIndex;
        const selectedHotspot = hotspots[selectedHotspotIndex];
        previewImage.style.pointerEvents = 'none';
        clickedHotspot.style.pointerEvents = 'none';
        clickedHotspot.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        clickedHotspot.style.width = `${selectedHotspot.width}%`;
        clickedHotspot.style.height = `${selectedHotspot.height}%`;
    }
});

function updateImagemapCode() {
    const imagemapCodeTextArea = document.getElementById('imagemapCode') as HTMLTextAreaElement;
    let code = '[imagemap]\n';
    code += `${previewImage.src}\n`;

    for (const hotspot of hotspots) {
        if (Number(hotspot.width) > 0 && Number(hotspot.height) > 0) {
            code += `${hotspot.x} ${hotspot.y} ${hotspot.width} ${hotspot.height} ${hotspot.redirect} ${hotspot.title}\n`;
        }
    }

    code += '[/imagemap]';
    imagemapCodeTextArea.value = code;
}
