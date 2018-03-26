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

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {},
	tokens,
	re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
		= decodeURIComponent(tokens[2]);
	}
	return params;
}
var $_GET = getQueryParams(document.location.search);
//console.log($_GET["json"]); 

var mUrl = "images.json";
if ($_GET["json"] != undefined){
	mUrl = $_GET["json"];
}



function swapPhoto(mJson) {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
	mCurrentIndex++;
	if(mCurrentIndex >= mImages.length){
		mCurrentIndex = 0;
	}

	var currentImg = mImages[mCurrentIndex];
	console.log("THIS: " + mImages.length);
	//console.log("Swap Photo: " + currentImg.imgPath);
	document.getElementById("photo").src = currentImg.imgPath;
	document.getElementsByClassName("location")[0].innerHTML = "Location: " + currentImg.imgLocation;
	document.getElementsByClassName("description")[0].innerHTML = "Description: " + currentImg.description;
	document.getElementsByClassName("date")[0].innerHTML = "Date: " + currentImg.date;

	console.log('swap photo');
}

function returnSwap(){
	mCurrentIndex--;
	if(mCurrentIndex < 0){
		mCurrentIndex = (mImages.length)-1;
	}

	var currentImg = mImages[mCurrentIndex];
        //console.log("Return Swap Photo: " + currentImg.imgPath);
        document.getElementById("photo").src = currentImg.imgPath;
        document.getElementsByClassName("location")[0].innerHTML = "Location: " + currentImg.imgLocation;
        document.getElementsByClassName("description")[0].innerHTML = "Description: " + currentImg.description;
        document.getElementsByClassName("date")[0].innerHTML = "Date: " + currentImg.date;

        console.log('return swap');
}


// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable

function reqListener () {
	console.log(this.responseText);
}


var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).

var mImages = [];



mRequest.onreadystatechange = function() {
        if (mRequest.readyState == 4 && mRequest.status == 200) {
	      try {
              		 mJson = JSON.parse(mRequest.responseText); 
              

                for (var i = 0; i < mJson.images.length; i++) {
                		//console.log("TEST: " + mJson.images[i].imgLocation);
                		var myLine = mJson.images[i];
	                	mImages.push(new GalleryImage(myLine.imgLocation, myLine.description, myLine.date, myLine.imgPath));
						//console.log(mJson.images[i].imgLocation + " " + mJson.images[i].description + " " + mJson.images[i].date + " " + mJson.images[i].imgPath);
			}


		} catch(err) {
			//console.log(mRequest.responseText);
			console.log("There was a file reading error")
			return;
		}
	}
};

mRequest.open("GET","images.json", true);
mRequest.send();



// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later

//Check to see what's in mImages



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
	$('.moreIndicator').click(function() {
		console.log(".moreIndicator");
		
		if ($('.moreIndicator').hasClass("rot90")){
			console.log("has rot90");
			$('.moreIndicator').addClass("rot270").removeClass("rot90");
			$('div.details').fadeToggle("fast", function() {
				$('div.details').slideDown();
			});
		}else if ($('.moreIndicator').addClass("rot270")){
			console.log("has rot270");
			$('.moreIndicator').addClass("rot90").removeClass("rot270");
			$('div.details').fadeToggle("fast", function(){
				$('div.details').slideUp();
			});
		} else {
			$('.moreIndicator').add("rot270")
		}
	});
	
	$('#nextPhoto').click(function(){
		console.log("NEXT PHOTO");
		swapPhoto();
	});
	
	$('#prevPhoto').click(function(){
		console.log("PREV PHOTO");
		returnSwap();
	})

	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgLocation, description, date, imgPath){
	this.imgLocation = imgLocation;
	this.description = description;
	this.date = date;
	this.imgPath = imgPath;
}


