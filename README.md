# Pica Vista

Pica Vista is a browser extension for displaying PICA+ library records nicely
formatted in the browser. The extension is built as a web extension and works 
in Firefox and Google Chrome. 

## How are PICA+ records recognized?

Pica Vista attemts to format files if

 * their media type is `text/plain` or `text/x-pica`
 * and the first few characters in the file match the regular rexpression 
   `^\d\d\d. \x1f`. This is a sequence of three digits, followed by any
   character, a space and a field separator.

Please note that Firefox does not display files with a `text/x-pica` media
type in the browser but only downloads them. You can use the 
[Open in Browser](https://addons.mozilla.org/En-us/firefox/addon/open-in-browser/) 
extension to work around this issue.

Google Chrome only opens files with media type `text/plain` in the browser if
they contain no control characters such as the field separators used in in
PICA+. For other `text/*` media types this restriction is not enforced.

