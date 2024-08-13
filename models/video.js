const mongoose = require('mongoose');

const regionRestriction = new mongoose.Schema({
    allowed: [String],
    blocked: [String]
})

const localizedSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const liveStreamingDetails = new mongoose.Schema({
    actualStartTime: Date,
    actualEndTime: Date,
    scheduledStartTime: Date,
    scheduledEndTime: Date,
    concurrentViewers: Number,
    activeLiveChatId: String,
})

const recordingDetails = new mongoose.Schema({
    recordingDate: Date,
})

const player = new mongoose.Schema({
    embedHtml: String,
    embedHeight: Number,
    embedWidth: Number,
})

const statistics = new mongoose.Schema({
    viewCount: Number,
    likeCount: Number,
    dislikeCount: Number,
    favoriteCount: Number,
    commentCount: Number,
})

const status = new mongoose.Schema({
    uploadStatus: String,
    failureReason: String,
    rejectionReason: String,
    privacyStatus: String,
    publishAt: Date,
    license: String,
    embeddable: Boolean,
    publicStatsViewable: Boolean,
    madeForKids: Boolean,
    selfDeclaredMadeForKids: Boolean,

})

const contentRating = new mongoose.Schema({
    acbRating: String,
    agcomRating: String,
    anatelRating: String,
    bbfcRating: String,
    bfvcRating: String,
    bmukkRating: String,
    catvRating: String,
    catvfrRating: String,
    cbfcRating: String,
    cccRating: String,
    cceRating: String,
    chfilmRating: String,
    chvrsRating: String,
    cicfRating: String,
    cnaRating: String,
    cncRating: String,
    csaRating: String,
    cscfRating: String,
    czfilmRating: String,
    djctqRating: String,
    djctqRatingReasons: [String],
    ecbmctRating: String,
    eefilmRating: String,
    egfilmRating: String,
    eirinRating: String,
    fcbmRating: String,
    fcoRating: String,
    fpbRating: String,
    fpbRatingReasons: [String],
    grfilmRating: String,
    icaaRating: String,
    ifcoRating: String,
    ilfilmRating: String,
    incaaRating: String,
    kfcbRating: String,
    kijkwijzerRating: String,
    kmrbRating: String,
    lsfRating: String,
    mccaaRating: String,
    mccypRating: String,
    mcstRating: String,
    mdaRating: String,
    medietilsynetRating: String,
    mekuRating: String,
    mibacRating: String,
    mocRating: String,
    moctwRating: String,
    mpaaRating: String,
    mpaatRating: String,
    mtrcbRating: String,
    nbcRating: String,
    nfrcRating: String,
    nfvcbRating: String,
    nkclvRating: String,
    oflcRating: String,
    pefilmRating: String,
    resorteviolenciaRating: String,
    rtcRating: String,
    rteRating: String,
    russiaRating: String,
    skfilmRating: String,
    smaisRating: String,
    smsaRating: String,
    tvpgRating: String,
    ytRating: String,
})

const contentDetails = new mongoose.Schema({
    duration: String,
    dimension: String,
    definition: String,
    caption: String,
    licensedContent: Boolean,
    regionRestriction: regionRestriction,
    hasCustomThumbnail: Boolean,
    projection: String,
    contentRating: contentRating,
})

const thumbnail = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number
})

const localized = new mongoose.Schema({
    title: String,
    description: String,
})

const snippet = new mongoose.Schema({
    publishedAt: Date,
    channelId: String,
    title: String,
    description: String,
    thumbnails: { type: Map, of: thumbnail },
    channelTitle: String,
    tags: [String],
    categoryId: String,
    liveBroadcastContent: String,
    defaultLanguage: String,
    defaultAudioLanguage: String,
    localized: localized,

})

const videoSchema = new mongoose.Schema({
    country: { type: [String], index: true },
    category: { type: [Number], index: true },
    date: { type: Date, index: true },
    etag: { type: String },
    id: { type: String, index: true },
    snippet: snippet,
    contentDetails: contentDetails,
    status: status,
    statistics: statistics,
    player: player,
    topicCategories: [String],
    recordingDetails: recordingDetails,
    liveStreamingDetails: liveStreamingDetails,
    localizations: {
        type: Map,
        of: localizedSchema,
    },
})

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;