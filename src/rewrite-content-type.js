(function () {
	chrome.webRequest.onHeadersReceived.addListener(
		function(details) {
			details.responseHeaders.forEach(function(header) {
				var name = header.name.toLowerCase();
				if (name === 'content-type') {
					if (/^application\/x-pica\+/.test(header.value)) {
						console.log('found content-type: ' + header.value);
						var mediaTypeParams = '';
						var matches = /^application\/x-pica\+(;.*)/.exec(header.value);
						if (matches !== null) {
							mediaTypeParams = matches[1];
						}
						header.value = 'text/x-pica' + mediaTypeParams;
						console.log('replacing it with: ' + header.value);
					}
				}
			});
			return { responseHeaders: details.responseHeaders };	
		},
		{
			types: [ 'main_frame', 'sub_frame' ], 
			urls: [ '<all_urls>' ]
		}, 
		[ 'blocking', 'responseHeaders' ]);
})();

