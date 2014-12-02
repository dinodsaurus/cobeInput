/*jshint quotmark: double */
"use strict";
var app = (function($, window, document, undefined) {
  var fontSize = 120,
  init = function () {
    inputField();
    keyboard();
  },
  inputField = function () {
    $( "#textInput" ).focus(function() {
      $(".button").addClass("active");
      $("#small").addClass("active");
      $("#intro").addClass("active");
    }).focusout(function () {
      $(".button").removeClass("active");
      $("#small").removeClass("active");
      $("#intro").removeClass("active");
    });
  },
  keyboard = function () {
    var $input = $( "#textInput" ),
        $metricText = $("#metricText");

    var clearInput = function () {
      $input.val("");
      $("#small").html("Enter your name");
      $(".field").removeClass("active");
      fontSize = 120;
      applyFontSize();
    };
    var applyFontSize = function () {
      $input.css("font-size", fontSize + "px");
      $metricText.css("font-size", fontSize + "px");
    };

    var smallerText = function () {
      if(fontSize < 25 && $metricText.width() > 1050){
        return;
      }
      if($metricText.width() > 1050){
        fontSize--;
        applyFontSize();
        smallerText();
      }else{
        if($input.val().length < 18){
          fontSize = 120;
          applyFontSize();
        }
        if(fontSize < 115){
          fontSize++;
          applyFontSize();
        }

      }
    };

    $("#clearInput").click(function (e) {
      e.preventDefault();
      clearInput();
    });

    $input.keyup(function() {
      if($input.val()){
          $("#small").html("please, <span>" + $input.val() + "</span>, press enter to continue");
          $(".field").addClass("active");
          //resize text
          $metricText.text($input.val());
          smallerText();
      }else{
        clearInput();
      }
    });
  };
  return {
    init: init
  };
})(jQuery, this, this.document);
