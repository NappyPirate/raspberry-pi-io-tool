var DiagramWidget = function(cId, image, type) {
    this.canvas = $('#'+'diagram');
    
    this.setImage = function(source) {
        this.img.src = source;
    }
    
    this.drawImage = function() {
        this.canvas.drawImage({
            draggable: true,
            source: image,
            fromCenter: true,
            x: this.canvas.width() / 2, y: this.canvas.height() / 2
        })
    }
};