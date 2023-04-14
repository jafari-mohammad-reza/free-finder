import cheerio from 'cheerio';
import axios from "axios";

import {writeFileSync} from "fs";
export async function searchForMovie(title:string,limit:number){
    try {
        const baseUrl = 'https://movie4kto.net';
        const response = await  axios.get(`${baseUrl}/search/${title.replaceAll(" " ,"-")}`)
        const $ =  await cheerio.load(response.data);
        const results = [];
        $(".flw-item").each((_, element) => {
            const titleContainer = $(element).find(".film-detail");
            const foundTitle = $(titleContainer).find('h2').text().trim();
            const posterContainer = $(element).find(".film-poster");
            const url = baseUrl + $(posterContainer).find("a.film-poster-ahref").attr('href');
            // console.log()
             results.push({ title: foundTitle, url });
        });
        console.log('Search Results:');
        results?.slice(0 , limit).forEach((result, index) => {
            console.log(`${result.title} - ${result.url}`);
        });
    } catch (error) {
        console.error('Error fetching search results');
        return [];
    }
}