/*
 * j(m)Scroll - jQuery Plugin for Infinite Scrolling / Auto Paging
 * A Variation Of Philip Klauzinski's jscroll Plugin (http://jscroll.com)
 */
(function($) {
 $.jmscroll = {
  defaults: {
    debug:false,
    autoTrigger:false,
    autoTriggerUntil:false,
    totalPages:10,
    contentSelector:'',
    nextSelector:'a:last',
    footerSelector:'.footer',
    footerPadding:0,
    footerVisible:true,
    loadingContentDelay:1000,
    progressBarSpeed:10,
    callback:false
  }
 };

 var jmScroll = function($event, options) { //Constructor

  var _data = $event.data('jmscroll'),
      _userOptions = (typeof options === 'function') ? { callback: options } : options,
      _options = $.extend({}, $.jmscroll.defaults, _userOptions, _data || {}),
      _nextHref = $.trim($event.find(_options.nextSelector).first().attr('href') + ' ' + _options.contentSelector)
      _$window = $(window),
      _$document = $(document),
      _$body = $('body');

  $event.data('jmscroll', $.extend({}, _data, {initialized: true, waiting: false, nextHref: _nextHref}));
  if(_options.autoTrigger === true && _options.footerVisible === false) $(_options.footerSelector).hide();
  _wrapInnerContent();
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

  function _setBindings() {
    var $next = $event.find(_options.nextSelector).first();
    if(_options.autoTrigger && (_options.autoTriggerUntil === false || _options.autoTriggerUntil-1 > 0) && _options.totalPages-1 > 0) { //Auto Trigger
      _nextWrap($next);
      _observe();
      if(_options.autoTriggerUntil > 0) { //AutoTriggered Pages
	_options.autoTriggerUntil--;
	_debug('info', 'Auto Triggered Pages Remaining = ' + _options.autoTriggerUntil);
      }
      if(_options.totalPages > 0) { //Total Pages
	_options.totalPages--;
	_debug('info', 'Total Pages Remaining = ' + _options.totalPages);
      }
    }
    else { //Manual Trigger
      _$document.off("scrollstop");  
      if(_options.footerVisible === false) $(_options.footerSelector).show();
      if(_options.totalPages-1 > 0) {
	$next.on('click', function() {
	  _nextWrap($next);
	  _load();
	  _options.totalPages--;
	  _debug('info', 'Total Pages Remaining = ' + _options.totalPages);
	  return false;
	});
      }
      else {
	_debug('info', 'Total Pages Number Reached. Calling destroy()');
	$(_options.nextSelector).remove(); //Remove Next Page Link
	_destroy();
      }
    }
  }

  //Observe The Scroll Event In Order To Trigger The Next Load
  function _observe() {
    _wrapInnerContent();
    _$document.on("scrollstop", function () {
      if(!$event.data('jmscroll').waiting && _$window.scrollTop() + _$window.height() > _$document.height() - $(_options.footerSelector).outerHeight() - _options.footerPadding) {
	_debug('info', _options.footerPadding + 'px From \'' + _options.footerSelector + '\'. Calling load()');
	return _load();
      }
    });
  }

  //Load The Next Set Of Content If Available
  function _load() {
    var $inner = $event.find('div.scroll-wrapper').first(),
    data = $event.data('jmscroll');
    data.waiting = true;
    $inner.append('<div class="scroll-added" />').children('.scroll-added').last().html('<div class="progress-bar"><span></span></div>');

    _progressBar();    

    return $event.animate({scrollTop: $inner.outerHeight()}, _options.loadingContentDelay, function() {
      $inner.find('div.scroll-added').last().load(data.nextHref, function(response, status, xhr) {
      if(status === 'error') {
	_debug('error', 'Error Status Returned From load(). Calling destroy()');
	if(_options.footerVisible === false) $(_options.footerSelector).show();
	$('.progress-bar').hide();
	return _destroy();
      }
      var $next = $(this).find(_options.nextSelector).first();
      data.waiting = false;
      data.nextHref = $next.attr('href') ? $.trim($next.attr('href') + ' ' + _options.contentSelector) : false;
      $('.scroll-next-wrapper', $event).remove(); //Remove The Previous Next Link
      _checkNextHref();
      if(_options.callback) _options.callback.call(this);
      });
    });
  }

  function _progressBar() {
    var counter = 0;
    var interval = setInterval(function() {
      counter++;
      var progressBarWidth = counter%100 * $('.progress-bar').width() / 100;
      $('.progress-bar').find('span').animate({ width: progressBarWidth }, _options.progressBarSpeed);
      if(counter * _options.progressBarSpeed > _options.loadingContentDelay) { //Clear Interval After loadingContentDelay Milliseconds
	clearInterval(interval);
      }
    }, _options.progressBarSpeed); 
  }  

  function _checkNextHref(data) {
    data = data || $event.data('jmscroll');
    if(!data || !data.nextHref) {
      _debug('info', 'No More Data. Calling destroy()');
      if(_options.footerVisible === false) $(_options.footerSelector).show();
      _destroy();
      return false;
    }
    else {
      _setBindings();
      return true;
    }
  }

  function _destroy() {
    return _$document.removeData('jmscroll')
      .find('.scroll-wrapper').children().unwrap()
      .filter('.scroll-added').children().unwrap();
  }

  //Safe Console Debug
  function _debug(method) {
    if(_options.debug && typeof console === 'object' && (typeof method === 'object' || typeof console[method] === 'function')) {
      if(typeof method === 'object') {
	var args = [];
	for(var sMethod in method) {
	  if(typeof console[sMethod] === 'function') {
	    args = (m[sMethod].length) ? m[sMethod] : [m[sMethod]];
	    console[sMethod].apply(console, args);
	  }
	  else {
	    console.log.apply(console, args);
	  }
	}
      }
      else {
	console[method].apply(console, Array.prototype.slice.call(arguments, 1));  
      }
    }
  }  

  $.extend($event.jmscroll, { //Expose API Methods
    destroy: _destroy
  });
  return $event;
 };

 //Define the jmScroll Plugin Method
 $.fn.jmscroll = function(method) {
    return this.each(function() {
      var $this = $(this),
	  data = $this.data('jmscroll');
      if(data && data.initialized) return;
      var jmscroll = new jmScroll($this, method);
    });
 };
})(jQuery);