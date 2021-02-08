// https://heropy.blog/2020/01/27/typescript/

export interface Dictionary<T> {
    [index: string]: T
}
export type CellRendererProps = {
    grid: any
    rowKey: any
    columnInfo: any
}

export type TypeObjectOptions<T> =
    | T
    | {
          type?: T
          options?: Dictionary<any>
          styles?: Record<
              string,
              string | ((props: CellRendererProps) => string)
          >
          attributes?: Record<
              string,
              string | ((props: CellRendererProps) => string)
          >
          classNames?: string[]
      }

const a = "제네릭";
console.log(a);
