"use strict";
var taskdevider = function (eid, subElement, svg, xvalue, yvalue) {
    ++idtaskelement;

    var w = window.innerWidth,
        h = window.innerHeight;

    var isXChecked = true,
        isYChecked = true;

    var width    = 120,
        height   = 80,
        dragbarw = 20;

    // ── Shared drag helpers (hoisted via function declarations) ──────────────

    // Collect all flows connected to elementId into dragFlows, remove their SVG.
    function collectConnectedFlows(elementId) {
        for (var i = 0; i < bpmnjson.length; i++) {
            var bpmnobject = bpmnjson[i];
            if (bpmnobject.start_id === elementId && bpmnobject.id != 0) {
                dragFlows.push({
                    "id":         bpmnobject.id,
                    "start_id":   bpmnobject.start_id,
                    "end_id":     bpmnobject.end_id,
                    "start_x":    bpmnobject.start_x,
                    "start_y":    bpmnobject.start_y,
                    "end_x":      bpmnobject.end_x,
                    "end_y":      bpmnobject.end_y,
                    "mid_x":      bpmnobject.mid_x,
                    "start_type": bpmnobject.start_type,
                    "end_type":   bpmnobject.end_type,
                    "connection": "start"
                });
                sampleSVG.select("#group" + bpmnobject.id).remove();
                bpmnobject.id = 0;
            } else if (bpmnobject.end_id === elementId && bpmnobject.id != 0) {
                dragFlows.push({
                    "id":         bpmnobject.id,
                    "start_id":   bpmnobject.start_id,
                    "end_id":     bpmnobject.end_id,
                    "start_x":    bpmnobject.start_x,
                    "start_y":    bpmnobject.start_y,
                    "end_x":      bpmnobject.end_x,
                    "end_y":      bpmnobject.end_y,
                    "mid_x":      bpmnobject.mid_x,
                    "start_type": bpmnobject.start_type,
                    "end_type":   bpmnobject.end_type,
                    "connection": "end"
                });
                sampleSVG.select("#group" + bpmnobject.id).remove();
                bpmnobject.id = 0;
            }
        }
    }

    function reconnectTaskFlows() {
        FlowEngine.reconnectFlows();
    }


    // ── Drag behavior: move entire task ──────────────────────────────────────
    var drag = d3.drag()
        .on("drag", dragmove)
        .on("start", function () {
            var elementid = d3.select(this).attr("id");
            idelement = elementid;
            collectConnectedFlows(elementid);
        })
        .on("end", function () {
            var circle = document.getElementById(idelement),
                cx     = circle.getAttribute('x'),
                cy     = circle.getAttribute('y'),
                ctm    = circle.getCTM(),
                coords = getCanvasCoords(cx, cy, ctm);

            for (var i = 0; i < bpmnjson.length; i++) {
                if (bpmnjson[i].id === idelement) {
                    bpmnjson[i].x = coords.x;
                    bpmnjson[i].y = coords.y;
                    break;
                }
            }
            idelement = 0;
            reconnectTaskFlows();
        });

    // ── Drag behavior: resize from right edge ─────────────────────────────────
    var dragright = d3.drag()
        .on("start", function () {
            collectConnectedFlows(d3.select(this).attr("id"));
        })
        .on("end", function () {
            reconnectTaskFlows();
        })
        .on("drag", rdragresize);

    // ── Resize drag behaviors (no flow reconnect needed) ─────────────────────
    var dragleft   = d3.drag().on("drag", ldragresize);
    var dragtop    = d3.drag().on("drag", tdragresize);
    var dragbottom = d3.drag().on("drag", bdragresize);


    // ── SVG element creation ─────────────────────────────────────────────────
    var newg = svg.append("g")
        .data([{x: xvalue, y: yvalue}]);

    var bgRect = newg.append("rect")
        .attr("x", xvalue)
        .attr("y", yvalue)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 10)
        .attr("ry", 10)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "2")
        .attr("pointer-events", "none");

    var group = newg.append('g')
        .attr("transform", "matrix(1,0,0,1," + xvalue + "," + yvalue + ")")
        .attr('id', 'icontask' + idtaskelement)
        .attr("width",  width)
        .attr("height", height)
        .call(drag);

    if (subElement === "UserTask") {
        var dragtext = group.append('foreignObject')
            .attr('id', 'fobject' + idtaskelement)
            .attr("x", function (d) { return 20; })
            .attr("y", function (d) { return 30; })
            .attr('width', width - 40)
            .attr('height', height - 30)
            .html("<div id=\"textidtask" + idtaskelement + "\"; style=\"width: 80%; height:45px ; background-color: transparent;\" >User Task</div>");

        group.append('path')
            .attr("d", "m 15,12 c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5")
            .attr("fill", "none").attr("stroke", "#000000");
        group.append('path')
            .attr("d", "m 15,12 m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005")
            .attr("fill", "none").attr("stroke", "#000000");
        group.append('path')
            .attr("d", "m 15,12 m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z")
            .attr("fill", "#000000").attr("stroke", "#000000");

    } else if (subElement === "ScriptTask") {
        var dragtext = group.append('foreignObject')
            .attr("x", function (d) { return 20; })
            .attr("y", function (d) { return 30; })
            .attr('width', 80).attr('height', 50)
            .append("xhtml:body")
            .html("<div id=\"textidtask" + idtaskelement + "\"; style=\"width: 70px; height:45px ; background-color: transparent;\" >Script Task</div>");

        group.append('path')
            .attr("d", "m 15,20 c 9.966553,-6.27276 -8.000926,-7.91932 2.968968,-14.938 l -8.802728,0 c -10.969894,7.01868 6.997585,8.66524 -2.968967,14.938 z m -7,-12 l 5,0 m -4.5,3 l 4.5,0 m -3,3 l 5,0m -4,3 l 5,0")
            .attr("fill", "none").attr("stroke", "#000000");

    } else if (subElement === "MailTask") {
        var dragtext = group.append('foreignObject')
            .attr("x", function (d) { return 20; })
            .attr("y", function (d) { return 30; })
            .attr('width', 80).attr('height', 50)
            .append("xhtml:body")
            .html("<div id=\"textidtask" + idtaskelement + "\"; style=\"width: 70px; height:45px ; background-color: transparent;\" >Mail Task</div>");

        group.append('path')
            .attr("d", "m 5.984999999999999,4.997999999999999 l 0,14 l 21,0 l 0,-14 z l 10.5,6 l 10.5,-6")
            .attr("fill", "#000000").attr("stroke", "#ffffff");

    } else if (subElement === "ManualTask") {
        var dragtext = group.append('foreignObject')
            .attr("x", function (d) { return 20; })
            .attr("y", function (d) { return 30; })
            .attr('width', 80).attr('height', 50)
            .append("xhtml:body")
            .html("<div id=\"textidtask" + idtaskelement + "\"; style=\"width: 70px; height:45px ; background-color: transparent;\" >Manual Task</div>");

        group.append('path')
            .attr("d", "m 17,15 c 0.234,-0.01 5.604,0.008 8.029,0.004 0.808,0 1.271,-0.172 1.417,-0.752 0.227,-0.898 -0.334,-1.314 -1.338,-1.316 -2.467,-0.01 -7.886,-0.004 -8.108,-0.004 -0.014,-0.079 0.016,-0.533 0,-0.61 0.195,-0.042 8.507,0.006 9.616,0.002 0.877,-0.007 1.35,-0.438 1.353,-1.208 0.003,-0.768 -0.479,-1.09 -1.35,-1.091 -2.968,-0.002 -9.619,-0.013 -9.619,-0.013 v -0.591 c 0,0 5.052,-0.016 7.225,-0.016 0.888,-0.002 1.354,-0.416 1.351,-1.193 -0.006,-0.761 -0.492,-1.196 -1.361,-1.196 -3.473,-0.005 -10.86,-0.003 -11.0829995,-0.003 -0.022,-0.047 -0.045,-0.094 -0.069,-0.139 0.3939995,-0.319 2.0409995,-1.626 2.4149995,-2.017 0.469,-0.4870005 0.519,-1.1650005 0.162,-1.6040005 -0.414,-0.511 -0.973,-0.5 -1.48,-0.236 -1.4609995,0.764 -6.5999995,3.6430005 -7.7329995,4.2710005 -0.9,0.499 -1.516,1.253 -1.882,2.19 -0.37000002,0.95 -0.17,2.01 -0.166,2.979 0.004,0.718 -0.27300002,1.345 -0.055,2.063 0.629,2.087 2.425,3.312 4.859,3.318 4.6179995,0.014 9.2379995,-0.139 13.8569995,-0.158 0.755,-0.004 1.171,-0.301 1.182,-1.033 0.012,-0.754 -0.423,-0.969 -1.183,-0.973 -1.778,-0.01 -5.824,-0.004 -6.04,-0.004 10e-4,-0.084 0.003,-0.586 10e-4,-0.67 z")
            .attr("fill", "none").attr("stroke", "#000000");
    }

    var dragrect = newg.append("rect")
        .attr('class', 'square')
        .attr('id', 'task' + idtaskelement)
        .style("stroke", "none")
        .attr("x", function (d) { return xvalue; })
        .attr("y", function (d) { return yvalue; })
        .style("stroke-width", "2")
        .style("fill-opacity", "0")
        .attr("cursor", "move")
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 120)
        .attr("height", 80)
        .on("mouseover", function () {
            bgRect.style("fill", "aliceblue");
        })
        .on("pointerup", function () {
            bgRect.style("fill", "aliceblue");
            var t = d3.select(this).attr("id");

            var circle = document.getElementById(t),
                cx     = circle.getAttribute('x'),
                cy     = circle.getAttribute('y'),
                ctm    = circle.getCTM(),
                coords = getScreenCoords(cx, cy, ctm);

            tooltipDiv.style("pointer-events", "all")
                .transition()
                .duration(200)
                .style("opacity", 1.9);

            tooltipDiv.html(buildTooltipHTML({ showArrow: true, showText: true }))
                .style("left", coords.x + width + 10 + "px")
                .style("top",  coords.y + 15 + "px");

            tooltipDiv.select("#trash-button").on("click", function () {
                tooltipDiv.style("opacity", 0);
                var el = document.getElementById(t);
                var wrapper = el ? el.parentNode : null;
                deleteElement(t);
                if (wrapper) { d3.select(wrapper).remove(); }
            });
            tooltipDiv.select("#property-button").on("click", function () {
                tooltipDiv.style("opacity", 0);
                editingElementId = t;
                for (var i = 0; i < bpmnjson.length; i++) {
                    if (bpmnjson[i].id === t) {
                        document.getElementById('t-name').value = bpmnjson[i].name || '';
                        document.getElementById('t-assignee').value = bpmnjson[i].assignee || '';
                        break;
                    }
                }
                tmodal.style.display = "block";
            });
            tooltipDiv.select("#text-button").on("click", function () {
                tooltipDiv.style("opacity", 0);
                var element = document.getElementById('edittext');
                element.style.width   = width  + "px";
                element.style.height  = height + "px";
                element.style.display = "block";
                element.style.left    = coords.x + "px";
                element.style.top     = coords.y + "px";
                element.value         = document.getElementById("textid" + t).innerHTML;
                window.selectedtextid = "textid" + t;
            });
            tooltipDiv.select("#arrow-button").on("click", function () {
                tooltipDiv.style("opacity", 0);
                var canvasCoords = getCanvasCoords(cx, cy, ctm);
                starttype             = "task";
                startid               = t;
                startx                = canvasCoords.x;
                starty                = canvasCoords.y;
                taskwidth             = width;
                window.bpmnElement    = "flowselect";
                document.body.style.cursor = "e-resize";
            });
        })
        .on("mouseout", function () {
            bgRect.style("fill", "white");
            tooltipDiv.transition()
                .duration(3200)
                .style("opacity", 0)
                .on("end", function () {
                    tooltipDiv.style("pointer-events", "none");
                });
        })
        .on("click", function () {
            bgRect.style("fill", "white");
            var t = d3.select(this).attr("id");

            var circle = document.getElementById(t),
                cx     = +circle.getAttribute('x'),
                cy     = +circle.getAttribute('y'),
                ctm    = circle.getCTM(),
                coords = getScreenCoords(cx, cy, ctm);

            if (window.bpmnElement === "flow") {
                var canvasCoords = getCanvasCoords(cx, cy, ctm);
                starttype          = "task";
                startid            = t;
                startx             = canvasCoords.x;
                starty             = canvasCoords.y;
                window.bpmnElement = "flowselect";
                document.body.style.cursor = "e-resize";

            } else if (window.bpmnElement === "flowselect") {
                endtype            = "task";
                endid              = t;
                window.bpmnElement = null;
                flowcreator(null);
                taskwidth = 0;
            }
        })
        .call(drag);

    if (eid === null) {
        eid = 'task' + idtaskelement;
    }
    TaskBPMNJsonCreator(eid, xvalue, yvalue, width, height, "task", subElement);
    subElement = null;


    // ── Resize drag handles ───────────────────────────────────────────────────
    var dragbarleft = newg.append("rect")
        .attr("x", function (d) { return xvalue - (dragbarw / 2); })
        .attr("y", function (d) { return yvalue + (dragbarw / 2); })
        .attr("height", height - dragbarw)
        .attr("id", "dragleft")
        .attr("width", dragbarw)
        .attr("fill", "lightblue")
        .attr("fill-opacity", 0)
        .attr("cursor", "ew-resize")
        .call(dragleft);

    var dragbarright = newg.append("rect")
        .attr("x", function (d) { return xvalue + width - (dragbarw / 2); })
        .attr("y", function (d) { return yvalue + (dragbarw / 2); })
        .attr("id", "dragright")
        .attr("height", height - dragbarw)
        .attr("width", dragbarw)
        .attr("fill", "lightblue")
        .attr("fill-opacity", 0)
        .attr("cursor", "ew-resize")
        .call(dragright);

    var dragbartop = newg.append("rect")
        .attr("x", function (d) { return xvalue + (dragbarw / 2); })
        .attr("y", function (d) { return yvalue - (dragbarw / 2); })
        .attr("height", dragbarw)
        .attr("id", "dragleft")
        .attr("width", width - dragbarw)
        .attr("fill", "lightgreen")
        .attr("fill-opacity", 0)
        .attr("cursor", "ns-resize")
        .call(dragtop);

    var dragbarbottom = newg.append("rect")
        .attr("x", function (d) { return xvalue + (dragbarw / 2); })
        .attr("y", function (d) { return yvalue + height - (dragbarw / 2); })
        .attr("id", "dragright")
        .attr("height", dragbarw)
        .attr("width", width - dragbarw)
        .attr("fill", "lightgreen")
        .attr("fill-opacity", 0)
        .attr("cursor", "ns-resize")
        .call(dragbottom);


    // ── Local drag/resize functions ───────────────────────────────────────────

    function dragmove(event, d) {
        group
            .attr("transform", "matrix(1,0,0,1," + event.x + "," + event.y + ")");
        dragrect
            .attr("x", d.x = Math.max(0, Math.min(window.innerWidth, event.x)));
        dragbarleft
            .attr("x", function (d) { return d.x - (dragbarw / 2); });
        dragbarright
            .attr("x", function (d) { return d.x + width - (dragbarw / 2); });
        dragbartop
            .attr("x", function (d) { return d.x + (dragbarw / 2); });
        dragbarbottom
            .attr("x", function (d) { return d.x + (dragbarw / 2); });
        dragrect
            .attr("y", d.y = Math.max(0, Math.min(window.innerHeight, event.y)));
        dragbarleft
            .attr("y", function (d) { return d.y + (dragbarw / 2); });
        dragbarright
            .attr("y", function (d) { return d.y + (dragbarw / 2); });
        dragbartop
            .attr("y", function (d) { return d.y - (dragbarw / 2); });
        dragbarbottom
            .attr("y", function (d) { return d.y + height - (dragbarw / 2); });
        bgRect.attr("x", d.x).attr("y", d.y);
    }

    function ldragresize(event, d) {
        if (isXChecked) {
            var oldx = d.x;
            d.x   = Math.max(0, Math.min(d.x + width - (dragbarw / 2), event.x));
            width = width + (oldx - d.x);
            dragbarleft.attr("x", function (d) { return d.x - (dragbarw / 2); });
            dragrect.attr("x", function (d) { return d.x; }).attr("width", width);
            dragtext.attr("width", width);
            dragbartop.attr("x",    function (d) { return d.x + (dragbarw / 2); }).attr("width", width - dragbarw);
            dragbarbottom.attr("x", function (d) { return d.x + (dragbarw / 2); }).attr("width", width - dragbarw);
            bgRect.attr("x", d.x).attr("width", width);
        }
    }

    function rdragresize(event, d) {
        if (isXChecked) {
            var dragx = Math.max(d.x + (dragbarw / 2), Math.min(w, d.x + width + event.dx));
            width = dragx - d.x;
            dragbarright.attr("x", function (d) { return dragx - (dragbarw / 2); });
            dragrect.attr("width", width);
            dragtext.attr("width", width);
            dragbartop.attr("width",    width - dragbarw);
            dragbarbottom.attr("width", width - dragbarw);
            bgRect.attr("width", width);
        }
    }

    function tdragresize(event, d) {
        if (isYChecked) {
            var oldy = d.y;
            d.y    = Math.max(0, Math.min(d.y + height - (dragbarw / 2), event.y));
            height = height + (oldy - d.y);
            dragbartop.attr("y", function (d) { return d.y - (dragbarw / 2); });
            dragrect.attr("y", function (d) { return d.y; }).attr("height", height);
            dragbarleft.attr("y",  function (d) { return d.y + (dragbarw / 2); }).attr("height", height - dragbarw);
            dragbarright.attr("y", function (d) { return d.y + (dragbarw / 2); }).attr("height", height - dragbarw);
            bgRect.attr("y", d.y).attr("height", height);
        }
    }

    function bdragresize(event, d) {
        if (isYChecked) {
            var dragy = Math.max(d.y + (dragbarw / 2), Math.min(h, d.y + height + event.dy));
            height = dragy - d.y;
            dragbarbottom.attr("y", function (d) { return dragy - (dragbarw / 2); });
            dragrect.attr("height", height);
            dragbarleft.attr("height",  height - dragbarw);
            dragbarright.attr("height", height - dragbarw);
            bgRect.attr("height", height);
        }
    }
};
