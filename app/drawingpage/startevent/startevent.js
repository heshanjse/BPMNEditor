"use strict";
var starteventdevider = function (subElement,svg,xvalue,yvalue){  
var group = svg.append('g')
        .attr('transform', 'translate(' + xvalue + ',' + yvalue + ')')
        .attr('id', 'startEvnet' + (++idstartelement))
        .call(drag)
// var sampleSVG = svg;
         if (subElement === "startEvent") {
           //     subElement = null;
           }else if (subElement === "TimeStartEvent") {
         //       subElement = null;

                group.append('circle')
        .attr("fill","#ffffff")
                .attr("stroke","#808080")
       // .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
        .attr("r","9")   
        .attr("stroke-width","1.5")
        .attr("stroke-linecap","round")
        .attr("stroke-linejoin","round")
        .attr("stroke-opacity","1")
        .attr("transform","matrix(1.6,0,0,1.6,0,0)")


                group.append('path')
        .attr("fill","#ffffff")
                .attr("stroke","#808080")
       // .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
        .attr("d","M15,5L15,8M20,6L18.5,9M24,10L21,11.5M25,15L22,15M24,20L21,18.5M20,24L18.5,21M15,25L15,22M10,24L11.5,21M6,20L9,18.5M5,15L8,15M6,10L9,11.5M10,6L11.5,9M17,8L15,15L19,15")   
        .attr("stroke-width","1.5")
        .attr("stroke-linecap","round")
        .attr("stroke-linejoin","round")
        .attr("stroke-opacity","1")
        .attr("transform","matrix(1.2,0,0,1.2,-17.9375,-17.9375)")
        

        // -webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-opacity: 1;
           }else if (subElement === "MessageStartEvent") {
        //    subElement = null;
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
        
     
           }else if (subElement === "ErrorStartEvent") {
        //    subElement = null;
            group.append('path')
                .attr("fill","#ffffff")
                .attr("stroke","#808080")
       // .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
        .attr("d","M21.820839,10.171502L18.36734,23.58992L12.541380000000002,13.281818999999999L8.338651200000001,19.071607L12.048949000000002,5.832305699999999L17.996148000000005,15.132659L21.820839,10.171502Z")   
        .attr("stroke-width","1.6")
        .attr("stroke-linecap","round")
        .attr("stroke-linejoin","round")
        .attr("stroke-opacity","1")
        .attr("transform","matrix(1.4375,0,0,1.4375,-20.9375,-20.9375)")
        
        

           }




        group.append('circle')
            .attr('id', 'startEvnet' + idstartelement)
            .style("stroke", "black")
            .style("stroke-width", "2")
            .style("fill-opacity", "0")
           // .style("fill", "white")
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
                  //  // semodal.style.display = "block";
                });

                tooltipDiv.select("#property-button").on("click", function () {
                    tooltipDiv.style("opacity", 0);
                    for (var i = 0; i < bpmnjson.length ; i++) {
                        var element = bpmnjson[i]
                        if (element.id === t) {
                            console.log("++++++++++++++")
                            console.log(element.subtype)
                            if (element.subtype === "StartEvent") {
                                console.log("ado awa")
                            semodal.style.display = "block";
                            console.log("-----------"+subElement)
                            }else if (element.subtype === "TimeStartEvent") {
                                tsemodal.style.display = "block";
                            }else if (element.subtype === "MessageStartEvent") {
                                msemodal.style.display = "block";
                            }else if (element.subtype === "ErrorStartEvent") {
                                esemodal.style.display = "block";
                            }

                            console.log()
                        }
                    }
                    console.log("end evnt button clicked ")
                    console.log("------adoz-----"+subElement)
                    
                   // semodal.style.display = "block";
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
          
        //     group.append('path')
        // .attr("d","m 12.8,12 5.942857142857143,7.771428571428571 -5.942857142857143,7.771428571428571,2.742857142857143,0 4.571428571428571,-5.971382857142857 4.571428571428571,5.971382857142857,2.742857142857143,0 -5.942857142857143,-7.771428571428571 5.942857142857143,-7.771428571428571,-2.742857142857143,0 -4.571428571428571,5.971382857142857 -4.571428571428571,-5.971382857142857,-2.742857142857143,0 z")   
     

            EventBPMNJsonCreator('startEvnet'+idstartelement, xvalue, yvalue, 20, 20,"startEvnet",subElement);
            subElement = null;

 }

