// Selectors and initial states

const imageContainer = document.getElementById("image__container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKEY = 'cVHRST7mo7sChYdJmIlnqjMu85gYT2S2d1oNEpWdVHI';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}&orientation=landscape`

// check if all images are loaed

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
}

// Helper function to set attributes on elements 

function setAttr (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display Photos from Unsplash API resp. Create elements for links & photos and add to the DOM

function displayPhotos() {

    totalImages = photosArray.length;

// using foreach to grab each photo from photoArray and create an element for each one 
    photosArray.forEach((photo) => {
        
// creating an anchor element to link to unsplash
        
        const item = document.createElement('a');
        setAttr(item, {
            href: photo.links.html,
            target: '_blank',

        });


        // create Img for photo

        const img = document.createElement('img');
        setAttr(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });


        // event listener check when finished loading

        img.addEventListener('load', imageLoaded);

        // put Img inside Anchor element and append to DOM

        item.appendChild(img);
        imageContainer.appendChild(item);   

    });
    

}


// Get photos from Unsplash API 

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();


    } catch (error) {
        console.log(error);
        
    }
}


// check to see if scrolling near bottom of the page & ready === true

window.addEventListener('scroll', () => {

    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 700) && ready === true)
    {
        ready = false;
        imagesLoaded = 0;
        getPhotos();
        }

})



// On Load

getPhotos();
