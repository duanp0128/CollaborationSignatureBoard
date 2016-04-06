$(function() {
  var pathMainB = new Path();
  pathMainB.strokeWidth = 5;
  pathMainB.strokeColor = 'black';
  var imgObjB = window.parent.document.getElementById('img-b');

  socket.on('main_reset_b', function() {
    paper.project.activeLayer.removeChildren();
    paper.view.draw();
    imgObjB.src = "../img/zou_bg.png";
    $(imgObjB).css({
      "left": '800px',
      "z-index": "0"
    });
  });

  socket.on('main_draw_b', function(data) {
    drawSketchB(data.x, data.y);
  });
  socket.on('main_reset_b', function() {
  	paper.project.activeLayer.removeChildren();
  	paper.view.draw();

    pathMainB = new Path();
    pathMainB.strokeWidth = 5;
    pathMainB.strokeColor = 'black';
  });

  socket.on('main_b', function(msg) {
    var canvas_b = document.getElementById("canvas_d");
    var dataURL_b = canvas_b.toDataURL();
    imgObjB.src = dataURL_b;

    paper.project.activeLayer.removeChildren();
    paper.view.draw();

    var addLeftNext = 0.1;
    $(imgObjB).css("z-index", "2");
    var animate;
    moveLeft();

    function moveLeft() {
      imgObjBLeft = parseInt($(imgObjB).css("left"));
      topY = -Math.sqrt(200 * 200 - (imgObjBLeft - 600) * (imgObjBLeft - 600)) + 500;
      $(imgObjB).css({
        "left": (imgObjBLeft - addLeftNext) + 'px',
        "top": topY + 'px'
      });
      if (imgObjBLeft > 600) {
        addLeftNext = addLeftNext * 1.001;
      } else {
        addLeftNext = addLeftNext / 1.001;
      }

      if (imgObjBLeft < 401)
        stop();
      else
        animate = setTimeout(moveLeft, 2); // call moveRight in 20msec
    }

    function stop() {
      clearTimeout(animate);
    }
  });

  function drawSketchB(x, y) {
    if (x == -1 && y == -1) {
      pathMainB = new Path();
      pathMainB.strokeWidth = 5;
      pathMainB.strokeColor = 'black';
    } else {
      pathMainB.add(x, y);
      view.draw();
    }
  }

});
