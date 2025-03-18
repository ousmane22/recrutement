export interface Country {
    name: {
      common: string;
    };
    cca2: string;
    flags: {
      svg: string;
    };
    idd: {
      root?: string;
      suffixes?: string[];
    };
  }