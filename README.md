# bar-chart

In this example project i have created a library for drawing bar charts on X, Y axes. 
Also i have made an live example for bar chart.

- index.html - Displays bar chart example.
- script.js - In this file i have written code for creating bar chart. 

To edit bar chart you can change data inside of script.js file. 
Example of Data model:

var myVinyls = {
    "Apple": 35,
    "Orange": 30,
    "Banana": 10,
    "Kiwifruit": 25,
    "Blueberry": 40,
    "Grapes": 5
};

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

-----------------------

2. Take any OOP language and create mini graphs (charts) library that is able to draw basic bar chart on X, Y axes. Create another chart type - line as just different visual representation for distinct values. 
Notes:
Demonstrate usage of OOP with classes, inheritance etc
Use any library for image drawing and generation that works with your language of choice. Result of your program might be JPG, PNG... image. Do not use existing graph libraries 

-----------------
