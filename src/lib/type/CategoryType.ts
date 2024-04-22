type CategoryInfo = {
  id: number;
  name: string;
  img: string;
  link?: string;
  season?: Season;
};
type Categories = CategoryInfo[];

type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
