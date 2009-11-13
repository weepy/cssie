Cssie (pronounced sissy)
========================

CSS in your face (only IE need to apply)

Plugin for jQuery providing native support for missing CSS in IE. Currently provides:

* E > F (direct descendant)
* :hover (normally only available to a tags)
* E + F (sibling)
* [rel=attr] (attribute selection)
* :first-child and any other selectors containing : and supported by jQuery
* :focus 
* .classA.classB (multiple class)

How it works
------------

* that parses the stylesheets for rules that match a regex
* replaces selectors that match with corresponding rules with an internal class .cssie-x (x is an integer)
* add the class cssie-x using the original selector using jQuery
* for :hover and :focus, automatically setup up jQuery events to add/remove the .cssie-x class upon hover/focus

Usage
-----

* include 'cssie.js' in your page after 'jquery.js'
* $.cssie() on the jQuery.ready event
* You can cause the same behaviour on non MSIE browsers with: $.cssie(true) 

Tested with Firefox

Author: Jonah Fox
Website: parkerfox.co.uk
License: MIT