"use strict";
var taskdevider = function (subElement,svg,xvalue,yvalue){  
 console.log("commming")
++idtaskelement
var w = window.innerWidth,
    h = window.innerHeight
//     r = 120;

var isXChecked = true,
    isYChecked = true;

var width = 120,
    height = 80,
    dragbarw = 20;

var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove)
    .on("dragstart", function () { 
        console.log("ondragstart")
        var elementid = d3.select(this).attr("id");
        console.log(elementid)
        for (var i = 0; i < bpmnjson.length; i++) {
            var bpmnobject = bpmnjson[i];

        if (bpmnobject.start_id === elementid &&  bpmnobject.id != 0) {
            console.log(" inside start")
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
            sampleSVG.select("#group"+bpmnobject.id).remove(); 
           // d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;

        }else if (bpmnobject.end_id ===elementid &&  bpmnobject.id != 0) {
            console.log(" inside end")
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
            sampleSVG.select("#group"+bpmnobject.id).remove(); 
           // d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;
        }
        }
    })
    .on("dragend", function () { 
        

        for (var i = 0; i < dragFlows.length; i++) {
            var flow = dragFlows[i];
            if (flow.connection === "start") {
                console.log("start dragend -----")
                var circle = document.getElementById(flow.start_id),
                    cx = circle.getAttribute('x'),
                    cy = circle.getAttribute('y'),
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
                          //  startx = coords.x + 120;
                            startx = coords.x + width;
                            starty = coords.y + 40;
                    }else if (coords.x > flow.end_x) {
                            startx = coords.x - 2;
                            starty = coords.y + 40;
                    }


                    midx = startx + ((flow.end_x - startx) / 2);

                    
                   
                    endy = flow.end_y;
                    endx =  flow.end_x;
                    starttype= flow.start_type;
                    endtype = flow.end_type;
                   
                    endx = flow.end_x;
                    endy = flow.end_y;
                    startid =flow.start_id;
                    endid =flow.end_id;
                    flowcreator();
                    // sampleSVG.append("marker")
                    //     .attr("id", "triangle"+(++idflow))
                    //     .attr("viewBox", "0 0 10 10")
                    //     .attr("refX", "0")
                    //     .attr("refY", "5")
                    //     .attr("markerUnits", "strokeWidth")
                    //     .attr("markerWidth", "5")
                    //     .attr("markerHeight", "4")
                    //     .attr("orient", "auto")
                    //     .append('svg:path')
                    //     .attr('d', 'M 0 0 L 10 5 L 0 10 z');


                    // sampleSVG.append("polyline")      // attach a polyline
                    //     .attr("id", "flow"+idflow)
                    //     .attr("marker-end", "url(#triangle"+idflow+")")
                    //     .style("stroke", "black")  // colour the line
                    //     .style("fill", "none")     // remove any fill colour
                    //     .style("stroke-width", "2")
                    //     .attr("points", startx + "," + starty + "," + midx + "," + starty + "," + midx + "," + flow.end_y+ "," + flow.end_x + "," + flow.end_y);        
                    
                    // FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, startx, starty,flow.end_x,flow.end_y,midx,flow.start_type,flow.end_type);    
                    // starttype= "";
                    // endtype = "";
                    // startx = 0;
                    // starty = 0;
                    // endx = 0;
                    // endy = 0;

            }else if (flow.connection === "end") {

                var circle = document.getElementById(flow.end_id),
                    cx = circle.getAttribute('x'),
                    cy = circle.getAttribute('y'),
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



                if (coords.x < flow.start_x) {
                          //  endx = coords.x + 127;
                           console.log("point--------------------")
                           console.log(width)
                           endx = coords.x + width+7;
                            endy = coords.y + 40;              
                    }else if (coords.x > flow.start_x) {
                            endx = coords.x - 7;
                            endy = coords.y + 40;
                    }
                    midx = flow.start_x + ((endx - flow.start_x) / 2);


                    startx = flow.start_x;
                    starty =  flow.start_y;

                    starttype= flow.start_type;
                    endtype = flow.end_type;
                   
                    // endx = flow.end_x;
                    // endy = flow.end_y;
                    startid =flow.start_id;
                    endid =flow.end_id;
                    flowcreator();
                  
                    // sampleSVG.append("marker")
                    //     .attr("id", "triangle"+(++idflow))
                    //     .attr("viewBox", "0 0 10 10")
                    //     .attr("refX", "0")
                    //     .attr("refY", "5")
                    //     .attr("markerUnits", "strokeWidth")
                    //     .attr("markerWidth", "5")
                    //     .attr("markerHeight", "4")
                    //     .attr("orient", "auto")
                    //     .append('svg:path')
                    //     .attr('d', 'M 0 0 L 10 5 L 0 10 z');


                    // sampleSVG.append("polyline")      // attach a polyline
                    //     .attr("id", "flow"+idflow)
                    //     .attr("marker-end", "url(#triangle"+idflow+")")
                    //     .style("stroke", "black")  // colour the line
                    //     .style("fill", "none")     // remove any fill colour
                    //     .style("stroke-width", "2")
                    //     .attr("points", flow.start_x + "," + flow.start_y + "," + midx + "," + flow.start_y + "," + midx + "," + endy+ "," + endx + "," + endy);        
                    
                    // FlowBPMNJsonCreator('flow'+ idflow, flow.start_id, flow.end_id, flow.start_x, flow.start_y,endx,endy,midx,flow.start_type,flow.end_type);    
                    // starttype= "";
                    // endtype = "";
                    // startx = 0;
                    // starty = 0;
                    // endx = 0;
                    // endy = 0;

            }
        }


      dragFlows =[];
    });

