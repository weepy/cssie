(function($) {
  
  var regex = />|\+|\w\.|:|~|\[/
    
  function fixCSS() {
	$("link").each(function() {
		$.get($(this).attr("href"), function(text) {
			var rules = parseCSS(text);
			fixCSSRules(rules)
		})
	})
  }

  function parseCSS(text) {
	var lines = text.replace(/\n/g, " ").split("}");
	var ret = []
	for(var i in lines) {
		var match = lines[i].match(/^(.*){(.*)/)

		if(match){
			ret.push({selector:match[1],style:match[2]})
		}
	}

	return ret
  }

  function fixCSSRules(rules) {
	$("head").append( $("<style>"))

	var sheet = document.styleSheets[document.styleSheets.length-1]
	var sheet_rules = $.browser.msie ? sheet.rules : sheet.cssRules
    var added = -1
	for(var i=0; i < rules.length; i++) {
		var rule = rules[i];
		if(rule.selector.match(regex)) {
		  var klass = generate_class()
		  applyjQuery( rule.selector, klass )
		  addRule(sheet, rule, added + sheet_rules.length, klass)
		  added ++
		 }	
	}
  }  
 
  function debug(x) {
	  $("body").append(x).append("<br/>")
  }

  function addRule(sheet, rule, i, klass) {
    if($.browser.msie) {
      sheet.addRule("." + klass, rule.style)
    }
	else {
      sheet.insertRule("." + klass + " { " + rule.style + " }", 0)
    }
  }
 
  function removeRule(sheet, i) {
    $.browser.msie ? sheet.removeRule(i) : sheet.deleteRule(i);
  }
  
  var selector_id = 1
  function generate_class() {
    return "cssie-" + selector_id++
  }
  
  function applyjQuery(selector, klass) {
    var hover = false, focus = false
    
    if(selector.match(":hover")) {
      hover = true
      selector = selector.replace(":hover","")
    }
      
    if(selector.match(":focus")) {
      focus = true
      selector = selector.replace(":focus","")
    }
    
    var $$ = $(selector)

    var add = (function(selector, klass) { return function() { 
		$(selector).addClass(klass) } 
	})(selector, klass)

    if(!hover && !focus) {
	  $().ready(add)//.html("<i>klass is "+ klass+ "</i>")
    }
    if(hover) {
	  var del = (function(x) { return function() { $(this).removeClass(x) } })(klass)
      $$.hover(add, del)
    }
    
    if(focus) {
       $$.focus(add).blur(del)
    }
  } 
 
  function applyHover(selector, klass) {

    
        
    var nohover = selector.replace(":hover","")
    $( nohover ).hover(on, off)
    

  }
     
  $.cssie = function(also_fix_non_ie) {
    if($.browser.msie || also_fix_non_ie )
      fixCSS()
  }
 
}(jQuery))

