// Detect the type of click for use
// on the rest of our page in order
// to remove the 300ms delay for touch
// devices.
var CLICK_EVENT = (function() {
  'use strict';

  if ( 'ontouchstart' in window ) {
    return 'touchend';
  }

  return 'click';
})();

// Parallax scrolling module. Self initialised
var Parallax = (function() {

    'use strict';

    // userScrollTop is the value used for
    // the parallax animation. Its more
    // accurate since its set by an interval
    // and not by sporadic scroll events
    var userScrollTop; // The scrollTop value in px.

    // This user scroll reference is used to
    // determine when to start or stop the
    // scroll interval.
    var userScrollTopReference;
    var windowHeight = window.innerHeight;
    var parallaxScrollInterval;
    var intervalRunning = false;

    // Elements to animate.
    var rocks       = $('#rocks'),
        logo        = $('#logo'),
        cloudsFront = $('#clouds-front'),
        cloudsBack  = $('#clouds-back'),
        climber     = $('#climber'),
        water       = $('#water'),
        balloon     = $('#balloon');

    // Interval because onscroll fires more randomly.
    var startInterval = function() {
      if ( userScrollTopReference < windowHeight && !intervalRunning ) {
        parallaxScrollInterval = setInterval(function() { updatePage(); }, 7);
        intervalRunning = true;
      }
    };

    var stopInterval = function() {
      clearInterval(parallaxScrollInterval);
      intervalRunning = false;
    };

    // Request animation frame in order to more efficiently
    // do the parallax scrolling animation.
    var updatePage = function() {
      window.requestAnimationFrame(function() {
        translateElements();
      });
    };

    // set the window height
    var calculateWindowHeight = function() {
      windowHeight = window.innerHeight;
    }

    // The main parallax method, fires with
    // the help of requestAnimationFrame.
    var translateElements = function() {
      userScrollTop = document.all ? iebody.scrollTop : pageYOffset;

      // User scrolled through the parallax area, cancel interval
      // Also, cancel interval if the user reaches the top of
      // the page.
      if ( userScrollTop > windowHeight || userScrollTop === 0) {
        stopInterval();
      }

      // The transforms needed for the parallax scrolling effect.
      logo.css({
        '-webkit-transform': 'translate3d(-50%, ' + (userScrollTop / 2).toFixed(2) + 'px, 0)',
        'transform': 'translate3d(-50%, ' + (userScrollTop / 2).toFixed(2) + 'px, 0)'
      });

      cloudsFront.css({
        '-webkit-transform': 'translate3d(0, ' + (-userScrollTop / 20).toFixed(2) + 'px, 0)',
        'transform': 'translate3d(0, ' + (-userScrollTop / 20).toFixed(2) + 'px, 0)'
      });

      cloudsBack.css({
        '-webkit-transform': 'translate3d(0, ' + (userScrollTop / 5).toFixed(2) + 'px, 0)',
        'transform': 'translate3d(0, ' + (userScrollTop / 5).toFixed(2) + 'px, 0)'
      });

      climber.css({
        '-webkit-transform': 'translate3d(0, ' + (-userScrollTop / 8).toFixed(2) + 'px, 0)',
        'transform': 'translate3d(0, ' + (-userScrollTop / 8).toFixed(2) + 'px, 0)'
      });

      water.css({
        '-webkit-transform': 'translate3d(0, ' + (userScrollTop / 2.5).toFixed(2) + 'px, 0)',
        'transform': 'translate3d(0, ' + (userScrollTop / 2.5).toFixed(2) + 'px, 0)'
      });

      balloon.css({
        '-webkit-transform': 'translate3d(0, ' + (- userScrollTop / 2).toFixed(2) + 'px, 0)',
        'transform': 'translate3d(0, ' + (- userScrollTop / 2).toFixed(2) + 'px, 0)'
      });
    };

    // Add needed event listeners
    window.addEventListener('resize', calculateWindowHeight);
    window.addEventListener('scroll', function() {
      ScrollControl.calculateScrollDistance();
      userScrollTopReference = document.all ? iebody.scrollTop : pageYOffset;
      startInterval();
    });
})();

var Navigation = (function() {

  'use strict';

  var $TRIGGER = $('#navigation__trigger');
  var $NAV = $('#navigation');

  var bindUIActions = function() {
    $TRIGGER.on(CLICK_EVENT, toggleNavigation);
  };

  var toggleNavigation = function() {
    $NAV.toggleClass('navigation--mobile__closed');
    $TRIGGER.find('div').toggleClass('navigation__trigger--opened');
  };

  return {
    init: bindUIActions
  }

})();

var ScrollControl = (function() {

  'use strict';

  var treshold = 5;
  var previousScrollDistance = 0;
  var $NAV = $('#navigation');
  var $WINDOW = $(window);

  /*var bindUIActions = function() {
    window.addEventListener('scroll', calculateScrollDistance);
  };*/

  var calculateScrollDistance = function() {
    var diff = $WINDOW.scrollTop() - previousScrollDistance;

    if(diff > treshold){
      hideMenu();
    }

    if ( diff < -treshold ) {
      showMenu();
    }

    previousScrollDistance = $WINDOW.scrollTop();
  }

  var hideMenu = function() {
    $NAV.addClass('navigation--desktop__closed');
  }

  var showMenu = function() {
    $NAV.removeClass('navigation--desktop__closed');
  }

  return {
    // Used by the scroll listener in the parallax module for now.
    calculateScrollDistance: calculateScrollDistance
  }

})();

var SkillSetWidget = (function() {

  'use strict';

  var $CLICKABLE_HEADING = $('.member__skills__heading');

  var bindUIActions = function() {
    $CLICKABLE_HEADING.on(CLICK_EVENT, function() {
      toggleSkillSet($(this).next('.member__skills__group'));
    });
  }

  var toggleSkillSet = function($group) {
    $group.toggleClass('member__skills__group--opened');
  }

  return {
    init: bindUIActions
  }
})();

$(function() {
  Navigation.init();
  SkillSetWidget.init();
});
