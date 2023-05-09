export interface Flight {
  number: string;
  carrier: string;
  airplaneModel: AirplaneModel;
  flightStartDate: Date;
}

export enum AirplaneModel {
  Boeing737 = 'Boeing 737',
  AirbusA320 = 'Airbus A320',
  EmbraerE190 = 'Embraer E190',
}