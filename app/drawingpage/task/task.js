"use strict";
var taskdevider = function (subElement,svg){  
 console.log("commming")

var w = window.innerWidth,
    h = window.innerHeight
//     r = 120;

var isXChecked = true,
    isYChecked = true;

var width = 120,
    height = 80,
    dragbarw = 20;

var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove);

var dragright = d3.behavior.drag()
    .origin(Object)
    .on("drag", rdragresize);

var dragleft = d3.behavior.drag()
    .origin(Object)
    .on("drag", ldragresize);

var dragtop = d3.behavior.drag()
    .origin(Object)
    .on("drag", tdragresize);

var dragbottom = d3.behavior.drag()
    .origin(Object)
    .on("drag", bdragresize);

// var svg = d3.select("body").append("svg")
//     .attr("width", w)
//     .attr("height", h)

var newg = svg.append("g")
      .data([{x: d3.event.pageX, y: d3.event.pageY}]);
      // .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')

var dragrect = newg.append("rect")
      // .attr("id", "active")
      // .attr("x", function(d) { return d.x; })
      // .attr("y", function(d) { return d.y; })
      // .attr("height", height)
      // .attr("width", width)
      // .attr("fill-opacity", .5)
      // .attr("cursor", "move")
      // .call(drag);
         // sampleSVG.append('svg:rect')
    // g2.append('svg:rect')

     //   .append('g')
  // .attr('class', 'draggableSquare')

           .attr('class', 'square')
           // .attr("marker-end", "url(#resizetask"+(++idtaskelement)+")")
            .attr('id', 'task' + (++idtaskelement))
            .style("stroke", "black")
            .attr("x", function(d) { return d3.event.pageX})
            .attr("y", function(d) { return d3.event.pageY})
            .style("stroke-width", "2")
            .style("fill", "white")
            .attr("cursor", "move")
            // .attr("x",d3.event.pageX)
            // .attr("y",d3.event.pageY)
          // .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 120)
            .attr("height", 80)
            // .attr("width", function (d) {
            //     return 120;
            // })
            // .attr("height", function (d) {
            //     //return d.height;
            //     return 80;
            // })
            .on("dragend", function () { 
                console.log("drag start event")
             })
            .on("mouseover", function () {
                d3.select(this).style("fill", "aliceblue");
                var point = d3.mouse(this)
                    , p = {mx: point[0], my: point[1]};

                console.log(p.mx + "and " + p.my);


            })
            .on("mouseup", function () {
                d3.select(this).style("fill", "aliceblue");
                var t = d3.select(this).attr("id");
                console.log("++++++id++++++")
                console.log(t)

                function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
                }

                var circle = document.getElementById(t),
                    cx = +circle.getAttribute('x'),
                    cy = +circle.getAttribute('y'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                    console.log("========cordeinate=======")
                console.log(coords.x, coords.y);

                tooltipDiv.transition()
                    .duration(200)
                    .style("opacity", 1.9);

                tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" +"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "text-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/review.png" + " alt=" + "Text" + " style=" + "width:25px;" + " >")
                    .style("left", coords.x + 130 + "px")
                    .style("top", (coords.y + 15) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    deleteElement(t);
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    tmodal.style.display = "block";
                });
                tooltipDiv.select("#arrow-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end arrow button clicked ")
                    starttype = "task";
                    startid =t;
                    startx = coords.x;
                    starty = coords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";
                });
            })
            .on("mouseout", function () {
                d3.select(this).style("fill", "white");
                tooltipDiv.transition()
                    .duration(3200)
                    .style("opacity", 0);
            })
            .on("click", function () {
                //tmodal.style.display = "block";
                d3.select(this).style("fill", "white");
                var t = d3.select(this).attr("id");
                function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
                }

                var circle = document.getElementById(t),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);

                if (window.bpmnElement === "flow") {
                    starttype = "task";
                    startid =t;
                    startx = coords.x;
                    starty = coords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";
                    console.log("ok1")
                    console.log(startx)
                    console.log(starty)
                } else if (window.bpmnElement === "flowselect") {
                    endtype = "task"
                    window.bpmnElement = null
                    if (coords.x > startx) {
                        if (starttype === "startEvent") {
                            startx = startx + 20;
                            starty = starty;  
                        }else if (starttype === "task") {
                            startx = startx + 120;
                            starty = starty + 40;
                        }else if (starttype === "gateway") {
                            startx = startx + 30;
                            starty = starty + 30;
                        }
                        endx = coords.x - 7;
                        endy = coords.y + 40;
                    }else if (coords.x < startx) {
                        if (starttype === "startEvent") {
                            startx = startx - 20;
                            starty = starty;  
                        }else if (starttype === "task") {
                            startx = startx - 2;
                            starty = starty + 40;
                        }else if (starttype === "gateway") {
                            startx = startx - 30;
                            starty = starty + 30;
                        }
                        endx = coords.x + 127;
                        endy = coords.y + 40;
                    }
                    

                    midx = startx + ((endx - startx) / 2);


                    sampleSVG.append("marker")
                        .attr("id", "triangle"+(++idflow))
                        .attr("viewBox", "0 0 10 10")
                        .attr("refX", "0")
                        .attr("refY", "5")
                        .attr("markerUnits", "strokeWidth")
                        .attr("markerWidth", "5")
                        .attr("markerHeight", "4")
                        .attr("orient", "auto")
                        .append('svg:path')
                        .attr('d', 'M 0 0 L 10 5 L 0 10 z');


                    sampleSVG.append("polyline")      // attach a polyline
                        .attr("id", "flow"+idflow)
                        .attr("marker-end", "url(#triangle"+idflow+")")
                        .style("stroke", "black")  // colour the line
                        .style("fill", "none")     // remove any fill colour
                        .style("stroke-width", "2")
                        .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

                   FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx,starttype,endtype);    
                 //   starttype= "";
                 //   endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                }

            })
            .call(drag);

