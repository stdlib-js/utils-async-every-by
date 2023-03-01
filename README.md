<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# everyByAsync

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Test whether all elements in a collection pass a test implemented by a predicate function.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->



<section class="usage">

## Usage

```javascript
import everyByAsync from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-async-every-by@deno/mod.js';
```

You can also import the following named exports from the package:

```javascript
import { factory } from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-async-every-by@deno/mod.js';
```

#### everyByAsync( collection, \[options,] predicate, done )

Tests whether all elements in a `collection` pass a test implemented by a `predicate` function.

```javascript
function predicate( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next( null, true );
    }
}

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
}

var arr = [ 3000, 2500, 1000 ];

everyByAsync( arr, predicate, done );
/* =>
    1000
    2500
    3000
    true
*/
```

If a `predicate` function calls the `next` callback with a non-truthy test argument, the function stops processing any additional `collection` elements and returns `false` for the test result.

```javascript
function predicate( value, index, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        if ( index === 1 ) {
            return next( null, false );
        }
        next( null, true );
    }
}

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
}

var arr = [ 3000, 2500, 1000 ];

everyByAsync( arr, predicate, done );
// => false
```

The function accepts the following `options`:

-   `limit`: the maximum number of pending invocations at any one time. Default: `infinity`.
-   `series`: `boolean` indicating whether to sequentially invoke the `predicate` function for each `collection` element. If `true`, the function sets `options.limit=1`. Default: `false`.
-   `thisArg`: the execution context for `fcn`.

By default, all elements are processed concurrently, which means that the function does **not** guarantee completion order. To process each `collection` element sequentially, set the `series` option to `true`.

```javascript
function predicate( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next( null, true );
    }
}

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
}

var arr = [ 3000, 2500, 1000 ];

var opts = {
    'series': true
};

everyByAsync( arr, opts, predicate, done );
/* =>
    3000
    2500
    1000
    true
*/
```

To limit the maximum number of pending function invocations, set the `limit` option.

```javascript
function predicate( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next( null, true );
    }
}

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
}

var arr = [ 3000, 2500, 1000 ];

var opts = {
    'limit': 2
};

everyByAsync( arr, opts, predicate, done );
/* =>
    2500
    3000
    1000
    true
*/
```

To set the execution context of the `predicate` function, set the `thisArg` option.

```javascript
function predicate( value, next ) {
    this.count += 1;
    setTimeout( onTimeout, value );
    function onTimeout() {
        next( null, true );
    }
}

var arr = [ 3000, 2500, 1000 ];

var context = {
    'count': 0
};

var opts = {
    'thisArg': context
};

everyByAsync( arr, opts, predicate, done );

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
    // => true

    console.log( context.count );
    // => 3
}
```

When invoked, the `predicate` function is provided a maximum of four arguments:

-   `value`: collection value.
-   `index`: collection index.
-   `collection`: the input `collection`.
-   `next`: a callback which should be called once the `predicate` function has finished processing a collection `value`.

The actual number of provided arguments depends on function `length`. If the `predicate` function accepts two arguments, the `predicate` function is provided `value` and `next`. If the `predicate` function accepts three arguments, the `predicate` function is provided `value`, `index`, and `next`. For every other `predicate` function signature, the `predicate` function is provided all four arguments.

```javascript
function predicate( value, i, collection, next ) {
    console.log( 'collection: %s. %d: %d', collection.join( ',' ), i, value );
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next( null, true );
    }
}

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
}

var arr = [ 3000, 2500, 1000 ];

everyByAsync( arr, predicate, done );
/* =>
    collection: 3000,2500,1000. 0: 3000
    collection: 3000,2500,1000. 1: 2500
    collection: 3000,2500,1000. 2: 1000
    1000
    2500
    3000
    true
*/
```

#### everyByAsync.factory( \[options,] predicate )

Returns a `function` which invokes a `predicate` function once for each element in a `collection`.

```javascript
function predicate( value, next ) {
    setTimeout( onTimeout, value );
    function onTimeout() {
        console.log( value );
        next( null, true );
    }
}

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    console.log( bool );
}

var f = everyByAsync.factory( predicate );

var arr1 = [ 3000, 2500, 1000 ];

f( arr1, done );
/* =>
    1000
    2500
    3000
    true
*/

var arr2 = [ 300, 250, 100 ];

f( arr2, done );
/* =>
    100
    250
    300
    true
*/
```

