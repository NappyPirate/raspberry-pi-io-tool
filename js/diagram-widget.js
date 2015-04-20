var DiagramWidget = function(canvasId) {
    this.canvas = $('#'+canvasId);
    
    this.setCanvas = function(cId) {
        this.canvas = $('#'+cId);
    }
    
    this.setBoard = function(obj) {
        delete this.boardObject;
        this.boardObject = obj;
    }
    
    this.init = function() {
        this.canvas.removeLayers();
    
        var origin =  { 
            'x': (this.canvas.width() / 2) - (this.boardObject.imageWidth / 2),
            'y': (this.canvas.height() / 2) - (this.boardObject.imageHeight / 2)
        };
        
        this.canvas.addLayer({
            name: 'picture',
            type: 'image',
            shadowColor: '#000',
            shadowBlur: 5,
            layer: true,
            draggable: true,
            source: this.boardObject.image,
            fromCenter: false,
            x: origin.x,
            y: origin.y,
            data: {
                lastPosition: {'x': origin.x, 'y': origin.y}
            },
            dragstart: function() {
                $(this).setLayerGroup('pins', { 
                    visible: false
                });
                $(this).drawLayers();
            },
            dragstop: function(layer) {
                var delta = {'x': layer.x - layer.data.lastPosition.x, 'y': layer.y - layer.data.lastPosition.y};
                
                $(this).setLayerGroup('pins', {
                    visible: true,
                    x: '+=' + delta.x,
                    y: '+=' + delta.y
                });
                
                $(this).setLayer('picture', {
                    data: {
                        lastPosition: {'x': layer.x, 'y': layer.y}
                    }
                });
               
                $(this).drawLayers();
            }
        })
        
        this.boardObject.pins.forEach(function(element, index, array) {
            var color = this.boardObject.pinColors.other;
            
            for (var key in this.boardObject.pinColors) {
                if(element.default.indexOf(key) > -1) {
                    color = this.boardObject.pinColors[key];
                } 
            }
            
            this.canvas.addLayer({
                name: 'pin' + element.pin,
                layer: true,
                groups: ['pins'],
                type: 'ellipse',
                fillStyle: color.dark,
                x: origin.x + element.x,
                y: origin.y + element.y,
                width: element.r * 2, height: element.r * 2,
                mouseover: function(layer) {
                    $(this).animateLayer(layer, {
                        fillStyle: color.light
                    }, 0);
                },
                mouseout: function(layer) {
                    $(this).animateLayer(layer, {
                        fillStyle: color.dark
                    }, 0);
                }
            });
        }, this);
        
        if(typeof this.onPinClickFunction == 'function'){
            var func = this.onPinClickFunction;
            this.canvas.setLayerGroup('pins', {
                click: func
            });
        }
        
        this.canvas.drawLayers();
    }
    
    this.onPinClick = function(func){
        this.onPinClickFunction = func;
    
        this.canvas.setLayerGroup('pins', {
            click: func
        });
    }
    
    this.centerImage = function(){
        var current = {
            'x' : this.canvas.getLayer('picture').x,
            'y' : this.canvas.getLayer('picture').y
        };
        
        var destination =  { 
            'x': (this.canvas.width() / 2) - (this.boardObject.imageWidth / 2),
            'y': (this.canvas.height() / 2) - (this.boardObject.imageHeight / 2)
        };
        
        var delta = {
            'x' : destination.x - current.x,
            'y' : destination.y - current.y
        };
        
        this.canvas.setLayers({
            x: '+=' + delta.x,
            y: '+=' + delta.y
        });
        
        this.canvas.setLayer('picture',{
            data: {
                lastPosition: {'x': destination.x, 'y': destination.y}
            }
        });
        
        this.canvas.clearCanvas();
        this.canvas.drawLayers();
    }
};