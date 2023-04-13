import {Command} from "commander";
const program = new Command();

program
    .name('free-finder')
    .description('CLI to find free content in internet and send link such as music,movie,course,...')
    .version('1.0.0');

program.command('movie')
    .description('search movie base on title')
    .argument('<title>', 'movie title')
    .addHelpCommand(true , "search for movie base on title.")
    .action((title) => {
       // search for movie
    });
program.command('song')
    .description('search song base on title')
    .argument('<title>', 'song title')
    .addHelpCommand(true , "search for song base on title.")
    .action((title) => {
        // search for song
    });

program.command('album')
    .description('search album base on title')
    .argument('<title>', 'album title')
    .addHelpCommand(true , "search for album base on title.")
    .action((title) => {
        // search for album
    });
program.command('course')
    .description('search course base on title')
    .argument('<title>', 'course title')
    .addHelpCommand(true , "search for course base on title.")
    .action((title) => {
        // search for course
    });

program.parse();