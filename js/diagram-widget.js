var DiagramWidget = function(canvasId, boardObj) {
    this.canvas = $('#'+canvasId);
    this.boardObject = boardObj;
    this.pinColors = {
        "none": {"dark": "#008000", "light": "#90EE90"},
        "volts": {"dark": "#FF0000", "light": "#DB7093"},
        "ground": {"dark": "#000000", "light": "#A9A9A9"},
        "other": {"dark": "#FFFF00", "light": "#FFFFE0"}
    };
    
    this.setCanvas = function(cId) {
        this.canvas = $('#'+cId);
    }
    
    this.setBoard = function(obj) {
        delete this.boardObject;
        this.boardObject = obj;
    }
    
    this.drawImage = function() {
        var origin =  { 
            "x": (this.canvas.width() / 2) - (this.boardObject.imageWidth / 2),
            "y": (this.canvas.height() / 2) - (this.boardObject.imageHeight / 2)
        };
        
        this.canvas.addLayer({
            name: 'picture',
            type: 'image',
            layer: true,
            draggable: true,
            source: this.boardObject.image,
            fromCenter: false,
            x: origin.x,
            y: origin.y,
            data: {
                lastPosition: {"x": origin.x, "y": origin.y}
            },
            dragstart: function() {
                $(this).setLayerGroup('pins', { 
                    visible: false
                });
                $(this).drawLayers();
            },
            dragstop: function(layer) {
                var delta = {"x": layer.x - layer.data.lastPosition.x, "y": layer.y - layer.data.lastPosition.y};
                
                $(this).setLayerGroup('pins', {
                    visible: true,
                    x: '+=' + delta.x,
                    y: '+=' + delta.y
                });
                
                $(this).setLayer('picture', {
                    data: {
                        lastPosition: {"x": layer.x, "y": layer.y}
                    }
                });
               
                $(this).drawLayers();
            }
        })
        
        this.addPins(origin);
        this.canvas.drawLayers();
    }
    
    this.addPins = function(pos){
        var origin = pos;
    
        this.boardObject.pins.forEach(function(element, index, array) {
            var color = this.pinColors.other;
            
            for (var key in this.pinColors) {
                if(element.default.indexOf(key) > -1) {
                    color = this.pinColors[key];
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
    }
    
    this.setPinClick = function(func){
        this.canvas.setLayerGroup('pins', {
            click: func
        });
    }
};