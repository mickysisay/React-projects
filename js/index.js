$(document).ready(function(){
  var topBar=$('.tope-bar').offset().top;
  window.onscroll = function() {
      var currentScroll = $(window).scrollTop();
    //console.log(currentScroll,topBar);
    if (currentScroll >= topBar) {
        $('.tope-bar').addClass('navbar-fixed-top')/*.css({
            position: 'fixed',
            top: '0',
            left: '0'
        })*/;
    } else {
        $('.tope-bar').removeClass('navbar-fixed-top')/*.css({
            position: 'static'
        })*/;
    }
    shower()
    slide();                                                    
                                                          };
function slide(){
  $('.con').slick({
    dots: true,
  infinite: true,
  speed: 500,
  
   slidesToShow : 1, 
  cssEase: 'linear',
     autoplay: true,
  autoplaySpeed: 4000
  });
}
function shower() {
  
    if(document.body.scrollTop < /*(($(document).height())*0.28)*/ ($('#portfolio').offset().top) && document.body.scrollTop >=0){
      $("#aboutlink").addClass("actives");
  $("#portlink").removeClass("actives");    
    }
    else if (document.body.scrollTop >=/* (($(document).height())*0.28)*/ ($('#portfolio').offset().top) && document.body.scrollTop < /*(($(document).height())*0.62)*/($('#contact').offset().top) ) {
       $("#portlink").addClass("actives");
 $("#aboutlink").removeClass("actives"); 
      $("#contactlink").removeClass("actives");
    } else {
      $("#contactlink").addClass("actives");
      $("#portlink").removeClass("actives");
  
    }
};//link scroll smooth
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});});