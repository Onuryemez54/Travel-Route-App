export const mockWikiInfo = (place: string) => ({
  title: place,
  description: `${place} largest city in Turkey`,
  extract: "A major city with rich history.",
  coordinates: {
    lat: 41.0082,
    lon: 28.9784,
  },
  thumbnail: {
    source: "https://example.com/image.jpg",
  },
  originalimage: {
    source: "https://example.com/image.jpg",
  },
});

export const mockPlacesList = [
  { xid: "1", name: "Blue Mosque" },
  { xid: "2", name: "Hagia Sophia" },
];

export const mockPlaceDetail = {
  name: "Blue Mosque",
  preview: {
    source: "https://example.com/blue-mosque.jpg",
  },
  wikipedia_extracts: {
    text: "An iconic mosque in Istanbul.",
  },
  point: {
    lat: 41.0082,
    lon: 28.9784,
  },
};
