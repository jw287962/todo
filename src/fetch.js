import { doc } from "prettier";

// function addGifEventListener(){
//     const fetchImgButton = document.querySelector('.button');
//     fetchImgButton.addEventListener('click',changeGif());
// }

function changeGifHTML(gifLink){
    const img = document.querySelector('.imageapi');
    img.src = gifLink;
    console.log(img.src);
}
function changeGif(event){
    event.preventDefault();
    let searchHolder = searchingGif();
   

    if(!searchHolder){
        searchHolder = 'dog'; //default search;
    }
    console.log(searchHolder);
    const newRequest = new Request(`https://api.giphy.com/v1/gifs/translate?api_key=mTBAlByNPEccPyam6w9yLObH320xot5y&s=${searchHolder}`
    ,{mode: 'cors'});
  
    fetch(newRequest)
        .then((response) =>{
            response.json()
                .then((response) => {
               
                    changeGifHTML(response.data.images.original.url);
                   
                })
                .catch(err => {
                    console.log('Error detected: Using default search');
                    const defaultRequest = new Request(`https://api.giphy.com/v1/gifs/translate?api_key=mTBAlByNPEccPyam6w9yLObH320xot5y&s=cats`
                    ,{mode: 'cors'});
    
                    fetchGiphy(defaultRequest);
                })
            })
            .finally((err) => {
               
               
            });
}

async function fetchGiphy(request){
    let response = await fetch(request)
    console.log(response.json);
        response.json().then((response) => {
            changeGifHTML(response.data.images.original.url);
        });
                  
                   
    }


function searchingGif(){
  
    console.log('searching');
    const searchElement = document.querySelector('#gifsearch');
    return searchElement.value;

}

function searchGifListener(){ 
    const formGif = document.querySelector('.gif');
 
    formGif.addEventListener('submit',changeGif);
}

     
export default  searchGifListener;