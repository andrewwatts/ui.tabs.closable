var TabPanel = function() {
	return {
		activateTab: function(panelId, tabId) {
			var tabPanelId = "#" + panelId;
			var fullTabId = "#" + tabId;

			// show tab link
			$j(fullTabId).show();

			// fire tab select and load zone
			var tabFound = TabPanel.selectTabByIndex(tabPanelId, fullTabId);
			if(tabFound) {
				var zoneId = $j(tabPanelId + "> .t-zone").attr("id");
				var linkHref = $j(fullTabId + ' a').data('href.tabs');

				TabPanel.updateTabZone(zoneId, linkHref);
			}
		},
		selectTabByIndex: function(tabPanelId, activeTabId) {
			var index = $j(tabPanelId + ' li').index($j(activeTabId));
			if(index != -1) {
				$j(tabPanelId).tabs("select", index);
				return true;
			}
			return false;
		},
		updateTabZone: function(zoneId, updateUrl) {
			var zone = Tapestry.findZoneManagerForZone(zoneId);
			if (!zone) return;
			zone.updateFromURL(updateUrl);
		}
	}
}();

Tapestry.Initializer.Tabs = function(spec) {
	var tabPanelId = spec.tabPanelId;
	var config = {
		cache: false,
		closable: true,
		closableClass: 'closable',
		closableClick: function(event, ui) {
			var closeActionUrl = $j(ui.tab).parent().data('closeActionUrl');
			if (closeActionUrl) {
				Tapestry.ajaxRequest(closeActionUrl);
			}

			var tabId = $j(ui.tab).parent().attr("id");
			if (tabId === $j('#'+tabPanelId).data('activeTabId')) {
				$j('#'+tabPanelId).bind('widen:tabActivate', function(event, eventParams) {
					$j(this).unbind(event);
					var zoneInfo = $j('#'+eventParams.tabId).data('tabZoneInfo');
					TabPanel.updateTabZone(zoneInfo.zoneId, zoneInfo.updateUrl);
				});
			}

			return true;
		},
		ajaxOptions: {
			beforeSend : function() {
				return false;
			}
		},
		select : function(event, ui) {
			var activePanelId = $j(ui.panel).parent().attr("id");
			var activeTabId = $j(ui.tab).parent().attr("id");

			$j("#"+activeTabId).show();
			$j('#'+activePanelId).data('activeTabId', activeTabId);

			/* let serverside know what the new active tab is */
			Tapestry.ajaxRequest(spec.selectTabUrl, {
				parameters : {
					tabPanelId : activePanelId,
					tabId: activeTabId
				}
			});

			var zoneId = '#' + $j('#'+tabPanelId + "> .t-zone").attr("id");
			$j(zoneId).empty().prepend($j('.tabLoadingIcon').clone().show());
			var triggerTabRenderEvent = function(event) {
				$j(document).trigger('widen:tabRender',
					[{ tabPanelId: event.data.tabPanelId, tabId: event.data.tabId}] );
				$j(this).unbind(event);
			};
			$j(zoneId).bind(Tapestry.ZONE_UPDATED_EVENT,
				{tabPanelId: activePanelId, tabId: activeTabId}, triggerTabRenderEvent);

			/* let other components like accordion know what tab is active */
			$j('#'+activeTabId).trigger('widen:tabActivate', [{ tabPanelId: activePanelId, tabId: activeTabId }] );
		}
	};

	/* make tabs component */
	var $jtabs = $j('#'+tabPanelId).tabs(config);

	/* find the active tab <a href></a> and activate it - use id on <li> */
	if(spec.activeTabId) {
		TabPanel.selectTabByIndex('#'+tabPanelId, "#" + spec.activeTabId);
	}
};

/* activates the zone for first tab render or on tab eventclick */
Tapestry.Initializer.Tab = function(spec) {
	if (spec.triggerZoneUpdate) {
		TabPanel.updateTabZone(spec.zoneId, spec.updateUrl);
	}

	$j('#'+spec.tabId).data("tabZoneInfo", {
		zoneId : spec.zoneId,
		updateUrl : spec.updateUrl
	});

	$j('#'+spec.tabId).data("closeActionUrl", spec.closeActionUrl);
};