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
      url: svgToDataURL(svgIcon()),
      width: 250,
      height: 250,
      mask: true,
    }),
    getSize: (d) => d.size,
  });

  return Layer;
}
