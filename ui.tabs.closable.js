/*!
 * Copyright (c) 2010 Andrew Watts
 *
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL (GPL_LICENSE.txt) licenses
 * 
 * http://github.com/andrewwatts/ui.tabs.closable
 */
(function() {

var ui_tabs_tabify = $.ui.tabs.prototype._processTabs;

$.extend($.ui.tabs.prototype, {

    _processTabs: function() {
        var self = this;
        
		ui_tabs_tabify.apply(this, arguments);

        // if closable tabs are enable, add a close button
        if (self.options.closable === true) {
            
			var unclosable_lis = this.tabs.filter(function() {
                // return the lis that do not have a close button
                return $('span.ui-icon-circle-close', this).length === 0;
            });
            
			// append the close button and associated events
            unclosable_lis.each(function() {
                $(this)
                    .append('<a href="#" style="padding-top: 0.5em;padding-right: 0.2em;float:left;"><span class="ui-icon ui-icon-circle-close" style="display:inline-block;margin-left:-0.5em;" ></span></a>')
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
                            var index = self.tabs.index($(this).parent());
                            if (index > -1) {
                                // call _trigger to see if remove is allowed
                                if (false === self._trigger("closableClick", null, $(self.tabs[index]).find( "a" )[ 0 ])) return;

                                // remove this tab
                                self.tabs[index].remove();
                            }

                            // don't follow the link
                            return false;
                        })
                    .end();
            });
        }
    }
});
    
})(jQuery);
