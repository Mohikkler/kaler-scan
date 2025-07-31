/// <reference types="vite/client" />

declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: HTMLElement, opts?: MapOptions);
    addListener(eventName: string, handler: Function): void;
  }
  
  class Marker {
    constructor(opts?: MarkerOptions);
  }
  
  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: Marker): void;
  }
  
  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
  }
  
  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon | Symbol;
  }
  
  interface InfoWindowOptions {
    content?: string | Element;
  }
  
  interface LatLng {
    lat(): number;
    lng(): number;
  }
  
  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
  
  interface Icon {
    url: string;
    scaledSize?: Size;
    anchor?: Point;
  }
  
  interface Size {
    width: number;
    height: number;
  }
  
  interface Point {
    x: number;
    y: number;
  }
  
  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers?: Array<{ [key: string]: any }>;
  }
  
  class LatLng {
    constructor(lat: number, lng: number);
  }
  
  class Size {
    constructor(width: number, height: number);
  }
  
  class Point {
    constructor(x: number, y: number);
  }
}

export {};
