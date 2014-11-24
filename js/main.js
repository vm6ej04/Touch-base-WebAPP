


$(document).ready(function(){

	var obj = document.getElementById('object');
	var debug = document.getElementById('debug');
	var colorLayer = document.getElementById('colorLayer');
	var colorCtrl = document.getElementById('colorCtrl');
	var speedCtrl = document.getElementById('speedCtrl');
	var startBtn = document.getElementById('startBtn');
	var innerRing = document.getElementById('speed-inner-ring');
	var outterRing = document.getElementById('speed-outter-ring');
	var speedCircle = document.getElementById('angle-pointer');
	var posInfo= $('.co-ord');
	var touchedInfo= $('.co-ord-last-touched');
	var offsetInfo=$('.co-ord-offset');
	var percentage= $('.percentage');
	var currentX, currentY, touchX, touchY, changeX, changeY;
	var rResult=0, gResult=200, bResult=255;
	var intro = document.getElementById('intro');
	var $intro= $('#intro');
	var $distBL= $('.dist-bl');
	var $angBL= $('.ang-bl');
	var $sumInfo= $('.digit');
	var $gradient = $('#gradient');
	var currentR=0,currentG=200,currentB=255;
	var $colorCtrl = $('#colorCtrl');
	var $colorLayer = $('#colorLayer');
	// var overlay = document.getElementById('overlay');
 	var touchHold;
 	var touchSpeed;
 	var flashing=false;
 	var maxY= window.innerHeight;
 	var flashingSpeed= 325;
 	var ringColorChanged=false;
 	var leaveInnerRing=false;
 	var defaultSpeed = 650;
 	var speedTips, speedHoldTimer, speedHoldNeeded=true, speedTipsShowing = false, speedTutNeeded = true, speedArrowShowing=false, arrowShowDelay, arrowHideDelay;
 	var stoppingTips, stoppingTipsShowing = false ,stopTutNeeded = true;
 	var colorTipsNeeded=true, colorTutorial;
 	var promptMsg=document.getElementById('prompt-message');

 	// $('#speed-arrow').css({"transform":"translateY(100%) rotate(45deg) translateX(100%)"});
if( /Android|webOS|BlackBerry|chrome|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	if(screen.height-document.documentElement.clientHeight>80){

	}
 // some code..
}else if(!window.navigator.standalone) {
    		$('#prompt-message').velocity({translateY:"-120px"},{duration:500, delay:1000});
    		setTimeout(function(){
    			$('#prompt-message').velocity({translateY:"120px"},{duration:1000});
    		},10000);
    		
    		promptMsg.addEventListener('touchend',function(){
    			$('#prompt-message').velocity({translateY:"120px", display:"none"},{duration:500});
    		});
		}
 	
 
 	function touchAndHold(){
		touchHold = setTimeout(function(){alert('This is a touch and hold!');},500);
	}
	function stoppingTutorial(){
		if(!stoppingTipsShowing){
			stoppingTipsShowing=true;
			stoppingTips = setTimeout(function(){
				$('.centered p').html("TAP the same corner to stop flashing!\nOr SWIPE left or right to change colour");
				TweenMax.to($('.centered p'),1,{opacity:1});
				stoppingTipsShowing=false;					
			},500);
		}
	}

	function speedHoldMessage(){
		if(!speedTipsShowing){
			speedTipsShowing=true;
			speedTips = setTimeout(function(){
				$('.centered p').html("Try TAP and HOLD the button you just touched");
				TweenMax.to($('.centered p'),1,{opacity:1});
				speedTipsShowing=false;	
			},800);
		}
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
		$colorLayer.velocity("stop",true).velocity({backgroundColor:"#000000"},{duration:1000}).velocity("reverse");
	}

        

speedCircle.addEventListener('touchstart',function(event){
	event.preventDefault();
});
outterRing.addEventListener('touchstart',function(event){
	event.preventDefault();
});
innerRing.addEventListener('touchstart',function(event){
	event.preventDefault();
});

intro.addEventListener('touchstart',function(event){
	event.preventDefault();
	$intro.velocity({opacity:0},{display:"none"},{duration: 1000});
});
//=================== START BUTTON ===================
	startBtn.addEventListener('touchstart',function(event){
		 event.preventDefault();

	},false);

	startBtn.addEventListener('touchend',function(event){
				 event.preventDefault();
		
		if(flashing===false){
			TweenMax.to($('.centered p'),0.5,{opacity:0});
			if(flashingSpeed>defaultSpeed){
				$gradient.velocity({"translateY":"100%"},200);	  			
	  			flashing=true;	
	  		}else{
	  			$gradient.velocity({"translateY":"100%"},200);	
	  			$colorLayer.velocity("stop",true).velocity({opacity: 0},{duration: flashingSpeed, delay: 350},"easeOutExpo").velocity("reverse",{loop: true});
				flashing=true;
	  		}
			$('#speedometer').velocity({opacity:0, display:"none"},{duration: 200, delay:100,queue:false});
			$('#start-icon').velocity({opacity:0, display:"none"},{duration: 200, delay:100,queue:false});
			$('#speed-icon').velocity({opacity:0, display:"none"},{duration: 200, delay:100,queue:false});
			
		}else{
			if(colorTipsNeeded){
				$('#colorTut').velocity({opacity:1},{delay:1000});
				colorTutorial=setTimeout(function(){
					$('#colorTut').velocity({opacity:0});
				},5000);
			}
			clearTimeout(stoppingTips);
			stopTutNeeded=false;
			TweenMax.to($('.centered p'),1,{opacity:0});
			$('#speedometer').velocity({opacity:1, display:"block"},{duration: 200, delay:200,queue:false});
			$('#start-icon').velocity({opacity:1, display:"block"},{duration: 200, delay:200,queue:false});
			$('#speed-icon').velocity({opacity:1, display:"block"},{duration: 200, delay:200,queue:false});
			$gradient.velocity({"translateY":"0%"},{delay: 100},200);
			$colorLayer.velocity("stop",true).velocity({opacity: 1},{duration: flashingSpeed});
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
	  	firstTime=true;
	  	clearTimeout(touchSpeed);

		if(flashing===false){
			clearTimeout(arrowHideDelay);
			if(speedTutNeeded){
				if(speedArrowShowing===false){
					
					
					arrowShowDelay = setTimeout(function(){

						$('#speed-arrow').velocity("stop",true).velocity({translateY: "0px", duration:1000},{begin:function(){
						speedArrowShowing=true;

						}},{queue:false});
					},10);

					speedHoldTimer = setTimeout(function(){
						speedHoldNeeded=false;
						setTimeout(function(){
							$('.centered p').html("Now TAP and HOLD while moving away from the button");	
						},500);
					},500);
				}
			}
			$('#speed-outter-ring path').velocity("stop",true).velocity({fill:"#FFFFFF"},{duration: 20, queue:false});
			$('#speed-outter-ring').velocity("stop",true).velocity({opacity:1, display:"block"},{duration: 200, delay:50, queue:false});
			$('#angle-pointer circle').velocity("stop",true).velocity({fill:"#000000"},{duration: 20, queue:false});
			$('#angle-pointer circle').velocity("stop",true).velocity({opacity:1, display:"block"},{duration: 200, delay:50 ,queue:false});	
			$('#speed-inner-ring').velocity({opacity:1, display:"block"},{duration: 200, queue:false});
			$('.base').velocity("stop",true).velocity({opacity: 0.5, display:"block"},{duration: 200, delay:100});
		ringColorChanged=false;
		}
		
	    posInfo.html("You are now on ("+event.pageX+","+event.pageY+")");
	  	touchedInfo.html("Last touched co-ordinate ("+currentX+","+currentY+")");
	  	offsetInfo.html("X moved "+0+", Y moved "+0);
	  }
	}, false);

	speedCtrl.addEventListener('touchmove',function(event){
		event.preventDefault();
		if(event.targetTouches.length == 1){
			if(flashing===false){
				var distance = Math.round(Math.sqrt( Math.pow(touchX,2)+Math.pow(maxY-touchY,2)));
				var touch = event.targetTouches[0];
				
				touchX= touch.pageX;
		  		touchY=touch.pageY;
		  		$distBL.html("Distance from bottom left: "+distance);
		  		
		  		// $('#angle-pointer').css({"-webkit-transform":"translateX(-50%) rotate("+angle+"deg)"});
		  		if(distance>150){
		  			speedTutNeeded=false;
		  			setTimeout(function(){
							$('.centered p').html("Great! You have now learnt how to adjust the speed!");
							setTimeout(function(){
								TweenMax.to($('.centered p'),1,{opacity:0});
							},2500);	
						},500);
		  			if(speedArrowShowing){
		  				$('#speed-arrow').velocity({opacity:0,duration:1000},{complete:function(){
		  					speedArrowShowing=false;
		  				}});
		  			}
		  			speedTutNeeded=false;
		  			clearTimeout(speedTips);
		  			var angle = Math.max(Math.min(Math.atan2(touchX,maxY-touchY)*180/Math.PI,85),5);
		  			$('#speed-inner-ring').velocity("stop",true).velocity({opacity:0, display:"none"},{duration: 10, queue:false});
		  			if(ringColorChanged===false){
		  				ringColorChanged=true;
		  				$('#speed-outter-ring path').velocity("stop",true).velocity({fill:"#000000"},{duration: 10});
		  				$('#angle-pointer circle').velocity("stop",true).velocity({fill:"#E6E6E6"},{duration: 10, queue:false});	
		  				
		  			}
					
		  			if(angle<=10){
		  				percentage.html("Max");
		  				$('#angle-pointer').velocity("stop",true).velocity({ translateX: "-50%", rotateZ: "5deg"},{duration: 50});	
		  				flashingSpeed= 20;
		  				angle=5;
		  				$angBL.html("Angle: "+angle);
		  			}else if(angle>=80){
		  				percentage.html("Stop");
		  				$('#angle-pointer').velocity("stop",true).velocity({ translateX: "-50%", rotateZ: "85deg"},{duration: 50});	
		  				flashingSpeed= defaultSpeed+10;
		  				angle=85;
		  				$angBL.html("Angle: "+angle);
		  				
		  			}else{
		  				percentage.html(100-Math.min(Math.max(Math.round((angle-10)/70*100),1),99)+"%");
		  				flashingSpeed= Math.max(((angle-5)/77)*defaultSpeed,0);
		  				$angBL.html("Angle: "+angle);
		  				$('#angle-pointer').velocity("stop",true).velocity({ translateX: "-50%", rotateZ: angle+"deg"},{duration: 50});
					}
				}else{
					if(ringColorChanged===true){
						ringColorChanged=false;
						$('#speed-outter-ring path').velocity("stop",true).velocity({fill:"#FFFFFF"},{duration: 10, queue:false});
		  				$('#angle-pointer circle').velocity("stop",true).velocity({fill:"#000000"},{duration: 10, queue:false});	
		  				$('#speed-inner-ring').velocity("stop",true).velocity({opacity:1, display:"block"},{duration: 10, queue:false});
		  			}
					
				}
			}	
		}
		clearTimeout(touchHold);
	},false);


	speedCtrl.addEventListener('touchend', function(event) { 
		event.preventDefault();
		if(speedTutNeeded===true){
			if(speedHoldNeeded){
				speedHoldMessage();
			}
		}
		
		if (event.targetTouches.length == 1) {	  	
			clearTimeout(touchHold);
		}
	}, false);	
//=================== COLOR CONTROL ==================
	colorCtrl.addEventListener('touchstart', function(event) { 
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
	
	

	colorCtrl.addEventListener('touchmove', function(event) {
		clearTimeout(touchHold);
		colorTipsNeeded=false;
		$('#colorTut').velocity({opacity:0});
		
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
	  colorLayer.style.backgroundColor="rgb("+rResult+","+gResult+","+bResult+")";

	 
	  $sumInfo.html("RGB("+rResult+","+gResult+","+bResult+")");

	  if (event.targetTouches.length == 1) {
	  	
	    var touch = event.targetTouches[0];

	    obj.style.left = touch.pageX + 'px';
	    obj.style.top = touch.pageY + 'px';
	  }


	}, false);
	
	document.body.addEventListener('touchstart',function(event){
		event.preventDefault();
		if(flashing===true){
			if(stopTutNeeded===true){
				stoppingTutorial();
			}
		}
	});
	document.body.addEventListener('touchmove',function(event){
		event.preventDefault();
		clearTimeout(stoppingTips);
	});


	document.body.addEventListener('touchend', function(event) {
		event.preventDefault();
		clearTimeout(touchHold);
		clearTimeout(arrowShowDelay);
		clearTimeout(speedHoldTimer);
		if(flashing===true){
			clearTimeout(speedTips);
		}

		if(speedArrowShowing){
			
			arrowHideDelay=setTimeout(function(){
				$('#speed-arrow').velocity("stop",true).velocity({translateY:"270px", duration:1000},{begin: function(){
				speedArrowShowing=false;
				
				}});	
			},10);
			
		}
		ringColorChanged=false;
		touchSpeed= setTimeout(function(){
			$('#speed-outter-ring').velocity("stop",true).velocity({opacity:0, display:"none"},{duration: 200 ,queue:false});

			$('#speed-outter-ring path').velocity("stop",true).velocity({fill:"#FFFFFF"},{duration: 10, delay:200, queue:false});

			$('#angle-pointer circle').velocity("stop",true).velocity({opacity:0, display:"none"},{duration: 200 ,queue:false});

			$('#angle-pointer circle').velocity("stop",true).velocity({fill:"#000000"},{duration: 10 ,delay:200 ,queue:false});	
			
			$('#speed-inner-ring').velocity("stop",true).velocity({opacity:0, display:"none"},{duration: 200 ,delay:50 ,queue:false});

			$('.base').velocity("stop",true).velocity({opacity: 0, display:"none"},{duration: 200, delay:100, queue: false});

		},300);
		
		currentR=rResult;
		currentG=gResult;
		currentB=bResult;
	}, false);
});