var dragbarleft = newg.append("rect")
      .attr("x", function(d) { return d3.event.pageX - (dragbarw/2); })
      .attr("y", function(d) { return d3.event.pageY + (dragbarw/2); })
      .attr("height", height - dragbarw)
    //  .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("id", "dragleft")
      .attr("width", dragbarw)
      .attr("fill", "lightblue")
      .attr("fill-opacity", 0)
      .attr("cursor", "ew-resize")
      .call(dragleft);

var dragbarright = newg.append("rect")
      .attr("x", function(d) { return d3.event.pageX + width - (dragbarw/2); })
      .attr("y", function(d) { return d3.event.pageY + (dragbarw/2); })
      .attr("id", "dragright")
      .attr("height", height - dragbarw)
   //   .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("width", dragbarw)
      .attr("fill", "lightblue")
      .attr("fill-opacity", 0)
      .attr("cursor", "ew-resize")
      .call(dragright);

var dragbartop = newg.append("rect")
      .attr("x", function(d) { return d3.event.pageX + (dragbarw/2); })
      .attr("y", function(d) { return d3.event.pageY - (dragbarw/2); })
      .attr("height", dragbarw)
      .attr("id", "dragleft")
      .attr("width", width - dragbarw)
     // .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("fill", "lightgreen")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragtop);

var dragbarbottom = newg.append("rect")
      .attr("x", function(d) { return d3.event.pageX + (dragbarw/2); })
      .attr("y", function(d) { return d3.event.pageY + height - (dragbarw/2); })
      .attr("id", "dragright")
      .attr("height", dragbarw)
      .attr("width", width - dragbarw)
  //    .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("fill", "lightgreen")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragbottom);


      function dragmove(d) {
 // if (isXChecked) {
      dragrect

          .attr("x", d.x = Math.max(0, Math.min(window.innerWidth, d3.event.x)))
        //  .attr("x", function(d) { return d.x - (dragbarw/2); })
      dragbarleft 
          .attr("x", function(d) { return d.x - (dragbarw/2); })
      dragbarright 
          .attr("x", function(d) { return d.x + width - (dragbarw/2); })
      dragbartop 
          .attr("x", function(d) { return d.x + (dragbarw/2); })
      dragbarbottom 
          .attr("x", function(d) { return d.x + (dragbarw/2); })
  // }
  // if (isYChecked) {
      dragrect
          .attr("y", d.y = Math.max(0, Math.min(window.innerHeight, d3.event.y)));
      dragbarleft 
          .attr("y", function(d) { return d.y + (dragbarw/2); });
      dragbarright 
          .attr("y", function(d) { return d.y + (dragbarw/2); });
      dragbartop 
          .attr("y", function(d) { return d.y - (dragbarw/2); });
      dragbarbottom 
          .attr("y", function(d) { return d.y + height - (dragbarw/2); });
//  }
}

