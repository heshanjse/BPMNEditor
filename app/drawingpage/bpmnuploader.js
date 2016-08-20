"use strict";
function uploadgraphCreator(data) {
    console.log(data)
       // console.log(data.bpmnjson.length)
            for (var i = 0; i < data.bpmnjson.length ; i++) {
                var bpmnelement = data.bpmnjson[i]
                console.log(bpmnelement.type)
                console.log(bpmnelement.x)
                    console.log(bpmnelement.y)
                if (bpmnelement.type === "startEvnet") {
                    console.log("oki se")
                    console.log(bpmnelement.subtype)
                    starteventdevider(bpmnelement.subtype,sampleSVG,bpmnelement.x,bpmnelement.y)
                }else if (bpmnelement.type === "endEvent") {
                    endeventdevider(bpmnelement.subtype,sampleSVG,bpmnelement.x,bpmnelement.y)
                } else if (bpmnelement.type === "gateway") {
                    gatewaydevider(bpmnelement.subtype,sampleSVG,bpmnelement.x,bpmnelement.y)
                } 
                else if (bpmnelement.type === "task") {
                    taskdevider(bpmnelement.subtype,sampleSVG,bpmnelement.x,bpmnelement.y)
                }else if (bpmnelement.type === "flow") {
                    starttype= bpmnelement.start_type;
                    endtype = bpmnelement.end_type;
                    startx = bpmnelement.start_x;
                    starty = bpmnelement.start_y;
                    endx = bpmnelement.end_x;
                    endy = bpmnelement.end_y;
                    startid =bpmnelement.start_id;
                    endid =bpmnelement.end_id;
                    midx = startx + ((endx - startx) / 2);
                    flowcreator()
                }
            }
            bpmnjson = [];
            bpmnjson = data.bpmnjson;
           
}