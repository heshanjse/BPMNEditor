"use strict";
var flowcreator = function (eid) {
    if (eid === null || eid == undefined) {
        eid = 'flow'+(++idflow);
        FlowEngine.resolveFlowGlobals();
    }

    var dragger = d3.drag()
    .on('drag', handleDrag)
    .on('end', function () {
        dragging = false;
    });
    var sampleSVGflow = sampleSVG.append('g')
                        .attr("id", "group"+eid);
    
        sampleSVG.append("marker")
                        .attr("id", "triangle"+idflow)
                        .attr("viewBox", "0 0 10 10")
                        .attr("refX", "10")
                        .attr("refY", "5")
                        .attr("markerUnits", "strokeWidth")
                        .attr("markerWidth", "5")
                        .attr("markerHeight", "4")
                        .attr("orient", "auto")
                        .append('svg:path')
                        .attr('d', 'M 0 0 L 10 5 L 0 10 z');


                    var isVA = (flowPortASide === 'top' || flowPortASide === 'bottom');
                    var isVB = (flowPortBSide === 'top' || flowPortBSide === 'bottom');
                    var _pts, h2x, h2y, h3x, h3y;
                    if (!isVA && !isVB) {
                        // HH: horizontal exit → horizontal entry
                        _pts = startx+","+starty+","+midx+","+starty+","+midx+","+endy+","+endx+","+endy;
                        h2x = midx;   h2y = starty; h3x = midx;  h3y = endy;
                    } else if (isVA && isVB) {
                        // VV: vertical exit → vertical entry
                        _pts = startx+","+starty+","+startx+","+midy+","+endx+","+midy+","+endx+","+endy;
                        h2x = startx; h2y = midy;  h3x = endx;  h3y = midy;
                    } else if (!isVA && isVB) {
                        // HV: horizontal exit → vertical entry (L-shape, 1 bend)
                        _pts = startx+","+starty+","+endx+","+starty+","+endx+","+midy+","+endx+","+endy;
                        h2x = endx;   h2y = starty; h3x = endx;  h3y = midy;
                    } else {
                        // VH: vertical exit → horizontal entry (L-shape, 1 bend)
                        _pts = startx+","+starty+","+startx+","+endy+","+midx+","+endy+","+endx+","+endy;
                        h2x = startx; h2y = endy;  h3x = midx;  h3y = endy;
                    }

                    sampleSVGflow.append("polyline")      // attach a polyline
                       .attr("id", eid)
                       .attr("marker-end", "url(#triangle"+idflow+")")
                       .attr("x", h2x)
                        .attr("y", h2y)
                        .style("stroke", "black")  // colour the line
                        .style("fill", "none")     // remove any fill colour
                        .style("stroke-width", "2")
                        .attr("points", _pts)
                        .on("pointerup", function () {
                            //d3.select(this).style("fill", "aliceblue");
                            var t = d3.select(this).attr("id");
                            var circle = document.getElementById(t),
                                cx = +circle.getAttribute('x'),
                                cy = +circle.getAttribute('y'),
                                ctm = circle.getCTM(),
                                coords = getScreenCoords(cx, cy, ctm);

                            tooltipDiv.style("pointer-events", "all")
                                .transition()
                                .duration(200)
                                .style("opacity", 1.9);

                            tooltipDiv.html(buildTooltipHTML({ showArrow: false }))
                                .style("left", coords.x  + "px")
                                .style("top", coords.y + "px");


                            tooltipDiv.select("#trash-button").on("click", function () {
                                tooltipDiv.style("pointer-events", "none").style("opacity", 0);
                                deleteElement(t);
                                sampleSVG.select("#group"+t).remove(); 
                                t=0;
                                // semodal.style.display = "block";
                            });

                            tooltipDiv.select("#property-button").on("click", function () {
                                tooltipDiv.style("opacity", 0);
                                editingElementId = t;
                                for (var i = 0; i < bpmnjson.length; i++) {
                                    if (bpmnjson[i].id === t) {
                                        document.getElementById('f-name').value = bpmnjson[i].name || '';
                                        break;
                                    }
                                }
                                fmodal.style.display = "block";
                            });
                        });

                    sampleSVGflow.append('circle')
                    .attr("id", eid)
                    .attr('cx', startx)
                    .attr('cy', starty)
                    .attr('r', 4)
                    .attr('stroke', '#ffffff')
                    .attr('is-handle', 'true')
                    .style("cursor", "move")
                    .style('opacity',0)
                    .call(dragger);

                    sampleSVGflow.append('circle')
                    .attr("id", eid)
                    .attr('cx', h2x)
                    .attr('cy', h2y)
                    .attr('r', 4)
                    .attr('stroke', '#000')
                    .attr('is-handle', 'true')
                    .style("cursor", "move")
                    .call(dragger);

                    sampleSVGflow.append('circle')
                    .attr("id", eid)
                    .attr('cx', h3x)
                    .attr('cy', h3y)
                    .attr('r', 4)
                    .attr('stroke', '#000')
                    .attr('is-handle', 'true')
                    .style("cursor", "move")
                    .call(dragger);

                    sampleSVGflow.append('circle')
                    .attr("id", eid)
                    .attr('cx', endx)
                    .attr('cy', endy)
                    .attr('r', 4)
                    .attr('stroke', '#ffffff')
                    .attr('is-handle', 'true')
                    .style("cursor", "move")
                    .style('opacity',0)
                    .call(dragger);

                    
                    FlowBPMNJsonCreator(eid,"flow", startid, endid, startx, starty,endx,endy,midx,starttype,endtype,flowPortASide,flowPortBSide);

                    starttype= "";
                    endtype = "";
                    startx = 0;
                    starty = 0;
                    endx = 0;
                    endy = 0;
                    startid =0;
                    endid =0;
                    midx =0;
                    midy =0;
                    flowPortASide = "";
                    flowPortBSide = "";
                    points.splice(0);
                    drawing = false;

 }

 function handleDrag(event) {
    if (drawing) return;
    var dragCircle = d3.select(this), newPoints = [];
    dragging = true;
    var poly    = d3.select(this.parentNode).select('polyline');
    var circles = d3.select(this.parentNode).selectAll('circle');
    dragCircle
        .attr('cx', event.x)
        .attr('cy', event.y);
    circles.each(function () {
        var c = d3.select(this);
        newPoints.push([c.attr('cx'), c.attr('cy')]);
    });
    poly.attr('points', newPoints);
}

