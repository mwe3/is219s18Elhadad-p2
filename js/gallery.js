// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto(mJson) {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string

	$('#photo').attr("src", mImages[mCurrentIndex].image);
	$('.location').html('<p>Location: ' + mImages[mCurrentIndex].location + '</p)');
	$('.description').html('<p>Description: ' + mImages[mCurrentIndex].description + '</p)');
	$('.date').html('<p>Date: ' + mImages[mCurrentIndex].date + '</p)');
	
	
		if(mCurrentIndex < mImages.length) {
			
			$('.moreIndicator').click(function(){ 
				$('.details').slideDown().toggle();
				
			});
			
		mCurrentIndex++;
		
		$('.details').hide();
			
		
		} else { 
			mCurrentIndex = 0; // resets it back to zero
		
		};
		
	console.log('swap photo');
	console.log(mImages[mCurrentIndex].description);
	
};

function reversSwap() {
	
	

		if(mCurrentIndex == 0) {
			
			mCurrentIndex = mImages.length-1;
		
		mCurrentIndex++;
		} else { 
			mCurrentIndex = --
			$('#photo').attr("src", mImages[mCurrentIndex].image);
		
		}
	
}





// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable

var mRequest = new XMLHttpRequest();
var mUrl = "images.json";

xmlhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200) {
		var mJson = JSON.parse(this.responseText);
		swapPhoto();
}

for(var i = 0; mJson.images.length; i++) {
	mImages.push(new GalleryImage((mJson.images[i].image, mJson.images[i].location, mJson.images[i].description, mJson.images[i].date))); 
}
	
};

xmlhttp.open("GET", url, true);
xmlhttp.send();		
// Array holding GalleryImage objects (see below).

var mImages = []
	mImages.push(new GalleryImage("img/places/greece.jpg", "Greece", "The Beautiful Islands of Greeece", "01/01/2016" ));
	mImages.push(new GalleryImage("img/places/switzerland.jpg", "Switzerland", "The Beautiful Mountains of Switzerland", "01/01/2016"));
	mImages.push(new GalleryImage("img/places/italy.jpg", "Italy", "The Beautiful Landscape of italy", "01/01/2016"));
	mImages.push(new GalleryImage("img/places/france.jpg", "France", "The Beautiful Landscape of France", "01/01/2016"));

for (var i = 0; i < mImages.length; i++) {
console.log(mImages[i]); 
}

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later

var mUrl = 'images.json';



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(location, description, date, img){
	this.location = location;
	this.description = description;
	this.date = date;
	this.image = img;
};
