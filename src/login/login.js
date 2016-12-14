require('./login.css');
var $ = require('jquery');

module.exports = {
    initialized: false,
    init: function () {
        if (this.initialized) {
            return;
        }
        var image = require('./taobao.png');
        console.log(image);
        this.initialized = true;
        var self = this;
        var html = require('./login.html');
        $('body').prepend(html);

        $('.hwLayer-ok,.hwLayer-cancel,.hwLayer-close').on('click', function() {
            self.hideLayer();
        });

        //点击或者触控弹出层外的半透明遮罩层，关闭弹出层
        $('.hw-overlay').on('click',  function(event) {
            if (event.target == this){
                self.hideLayer();
            }
        });
    },

    hideLayer: function () {
        $('.hw-overlay').fadeOut();
    },

    showLayer: function (id){
        this.init();
        var layer = $('#'+id),
            layerwrap = layer.find('.hw-layer-wrap');
        layer.fadeIn();
        //屏幕居中
        layerwrap.css({
            'margin-top': -layerwrap.outerHeight()/2
        });

    }
};