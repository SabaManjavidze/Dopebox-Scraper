import axios from "axios";
import { episodeListParse } from "./utils/Episode/episodeListParse";
import { videoListParse } from "./utils/Video/videoListParse";

async function main() {
  //const season_id=""
  //const res = await axios.get(`${base_url}/ajax/v2/tv/${season_id}`)
  // const arr = await episodeListParse();
  // if (!arr) return;
  // console.log({ arr: arr[0] });
  await videoListParse();
}
main();