function ldragresize(d) {
   if (isXChecked) {
      var oldx = d.x; 
     //Max x on the right is x + width - dragbarw
     //Max x on the left is 0 - (dragbarw/2)
      d.x = Math.max(0, Math.min(d.x + width - (dragbarw / 2), d3.event.x)); 
      width = width + (oldx - d.x);
      dragbarleft
        .attr("x", function(d) { return d.x - (dragbarw / 2); });
       
      dragrect
        .attr("x", function(d) { return d.x; })
        .attr("width", width);

     dragbartop 
        .attr("x", function(d) { return d.x + (dragbarw/2); })
        .attr("width", width - dragbarw)
     dragbarbottom 
        .attr("x", function(d) { return d.x + (dragbarw/2); })
        .attr("width", width - dragbarw)
  }
}

function rdragresize(d) {
   if (isXChecked) {
     //Max x on the left is x - width 
     //Max x on the right is width of screen + (dragbarw/2)
     var dragx = Math.max(d.x + (dragbarw/2), Math.min(w, d.x + width + d3.event.dx));

     //recalculate width
     width = dragx - d.x;

     //move the right drag handle
     dragbarright
        .attr("x", function(d) { return dragx - (dragbarw/2) });

     //resize the drag rectangle
     //as we are only resizing from the right, the x coordinate does not need to change
     dragrect
        .attr("width", width);
     dragbartop 
        .attr("width", width - dragbarw)
     dragbarbottom 
        .attr("width", width - dragbarw)
  }
}

function tdragresize(d) {
 
   if (isYChecked) {
      var oldy = d.y; 
     //Max x on the right is x + width - dragbarw
     //Max x on the left is 0 - (dragbarw/2)
      d.y = Math.max(0, Math.min(d.y + height - (dragbarw / 2), d3.event.y)); 
      height = height + (oldy - d.y);
      dragbartop
        .attr("y", function(d) { return d.y - (dragbarw / 2); });
       
      dragrect
        .attr("y", function(d) { return d.y; })
        .attr("height", height);

      dragbarleft 
        .attr("y", function(d) { return d.y + (dragbarw/2); })
        .attr("height", height - dragbarw);
      dragbarright 
        .attr("y", function(d) { return d.y + (dragbarw/2); })
        .attr("height", height - dragbarw);
  }
}

function bdragresize(d) {
   if (isYChecked) {
     //Max x on the left is x - width 
     //Max x on the right is width of screen + (dragbarw/2)
     var dragy = Math.max(d.y + (dragbarw/2), Math.min(h, d.y + height + d3.event.dy));

     //recalculate width
     height = dragy - d.y;

     //move the right drag handle
     dragbarbottom
        .attr("y", function(d) { return dragy - (dragbarw/2) });

     //resize the drag rectangle
     //as we are only resizing from the right, the x coordinate does not need to change
     dragrect
        .attr("height", height);
     dragbarleft 
        .attr("height", height - dragbarw);
     dragbarright 
        .attr("height", height - dragbarw);
  }
}



//         var distance = function (p1, p2) {
//         return Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
//             };

//         var resize2 = d3.behavior.drag()
//             .on('drag', function () {
//                 var c = g2.selectAll('.resizingSquare');
//                 var s = g2.selectAll('.square');

//                 var e = d3.event;
//                 var x = Number(this.attributes.x.value);
//                 var y = Number(this.attributes.y.value);
//                 var w = Number(this.attributes.width.value);
//                 var h = Number(this.attributes.height.value);
//                 var c1 = { x: x, y: y };
//                 var c2 = { x: x + w, y: y };
//                 var c3 = { x: x + w, y: y + h };
//                 var c4 = { x: x, y: y + h };

