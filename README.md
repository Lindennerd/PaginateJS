# PaginateJS
This is a simple, yet very customizable, pagination snippet written on plain-old vanilla Javascript.
##Installation
You can clone this repo or download the minified file [here](https://raw.githubusercontent.com/Lindennerd/PaginateJS/master/SRC/paginate.min.js)

After that, all you have to do is add a reference to this script on your HTML.


```HTML
<script src="~/Scripts/Shared/paginate.js"></script>
```

Aditionally, you may install it using [bower](https://bower.io/)

```
bower install paginatejs
```
##How To Use
Usage is pretty straightforward. Just create a paginate object and supply the options as desired

```javascript
var paginate = new Paginate({
    source: /path/to/my/data, //the url with the JSON resource
    container: '#pagination', //the container element where the pagination template will render itself
    callback: function (requests){
        //callback actions
      });
    }
});

paginate.render(); // the function to render it all
```

Your server code _MUST_ return the paged data _AND_ the total of itens in the full collection. There is an option that can be used to specify the name os the fields for this return.

here is a full list of the options:

* __source__: the resource path
* __params__: object with the additional parameters definition to use in the server request
* __container__: the container element where the pagination template will render itself,
* __page__: the page number,
* __pageSize__: the page size,
* __total__: you may pass the total of elements,
* __fields__: a javascript object with the specification of the return of the server. The default is {Total: 'Total', Data: 'Items'},
* __callback__: a callback to run after the rendering,
* __template__: a HTML template. Specify the page number and the max pages by using the mustache-like syntax ({{page}} and {{maxPages}})
