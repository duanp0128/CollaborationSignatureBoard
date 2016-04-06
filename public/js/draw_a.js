var pathA;

function onMouseDown(event) {
	pathA = new Path();
	pathA.strokeWidth = 2;
	pathA.strokeColor = 'black';
	pathA.fullySelected = false;
}

function onMouseDrag(event) {
	pathA.add(event.point);
	emitPoint(event.point.x, event.point.y);
}

function onMouseUp(event) {
	emitPoint(-1, -1);
}

function emitPoint(x, y) {
	var data = {
		x: x,
		y: y
	};
	socket.emit("draw_line_a", data);
}

$("#btn-refresh-a").click(function() {
	socket.emit("reset_all", "reset a");
	$("#btn-a").show();
});

socket.on('reset_client', function(data) {
	paper.project.activeLayer.removeChildren();
  	paper.view.draw();
});
