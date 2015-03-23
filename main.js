var mainLayout;
var innerLayout;

var resizeCanvas = function(){
    canvas = document.getElementById('diagram');
    canvas.width = $('#graphics-pane').innerWidth() - 20
    canvas.height = $('#graphics-pane').innerHeight() - 20
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

$(window).load(function(){
    var dWidget = new DiagramWidget('diagram', 'imgs/RaspberryPiPinoutsBlankHorizontal.png', '1-B');
    dWidget.drawImage();
});





