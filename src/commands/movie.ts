import cheerio from 'cheerio';
import axios from "axios";
import {logResult} from "../utils/logger";
const parseResults = ($, baseUrl) => {
    return Array.from($(".flw-item"), (element) => {
        const titleContainer = $(element).find(".film-detail");
        const foundTitle = $(titleContainer).find('h2').text().trim();
        const posterContainer = $(element).find(".film-poster");
        const url = baseUrl + $(posterContainer).find("a.film-poster-ahref").attr('href');
        return { title: foundTitle, url };
    });
};

export async function searchForMovie(title: string, limit: number) {
    try {
        const encodedTitle = title.replaceAll(" ", "-");
        let baseUrl = 'https://movie4kto.net';
        const fallbackUrl = `https://fmoviesto.cc/search/${encodedTitle}`;

        const response = await axios.get(`${baseUrl}/search/${encodedTitle}`)
            .catch(async () => await axios.get(fallbackUrl));


        baseUrl = response.request.host === "fmoviesto.cc" ? 'https://fmoviesto.cc' : baseUrl;
        const $ = await cheerio.load(response.data);
        console.log('Result is: \n')
        parseResults($, baseUrl).slice(0, limit).forEach(content => {
            const {url,title} = content
            logResult(title,url)
        });

    } catch (error) {
        console.error('Error fetching search results');
        return [];
    }
}
