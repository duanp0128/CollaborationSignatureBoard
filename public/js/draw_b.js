var pathB;

function onMouseDown(event) {
	pathB = new Path();
	pathB.strokeWidth = 2;
	pathB.strokeColor = 'black';
	pathB.fullySelected = false;
}

function onMouseDrag(event) {
	pathB.add(event.point);
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
	socket.emit("draw_line_b", data);
}

$("#btn-refresh-b").click(function() {
	socket.emit("reset_all", "reset b");
	$("#btn-b").show();
});

socket.on('reset_client', function(data) {
	paper.project.activeLayer.removeChildren();
  	paper.view.draw();
});