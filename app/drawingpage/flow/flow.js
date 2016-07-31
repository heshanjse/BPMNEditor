"use strict";
var flowcreator = function (endid){  
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

                    FlowBPMNJsonCreator('flow'+idflow, startid, endid, startx, starty,endx,endy,midx,starttype,endtype); 

                     starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                    startid =0;
 }

