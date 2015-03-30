var mainLayout;
var innerLayout;
var dWidget;

var resizeCanvas = function(){
    canvas = document.getElementById('diagram');
    canvas.width = $('#graphics-pane').innerWidth() - 20;
    canvas.height = $('#graphics-pane').innerHeight() - 20;
    $('#diagram').drawLayers();
};

var resizeContainer = function(){
    var height = $(window).innerHeight() - 25;
    $('#container').height(height);
}

$(document).ready(function () {
    mainLayout = $('#container').layout({
        closable:                     false    
    ,    resizable:                   true   
    ,    slidable:                    true   
    ,    livePaneResizing:            true
    ,    east__size:                  300
    ,    east__minSize:               200
    ,    east__maxSize:               .5 
    ,    center__minWidth:            100
    ,    showDebugMessages:           true
    ,    center__onresize_end:        resizeCanvas
    });
    
    innerLayout = $('#property-explorer').layout({
        closable:                     false    
    ,    resizable:                   true   
    ,    slidable:                    true   
    ,    livePaneResizing:            true
    ,    south__size:                 .5
    ,    showDebugMessages:           true 
    });
    
    resizeCanvas();
});

window.onresize = resizeContainer;

resizeContainer();

function loadBoard(boardType) {
    delete dWidget;
    var jsonObj = require('./data/' + boardType + '.json');
    
    pWidget = new ExplorerWidget('pins-table', 'properties-table');
    pWidget.setBoard(jsonObj);
    
    dWidget = new DiagramWidget('diagram', jsonObj);
    dWidget.drawImage();
};

function sayHello(layer) {
    alert(layer.name);
};

$(window).load(function(){
    loadBoard('pi-1-b');
});
