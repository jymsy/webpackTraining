var $ = require('jquery');

$('.show-layer').on('click',  function() {
    var layerid = $(this).data('show-layer');
    require.ensure([], function (require) {
        var login = require('./login/login');
        login.showLayer(layerid);
    });

});

var user = require('./user/user').info();
$('#user').html('name: ' + user.name + ' age: ' + user.age);
