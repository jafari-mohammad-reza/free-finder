#!/usr/bin/env ts-node

import {Command} from "commander";
import {searchForMovie} from "./commands/movie";
import {searchForMusic} from "./commands/music";
import {searchForCourse} from "./commands/course";

const program = new Command();
program
    .name('free-finder')
    .description('CLI to find free content in internet and send link such as music,movie,course,...')
    .version('1.0.0');

program.command('movie')
    .description('search movie base on title')
    .argument('<title>', 'movie title')
    .option("-l , --limit <limit>" , "the limit of results")
    .addHelpCommand(true , "search for movie base on title.")
    .action((title, {limit}) => {
       searchForMovie(title , limit ? Number(limit) : 10)
    });
program.command('music')
    .description('search music base on title')
    .argument('<title>', 'music title')
    .option("-l , --limit <limit>" , "the limit of results")
    .addHelpCommand(true , "search for music base on title.")
    .action((title,{limit}) => {
        searchForMusic(title,limit ? Number(limit) : 5 )
    });

program.command('course')
    .description('search course base on title')
    .argument('<title>', 'course title')
    .option("-s, --source <source>" , "the source of course")
    .addHelpCommand(true , "search for course base on title.")
    .action((title,resource={source:"udemy"}) => {
        searchForCourse(title , resource.source)
    });

program.parse();
