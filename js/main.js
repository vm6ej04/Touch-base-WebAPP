
$(document).ready(function(){

	var obj = document.getElementById('object');
	var debug = document.getElementById('debug');
	var colorCtrl = document.getElementById('colorCtrl');
	var speedCtrl = document.getElementById('speedCtrl');
	var startBtn = document.getElementById('startBtn');
	var posInfo= $('.co-ord');
	var touchedInfo= $('.co-ord-last-touched');
	var offsetInfo=$('.co-ord-offset');
	var currentX, currentY, touchX, touchY, changeX, changeY;
	var rResult=0, gResult=200, bResult=255;
	var $blocker= $('#blocker');
	var $distBL= $('.dist-bl');
	var $angBL= $('.ang-bl');
	var $sumInfo= $('.digit');
	var currentR=0,currentG=200,currentB=255;
	var bg= document.getElementById('colorCtrl');
	var $bg = $('#colorCtrl');
	var overlay = document.getElementById('overlay');
 	var touchHold;
 	var flashing=false;
 	var maxY= window.innerHeight;
 	var flashingSpeed;
 	var defaultSpeed = 800;


 	
 
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
	function flashingFunc(){
		$bg.velocity("stop",true).velocity({backgroundColor:"#000000"},{duration:100}).velocity("reverse");
	}

	// if(!window.navigator.standalone) {
 //    	alert('you can add this WebAPP to your homepage like an usual APP');
	// }
//=================== START BUTTON ===================
	startBtn.addEventListener('touchstart',function(event){
		 event.preventDefault();

		// if(flashing===false){
		// 	flashingFunc();
		// 	flashing=true;
		// }else{
		// 	flashing=false;
		// 	flashingFunc();
		// }

	},false);

	startBtn.addEventListener('touchend',function(event){
				 event.preventDefault();
		 
		if(flashing===false){
			// $blocker.velocity("stop").velocity({opacity: 1},{duration: 100});
			// $blocker.velocity("stop").velocity({opacity:1},{display: "block"});
			$bg.velocity("stop",true).velocity({opacity: 0, delay: 500},{duration: flashingSpeed},"easeOutExpo").velocity("reverse",{loop: true});
			flashing=true;
		}else{
			// $blocker.velocity("stop").velocity({opacity: 0},{duration: 100});
			$bg.velocity("stop",true).velocity({opacity: 1},{duration: flashingSpeed});
			flashing=false;
		}

	},false);
//=================== SPEED CONTROL ==================
	speedCtrl.addEventListener('touchstart', function(event) { 
		event.preventDefault();
	  if (event.targetTouches.length == 1) {	  	
	    var touch = event.targetTouches[0];
	    touchX= touch.pageX;
	  	touchY=touch.pageY;
	  	currentX=touchX;
	  	currentY=touchY;
	
	    posInfo.html("You are now on ("+event.pageX+","+event.pageY+")");
	  	touchedInfo.html("Last touched co-ordinate ("+currentX+","+currentY+")");
	  	offsetInfo.html("X moved "+0+", Y moved "+0);
	  	touchAndHold();	
	  }
	}, false);

	speedCtrl.addEventListener('touchmove',function(event){
		event.preventDefault();
		if(event.targetTouches.length == 1){
			var angle = Math.round(Math.atan2(touchX,maxY-touchY)*180/Math.PI);
			var distance = Math.round(Math.sqrt( Math.pow(touchX,2)+Math.pow(maxY-touchY,2)));
			var touch = event.targetTouches[0];
			flashingSpeed= Math.min((angle/90)*defaultSpeed,defaultSpeed);
			touchX= touch.pageX;
	  		touchY=touch.pageY;
	  		$distBL.html("Distance from bottom left: "+distance);
	  		$angBL.html("Angle: "+angle);
	  		// $('#angle-pointer').css({"-webkit-transform":"translateX(-50%) rotate("+angle+"deg)"});
	  		if(distance>150){
	  			$('#angle-pointer').velocity("stop",true).velocity({ translateX: "-50%", rotateZ: angle+"deg"},{duration: 50});
		}	}
		clearTimeout(touchHold);
	},false);

	speedCtrl.addEventListener('touchend', function(event) { 
		event.preventDefault();
	  if (event.targetTouches.length == 1) {	  	
	    clearTimeout(touchHold);
	  }
	}, false);	
//=================== COLOR CONTROL ==================
	overlay.addEventListener('touchstart', function(event) { 
		event.preventDefault();
		$('#overlay').velocity({opacity:0},{duration: 1000});
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
	
	

	overlay.addEventListener('touchmove', function(event) {
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

	 
	  $sumInfo.html("RGB("+rResult+","+gResult+","+bResult+")");

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
