$(function() {

    $( ".input-group-append" ).click(function() {
        var span = $( this ).children('span').first();
        span.toggleClass("fa-eye fa-eye-slash");

        var inputField = $(".pwdField").children().first();

        if ( $(inputField).attr("type", "password") ) {

            $(inputField).attr("type", "text");

        } else {
            $(inputField).attr("type", "password");
        }

    });

}); // End of document.ready();