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