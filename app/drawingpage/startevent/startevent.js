"use strict";
var starteventdevider = function (subElement,svg){  
var group = svg.append('g')
        .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
        .call(drag)
// var sampleSVG = svg;
        group.append('circle')
            .attr('id', 'startEvnet' + (++idstartelement))
            .style("stroke", "black")
            .style("stroke-width", "2")
            .style("fill", "white")
         //   .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY + ')')
            .attr('r', '20')
            .on("mouseover", function () {
                d3.select(this).style("fill", "aliceblue");
            })
            .on("mouseup", function () {
                d3.select(this).style("fill", "aliceblue");
                var t = d3.select(this).attr("id");

                function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
                }

                var circle = document.getElementById(t),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);
                console.log(coords.x, coords.y);

                tooltipDiv.transition()
                    .duration(200)
                    .style("opacity", 1.9);

                tooltipDiv.html("<input id=" + "trash-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/trash-icon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >"+"&nbsp"+"<input id=" + "arrow-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/arrow.png" + " alt=" + "arrow" + " style=" + "width:25px;" + " >" + "<br>" + "<input id=" + "property-button" + " type=" + "image" + " title=" + "End Event" + " src=" + "img/settingsicon.png" + " alt=" + "trash" + " style=" + "width:25px;" + " >")
                    .style("left", coords.x + 20 + "px")
                    .style("top", (coords.y - 20) + "px");


                tooltipDiv.select("#trash-button").on("click", function () {
                    deleteElement(t);
                    console.log("t click")
                    // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end evnt button clicked ")
                    semodal.style.display = "block";
                });
                tooltipDiv.select("#arrow-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    console.log("end arrow button clicked ")
                    starttype = "startEvent";
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

                d3.select(this).style("fill", "white");
                var t = d3.select(this).attr("id");
                
                function getScreenCoords(x, y, ctm) {
                    var xn = ctm.e + x * ctm.a + y * ctm.c;
                    var yn = ctm.f + x * ctm.b + y * ctm.d;
                    return {x: xn, y: yn};
                }

                var circle = document.getElementById(t),
                    cx = +circle.getAttribute('cx'),
                    cy = +circle.getAttribute('cy'),
                    ctm = circle.getCTM(),
                    coords = getScreenCoords(cx, cy, ctm);

                if (window.bpmnElement === "flow") {
                    starttype = "startEvent";
                    startid =t;
                    startx = coords.x;
                    starty = coords.y;
                    window.bpmnElement = "flowselect";
                    document.body.style.cursor = "e-resize";
                    console.log("ok1")
                    console.log(startx)
                    console.log(starty)
                }


            })
          //  .call(drag);
           if (subElement === "normal") {
           		subElement = null;
           }else if (subElement === "time") {
            	subElement = null;
            	group.append('path')
        .attr("d","M15,5L15,8M20,6L18.5,9M24,10L21,11.5M25,15L22,15M24,20L21,18.5M20,24L18.5,21M15,25L15,22M10,24L11.5,21M6,20L9,18.5M5,15L8,15M6,10L9,11.5M10,6L11.5,9M17,8L15,15L19,15")   
     	.attr("stroke-width","1.5")
     	.attr("stroke-linecap","round")
     	.attr("stroke-linejoin","round")
     	.attr("transform","matrix(1,0,0,1,5,5)")
     	.style("-webkit-tap-highlight-color","rgba(0, 0, 0, 0)")
     	.style("stroke-linecap","round")
     	.style("stroke-linejoin","round")
     	.style("stroke-opacity","1")

     	// -webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;
           }else if (subElement === "message") {
           	subElement = null;
           	    group.append('path')
           	    .attr("fill","#ffffff")
           	    .attr("stroke","#808080")
       // .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
        .attr("d","M7,10L7,20L23,20L23,10ZM7,10L15,16L23,10")   
        .attr("stroke-width","1.6")
     	.attr("stroke-linecap","round")
     	.attr("stroke-linejoin","round")
     	.attr("stroke-opacity","1")
     	.attr("transform","matrix(1.4375,0,0,1.4375,-20.9375,-20.9375)")
     	
     
           }else if (subElement === "error") {
           	subElement = null;

           }
        //     group.append('path')
        // .attr("d","m 12.8,12 5.942857142857143,7.771428571428571 -5.942857142857143,7.771428571428571,2.742857142857143,0 4.571428571428571,-5.971382857142857 4.571428571428571,5.971382857142857,2.742857142857143,0 -5.942857142857143,-7.771428571428571 5.942857142857143,-7.771428571428571,-2.742857142857143,0 -4.571428571428571,5.971382857142857 -4.571428571428571,-5.971382857142857,-2.742857142857143,0 z")   
     

            EventBPMNJsonCreator('startEvnet'+idstartelement, d3.event.pageX, d3.event.pageY, 20, 20,"startEvnet");

 }

