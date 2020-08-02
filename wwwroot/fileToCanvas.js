window.readPixelDataFromCanvas = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imageData.data;
}

window.writePixelDataToCanvas = (canvasId, width, height, bufferData) => {
  const canvas = document.getElementById(canvasId);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  const clampedArray = Uint8ClampedArray.from(bufferData);

  const imageData = new ImageData(clampedArray, width, height);
  ctx.putImageData(imageData, dx, dy);
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
      }

    }

  }
});