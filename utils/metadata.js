const path = require('path');
const YTDlpWrap = require('yt-dlp-wrap').default;
require('dotenv').config();

const { NODE_ENV } = process.env;

const ytPath = path.join(__dirname, `../YtBinary/${NODE_ENV === 'production' ? 'yt-dlp_linux' : 'yt-dlp.exe'}`)
const ytDlpWrap = new YTDlpWrap(ytPath);

const format_noteFullVideo = ['360p', '360p, THROTTLED', '720p',];
const format_noteVideoOnly = ['240p', '360p', '480', '720p', '1080p',];
const format_noteAudioOnly = ['medium', 'low'];


const getYoutubeMetadata = async (link) => {
    const metadata = await ytDlpWrap.getVideoInfo(link);
    //console.log(Object.keys(metadata))
    // console.log(metadata.formats
    //     .filter(item => item.protocol === 'https' & item.vcodec !== 'none' & item.acodec !== 'none'))
    return metadata;
}

const transformFormat = (format, title = '') => {
    const transformedFormat = {};
    transformedFormat.format_id = format.format_id;
    transformedFormat.format_note = format.format_note;
    transformedFormat.url = format.url + title;
    transformedFormat.language = format.language;
    transformedFormat.ext = format.ext;
    transformedFormat.vcodec = format.vcodec;
    transformedFormat.acodec = format.acodec;
    transformedFormat.filesize = format.filesize === null ? format.filesize_approx : format.filesize;
    return transformedFormat;
}

const transformYtData = (metadata) => {
    const title = metadata.title;
    const thumb = metadata.thumbnail;
    const duration = metadata.duration_string

    // if (metadata.live_status === 'is_live') {
    //     const fullvideos = metadata.formats
    //         .filter(item => item.vcodec !== 'none' & item.acodec !== 'none')
    //     //console.log('fullvideos: ', fullvideos)


    //     const videoOnly = metadata.formats
    //         .filter(item => item.vcodec !== 'none' & item.acodec === 'none')

    //     console.log('videoOnly: ', videoOnly)

    //     const audioOnly = metadata.formats
    //         .filter(item => item.vcodec === 'none' & item.acodec !== 'none')
    //         .map(format => transformFormat(format));
    //     //console.log('audioOnly: ', audioOnly)

    //     return { title, thumb, duration, fullvideos, videoOnly, audioOnly }
    // }

    const fullvideos = metadata.formats
        .filter(item => item.protocol === 'https' & item.vcodec !== 'none' & item.acodec !== 'none' & format_noteFullVideo.includes(item.format_note)).map(format => transformFormat(format, '&title=' + encodeURI(title)))

    const videoOnly = metadata.formats
        .filter(item => item.protocol === 'https' & item.vcodec !== 'none' & item.acodec === 'none' & format_noteVideoOnly.includes(item.format_note))
        .map(format => transformFormat(format));

    const audioOnly = metadata.formats
        .filter(item => item.protocol === 'https' & item.vcodec === 'none' & item.acodec !== 'none' & format_noteAudioOnly.includes(item.format_note))
        .map(format => transformFormat(format));

    return { title, thumb, duration, fullvideos, videoOnly, audioOnly }
}

const getYtData = async (link) => {
    const metadata = await getYoutubeMetadata(link);
    //console.log('metadata: ', metadata.live_status)
    //console.log('metadata formats: ', metadata.formats)
    const data = transformYtData(metadata)
    return data;
}

module.exports = { getYtData, }