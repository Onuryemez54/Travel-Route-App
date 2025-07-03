import { linkStyle } from "./linkStyle";

describe("linkStyle", () => {
  it("returns correct class when isActive is true", () => {
    const result = linkStyle({ isActive: true });
    expect(result).toContain("text-green-400");
    expect(result).toContain("after:scale-x-100");
  });

  it("returns correct class when isActive is false", () => {
    const result = linkStyle({ isActive: false });
    expect(result).toContain("text-stone-200");
    expect(result).toContain("after:scale-x-0");
  });
});
