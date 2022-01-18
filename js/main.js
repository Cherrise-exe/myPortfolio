requestAnimationFrame(() => {
	const boxes = document.querySelectorAll(".box");
  
	function getIntersectionRatio(i) {
	  const a = [window.scrollY, window.scrollY + window.innerHeight];
	  const b = [boxes[i].offsetTop, boxes[i].offsetTop + boxes[i].clientHeight];
  
	  const max = Math.max(a[0], b[0]);
	  const min = Math.min(a[1], b[1]);
  
	  return Math.max(0, (min - max) / (b[1] - b[0]));
	}
  
	function onScroll() {
	  const boxes = document.querySelectorAll(".box");
	  for (let i = 0; i < boxes.length; i += 1) {
		const intersection = getIntersectionRatio(i);
		const top = boxes[i].offsetTop - window.pageYOffset < 0;
		boxes[i].firstChild.style.cssText = `
		  transform-origin: ${top ? "center center" : "top center"};
		  position: ${top ? "fixed" : "absolute"};
		  transform: scale(${intersection});
		  opacity: ${intersection};
		`;
	  }
	  requestAnimationFrame(onScroll);
	}
	onScroll();
  });

(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });


  // Load Github starred github projects
  const main = $(".main")
  $.ajax({
	  url: "https://api.github.com/users/Cherrise-exe/repos",
	  method: "GET"
  }).then(results => {
	  console.log(results)

	for (let i = 0; i < results.length; i++){
		if(results[i].stargazers_count != 0) {
			let article = "<article><header><h2>" + results[i].name + "</h2></header><p>" + results[i].description + "</p>" + "<ul><li><button><a href=" + results[i].html_url + " target=_blank>Click here to view the Github Repo</a></button></li></ul></article>"
			
			main.append(article)
		  }
	  }
	})

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);
