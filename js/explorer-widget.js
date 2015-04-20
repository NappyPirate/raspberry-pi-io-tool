var ExplorerWidget = function(propTab){
    this.propertyTable = $('#'+propTab);
    
    this.setBoard = function(obj) {
        delete this.boardObject;
        this.boardObject = obj;
    }
    
    this.selectPin = function(pin) {
        this.propertyTable.children('tbody:last').html('');
        var pinObj = this.boardObject.pins[pin - 1];
        
        for (var key in pinObj) {
            if (pinObj.hasOwnProperty(key)) {
                var rowHeader = '<td class="td-left">' + key + '</td>';
                var rowValue = '<td class="td-right">' + pinObj[key] + '</td>';
                
                if (key == 'name')
                {
                    
                }
                else if (key == 'x')
                {   
                    var label = '<label class="label-hover">' + pinObj[key] + '</label>';
                    var input = '<input class="clickedit" type="text" />';
                    var clearfix = '<div class="clearfix"></div>';
                    
                    rowValue = '<td class="td-right">' + label + input + clearfix + '</td>'
                }
                
                var row = '<tr>' + rowHeader + rowValue + '</tr>'; 
                this.propertyTable.children('tbody:last').append(row);
            }
        }
        
        var endEdit = function(e) {
            var input = $(e.target),
                label = input && input.prev();

            label.text(input.val() === '' ? defaultText : input.val());
            input.hide();
            label.show();
            if (typeof resizeElements == 'function') {   
                resizeElements();
            }
        }

        $('.clickedit').hide()
        .focusout(endEdit)
        .keyup(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                endEdit(e);
                return false;
            } else {
                return true;
            }
            if (typeof resizeElements == 'function') {   
                resizeElements();
            }
        })
        .prev().click(function () {
            $(this).hide();
            $(this).next().show().focus();
            if (typeof resizeElements == 'function') {   
                resizeElements();
            }
        });
        resizeElements();
    }
};