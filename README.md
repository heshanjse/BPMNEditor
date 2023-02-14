<h2><b>BPMN Editor</b></h2>

Business Process Model and Notation (BPMN) is a standard way of representing business processes in graphical form.  
This project will involve implementing a Web based BPMN editor to construct business process diagrams. Users can implement BPMN diagrams using tasks,gateways,start events and end events.   
  
 - task-User Task,Script Task,Mail Task,Manual Task  
 - Gateway-Parallel Gateway,Exclusive Gateway,Inclusive Gateway,Event Gateway  
 - Start event-Start Event,Time Start Event,Message Start Event,Error Start Event  
 - End event-End Event,Error End Event,Terminate End Event,Cancel End Event    

This BPMN editor has the capability to build complete Business Process diagrams; download Business Process diagrams files in Json format; upload json format file and generate Business Process diagrams.

<p>
<h4><b>BPMN element Overview</b></h4>
  Start Event&nbsp;&nbsp;&nbsp;&nbsp;Time Start Event&nbsp;&nbsp;&nbsp;&nbsp;Message Start Event&nbsp;&nbsp;&nbsp;&nbsp;Error Start Event  
  <br>
  <img src="http://i68.tinypic.com/jjsdh1.png" width="485"/>
  <br>
  End Event&nbsp;&nbsp;&nbsp;&nbsp;Terminate End Event&nbsp;&nbsp;&nbsp;&nbsp;Error End Event&nbsp;&nbsp;&nbsp;&nbsp;Cancel End Event  
  <br>
  <img src="http://i66.tinypic.com/2ahcpqf.png" width="485"/>
  <br>
  Parallel Gateway&nbsp;&nbsp;&nbsp;&nbsp;Exclusive Gateway&nbsp;&nbsp;&nbsp;&nbsp;Inclusive Gateway&nbsp;&nbsp;&nbsp;&nbsp;Event Gateway  
  <br>
  <img src="http://i65.tinypic.com/6oookg.png" width="485"/>
  <br>
  User Task&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Script Task&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mail Task&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manual Task  
  <br>
  <img src="http://i66.tinypic.com/2f0fvk9.png" width="490"/>

  <!--<img src="your_relative_path_here_number_2_large_name" width="350"/>-->
  <h4><b>How to Use</b></h4>
<img src="http://i66.tinypic.com/34htpfk.png" />
</p>

User can drag and drop BPMN elements from the tool box to the drawing canvas.Those BPMN elements can be dragged in the canvas and upon clicking on any of those elements will cause a tooltip to appear. Also, the artefacts inside any of tooltips depend on the BPMN element selected. eg:- End Event element does not have a flow drawing artefact whereas the Task  elements has all of the available artefacts

BPMN flows(connect elements) can be drawn using  the flow artefact from either the toolbox or the element tooltip. That BPMN flow can be changed using multiple connection points.When the drawn elements move about, connected flows will also respond accordingly by maintaining the connections.

A BPMN Task can be resized using its bounding box, additionally, the text of a BPMN Task can be changed after pressing the relevant artefact in tooltip. Every element can be deleted using the delete artefact of a tool tip, which means that all its connected flows will get deleted too. However,  the user has the ability to delete a flow without deleting it’s constituent BPMN elements. 
Every BPMN element can add properties using the given property artefact in its tooltip, which will create a popup window showing the applicable properties. 

Any BPMN graph drawn can be downloaded as a JSON file. The users can also recreate a BPMN graph in the editor by importing a BPMN JSON file. This recreated graph will be editable just as a fresh one. 


<a href="http://i64.tinypic.com/2910ydi.png" target="_blank"><img src="http://i64.tinypic.com/2910ydi.png" border="0" alt="BPMN editor screen shot" ></a>
<!--<a href="http://tinypic.com?ref=2gw5ag5" target="_blank"><img src="http://i65.tinypic.com/2gw5ag5.png" border="0" alt="Image and video hosting by TinyPic"  height="490" width="500"></a>-->
<br>
<h3><b>Running the BPMN Editor</b></h3>
Runs like a typical Html/javaScript app:  

```
 - Clone the project from github
 - Open index.html using your browser 
```
 
 <h3><b>Directory Layout</b></h3>
 ```
BPMNEditor/  
 |—app/  
    |— drawingpage/  
    |      |— endevent/  
    |      |      |—endevent.js    —>  End Event Controller  
    |      |—flow/
    |      |      |—flow.js        —>  Flow Controller  
    |      |—gateway/
    |      |      |—gateway.js     —>  Gateway Controller  
    |      |—startevent/
    |      |      |—startevent.js  —>  Start Event Contoller  
    |      |—task/
    |      |      |—task.js        —>  Task Controller  
    |      |—bpmnjsonUpdater.js    —>  Recreate a BPMN graph after JSON import  
    |      |—bpmnuploader.js       —>  Push BPMN elements to JSON file  
    |      |—devider.js            —>  Declare second level app module  
    |      |—drawing.js            —>  Declare top level app module  
    |— img/                        —>  All images  
    |—public/
    |      |—css/                  —>  All css libraries  
    |      |— js/                  —>  All javascript libraries  
    |— index.js                    —>  Canvas and toolbox HTML page  
 ```
<h3>Demo<h3>
<a href="http://heshanjse.github.io/BPMNEditor/app/"><h5>http://heshanjse.github.io/BPMNEditor/app/<h5></a>

 <h3><b>Contact</b></h3>
 For more information on the application contact : heshjse@gmail.com
