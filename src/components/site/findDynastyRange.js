import { useRecoilValue } from "recoil";
import { dynastiesState } from "./globalState";

export function findDynastyRange(dynastyName) {
  const dynasties = useRecoilValue(dynastiesState);
  if (Object.keys(dynasties).length === 0) {
    return null;
  }
  const matchedKey = Object.keys(schema).find((key) =>
    key.toLowerCase().includes(dynastyName.toLowerCase())
  );
  return matchedKey ? schema[matchedKey] : null;
}
