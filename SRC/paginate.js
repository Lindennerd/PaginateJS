function Paginate(options) {
    'use strict'

    const config = extend(options, {
        source: null,
        params: null,
        container: null,
        page: 0,
        pageSize: 10,
        total: null,
        callback: null,
        fields: {Total: 'Total', Data: 'Items'},
        template: '<div class="ui center aligned segment">'+
                '    <div class="ui center aligned pagination menu">'+
                '        <a id="goToFirstPage" class="icon item">'+
                '            <i class="angle double left icon"></i></a>'+
                '        <a id="goToPreviousPage" class="icon item">'+
                '            <i class="angle left icon"></i>'+
                '        </a>'+
                '        <a class="ui dropdown item">Página {{page}} de {{maxPages}}</a>'+
                '        <a id="goToNextPage" class="icon item">'+
                '            <i class="angle right icon"></i>'+
                '        </a>'+
                '        <a id="goToLastPage" class="icon item">'+
                '            <i class="angle double right icon"></i></a>'+
                '    </div>'+
                '</div>'
    });

    Paginate.prototype.render = function() {
        load(function(resp) {
            var template = config.template.replace('{{page}}', config.page).replace('{{maxPages}}', maxPages());
            var el = document.querySelectorAll(config.container);
            if (!config.container) {
                console.log('indicate a container element');
                return;
            }
            if (el.length > 0) {    
                el[0].innerHTML = template;

                document.querySelector(config.container + " #goToFirstPage").onclick = goToFirstPage; 
                document.querySelector(config.container + " #goToNextPage").onclick = goToNextPage; 
                document.querySelector(config.container + " #goToLastPage").onclick = goToLastPage;
                document.querySelector(config.container + " #goToPreviousPage").onclick = goToPreviousPage;
            }

            if(config.callback){
                config.callback(resp);
            }
        });
    };

    function load(callback){
        var request = new XMLHttpRequest();
        var params = parseLoadParameters();

        request.open('GET', config.source+params, true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            var resp = JSON.parse(request.responseText);
            config.total = resp[config.fields['Total']];
            callback(resp[config.fields['Data']]);

          } else {
            console.log(request.status);
          }
        };

        request.onerror = function(err) {
            console.log(err);
        };

        request.send();
    }

    function parseLoadParameters(){
        var params = '?page='+config.page+'&itensPerPage='+config.pageSize;

        if (config.params) {
            for(var param in config.params){
                if (config.params.hasOwnProperty(param)) { 
                    params += '&'+param+"="+config.params[param];
                }
            }
        }

        return params;
    }

    function maxPages() {
        return Math.round(config.total / config.pageSize);
    };

    function goToNextPage(callback) {
        if (config.page < maxPages()) {
            config.page++;
            Paginate.prototype.render();
        }
    };

    function goToPreviousPage (callback) {
        if (config.page > 0) {
            config.page--;
            Paginate.prototype.render();
        }
    };

    function goToFirstPage (callback) {
            config.page = 0;
            Paginate.prototype.render();
    };

    function goToLastPage (callback) {
        config.page = maxPages();
        Paginate.prototype.render();
    };

    // custom extend function
    function extend (opt, defaultConfig) {     
        var config = {};

        for(var defProp in defaultConfig){
            if (defaultConfig.hasOwnProperty(defProp) && opt[defProp]) {
                config[defProp] = opt[defProp];
            } else {
                config[defProp] = defaultConfig[defProp];
            }
        }

        return config;
    };

}
