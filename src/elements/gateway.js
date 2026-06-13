"use strict";
var gatewaydevider = function (eid,subElement,svg,xvalue,yvalue){  
var g2 = svg.append('g')
        .attr('transform', 'translate(' + xvalue + ',' + yvalue + ')')
        .attr('id', 'gateway' + (++idgatewayelement))
        .call(drag);

    var bgDiamond = g2.append('rect')
        .attr("width", 42.8)
        .attr("height", 42.8)
        .attr("transform", "matrix(0.7,0.7,-0.7,0.7,0,0)")
        .style("fill", "white")
        .style("stroke", "none")
        .attr("pointer-events", "none");

      //
                    //.attr("transform", "matrix(0.7,0.7,-0.7,0.7," + d3.event.pageX + "," + d3.event.pageY + ")")

        if (subElement === "exclusive") {
                
                  g2.append('path')
        .attr("d","m 12.8,12 5.942857142857143,7.771428571428571 -5.942857142857143,7.771428571428571,2.742857142857143,0 4.571428571428571,-5.971382857142857 4.571428571428571,5.971382857142857,2.742857142857143,0 -5.942857142857143,-7.771428571428571 5.942857142857143,-7.771428571428571,-2.742857142857143,0 -4.571428571428571,5.971382857142857 -4.571428571428571,-5.971382857142857,-2.742857142857143,0 z")   
        .attr("transform","matrix(1.4375,0,0,1.4375,-28.9375,1.9375)")
          // .call(drag) ;

           }else if (subElement === "parallel") {


                g2.append('path')
        .attr("d","M11.25,20.5L30.25,20.5M20.5,11.25L20.5,30.25")   
        .attr("stroke-width", "4")
        .attr("fill", "none")
        .attr("stroke", "#808080")   
        .attr("transform","matrix(1,0,0,1,-21,9)")

                
           }else if (subElement === "inclusive") {

              g2.append('circle')
        .attr("r","12.428571428571429")   
        .attr("stroke-width", "4")
        .attr("fill", "none")
        .attr("stroke", "#808080")   
        .attr("cx", "0")
        .attr("cy", "30")   
        // .attr("transform","matrix(1,0,0,1,-21,9)")
     
           }else if (subElement === "event") {

            g2.append('circle')
        .attr("r","14.428571428571429")   
        .attr("stroke-width", "1")
        .attr("fill", "none")
        .attr("stroke", "#808080")   
        .attr("cx", "0")
        .attr("cy", "30"); 

        g2.append('circle')
        .attr("r","12.428571428571429")   
        .attr("stroke-width", "1")
        .attr("fill", "none")
        .attr("stroke", "#808080")   
        .attr("cx", "0")
        .attr("cy", "30"); 

        g2.append('path')
        .attr("d","M24.827514,26.844972L15.759248000000001,26.844216L12.957720300000002,18.219549L20.294545,12.889969L27.630481000000003,18.220774L24.827514,26.844972Z")   
        .attr("stroke-width", "1.5")
        .attr("fill", "none")
        .attr("stroke", "#808080")   
        .attr("transform","matrix(1,0,0,1,-20,9)")

           }

         g2.append('rect')
            .attr('id', 'gateway' + idgatewayelement)
            .style("stroke", "black")
            .style("stroke-width", "2")
            .style("stroke-linecap", "butt")
            .style("stroke-linejoin", "miter")
            .style("stroke-miterlimit", "2")
            .style("stroke-dashoffset", "0")
            .style("fill-opacity", "0")
            .attr("ry", 0)
            .attr("width", 42.8)
            .attr("height", 42.8)
           .attr("transform", "matrix(0.7,0.7,-0.7,0.7,0,0)")
            .on("mouseover", function () {
                bgDiamond.style("fill", "aliceblue");
            })
            .on("pointerup", function () {
                bgDiamond.style("fill", "aliceblue");
                var t = d3.select(this).attr("id");

                var circle = document.getElementById(t),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);

                tooltipDiv.style("pointer-events", "all")
                    .transition()
                    .duration(200)
                    .style("opacity", 1.9);

                tooltipDiv.html(buildTooltipHTML({ showArrow: true }))
                    .style("left", coords.x + 30 + "px")
                    .style("top", (coords.y + 10) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    deleteElement(t);
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    editingElementId = t;
                    for (var i = 0; i < bpmnjson.length; i++) {
                        if (bpmnjson[i].id === t) {
                            document.getElementById('g-name').value = bpmnjson[i].name || '';
                            break;
                        }
                    }
                    gmodal.style.display = "block";
                });
                tooltipDiv.select("#arrow-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    var canvasCoords = getCanvasCoords(cx, cy, ctm);
                    starttype = "gateway";
                    startid =t;
                    startx = canvasCoords.x;
                    starty = canvasCoords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";

                });
            })
            .on("mouseout", function () {
                bgDiamond.style("fill", "white");
                tooltipDiv.transition()
                    .duration(3200)
                    .style("opacity", 0)
                    .on("end", function () {
                        tooltipDiv.style("pointer-events", "none");
                    });
            })
            .on("click", function () {
                // gmodal.style.display = "block";
                bgDiamond.style("fill", "white");
                var t = d3.select(this).attr("id");

                var circle = document.getElementById(t),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);

                if (window.bpmnElement === "flow") {
                    var canvasCoords = getCanvasCoords(cx, cy, ctm);
                    starttype = "gateway";
                    startid = t;
                    startx = canvasCoords.x;
                    starty = canvasCoords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";
                } else if (window.bpmnElement === "flowselect") {
                    endtype = "gateway";
                    endid = t;
                    window.bpmnElement = null;
                    flowcreator(null);
                }
            })
         //   .call(drags)

          
              if (eid === null) {
                eid ='gateway'+idgatewayelement;
            }

              EventBPMNJsonCreator(eid, xvalue, yvalue, 120, 80,"gateway",subElement);
              subElement = null;

 }

