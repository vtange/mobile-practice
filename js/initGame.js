/**
* Load the scene when the canvas is fully loaded
*/
document.addEventListener("DOMContentLoaded", function () {
	////////////
	//touchpad//
	////////////
	/*
	var svg = document.getElementById("svg");
	var fngr = document.getElementById("fngr");
	const svgdims = svg.getBoundingClientRect();
	const svgTop = svgdims.top;
	const svgLef = svgdims.left;

	d3.select(svg).call(
		d3.drag()
		.on("start",function(){
			fngr.setAttribute("cx",d3.event.x-svgLef);
			fngr.setAttribute("cy",d3.event.y-svgTop);
			fngr.style.opacity = 1;
		})
		.on("drag",function(){
			fngr.setAttribute("cx",d3.event.x-svgLef);
			fngr.setAttribute("cy",d3.event.y-svgTop);
		})
		.on("end",function(){
			fngr.style.opacity = 0;
		})
	);
	*/
	///////////////
	//shakecharge//
	///////////////
	var rect = document.getElementById("shakecharger");
	var cord = document.getElementById("cord");
	var iX = 0;
	var iY = 0;
	const rectDims = rect.getBoundingClientRect();
	const rWidth = rectDims.width;
	const rHeight = rectDims.height;
	const wWidth = window.innerWidth-400;
	const wHeight = window.innerHeight-400;
	d3.select(rect).call(
		d3.drag()
		.on("start",function(){
			window.ondevicemotion = function(event) {
				iX += Math.abs(event.accelerationIncludingGravity.x);
				iY += Math.abs(event.accelerationIncludingGravity.y);
			}
		})
		.on("drag",function(){
			var x = Math.max(0, Math.min( parseInt(rect.getAttribute("x"),10) + d3.event.dx, wWidth));
			var y = Math.max(0, Math.min( parseInt(rect.getAttribute("y"),10) + d3.event.dy, wHeight));
			iX += Math.abs(d3.event.dx);
			iY += Math.abs(d3.event.dy);
			rect.setAttribute("x",x);
			rect.setAttribute("y",y);
			cord.setAttribute("x2",x+rWidth/2);
			cord.setAttribute("y2",y+rHeight/2);
		})
		.on("end",function(){
			var element = document.createTextNode(iX+","+iY);
			var br = document.createElement("br");
			document.body.appendChild(element);
			document.body.appendChild(br);
			window.ondevicemotion = null;
		})
	);
}, false);

//Service Worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw-test/sw.js', {scope: '/'})
	.then(function(reg) {
	  // registration worked
	  console.log('Registration succeeded. Scope is ' + reg.scope);
	}).catch(function(error) {
	  // registration failed
	  console.log('Registration failed with ' + error);
	});
}