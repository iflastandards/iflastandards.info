var canonical = document.createElement('link');
canonical.rel = 'canonical';
canonical.href = pageRDF;
document.head.appendChild(canonical);

var alt_rdf = document.createElement('link');
alt_rdf.rel = 'alternate';
alt_rdf.type = 'application/rdf+xml';
alt_rdf.title = 'RDF/XML';
alt_rdf.href = pageRDF+'.xml';
document.head.appendChild(alt_rdf);

var alt_atom = document.createElement('link');
alt_atom.rel = 'alternate';
alt_atom.type = 'application/atom+xml';
alt_atom.title = 'Atom';
alt_atom.href = 'http://metadataregistry.org/history/feed/vocabulary_id/'+regID+'.atom';
document.head.appendChild(alt_atom);

function gup(name, url, theDefault) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? theDefault : results[1];
}
var docLang = gup('language', Location.href, 'en');
$("#lang_" + docLang).css("border", "3px solid red");

//noinspection ThisExpressionReferencesGlobalObjectJS
(function () {
    $(function () {
        $('pre').addClass('prettyprint');
        return prettyPrint();
    });

}).call(this);

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row

    //TODO: build output and formatting instructions from the context
    var blacklist = ['toolkitDefinition', 'toolkitLabel', 'prefLabel', 'definition', 'inScheme', '@type', 'status'];
    if (typeof d != "undefined") {
        var ownKeys = Object.getOwnPropertyNames(d).sort();
        var property = '';

        var rows = '<table class="pindex_detail">';
        for (i = 0, len = ownKeys.length; i < len; i++) {
            property = ownKeys[i];
            if (typeof property != "undefined" && blacklist.indexOf(property) == -1) {
                rows += '<tr>' + '<td id="detail_key_' + property + '">' + property + ':</td>' + '<td class="definition" id="detail_def_' + property + '">';
                switch(property) {
                    case '@id':
                    case 'broader':
                    case 'narrower':
                    case 'related':
                    case 'inScheme':
                        rows += makeLinkArray(d[property]);
                        break;
                    case 'altLabel':
                    case 'hiddenLabel':
                    case 'prefLabel':
                    case 'ToolkitLabel':
                        rows += makeLiteral(d[property]);
                        break;
                    case 'changeNote':
                    case 'definition':
                    case 'editorialNote':
                    case 'example':
                    case 'historyNote':
                    case 'notation':
                    case 'note':
                    case 'scopeNote':
                    case 'ToolkitDefinition':
                        rows += makeLiteral(d[property]);
                        break;
                    case 'api':
                        rows += makeApi(d[property]);
                        break;
                    default:
                        rows += '"' + d[property] + '"';
                }
            }
            rows += "</td></tr>\n";
        }
        return rows + "</table>";
    }
}

function formatRef(data, classname) {
    if (typeof data != "undefined") {
        if (typeof data.lexicalAlias != "undefined") {
            return '<div class="' + classname + '">' +
                formatCanon(data) + formatLabel(data) +
                '</div>';
        }
        else {
            return '<div class="' + classname + '">' + data + '</div>';
        }
    }
    else {
        return "";
    }
}

function formatCanon(data) {
    if (typeof data["@id"] != "undefined") {
        var url = data["@id"];
        return '<div class="vcanon">' +
            '<a href="' + url + '" title="Canonical URI: ' + url + '">' + makeCurie(url) + '</a>' +
            '</div>';
    }
}

function formatLabel(data) {
    var url = data["@id"];
    return '<div class="vurllabel">' +
        '<a href="' + url + '">' + makeLiteral(data.prefLabel) + '</a> ' +
        '</div>';

}


function formatRefArray(data, classname) {
    var value = "";
    if (typeof data != "undefined") {
        if (data instanceof Array) {
            for (z = 0; z < data.length; ++z) {
                value += formatRef(data[z], classname);
            }
        }
        else {
            value = formatRef(data, classname);
        }
    } else {
        value = "";
    }
    return value;
}

function makeApi(uri) {
    if (typeof uri.replace === "function") {
        if (uri.search('http://api.metadataregistry.org') !== -1) {
            var re = omr_url+'$1';
            var url = uri.replace(/^http\:\/\/api\.metadataregistry.org\/(.*)$/ig, re);
            return '<div class="vurllabel">' + '<a href="' + url + '" title="'+url+'" target=”_blank”>Show/Edit in OMR</div>';
        }
        return uri;
    }
}

