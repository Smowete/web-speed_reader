/* 
Hongxiao Lyu (Daniel)
Student NO.1664671
04/18/2017
CSE154 - A(I)
TA: Christine Ta
Assignment: NO.3: speedreader.js

This is a java script for the speedreader.html. It defines the behavious of the website.
The speedreader could display some texts token by token, ignoring puctuations, in a 
given speed.
*/

(function() {
    'use strict';
    
    // returns the HTML element get by id
    var $ = function(id) {
        return document.getElementById(id);
    };


    var words = [];
    var timer;
    var interval;
    var curr;
    
    // the main function, run when the window finished onloading
    window.onload = function() {
        $("start").disabled = false;
        $("stop").disabled = true;
        $("start").onclick = start;
        $("stop").onclick = stop;
        $("speed").onchange = changeInterval;
        
        // set the font size of displaying
        $("sizeMedium").onclick = function() {$("output").style.fontSize = "36pt";};
        $("sizeBig").onclick = function() {$("output").style.fontSize = "48pt";};
        $("sizeBigger").onclick = function() {$("output").style.fontSize = "60pt";};
    };
    
    // starts the animation, spliting the given text into words and display them one by one.
    // ignoring any last puctuation at each word. If a word contains such puctuation, it 
    // will last for 2 times the time.
    function start() {
        words = [];
        var words0 = $("textInput").value.split(/[ \t\n]+/);
        var j = 0;
        for (var i = 0; i < words0.length; i++) {
            var word = words0[i];
            if (word.charAt(word.length - 1) == ',' ||
                    word.charAt(word.length - 1) == '.' ||
                    word.charAt(word.length - 1) == '!' ||
                    word.charAt(word.length - 1) == '?' ||
                    word.charAt(word.length - 1) == ';' ||
                    word.charAt(word.length - 1) == ':' ) {
                words[j] = word.substring(0, word.length - 1);
                j++;
                words[j] = word.substring(0, word.length - 1);
            } else {
                words[j] = word;
            }
            j++;
        } 
        curr = 0;
        interval = $("speed").value;
        displayOne();
        timer = setInterval(displayOne, interval);
        $("start").disabled = true;
        $("stop").disabled = false;
    }
    
    // display one word on the output area
    function displayOne() {
        if (curr < words.length) {
            $("output").innerHTML = words[curr];
            curr++;
        } else {
            stop();
        }
    }
    
    // stops the animation, and clear the display area
    function stop() {
        clearInterval(timer);
        timer = null;
        curr = 0;
        $("output").innerHTML = "";
        $("start").disabled = false;
        $("stop").disabled = true;
    }
    
    // change the speed of displaying words.
    function changeInterval() {
        clearInterval(timer);
        interval = $("speed").value; 
        timer = setInterval(displayOne, interval);
    }
    
})();