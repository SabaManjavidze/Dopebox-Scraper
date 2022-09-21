import axios from "axios";
import { load, CheerioAPI, Cheerio } from "cheerio";
import { base_url, episode_url } from "../../constants";
import { convertToBase64 } from "../General/Base64";

export async function videoListParse(episodeId: string = "1205689") {
  const { data: vidSerResp } = await axios.get(
    `${base_url}/${episode_url}/${episodeId}`
  );
  let $ = load(vidSerResp);
  // get embed id
  const getVidID = $("a:contains(Vidcloud)").attr("data-id");
  const vidUrl = `${base_url}/ajax/get_link/${getVidID}`;
  const getVidApi = await axios.get(vidUrl);
  const getVideoEmbed = getVidApi.data.link;
  const videoEmbedId = getVideoEmbed.split("/")[4].split("?")[0];
  const parsedUrl = new URL(getVideoEmbed);
  // encoding to base 64
  const domain = btoa(`${parsedUrl.protocol}://${parsedUrl.host}:443`);
  const callVideolink = await axios.get(getVideoEmbed, {
    headers: { referrer: base_url },
  });
  /*
   this is where I'm unable to do anything, because getVideoEmbed doesn't provide re-captcha key.
  */
}
