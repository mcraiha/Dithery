
window.copyImageDataAsPng = (imgId, start, end) => {
  const imgProcessed = document.getElementById(imgId);
  return imgProcessed.src.substring(start, end);
}

window.getImageDataLength = (imgId) => {
  const imgProcessed = document.getElementById(imgId);
  return imgProcessed.src.length;
}

const imgInput = document.getElementById('imagetodither');
imgInput.addEventListener('change', function(e) {
  if (e.target.files) {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = function(e) {
      const myImage = new Image();
      myImage.src = e.target.result;
      
      myImage.onload = function(ev) {
        const myCanvas = document.getElementById('inputCanvas');
        const myContext = myCanvas.getContext("2d");
        myCanvas.width = myImage.width;
        myCanvas.height = myImage.height;
        myContext.drawImage(myImage, 0, 0);

        const imageresolutionLabel = document.getElementById('imageresolution');
        imageresolutionLabel.innerText = `Resolution: ${myImage.width} x ${myImage.height}`;

        const imgProcessed = document.getElementById('canvasprocessed');
        imgProcessed.src = myCanvas.toDataURL();
        DotNet.invokeMethodAsync('Dithery', 'ImageLoaded');
      }

    }

  }
});