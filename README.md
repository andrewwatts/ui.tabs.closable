
Closable Tabs for jQuery UI
=============================

An unobtrusive way to add a close button to jQuery UI tabs.

Demo
-----

Demo of the close button functionality at 
[http://andrew.io/playpen/ui.tabs.closable/demo/][demo]


How To Use
-----------

0. Follow the instructions on the [jQuery UI Tabs][jQuery UI Tabs] site and 
   include the necessary jQuery and jQuery UI files.  Then read through the
   overview at the [jQuery UI Tabs][jQuery UI Tabs] site to get an idea of
   what is possible. 
1. Include the javascript file in your html file or js loader. eg:
        <script type="text/javascript" src="ui.tabs.closable.min.js"></script>
2. add a `closable` option when instatiating the tabs:
        $('#tabs').tabs({closable: true})
3. (optional) If you wish to receive a callback when the close button is 
   clicked you can add a `closableClick` function to the tab options:
        $('#tabs').tabs({
            closable: true,
            closableClick: function(event, ui) {
                // return true to allow the remove of the tab
                // return false to prevent the remove
            }
        });
    
That's it, about as unobtrusive as I could make it.


[demo]: http://andrew.io/playpen/ui.tabs.closable/demo/
[jQuery UI Tabs]: http://jqueryui.com/demos/tabs/

