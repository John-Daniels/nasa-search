export interface IMedia {
  href: string;
  data: Datum[];
  links: Link[];
}

export interface Datum {
  center: string;
  title: string;
  keywords: string[];
  nasa_id: string;
  date_created: string;
  media_type: string;
  description: string;
}

export interface Link {
  href: string;
  rel: string;
  render: string;
}