var dragright = d3.behavior.drag()
    .origin(Object)
    
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
            sampleSVG.select("#group"+bpmnobject.id).remove(); 
           // d3.select(document.getElementById(bpmnobject.id)).remove(); 
            bpmnobject.id=0;
           // bpmnjson.splice(i, 1);


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
            sampleSVG.select("#group"+bpmnobject.id).remove(); 
           // d3.select(document.getElementById(bpmnobject.id)).remove(); 
           bpmnobject.id=0;
          //  bpmnjson.splice(i, 1);
        }
        }
    })
    .on("dragend", function () { 
        

        for (var i = 0; i < dragFlows.length; i++) {
            var flow = dragFlows[i];
            if (flow.connection === "start") {
                console.log("start dragend -----")
                var circle = document.getElementById(flow.start_id),
                    cx = circle.getAttribute('x'),
                    cy = circle.getAttribute('y'),
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
                          //  startx = coords.x + 120;
                            startx = coords.x + width;
                            starty = coords.y + 40;
                    }else if (coords.x > flow.end_x) {
                            startx = coords.x - 2;
                            starty = coords.y + 40;
                    }


                    midx = startx + ((flow.end_x - startx) / 2);

                    
                   
                    endy = flow.end_y;
                    endx =  flow.end_x;
                    starttype= flow.start_type;
                    endtype = flow.end_type;
                   
                    endx = flow.end_x;
                    endy = flow.end_y;
                    startid =flow.start_id;
                    endid =flow.end_id;
                    flowcreator();


            }else if (flow.connection === "end") {

                var circle = document.getElementById(flow.end_id),
                    cx = circle.getAttribute('x'),
                    cy = circle.getAttribute('y'),
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



                if (coords.x < flow.start_x) {
                          //  endx = coords.x + 127;
                           console.log("point--------------------")
                           console.log(width)
                           endx = coords.x + width+7;
                            endy = coords.y + 40;              
                    }else if (coords.x > flow.start_x) {
                            endx = coords.x - 7;
                            endy = coords.y + 40;
                    }
                    midx = flow.start_x + ((endx - flow.start_x) / 2);


                    startx = flow.start_x;
                    starty =  flow.start_y;

                    starttype= flow.start_type;
                    endtype = flow.end_type;
                   
                    // endx = flow.end_x;
                    // endy = flow.end_y;
                    startid =flow.start_id;
                    endid =flow.end_id;
                    flowcreator();
                  

            }
        }


      dragFlows =[];
    })
    .on("drag", rdragresize);

var dragleft = d3.behavior.drag()
    .origin(Object)
    .on("drag", ldragresize);

var dragtop = d3.behavior.drag()
    .origin(Object)
    .on("drag", tdragresize);

var dragbottom = d3.behavior.drag()
    .origin(Object)
    .on("drag", bdragresize);

// var svg = d3.select("body").append("svg")
//     .attr("width", w)
//     .attr("height", h)

var newg = svg.append("g")
      .data([{x: xvalue, y: yvalue}]);
      // .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')

var group = newg.append('g')
         .attr("transform","matrix(1,0,0,1,"+xvalue+","+yvalue+")")
         .attr('id', 'icontask' + idtaskelement)
         // .attr("width", 120)
         // .attr("height", 80)
         .attr("width", width)
         .attr("height", height)
         .call(drag);
         
