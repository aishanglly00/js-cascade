window.onload = function(){
	var cparent = document.getElementById("container");
	imgLocation("container","box");
	
	var imgData = {"data":[{"src":"5.jpg"},{"src":"6.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"1.jpg"},{"src":"4.jpg"},{"src":"7.jpg"},{"src":"3.jpg"},{"src":"2.jpg"}]};
	window.onscroll = function(){
		if (checkFlag()) {
			for (var i=0;i < imgData.data.length;i++) {
				var content = document.createElement("div");
				content.className = "box";
				cparent.appendChild(content);
				var boximg = document.createElement("div");
				boximg.className = "box-img";
				content.appendChild(boximg);
				var img = document.createElement("img");
				img.src = "img/" + imgData.data[i].src;
				boximg.appendChild(img);
			}
			imgLocation("container","box");
		}
	}
	
	function checkFlag(){
		var ccontent = getChildElement(cparent,"box");
		var lastContentTop = ccontent[ccontent.length-1].offsetTop;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
		if (lastContentTop < scrollTop+pageHeight) {
			return true;
		}
	}
	
	function imgLocation(parent,content){
		var ccontent = getChildElement(cparent,content);
		var imgWidth = ccontent[0].offsetWidth;
		var num = Math.floor(document.documentElement.clientWidth/imgWidth);
		cparent.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
		
		var boxHeightArr = [];
		for (var i=0;i<ccontent.length;i++) {
			if (i<num) {
				boxHeightArr[i] = ccontent[i].offsetHeight;
			} else{
				var minheight = Math.min.apply(null,boxHeightArr);
				var minindex = getminHeightLocation(boxHeightArr,minheight);
				ccontent[i].style.position = "absolute";
				ccontent[i].style.top = minheight + "px";
				ccontent[i].style.left = imgWidth*minindex + "px";
				boxHeightArr[minindex] += ccontent[i].offsetHeight;
			}
		}
	}
	
	function getminHeightLocation(boxHeightArr,minheight){
		for (var i in boxHeightArr) {
			if (boxHeightArr[i] == minheight) {
				return i;
			}
		}
	}
	
	function getChildElement(parent,content){
		var contentArr = [];
		var allcontent = parent.getElementsByTagName("*");
		for (var i=0;i<allcontent.length;i++) {
			if (allcontent[i].className == content) {
				contentArr.push(allcontent[i]);
			}
		}
		return contentArr;
	}
}
