(function($) {
  
  var regex = />|\+|\w\.|:|~|\[/
    
  function fixCSS() {

    var hoverRules = []
    for(var i=0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i]
      var rules = $.browser.msie ? sheet.rules : sheet.cssRules
      for(var j=0; j< rules.length; j++) {
        var rule = rules[j];
        var selector = rule.selectorText
        if(selector.match(regex)) {
          var klass = generate_class()
          
          applyjQuery( selector, klass )
          
          addRule(sheet, rule, j, klass)
          removeRule(sheet, j+1)
        }
      }
    }
  }
  
  
  function findHandler(selector) {
    for(var i in handlers) {
      var handler = handlers[i]
      if(selector.match(handler))
        return true
    }
    return false
  }
 
  function debug(x) {
	  $("body").append(x).append("<br/>")
  }

  function addRule(sheet, rule, i, klass) {
    if($.browser.msie)
      sheet.addRule("." + selector, rule.style.cssText, i)
    else {
      var ruleText = rule.cssText.replace(rule.selectorText, "")
      sheet.insertRule("." + klass + ruleText, i)
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
    
    if(!hover && !focus)
      $$.addClass(klass)
    
    if(hover) {
      var on = (function(x) { return function() { $(this).addClass(x) } })(klass)
      var off = (function(x) { return function() { $(this).removeClass(x) } })(klass)
      $$.hover(on, off)
    }
    
    if(focus) {
      var on = (function(x) { return function() { $(this).addClass(x) } })(klass)
      var off = (function(x) { return function() { $(this).removeClass(x) } })(klass)
       $$.focus(on).blur(off)
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

