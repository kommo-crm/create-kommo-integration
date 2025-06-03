declare module '*.local.css' {
  const classes: {
    readonly [key: string]: string;
  };

  export = classes; // This matches the "import * as" behavior
}

declare module '*.png' {
  const content: string;

  export default content;
}

declare module '*.jpg' {
  const content: string;

  export default content;
}

declare module '*.jpeg' {
  const content: string;

  export default content;
}

declare module '*.svg' {
  const content: string;

  export default content;
}

declare module '*.gif' {
  const content: string;

  export default content;
}

declare module 'snakeize' {
  function snakeize(str: string): string;
  function snakeize(obj: object): object;

  export default snakeize;
}

type TodoAny = any;
