# Pica Vista

Pica Vista is a browser extension for displaying PICA+ library records nicely
formatted in the browser. The extension is built as a web extension and works 
in Firefox and Google Chrome. It is available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/pica-vista/gneoojoegjddgibaljfnnddojmjnokgp).

## How are PICA+ records recognized?

Pica Vista attemts to format files if

 * their media type is `text/plain`, `text/x-pica` or `application/x-pica+'
 * and the first few characters in the file match the regular rexpression 
   `^\d\d\d. \x1f`. This is a sequence of three digits, followed by any
   character, a space and a field separator.

Please note that Firefox does not display files with a `text/x-pica` or
`application/x-pica+` media type in the browser but downloads them (see 
[issue 57342](https://bugzilla.mozilla.org/show_bug.cgi?id=57342)). You
can use the [Open in Browser](https://addons.mozilla.org/En-us/firefox/addon/open-in-browser/)
extension to work around this issue.

Google Chrome only opens files with media type `text/plain` in the browser if
they contain no control characters such as the field separators used by 
PICA+. For other `text/*` media types this restriction is not enforced.

Support for `application/x-pica+` is achieved by rewriting the response 
headers. This works only on Google Chrome as Firefox does not allow the
`content-type` header to be modified by web extensions.