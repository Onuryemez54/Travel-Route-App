export interface CoordinatesType {
  lat: number;
  lon: number;
}

export interface WikipediaInfoType {
  coordinates: CoordinatesType;
  title: string;
  description: string;
  thumbnail?: string | null;
  extract: string;
}

export type PlacesType = {
  xid: string;
  name: string;
  rate?: number;
};

export type PlaceDetailType = {
  name: string;
  wikipedia_extracts?: { text: string };
  preview?: { source: string };
  wikidata?: string;
  point: { lat: number; lon: number };
};
