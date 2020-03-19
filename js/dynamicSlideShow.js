/***
	CREATION DATE: 2016-08-28
	AUTHOR NAME neisii
	E-MAIL: neisii@outlook.com
	
	*** FUNCTION LIST ***
		function slideImage()
		function autoStartSlideShow(): auto start SlideShow
		function getSildeShowStatus(): toggle Slide Show
		function addAlbumImages()
		function albumListInitialization()
***/

var TimerID = null;
var IntervalTime = null;
var recentPage = 1;
var nextPage = 1;
var totalNum = 0;
var totalPage = 0;
var pagePerImages = 0;
var imgPath = "./images/";

function slideImage(num) {
	
	nextPage = Number(recentPage)+Number(num);
	
	if( Number(1) == num && (Number(recentPage)+Number(num)) > totalPage ) {
		nextPage = 1;
	} else if( Number(-1) == num && (Number(recentPage)+Number(num)) < 1 ) {
		nextPage = Number(totalPage);
	}
	
	for(var i=1; i <= totalPage; i++) {
		if(i == nextPage) {
			document.getElementById("list"+i+"").className = "displayOn";
		} else {
			document.getElementById("list"+i+"").className = "displayOff";
		}
	}

	recentPage = nextPage;
	document.getElementById("recentPage").innerText = ""+recentPage+"";
}


function autoStartSlideShow() {
	if(null == IntervalTime) {
		alert("IntervalTime must be initialized!");
	} else {
		TimerID = setInterval("slideImage(1)", Number(IntervalTime)); //실행할 function, 주기(1000*초)
	}
}


function getSildeShowStatus() {
	var btn_setOnOff = document.getElementById("btn_setOnOff");
	var pause = "pause";
	var play = "play";
	var stop = "stop";
	var start = "start";
	
	//여기서 alt는 현재 상태를 나타낸다.(재생 또는 중지)
	if(start == btn_setOnOff.alt) { //재생 중일 때
		btn_setOnOff.alt = pause;
		btn_setOnOff.value = play;
		clearInterval(TimerID);
	} else if(pause == btn_setOnOff.alt) { //중지 중일 때
		btn_setOnOff.alt = start;
		btn_setOnOff.value = stop;
		autoStartSlideShow();
	}
	
}


function addAlbumImages() {
	var pageCnt = 1;
	var imageCnt = 0;
	var lastPageImageCnt = 0;
	var AlbumImagesInitializationResult = false;
	
	if( 0 != objArr.length) {
		
		totalNum = objArr.length;
		
		if(pagePerImages > totalNum) { //페이지 당 보여줄 이미지 갯수보다 총 이미지 갯수가 적은 경우
			alert("pagePerImages must be lower than totalNum!");
			AlbumImagesInitializationResult = false;
			return AlbumImagesInitializationResult;
		}
		
		lastPageImageCnt = (1 <= totalNum%pagePerImages) ? Number(parseInt(totalNum%pagePerImages)) : Number(pagePerImages);
		totalPage = (1 <= totalNum%pagePerImages) ? Number(parseInt(totalNum/pagePerImages)+1) : Number(totalNum/pagePerImages);
		
	
		for( ; pageCnt<= totalPage; pageCnt++) {
			
			var listElement = document.createElement("li");
			listElement.id = "list"+pageCnt+"";
			
			if(1 == pageCnt) { //첫번째 페이지는 보이기
				listElement.className = "displayOn";
			} else if(1 < pageCnt) { //두번째 페이지부터는 기본적으로 보여주지 않는다.
				listElement.className = "displayOff";
			}
			
			
			/****************** START OF 페이지에 이미지 뿌리기 ******************/
			
			if(pageCnt == totalPage) { //마지막 페이지면 남은 갯수만큼 이미지를 뿌려준다.
				for(var j=0; j < lastPageImageCnt; j++) {
					var imgElement = document.createElement("img");
					imgElement.src = ""+imgPath+objArr[imageCnt]+"";
					listElement.appendChild(imgElement);
					imageCnt++;
				}
				
			} else { //첫번째 페이지부터 마지막 페이지 전까지의 페이지에는 이미지를 pagePerImages만큼 이미지를 뿌려준다.
				for(var j=0; j < pagePerImages; j++) {
					var imgElement = document.createElement("img");
					imgElement.src = ""+imgPath+objArr[imageCnt]+"";
					listElement.appendChild(imgElement);
					imageCnt++;
				}
				
			}
			/****************** END OF 페이지에 이미지 뿌리기 ******************/
			
			var targetElement = document.getElementById("albumList");
			targetElement.appendChild(listElement);
			
			
		}
		
		document.getElementById("recentPage").innerText = ""+recentPage+"";
		
		AlbumImagesInitializationResult = true;
		
	} else {
		AlbumImagesInitializationResult = false;
		
	}
	
	return AlbumImagesInitializationResult;
}


function albumListInitialization(pagePerImages, IntervalTime) {
	var AlbumListInitializationResult = null;
	
	if(undefined == pagePerImages) {
		alert("pagePerImages must be initialized!");
		return false;
	} else {
		this.pagePerImages = pagePerImages;
	}
	
	if(undefined == IntervalTime) {
		alert("IntervalTime must be initialized!");
		
	} else {
		this.IntervalTime = IntervalTime;
		AlbumListInitializationResult = addAlbumImages();
		
		if(true == AlbumListInitializationResult) {
			autoStartSlideShow();
		} else {
			alert("Fail to initialize albumList!");
		}
		
	}
	
}