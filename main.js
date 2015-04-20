var gui = require('nw.gui');
var win = gui.Window.get();
var rest = require('restler');

var mainLayout;
var innerLayout;
var dWidget;

var resizeElements = function(){
    $('html').height($(window).innerHeight());
    $('#container').height($('body').innerHeight() - $('#menubar').height());
    
    var canvas = document.getElementById('diagram');
    canvas.height = $('#container').innerHeight();
    
    var explorerWidth = $('#property-explorer').css('width');
    canvas.width = ($('#container').innerWidth() - explorerWidth.substring(0, explorerWidth.length - 2));
    
    $('#diagram').drawLayers();
};

function loadBoardType(boardType) {
    delete dWidget;
    var jsonObj = require('./data/' + boardType + '.json');
    
    pWidget = new ExplorerWidget('properties-table');
    pWidget.setBoard(jsonObj);
    
    dWidget = new DiagramWidget('diagram');
    dWidget.setBoard(jsonObj);
    dWidget.onPinClick(function(p){
        pWidget.selectPin(p.name.substring(3))
    });
};

function generateLoginForm() {

}

$('#login').click(function(){$('#login-prompt').modal('show')});

window.onresize = resizeElements;

$(window).load(function(){
    loadBoardType('pi-1-b');
    pWidget.selectPin(1);
    dWidget.init();
    
    rest.get('https://public.opencpu.org/ocpu/library/').on('success', function(data) {
        console.log(data);
    });
});
