class Download {
    downloadListener() {
        var buttonJPG = document.getElementById('btn-jpg');
        var buttonPNG = document.getElementById('btn-png');
        
        buttonJPG.addEventListener('click', function (e) {
            var dataURL = canvas.toDataURL('image/jpg');
            buttonJPG.href = dataURL;
        });
    
        buttonPNG.addEventListener('click', function (e) {
            var dataURL = canvas.toDataURL('image/png');
            buttonPNG.href = dataURL;
        });
    }
}

class Draw extends Download {
    constructor(){
        super();
        this.myCanvas = canvas;
        this.myCanvas.width = 400;
        this.myCanvas.height = 400;
    }

    drawBackground(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    }

    // helper function for drawing line
    drawLine(ctx, startX, startY, endX, endY,color){
        ctx = this.myCanvas.getContext("2d");
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.restore();
    }


    // function - draw a bar
    drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
        ctx.save();
        ctx.fillStyle=color;
        ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
        ctx.restore();
    }
}

// Component that will do the actual drawing of bar chart
// options - parametar it stores the canvas ref and creates a drawing context - stored as a class member, then it stores the colors array
// draw function - 2,


class Barchart extends Draw {
    constructor(options) {
        super();
        this.options = options;
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.drawBackground(this.ctx);
        this.colors = options.colors;
    }

    draw(){
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;
 
        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            this.drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
             
            //writing grid markers
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
 
            gridValue+=this.options.gridScale;
            this.downloadListener();
        }
  
        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;
 
        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            this.drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
 
            barIndex++;
        }

        //drawing series name
        this.ctx.save();
        this.ctx.textBaseline="bottom";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
        this.ctx.restore(); 

        //draw legend
        barIndex = 0;
        var legend = document.querySelector("legend[for='canvas']");
        var ul = document.createElement("ul");
        legend.append(ul);
        for (categ in this.options.data){
            var li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
            li.style.padding = "5px";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }  
    }
}

// Data model
var myVinyls = {
    "Apple": 35,
    "Orange": 30,
    "Banana": 10,
    "Kiwifruit": 25,
    "Blueberry": 40,
    "Grapes": 5
};

// Using Bar Chart Component - Instantiate the class and call draw() function
var myBarchart = new Barchart(
    {
        canvas:document.getElementById("canvas"),
        seriesName:"Nicest Fruit",
        padding: 35,
        gridScale: 5,
        gridColor:"#777",
        data:myVinyls,
        colors:["#eb4d4b","#f0932b", "#f6e58d","#badc58", "#686de0", "#130f40"]
    }
);
myBarchart.draw();