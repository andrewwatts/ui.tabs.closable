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

jQuery.extend($.ui.tabs.prototype, {

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
                            var index = self.lis.index($(this).parent());
                            if (index > -1) {
                                // enabling support for beforeClose event
                                if (false === self._trigger("beforeClose", null, self._ui( jQuery(self.lis[index]).find( "a" )[ 0 ], self.panels[index] ))) return;

                                // remove this tab
                                self.remove(index)
                                
                                // triggering afterClose event
                                self._trigger("afterClose", null, self._ui( jQuery(self.lis[index]).find( "a" )[ 0 ], self.panels[index] ));
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
