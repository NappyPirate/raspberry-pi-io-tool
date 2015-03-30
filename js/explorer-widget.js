var ExplorerWidget = function(pinTab, propTab){
    this.pinTable = $('#'+pinTab);
    this.propertiesTable = $('#'+propTab);
    
    this.setBoard = function(obj) {
        delete this.boardObject;
        this.boardObject = obj;
        
        
    }
    
    this.selectPin = function(pinName) {
    
    }
    
    
};