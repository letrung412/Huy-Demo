import * as path from 'path';
import * as dotenv from 'dotenv';

export async function ReadConfig() {
    dotenv.config();
    const resolvedir = (dir) => dir ? path.resolve(process.cwd(), dir) : undefined;
    const config = {
        server: {
            port: +process.env.PORT || 3000,
        },
        database: {
            db_url: process.env.DB_URL,
            db_name: process.env.DB_NAME,
        },
        app: {
            dir: resolvedir("../frontend/build"),
        }
    };
    Object.defineProperty(config.database, 'db_url', {
        enumerable: false
    });
    return config;
}
