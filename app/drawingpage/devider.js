"use strict";

//var dragFlows =[];

var g2;

var bpmnEventDivider = function (bpmnElement,subElement,svg) {
    if (bpmnElement === "startEvent") {
        window.bpmnElement = null;

        starteventdevider(subElement,svg);
        
    } else if (bpmnElement === "endEvent") {
        window.bpmnElement = null;
        
        endeventdevider(subElement,svg);
// var sampleSVG = svgG;
        // sampleSVG.append('circle')
        //     .attr('id', 'endEvent' + (++idendelement))
        //     .style("stroke", "black")
        //     .style("stroke-width", "4")
        //     .style("fill", "white")
        //     .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
        //     .attr('r', '20')
        //     .on("dragend", function () { 
        //         console.log("drag start event")
        //      })
        //     .on("mouseover", function () {
        //         d3.select(this).style("fill", "aliceblue");
        //     })
        //     .on("mouseup", function () {
        //         d3.select(this).style("fill", "aliceblue");
        //         var t = d3.select(this).attr("id");

        //         function getScreenCoords(x, y, ctm) {
        //             var xn = ctm.e + x * ctm.a + y * ctm.c;
        //             var yn = ctm.f + x * ctm.b + y * ctm.d;
        //             return {x: xn, y: yn};
        //         }

        //         var circle = document.getElementById(t),
        //             cx = +circle.getAttribute('cx'),
        //             cy = +circle.getAttribute('cy'),
        //             ctm = circle.getCTM(),
        //             coords = getScreenCoords(cx, cy, ctm);
        //         console.log(coords.x, coords.y);

        //         tooltipDiv.transition()
        //             .duration(200)
        //             .style("opacity", 1.9);

        //         tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
        //             .style("left", coords.x + 20 + "px")
        //             .style("top", (coords.y - 20) + "px");


        //         tooltipDiv.select("#trash-button").on("click", function () {
        //             deleteElement(t);
        //             t=0;
        //             // semodal.style.display = "block";
        //         });

        //         tooltipDiv.select("#property-button").on("click", function () {
        //             tooltipDiv.style("opacity", 0);
        //             console.log("end evnt button clicked ")
        //             eemodal.style.display = "block";
        //         });
        //     })
        //     .on("mouseout", function () {
        //         d3.select(this).style("fill", "white");
        //         tooltipDiv.transition()
        //             .duration(3200)
        //             .style("opacity", 0);
        //     })
        //     .on("click", function () {
        //         var t = d3.select(this).attr("id");

        //         function getScreenCoords(x, y, ctm) {
        //             var xn = ctm.e + x * ctm.a + y * ctm.c;
        //             var yn = ctm.f + x * ctm.b + y * ctm.d;
        //             return {x: xn, y: yn};
        //         }

        //         var circle = document.getElementById(t),
        //             cx = +circle.getAttribute('cx'),
        //             cy = +circle.getAttribute('cy'),
        //             ctm = circle.getCTM(),
        //             coords = getScreenCoords(cx, cy, ctm);

        //         if (window.bpmnElement === "flowselect") {
        //             endtype = "endEvent"
        //             window.bpmnElement = null

                    
        //             if (coords.x > startx) {
        //                 if (starttype === "startEvent") {
        //                     startx = startx + 20;
        //                     starty = starty;  
        //                 }else if (starttype === "task") {
        //                     startx = startx + 120;
        //                     starty = starty + 40;
        //                 }else if (starttype === "gateway") {
        //                     startx = startx + 30;
        //                     starty = starty + 30;
        //                 }
        //                 endx = coords.x - 26;
        //                 endy = coords.y;
        //             }else if (coords.x < startx) {
        //                 if (starttype === "startEvent") {
        //                     startx = startx - 20;
        //                     starty = starty;  
        //                 }else if (starttype === "task") {
        //                     startx = startx - 2;
        //                     starty = starty + 40;
        //                 }else if (starttype === "gateway") {
        //                     startx = startx - 30;
        //                     starty = starty + 30;
        //                 }
        //                 endx = coords.x + 26;
        //                 endy = coords.y;
        //             }
                    

        //             midx = startx + ((endx - startx) / 2);


        //             sampleSVG.append("marker")
        //                 .attr("id", "triangle"+(++idflow))
        //                 .attr("viewBox", "0 0 10 10")
        //                 .attr("refX", "0")
        //                 .attr("refY", "5")
        //                 .attr("markerUnits", "strokeWidth")
        //                 .attr("markerWidth", "5")
        //                 .attr("markerHeight", "4")
        //                 .attr("orient", "auto")
        //                 .append('svg:path')
        //                 .attr('d', 'M 0 0 L 10 5 L 0 10 z');


        //             sampleSVG.append("polyline")      // attach a polyline
        //                 .attr("id", "flow"+idflow)
        //                 .attr("marker-end", "url(#triangle"+idflow+")")
        //                 .style("stroke", "black")  // colour the line
        //                 .style("fill", "none")     // remove any fill colour
        //                 .style("stroke-width", "2")
        //                 .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + endy + "," + endx + "," + endy)
        //                 .on("mouseup", function () {
        //                     //d3.select(this).style("fill", "aliceblue");
        //                     var t = d3.select(this).attr("id");

        //                     function getScreenCoords(x, y, ctm) {
        //                         var xn = ctm.e + x * ctm.a + y * ctm.c;
        //                         var yn = ctm.f + x * ctm.b + y * ctm.d;
        //                         return {x: xn, y: yn};
        //                     }

        //                     var circle = document.getElementById(t),
        //                         cx = +circle.getAttribute('cx'),
        //                         cy = +circle.getAttribute('cy'),
        //                         ctm = circle.getCTM(),
        //                         coords = getScreenCoords(cx, cy, ctm);
        //                     console.log(coords.x, coords.y);

        //                     tooltipDiv.transition()
        //                         .duration(200)
        //                         .style("opacity", 1.9);

        //                     tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
        //                         .style("left", coords.x + 20 + "px")
        //                         .style("top", (coords.y - 20) + "px");


        //                     tooltipDiv.select("#trash-button").on("click", function () {
        //                         deleteElement(t);
        //                         t=0;
        //                         // semodal.style.display = "block";
        //                     });

        //                     tooltipDiv.select("#property-button").on("click", function () {
        //                         tooltipDiv.style("opacity", 0);
        //                         console.log("end evnt button clicked ")
        //                         eemodal.style.display = "block";
        //                     });
        //                 });

        //             FlowBPMNJsonCreator('flow'+idflow, startid, t, startx, starty,endx,endy,midx,starttype,endtype);    
        //             starttype= "";
        //             endtype = "";
        //             startx = 0;
        //             starty = 0;
        //             endx = 0;
        //             endy = 0;
        //             startid =0;
        //         }
        //     })
         //   .call(drag);
            // EventBPMNJsonCreator('endEvent'+idstartelement, d3.event.pageX, d3.event.pageY, 20, 20,"endEvent");

    } else if (bpmnElement === "task") {
        window.bpmnElement = null;
        var sampleSVG = svg;

        taskdevider(subElement,svg);


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


    // function dragMoves(me) {

    //     console.log("ok")
    //     var x = d3.event.x
    //     var y = d3.event.y

    //     d3.select(me).attr('transform', 'matrix(0.7,0.7,-0.7,0.7,' + x + ',' + y + ')')
    // }

    function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
    }

    var drag = d3.behavior.drag()
    .on('drag', function (d) {
        console.log("--dvalue--"+d)
       // console.log("--dvalues--"+this)
        dragMove(this)
    })
    .on("dragstart", function () { 
        console.log("ondragstart")
        var elementid = d3.select(this).attr("id");
        for (var i = 0; i < bpmnjson.length; i++) {
            var bpmnobject = bpmnjson[i];

        if (bpmnobject.start_id === elementid &&  bpmnobject.id != 0) {
            console.log("")
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
                            if (coords.x < flow.end_x) {
                                flow.end_x = flow.end_x -35; 
                            }else if (coords.x > flow.end_x) {
                                flow.end_x = flow.end_x +35; 
                            }
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
                            if (coords.x < flow.end_x) {
                                flow.end_x = flow.end_x -35; 
                            }else if (coords.x > flow.end_x) {
                                flow.end_x = flow.end_x +35; 
                            }
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
                    if (flow.start_x > flow.end_x) {
                        console.log("in sx > ex")
                        console.log(flow.start_type)
                        console.log("circle value"+circle.getAttribute('x'))
                        if (flow.start_type === "startEvent") {
                            flow.start_x = flow.start_x +21;
                            console.log("value : "+coords.x)
                            if (coords.x <= flow.start_x) {
                                console.log("in sx > cx")
                                flow.start_x = flow.start_x -21; 
                            }else if (coords.x > flow.start_x) {
                                console.log("in cx > sx")
                                flow.start_x = flow.start_x +21; 
                            }    
                        }else if (flow.start_type === "task") {
                            flow.start_x = flow.start_x +67;
                            if (coords.x < flow.start_x) {
                                flow.start_x = flow.start_x -67; 
                            }else if (coords.x > flow.start_x) {
                                flow.start_x = flow.start_x +67; 
                            } 
                        }else if (flow.start_type === "gateway") {
                            flow.start_x = flow.start_x +35;
                            if (coords.x < flow.start_x) {
                                flow.start_x = flow.start_x -35; 
                            }else if (coords.x > flow.start_x) {
                                flow.start_x = flow.start_x +35; 
                            }
                        }
                    }else if (flow.start_x < flow.end_x) {
                        console.log("in ex > sx")
                        if (flow.start_type === "startEvent") {
                            flow.start_x = flow.start_x -21;
                            if (coords.x <= flow.start_x) {
                                flow.start_x = flow.start_x -21; 
                            }else if (coords.x > flow.start_x) {
                                flow.start_x = flow.start_x +21; 
                            }   
                        }else if (flow.start_type === "task") {
                            flow.start_x = flow.start_x -67;
                            if (coords.x < flow.start_x) {
                                flow.start_x = flow.start_x -67; 
                            }else if (coords.x > flow.start_x) {
                                flow.start_x = flow.start_x +67; 
                            } 
                        }else if (flow.start_type === "gateway") {
                            flow.start_x = flow.start_x -35;
                            if (coords.x < flow.start_x) {
                                flow.start_x = flow.start_x -35; 
                            }else if (coords.x > flow.start_x) {
                                flow.start_x = flow.start_x +35; 
                            }
                        }
                    }



                if (coords.x > flow.start_x) {
                        if (flow.end_type === "endEvent") {
                            endx = coords.x - 25;
                            endy = coords.y;  
                        }else if (flow.end_type === "task") {
                            endx = coords.x + 120;
                            endy = coords.y + 40;
                        }else if (flow.end_type === "gateway") {
                            endx = coords.x - 35;
                            endy = coords.y + 30;
                        }
                        // endx = coords.x - 35;
                        // endy = coords.y + 30;
                    }else if (coords.x < flow.start_x) {
                        if (flow.end_type === "endEvent") {
                            endx = coords.x + 25;
                            endy = coords.y;  
                        }else if (flow.end_type === "task") {
                            endx = coords.x - 2;
                            endy = coords.y + 40;
                        }else if (flow.end_type === "gateway") {
                            endx = coords.x + 35;
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

    
    // var drags = d3.behavior.drag().on('drag', function (d) {

    //     dragMoves(this)
    // })
    // .on("dragstart", function () { 
    //     console.log("ondragstart")
    //     var elementid = d3.select(this).attr("id");
    //     for (var i = 0; i < bpmnjson.length; i++) {
    //         var bpmnobject = bpmnjson[i];
    //     if (bpmnobject.start_id === elementid &&  bpmnobject.id != 0) {
    //         dragFlows.push({
    //             "id": bpmnobject.id,
    //             "start_id":bpmnobject.start_id,
    //             "end_id":bpmnobject.end_id,
    //             "start_x": bpmnobject.start_x,
    //             "start_y": bpmnobject.start_y,
    //             "end_x": bpmnobject.end_x,
    //             "end_y": bpmnobject.end_y,
    //             "mid_x":bpmnobject.mid_x,
    //             "start_type":bpmnobject.start_type,
    //             "end_type":bpmnobject.end_type,
    //             "connection" : "start"
    //         })
    //         console.log(bpmnobject.id+" removed")
    //         console.log(dragFlows)
    //         d3.select(document.getElementById(bpmnobject.id)).remove(); 
    //         bpmnobject.id=0;

    //     }else if (bpmnobject.end_id ===elementid &&  bpmnobject.id != 0) {
    //         dragFlows.push({
    //             "id": bpmnobject.id,
    //             "start_id":bpmnobject.start_id,
    //             "end_id":bpmnobject.end_id,
    //             "start_x": bpmnobject.start_x,
    //             "start_y": bpmnobject.start_y,
    //             "end_x": bpmnobject.end_x,
    //             "end_y": bpmnobject.end_y,
    //             "mid_x":bpmnobject.mid_x,
    //             "start_type":bpmnobject.start_type,
    //             "end_type":bpmnobject.end_type,
    //             "connection" : "end"
    //         })
    //         console.log(bpmnobject.id+" removed")
    //         console.log(dragFlows)
    //         d3.select(document.getElementById(bpmnobject.id)).remove(); 
    //         bpmnobject.id=0;
    //     }
    //     }
    // })

    // .on("dragend", function () { 
    //     for (var i = 0; i < dragFlows.length; i++) {
    //         var flow = dragFlows[i];
    //         if (flow.connection === "start") {
    //             var circle = document.getElementById(flow.start_id),
    //                 cx = +circle.getAttribute('cx'),
    //                 cy = +circle.getAttribute('cy'),
    //                 ctm = circle.getCTM(),
    //                 coords = getScreenCoords(cx, cy, ctm);
    //             if (coords.x < flow.end_x) {
    //                     if (flow.start_type === "startEvent") {
    //                         startx = coords.x + 20;
    //                         starty = coords.y;  
    //                     }else if (flow.start_type === "task") {
    //                         startx = coords.x + 120;
    //                         starty = coords.y + 40;
    //                     }else if (flow.start_type === "gateway") {
    //                         startx = coords.x + 30;
    //                         starty = coords.y + 30;
    //                     }
    //                     // endx = coords.x - 35;
    //                     // endy = coords.y + 30;
    //                 }else if (coords.x > flow.end_x) {
    //                     if (flow.start_type === "startEvent") {
    //                         startx = coords.x - 20;
    //                         starty = coords.y;  
    //                     }else if (flow.start_type === "task") {
    //                         startx = coords.x - 2;
    //                         starty = coords.y + 40;
    //                     }else if (flow.start_type === "gateway") {
    //                         startx = coords.x - 30;
    //                         starty = coords.y + 30;
    //                     }
    //                     // endx = coords.x + 35;
    //                     // endy = coords.y + 30;
    //                 }
    //                 midx = startx + ((flow.end_x - startx) / 2);
    //                 sampleSVG.append("marker")
    //                     .attr("id", "triangle"+(++idflow))
    //                     .attr("viewBox", "0 0 10 10")
    //                     .attr("refX", "0")
    //                     .attr("refY", "5")
    //                     .attr("markerUnits", "strokeWidth")
    //                     .attr("markerWidth", "5")
    //                     .attr("markerHeight", "4")
    //                     .attr("orient", "auto")
    //                     .append('svg:path')
    //                     .attr('d', 'M 0 0 L 10 5 L 0 10 z');


    //                 sampleSVG.append("polyline")      // attach a polyline
    //                     .attr("id", "flow"+idflow)
    //                     .attr("marker-end", "url(#triangle"+idflow+")")
    //                     .style("stroke", "black")  // colour the line
    //                     .style("fill", "none")     // remove any fill colour
    //                     .style("stroke-width", "2")
    //                     .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + flow.end_y+ "," + flow.end_x + "," + flow.end_y);        
                    
    //                 FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, startx, starty,flow.end_x,flow.end_y,midx,flow.start_type,flow.end_type);    
    //                 starttype= "";
    //                 endtype = "";
    //                 startx = 0;
    //                 starty = 0;
    //                 endx = 0;
    //                 endy = 0;

    //         }else if (flow.connection === "end") {
    //             var circle = document.getElementById(flow.end_id),
    //                 cx = +circle.getAttribute('cx'),
    //                 cy = +circle.getAttribute('cy'),
    //                 ctm = circle.getCTM(),
    //                 coords = getScreenCoords(cx, cy, ctm);
    //             if (coords.x > flow.start_x) {
    //                     if (flow.end_type === "startEvent") {
    //                         endx = coords.x + 20;
    //                         endy = coords.y;  
    //                     }else if (flow.end_type === "task") {
    //                         endx = coords.x + 120;
    //                         endy = coords.y + 40;
    //                     }else if (flow.end_type === "gateway") {
    //                         endx = coords.x + 30;
    //                         endy = coords.y + 30;
    //                     }
    //                     // endx = coords.x - 35;
    //                     // endy = coords.y + 30;
    //                 }else if (coords.x < flow.start_x) {
    //                     if (flow.end_type === "startEvent") {
    //                         endx = coords.x - 20;
    //                         endy = coords.y;  
    //                     }else if (flow.end_type === "task") {
    //                         endx = coords.x - 2;
    //                         endy = coords.y + 40;
    //                     }else if (flow.end_type === "gateway") {
    //                         endx = coords.x - 30;
    //                         endy = coords.y + 30;
    //                     }
    //                     // endx = coords.x + 35;
    //                     // endy = coords.y + 30;
    //                 }
    //                 midx = flow.start_x + ((endx - flow.start_x) / 2);
    //                 sampleSVG.append("marker")
    //                     .attr("id", "triangle"+(++idflow))
    //                     .attr("viewBox", "0 0 10 10")
    //                     .attr("refX", "0")
    //                     .attr("refY", "5")
    //                     .attr("markerUnits", "strokeWidth")
    //                     .attr("markerWidth", "5")
    //                     .attr("markerHeight", "4")
    //                     .attr("orient", "auto")
    //                     .append('svg:path')
    //                     .attr('d', 'M 0 0 L 10 5 L 0 10 z');


    //                 sampleSVG.append("polyline")      // attach a polyline
    //                     .attr("id", "flow"+idflow)
    //                     .attr("marker-end", "url(#triangle"+idflow+")")
    //                     .style("stroke", "black")  // colour the line
    //                     .style("fill", "none")     // remove any fill colour
    //                     .style("stroke-width", "2")
    //                     .attr("points", flow.start_x + "," + flow.start_y + "," + midx + "," + flow.start_y + "," + midx + "," + endy+ "," + endx + "," + endy);        
                    
    //                 FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, flow.start_x, flow.start_y,endx,endy,midx,flow.start_type,flow.end_type);    
    //                 starttype= "";
    //                 endtype = "";
    //                 startx = 0;
    //                 starty = 0;
    //                 endx = 0;
    //                 endy = 0;

    //         }
    //     }


    //   dragFlows =[];

    //  });

