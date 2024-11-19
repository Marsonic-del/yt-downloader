
const sqlite3 = require('sqlite3').verbose();
const categories = require('../config').categories;
let db;

function _connect() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('youtube.db', (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                return reject(err);
            }
            console.log('Connected to SQLite');
            resolve(db);
        });
    });
}

// async function createTables(db) {
//     return new Promise((resolve, reject) => {
//         db.serialize(() => {
//             db.run(`CREATE TABLE IF NOT EXISTS countries (
//                   etag TEXT PRIMARY KEY NOT NULL,
//                   gl TEXT UNIQUE NOT NULL,
//                   name TEXT UNIQUE NOT NULL
//                 )`, (err) => {
//                 if (err) {
//                     console.error('Error creating Countries table:', err.message);
//                     return reject(err);
//                 }
//             });

//             db.run(`CREATE TABLE IF NOT EXISTS videos (
//                 id TEXT NOT NULL PRIMARY KEY,
//                 viewCount INTEGER,
//                 imageUrl TEXT,
//                 title TEXT NOT NULL,
//                 date TEXT NOT NULL,
//                 description TEXT,
//                 duration TEXT
//               )`, (err) => {
//                 if (err) {
//                     console.error('Error creating Videos table:', err.message);
//                     return reject(err);
//                 }
//             });

//             db.run(`CREATE TABLE IF NOT EXISTS categories (
//                 id INTEGER PRIMARY KEY,
//                 name TEXT
//               )`, (err) => {
//                 if (err) {
//                     console.error('Error creating Categories table:', err.message);
//                     return reject(err);
//                 }
//             });

//             db.run(`CREATE TABLE IF NOT EXISTS videos_categories (
//                 video_id TEXT NOT NULL,
//                 category_id INTEGER NOT NULL,
//                 PRIMARY KEY (video_id, category_id),
//                 FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
//                 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
//             )`, (err) => {
//                 if (err) {
//                     console.error('Error creating Videos-Categories table:', err.message);
//                     return reject(err);
//                 }
//             });

//             db.run(`CREATE TABLE IF NOT EXISTS videos_countries (
//                 video_id TEXT NOT NULL,
//                 country_etag TEXT NOT NULL,
//                 PRIMARY KEY (video_id, country_etag),
//                 FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
//                 FOREIGN KEY (country_etag) REFERENCES countries(etag) ON DELETE CASCADE
//             )`, (err) => {
//                 if (err) {
//                     console.error('Error creating Videos-Countries table:', err.message);
//                     return reject(err);
//                 }
//             });

//             resolve();
//         });
//     });
// }

// Helper function to run queries
const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.error('Error running query:', err.message);
                return reject(err);
            }
            resolve();
        });
    });
};

