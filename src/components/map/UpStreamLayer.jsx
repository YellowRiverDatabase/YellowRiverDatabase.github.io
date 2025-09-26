import React, { useEffect, useState } from "react";
import { IconLayer } from "deck.gl";
import {
  upstreamChoicesState,
  upstreamDataState,
  upstreamState,
  visibilityState,
} from "../site/globalState";
import { useRecoilState, useRecoilValue } from "recoil";

function svgIcon() {
  return `<svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="black"
    >
      <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 280q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>`;
}

function svgVillageIcon() {
  return `<svg width="1600px" height="1600px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 19.9999V9.82831C14 9.29787 13.7893 8.78916 13.4142 8.41409L10.4142 5.41409C9.63317 4.63304 8.36684 4.63304 7.58579 5.41409L4.58579 8.41409C4.21071 8.78916 4 9.29787 4 9.82831V17.9999C4 19.1045 4.89542 19.9999 5.99998 19.9999L9 19.9999M14 19.9999L19 19.9999C20.1046 19.9999 21 19.1045 21 17.9999V12.8284C21 12.2979 20.7893 11.7892 20.4142 11.4141L18.4142 9.41415C17.6332 8.6331 16.3668 8.6331 15.5858 9.41415L14 10.9999M14 19.9999L9 19.9999M9 19.9999V15.9999" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

function svgToDataURL(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function UpStreamLayer() {
  const visibility = useRecoilValue(visibilityState);
  const [upstream, setUpstream] = useRecoilState(upstreamState);
  const upStreamData = useRecoilValue(upstreamDataState);
  const [snapshot, setSnapshot] = useRecoilState(upstreamChoicesState);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/YellowRiverDatabase/geodata/main/atlas_data/upstream-data.json"
      );
      const data = await res.json();
      setUpstream(data);
    };
    getData();
  }, []);

  // useEffect(() => {
  //   console.log("upstream: ", upstream);
  //   console.log("upStreamDat", upStreamData);
  // }, [upstream, upStreamData]);

  useEffect(() => {
    const snapShots = [...new Set(upstream.map((d) => d.date))];
    const snaps = snapShots.sort((a, b) => b - a);
    const me = Object.fromEntries(snaps.map((d) => [d, false]));
    setSnapshot(me);
  }, [upstream]);

  const Layer = new IconLayer({
    id: "upstream-layer",
    data: upStreamData,
    pickable: true,
    sizeScale: 10,
    visibility: visibility["Upstream Places"],
    getPosition: (d) => [d.x_coor, d.y_coor],
    getIcon: (d) => ({
      url: svgToDataURL(svgVillageIcon()),
      width: 250,
      height: 250,
      mask: true,
    }),
    getSize: (d) => d.size * 2,
  });

  return Layer;
}