if (subElement === "UserTask") {
                


//var dragtext = group.append('foreignObject')
var dragtext = group.append('foreignObject')
      .attr('id', 'fobject' + idtaskelement)
      .attr("x", function(d) { return 20 ; })
      .attr("y", function(d) { return 30; })
     .attr('width', width - 40)
      .attr('height', height - 30)
    //  .append("xhtml:body")
    //  .append('html','<div style="width: 70px; height:45px ; background-color: transparent;">User Task</div>')
     .html("<div id=\"textid"+idtaskelement+"\"; style=\"width: 80%; height:45px ; background-color: transparent;\" >User Task</div>");

var dragpic1 =  group.append('path')
         .attr("d","m 15,12 c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5")   
        .attr("fill","none")
        .attr("stroke","#000000")
        

var dragpic2 =group.append('path')
        .attr("d","m 15,12 m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005")   
        .attr("fill","none")
        .attr("stroke","#000000")
     //   .call(drag);

var dragpic3 =group.append('path')
        .attr("d","m 15,12 m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z")   
        .attr("fill","#000000")
        .attr("stroke","#000000")
       // .call(drag);
           }else if (subElement === "ScriptTask") {
               
                console.log("script task")


      var dragtext = group.append('foreignObject')
      .attr("x", function(d) { return 20 ; })
      .attr("y", function(d) { return 30; })
     .attr('width', 80)
      .attr('height', 50)
      .append("xhtml:body")
    //  .append('html','<div style="width: 70px; height:45px ; background-color: transparent;">User Task</div>')
     .html("<div id=\"textid"+idtaskelement+"\"; style=\"width: 70px; height:45px ; background-color: transparent;\" >Script Task</div>");

var dragpic1 =  group.append('path')
         .attr("d","m 15,20 c 9.966553,-6.27276 -8.000926,-7.91932 2.968968,-14.938 l -8.802728,0 c -10.969894,7.01868 6.997585,8.66524 -2.968967,14.938 z m -7,-12 l 5,0 m -4.5,3 l 4.5,0 m -3,3 l 5,0m -4,3 l 5,0")   
        .attr("fill","none")
        .attr("stroke","#000000")
        
      
           }else if (subElement === "MailTask") {
            



      var dragtext = group.append('foreignObject')
      .attr("x", function(d) { return 20 ; })
      .attr("y", function(d) { return 30; })
     .attr('width', 80)
      .attr('height', 50)
      .append("xhtml:body")
    //  .append('html','<div style="width: 70px; height:45px ; background-color: transparent;">User Task</div>')
     .html("<div id=\"textid"+idtaskelement+"\"; style=\"width: 70px; height:45px ; background-color: transparent;\" >Mail Task</div>");

var dragpic1 =  group.append('path')
         .attr("d","m 5.984999999999999,4.997999999999999 l 0,14 l 21,0 l 0,-14 z l 10.5,6 l 10.5,-6")   
        .attr("fill","#000000")
        .attr("stroke","#ffffff");


     
           }else if (subElement === "ManualTask") {
           
          var dragtext = group.append('foreignObject')
      .attr("x", function(d) { return 20 ; })
      .attr("y", function(d) { return 30; })
     .attr('width', 80)
      .attr('height', 50)
      .append("xhtml:body")
    //  .append('html','<div style="width: 70px; height:45px ; background-color: transparent;">User Task</div>')
     .html("<div id=\"textid"+idtaskelement+"\"; style=\"width: 70px; height:45px ; background-color: transparent;\" >Manual Task</div>");

var dragpic1 =  group.append('path')
         .attr("d","m 17,15 c 0.234,-0.01 5.604,0.008 8.029,0.004 0.808,0 1.271,-0.172 1.417,-0.752 0.227,-0.898 -0.334,-1.314 -1.338,-1.316 -2.467,-0.01 -7.886,-0.004 -8.108,-0.004 -0.014,-0.079 0.016,-0.533 0,-0.61 0.195,-0.042 8.507,0.006 9.616,0.002 0.877,-0.007 1.35,-0.438 1.353,-1.208 0.003,-0.768 -0.479,-1.09 -1.35,-1.091 -2.968,-0.002 -9.619,-0.013 -9.619,-0.013 v -0.591 c 0,0 5.052,-0.016 7.225,-0.016 0.888,-0.002 1.354,-0.416 1.351,-1.193 -0.006,-0.761 -0.492,-1.196 -1.361,-1.196 -3.473,-0.005 -10.86,-0.003 -11.0829995,-0.003 -0.022,-0.047 -0.045,-0.094 -0.069,-0.139 0.3939995,-0.319 2.0409995,-1.626 2.4149995,-2.017 0.469,-0.4870005 0.519,-1.1650005 0.162,-1.6040005 -0.414,-0.511 -0.973,-0.5 -1.48,-0.236 -1.4609995,0.764 -6.5999995,3.6430005 -7.7329995,4.2710005 -0.9,0.499 -1.516,1.253 -1.882,2.19 -0.37000002,0.95 -0.17,2.01 -0.166,2.979 0.004,0.718 -0.27300002,1.345 -0.055,2.063 0.629,2.087 2.425,3.312 4.859,3.318 4.6179995,0.014 9.2379995,-0.139 13.8569995,-0.158 0.755,-0.004 1.171,-0.301 1.182,-1.033 0.012,-0.754 -0.423,-0.969 -1.183,-0.973 -1.778,-0.01 -5.824,-0.004 -6.04,-0.004 10e-4,-0.084 0.003,-0.586 10e-4,-0.67 z")   
        .attr("fill","none")
        .attr("stroke","#000000");

        //   var dragpic1 = group.append('path')
        // .attr("d","m 17,15 c 0.234,-0.01 5.604,0.008 8.029,0.004 0.808,0 1.271,-0.172 1.417,-0.752 0.227,-0.898 -0.334,-1.314 -1.338,-1.316 -2.467,-0.01 -7.886,-0.004 -8.108,-0.004 -0.014,-0.079 0.016,-0.533 0,-0.61 0.195,-0.042 8.507,0.006 9.616,0.002 0.877,-0.007 1.35,-0.438 1.353,-1.208 0.003,-0.768 -0.479,-1.09 -1.35,-1.091 -2.968,-0.002 -9.619,-0.013 -9.619,-0.013 v -0.591 c 0,0 5.052,-0.016 7.225,-0.016 0.888,-0.002 1.354,-0.416 1.351,-1.193 -0.006,-0.761 -0.492,-1.196 -1.361,-1.196 -3.473,-0.005 -10.86,-0.003 -11.0829995,-0.003 -0.022,-0.047 -0.045,-0.094 -0.069,-0.139 0.3939995,-0.319 2.0409995,-1.626 2.4149995,-2.017 0.469,-0.4870005 0.519,-1.1650005 0.162,-1.6040005 -0.414,-0.511 -0.973,-0.5 -1.48,-0.236 -1.4609995,0.764 -6.5999995,3.6430005 -7.7329995,4.2710005 -0.9,0.499 -1.516,1.253 -1.882,2.19 -0.37000002,0.95 -0.17,2.01 -0.166,2.979 0.004,0.718 -0.27300002,1.345 -0.055,2.063 0.629,2.087 2.425,3.312 4.859,3.318 4.6179995,0.014 9.2379995,-0.139 13.8569995,-0.158 0.755,-0.004 1.171,-0.301 1.182,-1.033 0.012,-0.754 -0.423,-0.969 -1.183,-0.973 -1.778,-0.01 -5.824,-0.004 -6.04,-0.004 10e-4,-0.084 0.003,-0.586 10e-4,-0.67 z")   
        // .attr("fill","none")
        // .attr("stroke","#000000");

           }

