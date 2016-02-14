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

function parsePica(record, handler) {
	const IN_FIELD = "0";
	const IN_SUBFIELD = "1";
	const IN_VALUE = "2";

	const FIELD_TERMINATOR = "\u001e";
	const SUBFIELD_STARTER = "\u001f";

	handler.startRecord();
	var state = IN_FIELD;
	var fieldName = "";
	var subfieldName = "";
	var value = "";
	for (var i = 0; i < record.length; ++i) {
		var character = record.charAt(i);
		switch(state) {
		case IN_FIELD:
			if (character === SUBFIELD_STARTER) {
				handler.startField(fieldName);
				fieldName = "";
				state = IN_SUBFIELD;
			} else if (character === FIELD_TERMINATOR) {
				handler.startField(fieldName);
				handler.endField();
				fieldName = "";
			} else {
				fieldName = fieldName.concat(character);
			}
			break;
		case IN_SUBFIELD:
			if (character === SUBFIELD_STARTER) {
				handler.subfield("", "");
			} else if (character === FIELD_TERMINATOR) {
				handler.endField();
				state = IN_FIELD;
			} else {
				subfieldName = character;
				state = IN_VALUE;
			}
			break;
		case IN_VALUE:
			if (character === SUBFIELD_STARTER) {
				handler.subfield(subfieldName, value);
				subfieldName = "";
				value = "";
				state = IN_SUBFIELD;
			} else if (character === FIELD_TERMINATOR) {
				handler.subfield(subfieldName, value);
				handler.endField();
				subfieldName = "";
				value = "";
				state = IN_FIELD;
			} else {
				value = value.concat(character);
			}
			break;
		}
	}
	switch (state) {
	case IN_FIELD:
		if (fieldName.length > 0) {
			handler.startField(fieldName);
			handler.endField();
		}
		break;
	case IN_SUBFIELD:
	case IN_VALUE:
		handler.subfield(subfieldName, value);
		handler.endField();
		break;
	}
	handler.endRecord();
}