The function accepts the same `options` as `everyByAsync()`.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   A `collection` may be either an [`Array`][mdn-array], [`Typed Array`][mdn-typed-array], or an array-like [`Object`][mdn-object] (excluding `strings` and `functions`).
-   If a provided function calls the `next` callback with a truthy `error` argument, the function suspends execution and immediately calls the `done` callback for subsequent `error` handling.
-   The function does **not** support dynamic `collection` resizing.
-   The function does **not** skip `undefined` elements.
-   If provided an empty `collection`, the function calls the `done` callback with `true` as the test result.
-   **Neither** `everyByAsync` nor the function returned by the `factory` method **guarantee** asynchronous execution. To guarantee asynchrony, wrap the `done` callback in a function which either executes at the end of the current stack (e.g., `nextTick`) or during a subsequent turn of the event loop (e.g., `setImmediate`, `setTimeout`).

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var resolve = require( 'path' ).resolve;
import readFile from 'https://cdn.jsdelivr.net/gh/stdlib-js/fs-read-file@deno/mod.js';
import everyByAsync from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-async-every-by@deno/mod.js';

var files = [
    resolve( __dirname, 'package.json' ),
    resolve( __dirname, 'README.md' )
];

function done( error, bool ) {
    if ( error ) {
        throw error;
    }
    if ( bool ) {
        console.log( 'Successfully read all files.' );
    } else {
        console.log( 'Was unable to read all files.' );
    }
}

function predicate( file, next ) {
    var opts = {
        'encoding': 'utf8'
    };
    readFile( file, opts, onFile );

    function onFile( error ) {
        if ( error ) {
            return next( null, false );
        }
        next( null, true );
    }
}

everyByAsync( files, predicate, done );
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/utils-async/any-by`][@stdlib/utils/async/any-by]</span><span class="delimiter">: </span><span class="description">test whether at least one element in a collection passes a test implemented by a predicate function.</span>
-   <span class="package-name">[`@stdlib/utils-every-by`][@stdlib/utils/every-by]</span><span class="delimiter">: </span><span class="description">test whether all elements in a collection pass a test implemented by a predicate function.</span>
-   <span class="package-name">[`@stdlib/utils-async/every-by-right`][@stdlib/utils/async/every-by-right]</span><span class="delimiter">: </span><span class="description">test whether all elements in a collection pass a test implemented by a predicate function, iterating from right to left.</span>
-   <span class="package-name">[`@stdlib/utils-async/for-each`][@stdlib/utils/async/for-each]</span><span class="delimiter">: </span><span class="description">invoke a function once for each element in a collection.</span>
-   <span class="package-name">[`@stdlib/utils-async/none-by`][@stdlib/utils/async/none-by]</span><span class="delimiter">: </span><span class="description">test whether all elements in a collection fail a test implemented by a predicate function.</span>
-   <span class="package-name">[`@stdlib/utils-async/some-by`][@stdlib/utils/async/some-by]</span><span class="delimiter">: </span><span class="description">test whether a collection contains `n` elements which pass a test implemented by a predicate function.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/utils-async-every-by.svg
[npm-url]: https://npmjs.org/package/@stdlib/utils-async-every-by

[test-image]: https://github.com/stdlib-js/utils-async-every-by/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/utils-async-every-by/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/utils-async-every-by/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/utils-async-every-by?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/utils-async-every-by.svg
[dependencies-url]: https://david-dm.org/stdlib-js/utils-async-every-by/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/utils-async-every-by/tree/deno
[umd-url]: https://github.com/stdlib-js/utils-async-every-by/tree/umd
[esm-url]: https://github.com/stdlib-js/utils-async-every-by/tree/esm
[branches-url]: https://github.com/stdlib-js/utils-async-every-by/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/utils-async-every-by/main/LICENSE

[mdn-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[mdn-object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

<!-- <related-links> -->

[@stdlib/utils/async/any-by]: https://github.com/stdlib-js/utils-async-any-by/tree/deno

[@stdlib/utils/every-by]: https://github.com/stdlib-js/utils-every-by/tree/deno

[@stdlib/utils/async/every-by-right]: https://github.com/stdlib-js/utils-async-every-by-right/tree/deno

[@stdlib/utils/async/for-each]: https://github.com/stdlib-js/utils-async-for-each/tree/deno

[@stdlib/utils/async/none-by]: https://github.com/stdlib-js/utils-async-none-by/tree/deno

[@stdlib/utils/async/some-by]: https://github.com/stdlib-js/utils-async-some-by/tree/deno

<!-- </related-links> -->

</section>

<!-- /.links -->