var dragrect = newg.append("rect")

           .attr('class', 'square')
            .attr('id', 'task' + idtaskelement)
            .style("stroke", "black")
            .attr("x", function(d) { return xvalue})
            .attr("y", function(d) { return yvalue})
            .style("stroke-width", "2")
            .style("fill-opacity", "0")
            .attr("cursor", "move")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("width", 120)
            .attr("height", 80)
            .on("dragend", function () { 
                console.log("drag start event")
             })
            .on("mouseover", function () {
                d3.select(this).style("fill", "aliceblue");
                var point = d3.mouse(this)
                    , p = {mx: point[0], my: point[1]};

                console.log(p.mx + "and " + p.my);


            })
            .on("mouseup", function () {
                d3.select(this).style("fill", "aliceblue");
                var t = d3.select(this).attr("id");
//                 console.log("++++++id++++++")
//                 console.log(t)

                function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
                }

                var circle = document.getElementById(t),
                    cx = circle.getAttribute('x'),
                    cy = circle.getAttribute('y'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                    console.log("========cordeinate=======")
                console.log(coords.x, coords.y);

                tooltipDiv.transition()
                    .duration(200)
                    .style("opacity", 1.9);

                tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >" +"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >"+ "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "text-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/review.png" + " alt=" + "Text" + " style=" + "width:25px;" + " >")
                    .style("left", coords.x + width+ 10 + "px")
                    .style("top", (coords.y + 15) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    deleteElement(t);
                   // console.log("---------")
                   // console.log("icon"+t)
                    d3.select(document.getElementById("icon"+t)).remove(); 
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    tmodal.style.display = "block";
                });
                tooltipDiv.select("#text-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    var element = document.getElementById('edittext');
                    element.style.width = width+"px";
                    element.style.height = height+"px";
                    element.style.display = "block";
                    element.style.left = coords.x+"px";
                    element.style.top = coords.y+"px";
                    element.value = document.getElementById("textid"+idtaskelement).innerHTML;
                    window.selectedtextid = "textid"+idtaskelement; 
                   // TextModal.style.display = "block";
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
                    cx = +circle.getAttribute('x'),
                    cy = +circle.getAttribute('y'),
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
                    endtype = "task"
                    endid =t;
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
                    endid =t;
                    flowcreator();
                
                }

            })
            .call(drag);

            TaskBPMNJsonCreator('task'+idstartelement, xvalue, yvalue, 120, 80,"task",subElement);
             subElement = null;


    //   .attr("x", function(d) { return d3.event.pageX - (dragbarw/2); })
    //   .attr("y", function(d) { return d3.event.pageY + (dragbarw/2); })
    //   .attr("height", height - dragbarw)
    // //  .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
    //   .attr("id", "dragleft")
    //   .attr("width", dragbarw)
    //   .attr("fill", "lightblue")
    //   .attr("fill-opacity", 0)
    //   .attr("cursor", "ew-resize")
    //   .call(dragleft);

