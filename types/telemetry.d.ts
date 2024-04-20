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

export enum DataFormat {
  tph01 = 'tph01'
}

export interface NodeDetails {
  _id: string;
  nodeId: number;
  features: string[];
  format: DataFormat;
  label: string;
}