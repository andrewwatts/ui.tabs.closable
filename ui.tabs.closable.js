/*!
 * Copyright (c) 2010 Andrew Watts
 *
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL (GPL_LICENSE.txt) licenses
 * 
 * http://github.com/andrewwatts/ui.tabs.closable
 */
(function() {

var ui_tabs_tabify = jQuery.ui.tabs.prototype._tabify;

jQuery.extend(jQuery.ui.tabs.prototype, {

	_tabify: function() {
		var self = this;

		ui_tabs_tabify.apply(this, arguments);

		// if closable tabs are enable, add a close button
		if (self.options.closable === true) {

			var unclosable_lis = this.lis.filter(function() {
				// return the lis that do not have a close button
				return jQuery('span.ui-icon-circle-close', this).length === 0;
			});

			// append the close button and associated events
			unclosable_lis.each(function() {
				if (!self.options.closableClass || jQuery(this).hasClass(self.options.closableClass)) {
					jQuery(this)
						.append('<a href="#"><span class="ui-icon ui-icon-circle-close"></span></a>')
						.find('a:last')
							.hover(
								function() {
									jQuery(this).css('cursor', 'pointer');
								},
								function() {
									jQuery(this).css('cursor', 'default');
								}
							)
							.click(function() {
								var index = self.lis.index(jQuery(this).parent());
								if (index > -1) {
									// call _trigger to see if remove is allowed
									if (false === self._trigger("closableClick", null, self._ui( jQuery(self.lis[index]).find( "a" )[ 0 ], self.panels[index] ))) return;

									if (self.options.beforeClose) {
										self._trigger('beforeClose', null, self._ui(jQuery(self.lis[index]).find( "a" )[ 0 ], self.panels[index]) );
									}
									// remove this tab
									self.remove(index)
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
