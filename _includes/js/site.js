$(document).ready(function() {
  function setCookie(name, value, expirydays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirydays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  }

  new FontFaceObserver( "Raleway" )
    .load()
    .then( function(){
       // TODO: check if it already has the fonts-loaded class
       document.documentElement.className += " fonts-loaded";
       setCookie("fonts-loaded", true, 7)
    });

  // function hasClass(target, className) {
  //   return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
  // }
  //
  // function addClass(target, className) {
  //   if (target.classList) {
  //     target.classList.add(className);
  //   } else {
  //     name = " " + className;
  //     target.className += name;
  //   }
  // }
  //
  // function removeClass(target, className) {
  //   if (target.classList) {
  //     target.classList.remove(className);
  //   } else {
  //     target.className = target.className.replace(className, '');
  //   }
  // }

  // // Variables
  // var $nav = $('.navbar'),
  //     $body = document.getElementsByTagName('body')[0],
  //     $window = $(window),
  //     navOffsetTop = ($nav.offset() != null ? $nav.offset().top : 0),
  //     $document = $(document)

  // function init() {
  //   $window.on('scroll', onScroll);
  //   $window.on('resize', resize);
  // }

  // function resize() {
  //   removeClass($body, 'has-docked-nav');
  //   navOffsetTop = $nav.offset().top;
  //   onScroll()
  // }

  // function onScroll() {
  //   if(navOffsetTop < $window.scrollTop() && !hasClass($body, 'has-docked-nav')) {
  //     addClass($body, 'has-docked-nav');
  //   }
  //   if(navOffsetTop > $window.scrollTop() && hasClass($body, 'has-docked-nav')) {
  //     removeClass($body, 'has-docked-nav');
  //   }
  // }

  // init();

});
