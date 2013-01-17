/*!
 * Copyright (c) 2010 Andrew Watts
 *
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL (GPL_LICENSE.txt) licenses
 * 
 * http://github.com/andrewwatts/ui.tabs.closable
 */
(function() {

var ui_tabs_parent = $.ui.tabs.prototype._refresh?$.ui.tabs.prototype._refresh:$.ui.tabs.prototype._tabify;

$.extend($.ui.tabs.prototype, {

    _refresh: function() {
        var self = this,
            lis = this.tablist?this.tablist.children( ":has(a[href])" ):this.lis;
		
        ui_tabs_parent.apply(this, arguments);

        // if closable tabs are enable, add a close button
        if (self.options.closable === true) {

            // append the close button and associated events
            lis.each(function() {
                $(this)
                	.filter(function() {
		                // return the lis that do not have a close button
		                return $('span.ui-icon-circle-close', this).length === 0;
		            })
                        .append('<a href="#"><span class="ui-icon ui-icon-circle-close"></span></a>')
                    .end()
                    .find('a:last')
                        .hover(
                            function() {
                                $(this).css('cursor', 'pointer');
                            },
                            function() {
                                $(this).css('cursor', 'default');
                            }
                        )
                        .click(function(ev) {
                            var index = lis.index($(this).parent());
                            
                            // don't follow the link
                            ev.preventDefault();
                            
                            if (index > -1) {
                                // call _trigger to see if remove is allowed
                                if (false === self._trigger("closableClick", null, self._ui( $(lis[index]).find( "a" )[ 0 ], self.panels[index] ))) return;

                                // remove this tab
                                self.remove(index)
                            }
                        })
                    .end();
            });
        }
    },
    
    // For jQueryUI 1.8 backwards compatibility only
    _tabify: function() {
        this._refresh.apply(this, arguments);
    }
});
    
})(jQuery);
