"use strict";

var dragFlows =[];

var g2;

var bpmnEventDivider = function (bpmnElement,subElement,svg) {
    if (bpmnElement === "startEvent") {
        window.bpmnElement = null;

        starteventdevider(subElement,svg);
        
    } else if (bpmnElement === "endEvent") {
        window.bpmnElement = null;
        var sampleSVG = svg;
// var sampleSVG = svgG;
        sampleSVG.append('circle')
            .attr('id', 'endEvent' + (++idendelement))
            .style("stroke", "black")
            .style("stroke-width", "4")
            .style("fill", "white")
            .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
            .attr('r', '20')
            .on("dragend", function () { 
                console.log("drag start event")
             })
            .on("mouseover", function () {
                d3.select(this).style("fill", "aliceblue");
            })
            .on("mouseup", function () {
                d3.select(this).style("fill", "aliceblue");
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
                console.log(coords.x, coords.y);

                tooltipDiv.transition()
                    .duration(200)
                    .style("opacity", 1.9);

                tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                    .style("left", coords.x + 20 + "px")
                    .style("top", (coords.y - 20) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    deleteElement(t);
                    t=0;
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    eemodal.style.display = "block";
                });
            })
            .on("mouseout", function () {
                d3.select(this).style("fill", "white");
                tooltipDiv.transition()
                    .duration(3200)
                    .style("opacity", 0);
            })
            .on("click", function () {
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

                if (window.bpmnElement === "flowselect") {
                    endtype = "endEvent"
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
                        endx = coords.x - 26;
                        endy = coords.y;
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
                        endx = coords.x + 26;
                        endy = coords.y;
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
                        .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy)
                        .on("mouseup", function () {
                            //d3.select(this).style("fill", "aliceblue");
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
                            console.log(coords.x, coords.y);

                            tooltipDiv.transition()
                                .duration(200)
                                .style("opacity", 1.9);

                            tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                                .style("left", coords.x + 20 + "px")
                                .style("top", (coords.y - 20) + "px");


                            tooltipDiv.select("#trash-button").on("click", function () {
                                deleteElement(t);
                                t=0;
                                // semodal.style.display = "block";
                            });

                            tooltipDiv.select("#property-button").on("click", function () {
                                tooltipDiv.style("opacity", 0);
                                console.log("end evnt button clicked ")
                                eemodal.style.display = "block";
                            });
                        });

                    FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx,starttype,endtype);    
                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                    startid =0;
                }
            })
            .call(drag);
            EventBPMNJsonCreator('endEvent'+idstartelement, d3.event.pageX, d3.event.pageY, 20, 20,"endEvent");

    } else if (bpmnElement === "task") {
        window.bpmnElement = null;
        var sampleSVG = svg;

        taskdevider(subElement,svg);














  //       var distance = function (p1, p2) {
  //       return Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
  //           };

  //       var resize2 = d3.behavior.drag()
  //           .on('drag', function () {
  //               var c = g2.selectAll('.resizingSquare');
  //               var s = g2.selectAll('.square');

  //               var e = d3.event;
  //               var x = Number(this.attributes.x.value);
  //               var y = Number(this.attributes.y.value);
  //               var w = Number(this.attributes.width.value);
  //               var h = Number(this.attributes.height.value);
  //               var c1 = { x: x, y: y };
  //               var c2 = { x: x + w, y: y };
  //               var c3 = { x: x + w, y: y + h };
  //               var c4 = { x: x, y: y + h };

  //               // figure out which corner this is closest to
  //               var d = [];
  //               var m1 = distance(e, c1);
  //               var m2 = distance(e, c2);
  //               var m3 = distance(e, c3);
  //               var m4 = distance(e, c4);
  //               switch (Math.min(m1, m2, m3, m4)) {
  //                   case m3:
  //                       c
  //                           .attr('width', function () { return w + (e.x - c3.x) + 12; })
  //                           .attr('height', function () { return h + (e.y - c3.y) + 12; });
  //                       s
  //                           .attr('width', function () { return w + (e.x - c3.x); })
  //                           .attr('height', function () { return h + (e.y - c3.y); });
  //                       break;
  //               }
  //           });



  //           g2 =  svg
  //       .selectAll('.draggableSquare')
  //       .data([{
  //           x: 65,
  //           y: 155,
  //           width: 120,
  //           height: 80
  //       }])
  //       .enter()
  //        .append('g')
  //       .attr('class', 'draggableSquare');


  //        g2.append('svg:rect')
  //     //  sampleSVG.append('svg:rect')
        
  //       //.append('g')
  //      // .attr('class', 'draggableSquare')

  //           .attr('class', 'resizingSquare')
  //           .attr('id', 'resizetask' + (++idtaskelement))
  //           .attr("width", function (d) {
  //              // return d.width + 7;
  //              return 120 + 7;
  //           })
  //           .attr("height", function (d) {
  //              // return d.height + 7;
  //              return 80 + 7;
  //           })
  //         //  .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
  //           .attr("x", function (d) {
  //               return d3.event.pageX - 3;
  //           })
  //           .attr("y", function (d) {
  //               return d3.event.pageY - 3;
  //           })
  //           .attr("rx", 6)
  //           .attr("ry", 6)
  //           .style("fill", '#808080')
  //           .call(resize2);










  //  // sampleSVG.append('svg:rect')
  //    g2.append('svg:rect')

  //    //   .append('g')
  // // .attr('class', 'draggableSquare')

  //          .attr('class', 'square')
  //          .attr("marker-end", "url(#resizetask"+idtaskelement+")")
  //           .attr('id', 'task' + idtaskelement)
  //           .style("stroke", "black")
  //           .style("stroke-width", "2")
  //           .style("fill", "white")
  //           .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
  //           .attr("rx", 10)
  //           .attr("ry", 10)
  //           // .attr("width", 120)
  //           // .attr("height", 80)
  //           .attr("width", function (d) {
  //               return 120;
  //           })
  //           .attr("height", function (d) {
  //               //return d.height;
  //               return 80;
  //           })
  //           .on("dragend", function () { 
  //               console.log("drag start event")
  //            })
  //           .on("mouseover", function () {
  //               d3.select(this).style("fill", "aliceblue");
  //               var point = d3.mouse(this)
  //                   , p = {mx: point[0], my: point[1]};

  //               console.log(p.mx + "and " + p.my);


  //           })
  //           .on("mouseup", function () {
  //               d3.select(this).style("fill", "aliceblue");
  //               var t = d3.select(this).attr("id");

  //               function getScreenCoords(x, y, ctm) {
  //                   var xn = ctm.e + x * ctm.a + y * ctm.c;
  //                   var yn = ctm.f + x * ctm.b + y * ctm.d;
  //                   return {x: xn, y: yn};
  //               }

  //               var circle = document.getElementById(t),
  //                   cx = +circle.getAttribute('cx'),
  //                   cy = +circle.getAttribute('cy'),
  //                   ctm = circle.getCTM(),
  //                   coords = getScreenCoords(cx, cy, ctm);
  //               console.log(coords.x, coords.y);

  //               tooltipDiv.transition()
  //                   .duration(200)
  //                   .style("opacity", 1.9);

  //               tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" +"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "text-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/review.png" + " alt=" + "Text" + " style=" + "width:25px;" + " >")
  //                   .style("left", coords.x + 130 + "px")
  //                   .style("top", (coords.y + 15) + "px");


  //               tooltipDiv.select("#trash-button").on("click", function () {
  //                   deleteElement(t);
  //                   // semodal.style.display = "block";
  //               });

  //               tooltipDiv.select("#property-button").on("click", function () {
  //                   tooltipDiv.style("opacity", 0);
  //                   console.log("end evnt button clicked ")
  //                   tmodal.style.display = "block";
  //               });
  //               tooltipDiv.select("#arrow-button").on("click", function () {
  //                   tooltipDiv.style("opacity", 0);
  //                   console.log("end arrow button clicked ")
  //                   starttype = "task";
  //                   startid =t;
  //                   startx = coords.x;
  //                   starty = coords.y;
  //                   window.bpmnElement = "flowselect";
  //                   document.body.style.cursor = "e-resize";
  //               });
  //           })
  //           .on("mouseout", function () {
  //               d3.select(this).style("fill", "white");
  //               tooltipDiv.transition()
  //                   .duration(3200)
  //                   .style("opacity", 0);
  //           })
  //           .on("click", function () {
  //               //tmodal.style.display = "block";
  //               d3.select(this).style("fill", "white");
  //               var t = d3.select(this).attr("id");
  //               function getScreenCoords(x, y, ctm) {
  //                   var xn = ctm.e + x * ctm.a + y * ctm.c;
  //                   var yn = ctm.f + x * ctm.b + y * ctm.d;
  //                   return {x: xn, y: yn};
  //               }

  //               var circle = document.getElementById(t),
  //                   cx = +circle.getAttribute('cx'),
  //                   cy = +circle.getAttribute('cy'),
  //                   ctm = circle.getCTM(),
  //                   coords = getScreenCoords(cx, cy, ctm);

  //               if (window.bpmnElement === "flow") {
  //                   starttype = "task";
  //                   startid =t;
  //                   startx = coords.x;
  //                   starty = coords.y;
  //                   window.bpmnElement = "flowselect";
  //                   document.body.style.cursor = "e-resize";
  //                   console.log("ok1")
  //                   console.log(startx)
  //                   console.log(starty)
  //               } else if (window.bpmnElement === "flowselect") {
  //                   endtype = "task"
  //                   window.bpmnElement = null
  //                   if (coords.x > startx) {
  //                       if (starttype === "startEvent") {
  //                           startx = startx + 20;
  //                           starty = starty;  
  //                       }else if (starttype === "task") {
  //                           startx = startx + 120;
  //                           starty = starty + 40;
  //                       }else if (starttype === "gateway") {
  //                           startx = startx + 30;
  //                           starty = starty + 30;
  //                       }
  //                       endx = coords.x - 7;
  //                       endy = coords.y + 40;
  //                   }else if (coords.x < startx) {
  //                       if (starttype === "startEvent") {
  //                           startx = startx - 20;
  //                           starty = starty;  
  //                       }else if (starttype === "task") {
  //                           startx = startx - 2;
  //                           starty = starty + 40;
  //                       }else if (starttype === "gateway") {
  //                           startx = startx - 30;
  //                           starty = starty + 30;
  //                       }
  //                       endx = coords.x + 127;
  //                       endy = coords.y + 40;
  //                   }
                    

  //                   midx = startx + ((endx - startx) / 2);


  //                   sampleSVG.append("marker")
  //                       .attr("id", "triangle"+(++idflow))
  //                       .attr("viewBox", "0 0 10 10")
  //                       .attr("refX", "0")
  //                       .attr("refY", "5")
  //                       .attr("markerUnits", "strokeWidth")
  //                       .attr("markerWidth", "5")
  //                       .attr("markerHeight", "4")
  //                       .attr("orient", "auto")
  //                       .append('svg:path')
  //                       .attr('d', 'M 0 0 L 10 5 L 0 10 z');


  //                   sampleSVG.append("polyline")      // attach a polyline
  //                       .attr("id", "flow"+idflow)
  //                       .attr("marker-end", "url(#triangle"+idflow+")")
  //                       .style("stroke", "black")  // colour the line
  //                       .style("fill", "none")     // remove any fill colour
  //                       .style("stroke-width", "2")
  //                       .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

  //                  FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx,starttype,endtype);    
  //                //   starttype= "";
  //                //   endtype = "";
  //                   startx = 0;
  //                   starty = 0;
  //                   endx = 0;
  //                   endy = 0;
  //               }

  //           })
  //           .call(drag);
  //           TaskBPMNJsonCreator('task'+idstartelement, d3.event.pageX, d3.event.pageY, 120, 80,"task");
  //       //  dragmove('task'+idtaskelement);
  //       // console.log(d3.select(this).attr("id")+"okkk")
  //       // pushBPMNArray('task'+idtaskelement,d3.event.pageX,d3.event.pageY,120,80);
    } else if (bpmnElement === "gateway") {
        window.bpmnElement = null;
        gatewaydevider(subElement,svg);
       // var sampleSVG = svg;
        
    }

}
 function deleteElement(id){
                        console.log("ididid : "+id)
                        console.log(bpmnjson);
                    
                    for (var i = 0; i < bpmnjson.length; i++) {
                       var bpmnobject = bpmnjson[i];
                       console.log(bpmnobject.id);
                        if (bpmnobject.id === id) {
                            
                            bpmnobject.id=0;

                          //  delete bpmnjson[i];
                        }else if (bpmnobject.start_id ===id || bpmnobject.end_id ===id ) {
                            var flow_id =bpmnobject.id;
                            d3.select(document.getElementById(flow_id)).remove(); 
                            bpmnobject.id=0;
                          //  delete bpmnjson[i];
                        }
                    }
                    d3.select(document.getElementById(id)).remove(); 
                    tooltipDiv.transition()
                    .style("opacity", 0);
                    console.log(bpmnjson);
                    
 }

