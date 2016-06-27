"use strict";
function EventBPMNJsonCreator(id, x, y, width, height,type) {

            // console.log(id+x+y+width+height)
            window.bpmnjson.push({
                "id": id,
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "type": type
            })
            console.log(bpmnjson);
}
function TaskBPMNJsonCreator(id, x, y, width, height,type) {

            // console.log(id+x+y+width+height)
            window.bpmnjson.push({
                "id": id,
                "x": x,
                "y": y,
                "width": width,
                "height": height,
                "text":"sample",
                "type":type
            })
            console.log(bpmnjson);

}
function FlowBPMNJsonCreator(id, start_id, end_id, start_x, start_y,end_x,end_y,mid_x) {

            // console.log(id+x+y+width+height)
            window.bpmnjson.push({
                "id": id,
                "start_id":start_id,
                "end_id":end_id,
                "start_x": start_x,
                "start_y": start_y,
                "end_x": end_x,
                "end_y": end_y,
                "mid_x":mid_x
            })
            console.log(bpmnjson);

}
