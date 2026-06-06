"use strict";

//var dragFlows =[];

var g2;
var points = [], g;


var bpmnEventDivider = function (bpmnElement,subElement,svg) {
    if (bpmnElement === "startEvent") {
        window.bpmnElement = null;

        starteventdevider(null,subElement,svg,d3.event.pageX,d3.event.pageY);
        
    } else if (bpmnElement === "endEvent") {
        window.bpmnElement = null;
        
        endeventdevider(null,subElement,svg,d3.event.pageX,d3.event.pageY);

    } else if (bpmnElement === "task") {
        window.bpmnElement = null;
        var sampleSVG = svg;

        taskdevider(null,subElement,svg,d3.event.pageX,d3.event.pageY);


    } else if (bpmnElement === "gateway") {
        window.bpmnElement = null;
        gatewaydevider(null,subElement,svg,d3.event.pageX,d3.event.pageY);
       // var sampleSVG = svg;
        
    }

}
function deleteElement(id) {
    for (var i = 0; i < bpmnjson.length; i++) {
        var bpmnobject = bpmnjson[i];
        if (bpmnobject.id === id) {
            bpmnobject.id = 0;
        } else if (bpmnobject.start_id === id || bpmnobject.end_id === id) {
            sampleSVG.select("#group" + bpmnobject.id).remove();
            bpmnobject.id = 0;
        }
    }
    d3.select(document.getElementById(id)).remove();
    tooltipDiv.transition().style("opacity", 0);
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

    var drag = d3.behavior.drag()
    .on('drag', function () {
        dragMove(this);
    })
    .on("dragstart", function () {
        var elementid = d3.select(this).attr("id");
        for (var i = 0; i < bpmnjson.length; i++) {
            var bpmnobject = bpmnjson[i];
            if (bpmnobject.start_id === elementid && bpmnobject.id != 0) {
                dragFlows.push({
                    "id": bpmnobject.id,
                    "start_id": bpmnobject.start_id,
                    "end_id": bpmnobject.end_id,
                    "start_x": bpmnobject.start_x,
                    "start_y": bpmnobject.start_y,
                    "end_x": bpmnobject.end_x,
                    "end_y": bpmnobject.end_y,
                    "mid_x": bpmnobject.mid_x,
                    "start_type": bpmnobject.start_type,
                    "end_type": bpmnobject.end_type,
                    "connection": "start"
                });
                sampleSVG.select("#group" + bpmnobject.id).remove();
                bpmnobject.id = 0;
            } else if (bpmnobject.end_id === elementid && bpmnobject.id != 0) {
                dragFlows.push({
                    "id": bpmnobject.id,
                    "start_id": bpmnobject.start_id,
                    "end_id": bpmnobject.end_id,
                    "start_x": bpmnobject.start_x,
                    "start_y": bpmnobject.start_y,
                    "end_x": bpmnobject.end_x,
                    "end_y": bpmnobject.end_y,
                    "mid_x": bpmnobject.mid_x,
                    "start_type": bpmnobject.start_type,
                    "end_type": bpmnobject.end_type,
                    "connection": "end"
                });
                sampleSVG.select("#group" + bpmnobject.id).remove();
                bpmnobject.id = 0;
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
                    starttype= flow.start_type;
                    endtype = flow.end_type;
                    endx = flow.end_x;
                    endy = flow.end_y;
                    startid =flow.start_id;
                    endid =flow.end_id;
                    flowcreator(null);
  

            } else if (flow.connection === "end") {

                var circle = document.getElementById(flow.end_id),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                    if (flow.start_x > flow.end_x) {
                        if (flow.start_type === "startEvent") {
                            flow.start_x = flow.start_x +21;
                            if (coords.x <= flow.start_x) {
                                flow.start_x = flow.start_x -21;
                            } else if (coords.x > flow.start_x) {
                                flow.start_x = flow.start_x +21;
                            }
                        } else if (flow.start_type === "task") {
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
                    } else if (flow.start_x < flow.end_x) {
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
                          //  endx = coords.x + 35;
                          endx = coords.x + 35;
                            endy = coords.y + 30;
                        }
                        // endx = coords.x + 35;
                        // endy = coords.y + 30;
                    }
                    midx = flow.start_x + ((endx - flow.start_x) / 2);
                    starttype= flow.start_type;
                    endtype = flow.end_type;
                    startx = flow.start_x;
                    starty = flow.start_y;
                    startid =flow.start_id;
                    endid =flow.end_id;
                    flowcreator(null);
                   

            }
        }


      dragFlows =[];
    });
