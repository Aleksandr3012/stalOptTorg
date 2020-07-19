$(function() {
	
	//placeholder
	$(function(){
		$('input[placeholder], textarea[placeholder]').placeholder();
	});
	
	/* PIE */
	if (window.PIE) {
		$('nav').each(function() {
		PIE.attach(this);
		});
	}

	$(".slider").jCarouselLite({
		hoverPause: true,
		btnGo: [".1", ".2", ".3", ".4", ".5"],
		speed: 1000,
		visible: 1,
		btnNext: ".next",
		btnPrev: ".prev",
		auto: 3000,
		mouseWheel: false,
		afterEnd:
			function(a, to, btnGo) {
				if(btnGo.length <= to){
					to = 0;
				}
				$(".goActive").removeClass("goActive");
				$(btnGo[to]).addClass("goActive");
			}
	});

	jQuery(function(){
		jQuery(".lb").lightBox();
	});

	$('.modal-pop-up').magnificPopup({
		type:'inline'
	});

	$('.custom-input-time__input').change(function () {
		$(this).parents('form').find('.toggle-wrap-input-js').toggle().toggleClass('active');
	});

	var gets = function () {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");

		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}

		return b;
	}(); // form


	$("form").submit(function (e) {
		e.preventDefault();
		var th = $(this);
		var data = th.serialize();
		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
		$.ajax({
			url: 'action.php',
			type: 'POST',
			data: data
		}).done(function (data) {
			$.magnificPopup.close();
			$.magnificPopup.open({
        items: {
          src: '#modal-thanks', // can be a HTML string, jQuery object, or CSS selector
          type: 'inline'
			}
		});

			setTimeout(function () {
				// Done Functions
				th.trigger("reset"); // $.magnificPopup.close();
				// ym(53383120, 'reachGoal', 'zakaz');
				// yaCounter55828534.reachGoal('zakaz');
			}, 4000);
		}).fail(function () {});
	});

	JSCCommon.inputMask();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');


});

var JSCCommon = {

	inputMask() {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	},

	tabscostume: function tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).closest('.' + tab).find('.' + tab + '__content').find(".form-wrap__input").val('').removeAttr("required");
			$(this).closest('.' + tab).find('.' + tab + '__content').eq($(this).index()).find(".form-wrap__input").attr("required", "required");
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
			$(this).closest('.' + tab).find('.' + tab + '__content2').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active'); // берем значение с активного таба 

			var specific = $('.tabs__btn.active').text(); // устанавливаем значение активного таба в форму

			$(".form-wrap__model").val($(this).text());
			$(".section-title__model").text($(this).text());
		});
	},

	modalCall() {
		$(".modal-pop-up").click(function(){
			let th= $(this);
			let modal = $(th.attr('href'));
			let content = {
				order : th.data('order')
			};
			modal.find('.order').val(content.order);
		});
		// $(".modal-close-js").click(function () {
		// 	$.fancybox.close();
		// });
		// $.fancybox.defaults.backFocus = false;
	}
};