var dragbarleft = newg.append("rect")
      .attr("x", function(d) { return xvalue - (dragbarw/2); })
      .attr("y", function(d) { return yvalue + (dragbarw/2); })
      .attr("height", height - dragbarw)
    //  .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("id", "dragleft")
      .attr("width", dragbarw)
      .attr("fill", "lightblue")
      .attr("fill-opacity", 0)
      .attr("cursor", "ew-resize")
      .call(dragleft);

var dragbarright = newg.append("rect")
      .attr("x", function(d) { return xvalue + width - (dragbarw/2); })
      .attr("y", function(d) { return yvalue + (dragbarw/2); })
      .attr("id", "dragright")
      .attr("height", height - dragbarw)
   //   .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("width", dragbarw)
      .attr("fill", "lightblue")
      .attr("fill-opacity", 0)
      .attr("cursor", "ew-resize")
      .call(dragright);

var dragbartop = newg.append("rect")
      .attr("x", function(d) { return xvalue + (dragbarw/2); })
      .attr("y", function(d) { return yvalue - (dragbarw/2); })
      .attr("height", dragbarw)
      .attr("id", "dragleft")
      .attr("width", width - dragbarw)
     // .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("fill", "lightgreen")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragtop);

var dragbarbottom = newg.append("rect")
      .attr("x", function(d) { return xvalue + (dragbarw/2); })
      .attr("y", function(d) { return yvalue + height - (dragbarw/2); })
      .attr("id", "dragright")
      .attr("height", dragbarw)
      .attr("width", width - dragbarw)
  //    .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
      .attr("fill", "lightgreen")
      .attr("fill-opacity", 0)
      .attr("cursor", "ns-resize")
      .call(dragbottom);



      function dragmove(d) {
 // if (isXChecked) {
      // dragtext
      //       .attr("transform","matrix(1,0,0,1,"+d3.event.x+","+d3.event.y+")")
         // .attr("x", function(d) { return d3.event.x; })
        //  .attr("y", function(d) { return d3.event.y; });
      group
          .attr("transform","matrix(1,0,0,1,"+d3.event.x+","+d3.event.y+")")
      dragrect
          .attr("x", d.x = Math.max(0, Math.min(window.innerWidth, d3.event.x)))
        //  .attr("x", function(d) { return d.x - (dragbarw/2); })
      dragbarleft 
          .attr("x", function(d) { return d.x - (dragbarw/2); })
      dragbarright 
          .attr("x", function(d) { return d.x + width - (dragbarw/2); })
      dragbartop 
          .attr("x", function(d) { return d.x + (dragbarw/2); })
      dragbarbottom 
          .attr("x", function(d) { return d.x + (dragbarw/2); })
  // }
  // if (isYChecked) {
      dragrect
          .attr("y", d.y = Math.max(0, Math.min(window.innerHeight, d3.event.y)));
      dragbarleft 
          .attr("y", function(d) { return d.y + (dragbarw/2); });
      dragbarright 
          .attr("y", function(d) { return d.y + (dragbarw/2); });
      dragbartop 
          .attr("y", function(d) { return d.y - (dragbarw/2); });
      dragbarbottom 
          .attr("y", function(d) { return d.y + height - (dragbarw/2); });
//  }
}

