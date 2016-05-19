# Hide Slides

Plugin for Reveal.js that prevents users from viewing slides bigger than a configured numbers

## Configuration
Hide slides depends on jQuery, so you should configure your dependencies to include it

```javascript
// Optional reveal.js plugins
dependencies: [{
        src: 'https://code.jquery.com/jquery-2.2.3.min.js',
        async: true
    }, {
        src: 'plugin/hide-slides/index.js',
        async: true
}]
```

The path to the configuration file should be placed inside the reval configuration section

```javascript
Reveal.initialize({
  limits: {
    path: 'limits/limits.json'
  }
)}

```

The configuration bellow will not allow slides beyond horizontal 10 and vertical 9 to be presented.

```json
{
    "h" : 10,
    "v" : 9
}

```
