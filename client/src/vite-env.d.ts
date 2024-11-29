/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENCAGE_API_KEY: string
    // add any other Vite env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }