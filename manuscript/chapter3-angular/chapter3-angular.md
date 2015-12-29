# Angular and TypeScript

This chapter is about using Angular and TypeScript. It goes through some of Angular's source code and points out the way TypeScript is used. It is useful to know where things are and how to make sense of the source code in case you want to dig deeper in the srouce.

## Annotations

- Annotations and decorators are practically the same.
- Annotations are Angular specific and are implemented by TypeScript decorators
- There are different type of decorators. Check out the decorators chapter for more details.
- The most commonly used decorators are the class decorators.
- Angular uses class decorators to define component annotation.
- Below is a simple component annotation using a class decorator:

```typescript
@component({ ... });
class MyComponent {}
```

## Interfaces

- Interfaces are used all over the place
- The most notable ones are the *LifeCycle Hooks*
- Angular defines the interfaces and you have to provide the implementation
- Angular defines the `lifeCyle` interfaces in the `link` folder:

```typescript
export interface OnChanges {
  ngOnChanges(changes: {
    [key: string]: SimpleChange
  });
}

export interface OnInit {
  ngOnInit();
}

export interface OnDestroy {
  ngOnDestroy();
}
```

Below is an example of using the `onInit` hook:

```typescript
import {bootstrap} from 'angular';
import {onClick} from 'angular';
@component({
  selector: 'app'
});
class App implements onClick {}
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

