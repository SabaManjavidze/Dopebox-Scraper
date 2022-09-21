import axios from "axios";
import { load } from "cheerio";
import { base_url } from "../../constants";
import { Episode } from "../../types";
import { episodeFromElement } from "./episodeFromElement";

export async function parseEpisodesFromSeries(
  seasonId: string,
  seasonName: string
) {
  const episodesUrl = `${base_url}/ajax/v2/season/episodes/${seasonId}`;
  const episodesHtml = await axios.get(episodesUrl);
  const $ = load(episodesHtml.data);
  const episodeElements = $("div.eps-item");
  const episodeArr: Episode[] = [];
  episodeElements.each((idx, it) => {
    const episode = episodeFromElement(it, seasonName);
    episodeArr.push(episode);
  });
  return episodeArr;
}
