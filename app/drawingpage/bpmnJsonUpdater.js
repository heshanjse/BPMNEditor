"use strict";
function EventBPMNJsonCreator(id, x, y, width, height,type,subtype) {

            // console.log(id+x+y+width+height)
            window.bpmnjson.push({
                "id": id,
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "type": type,
                "subtype" : subtype
            })
            console.log(bpmnjson);
}
function TaskBPMNJsonCreator(id, x, y, width, height,type,subtype) {

            // console.log(id+x+y+width+height)
            window.bpmnjson.push({
                "id": id,
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "text":"sample",
                "type":type,
                "subtype" : subtype
            })
            console.log(bpmnjson);

}
function FlowBPMNJsonCreator(id,type, start_id, end_id, start_x, start_y,end_x,end_y,mid_x,start_type,end_type) {
                console.log(id)
                console.log(startid)
                console.log(endid)
            // console.log(id+x+y+width+height)
            bpmnjson.push({
                 "id": id,
                // "id": id,
                 "type": "flow",
                 "start_x": start_x,
                 "start_y": start_y,
                 "end_x": end_x,
                 "end_y": end_y,
                 "mid_x":mid_x,
                 "start_id":start_id,
                "end_id": end_id,
            //   "end_id": ++id,
                "start_type":start_type,
                "end_type":end_type
                
            });
            
            console.log(bpmnjson);

}
