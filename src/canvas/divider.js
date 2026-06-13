"use strict";

//var dragFlows =[];

var g2;
var points = [], g;


var bpmnEventDivider = function (bpmnElement, subElement, svg, x, y) {
    if (bpmnElement === "startEvent") {
        window.bpmnElement = null;
        starteventdevider(null, subElement, svg, x, y);
    } else if (bpmnElement === "endEvent") {
        window.bpmnElement = null;
        endeventdevider(null, subElement, svg, x, y);
    } else if (bpmnElement === "task") {
        window.bpmnElement = null;
        taskdevider(null, subElement, svg, x, y);
    } else if (bpmnElement === "gateway") {
        window.bpmnElement = null;
        gatewaydevider(null, subElement, svg, x, y);
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

function dragMove(me, event) {
        var x = event.x;
        var y = event.y;
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

    var drag = d3.drag()
    .on('drag', function (event) {
        dragMove(this, event);
    })
    .on("start", function () {
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
    .on("end", function () {
        FlowEngine.reconnectFlows();
    });
