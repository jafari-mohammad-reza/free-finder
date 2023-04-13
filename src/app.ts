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
    .addHelpCommand(true , "search for movie base on title.")
    .action((title) => {
       searchForMovie(title)
    });
program.command('song')
    .description('search song base on title')
    .argument('<title>', 'song title')
    .argument('<artist>', 'song artist')
    .addHelpCommand(true , "search for song base on title.")
    .action((title,artist) => {
        searchForMusic(title,artist)
    });

program.command('album')
    .description('search album base on title')
    .argument('<title>', 'album title')
    .argument('<artist>', 'song artist')
    .addHelpCommand(true , "search for album base on title.")
    .action((title,artist) => {
        searchForMusic(title,artist,"album")
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