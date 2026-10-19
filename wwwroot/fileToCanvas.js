
window.copyImageDataAsBytes = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  const myContext = canvas.getContext("2d");
  const imageData = myContext.getImageData(0, 0, canvas.width, canvas.height);
  return new Uint8Array(imageData.data);
}

window.getImageWidth = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  return canvas.width;
}

window.getImageHeight = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  return canvas.height;
}

window.writeRGBToCanvas = (canvasId, width, height, rgbBytes) => {
  
  // Change to RGBA bytes
  const rgbaBytes = new Uint8ClampedArray(rgbBytes.length / 3 * 4);
  let inputIndex = 0;
  let outputIndex = 0;
  while (inputIndex < rgbBytes.length)
  {
    if (inputIndex % 3 == 2)
    {
      rgbaBytes[outputIndex] = rgbBytes[inputIndex];
      inputIndex++;
      outputIndex++;
      rgbaBytes[outputIndex] = 255;
      outputIndex++;
    }
    else
    {
      rgbaBytes[outputIndex] = rgbBytes[inputIndex];
      inputIndex++;
      outputIndex++;
    }
  }

  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext("2d")
  canvas.width = width;
  canvas.height = height;
  context.putImageData(new ImageData(rgbaBytes, width, height), 0, 0);
  canvas.style.display = "block";
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
        myCanvas.style.display = "block";

        const imageresolutionLabel = document.getElementById('imageresolution');
        imageresolutionLabel.innerText = `Resolution: ${myImage.width} x ${myImage.height}`;

        DotNet.invokeMethodAsync('Dithery', 'ImageLoaded');
      }

    }

  }
});