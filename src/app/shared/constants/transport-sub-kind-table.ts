import { TransportSubKind } from "src/app/api/custom_models/transport";

export const transportSubKindTable: {
  kind: TransportSubKind,
  type: 'air' | 'road' | 'sea' | 'rail',
  classes: string[];
  name: string;
}[] = [
    { kind: 'avia_lcl', type: 'air', classes: ['s'], name: 'LCL' },
    { kind: 'avia_fcl', type: 'air', classes: ['e'], name: 'FCL' },
    { kind: 'road_lcl', type: 'road', classes: ['bg','s'], name: 'LCL' },
    { kind: 'road_fcl', type: 'road', classes: ['bg'], name: 'FCL' },
    { kind: 'road_adr', type: 'road', classes: ['bg'], name: 'ADR' },
    { kind: 'road_ref', type: 'road', classes: ['bg'], name: 'REF' },
    { kind: 'sea_teus', type: 'sea', classes: [ 's','e'], name: 'TEUS' },
    { kind: 'sea_lcl', type: 'sea', classes: ['e'], name: 'LCL' },
    { kind: 'sea_sp', type: 'sea', classes: ['e'], name: 'СП' },
    { kind: 'rw_teus', type: 'rail', classes: ['bg', 's'], name: 'TEUS' },
    { kind: 'rw_lcl', type: 'rail', classes: ['bg'], name: 'LCL' },
    { kind: 'rw_sp', type: 'rail', classes: ['bg', 'e'], name: 'СП' },
  ];