function ldragresize(d) {
   if (isXChecked) {
      var oldx = d.x; 
      console.log("drag+++++++")
     //Max x on the right is x + width - dragbarw
     //Max x on the left is 0 - (dragbarw/2)
      d.x = Math.max(0, Math.min(d.x + width - (dragbarw / 2), d3.event.x)); 
      width = width + (oldx - d.x);

      dragbarleft
        .attr("x", function(d) { return d.x - (dragbarw / 2); });
       
      dragrect
        .attr("x", function(d) { return d.x; })
        .attr("width", width);

      dragtext
    //  .attr("x", function(d) { return d.x; })
        .attr("width", width);//foreignobject

        d3.select("fobject1")
//         var texts = document.getElementById("textid1")
 .style("width", height)
//        texts.style("width", width);

     dragbartop 
        .attr("x", function(d) { return d.x + (dragbarw/2); })
        .attr("width", width - dragbarw)
     dragbarbottom 
        .attr("x", function(d) { return d.x + (dragbarw/2); })
        .attr("width", width - dragbarw)
  }
}

function rdragresize(d) {
   if (isXChecked) {
     //Max x on the left is x - width 
     //Max x on the right is width of screen + (dragbarw/2)
     var dragx = Math.max(d.x + (dragbarw/2), Math.min(w, d.x + width + d3.event.dx));

     //recalculate width
     width = dragx - d.x;
     //console.log(width+"current width ok")

     //move the right drag handle
     dragbarright
        .attr("x", function(d) { return dragx - (dragbarw/2) });

     //resize the drag rectangle
     //as we are only resizing from the right, the x coordinate does not need to change
     dragrect
        .attr("width", width)
        .on("dragstart", function () { 
        console.log("drag start ==========")
    })
    .on("dragend", function () { 
       console.log("drag end ======")
    });

     dragtext
        .attr("width", width);//foreignobject


        d3.select("fobject1")
//         var texts = document.getElementById("textid1")
 .style("width", height)

     dragbartop 
        .attr("width", width - dragbarw)
     dragbarbottom 
        .attr("width", width - dragbarw)
  }
}

function tdragresize(d) {
 
   if (isYChecked) {
      var oldy = d.y; 
     //Max x on the right is x + width - dragbarw
     //Max x on the left is 0 - (dragbarw/2)
      d.y = Math.max(0, Math.min(d.y + height - (dragbarw / 2), d3.event.y)); 
      height = height + (oldy - d.y);
      dragbartop
        .attr("y", function(d) { return d.y - (dragbarw / 2); });
       
      dragrect
        .attr("y", function(d) { return d.y; })
        .attr("height", height);

      dragbarleft 
        .attr("y", function(d) { return d.y + (dragbarw/2); })
        .attr("height", height - dragbarw);
      dragbarright 
        .attr("y", function(d) { return d.y + (dragbarw/2); })
        .attr("height", height - dragbarw);
  }
}

function bdragresize(d) {
   if (isYChecked) {
     //Max x on the left is x - width 
     //Max x on the right is width of screen + (dragbarw/2)
     var dragy = Math.max(d.y + (dragbarw/2), Math.min(h, d.y + height + d3.event.dy));

     //recalculate width
     height = dragy - d.y;

     //move the right drag handle
     dragbarbottom
        .attr("y", function(d) { return dragy - (dragbarw/2) });

     //resize the drag rectangle
     //as we are only resizing from the right, the x coordinate does not need to change
     dragrect
        .attr("height", height);
     dragbarleft 
        .attr("height", height - dragbarw);
     dragbarright 
        .attr("height", height - dragbarw);
  }
}

        

 }

 