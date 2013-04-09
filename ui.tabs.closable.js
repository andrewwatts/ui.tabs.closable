/*!
 * Copyright (c) 2010 Andrew Watts
 * Copyright (c) 2013 Roman Shestakov
 *
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL (GPL_LICENSE.txt) licenses
 *
 * a version of closable tabs control for jQuery UI 1.9
 * forked from the original version for jQuery 1.8
 * from repo http://github.com/andrewwatts/ui.tabs.closable
 * extended by R.Shestakov - http://github.com/RomanShestakov/ui.tabs.closable.git
 * also with added a "Loading.." indicator
 * copied from gist - https://gist.github.com/scottgonzalez/962848
 */

(function() {
    $.widget( "ui.tabs", $.ui.tabs, {
	options: {
	    spinner: "<em>Loading&#8230;</em>",
	    closable: false
	},
	_create: function() {
	    this._super( "_create" );
	    this._on({
		tabsbeforeload: function( event, ui ){
		    if( !this.options.spinner ) {
			return;
		    }
		    var span = ui.tab.find( "span" ),
		    html = span.html();
		    span.html( this.options.spinner );
		    ui.jqXHR.complete(function() {
			span.html( html );
		    });
		}
	    });
	},

	_removeTab: function( index ) {
	    index = this._getIndex( index );
	    var options = this.options;
	    tab = this.tabs.eq( index ).remove(),
	    panel = this._getPanelForTab( tab ).remove();

	    if( tab.hasClass( "ui-tabs-active" ) && this.anchors.length > 2 ) {
		this._activate( index + ( index + 1 < this.anchors.length ? 1 : -1 ));
	    };
	    this._refresh();
	},

	_processTabs: function() {
	    this._super( "_processTabs" );
	    var self = this;
	    var lis = this.tablist.children( ":has(a[href])" );
	    lis.children("a").css('outline', 'none');

	    if (this.options.closable === true) {
		var unclosable_lis = lis.filter(function() {
                    return $('.ui-closable-tab', this).length === 0;
		});

		// append the close button and associated events
		unclosable_lis.each(function() {
                    $(this)
			.append('<a href="#"><span class="ui-icon ui-icon-circle-close ui-closable-tab"></span></a>')
			.css('outline', 'none')
			.find('a:last .ui-closable-tab')
                        .hover(
                            function() {
				$(this).addClass('ui-icon-circle-triangle-e');
                                $(this).css('cursor', 'pointer');
                            },
                            function() {
				$(this).removeClass('ui-icon-circle-triangle-e');
				$(this).css('cursor', 'default');
                            }
                        )
                        .click(function(e) {
			    e.preventDefault();
                            var index = lis.index($(e.delegateTarget).parent().parent());
                            if (index > -1) {
                                // remove this tab
                                self._removeTab(index);
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
