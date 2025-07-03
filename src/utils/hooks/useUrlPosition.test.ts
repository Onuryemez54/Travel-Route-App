import { renderHook } from "@testing-library/react";
import { useUrlPosition } from "./useUrlPosition";
import { useSearchParams } from "react-router-dom";
import type { Mock } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("useUrlPosition hook", () => {
  it("should return lat and lng from URL", () => {
    const mockParams = new URLSearchParams({ lat: "40.1", lng: "29.9" });
    (useSearchParams as Mock).mockReturnValue([mockParams]);

    const { result } = renderHook(() => useUrlPosition());

    expect(result.current).toEqual([40.1, 29.9]);
  });

  it("should return null if lat/lng are invalid", () => {
    const mockParams = new URLSearchParams({ lat: "abc", lng: "xyz" });
    (useSearchParams as Mock).mockReturnValue([mockParams]);

    const { result } = renderHook(() => useUrlPosition());

    expect(result.current).toEqual([null, null]);
  });

  it("should return null if lat/lng are missing", () => {
    const mockParams = new URLSearchParams();
    (useSearchParams as unknown as Mock).mockReturnValue([mockParams]);

    const { result } = renderHook(() => useUrlPosition());

    expect(result.current).toEqual([0, 0]);
  });
});
