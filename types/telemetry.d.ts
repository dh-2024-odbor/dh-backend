export interface Telemetry {
  i: number,
  t: number,
  d: {
    t: number,
    h: number,
    p: number,
    [key: string]: number
  }
}