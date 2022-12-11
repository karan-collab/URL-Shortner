import * as utils from './utils';
import {Database, open} from 'sqlite';
import * as fs from "fs";
import * as sqlite3 from "sqlite3";


export async function initDatabase() {
    const DB_SOURCE = process.env.DATABASE || "db.sqlite3"
    let db = await open({
        filename: DB_SOURCE,
        driver: sqlite3.Database
    })
    console.log(`Connected to database'${DB_SOURCE}'`)
    const initSchemaQuery = fs.readFileSync('./queries/create_schema.sql').toString();
    await db.run(initSchemaQuery)
    return db
}

export const createShortLink = async (db: Database, longUrl: string): Promise<string> => {
    let shortUrl = '';
    let query = fs.readFileSync('./queries/check_if_exists.sql').toString();
    let exists = true;
    while (exists) {
        shortUrl = utils.generateShortLink();
        const row = await db.get(query, [shortUrl])
        exists = row.exists === 1
    }

    query = fs.readFileSync('./queries/insert_new_link.sql').toString()
    await db.run(query, [shortUrl, longUrl]);
    return shortUrl;
}

export const getExistingShortLink = async (db: Database, shortUrl: string): Promise<string | null> => {
    const query = fs.readFileSync('./queries/get_short_link.sql').toString();
    const row = await db.get(query, [shortUrl])
    if (row === undefined) {
        return null;
    } else {
        return row.long_url
    }
}

export const updateVisitorCounter = async (db: Database, shortUrl: string) => {
    const query = fs.readFileSync('./queries/increment_click_count.sql').toString();
    await db.run(query, [shortUrl])
}

export const getTotalLinkCount = async (db: Database): Promise<number> => {
    const query = fs.readFileSync('./queries/total_urls.sql').toString()
    const row = await db.get(query)
    return row.count
}