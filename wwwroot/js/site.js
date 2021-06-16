// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

/code for the redirects
    (function ($) {
        $.fn.goTo = function () {

            var offset = $(this).offset().top - 65;

            $('html, body').animate({
                scrollTop: offset + 'px'
            }, 'fast');
            return this; // for chaining...
        }
    })(jQuery);


