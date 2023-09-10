import { BaySide } from "./types";

export default function VideoViewer(props:any) {  
  return (
    <div className="flex justify-center mt-20">
      {props.side.side == "atlantic" ? (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HlimPykEcfU?si=MhnO54NUZbESHcvI&amp;controls=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        ""
      )}
    </div>
  );
}
