function importAll(r) {
    return r.keys().map(r);
  }
  const images = importAll(require.context('./asset/images', false, /\.(png|jpe?g|svg)$/));
  const totalNumImages = images.length;
  let currentImage = 0;
  let timerControl;
  function addImageSlider(){
    const imageHolder = document.querySelector('.image');
    imageHolder.src = images[0];
  
    const imageIndicator = document.querySelector('.imageindicator');
    for(let i = 0; i <totalNumImages;i+=1){
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if(i === 0) dot.classList.toggle('active');
  
      imageIndicator.appendChild(dot);
    }
    timerControl = setInterval(goNextImage, 3500);
    const nextImage = document.querySelector('.nextimage');
    const previousImage = document.querySelector('.previousimage');
    nextImage.addEventListener('click',goNextImage);
    previousImage.addEventListener('click',goPreviousImage);
  
  
  }
  function goNextImage(){
    const imageHolder = document.querySelector('.image');
    currentImage+= 1;
    const imageIndicator = document.querySelector('.imageindicator');
    const allDots = document.querySelectorAll('.dot');
    let num = 0;
    allDots.forEach( element => {
      
      if(num === currentImage)
        element.classList.toggle('active');
      if(num === currentImage-1)
          element.classList.toggle('active');
      
      if(currentImage >= totalNumImages) {
        currentImage = 0;
        element.classList.toggle('active');
        imageIndicator.lastChild.classList.toggle('active');
      }
      num += 1;
    });
  
    if(currentImage !== totalNumImages){
     
       imageHolder.src = images[currentImage];
    }
    else{
      currentImage = 0;
      imageHolder.src = images[currentImage];
    }
  
    clearInterval(timerControl);
    timerControl = setInterval(goNextImage, 3500);
  }
  function goPreviousImage(){
    const imageHolder = document.querySelector('.image');
    currentImage-=1;
    const imageIndicator = document.querySelector('.imageindicator');
    const allDots = document.querySelectorAll('.dot');
    let num = 0;
    console.log(currentImage);
    allDots.forEach( element => {
    
        if(num === currentImage)
        element.classList.toggle('active');
      if(num === currentImage+1)
          element.classList.toggle('active');
      
      if(currentImage < 0 ){
        currentImage = totalNumImages-1;
        imageIndicator.lastChild.classList.toggle('active');
        return;
      }
      num += 1;
    });
    if(currentImage >= 0){
       imageHolder.src = images[currentImage];
    }
  else{
    currentImage = totalNumImages-1;
    imageHolder.src = images[currentImage];
  } 
  
  }

  export default addImageSlider;