//                 // figure out which corner this is closest to
//                 var d = [];
//                 var m1 = distance(e, c1);
//                 var m2 = distance(e, c2);
//                 var m3 = distance(e, c3);
//                 var m4 = distance(e, c4);
//                 switch (Math.min(m1, m2, m3, m4)) {
//                     case m3:
//                         c
//                             .attr('width', function () { return w + (e.x - c3.x) + 12; })
//                             .attr('height', function () { return h + (e.y - c3.y) + 12; });
//                         s
//                             .attr('width', function () { return w + (e.x - c3.x); })
//                             .attr('height', function () { return h + (e.y - c3.y); });
//                         break;
//                 }
//             });

// // var group = svg.append('g')
// //         .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
// //         .selectAll('.draggableSquare')
// //         .data([{
// //             x: 65,
// //             y: 155,
// //             width: 120,
// //             height: 80
// //         }])
// //         .enter()
// //         .attr('class', 'draggableSquare');
// //         .call(drag)
// // var sampleSVG = svg;

//             g2 =  svg
//         .selectAll('.draggableSquare')
//         .data([{
//             x: 65,
//             y: 155,
//             width: 120,
//             height: 80
//         }])
//         .enter()
//         .append('g')
//         .attr('class', 'draggableSquare')
//         .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
//        // .call(drag);
//      //  .call(resize2)


//          g2.append('svg:rect')
//       //  sampleSVG.append('svg:rect')
        
//         //.append('g')
//        // .attr('class', 'draggableSquare')

//             .attr('class', 'resizingSquare')
//             .attr('id', 'resizetask' + (++idtaskelement))
//             .attr("width", function (d) {
//                // return d.width + 7;
//                return 120 + 7;
//             })
//             .attr("height", function (d) {
//                // return d.height + 7;
//                return 80 + 7;
//             })
//           //  .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
//             .attr("x", function (d) {
//                 return d3.event.pageX - 3;
//             })
//             .attr("y", function (d) {
//                 return d3.event.pageY - 3;
//             })
//             .attr("rx", 6)
//             .attr("ry", 6)
//             .style("fill", '#808080')
//             .call(resize2)
//             //.call(drag);










//    // sampleSVG.append('svg:rect')
//      g2.append('svg:rect')

//      //   .append('g')
//   // .attr('class', 'draggableSquare')

//            .attr('class', 'square')
//            .attr("marker-end", "url(#resizetask"+idtaskelement+")")
//             .attr('id', 'task' + idtaskelement)
//             .style("stroke", "black")
//             .style("stroke-width", "2")
//             .style("fill", "white")
//            // .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
//             .attr("rx", 10)
//             .attr("ry", 10)
//             // .attr("width", 120)
//             // .attr("height", 80)
//             .attr("width", function (d) {
//                 return 120;
//             })
//             .attr("height", function (d) {
//                 //return d.height;
//                 return 80;
//             })
//             .on("dragend", function () { 
//                 console.log("drag start event")
//              })
//             .on("mouseover", function () {
//                 d3.select(this).style("fill", "aliceblue");
//                 var point = d3.mouse(this)
//                     , p = {mx: point[0], my: point[1]};

//                 console.log(p.mx + "and " + p.my);


//             })
//             .on("mouseup", function () {
//                 d3.select(this).style("fill", "aliceblue");
//                 var t = d3.select(this).attr("id");

//                 function getScreenCoords(x, y, ctm) {
//                     var xn = ctm.e + x * ctm.a + y * ctm.c;
//                     var yn = ctm.f + x * ctm.b + y * ctm.d;
//                     return {x: xn, y: yn};
//                 }

//                 var circle = document.getElementById(t),
//                     cx = +circle.getAttribute('cx'),
//                     cy = +circle.getAttribute('cy'),
//                     ctm = circle.getCTM(),
//                     coords = getScreenCoords(cx, cy, ctm);
//                 console.log(coords.x, coords.y);

//                 tooltipDiv.transition()
//                     .duration(200)
//                     .style("opacity", 1.9);

//                 tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" +"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "text-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/review.png" + " alt=" + "Text" + " style=" + "width:25px;" + " >")
//                     .style("left", coords.x + 130 + "px")
//                     .style("top", (coords.y + 15) + "px");


