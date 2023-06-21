export type Pokemon = {
  name: string;
  url: string;
  img?: string;
};

export type Result={
    count: number,
    next: string,
    previous: null | string,
    results: Pokemon[]
}

export interface MediaCardProps {
  name: string;
  img: string | undefined;
  Add: (data: string) => void;
  save: boolean;
  setSave: (sv: boolean)=> void;
  SaveData:()=>void;
  Remove: (data: string) => void;
}