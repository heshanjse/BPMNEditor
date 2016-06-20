// var bpmnEventDivider = function (bpmnElement,svg) {
//     if (bpmnElement === "startEvent") {
//         window.bpmnElement = null;
//         var sampleSVG = svg;
//         sampleSVG.append('circle')
//             .attr('id', 'startcricle' + idstartelement++)
//             .style("stroke", "black")
//             .style("stroke-width", "2")
//             .style("fill", "white")
//             .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
//             .attr('r', '20')
//             .on("mouseover", function () {
//                 d3.select(this).style("fill", "aliceblue");
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

//                 tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/upload-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
//                     .style("left", coords.x + 20 + "px")
//                     .style("top", (coords.y - 20) + "px");


//                 tooltipDiv.select("#trash-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     // semodal.style.display = "block";
//                 });

//                 tooltipDiv.select("#property-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     console.log("end evnt button clicked ")
//                     semodal.style.display = "block";
//                 });
//             })
//             .on("mouseout", function () {
//                 d3.select(this).style("fill", "white");
//                 tooltipDiv.transition()
//                     .duration(3200)
//                     .style("opacity", 0);

//             })

//             .on("click", function () {

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
//                     startx = coords.x + 20;
//                     starty = coords.y;
//                     window.bpmnElement = "flowselect";
//                     document.body.style.cursor = "e-resize";
//                     console.log("ok1")
//                     console.log(startx)
//                     console.log(starty)
//                 }


//             })
//             .call(drag);

//     } else if (bpmnElement === "endEvent") {
//         window.bpmnElement = null;
//         var sampleSVG = svg;
// // var sampleSVG = svgG;
//         sampleSVG.append('circle')
//             .attr('id', 'endcricle' + idendelement++)
//             .style("stroke", "black")
//             .style("stroke-width", "4")
//             .style("fill", "white")
//             .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
//             .attr('r', '20')
//             .on("mouseover", function () {
//                 d3.select(this).style("fill", "aliceblue");
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

//                 tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/upload-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
//                     .style("left", coords.x + 20 + "px")
//                     .style("top", (coords.y - 20) + "px");


//                 tooltipDiv.select("#trash-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     // semodal.style.display = "block";
//                 });

//                 tooltipDiv.select("#property-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     console.log("end evnt button clicked ")
//                     eemodal.style.display = "block";
//                 });
//             })
//             .on("mouseout", function () {
//                 d3.select(this).style("fill", "white");
//                 tooltipDiv.transition()
//                     .duration(3200)
//                     .style("opacity", 0);
//             })
//             .on("click", function () {
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

//                 if (window.bpmnElement === "flowselect") {
//                     window.bpmnElement = null
//                     endx = coords.x - 26;
//                     endy = coords.y;

//                     midx = startx + ((endx - startx) / 2);


//                     sampleSVG.append("marker")
//                         .attr("id", "triangle")
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
//                         .attr("marker-end", "url(#triangle)")
//                         .style("stroke", "black")  // colour the line
//                         .style("fill", "none")     // remove any fill colour
//                         .style("stroke-width", "2")
//                         .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

//                     startx = 0;
//                     starty = 0;
//                     endx = 0;
//                     endy = 0;
//                 }
//             })
//             .call(drag);

//     } else if (bpmnElement === "task") {
//         window.bpmnElement = null;
//         var sampleSVG = svg;
//         sampleSVG.append('rect')
//             .attr('id', 'task' + (++idtaskelement))
//             .style("stroke", "black")
//             .style("stroke-width", "2")
//             .style("fill", "white")
//             .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
//             .attr("rx", 10)
//             .attr("ry", 10)
//             .attr("width", 120)
//             .attr("height", 80)
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

//                 tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/upload-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
//                     .style("left", coords.x + 130 + "px")
//                     .style("top", (coords.y + 15) + "px");


