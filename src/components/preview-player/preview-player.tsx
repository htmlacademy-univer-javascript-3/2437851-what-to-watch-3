type PreviewPlayerProps = {
  videoLink: string;
  poster: string;
  width: number;
  height: number;
}

function PreviewPlayer({videoLink, poster, width, height}: PreviewPlayerProps): JSX.Element {
  return (
    <video src={videoLink} poster={poster} width={width} height={height} muted autoPlay />
  );
}

export default PreviewPlayer;
