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
	var iX = 0;
	var iY = 0;
	d3.select(rect).call(
		d3.drag()
		.on("drag",function(){
			var x = parseInt(rect.getAttribute("x"),10) + d3.event.dx;
			var y = parseInt(rect.getAttribute("y"),10) + d3.event.dy;
			iX += Math.abs(d3.event.dx);
			iY += Math.abs(d3.event.dy);
			rect.setAttribute("x",x);
			rect.setAttribute("y",y);
		})
		.on("end",function(){
			console.log(iX);
			console.log(iY);
		})
	);

	window.ondevicemotion = function(event) {
		 event.accelerationIncludingGravity.x
		 event.accelerationIncludingGravity.y
		 event.accelerationIncludingGravity.z
	}
}, false);
