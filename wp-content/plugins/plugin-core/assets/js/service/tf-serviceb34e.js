;(function($) {

    "use strict";

    var filterServices = function() {
        $('.list-filter-services .btn-filter').on('click', function(e) {
            e.preventDefault();
            var attrBtn = $(this).data('filter');
            $(this).closest('.list-filter-services').find('.btn-filter').removeClass('active');
            $(this).addClass('active');
            if($('.wrap-services-post .item.'+attrBtn).length) {
                $('.wrap-services-post .item').removeClass('active').addClass('inactive');
                $('.wrap-services-post .item.'+attrBtn).removeClass('inactive').addClass('active');
            }else {
                $('.wrap-services-post .item').removeClass('active');
                $('.wrap-services-post .item').addClass('inactive');
            }
        });
    } 

    var carouselServices = function() {
        $(document).ready(function () {
            $(window).on("resize load", function (e) {
                var newWindowWidth = $(window).width();
                if (newWindowWidth < 767) {
                        $('.tf-services-wrap:not(.style3) .owl-carousel').owlCarousel({
                            items: 1,
                            loop: false,
                            margin: 30,
                            dots: false,
                            smartSpeed: 500,
                            slideSpeed: 500,
                            autoplay: false,
                            autoplayTimeout: 5000,
                            smartSpeed: 850,
                        });
                }else {
                    $('.tf-services-wrap:not(.style3) .owl-carousel').owlCarousel('destroy');
                }
            });
        });
    }


    $(window).on('elementor/frontend/init', function() {        
        elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-service.default', filterServices );
        // elementorFrontend.hooks.addAction( 'frontend/element_ready/tf-service.default', carouselServices );
    });

})(jQuery);