//                 tooltipDiv.select("#trash-button").on("click", function () {
//                     deleteElement(t);
//                     // semodal.style.display = "block";
//                 });

//                 tooltipDiv.select("#property-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     console.log("end evnt button clicked ")
//                     tmodal.style.display = "block";
//                 });
//                 tooltipDiv.select("#arrow-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     console.log("end arrow button clicked ")
//                     starttype = "task";
//                     startid =t;
//                     startx = coords.x;
//                     starty = coords.y;
//                     window.bpmnElement = "flowselect";
//                     document.body.style.cursor = "e-resize";
//                 });
//             })
//             .on("mouseout", function () {
//                 d3.select(this).style("fill", "white");
//                 tooltipDiv.transition()
//                     .duration(3200)
//                     .style("opacity", 0);
//             })
//             .on("click", function () {
//                 //tmodal.style.display = "block";
//                 d3.select(this).style("fill", "white");
//                 var t = d3.select(this).attr("id");
//                 function getScreenCoords(x, y, ctm) {
//                     var xn = ctm.e + x * ctm.a + y * ctm.c;
//                     var yn = ctm.f + x * ctm.b + y * ctm.d;
//                     return {x: xn, y: yn};
//                 }

//                 var circle = document.getElementById(t),
//                     cx = +circle.getAttribute('cx'),
//                     cy = +circle.getAttribute('cy'),
//                     ctm = circle.getCTM(),
//                     coords = getScreenCoords(cx, cy, ctm);

//                 if (window.bpmnElement === "flow") {
//                     starttype = "task";
//                     startid =t;
//                     startx = coords.x;
//                     starty = coords.y;
//                     window.bpmnElement = "flowselect";
//                     document.body.style.cursor = "e-resize";
//                     console.log("ok1")
//                     console.log(startx)
//                     console.log(starty)
//                 } else if (window.bpmnElement === "flowselect") {
//                     endtype = "task"
//                     window.bpmnElement = null
//                     if (coords.x > startx) {
//                         if (starttype === "startEvent") {
//                             startx = startx + 20;
//                             starty = starty;  
//                         }else if (starttype === "task") {
//                             startx = startx + 120;
//                             starty = starty + 40;
//                         }else if (starttype === "gateway") {
//                             startx = startx + 30;
//                             starty = starty + 30;
//                         }
//                         endx = coords.x - 7;
//                         endy = coords.y + 40;
//                     }else if (coords.x < startx) {
//                         if (starttype === "startEvent") {
//                             startx = startx - 20;
//                             starty = starty;  
//                         }else if (starttype === "task") {
//                             startx = startx - 2;
//                             starty = starty + 40;
//                         }else if (starttype === "gateway") {
//                             startx = startx - 30;
//                             starty = starty + 30;
//                         }
//                         endx = coords.x + 127;
//                         endy = coords.y + 40;
//                     }
                    

//                     midx = startx + ((endx - startx) / 2);


//                     sampleSVG.append("marker")
//                         .attr("id", "triangle"+(++idflow))
//                         .attr("viewBox", "0 0 10 10")
//                         .attr("refX", "0")
//                         .attr("refY", "5")
//                         .attr("markerUnits", "strokeWidth")
//                         .attr("markerWidth", "5")
//                         .attr("markerHeight", "4")
//                         .attr("orient", "auto")
//                         .append('svg:path')
//                         .attr('d', 'M 0 0 L 10 5 L 0 10 z');


//                     sampleSVG.append("polyline")      // attach a polyline
//                         .attr("id", "flow"+idflow)
//                         .attr("marker-end", "url(#triangle"+idflow+")")
//                         .style("stroke", "black")  // colour the line
//                         .style("fill", "none")     // remove any fill colour
//                         .style("stroke-width", "2")
//                         .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

//                    FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx,starttype,endtype);    
//                  //   starttype= "";
//                  //   endtype = "";
//                     startx = 0;
//                     starty = 0;
//                     endx = 0;
//                     endy = 0;
//                 }

//             })
//             .call(drag);

//             TaskBPMNJsonCreator('task'+idstartelement, d3.event.pageX, d3.event.pageY, 120, 80,"task");

            

 }

 