function makeCurie(uri) {
    if (typeof uri.replace === "function") {
        regexp = new RegExp(vocabNamespace+"(.*)$", "gi");
        return uri.replace(regexp, prefix + ":$1");
    }
}

function makeUrl(uri) {
    if (typeof uri.replace === "function" ) {
        if(uri.search('#') === -1){
            return uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1www.$2#$3");
        }
        return uri;
    }
}
function makeUri(uri) {
    if (typeof uri.replace === "function") {
        return uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1$2/$3");
    }
}

function makeLinkArray(data) {
    var value = "";
    if (typeof data != "undefined") {
        if (data.constructor === Array) {
            for (z = 0; z < data.length; ++z) {
                value += makeLink(data[z]) + '<br />';
            }
        }
        else {
            value = makeLink(data);
        }
    } else {
        value = "";
    }
    return value;
}

function makeLink(uri) {
    if (typeof uri.replace === "function") {
        return '<a href="' + uri + '">' + uri + '</a>';
    }
}

function makeLiteral(data) {
    if (typeof data != "undefined" && data != null) {
        if (typeof data[docLang] != "undefined") {
            if(Array.isArray(data[docLang])){
                var temp = '';
                var num;
                for (num=0; num < data[docLang].length; num++){
                    temp+='"'+data[docLang][num]+'"<br/>';
                }
                return temp;
            }
            return '"' + data[docLang] + '"';
        }
        if (typeof data.en != "undefined") {
            return makeNotRequestedLanguage(data.en, 'en') ;
        }
        if (data instanceof Object) { //it's only available in a language that's not English'
            var tempe = '';
            for (var key in data){ 
                if(Array.isArray(data[key])){
                    if(tempe != ''){
                        tempe += '<br>'
                    }
                    var langArray = data[key];
                    for (var key2 in langArray){
                        tempe += makeNotRequestedLanguage(langArray[key2], key);
                        tempe += '<br>';
                    }
                }
                else {
                    tempe += makeNotRequestedLanguage(data[key], key);
                }
            }
            return tempe;
        }
    return '"' + data + '"';
     }
    else {
        return "";
    }
}

function makeNotRequestedLanguage(val, lang) {
    return '<span class="notRequestedLanguage">"' + val + '"</span> <span class="notRequestedLanguageCode">@'+lang+' *</span>';
}

function getLanguageCallout(data) {
    if (typeof data != "undefined") {
        if (typeof data[docLang] != "undefined") {
            return "@" + docLang;
        }
        if (typeof data.en != "undefined") {
            return "@en *";
        }
        if (data instanceof Object) { //it's only available in a language that's not English or the requested language'
            var temp = '';
            for (var key in data){ 
                temp = key;
            }
            return '<span class="notRequestedLanguageCode">@'+temp+' *</span>';
        }
    }
    return "@en *";
}

function setFilter() {

    var initFilter = null;
    if (window.location.hash.indexOf('#') > -1) {
        initFilter = window.location.hash.substr(1);
    }
    return initFilter;
}

function setSearch(filter) {
    var table = $("table#pindex").DataTable();
    table
        .search('')
        .column(2).search(filter)
        .draw();
    $('input[type=search]').val(filter);

}

function filterConcepts(obj) {
    return obj["@type"] === "Concept";
}

var initFilter = setFilter();

//make sure we initiate a search when the hash changes
window.onhashchange = function () {
    var initFilter = setFilter();
    setSearch(initFilter);
};

