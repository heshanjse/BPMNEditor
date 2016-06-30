"use strict";
var bpmnEventDivider = function (bpmnElement,svg) {
    if (bpmnElement === "startEvent") {
        window.bpmnElement = null;
        var sampleSVG = svg;
        sampleSVG.append('circle')
            .attr('id', 'startEvnet' + (++idstartelement))
            .style("stroke", "black")
            .style("stroke-width", "2")
            .style("fill", "white")
            .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
            .attr('r', '20')
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

                tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                    .style("left", coords.x + 20 + "px")
                    .style("top", (coords.y - 20) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    deleteElement(t);
                    console.log("t click")
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    semodal.style.display = "block";
                });
                tooltipDiv.select("#arrow-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end arrow button clicked ")
                    starttype = "startEvent";
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
                    starttype = "startEvent";
                    startid =t;
                    startx = coords.x;
                    starty = coords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";
                    console.log("ok1")
                    console.log(startx)
                    console.log(starty)
                }


            })
            .call(drag);

            EventBPMNJsonCreator('startEvnet'+idstartelement, d3.event.pageX, d3.event.pageY, 20, 20,"startEvnet");

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
                        .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy);

                    FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx);    

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
        sampleSVG.append('rect')
            .attr('id', 'task' + (++idtaskelement))
            .style("stroke", "black")
            .style("stroke-width", "2")
            .style("fill", "white")
            .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 120)
            .attr("height", 80)
            .on("mouseover", function () {
                d3.select(this).style("fill", "aliceblue");
                var point = d3.mouse(this)
                    , p = {mx: point[0], my: point[1]};

                console.log(p.mx + "and " + p.my);


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
                    FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx);
                   

                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                }

            })
            .call(drag);
            TaskBPMNJsonCreator('task'+idstartelement, d3.event.pageX, d3.event.pageY, 120, 80,"task");
        //  dragmove('task'+idtaskelement);
        // console.log(d3.select(this).attr("id")+"okkk")
        // pushBPMNArray('task'+idtaskelement,d3.event.pageX,d3.event.pageY,120,80);
    } else if (bpmnElement === "gateway") {
        window.bpmnElement = null;
        var sampleSVG = svg;
        sampleSVG.append('rect')
            .attr('id', 'gateway' + (++idgatewayelement))
            .style("stroke", "black")
            .style("stroke-width", "2")
            .style("stroke-linecap", "butt")
            .style("stroke-linejoin", "miter")
            .style("stroke-miterlimit", "2")
            .style("stroke-dashoffset", "0")
            .style("fill", "white")
            .attr("ry", 0)
            .attr("width", 42.8)
            .attr("height", 42.8)
            .attr("transform", "matrix(0.7,0.7,-0.7,0.7," + d3.event.pageX + "," + d3.event.pageY + ")")
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

                tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                    .style("left", coords.x + 30 + "px")
                    .style("top", (coords.y + 10) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    deleteElement(t);
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    gmodal.style.display = "block";
                });
                tooltipDiv.select("#arrow-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end arrow button clicked ");
                    starttype = "gateway";
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
                // gmodal.style.display = "block";
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
                    starttype = "gateway";
                    startid =t;
                    startx = coords.x;
                    starty = coords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";
                    console.log("ok1")
                    console.log(startx)
                    console.log(starty)
                } else if (window.bpmnElement === "flowselect") {
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
                        endx = coords.x - 35;
                        endy = coords.y + 30;
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
                        endx = coords.x + 35;
                        endy = coords.y + 30;
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
                        .on("mouseover", function (d) {
                            console.log("flow mouse over")

                   
                
                // var t = d3.select(this).attr("id");

                // function getScreenCoords(x, y, ctm) {
                //     var xn = ctm.e + x * ctm.a + y * ctm.c;
                //     var yn = ctm.f + x * ctm.b + y * ctm.d;
                //     return {x: xn, y: yn};
                // }

                // var circle = document.getElementById(t),
                //     cx = +circle.getAttribute('cx'),
                //     cy = +circle.getAttribute('cy'),
                //     ctm = circle.getCTM(),
                //     coords = getScreenCoords(cx, cy, ctm);
                // console.log(coords.x, coords.y);

                // tooltipDiv.transition()
                //     .duration(200)
                //     .style("opacity", 1.9);

                // tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                //     .style("left", coords.x + 20 + "px")
                //     .style("top", (coords.y - 20) + "px");


                // tooltipDiv.select("#trash-button").on("click", function () {
                //     tooltipDiv.style("opacity", 0);
                //     // semodal.style.display = "block";
                // });

                // tooltipDiv.select("#property-button").on("click", function () {
                //     tooltipDiv.style("opacity", 0);
                //     console.log("end evnt button clicked ")
                //     semodal.style.display = "block";
                // });
                    });
                    FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx); 

                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                }
            })
            .call(drags);

            EventBPMNJsonCreator('gateway'+idstartelement, d3.event.pageX, d3.event.pageY, 120, 80,"gateway");

    }

}
 function deleteElement(id){
                        console.log("ididid : "+id)
                        console.log(bpmnjson);
                    
                    for (var i = 0; i < bpmnjson.length; i++) {
                       var bpmnobject = bpmnjson[i];
                       console.log(bpmnobject.id);
                        if (bpmnobject.id === id) {
                            delete bpmnjson[i];
                        }else if (bpmnobject.start_id ===id || bpmnobject.end_id ===id ) {
                            var flow_id =bpmnobject.id;
                            d3.select(document.getElementById(flow_id)).remove(); 
                            delete bpmnjson[i];
                        }
                    }
                    d3.select(document.getElementById(id)).remove(); 
                    tooltipDiv.transition()
                    .style("opacity", 0);
                    console.log(bpmnjson);
                    
 }

function dragMove(me) {

        console.log(d3.select(me).attr("id"))
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
        console.log(bpmnjson);
    }


    function dragMoves(me) {

        console.log("ok")
        var x = d3.event.x
        var y = d3.event.y

        d3.select(me).attr('transform', 'matrix(0.7,0.7,-0.7,0.7,' + x + ',' + y + ')')
    }


    var drag = d3.behavior.drag().on('drag', function (d) {
        console.log("d:" + d)
        //console.log("this:"+this)
        dragMove(this)
    })
    var drags = d3.behavior.drag().on('drag', function (d) {

        dragMoves(this)
    })