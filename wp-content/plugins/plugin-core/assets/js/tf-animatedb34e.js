(function( $ ) {
    "use strict";

    var themesflat_animation_fadeup = function (container, item) {
        $(window).scroll(function () {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(container).each(function (index, value) {
                var objectBottom = $(this).offset().top + $(this).outerHeight() * 0.1;
                
                if (objectBottom < windowBottom) { 
                    var seat = $(this).find(item);
                    for (var i = 0; i < seat.length; i++) {
                        (function (index) {
                            setTimeout(function () {
                                seat.eq(index).addClass('tfanimated');
                            }, 200 * index);
                        })(i);
                    }
                }
            });
        }).scroll();
    };
    var themesflat_animation_classes_fadeup = function () {
        themesflat_animation_fadeup(".tf-animated-column-elementor", ".elementor-column");
    };

    var themesflat_animation_mousemove = function (container, element) {
        $(container).mousemove(function(e){
            var amountMovedX = (e.pageX * 0.1 / 20);
            var amountMovedY = (e.pageY * 0.1 / 20);
            $(this).find(element).css({
              '-webkit-transform' : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              '-moz-transform'    : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              '-ms-transform'     : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              '-o-transform'      : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
              'transform'         : 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)'
            });
        });
    };
    var themesflat_animation_mousemove_classes = function () {
        themesflat_animation_mousemove(".tf-mousemove",".bg-img");
    };

    var themesflat_animation_fadeleft = function (container, item) {
        $(window).scroll(function () {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(container).each(function (index, value) {
                var objectBottom = $(this).offset().top + $(this).outerHeight() * 0.1;
                
                if (objectBottom < windowBottom) { 
                    var seat = $(this).find(item);
                    for (var i = 0; i < seat.length; i++) {
                        (function (index) {
                            setTimeout(function () {
                                seat.eq(index).addClass('tfanimated');
                            }, 200 * index);
                        })(i);
                    }
                }
            });
        }).scroll();
    };
    var themesflat_animation_classes_fadeleft = function () {
        themesflat_animation_fadeleft(".tf-animated-fadeleft", ".elementor-widget-container");
    };

    var themesflat_animation_faderight = function (container, item) {
        $(window).scroll(function () {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(container).each(function (index, value) {
                var objectBottom = $(this).offset().top + $(this).outerHeight() * 0.1;
                
                if (objectBottom < windowBottom) { 
                    var seat = $(this).find(item);
                    for (var i = 0; i < seat.length; i++) {
                        (function (index) {
                            setTimeout(function () {
                                seat.eq(index).addClass('tfanimated');
                            }, 300 * index);
                        })(i);
                    }
                }
            });
        }).scroll();
    };
    var themesflat_animation_classes_faderight = function () {
        themesflat_animation_faderight(".tf-animated-faderight", ".elementor-widget-container");
    };

    var themesflat_animation_fadedown = function (container, item) {
        $(window).scroll(function () {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(container).each(function (index, value) {
                var objectBottom = $(this).offset().top + $(this).outerHeight() * 0.1;
                
                if (objectBottom < windowBottom) { 
                    var seat = $(this).find(item);
                    for (var i = 0; i < seat.length; i++) {
                        (function (index) {
                            setTimeout(function () {
                                seat.eq(index).addClass('tfanimated');
                            }, 300 * index);
                        })(i);
                    }
                }
            });
        }).scroll();
    };
    var themesflat_animation_classes_fadedown = function () {
        themesflat_animation_fadedown(".tf-animated-fadedown", ".elementor-widget-container");
    };

    $(function() {
        themesflat_animation_classes_fadeup();
        themesflat_animation_mousemove_classes();
        themesflat_animation_classes_fadeleft();
        themesflat_animation_classes_faderight();
        themesflat_animation_classes_fadedown();
    });

})(jQuery);