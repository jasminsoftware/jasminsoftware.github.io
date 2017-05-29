"use strict";

function clipboardSuccess(e) {
    console.log(e);
}

function clipboardError(e) {
    console.log(e);
}

function toggleVisibility(element, toToggleElementId) {
    var toToggleElement = $('#' + toToggleElementId);
    
    if(toToggleElement === undefined) {
        return;
    }

    var displayValue = toToggleElement.css("display");

    if( displayValue === 'block') {
        toToggleElement.css('display', 'none');
        element.children[0].className = 'fa fa-chevron-down';
    } else {
        toToggleElement.css('display', 'block');
        element.children[0].className = 'fa fa-chevron-up';
    }
}

(function(){

    var menuVisible = false;
    var searchIndexList = window.searchIndexList;
    var substringMatcher = null;
    var search = null;

    function init(){
        $(document).ready(function() {
            $("#menu-button").click(function(){
                showHideMenu();
            });

            $(window).resize(function() {
                hideMenu();
            });

            search = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('keywords'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: searchIndexList
            });

            $('#search .typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                limit: 10,
                name: 'description',
                display: 'description',
                source: search.ttAdapter(),
                templates: {
                    empty: [].join('\n'),
                    suggestion: Handlebars.compile('<a href="{{url}}" class="search-result"><strong>{{description}}</strong></a>')
                }
            });

            // scroll to the sidebar menu item
            $('#sidebar')[0].scrollTop = $('#current-menu-item')[0].offsetTop;
        });
    }

    function showHideMenu(){
        if(menuVisible){
            hideMenu()
        } else {
            showMenu()
        }
    }

    function showMenu(){
        menuVisible = true;
        $("#sidebar").addClass("sidebar-show");
    }

    function hideMenu() {
        menuVisible = false;
        $("#sidebar").removeClass("sidebar-show");
    }

    function highlight(name) {
        alert(name);
    }

    function toggleVisibility(elementId) {
        var element = $('#' + elementId);
        
        if(element === undefined) {
            return;
        }

        var displayValue = element.css("display");

        if( displayValue === 'none') {

        }
    }

    substringMatcher = function(items) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(items, function(i, item) {
                if (substrRegex.test(item.keywords)) {
                    matches.push(item.description);
                }
            });

            cb(matches);
        };
    };

    init();

})();