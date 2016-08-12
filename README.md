# PaginateJS
This is a simple pagination, yet very customizable, snippet written on plain-old vanilla Javascript.
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

here is a full list of the options:

* source: the resource path
* container: the container element where the pagination template will render itself,
* page: the page number,
* pageSize: the page size,
* total: you may pass the total of elements,
* callback: a callback to run after the rendering,
* template: a HTML template. Specify the page number and the max pages by using the mustache-like syntax ({{page}} and {{maxPages}})