function dragMove(me) {

       // console.log(d3.select(me).attr("id"))
        var x = d3.event.x
        var y = d3.event.y

        d3.select(me).attr('transform', 'translate(' + x + ',' + y + ')')
        for (var i = 0; i < bpmnjson.length; i++) {
            if (bpmnjson[i].id == d3.select(me).attr("id")) {
                bpmnjson[i].x = x;
                bpmnjson[i].y = y;
                break;
            }
        }
       // console.log(bpmnjson);
    }


    function dragMoves(me) {

        console.log("ok")
        var x = d3.event.x
        var y = d3.event.y

        d3.select(me).attr('transform', 'matrix(0.7,0.7,-0.7,0.7,' + x + ',' + y + ')')
    }

    function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
    }

    var drag = d3.behavior.drag()
    .on('drag', function (d) {
        console.log("--dvalue--"+d)
        dragMove(this)
    })
    .on("dragstart", function () { 
        console.log("ondragstart")
        var elementid = d3.select(this).attr("id");
        for (var i = 0; i < bpmnjson.length; i++) {
            var bpmnobject = bpmnjson[i];

        if (bpmnobject.start_id === elementid &&  bpmnobject.id != 0) {

            dragFlows.push({
                "id": bpmnobject.id,
                "start_id":bpmnobject.start_id,
                "end_id":bpmnobject.end_id,
                "start_x": bpmnobject.start_x,
                "start_y": bpmnobject.start_y,
                "end_x": bpmnobject.end_x,
                "end_y": bpmnobject.end_y,
                "mid_x":bpmnobject.mid_x,
                "start_type":bpmnobject.start_type,
                "end_type":bpmnobject.end_type,
                "connection" : "start"
            })
            console.log(bpmnobject.id+" removed")
            console.log(dragFlows)
            d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;

        }else if (bpmnobject.end_id ===elementid &&  bpmnobject.id != 0) {
            dragFlows.push({
                "id": bpmnobject.id,
                "start_id":bpmnobject.start_id,
                "end_id":bpmnobject.end_id,
                "start_x": bpmnobject.start_x,
                "start_y": bpmnobject.start_y,
                "end_x": bpmnobject.end_x,
                "end_y": bpmnobject.end_y,
                "mid_x":bpmnobject.mid_x,
                "start_type":bpmnobject.start_type,
                "end_type":bpmnobject.end_type,
                "connection" : "end"
            })
            console.log(bpmnobject.id+" removed")
            console.log(dragFlows)
            d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;
        }
        }
    })
    .on("dragend", function () { 
        for (var i = 0; i < dragFlows.length; i++) {
            var flow = dragFlows[i];
            if (flow.connection === "start") {
                var circle = document.getElementById(flow.start_id),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                    if (flow.start_x < flow.end_x) {
                        if (flow.end_type === "endEvent") {
                            flow.end_x = flow.end_x +26;
                            if (coords.x < flow.end_x) {
                                flow.end_x = flow.end_x -26; 
                            }else if (coords.x > flow.end_x) {
                                flow.end_x = flow.end_x +26; 
                            }    
                        }else if (flow.end_type === "task") {
                            flow.end_x = flow.end_x +67;
                            if (coords.x < flow.end_x) {
                                flow.end_x = flow.end_x -67; 
                            }else if (coords.x > flow.end_x) {
                                flow.end_x = flow.end_x +67; 
                            } 
                        }else if (flow.end_type === "gateway") {
                            flow.end_x = flow.end_x +35;
                            // if (coords.x < flow.end_x) {
                            //     flow.end_x = flow.end_x -35; 
                            // }else if (coords.x > flow.end_x) {
                            //     flow.end_x = flow.end_x +35; 
                            // }
                        }
                    }else if (flow.start_x > flow.end_x) {
                        if (flow.end_type === "endEvent") {
                            flow.end_x = flow.end_x -26;
                            if (coords.x < flow.end_x) {
                                flow.end_x = flow.end_x -26; 
                            }else if (coords.x > flow.end_x) {
                                flow.end_x = flow.end_x +26; 
                            }   
                        }else if (flow.end_type === "task") {
                            flow.end_x = flow.end_x -67;
                            if (coords.x < flow.end_x) {
                                flow.end_x = flow.end_x -67; 
                            }else if (coords.x > flow.end_x) {
                                flow.end_x = flow.end_x +67; 
                            } 
                        }else if (flow.end_type === "gateway") {
                            flow.end_x = flow.end_x -35;
                            // if (coords.x < flow.end_x) {
                            //     flow.end_x = flow.end_x -35; 
                            // }else if (coords.x > flow.end_x) {
                            //     flow.end_x = flow.end_x +35; 
                            // }
                        }
                    }

                    if (coords.x < flow.end_x) {
                        if (flow.start_type === "startEvent") {
                            startx = coords.x + 20;
                            starty = coords.y; 
                        }else if (flow.start_type === "task") {
                            startx = coords.x + 120;
                            starty = coords.y + 40;
                        }else if (flow.start_type === "gateway") {
                            startx = coords.x + 30;
                            starty = coords.y + 30; 
                        }
                    }else if (coords.x > flow.end_x) {
                        if (flow.start_type === "startEvent") {
                            startx = coords.x - 20;
                            starty = coords.y;     
                        }else if (flow.start_type === "task") {
                            startx = coords.x - 2;
                            starty = coords.y + 40;
                        }else if (flow.start_type === "gateway") {
                            startx = coords.x - 30;
                            starty = coords.y + 30;
                        }
                    }

                    // if (coords.x > flow.end_y) {
                    //     if (starttype === "startEvent") {
                    //         endx = endx + 20;
                    //         starty = starty;  
                    //     }else if (starttype === "task") {
                    //         startx = startx + 120;
                    //         starty = starty + 40;
                    //     }else if (starttype === "gateway") {
                    //         startx = startx + 30;
                    //         starty = starty + 30;
                    //     }
                    //     endx = coords.x - 35;
                    //     endy = coords.y + 30;
                    // }else if (coords.x < startx) {
                    //     if (starttype === "startEvent") {
                    //         startx = startx - 20;
                    //         starty = starty;  
                    //     }else if (starttype === "task") {
                    //         startx = startx - 2;
                    //         starty = starty + 40;
                    //     }else if (starttype === "gateway") {
                    //         startx = startx - 30;
                    //         starty = starty + 30;
                    //     }
                    //     endx = coords.x + 35;
                    //     endy = coords.y + 30;
                    // }


                    midx = startx + ((flow.end_x - startx) / 2);
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
                        .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + flow.end_y+ "," + flow.end_x + "," + flow.end_y);        
                    
                    FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, startx, starty,flow.end_x,flow.end_y,midx,flow.start_type,flow.end_type);    
                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;

            }else if (flow.connection === "end") {
                var circle = document.getElementById(flow.end_id),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                if (coords.x > flow.start_x) {
                        if (flow.end_type === "startEvent") {
                            endx = coords.x + 20;
                            endy = coords.y;  
                        }else if (flow.end_type === "task") {
                            endx = coords.x + 120;
                            endy = coords.y + 40;
                        }else if (flow.end_type === "gateway") {
                            endx = coords.x + 30;
                            endy = coords.y + 30;
                        }
                        // endx = coords.x - 35;
                        // endy = coords.y + 30;
                    }else if (coords.x < flow.start_x) {
                        if (flow.end_type === "startEvent") {
                            endx = coords.x - 20;
                            endy = coords.y;  
                        }else if (flow.end_type === "task") {
                            endx = coords.x - 2;
                            endy = coords.y + 40;
                        }else if (flow.end_type === "gateway") {
                            endx = coords.x - 30;
                            endy = coords.y + 30;
                        }
                        // endx = coords.x + 35;
                        // endy = coords.y + 30;
                    }
                    midx = flow.start_x + ((endx - flow.start_x) / 2);
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
                        .attr("points", flow.start_x + "," + flow.start_y + "," + midx + "," + flow.start_y + "," + midx + "," + endy+ "," + endx + "," + endy);        
                    
                    FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, flow.start_x, flow.start_y,endx,endy,midx,flow.start_type,flow.end_type);    
                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;

            }
        }


      dragFlows =[];
    });

    
    var drags = d3.behavior.drag().on('drag', function (d) {

        dragMoves(this)
    })
    .on("dragstart", function () { 
        console.log("ondragstart")
        var elementid = d3.select(this).attr("id");
        for (var i = 0; i < bpmnjson.length; i++) {
            var bpmnobject = bpmnjson[i];
        if (bpmnobject.start_id === elementid &&  bpmnobject.id != 0) {
            dragFlows.push({
                "id": bpmnobject.id,
                "start_id":bpmnobject.start_id,
                "end_id":bpmnobject.end_id,
                "start_x": bpmnobject.start_x,
                "start_y": bpmnobject.start_y,
                "end_x": bpmnobject.end_x,
                "end_y": bpmnobject.end_y,
                "mid_x":bpmnobject.mid_x,
                "start_type":bpmnobject.start_type,
                "end_type":bpmnobject.end_type,
                "connection" : "start"
            })
            console.log(bpmnobject.id+" removed")
            console.log(dragFlows)
            d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;

        }else if (bpmnobject.end_id ===elementid &&  bpmnobject.id != 0) {
            dragFlows.push({
                "id": bpmnobject.id,
                "start_id":bpmnobject.start_id,
                "end_id":bpmnobject.end_id,
                "start_x": bpmnobject.start_x,
                "start_y": bpmnobject.start_y,
                "end_x": bpmnobject.end_x,
                "end_y": bpmnobject.end_y,
                "mid_x":bpmnobject.mid_x,
                "start_type":bpmnobject.start_type,
                "end_type":bpmnobject.end_type,
                "connection" : "end"
            })
            console.log(bpmnobject.id+" removed")
            console.log(dragFlows)
            d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;
        }
        }
    })

    .on("dragend", function () { 
        for (var i = 0; i < dragFlows.length; i++) {
            var flow = dragFlows[i];
            if (flow.connection === "start") {
                var circle = document.getElementById(flow.start_id),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                if (coords.x < flow.end_x) {
                        if (flow.start_type === "startEvent") {
                            startx = coords.x + 20;
                            starty = coords.y;  
                        }else if (flow.start_type === "task") {
                            startx = coords.x + 120;
                            starty = coords.y + 40;
                        }else if (flow.start_type === "gateway") {
                            startx = coords.x + 30;
                            starty = coords.y + 30;
                        }
                        // endx = coords.x - 35;
                        // endy = coords.y + 30;
                    }else if (coords.x > flow.end_x) {
                        if (flow.start_type === "startEvent") {
                            startx = coords.x - 20;
                            starty = coords.y;  
                        }else if (flow.start_type === "task") {
                            startx = coords.x - 2;
                            starty = coords.y + 40;
                        }else if (flow.start_type === "gateway") {
                            startx = coords.x - 30;
                            starty = coords.y + 30;
                        }
                        // endx = coords.x + 35;
                        // endy = coords.y + 30;
                    }
                    midx = startx + ((flow.end_x - startx) / 2);
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
                        .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + flow.end_y+ "," + flow.end_x + "," + flow.end_y);        
                    
                    FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, startx, starty,flow.end_x,flow.end_y,midx,flow.start_type,flow.end_type);    
                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;

            }else if (flow.connection === "end") {
                var circle = document.getElementById(flow.end_id),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                if (coords.x > flow.start_x) {
                        if (flow.end_type === "startEvent") {
                            endx = coords.x + 20;
                            endy = coords.y;  
                        }else if (flow.end_type === "task") {
                            endx = coords.x + 120;
                            endy = coords.y + 40;
                        }else if (flow.end_type === "gateway") {
                            endx = coords.x + 30;
                            endy = coords.y + 30;
                        }
                        // endx = coords.x - 35;
                        // endy = coords.y + 30;
                    }else if (coords.x < flow.start_x) {
                        if (flow.end_type === "startEvent") {
                            endx = coords.x - 20;
                            endy = coords.y;  
                        }else if (flow.end_type === "task") {
                            endx = coords.x - 2;
                            endy = coords.y + 40;
                        }else if (flow.end_type === "gateway") {
                            endx = coords.x - 30;
                            endy = coords.y + 30;
                        }
                        // endx = coords.x + 35;
                        // endy = coords.y + 30;
                    }
                    midx = flow.start_x + ((endx - flow.start_x) / 2);
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
                        .attr("points", flow.start_x + "," + flow.start_y + "," + midx + "," + flow.start_y + "," + midx + "," + endy+ "," + endx + "," + endy);        
                    
                    FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, flow.start_x, flow.start_y,endx,endy,midx,flow.start_type,flow.end_type);    
                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;

            }
        }


      dragFlows =[];

     });

