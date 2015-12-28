# Angular and TypeScript

It is much easier to write Angular with TypeScript.

- Almost everything is a component

```typescript
@component({});
class MyComponent {}
```
<!--  -->
# Angular Components

## Example

A sample ts class with decoration:

```typescript
import {bootstrap} from 'angular';
@component({
  selector: 'app'
});
class App {}
```

The corresponding html

```html
<!DOCTYPE html>
<html>
<head>
  <title>example</title>
</head>
<body>
  <app [prop]='data'></app>
</body>
</html>
```

The corresponding css:

```css
.app {
  display: block;
}
```
<!--  -->
