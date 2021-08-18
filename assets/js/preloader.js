function preloaderFadeOutInit(){
    $('.preloader').fadeOut('slow');
    $('body').attr('');
    }
    // Window load function
    jQuery(window).on('load', function () {
    (function ($) {
    preloaderFadeOutInit();
    })(jQuery);
    });