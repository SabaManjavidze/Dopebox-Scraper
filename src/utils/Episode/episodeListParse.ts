import axios from "axios";
import { CheerioAPI, Element, load } from "cheerio";
import { base_url } from "../../constants";
import { Episode } from "../../types";
import { parseEpisodesFromSeries } from "./episodesFromSeries";

export async function episodeListParse() {
  let dataType = "";
  let seasonId = "";
  let episodeList: Episode[] = [];
  let $: CheerioAPI;
  try {
    const res = await axios.get(
      "https://dopebox.to/tv/watch-inside-job-online-hd-73513"
    );
    $ = load(res.data);
    const vidUrl = $("div.detail_page-watch");
    if (!vidUrl) throw new Error("season not found");

    seasonId = vidUrl.attr("data-id") + "";
    dataType = vidUrl.attr("data-type") + ""; // Tv = 2 or movie = 1
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return;
  }
  if (dataType == "2") {
    const seasonUrl = `${base_url}/ajax/v2/tv/seasons/${seasonId}`;
    try {
      const { data: seasonsHtml } = await axios.get(seasonUrl);

      $ = load(seasonsHtml);
      const seasonsElements = $("a.dropdown-item.ss-item");
      const seasonEpisodes: any = [];
      seasonsElements.each((idx: number, it: Element) => {
        const seasonName = load(it).text().trim();
        const seasonEpList = parseEpisodesFromSeries(
          it.attribs["data-id"],
          seasonName
        );
        seasonEpisodes.push(seasonEpList);
      });
      return Promise.all(seasonEpisodes);
      // const arr: any = [];
      // Promise.all(seasonEpisodes).then((value) => {
      //   arr.push(value);
      // });
      // return arr;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return;
    }
  } else {
    const movie = $("a.dropdown-item.ss-item").children()[0];
    const movieUrl = `${base_url}/ajax/movie/episodes/${seasonId}`;
    const episode: Episode = {
      id: $("h2.heading-name").text(),
      epName: $("h2.heading-name").text().trim(),
      epNumber: "",
      url: movieUrl,
    };
    episodeList.push(episode);
  }
  console.log({ episodeList });
  return episodeList;
}
