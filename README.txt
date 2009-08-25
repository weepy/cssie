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

How it works
------------

* that parses the stylesheets for rules that match a refex
* replaces CSS rules that match :hover with corresponding rules with .cssie-x
* apply these same rules using the jQuery engine instead
* for :hover and :focus, it then automatically setups up jQuery events that add and remove the .cssie-x class

Usage
-----

* include 'cssie.js' in your page after 'jquery.js'
* $.cssie() on the jQuery.ready event
* You can cause the same behaviour on non MSIE browsers with: $.cssie(true) 

Tested with IE6 and IE7

Author: Jonah Fox
Website: parkerfox.co.uk
License: MIT