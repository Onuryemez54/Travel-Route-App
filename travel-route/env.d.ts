interface ImportMetaEnv {
  readonly VITE_opencageKey: string;
  readonly VITE_openTripMapKey: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
