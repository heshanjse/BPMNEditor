"use strict";
function uploadgraphCreator(data) {
    for (var i = 0; i < data.bpmn.length; i++) {
        var bpmnelement = data.bpmn[i];

        if (bpmnelement.id === "data") {
            idstartelement = bpmnelement.idstartelement;
            idendelement = bpmnelement.idendelement;
            idtaskelement = bpmnelement.idtaskelement;
            idgatewayelement = bpmnelement.idgatewayelement;
            idflow = bpmnelement.idflow;
            continue;
        }

        if (bpmnelement.type === "startEvent") {
            starteventdevider(bpmnelement.id, bpmnelement.subtype, sampleSVG, bpmnelement.x, bpmnelement.y);
        } else if (bpmnelement.type === "endEvent") {
            endeventdevider(bpmnelement.id, bpmnelement.subtype, sampleSVG, bpmnelement.x, bpmnelement.y);
        } else if (bpmnelement.type === "gateway") {
            gatewaydevider(bpmnelement.id, bpmnelement.subtype, sampleSVG, bpmnelement.x, bpmnelement.y);
        } else if (bpmnelement.type === "task") {
            taskdevider(bpmnelement.id, bpmnelement.subtype, sampleSVG, bpmnelement.x, bpmnelement.y);
        } else if (bpmnelement.type === "flow") {
            starttype = bpmnelement.start_type;
            endtype = bpmnelement.end_type;
            startx = bpmnelement.start_x;
            starty = bpmnelement.start_y;
            endx = bpmnelement.end_x;
            endy = bpmnelement.end_y;
            startid = bpmnelement.start_id;
            endid = bpmnelement.end_id;
            flowPortASide = bpmnelement.port_a_side || "";
            flowPortBSide = bpmnelement.port_b_side || "";
            var isVA = (flowPortASide === 'top' || flowPortASide === 'bottom');
            var isVB = (flowPortBSide === 'top' || flowPortBSide === 'bottom');
            if (!isVA && !isVB) {           // HH
                midx = startx + (endx - startx) / 2;  midy = 0;
            } else if (isVA && isVB) {      // VV
                midy = starty + (endy - starty) / 2;  midx = 0;
            } else if (!isVA && isVB) {     // HV
                midx = 0;  midy = starty + (endy - starty) / 2;
            } else {                         // VH
                midx = startx + (endx - startx) / 2;  midy = 0;
            }
            flowcreator(bpmnelement.id);
        }
    }

    bpmnjson = data.bpmn.filter(function (el) { return el.id !== "data" && el.id !== 0; });
}