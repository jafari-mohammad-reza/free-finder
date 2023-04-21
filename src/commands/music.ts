import cheerio from "cheerio"
import axios from "axios";

import { contents } from "cheerio/lib/api/traversing";
import {logResult} from "../utils/logger";
function parseData($) {
  const baseUrl = 'https://invidious.nerdvpn.de';
  return Array.from($(".pure-u-1"), (element) => {
    const container = $(element).find(".h-box");
    const linkContainer = $(container).find("a");
    const url = baseUrl + $(container).find(".video-card-row").find(".flex-right").find(".icon-buttons").find("a").filter(function () { return $(this).find(".ion-md-jet") }).next().next().attr("href");
    const title = $(linkContainer).find("p").text();
    return { title, url };
  });
}

export async function searchForMusic(title: string, limit: number) {
  try{
    const songName = title.replaceAll(" ", "+");
    const response = await axios.get(`https://invidious.nerdvpn.de/search?q=${songName}`);
    const $ = cheerio.load(response.data);

    console.log('Result is: \n');
    parseData($)
        .filter(c => c.url.indexOf("undefined") <= 0)
        .slice(1, limit + 1)
        .forEach(content => {
          const { url, title } = content;
          logResult(title.replace(/\d+:\d+(?=\D)/g, ''),url)
        });
  }
catch (error) {
    console.error('Error fetching search results');
    return [];
  }
}
