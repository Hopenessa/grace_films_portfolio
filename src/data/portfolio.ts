export const films = [
  {
    id: "the-milk",
    title: "The Milk",
    description:
      "Every morning, a farmer delivers milk to his community, and every morning, the world gets a bit more beautiful. But when a weary guest arrives at the farm, she begins to suspect that the happiness he's offering comes at a price.",
    image: `${import.meta.env.BASE_URL}images/the-milk-preview.jpg`,
    youtubeUrl: "https://www.youtube.com/watch?v=wGR7iEz85II",
  },
  {
    id: "the-audience",
    title: "The Audience",
    description:
      "When a film student hears an unseen audience laughing at her pain, her search for answers spirals into obsession as she begins to believe this attention is coming from the divine.",
    image: `${import.meta.env.BASE_URL}images/the-audience-preview.jpg`,
    youtubeUrl: "https://www.youtube.com/watch?v=XpGqKUjOMqs",
  },
  {
    id: "the-provider",
    title: "The Provider",
    description:
      "The father provides for his family. The father provides for his family. The father provides for his family.",
    image: `${import.meta.env.BASE_URL}images/the-provider-preview.jpg`,
    youtubeUrl: "https://www.youtube.com/watch?v=kC78G7SCLrI",
  },
  {
    id: "running-late",
    title: "Running Late",
    description:
      "A woman is preparing for a date to the theater, but realizes too late that she forgot to feed her dog...",
    image: `${import.meta.env.BASE_URL}images/running-late-preview.jpg`,
    youtubeUrl: "https://youtu.be/1NOYp07MKcY",
  },
] as {
  id: string;
  title: string;
  description: string;
  image: string;
  youtubeUrl: string;
}[];
export const screenplays = [
  {
    id: "bloodstock",
    title: "Bloodstock",
    genre: "TV series | Pilot",
    description:
      "After breaking down on a rural Louisiana highway, a young woman is welcomed into the care of an esteemed ranch family, unaware the matriarch uses her sons to lure in victims for her cannibalistic desires.",
    cover: `${import.meta.env.BASE_URL}images/bloodstock-cover.png`,
    previewPdf: `${import.meta.env.BASE_URL}screenplays/bloodstock-pilot-teaser.pdf`,
    pageCount: 13,
    fullTeaser: true,
  },
  {
    id: "the-milk-script",
    title: "The Milk",
    genre: "Short film",
    description: films[0].description,
    cover: `${import.meta.env.BASE_URL}images/the-milk-poster.png`,
    previewPdf: `${import.meta.env.BASE_URL}screenplays/the-milk-preview.pdf`,
    pageCount: 10,
  },
  {
    id: "carmilla",
    title: "Carmilla",
    genre: "Play script",
    description:
      "Styria, Austria, 1872. Laura's secluded life changes when a mysterious young woman arrives after a carriage accident. A stage adaptation of Sheridan Le Fanu's novella.",
    previewPdf: `${import.meta.env.BASE_URL}screenplays/carmilla-preview.pdf`,
    pageCount: 10,
  },
] as {
  id: string;
  title: string;
  genre: string;
  description: string;
  previewPdf: string;
  pageCount: number;
  fullTeaser?: boolean;
  cover?: string;
}[];
export const contact = {
  email: "graceoliviadarling@gmail.com",
  instagram: "https://www.instagram.com/gracedarlin.g/",
} as {
  email: string;
  instagram: string;
};
