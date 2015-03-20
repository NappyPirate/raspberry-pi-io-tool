function toggleLiveResizing (lout) {
    $.each( $.layout.config.borderPanes, function (i, pane) {
        var o = lout.options[ pane ];
        o.livePaneResizing = !o.livePaneResizing;
    });
};

var mainLayout;
var innerLayout;

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
    });
    
    innerLayout = $('#property-explorer').layout({
        closable:                     false    
    ,    resizable:                   true   
    ,    slidable:                    true   
    ,    livePaneResizing:            true
    ,    south__size:                 .5
    ,    showDebugMessages:           true 
    });
});

var resizeContainer = function(){
    var bodyHeight = document.body.offsetHeight - 27;
    $('#container').height(bodyHeight);
    $('#graphics-pane').height(bodyHeight);
    $('#diagram').height(bodyHeight - 6);
}

window.onresize = resizeContainer;
resizeContainer();
