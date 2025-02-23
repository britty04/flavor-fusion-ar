
declare module 'fabric' {
  export namespace fabric {
    interface IObjectOptions {
      id?: string;
      name?: string;
    }

    class Canvas {
      constructor(element: HTMLCanvasElement | string, options?: any);
      add(...objects: Object[]): Canvas;
      remove(...objects: Object[]): Canvas;
      renderAll(): Canvas;
      dispose(): void;
      toJSON(propertiesToInclude?: string[]): any;
      loadFromJSON(json: string, callback?: Function): void;
      getObjects(): Object[];
      setActiveObject(object: Object): Canvas;
      toDataURL(options?: any): string;
      width?: number;
      height?: number;
      selection: boolean;
      on(event: string, handler: Function): Canvas;
    }

    class Object {
      set(options: IObjectOptions): Object;
      scale(value: number): Object;
      opacity: number;
      width?: number;
      height?: number;
    }

    class Image extends Object {
      static fromURL(url: string, callback: (image: Image) => void): void;
    }

    class Circle extends Object {
      constructor(options?: any);
    }

    class Rect extends Object {
      constructor(options?: any);
    }
  }
}
