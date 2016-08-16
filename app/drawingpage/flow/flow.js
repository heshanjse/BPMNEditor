"use strict";
var flowcreator = function (){  
    var dragger = d3.behavior.drag() //flow drag
    .on('drag', handleDrag)
    .on('dragend', function(d){
        dragging = false;
    });
    var sampleSVGflow = sampleSVG.append('g')
                        .attr("id", "groupflow"+(++idflow));
    
        sampleSVG.append("marker")
                        .attr("id", "triangle"+idflow)
                        .attr("viewBox", "0 0 10 10")
                        .attr("refX", "0")
                        .attr("refY", "5")
                        .attr("markerUnits", "strokeWidth")
                        .attr("markerWidth", "5")
                        .attr("markerHeight", "4")
                        .attr("orient", "auto")
                        .append('svg:path')
                        .attr('d', 'M 0 0 L 10 5 L 0 10 z');


                    sampleSVGflow.append("polyline")      // attach a polyline
                       .attr("id", "flow"+idflow)
                       .attr("marker-end", "url(#triangle"+idflow+")")
                       .attr("x",midx )
                        .attr("y", starty+((endy-starty)/2))
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
                            console.log("--------")
                            console.log(t)
                            var circle = document.getElementById(t),
                                cx = +circle.getAttribute('x'),
                                cy = +circle.getAttribute('y'),
                                ctm = circle.getCTM(),
                                coords = getScreenCoords(cx, cy, ctm);
                            console.log(coords.x, coords.y);

                            tooltipDiv.transition()
                                .duration(200)
                                .style("opacity", 1.9);

                            tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                                .style("left", coords.x  + "px")
                                .style("top", coords.y + "px");


                            tooltipDiv.select("#trash-button").on("click", function () {
                                tooltipDiv.style("opacity", 0);
                              //  deleteElement(t);
                                sampleSVG.select("#group"+t).remove(); 
                                t=0;
                                // semodal.style.display = "block";
                            });

                            tooltipDiv.select("#property-button").on("click", function () {
                                tooltipDiv.style("opacity", 0);
                                console.log("end evnt button clicked ")
                                eemodal.style.display = "block";
                            });
                        });

                    sampleSVGflow.append('circle')
                    .attr("id", "flow"+idflow)
                    .attr('cx', startx)
                    .attr('cy', starty)
                    .attr('r', 4)
                    .attr('stroke', '#ffffff')
                    .attr('is-handle', 'true')
                    .style({cursor: 'move'})
                    .style('opacity',0)
                    .call(dragger);

                    sampleSVGflow.append('circle')
                    .attr("id", "flow"+idflow)
                    .attr('cx', midx)
                    .attr('cy', starty)
                    .attr('r', 4)
                    .attr('stroke', '#000')
                    .attr('is-handle', 'true')
                    .style({cursor: 'move'})
                    .call(dragger);

                    sampleSVGflow.append('circle')
                    .attr("id", "flow"+idflow)
                    .attr('cx', midx)
                    .attr('cy', endy)
                    .attr('r', 4)
                    .attr('stroke', '#000')
                    .attr('is-handle', 'true')
                    .style({cursor: 'move'})
                    .call(dragger);

                    sampleSVGflow.append('circle')
                    .attr("id", "flow"+idflow)
                    .attr('cx', endx)
                    .attr('cy', endy)
                    .attr('r', 4)
                    .attr('stroke', '#ffffff')
                    .attr('is-handle', 'true')
                    .style({cursor: 'move'})
                    .style('opacity',0)
                    .call(dragger);

                    FlowBPMNJsonCreator('flow'+idflow,"flow", startid, endid, startx, starty,endx,endy,midx,starttype,endtype); 

                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                    startid =0;
                    endid =0;
                    points.splice(0);
                    drawing = false;
 }

 function handleDrag() {
    if(drawing) return;
    var dragCircle = d3.select(this), newPoints = [], circle;
    dragging = true;
    var poly = d3.select(this.parentNode).select('polyline');
    var circles = d3.select(this.parentNode).selectAll('circle');
    dragCircle
    .attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
    for (var i = 0; i < circles[0].length; i++) {
        circle = d3.select(circles[0][i]);
        newPoints.push([circle.attr('cx'), circle.attr('cy')]);
    }
    poly.attr('points', newPoints);
}

