/*!
 * Copyright (c) 2010 Andrew Watts
 *
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL (GPL_LICENSE.txt) licenses
 * 
 * http://github.com/andrewwatts/ui.tabs.closable
 */
(function($) {

var ui_tabs_tabify = $.ui.tabs.prototype._tabify;

$.extend($.ui.tabs.prototype, {

	_tabify: function() {
		var self = this;

		ui_tabs_tabify.apply(this, arguments);

		// if closable tabs are enable, add a close button
		if (self.options.closable === true) {

			var unclosable_lis = this.lis.filter(function() {
				// return the lis that do not have a close button
				return $('span.ui-icon-circle-close', this).length === 0;
			});

			// append the close button and associated events
			unclosable_lis.each(function() {
				if (!self.options.closableClass || $(this).hasClass(self.options.closableClass)) {
					$(this)
						.append('<a href="#"><span class="ui-icon ui-icon-circle-close"></span></a>')
						.find('a:last')
							.hover(
								function() {
									$(this).css('cursor', 'pointer');
								},
								function() {
									$(this).css('cursor', 'default');
								}
							)
							.click(function() {
								var index = self.lis.index($(this).parent());
								if (index > -1) {
									// call _trigger to see if remove is allowed
									if (false === self._trigger("closableClick", null, self._ui( $(self.lis[index]).find( "a" )[ 0 ], self.panels[index] ))) return;

									if (self.options.hideOnClose) {
										//hide tab, instead of removing it
										var tab = $(self.lis[index]);
										tab.hide();

										if (tab.hasClass('ui-state-active')) {
											var numTabs = self.length();
											if (numTabs > 1) {
												var nextTabIndex = index == numTabs-1 ? index-1 : index+1;
												self.select(nextTabIndex);
											}
										}
									}
									else {
										// remove this tab
										self.remove(index)
									}
								}

								// don't follow the link
								return false;
							})
						.end();
				}
			});
		}
	}
});

})(jQuery);
