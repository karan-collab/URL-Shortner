import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import * as utils from './utils';
import * as dao from './dao';
import {Database} from "sqlite";

// import environment variables from .env file
dotenv.config();

// initialize the express app
const app: Express = express();
const PORT = process.env.PORT || 8002;
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// set up the static file server
app.use('/static', express.static('static'));

let db: Database | null = null;

(async () => {
    db = await dao.initDatabase();
})()


// index route
app.get('/', async (req: Request, res: Response) => {
    const linkCount = await dao.getTotalLinkCount(db!);
    res.render('index', {linkCount})
});


// create new link
app.post('/', async (req: Request, res: Response) => {
    const linkCount = await dao.getTotalLinkCount(db!)
    const url: string = req.body.longurl
    if (!utils.isValidUrl(url)) {
        res.render('index', {
            err_msg: `<strong>'${utils.truncateWithEllipses(url, 20)}'</strong> is not a valid URL.`,
            linkCount
        })
    } else if (url.length > 2048) {
        res.render('index', {
            err_msg: 'The URL entered is invalid (>2048 chars)',
            linkCount
        })
    } else {
        let shortLink = await dao.createShortLink(db!, url);
        res.render('index', {
            success: true,
            shortLink,
            linkCount
        })
    }
});

// re-director
app.get('/:shortLink', async (req: Request, res: Response) => {
    const shortLink: string = req.params.shortLink;
    const longUrl: string | null = await dao.getExistingShortLink(db!, shortLink);
    if (longUrl != null) {
        await dao.updateVisitorCounter(db!, shortLink)
        res.redirect(302, longUrl)
    } else {
        res.render('404', {
            shortUrl: shortLink
        })
    }
})


// Start listening at the specified port
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
