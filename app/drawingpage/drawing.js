document.onload = (function(d3, saveAs, Blob, undefined){
  "use strict";
  //id generation numbers
  var idstartelement = 0;
  var idendelement = 0;
  var idtaskelement = 0;
  var idgatewayelement = 0;
  var idelement = 0;
  var arrowbuttonclick = 0;
  var taskbuttonclick = 0;
  var startx=0;
  var starty=0;
  var endx=0;
  var endy=0;
  var midx=0;
  
  // define graphcreator object
// var semodal = document.getElementById('SEModal');

// var sepropertyclose = document.getElementById('SEClose');
// sepropertyclose.onclick = function() {
    
//     semodal.style.display = "none";
// }
// var eemodal = document.getElementById('EEModal');
// var eepropertyclose = document.getElementById('EEClose');
// eepropertyclose.onclick = function() {
//     eemodal.style.display = "none";
    
// }
// var tmodal = document.getElementById('TModal');

// var tpropertyclose = document.getElementById('TClose');
// tpropertyclose.onclick = function() {
    
//     tmodal.style.display = "none";
// }
// var gmodal = document.getElementById('GModal');
// var gpropertycloses = document.getElementById('GClose');
// gpropertycloses.onclick = function() {
//     gmodal.style.display = "none";
    
// }





  var GraphCreator = function(svg, nodes, edges){
    var thisGraph = this;
        thisGraph.idct = 0;
        
    
    thisGraph.nodes = nodes || [];
    thisGraph.edges = edges || [];
    
    thisGraph.state = {
      selectedNode: null,
      selectedEdge: null,
      mouseDownNode: null,
      mouseDownLink: null,
      justDragged: false,
      justScaleTransGraph: false,
      lastKeyDown: -1,
      shiftNodeDrag: false,
      selectedText: null
    };
//draging code
    var drags = d3.behavior.drag()  
             .on('dragstart', function() { circle.style('fill', 'red'); })
             .on('drag', function() { circle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { circle.style('fill', 'black'); });
//
    // define arrow markers for graph links
    var defs = svg.append('svg:defs');
    defs.append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', "32")
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    // define arrow markers for leading arrow
    defs.append('svg:marker')
      .attr('id', 'mark-end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 7)
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    // Define the div for the tooltip
    var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

    thisGraph.svg = svg;
    thisGraph.svgG = svg.append("g")
          .classed(thisGraph.consts.graphClass, true);
    var svgG = thisGraph.svgG;

    // displayed when dragging between nodes
    // thisGraph.dragLine = svgG.append('svg:path')
    //       .attr('class', 'link dragline hidden')
    //       .attr('d', 'M0,0L0,0')
    //       .style('marker-end', 'url(#mark-end-arrow)');

    // svg nodes and edges 
    thisGraph.paths = svgG.append("g").selectAll("g");
    thisGraph.circles = svgG.append("g").selectAll("g");

    thisGraph.drag = d3.behavior.drag()
          .origin(function(d){
            return {x: d.x, y: d.y};
          })
          .on("drag", function(args){
            thisGraph.state.justDragged = true;
            thisGraph.dragmove.call(thisGraph, args);
          })
          .on("dragend", function() {
            // todo check if edge-mode is selected
          });

    // listen for key events
    d3.select(window).on("keydown", function(){
      thisGraph.svgKeyDown.call(thisGraph);
    })
    .on("keyup", function(){
      thisGraph.svgKeyUp.call(thisGraph);
    });
    svg.on("mousedown", function(d){thisGraph.svgMouseDown.call(thisGraph, d);});
    svg.on("mouseup", function(d){thisGraph.svgMouseUp.call(thisGraph, d);});

    // listen for dragging
    var dragSvg = d3.behavior.zoom()
          .on("zoom", function(){
            if (d3.event.sourceEvent.shiftKey){
              // TODO  the internal d3 state is still changing
              return false;
            } else{
              thisGraph.zoomed.call(thisGraph);
            }
            return true;
          })
          .on("zoomstart", function(){
            var ael = d3.select("#" + thisGraph.consts.activeEditId).node();
            if (ael){
              ael.blur();
            }
            if (!d3.event.sourceEvent.shiftKey) d3.select('body').style("cursor", "move");
          })
          .on("zoomend", function(){
            d3.select('body').style("cursor", "auto");
          });
    
    svg.call(dragSvg).on("dblclick.zoom", null);

    // listen for resize
    window.onresize = function(){thisGraph.updateWindow(svg);};

    // handle download data
    d3.select("#download-input").on("click", function(){
      var saveEdges = [];
      thisGraph.edges.forEach(function(val, i){
        saveEdges.push({source: val.source.id, target: val.target.id});
      });
      var blob = new Blob([window.JSON.stringify({"nodes": thisGraph.nodes, "edges": saveEdges})], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "mydag.json");
    });



var drag = d3.behavior.drag().on('drag', function(d) {

   dragMove(this)
 })
var drags = d3.behavior.drag().on('drag', function(d) {

   dragMoves(this)
 })



  // // passing in a function in d3.max to tell it what we're maxing (x value)
  //     var xScale = d3.scale.linear()
  //         .domain([0, d3.max(dataset, function (d) { return d.x + 10; })])
  //         .range([margin.left, w - margin.right]);  // Set margins for x specific

  //     // passing in a function in d3.max to tell it what we're maxing (y value)
  //     var yScale = d3.scale.linear()
  //         .domain([0, d3.max(dataset, function (d) { return d.y + 10; })])
  //         .range([margin.top, h - margin.bottom]);  // Set margins for y specific

  //     // Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
  //     var xAxis = d3.svg.axis().scale(xScale).orient("top");
  //     var yAxis = d3.svg.axis().scale(yScale).orient("left");

  // function handleMouseOver(d, i) {  // Add interactivity

  //           // Use D3 to select element, change color and size
  //           // d3.select(this).attr({
  //           //   fill: "orange",
  //           //   r: radius * 2
  //           // });

  //           // Specify where to put label of text
  //           svg.append("text").attr({
  //              id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
  //               x: function() { return xScale(d.x) - 30; },
  //               y: function() { return yScale(d.y) - 15; }
  //           })
  //           .text(function() {
  //             return [d.x, d.y];  // Value of the text
  //           });
  //         }

  //     function handleMouseOut(d, i) {
  //           // Use D3 to select element, change color back to normal
  //           d3.select(this).attr({
  //             fill: "black",
  //             r: radius
  //           });

  //           // Select text by id and then remove
  //           d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
  //         }
 

 function arrowpath(sx,sy,ex,ey){
 // console.log("x:"+sx+"y:"+sy+"x:"+ex+"y:"+ey+)
 }
 function trashfuntion(){
     console.log("trash");
 }
  function dragMove(me) {
 

   var x = d3.event.x
   var y = d3.event.y

   d3.select(me).attr('transform', 'translate(' + x + ',' + y + ')')
 }
 function dragMoves(me) {
 
console.log("ok")
   var x = d3.event.x
   var y = d3.event.y

   d3.select(me).attr('transform', 'matrix(0.7,0.7,-0.7,0.7,' + x + ',' + y + ')')
 }
      d3.select("#trash-button").on("click", function(){
      console.log("trash");
    });

      d3.select("#arrow").on("click", function(){
      console.log("ok arrow");
      var sampleSVG = svg;
      sampleSVG.append('path')
      .attr('class', 'link dragline hidden')
      .attr('d', 'M0,0L0,0')
      .style('marker-end', 'url(#mark-end-arrow)');
      //The data for our line
 // var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
 //                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
 //                 { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
 
 // //This is the accessor function we talked about above
 // var lineFunction = d3.svg.line()
 //                        .x(function(d) { return d.x; })
 //                         .y(function(d) { return d.y; })
 //                         .interpolate("linear");


 //       var sampleSVG = svg;
 //    // var sampleSVG = svgG;
 //       sampleSVG.append("path")
 //       .attr("d", lineFunction(lineData))
 //      // .attr('id', 'startcricle'+idstartelement++)
 //          .style("stroke", "black")
 //          .style("stroke-width", "2")
 //        //  .attr('transform', 'translate(' + '100' + ',' + '100' + ')')
 //       //   .attr('r', '20')
 //          .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
 //          .on("mouseout", function(){d3.select(this).style("fill", "white");})
 //          .call(drag)

    });

       d3.select("#start-button").on("click", function(){
      console.log("ok circle");
      
      var sampleSVG = svg;
      sampleSVG.append('circle')
      .attr('id', 'startcricle'+idstartelement++)
      .style("stroke", "black")
      .style("stroke-width", "1.5")
      .style("fill", "white")
      .attr('transform', 'translate(' + '100' + ',' + '100' + ')')
      .attr('r', '20')
      .on("mouseover",function(d){
       var t = d3.select(this).attr("id");
       
       console.log(t)

       function getScreenCoords(x, y, ctm) {
        var xn = ctm.e + x*ctm.a + y*ctm.c;
        var yn = ctm.f + x*ctm.b + y*ctm.d;
        return { x: xn, y: yn };
      }

      var circle = document.getElementById(t),
      cx = +circle.getAttribute('cx'),
      cy = +circle.getAttribute('cy'),
      ctm = circle.getCTM(),
      coords = getScreenCoords(cx, cy, ctm);
      console.log(coords.x, coords.y);
      if(arrowbuttonclick==1){
        startx=coords.x+20;
        starty=coords.y;
        arrowbuttonclick=2;
        console.log("ok1")
      }else if (arrowbuttonclick==2) {
        endx=coords.x-20;
        endy=coords.y;

        arrowpath(startx,starty,endx,endy);
        
        midx = startx+((endx-startx)/2);
        console.log("ok2")
        console.log(startx+","+starty+","+midx+","+starty+","+midx+","+endy+","+endx+","+endy)

  sampleSVG.append("polyline")      // attach a polyline
    .style("stroke", "black")  // colour the line
    .style("fill", "none")     // remove any fill colour
    .attr("points", startx+","+starty+","+midx+","+starty+","+midx+","+endy+","+endx+","+endy); 

    startx=0;
    starty=0;
    endx=0;
    endy=0;
    arrowbuttonclick=0;
  }
})
         // .on("mouseout",handleMouseOut)
          // .on("click", function(){
          //   semodal.style.display = "block";
          // })
          .call(drag)

        });

       d3.select("#end-button").on("click", function(){
     // console.log("ok circle");
        
        var sampleSVG = svg;
        console.log("<input id="+"\"trash-button\""+" type="+"image"+" title="+"End Event"+" src="+"img/trash-icon.png"+" alt="+"trash"+" style="+"width:25px;"+" onclick="+"\"trashfuntion()\""+">")
      // var sampleSVG = svgG;
       sampleSVG.append('circle')
       .attr('id', 'endcricle'+idendelement++)
          .style("stroke", "black")
          .style("stroke-width", "4")
          .style("fill", "white")
          .attr('transform', 'translate(' + '100' + ',' + '100' + ')')
          .attr('r', '20')
          .on("mouseover", function(){
           //  // function trashfuntion(){
           //  //  // alert("Called");
           //  //   console.log ("clicked")
           //  // }
           //  window.trashfuntion =  function (){
           //  alert("Called");
           //  }


           //  var t = d3.select(this).attr("id");
           //  function getScreenCoords(x, y, ctm) {
           //    var xn = ctm.e + x*ctm.a + y*ctm.c;
           //    var yn = ctm.f + x*ctm.b + y*ctm.d;
           //    return { x: xn, y: yn };
           //  }
           //  var circle = document.getElementById(t),
           //  cx = +circle.getAttribute('cx'),
           //  cy = +circle.getAttribute('cy'),
           //  ctm = circle.getCTM(),
           //  coords = getScreenCoords(cx, cy, ctm);
           //  console.log(coords.x, coords.y);

           //  var div = d3.select("div");
           //  div.transition()    
           //  .duration(200)    
           //  .style("opacity", .9)   
           //  .style("width", 125+"px")
           //  .style("height", 125+"px"); 

           //  div.html(
           //    "<input id="+"\"trash-button\""+" type="+"image"+" title="+"End Event"+" src="+"img/trash-icon.png"+" alt="+"trash"+" style="+"width:25px;height:30px;"+">"+
           //    "<br>"+"<button"+" onclick="+"trashfuntion()"+">"+"Click Me"+"</button> ")  
           //  .style("left", (coords.x+25)+ "px")   
           //  .style("top", (coords.y-28)+ "px");  
           // // d3.select(this).style("fill", "aliceblue");
          
           // console.log("done")
                     })
          .on("mouseout", function(){d3.select(this).style("fill", "white");})
          .on("click", function(){
          //  eemodal.style.display = "block";
          
          })
          .call(drag)

    });
      
    d3.select("#task-button").on("click", function(){


      console.log("ok task");
      // Extract the click location\


      var sampleSVG = svg;
       sampleSVG.append('rect')
       .attr('id', 'task'+idtaskelement++)
          .style("stroke", "black")
          .style("stroke-width", "2")
          .style("fill", "white")
          .attr('transform', 'translate(' + d3.event.pageX + ',' + d3.event.pageY+ ')')
        .attr("rx", 10)
         .attr("ry", 10)
          .attr("width", 120)
          .attr("height", 80)
          .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");
var point = d3.mouse(this)
  , p = {mx: point[0], my: point[1] };

console.log(p.mx +"and "+ p.my);


        })
          .on("mouseout", function(){d3.select(this).style("fill", "white");})
          .on("click", function(){
            tmodal.style.display = "block";
          })
          .call(drag)
        //  dragmove(this);
    });
    d3.select("#gateway-button").on("click", function(){
      console.log("ok gatway");
      
      var sampleSVG = svg;
       sampleSVG.append('rect')
       .attr('id', 'gateway'+idgatewayelement++)
          .style("stroke", "black")
          .style("stroke-width", "3")
          .style("stroke-linecap", "butt")
          .style("stroke-linejoin", "miter")
          .style("stroke-miterlimit", "4")
          .style("stroke-dashoffset", "0")
          .style("fill", "white")
      .attr("ry", 0)
          .attr("width", 62.8)
         .attr("height", 62.8)
        .attr("transform", "matrix(0.7,0.7,-0.7,0.7,350,150)")
          .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
          .on("mouseout", function(){d3.select(this).style("fill", "white");})
          .on("click", function(){
            gmodal.style.display = "block";
          })
          .call(drags)

    });
    d3.select("#arrow-button").on("click", function(){
      console.log("arrow button click");
      arrowbuttonclick = 1;
      

    });
    
    d3.select("#upload-input").on("click", function(){
      document.getElementById("hidden-file-upload").click();
    });
    d3.select("#hidden-file-upload").on("change", function(){
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        var uploadFile = this.files[0];
        var filereader = new window.FileReader();
        
        filereader.onload = function(){
          var txtRes = filereader.result;
          // TODO better error handling
          try{
            var jsonObj = JSON.parse(txtRes);
            thisGraph.deleteGraph(true);
            thisGraph.nodes = jsonObj.nodes;
            thisGraph.setIdCt(jsonObj.nodes.length + 1);
            var newEdges = jsonObj.edges;
            newEdges.forEach(function(e, i){
              newEdges[i] = {source: thisGraph.nodes.filter(function(n){return n.id == e.source;})[0],
                          target: thisGraph.nodes.filter(function(n){return n.id == e.target;})[0]};
            });
            thisGraph.edges = newEdges;
            thisGraph.updateGraph();
          }catch(err){
            window.alert("Error parsing uploaded file\nerror message: " + err.message);
            return;
          }
        };
        filereader.readAsText(uploadFile);
        
      } else {
        alert("Your browser won't let you save this graph -- try upgrading your browser to IE 10+ or Chrome or Firefox.");
      }

    });

    // handle delete graph
    d3.select("#delete-graph").on("click", function(){
      thisGraph.deleteGraph(false);
    });
  };



  GraphCreator.prototype.setIdCt = function(idct){
    this.idct = idct;
  };

  GraphCreator.prototype.consts =  {
    selectedClass: "selected",
    connectClass: "connect-node",
    circleGClass: "conceptG",
    graphClass: "graph",
    activeEditId: "active-editing",
    BACKSPACE_KEY: 8,
    DELETE_KEY: 46,
    ENTER_KEY: 13,
    nodeRadius: 50
  };

  /* PROTOTYPE FUNCTIONS */

  GraphCreator.prototype.dragmove = function(d) {
    var thisGraph = this;
    if (thisGraph.state.shiftNodeDrag){
      thisGraph.dragLine.attr('d', 'M' + d.x + ',' + d.y + 'L' + d3.mouse(thisGraph.svgG.node())[0] + ',' + d3.mouse(this.svgG.node())[1]);
    } else{
      d.x += d3.event.dx;
      d.y +=  d3.event.dy;
      thisGraph.updateGraph();
    }
  };

  GraphCreator.prototype.deleteGraph = function(skipPrompt){
    var thisGraph = this,
        doDelete = true;
    if (!skipPrompt){
      doDelete = window.confirm("Press OK to delete this graph");
    }
    if(doDelete){
      thisGraph.nodes = [];
      thisGraph.edges = [];
      thisGraph.updateGraph();
    }
  };

  /* select all text in element: taken from http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element */
  GraphCreator.prototype.selectElementContents = function(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };


  /* insert svg line breaks: taken from http://stackoverflow.com/questions/13241475/how-do-i-include-newlines-in-labels-in-d3-charts */
  GraphCreator.prototype.insertTitleLinebreaks = function (gEl, title) {
    var words = title.split(/\s+/g),
        nwords = words.length;
    var el = gEl.append("text")
          .attr("text-anchor","middle")
          .attr("dy", "-" + (nwords-1)*7.5);

    for (var i = 0; i < words.length; i++) {
      var tspan = el.append('tspan').text(words[i]);
      if (i > 0)
        tspan.attr('x', 0).attr('dy', '15');
    }
  };

  
  // remove edges associated with a node
  GraphCreator.prototype.spliceLinksForNode = function(node) {
    var thisGraph = this,
        toSplice = thisGraph.edges.filter(function(l) {
      return (l.source === node || l.target === node);
    });
    toSplice.map(function(l) {
      thisGraph.edges.splice(thisGraph.edges.indexOf(l), 1);
    });
  };

  GraphCreator.prototype.replaceSelectEdge = function(d3Path, edgeData){
    var thisGraph = this;
    d3Path.classed(thisGraph.consts.selectedClass, true);
    if (thisGraph.state.selectedEdge){
      thisGraph.removeSelectFromEdge();
    }
    thisGraph.state.selectedEdge = edgeData;
  };

  GraphCreator.prototype.replaceSelectNode = function(d3Node, nodeData){
    var thisGraph = this;
    d3Node.classed(this.consts.selectedClass, true);
    if (thisGraph.state.selectedNode){
      thisGraph.removeSelectFromNode();
    }
    thisGraph.state.selectedNode = nodeData;
  };
  
  GraphCreator.prototype.removeSelectFromNode = function(){
    var thisGraph = this;
    thisGraph.circles.filter(function(cd){
      return cd.id === thisGraph.state.selectedNode.id;
    }).classed(thisGraph.consts.selectedClass, false);
    thisGraph.state.selectedNode = null;
  };

  GraphCreator.prototype.removeSelectFromEdge = function(){
    var thisGraph = this;
    thisGraph.paths.filter(function(cd){
      return cd === thisGraph.state.selectedEdge;
    }).classed(thisGraph.consts.selectedClass, false);
    thisGraph.state.selectedEdge = null;
  };

  GraphCreator.prototype.pathMouseDown = function(d3path, d){
    var thisGraph = this,
        state = thisGraph.state;
    d3.event.stopPropagation();
    state.mouseDownLink = d;

    if (state.selectedNode){
      thisGraph.removeSelectFromNode();
    }
    
    var prevEdge = state.selectedEdge;  
    if (!prevEdge || prevEdge !== d){
      thisGraph.replaceSelectEdge(d3path, d);
    } else{
      thisGraph.removeSelectFromEdge();
    }
  };

  // mousedown on node
  GraphCreator.prototype.circleMouseDown = function(d3node, d){
    var thisGraph = this,
        state = thisGraph.state;
    d3.event.stopPropagation();
    state.mouseDownNode = d;
    if (d3.event.shiftKey){
      state.shiftNodeDrag = d3.event.shiftKey;
      // reposition dragged directed edge
      thisGraph.dragLine.classed('hidden', false)
        .attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y);
      return;
    }
  };

  /* place editable text on node in place of svg text */
  GraphCreator.prototype.changeTextOfNode = function(d3node, d){
    var thisGraph= this,
        consts = thisGraph.consts,
        htmlEl = d3node.node();
    d3node.selectAll("text").remove();
    var nodeBCR = htmlEl.getBoundingClientRect(),
        curScale = nodeBCR.width/consts.nodeRadius,
        placePad  =  5*curScale,
        useHW = curScale > 1 ? nodeBCR.width*0.71 : consts.nodeRadius*1.42;
    // replace with editableconent text
    var d3txt = thisGraph.svg.selectAll("foreignObject")
          .data([d])
          .enter()
          .append("foreignObject")
          .attr("x", nodeBCR.left + placePad )
          .attr("y", nodeBCR.top + placePad)
          .attr("height", 2*useHW)
          .attr("width", useHW)
          .append("xhtml:p")
          .attr("id", consts.activeEditId)
          .attr("contentEditable", "true")
          .text(d.title)
          .on("mousedown", function(d){
            d3.event.stopPropagation();
          })
          .on("keydown", function(d){
            d3.event.stopPropagation();
            if (d3.event.keyCode == consts.ENTER_KEY && !d3.event.shiftKey){
              this.blur();
            }
          })
          .on("blur", function(d){
            d.title = this.textContent;
            thisGraph.insertTitleLinebreaks(d3node, d.title);
            d3.select(this.parentElement).remove();
          });
    return d3txt;
  };

  // mouseup on nodes
  GraphCreator.prototype.circleMouseUp = function(d3node, d){
    var thisGraph = this,
        state = thisGraph.state,
        consts = thisGraph.consts;
    // reset the states
    state.shiftNodeDrag = false;    
    d3node.classed(consts.connectClass, false);
    
    var mouseDownNode = state.mouseDownNode;
    
    if (!mouseDownNode) return;

    thisGraph.dragLine.classed("hidden", true);

    if (mouseDownNode !== d){
      // we're in a different node: create new edge for mousedown edge and add to graph
      var newEdge = {source: mouseDownNode, target: d};
      var filtRes = thisGraph.paths.filter(function(d){
        if (d.source === newEdge.target && d.target === newEdge.source){
          thisGraph.edges.splice(thisGraph.edges.indexOf(d), 1);
        }
        return d.source === newEdge.source && d.target === newEdge.target;
      });
      if (!filtRes[0].length){
        thisGraph.edges.push(newEdge);
        thisGraph.updateGraph();
      }
    } else{
      // we're in the same node
      if (state.justDragged) {
        // dragged, not clicked
        state.justDragged = false;
      } else{
        // clicked, not dragged
        if (d3.event.shiftKey){
          // shift-clicked node: edit text content
          var d3txt = thisGraph.changeTextOfNode(d3node, d);
          var txtNode = d3txt.node();
          thisGraph.selectElementContents(txtNode);
          txtNode.focus();
        } else{
          if (state.selectedEdge){
            thisGraph.removeSelectFromEdge();
          }
          var prevNode = state.selectedNode;            
          
          if (!prevNode || prevNode.id !== d.id){
            thisGraph.replaceSelectNode(d3node, d);
          } else{
            thisGraph.removeSelectFromNode();
          }
        }
      }
    }
    state.mouseDownNode = null;
    return;
    
  }; // end of circles mouseup

  // mousedown on main svg
  GraphCreator.prototype.svgMouseDown = function(){
    this.state.graphMouseDown = true;
  };

  // mouseup on main svg
  GraphCreator.prototype.svgMouseUp = function(){
    var thisGraph = this,
        state = thisGraph.state;
    if (state.justScaleTransGraph) {
      // dragged not clicked
      state.justScaleTransGraph = false;
    } else if (state.graphMouseDown && d3.event.shiftKey){
      // clicked not dragged from svg
      var xycoords = d3.mouse(thisGraph.svgG.node()),
          d = {id: thisGraph.idct++, title: "new concept", x: xycoords[0], y: xycoords[1]};
      thisGraph.nodes.push(d);
      thisGraph.updateGraph();
      // make title of text immediently editable
      var d3txt = thisGraph.changeTextOfNode(thisGraph.circles.filter(function(dval){
        return dval.id === d.id;
      }), d),
          txtNode = d3txt.node();
      thisGraph.selectElementContents(txtNode);
      txtNode.focus();
    } else if (state.shiftNodeDrag){
      // dragged from node
      state.shiftNodeDrag = false;
      thisGraph.dragLine.classed("hidden", true);
    }
    state.graphMouseDown = false;
  };

  // keydown on main svg
  GraphCreator.prototype.svgKeyDown = function() {
    var thisGraph = this,
        state = thisGraph.state,
        consts = thisGraph.consts;
    // make sure repeated key presses don't register for each keydown
    if(state.lastKeyDown !== -1) return;

    state.lastKeyDown = d3.event.keyCode;
    var selectedNode = state.selectedNode,
        selectedEdge = state.selectedEdge;

    switch(d3.event.keyCode) {
    case consts.BACKSPACE_KEY:
    case consts.DELETE_KEY:
      d3.event.preventDefault();
      if (selectedNode){
        thisGraph.nodes.splice(thisGraph.nodes.indexOf(selectedNode), 1);
        thisGraph.spliceLinksForNode(selectedNode);
        state.selectedNode = null;
        thisGraph.updateGraph();
      } else if (selectedEdge){
        thisGraph.edges.splice(thisGraph.edges.indexOf(selectedEdge), 1);
        state.selectedEdge = null;
        thisGraph.updateGraph();
      }
      break;
    }
  };

  GraphCreator.prototype.svgKeyUp = function() {
    this.state.lastKeyDown = -1;
  };

  // call to propagate changes to graph
  // GraphCreator.prototype.updateGraph = function(){
    
  //   var thisGraph = this,
  //       consts = thisGraph.consts,
  //       state = thisGraph.state;
    
  //   thisGraph.paths = thisGraph.paths.data(thisGraph.edges, function(d){
  //     return String(d.source.id) + "+" + String(d.target.id);
  //   });
  //   var paths = thisGraph.paths;
  //   // update existing paths
  //   paths.style('marker-end', 'url(#end-arrow)')
  //     .classed(consts.selectedClass, function(d){
  //       return d === state.selectedEdge;
  //     })
  //     .attr("d", function(d){
  //       return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
  //     });

  //   // add new paths
  //   paths.enter()
  //     .append("path")
  //     .style('marker-end','url(#end-arrow)')
  //     .classed("link", true)
  //     .attr("d", function(d){
  //       return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
  //     })
  //     .on("mousedown", function(d){
  //       thisGraph.pathMouseDown.call(thisGraph, d3.select(this), d);
  //       }
  //     )
  //     .on("mouseup", function(d){
  //       state.mouseDownLink = null;
  //     });

  //   // remove old links
  //   paths.exit().remove();
    
  //   // update existing nodes
  //   thisGraph.circles = thisGraph.circles.data(thisGraph.nodes, function(d){ return d.id;});
  //   thisGraph.circles.attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";});












  //   // add new nodes
  //   var newGs= thisGraph.circles.enter()
  //         .append("g");

  //   newGs.classed(consts.circleGClass, true)
  //     .attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";})
  //     .on("mouseover", function(d){        
  //       if (state.shiftNodeDrag){
  //         d3.select(this).classed(consts.connectClass, true);
  //       }
  //     })
  //     .on("mouseout", function(d){
  //       d3.select(this).classed(consts.connectClass, false);
  //     })
  //     .on("mousedown", function(d){
  //       thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
  //     })
  //     .on("mouseup", function(d){
  //       thisGraph.circleMouseUp.call(thisGraph, d3.select(this), d);
  //     })
  //     .call(thisGraph.drag);

  //   newGs.append("circle")
  //     .attr("r", String(consts.nodeRadius));

  //   newGs.each(function(d){
  //     thisGraph.insertTitleLinebreaks(d3.select(this), d.title);
  //   });







  //   // remove old nodes
  //   thisGraph.circles.exit().remove();
  // };

  GraphCreator.prototype.zoomed = function(){
    this.state.justScaleTransGraph = true;
    d3.select("." + this.consts.graphClass)
      .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")"); 
  };

  GraphCreator.prototype.updateWindow = function(svg){
    var docEl = document.documentElement,
        bodyEl = document.getElementsByTagName('body')[0];
    var x = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth;
    var y = window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;
    svg.attr("width", x).attr("height", y);
  };


  
  /**** MAIN ****/

  // warn the user when leaving
  window.onbeforeunload = function(){
    return "Make sure to save your graph locally before leaving :-)";
  };  

   


  var docEl = document.documentElement,
      bodyEl = document.getElementsByTagName('body')[0];
  
  var width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
      height =  window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;

  var xLoc = width/2 - 25,
      yLoc = 100;

  // initial node data
  var nodes = [{title: "new concept", id: 0, x: xLoc, y: yLoc},
               {title: "new concept", id: 1, x: xLoc, y: yLoc + 200}];
  var edges = [{source: nodes[1], target: nodes[0]}];


  /** MAIN SVG **/
  var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
       
  var graph = new GraphCreator(svg, nodes, edges);
      graph.setIdCt(2);
  
})(window.d3, window.saveAs, window.Blob);
//graph.updateGraph();