//                 tooltipDiv.select("#trash-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     // semodal.style.display = "block";
//                 });

//                 tooltipDiv.select("#property-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     console.log("end evnt button clicked ")
//                     tmodal.style.display = "block";
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
//                     startx = coords.x + 120;
//                     starty = coords.y + 40;
//                     window.bpmnElement = "flowselect";
//                     document.body.style.cursor = "e-resize";
//                     console.log("ok1")
//                     console.log(startx)
//                     console.log(starty)
//                 } else if (window.bpmnElement === "flowselect") {
//                     window.bpmnElement = null
//                     endx = coords.x - 7;
//                     endy = coords.y + 40;

//                     midx = startx + ((endx - startx) / 2);


//                     sampleSVG.append("marker")
//                         .attr("id", "triangle")
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
//                         .attr("marker-end", "url(#triangle)")
//                         .style("stroke", "black")  // colour the line
//                         .style("fill", "none")     // remove any fill colour
//                         .style("stroke-width", "2")
//                         .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

//                     startx = 0;
//                     starty = 0;
//                     endx = 0;
//                     endy = 0;
//                 }

//             })
//             .call(drag);
//         //  dragmove('task'+idtaskelement);
//         // console.log(d3.select(this).attr("id")+"okkk")
//         // pushBPMNArray('task'+idtaskelement,d3.event.pageX,d3.event.pageY,120,80);
//     } else if (bpmnElement === "gateway") {
//         window.bpmnElement = null;
//         var sampleSVG = svg;
//         sampleSVG.append('rect')
//             .attr('id', 'gateway' + idgatewayelement++)
//             .style("stroke", "black")
//             .style("stroke-width", "2")
//             .style("stroke-linecap", "butt")
//             .style("stroke-linejoin", "miter")
//             .style("stroke-miterlimit", "2")
//             .style("stroke-dashoffset", "0")
//             .style("fill", "white")
//             .attr("ry", 0)
//             .attr("width", 42.8)
//             .attr("height", 42.8)
//             .attr("transform", "matrix(0.7,0.7,-0.7,0.7," + d3.event.pageX + "," + d3.event.pageY + ")")
//             .on("mouseover", function () {
//                 d3.select(this).style("fill", "aliceblue");
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

//                 tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/upload-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
//                     .style("left", coords.x + 30 + "px")
//                     .style("top", (coords.y + 10) + "px");


//                 tooltipDiv.select("#trash-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     // semodal.style.display = "block";
//                 });

//                 tooltipDiv.select("#property-button").on("click", function () {
//                     tooltipDiv.style("opacity", 0);
//                     console.log("end evnt button clicked ")
//                     gmodal.style.display = "block";
//                 });
//             })
//             .on("mouseout", function () {
//                 d3.select(this).style("fill", "white");
//                 tooltipDiv.transition()
//                     .duration(3200)
//                     .style("opacity", 0);
//             })
//             .on("click", function () {
//                 // gmodal.style.display = "block";
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
//                     startx = coords.x + 30;
//                     starty = coords.y + 30;
//                     window.bpmnElement = "flowselect";
//                     document.body.style.cursor = "e-resize";
//                     console.log("ok1")
//                     console.log(startx)
//                     console.log(starty)
//                 } else if (window.bpmnElement === "flowselect") {
//                     window.bpmnElement = null
//                     endx = coords.x - 35;
//                     endy = coords.y + 30;

//                     midx = startx + ((endx - startx) / 2);


//                     sampleSVG.append("marker")
//                         .attr("id", "triangle")
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
//                         .attr("marker-end", "url(#triangle)")
//                         .style("stroke", "black")  // colour the line
//                         .style("fill", "none")     // remove any fill colour
//                         .style("stroke-width", "2")
//                         .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

//                     startx = 0;
//                     starty = 0;
//                     endx = 0;
//                     endy = 0;
//                 }
//             })
//             .call(drags);


//     }

// }