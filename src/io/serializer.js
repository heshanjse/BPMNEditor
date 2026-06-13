"use strict";
function EventBPMNJsonCreator(id, x, y, width, height, type, subtype) {
    window.bpmnjson.push({
        "id":     id,
        "x":      x,
        "y":      y,
        "width":  width,
        "height": height,
        "name":   "",
        "type":   type,
        "subtype": subtype
    });
}

function TaskBPMNJsonCreator(id, x, y, width, height, type, subtype) {
    window.bpmnjson.push({
        "id":       id,
        "x":        x,
        "y":        y,
        "width":    width,
        "height":   height,
        "name":     "",
        "assignee": "",
        "type":     type,
        "subtype":  subtype
    });
}

function FlowBPMNJsonCreator(id, type, start_id, end_id, start_x, start_y, end_x, end_y, mid_x, start_type, end_type, port_a_side, port_b_side) {
    bpmnjson.push({
        "id": id,
        "type": "flow",
        "name": "",
        "start_x": start_x,
        "start_y": start_y,
        "end_x": end_x,
        "end_y": end_y,
        "mid_x": mid_x,
        "start_id": start_id,
        "end_id": end_id,
        "start_type": start_type,
        "end_type": end_type,
        "port_a_side": port_a_side || "",
        "port_b_side": port_b_side || ""
    });
}
