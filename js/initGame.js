/**
* Load the scene when the canvas is fully loaded
*/
document.addEventListener("DOMContentLoaded", function () {
	var strDivID = "BABYLON_GAME";
	var canvas = document.getElementById(strDivID);
	var support = BABYLON.Engine.isSupported();

    if (support && canvas) {

		var game_core = new Scene(canvas);
		game_core.loadMap(library_f2);
    }
	else
	{
		//write non-supported error on #BABYLON_GAME
	}
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
}, false);
