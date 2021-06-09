const imageContainer = document.getElementById("image-container")
const loader = document.getElementById('loader')



let imageLoaded=1;
let totalImages=0;
let ready=false;


function checkloaded(){
    imageLoaded++;
    console.log(imageLoaded);
    if(imageLoaded===totalImages)
    {
        ready=true;
        loader.hidden=true;
    }

}

// Create Element for links and phots
function displayPhotos(){
    imageLoaded=0;
    totalImages=photosArray.length;
    photosArray.forEach(photo=>{
        //Create and anchor element
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target','_blank');

        //Create image for photo
        const image = document.createElement('img');
        image.setAttribute('src',photo.urls.regular);
        image.setAttribute('alt',photo.alt_description);
        image.setAttribute('title',photo.alt_description);
         

        // put image inside a , then put both inside image container
        console.log(image.innerHTML);
        item.appendChild(image);
        imageContainer.appendChild(item);


        // Checking whether all the image is loaded or not

        image.addEventListener('load',checkloaded)
    });
}

let photosArray= [];
const count = 15;
const apiKey = 'iNuQFBUX1tsPaqT9XENdBN_-bLPtJSPXywprtWOLyQM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
        
    } catch (error) {

    }
}


// Check to see if scrolled at the bottom of the page
window.addEventListener('scroll',()=>{
    // console.log(window.innerHeight);
    if(window.innerHeight+window.scrollY>document.body.offsetHeight-1000&&ready)
    {
        displayPhotos();
        ready=false;
        loader.hidden=false;
    }
})

getPhotos(); 