
$(document).ready(function(){

	var obj = document.getElementById('object');
	var debug = document.getElementById('debug');
	var posInfo= $('.co-ord');
	var touchedInfo= $('.co-ord-last-touched');
	var offsetInfo=$('.co-ord-offset');
	var currentX, currentY, touchX, touchY, changeX, changeY;
	var rResult=0, gResult=200, bResult=255;
	var sumInfo=$('.digit');
	var currentR=0,currentG=200,currentB=255;
	var bg= document.body;
 	var touchHold;

 	function touchAndHold(){
		touchHold = setTimeout(function(){alert('This is a touch and hold!');},500);
	}

	function resetOrigin(){
		currentX=event.pageX;
		currentY=event.pageY;
		changeX=0;
		changeY=0;
		currentR=rResult;
		currentG=gResult;
		currentB=bResult;
	}

	function calChange(){
		changeX=(event.pageX-currentX);
		changeY=(event.pageY-currentY);
	}


	document.body.addEventListener('touchstart', function(event) { 
		event.preventDefault();
	  if (event.targetTouches.length == 1) {	  	
	    var touch = event.targetTouches[0];
	    touchX= touch.pageX;
	  	touchY=touch.pageY;
	  	currentX=touchX;
	  	currentY=touchY;
	  	obj.style.left = touch.pageX + 'px';
	    obj.style.top = touch.pageY + 'px';
	    posInfo.html("You are now on ("+event.pageX+","+event.pageY+")");
	  	touchedInfo.html("Last touched co-ordinate ("+currentX+","+currentY+")");
	  	offsetInfo.html("X moved "+0+", Y moved "+0);
	  	touchAndHold();	
	  }
	}, false);	
	
	

	document.body.addEventListener('touchmove', function(event) {
		clearTimeout(touchHold);
			
			if(rResult===0 && gResult===0 && bResult===255){//// 1
				if(changeX>=0){
					rResult=1;
					resetOrigin();
				}else{
					gResult=1;
					resetOrigin();
				}
			}			

			if(rResult<=254 && rResult!=0 && gResult===0 && bResult===255){
				calChange();
				rResult=Math.min(Math.max(currentR+changeX,0),255);	

			}
				
			if(rResult===255 && gResult===0 && bResult===255){//// 2
				if(changeX>=0){
					bResult=254;
					resetOrigin();	
				}else{
					rResult=254;
					resetOrigin();
				}
			}
			if(rResult===255 && gResult===0 && bResult<=254 && bResult!=0){
				calChange();
				bResult=Math.min(Math.max(currentB-changeX,0),255);
			}
			if(rResult===255 && gResult===0 && bResult===0){//// 3
				if(changeX>=0){
					gResult=1;
					resetOrigin();
				}else{
					bResult=1;
					resetOrigin();
				}
			}
			if(rResult===255 && gResult<=254 && gResult!=0 && bResult===0){
				calChange();
				gResult=Math.min(Math.max(currentG+changeX,0),255);
			}
			if(rResult===255 && gResult===255 && bResult===0){//// 4
				if(changeX>=0){
					rResult=254;
					resetOrigin();
				}else{
					gResult=254;
					resetOrigin();
				}
			}
			if(rResult<=254 && rResult!=0 && gResult===255 && bResult===0){
				calChange();
				rResult=Math.min(Math.max(currentR-changeX,0),255);
			}
			if(rResult===0 && gResult===255 && bResult===0){//// 5
				if(changeX>=0){
					bResult=1;
					resetOrigin();
				}else{
					rResult=1;
					resetOrigin();
				}
			}
			if(rResult===0 && gResult===255 && bResult<=254 && bResult!=0){
				calChange();
				bResult=Math.min(Math.max(currentB+changeX,0),255);
			}
			if(rResult===0 && gResult===255 && bResult===255){//// 6
				if(changeX>=0){
					gResult=254;
					resetOrigin();
				}else{
					bResult=254;
					resetOrigin();
				}
			}
			if(rResult===0 && gResult<=254 && gResult!=0 && bResult===255){
				calChange();
				gResult=Math.min(Math.max(currentG-changeX,0),255);
			}


	  posInfo.html("You are now on ("+event.pageX+","+event.pageY+")");
	  offsetInfo.html("X moved "+changeX+", Y moved "+changeY);
	  bg.style.backgroundColor="rgb("+rResult+","+gResult+","+bResult+")";

	 
	  sumInfo.html("RGB("+rResult+","+gResult+","+bResult+")");

	  if (event.targetTouches.length == 1) {
	  	
	    var touch = event.targetTouches[0];

	    obj.style.left = touch.pageX + 'px';
	    obj.style.top = touch.pageY + 'px';
	  }


	}, false);

	document.body.addEventListener('touchend', function(event) {
		clearTimeout(touchHold);
		currentR=rResult;
		currentG=gResult;
		currentB=bResult;
	}, false);
});
