import { useRecoilValue } from "recoil";
import { erasState } from "./globalState";

export function findEraRange(eraName) {
  const eras = useRecoilValue(erasState);
  if (Object.keys(eras).length === 0) {
    return null;
  }
  const matchedKey = Object.keys(schema).find((key) =>
    key.toLowerCase().includes(eraName.toLowerCase())
  );
  return matchedKey ? schema[matchedKey] : null;
}