$(document).ready(
    function () {
        var t8lines = 2;
        var dtable = $("#pindex");
        var table = dtable.DataTable({
            "ajax": {
                url: dataSource,
                dataType: 'json',
                cache: true,
                crossDomain: true,
                "dataSrc": function (json) {
                    json.data = json["@graph"].filter(filterConcepts);
                    return json.data;
                }
            },
            "columns": [
                {
                    "orderable": false,
                    "class": 'permalink',
                    "render": function (data, type, row) {
                        if (typeof row["@id"] != "undefined") {
                            var url = makeUrl(row["@id"]);
                            regexp = new RegExp(vocabNamespace+"(.*)$", "gi");
                            var id = row["@id"].replace(regexp, "$1");
                            return '<a id="' + id + '" href="' + url + '" title="permalink: ' + url + '">#</a>';
                        }
                    }
                },
                {
                    "class": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                {
                    "render": function (data, type, row) {
                        return formatCanon(row);
                    }
                }, {
                    "render": function (data, type, row) {
                        return formatLabel(row);
                    }
                },
                {
                    "class": "definition",
                    "render": function (data, type, row) {
                        var definition = makeLiteral(row.definition) + ' ' + getLanguageCallout(row.definition);
                        return formatRefArray( definition, "definition");
                    }
                }
            ],
            "order": [
                [2, 'asc']
            ],
            "lengthMenu": [
                [25, 50, 100, -1],
                [25, 50, 100, "All"]
            ],
            "deferRender": true
        });


     // Handle click on "Expand All" button
    $('#btn-show-all-children').on('click', function(){
        // Enumerate all rows
        table.rows().every(function(){
            // If row has details collapsed
            if(!this.child.isShown()){
                // Open this row
                this.child(format(this.data())).show();
                $(this.node()).addClass('shown');
            }
        });
    });

    // Handle click on "Collapse All" button
    $('#btn-hide-all-children').on('click', function(){
        // Enumerate all rows
        table.rows().every(function(){
            // If row has details expanded
            if(this.child.isShown()){
                // Collapse row details
                this.child.hide();
                $(this.node()).removeClass('shown');
            }
        });
    });

// Add event listener for truncate on draw
        dtable.on('draw.dt', function () {
            if (initFilter) {
                var id = "#" + initFilter;
                var tr = $(id).closest('tr');
                var row = table.row(tr);
                var child = row.child(format(row.data()));
                if (typeof child != "undefined") {
                    child.show();
                    tr.addClass('shown');
                }
                $("div#pindex_filter input").val(initFilter);
            }
        });

// Add event listener for opening and closing details
        dtable.children("tbody").on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });


        $('input[type=search]').on('click', function () {
            if (history.pushState) {
                history.pushState(null, null, document.location.pathname);
            }
            else {
                location.hash = '';
            }
            setSearch('');
        });

        if (initFilter) {
            table.column(2).search(initFilter);
            $("div#pindex_filter input").val(initFilter);
        }

    }

    );

$.fn.dataTableExt.oApi.clearSearch = function (oSettings) {
    var table = $("#pindex").DataTable();
    var clearSearch = $('<img class = "delete" title="Cancel Search" alt="" src="data:image/png;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII="  style="cursor:pointer;padding-left:.5em;" />');
    $(clearSearch).click(function () {
        setSearch('');
        table.search('');
        if (initFilter) {
            initFilter = null;
            var tr = $("#" + initFilter).closest('tr');
            var row = table.row(tr);
            if (typeof row.child(format(row.data())) != "undefined") {
                row.child(format(row.data())).hide();
                tr.removeClass('shown');
            }
            if (history.pushState) {
                history.pushState(null, '', document.location.pathname);
            }
            else {
                location.hash = '';
            }
        }
    });
    $(oSettings.nTableWrapper).find('div.dataTables_filter').append(clearSearch);
    $(oSettings.nTableWrapper).find('div.dataTables_filter label').css('margin-right', '-16px');//16px the image width
    $(oSettings.nTableWrapper).find('div.dataTables_filter input').css('padding-right', '16px');
};

//auto-execute, no code needs to be added
$.fn.dataTable.models.oSettings.aoInitComplete.push({
    "fn": $.fn.dataTableExt.oApi.clearSearch,
    "sName": 'whatever'
});

$(document).ready(function () {
    $.protip({
        defaults: {
            position: 'top-left',
            gravity: true,
            delayIn: 500
        }
    });

    //if the language code is set and in the rtl array, then make the datatable rtl
    var docLang = gup('language', Location.href, 'en');
    if (['ar','dv','fa','ff','he','jv','kk','ks','ku','ms','ml','pa','ps','sd','so','tk','ug','ur','yi'].includes(docLang)){
        document.querySelector("table.dataTable").dir='rtl';
    }

});