async function createTables(db) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create an array to hold all the promises
            const tableCreationPromises = [];

            // Add all table creation promises
            tableCreationPromises.push(runQuery(`
                CREATE TABLE IF NOT EXISTS countries (
                    etag TEXT PRIMARY KEY NOT NULL,
                    gl TEXT UNIQUE NOT NULL,
                    name TEXT UNIQUE NOT NULL
                )`));

            tableCreationPromises.push(runQuery(`
                CREATE TABLE IF NOT EXISTS videos (
                    id TEXT NOT NULL PRIMARY KEY,
                    viewCount INTEGER,
                    imageUrl TEXT,
                    title TEXT NOT NULL,
                    date TEXT NOT NULL,
                    description TEXT,
                    duration TEXT
                )`));

            tableCreationPromises.push(runQuery(`
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY,
                    name TEXT
                )`));

            tableCreationPromises.push(runQuery(`
                CREATE TABLE IF NOT EXISTS videos_categories (
                    video_id TEXT NOT NULL,
                    category_id INTEGER NOT NULL,
                    PRIMARY KEY (video_id, category_id),
                    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
                    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
                )`));

            tableCreationPromises.push(runQuery(`
                CREATE TABLE IF NOT EXISTS videos_countries (
                    video_id TEXT NOT NULL,
                    country_etag TEXT NOT NULL,
                    PRIMARY KEY (video_id, country_etag),
                    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
                    FOREIGN KEY (country_etag) REFERENCES countries(etag) ON DELETE CASCADE
                )`));

            // Wait for all the table creation promises to resolve
            Promise.all(tableCreationPromises)
                .then(() => {
                    console.log('All tables have been created successfully.');
                    resolve('ok');
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
}


async function connect() {
    try {
        db = await _connect();
        await createTables(db);
        console.log('All tables created successfully.');
        await insertCategories();
        console.log('Categories have been inserted successfully');
        return db;
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

function insertCountry(country) {
    return new Promise((resolve, reject) => {
        const { etag, name, gl } = country;
        db.get('SELECT etag FROM countries WHERE etag = ?', [etag], (err, row) => {
            if (err) {
                console.error('Error querying country:', err.message);
                reject(err);
            }

            if (row) {
                console.log(`Country "${name}" already exists with ID ${row.etag}`);
                resolve();
            } else {
                db.run(`INSERT INTO countries (etag, name, gl) VALUES (?, ?, ?)`, [etag, name, gl], (err) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log(`Country ${name} created`)
                    resolve(country);
                });
            }
        })
    });
}

// function insertCategories() {
//     try {
//         for (const categoryName in categories) {
//             return new Promise((resolve, reject) => {
//                 db.run(`INSERT INTO categories (id, name) VALUES (?, ?)`,
//                     [categories[categoryName], categoryName],
//                     function (err) {
//                         if (err) {
//                             console.error('Error inserting into Categories table:', err.message);
//                             reject(err);
//                         } else {
//                             console.log(`Category '${categoryName}' inserted successfully`);
//                             resolve();
//                         }
//                     });
//             });
//         }
//         console.log('All categories inserted successfully');
//     } catch (err) {
//         console.error('Error inserting categories:', err.message);
//     }
// }

async function insertCategories(categories) {
    return new Promise((resolve, reject) => {
        const insertPromises = [];

        for (const categoryName in categories) {
            insertPromises.push(
                new Promise((resolve, reject) => {
                    db.run(`INSERT INTO categories (id, name) VALUES (?, ?)`,
                        [categories[categoryName], categoryName],
                        function (err) {
                            if (err) {
                                console.error(`Error inserting '${categoryName}' into Categories table:`, err.message);
                                return reject(err);
                            }
                            console.log(`Category '${categoryName}' inserted successfully`);
                            resolve();
                        }
                    );
                })
            );
        }

        // Wait for all insert operations to complete
        Promise.all(insertPromises)
            .then(() => {
                console.log('All categories inserted successfully');
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}


function getCountries() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM countries`, (err, countries) => {
            if (err) {
                return reject(err);
            }
            resolve(countries);
        });
    });
}

function _insertVideo(video) {
    return new Promise((resolve, reject) => {
        const imageUrl = video.snippet.thumbnails.medium.url;
        const title = video.snippet.title;
        const viewCount = video.statistics.viewCount;
        const description = video.snippet?.description;
        const id = video.id;
        const duration = video.contentDetails.duration;
        const date = new Date().toISOString();

        db.run(`INSERT INTO videos (id, imageUrl, title, date, description, duration, viewCount)
        VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, imageUrl, title, date, description, duration, viewCount],
            function (err) {
                if (err) {
                    console.error('Error inserting into Videos table:', err.message);
                    reject(err);
                }
                resolve(id);
            })
    })
}

function _insertVideoCategory(videoId, categoryId) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO videos_categories (video_id, category_id) VALUES (?, ?)`,
            [videoId, categoryId],
            function (err) {
                if (err) {
                    console.log('video_id: ', videoId)
                    console.log('category_id: ', categoryId)
                    console.error('Error inserting into Videos-Categories table:', err.message);
                    return reject(err);
                }
                resolve();
            });
    })
}

function _insertVideoCountry(videoId, countryId) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO videos_countries (video_id, country_etag) VALUES (?, ?)`,
            [videoId, countryId],
            function (err) {
                if (err) {
                    console.error('Error inserting into Videos-Countries table:', err.message);
                    return reject(err);
                }
                resolve();
            });
    })
}

async function createVideo(video, country, categoryToAdd) {
    const videoId = video.id
    function convertIsoToSqliteFormat(isoDate) {
        // Replace 'T' with space and remove the trailing 'Z'
        return isoDate.replace('T', ' ').replace('Z', '');
    }
    try {
        await _insertVideo(video);
        await _insertVideoCategory(videoId, categoryToAdd);
        await _insertVideoCountry(videoId, country)
    } catch (error) {
        console.log(error)
    }
}

function isVideoExist(videoId) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT id FROM videos WHERE id = ?`, [videoId], (err, row) => {
            if (err) {
                console.error('Error querying Videos table:', err.message);
                return reject(err);
            }
            // If a row is found, the video exists
            resolve(!!row);
        });
    });
}

function isVideoCategoryExist(videoId, categoryId) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT 1 FROM videos_categories WHERE video_id = ? AND category_id = ?`,
            [videoId, categoryId],
            (err, row) => {
                if (err) {
                    console.error('Error querying videos_categories:', err.message);
                    return reject(err);
                }
                // If a row is found, the relationship exists
                resolve(!!row);
            }
        );
    });
}
function isVideoCountryExist(videoId, countryId) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT 1 FROM videos_countries WHERE video_id = ? AND country_etag = ?`,
            [videoId, countryId],
            (err, row) => {
                if (err) {
                    console.error('Error querying videos_countries:', err.message);
                    return reject(err);
                }
                // If a row is found, the relationship exists
                resolve(!!row);
            }
        );
    });
}

async function updateVideo(video, country, categoryToAdd) {
    try {
        const videoCategoryExists = await isVideoCategoryExist(video.id, categoryToAdd);
        const videoCountryExists = await isVideoCountryExist(video.id, country)
        if (!videoCategoryExists) {
            await _insertVideoCategory(video.id, categoryToAdd);
        }
        if (!videoCountryExists) {
            await _insertVideoCountry(video.id, country);
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connect,
    insertCountry,
    getCountries,
    createVideo,
    isVideoExist,
    updateVideo
};
