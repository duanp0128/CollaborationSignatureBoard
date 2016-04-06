$(function() {
  var pathMainA = new Path();
  pathMainA.strokeWidth = 5;
  pathMainA.strokeColor = 'black';
  var imgObjA = window.parent.document.getElementById('img-a');

  socket.on('main_reset_a', function() {
    paper.project.activeLayer.removeChildren();
    paper.view.draw();
    imgObjA.src = "../img/xiao_bg.png";
    $(imgObjA).css({
      "left": '-400px',
      "z-index": "0"
    });
  });

  socket.on('main_draw_a', function(data) {
    drawSketchA(data.x, data.y);
  });

  socket.on('main_reset_a', function() {
  	paper.project.activeLayer.removeChildren();
  	paper.view.draw();

    pathMainA = new Path();
    pathMainA.strokeWidth = 5;
    pathMainA.strokeColor = 'black';
  });

  socket.on('main_a', function(msg) {
    var canvas_a = document.getElementById("canvas_c");
    var dataURL_a = canvas_a.toDataURL();
    imgObjA.src = dataURL_a;

    paper.project.activeLayer.removeChildren();
    paper.view.draw();

    var addRightNext = 0.1;
    $(imgObjA).css("z-index", "2");
    var animate;
    moveRight();

    function moveRight() {
      imgObjARight = parseInt($(imgObjA).css("left"));
      topY = -Math.sqrt(200 * 200 - (imgObjARight + 200) * (imgObjARight + 200)) + 500;
      $(imgObjA).css({
        "left": (imgObjARight + addRightNext) + 'px',
        "top": topY + 'px'
      });
      if (imgObjARight < -201) {
        addRightNext = addRightNext * 1.001;
      } else {
        addRightNext = addRightNext / 1.001;
      }

      if (imgObjARight > -1)
        stop();
      else
        animate = setTimeout(moveRight, 2); // call moveRight in 20msec
    }

    function stop() {
      clearTimeout(animate);
    }
  });

  function drawSketchA(x, y) {
    if (x == -1 && y == -1) {
      pathMainA = new Path();
      pathMainA.strokeWidth = 5;
      pathMainA.strokeColor = 'black';
    } else {
      pathMainA.add(x, y);
      view.draw();
    }
  }

});
