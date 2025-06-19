/// <reference types="vite/client" />

interface ViteTypeOptions {
	strictImportMetaEnv: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
	readonly VITE_PORT: number
	readonly VITE_API_URL: string
}

