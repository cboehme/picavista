/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 Christoph Böhme
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function formatRecord(picaData) {
	const FIELD_CLASSES = { 
		'0' : 'Level0',
		'1' : 'Level1',
		'2' : 'Level2'
	};
	var html = "";
	var handler = {
		startRecord: function() {
			html = html.concat('<dl class="Fields">');
		},
		endRecord: function() {
			html = html.concat('</dl>');
		},
		startField: function(name) {
			var level = name.charAt(0);
			html = html.concat('<dt class="' + FIELD_CLASSES[level] + '">' + name + '</dt><dd><dl class="Subfields">');
		},
		endField: function() {
			html = html.concat('</dl></dd>');
		},
		subfield: function(name, value) {
			if (name.length > 0) {
				if (name === '9' && /[0-9xX]+/.test(value)) {
					valueText = '<a href="' + value + '" />' + value + '</a>';
				} else {
					valueText = value;
				}
				html = html.concat('<dt>' + name + '</dt><dd>' + valueText + '</dd>');
			}
		}
	};
	parsePica(picaData, handler);

	return html;
}
	
function getIdn(picaData) {
	var match = /003@ \u001f0(\d+[xX]?)\u001e/.exec(picaData);
	if (match !== null && match[1] !== undefined) {
		return match[1];
	}
	return "No IDN found";
}

