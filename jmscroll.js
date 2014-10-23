/*
 * j(m)Scroll - jQuery Plugin for Infinite Scrolling / Auto Paging
 * A Variation Of Philip Klauzinski's jscroll Plugin (http://jscroll.com)
 */
(function($) {
 $.jmscroll = {
	defaults: {
		autoTrigger:true,
		maxPages:5,
		loadingHtml:'',
		loadingSpeed:0,
		contentSelector:'',
		nextSelector:'a:last',
		footerSelector:'.footer',
		footerPadding:0,
		callback:false
	}
 };

 var jmScroll = function($event, options) { //Constructor

	 var _data = $event.data('jmscroll'),
     	_userOptions = (typeof options === 'function') ? { callback: options } : options,
     	_options = $.extend({}, $.jmscroll.defaults, _userOptions, _data || {}),
     	_nextHref = $.trim($event.find(_options.nextSelector).first().attr('href') + ' ' + _options.contentSelector);

	 $event.data('jmscroll', $.extend({}, _data, {initialized: true, waiting: false, nextHref: _nextHref}));
	 _wrapInnerContent();
	 _preloadImage();
	 _setBindings();

	 function _wrapInnerContent() {
		 if(!$event.find('.scroll-wrapper').length) { //Wrap If It Isn't Already Wrapped
			 $event.contents().wrapAll('<div class="scroll-wrapper" />');
		 }
	 }
	 
     //Find The Next Link's Parent Or Add One And Hide It
     function _nextWrap($next) {
    	 var $parent = $next.parent().not('.scroll-wrapper,.scroll-added').addClass('scroll-next-wrapper').hide();
    	 if(!$parent.length) {
    		 $next.wrap('<div class="scroll-next-wrapper" />').parent().hide();
    	 }
     }

	 function _preloadImage() {
		 var src = $(_options.loadingHtml).filter('img').attr('src');
		 if(src) {
			 var image = new Image();
			 image.src = src;
		 }
	 }

	 function _setBindings() {
		 var $next = $event.find(_options.nextSelector).first();
		 if(_options.autoTrigger) {
			 _nextWrap($next);
			 if($('body').height() <= $(window).height()) {
				 _observe();
			 }
			 $(window).unbind('.jmscroll').bind('scroll.jmscroll', function() {
				 return _observe();
			 });
			 _options.maxPages--;
		 }
		 else {
			 $(window).unbind('.jmscroll');
			 if(_options.maxPages-1 > 0) {
				 $next.bind('click.jmscroll', function() {
					 _nextWrap($next);
					 _load();
					 _options.maxPages--;
					 return false;
				 });
			 }
			 else {
				 $('a.nextPage').hide(); //Hide Next Page Link
			 }
		 }
	 }

	 //Observe The Scroll Event In Order To Trigger The Next Load
	 function _observe() {
		 _wrapInnerContent();
		 $(document).on("scrollstop", function () {
			 if(_options.maxPages > 0) {
				 if(!$event.data('jmscroll').waiting && $(window).scrollTop() + $(window).height() > $(document).height() - $(_options.footerSelector).outerHeight() - _options.footerPadding) {
					 return _load();
				 }
			 }
		 });
	 }

	 //Load The Next Set Of Content If Available
	 function _load() {
		 var $inner = $event.find('div.scroll-wrapper').first(),
         	 data = $event.data('jmscroll');

		 data.waiting = true;
		 $inner.append('<div class="scroll-added" />')
         	.children('.scroll-added').last()
         	.html('<div class="scroll-loading">' + _options.loadingHtml + '</div>');

		 return $event.animate({scrollTop: $inner.outerHeight()}, _options.loadingSpeed, function() {
			 $inner.find('div.scroll-added').last().load(data.nextHref, function(response, status, xhr) {
				 if(status === 'error') return _destroy();
				 var $next = $(this).find(_options.nextSelector).first();
				 data.waiting = false;
				 data.nextHref = $next.attr('href') ? $.trim($next.attr('href') + ' ' + _options.contentSelector) : false;
				 $('.scroll-next-wrapper', $event).remove(); //Remove The Previous Next Link
				 _checkNextHref();
                 if(_options.callback) _options.callback.call(this);
			 });
		 });
	 }

	 function _checkNextHref(data) {
		 data = data || $event.data('jmscroll');
		 if(!data || !data.nextHref) {
			 _destroy();
			 return false;
		 }
		 else {
			 _setBindings();
			 return true;
		 }
	 }
   
   	 function _destroy() {
		 return $(window).unbind('.jmscroll')
         	.removeData('jmscroll')
         	.find('.scroll-wrapper').children().unwrap()
         	.filter('.scroll-added').children().unwrap();
	 }        

   	 $.extend($event.jmscroll, { //Expose API Methods
   		 destroy: _destroy
   	 });
   	 return $event;
 };
 
 $.fn.jmscroll = function(m) {
	return this.each(function() {
		var $this = $(this),
        	data = $this.data('jmscroll');
		if(data && data.initialized) return;
		var jmscroll = new jmScroll($this, m);
	});
 };
})(jQuery);