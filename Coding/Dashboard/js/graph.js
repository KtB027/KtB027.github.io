let c,d;
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const dataObject = {
	weekly: [580, 810, 170, 510, 970, 100, 700, 900, 770, 230, 500, 650, 160, 240, 780, 780, 450, 760, 700, 980, 800, 640, 990, 740, 190, 220, 200, 820, 400, 640, 360, 40, 560, 860, 380, 470, 480, 150, 240, 600, 810, 560, 870, 720, 220, 510, 400, 730, 210, 990, 800, 520, 640, 220],
	monthly: [2530, 1880, 2520, 1590, 1900, 2960, 2060, 2080, 1540, 2950, 2020, 2310, 1300, 2180]
}

function arrayMax(arr){
	max = 0;
	arr.forEach(function(el){
		if (el > max){max = el}
	})
	return max;
}

function createGraph(objectId,data,gradColor){
	this.doc = document.getElementById(objectId);
	console.log(this.doc.offsetWidth*256/this.doc.offsetHeight)
	this.doc.style.position = 'relative'
	this.topPadding = 8
	this.dataObject = data
	this.graphData = data.monthly
	this.timeStamp = 1
	this.gradientColor = gradColor
	this.cursor = 1;
	this.init = function(){/*
		this.svgSize = [this.doc.offsetWidth*256/this.doc.offsetHeight,256]
		this.xScale = this.svgSize[0] / (this.graphData.length-3)
		this.yScale = (this.svgSize[1] - this.topPadding)/arrayMax(this.graphData)
		this.doc.innerHTML = "<div style='width: 100%; height: 100%'><svg style='width: 100%; height: 100%; border: solid 1pt red; stroke-width: 4;' viewBox='0 0 "+this.svgSize[0]+" "+this.svgSize[1]+"'></svg></div>"
		this.svg = document.getElementsByTagName("svg")[0]*/
		this.svgSize = [this.doc.offsetWidth*256/this.doc.offsetHeight,256,5]
		this.xScale = this.svgSize[0] / this.svgSize[2]
		this.yScale = (this.svgSize[1] - this.topPadding)/arrayMax(this.graphData)
		width = (this.svgSize[0]*(this.graphData.length-2)/this.svgSize[2])
		this.doc.innerHTML = "<div id='"+this.doc.id+"-time' style='display: flex; justify-content: center; align-items: center; position: absolute; top: 0;'><div onclick='myGraph.setTime(0)'>Week</div><div onclick='myGraph.setTime(1)'>Month</div><div onclick='myGraph.setTime(2)'>Year</div></div><div style='width: 100%; height: 100%; overflow: hidden; scroll-behavior: smooth;'><svg style='width: "+width+"px; height: 100%; stroke-width: 4;' viewBox='0 0 "+width+" "+this.svgSize[1]+"'></svg></div><div id='"+this.doc.id+"-timestamp' style='width: 100%; height: 24pt; position: absolute; top: calc(100% - 8pt); overflow: hidden; scroll-behavior: smooth;'><div style='width: "+width+"px; height: 100%; position: relative'></div></div>"
		this.svg = this.doc.getElementsByTagName("svg")[0]
	}
	this.processData = function(){

	}
	this.drawGraph = function(){
		svgGraph = ''
/*
		for (c = 0; c < this.graphData.length; c++){
			svgGraph += "<path stroke='blue' d='M"+(this.xScale/2+this.xScale*(c-1))+" "+this.svgSize[1]+" v-"+(this.yScale*this.graphData[c])+"' />"
		}
*/
		linearGradient = "<linearGradient id='"+this.doc.id+"-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>"
		linearGradient += "<stop offset='0%' style='stop-color: "+this.gradientColor+"; stop-opacity: 1' />"
		linearGradient += "<stop offset='100%' style='stop-color: "+this.gradientColor+"; stop-opacity: 0;' />"
		linearGradient += "</linearGradient>"

		svgGraph += linearGradient

/*
		svgGraph += "<path stroke='green' d='"
		for (c = 0; c < this.graphData.length; c++){
			if (c == 0){
				svgGraph += "M"+(this.xScale*c)+" "+(this.svgSize[1]-this.graphData[c]*this.yScale)+" "
			} else {
				svgGraph += "l"+(this.xScale)+" "+(-(this.graphData[c]-this.graphData[c-1])*this.yScale)+" "
			}
		}
		svgGraph += "' />"
*/
		lineGraph = "<path d='"
		for (c = 1; c < this.graphData.length; c++){
			if (c == 1){
				lineGraph += "M"+(this.xScale*(c-1)/2)+" "+(this.svgSize[1]-(this.graphData[c]-(this.graphData[c]-this.graphData[c-1])/2)*this.yScale)+" "
			} else {
				lineGraph += "s"+(this.xScale/2)+" "+(((this.graphData[c-2]-this.graphData[c-1])/2)*this.yScale)+" "+(this.xScale)+" "+((((this.graphData[c-2]-this.graphData[c-1])+(this.graphData[c-1]-this.graphData[c]))/2)*this.yScale)+" "
			}
		}
		blockGraph = lineGraph
		lineGraph += "' style='stroke-dasharray: 7; stroke: #7c4202; stroke-linecap: round; stroke-width: 3' />"

		blockGraph += "v"+this.svgSize[1]+" h-"+(this.xScale*this.graphData.length)+" z' stroke='none' fill='white' />"
		mask = "<mask id='"+this.doc.id+"-block-mask'><rect x='-50%' y='0' width='200%' height='100%' fill='black' />"+blockGraph+"</mask>"
		svgGraph += mask
		svgGraph += "<g mask='url(#"+this.doc.id+"-block-mask)'><rect x='-50%' y='0' width='200%' height='100%' fill='url(#"+this.doc.id+"-gradient)' /><path id='"+this.doc.id+"-cursor' style='stroke: #abc503; stroke-width: 1; stroke-dasharray: 4' /></g>"
		svgGraph += lineGraph

		this.svg.innerHTML = svgGraph
		this.setCursorPos(this.cursor)

		document.getElementById(this.doc.id+"-timestamp").children[0].innerHTML = ''
		for (c=0;c<this.graphData.length-2;c++){
			if (this.graphData.length == 14){timeStamp = month[c]} else {timeStamp = "Week "+(c+1)}
			document.getElementById(this.doc.id+"-timestamp").children[0].innerHTML+= "<div style='width: auto; height: auto; position: absolute; top: 50%; left: "+(this.xScale/2+this.xScale*(c))+"px; transform: translate(-50%,-50%); background: #7c4202; font-size: 8pt; padding: 2pt 4pt; color: #fded90; border-radius: 8pt; font-weight: bold; cursor: pointer;' onclick='myGraph.setCursorPos("+(c+1)+")'>"+timeStamp+"</div>"
		}

	}
	this.setCursorPos = function(pos){
		this.cursor = pos
		console.log(this.xScale*pos+", "+(this.doc.offsetWidth/2)+", "+(this.svgSize[0]-this.doc.offsetWidth/2))
		if (this.xScale*pos < this.doc.offsetWidth/2){
			console.log(1)
			this.doc.children[1].scrollTo(0,0)
			document.getElementById(this.doc.id+"-timestamp").scrollTo(0,0)
		} else if (this.xScale*pos > this.xScale*(this.graphData.length-2)-this.doc.offsetWidth/2){
			console.log(2)
			this.doc.children[1].scrollTo(this.xScale*(this.graphData.length-2)-this.doc.offsetWidth/2,0)
			document.getElementById(this.doc.id+"-timestamp").scrollTo(this.xScale*(this.graphData.length-2)-this.doc.offsetWidth/2,0)
		} else {
			console.log(3)
			this.doc.children[1].scrollTo(this.xScale*pos-this.doc.offsetWidth/2,0)
			document.getElementById(this.doc.id+"-timestamp").scrollTo(this.xScale*pos-this.doc.offsetWidth/2,0)
		}
		document.getElementById(this.doc.id+"-cursor").setAttribute("d","M"+(this.xScale*(pos)-this.xScale/2)+" "+this.svgSize[1]+" v-"+this.svgSize[1])
	}
	this.setTime = function(index){
		switch(index){
			case 0: this.graphData = this.dataObject.weekly; break;
			case 1: this.graphData = this.dataObject.monthly; break;
			case 2: alert("No Data"); break;
		}
		for(c=0;c<3;c++){
			document.getElementById(this.doc.id+"-time").children[c].classList.remove("active")
		}
		this.timeStamp = index
		this.cursor = 1
		this.init(); this.drawGraph()
		document.getElementById(this.doc.id+"-time").children[index].classList.add("active")
	}
	this.init(); this.drawGraph()
		document.getElementById(this.doc.id+"-time").children[this.timeStamp].classList.add("active")
}

myGraph = new createGraph("the-graph",dataObject,'#abc503')/*
function refresh(){console.log(this);myGraph.processData(); myGraph.drawGraph();}
window.addEventListener("resize",function(){refresh()})
//window.addEventListener("load",function(){graphDelay = setTimeout(refresh,10)})*/