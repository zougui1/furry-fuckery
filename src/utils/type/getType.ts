export const getType = (value: unknown): Type => {
  if (Array.isArray(value)) {
    return 'array';
  }

  if(value === null) {
    return 'null';
  }

  return typeof value;
}

export type Type = (
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'array'
  | 'null'
)

const t = typeof BigInt
