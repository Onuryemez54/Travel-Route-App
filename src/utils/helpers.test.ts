import { countryCodeToFlagSrc, formatDate } from "./helpers";

describe("countryCodeToFlagSrc", () => {
  it("should return correct flag URL for lowercase country code", () => {
    const result = countryCodeToFlagSrc("tr");
    expect(result).toBe("https://flagcdn.com/w40/tr.png");
  });

  it("should convert uppercase country code to lowercase in URL", () => {
    const result = countryCodeToFlagSrc("US");
    expect(result).toBe("https://flagcdn.com/w40/us.png");
  });
});

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-06-15");
    const result = formatDate(date);
    expect(result).toBe("June 15, 2024");
  });

  it("should handle different dates", () => {
    const date = new Date("1999-12-31");
    const result = formatDate(date);
    expect(result).toBe("December 31, 1999");
  });
});
