$(document).ready(function() {

	// add send to tab/panel link
	var windowType = '';
	chrome.runtime.sendMessage({ greeting: 'getType' }, function(response) {
		windowType = response.farewell;

		// add options link
		var sendLink = '';
		if (windowType == 'normal') {
			sendLink += '<div class="hSRGPd-oKdM2c"><a class="hSRGPd keep-ext-sendto" href="#" data-type="panel"><span class="icon icon-external"></span> Send to Panel</a></div>';
		} else {
			sendLink += '<div class="hSRGPd-oKdM2c"><a class="hSRGPd keep-ext-sendto" href="#" data-type="normal"><span class="icon icon-external"></span>Send to Tab</a></div>';
		}
		sendLink += '<div class="hSRGPd-oKdM2c"><a class="hSRGPd keep-ext-collapse" href="#"><span class="icon icon-checkbox"></span> Collapse List View</a></div>';
		sendLink += '<div class="hSRGPd-oKdM2c"><a class="hSRGPd keep-ext-icon" href="#"><span class="icon icon-checkbox"></span> Use alternate icon</a></div>';
		sendLink += '<div class="hSRGPd-oKdM2c"><a class="hSRGPd keep-ext-about" href="http://bit.ly/paneldonate" target="_blank">Support Panel View for Keep</a></div>';

		$('div.hSRGPd-haAclf').prepend(sendLink);
	});

	// send to tab/panel click
	$('div.hSRGPd-haAclf').on('click', '.keep-ext-sendto', function() {
		var url = location.href;
		var type = $(this).attr('data-type');

		chrome.runtime.sendMessage({ greeting: 'create', url: url, type: type }, function(response) {});
	});

	// save on click and reset classes
	$('div.hSRGPd-haAclf').on('click', '.keep-ext-collapse', function(e) {
		e.preventDefault();
		var collapseVal = !($('body').hasClass('collapse-list-view'));

		chrome.storage.sync.set({ 'collapse': collapseVal }, function() {
			if (collapseVal) {
				$('body').addClass('collapse-list-view');
				$('.keep-ext-collapse .icon-checkbox').addClass('checked');
			} else {
				$('body').removeClass('collapse-list-view');
				$('.keep-ext-collapse .icon-checkbox').removeClass('checked');
			}
		});
	}).on('click', '.keep-ext-icon', function(e) {
		e.preventDefault();
		var iconVal = !($('.keep-ext-icon .icon-checkbox').hasClass('checked'));

		chrome.runtime.sendMessage({ greeting: 'icon_alt', icon_alt: iconVal }, function(response) {});

		$('.keep-ext-icon .icon-checkbox').toggleClass('checked');
	});

	// on page load, set the body and checkbox classes
	chrome.storage.sync.get('collapse', function(items) {
		if (items.collapse !== undefined && items.collapse === true) {
			$('body').addClass('collapse-list-view');
			$('.keep-ext-collapse .icon-checkbox').addClass('checked');
		}
	});

	chrome.storage.sync.get('icon_alt', function(items) {
		if (items.icon_alt !== undefined && items.icon_alt === true) {
			$('.keep-ext-icon .icon-checkbox').addClass('checked');
		}
	});

	// hide the drawer on load
	$('.gb_yd.gb_Wb.gb_Zb.gb_Xb.gb_g').removeClass('gb_g');
});
