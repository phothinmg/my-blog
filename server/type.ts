export interface MdFiles {
  slug: string;
  birthtimeMs: number;
  createAt: Date;
  lastUpdate: Date;
  buff: Buffer<ArrayBufferLike>;
}

export interface PostMeta {
  title?: string;
  date?: string;
  description?: string;
}
export interface MatterResult extends PostMeta {
  body: string;
}
export interface SiteData {
  title?: string;
  description?: string;
  url?: string;
  postsDir?: string;
  pagesDir?: string;
  outDir?: string;
}
