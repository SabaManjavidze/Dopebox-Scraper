import axios from "axios";
import { Cheerio, Element, load } from "cheerio";
import { base_url, episode_url } from "../../constants";
import { Episode } from "../../types";

export function episodeFromElement(element: Element, seasonName: string) {
  const $ = load(element);
  const episodeId = element.attribs["data-id"];
  const epNum = $("div.film-detail > div.episode-number").text().trim();
  const epName = $("h3.film-name a").text().trim();
  const episode: Episode = {
    id: episodeId,
    epName: epName,
    epNumber: epNum,
  };
  return episode;
}
