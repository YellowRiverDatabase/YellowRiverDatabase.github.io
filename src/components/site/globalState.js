import { filter, group } from "d3-array";
import { log } from "deck.gl";
import { atom, selector } from "recoil";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";

export const viewState = atom({
  key: "viewState",
  default: {
    longitude: 109.695,
    latitude: 35.862,
    zoom: 4,
    pitch: 33,
    bearing: 0,
    minZoom: 5,
  },
});

export const yearsState = atom({
  key: "yearsState",
  default: [0, 100],
});

// state for geojson
export const oceansState = atom({
  key: "oceansState",
  default: {},
});

export const isTableState = atom({
  key: "isTableState",
  default: false,
});

export const tableDataState = atom({
  key: "tableDataState",
  default: [],
});

export const tableHeaderState = atom({
  key: "tableHeaderState",
  default: "",
});

// Menus and Modals
export const isEntryModalState = atom({
  key: "isEntryModalState",
  default: true,
});

export const isLayersMenuState = atom({
  key: "isLayersMenuState",
  default: false,
});

export const isNavMenuState = atom({
  key: "isNavMenuState",
  default: false,
});

export const isSourceModalState = atom({
  key: "isSourceModalState",
  default: false,
});

export const sourceModalInfoState = atom({
  key: "sourceModalInfoState",
  default: {},
});

export const dynastiesState = atom({
  key: "dynastiesState",
  default: {},
});

export const erasState = atom({
  key: "erasState",
  default: {},
});

export const visibilityState = atom({
  key: "visibilityState",
  default: {
    "Study Area": false,
    "River Courses": false,
  },
});

export const sliderWidthState = atom({
  key: "sliderWidthState",
  default: 500,
});

/**
 * state for geojson
 */
export const ChinaBorderState = atom({
  key: "ChinaBorderState",
  default: [],
});

export const StudyBorderState = atom({
  key: "StudyBorderState",
  default: [],
});

export const riversState = atom({
  key: "riverState",
  default: [],
});

export const riverRoutesState = selector({
  key: "riverRoutesState",
  get: ({ get }) => {
    const rivers = get(riversState);
    const [start, end] = get(yearsState);
    // // console.log(rivers);
    return rivers.filter((r) => {
      return end > r.properties.yearstart && start < r.properties.yearend;
    });
  },
});

export const studyAreaState = atom({
  key: "studyAreaState",
  default: [],
});

export const eventsState = atom({
  key: "eventsState",
  default: [],
});

export const eventsInStudyAreaState = selector({
  key: "eventsInStudyAreaState",
  get: ({ get }) => {
    const events = get(eventsState);
    const studyBorder = get(StudyBorderState);
    if (events.length === 0) {
      return events;
    }
    if (studyBorder?.length === 0) {
      return events;
    }
    const studyArea = studyBorder?.features?.[0];
    console.log("borderFeature features:", studyArea);
    const filtered = events.filter((e) => {
      // console.log("e:", e);
      const pt = point([e.lat, e.long]);
      return booleanPointInPolygon(pt, studyArea);
    });
    return filtered;
  },
});

export const eventState1 = selector({
  key: "eventState1",
  get: ({ get }) => {
    const ev = get(eventsInStudyAreaState);
    console.log("ev:", ev);
    const newEv = [];
    // ev.forEach((e) => {
    //   const events = e.events;
    //   const reducedEvents = events.map((eventGroup) => {
    //     const events = Object.values(eventGroup)[0];

    //     return events.reduce((acc, event) => {
    //       const existingEvent = acc.find(
    //         (e) => e.en_date_start === event.en_date_start
    //       );

    //       if (existingEvent) {
    //         existingEvent.en_cat = new Set(existingEvent.en_cat);
    //         existingEvent.en_title = new Set(existingEvent.en_title);
    //         existingEvent.en_type = new Set(existingEvent.en_type);
    //         existingEvent.source = new Set(existingEvent.source);
    //       } else {
    //         acc.push({
    //           ch_date: event.ch_date,
    //           en_date_start: event.en_date_start,
    //           en_cat: new Set([event.en_cat]),
    //           en_title: new Set([event.en_title]),
    //           en_type: new Set([event.en_type]),
    //           source: new Set([event.source]),
    //         });
    //       }

    //       return acc;
    //     }, []);
    //   });
    //   newEv.push({ ...e, events: reducedEvents });
    // });
    // console.log("newEv:", newEv);
    return ev;
  },
});

export const typesState = atom({
  key: "typesArrayState",
  default: {},
});

export const filteredEventsState = selector({
  key: "filteredEventsState",
  get: ({ get }) => {
    const ev = get(eventState1);
    // const newEv = get(eventState1);
    // // console.log("ev:", ev);
    // console.log("newEv:", ev);
    const [start, end] = get(yearsState);
    const type = get(typesState);
    const type1 = Object.keys(type).filter((t) => type[t]);
    const typeArray = Object.keys(type).filter((t) => type[t]);
    const updatedEv = ev.map((e) => {
      const eventsArray = e.events.filter((d) => {
        // const arr = Object.keys(d);
        if (typeArray.length === 0) {
          // // console.log("d", d.length);
          return end > d.en_date_start && start < d.en_date_start;
        }
        if (typeArray.length > 0) {
          return (
            end > d.en_date_start &&
            start < d.en_date_start &&
            typeArray.some((type) => d.en_type.includes(type))
          );
        }
      });
      return { ...e, events: eventsArray };
    });
    const filtered = updatedEv.filter((e) => {
      return e.events.length > 0 && e.place_class !== "administrative units";
    });
    // console.log("filtered:", filtered);
    return filtered;
  },
});

export const groupedEventsState = selector({
  key: "groupedEventsState",
  get: ({ get }) => {
    const places = get(eventState1);
    const events = [];
    places.forEach((p) => events.push(...p.events.flat()));
    // events.sort((a, b) => a.en_date_start - b.en_date_start);
    // console.log("individual events:", events);
    const grouped = Array.from(
      group(events, (d) => d.en_date_start),
      ([key, value]) => ({
        date: key,
        events: value,
      })
    );
    // sort grouped by date
    grouped.sort((a, b) => {
      return a.date - b.date;
    });

    return grouped;
  },
});

export const upstreamState = atom({
  key: "upstreamState",
  default: [],
});

export const north_south_dynasties = [
  "Qi",
  "Northern Wei",
  "Western Jin",
  "Wei",
  "Later Qin",
  "Western Wei",
  "Later Zhao",
  "Former Liang",
  "Former Qin",
  "Later Liang",
  "Former Yan",
  "Former Zhao",
  "Eastern Wei",
]; // 220ce-618ce
// group Warring State into Zhou
export const war_states_zhou = ["Zhou", "Warring States"]; // -1046 to -221
export const regime_dates = {
  Ming: [1368, 1644],
  Qing: [1644, 1911],
  "Eastern Han": [25, 220],
  Yuan: [1276, 1368],
  "Western Han": [-202, 9],
  Zhou: [-1046, -256],
  Qin: [-221, -206],
  Tang: [618, 906],
  Song: [960, 1127], // Northern Song
  "Northern and Southern Dynasties": [220, 618],
};

export const upstreamChoicesState = atom({
  key: "upstreamChoicesState",
  default: {},
});

export const upstreamDataState = selector({
  key: "upstreamDataState",
  get: ({ get }) => {
    const upstream = get(upstreamState);
    const options = get(upstreamChoicesState);
    return upstream.filter((d) => {
      return d.regime in options && options[d.regime] === true;
    });
  },
});
