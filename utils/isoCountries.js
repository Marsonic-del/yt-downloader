const CountryLanguage = require('@ladjs/country-language');


// const getCountryCodeAndLang = () => {
//     const countryCodes = CountryLanguage.getCountryCodes()

//     for (let countryCode of countryCodes) {
//         CountryLanguage.getCountryLanguages(countryCode, function (err, languages) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (languages.length > 0) {
//                     countryCodeAndLang[countryCode] = languages[0].iso639_1
//                 }
//             }
//         });
//     }
//     console.log(countryCodeAndLang)
// }


const countryCodes = ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG',
    'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB',
    'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW',
    'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA',
    'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM',
    'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ',
    'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE',
    'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA',
    'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU',
    'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT',
    'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH',
    'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME',
    'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ',
    'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW',
    'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR',
    'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF',
    'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO',
    'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR',
    'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ',
    'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT',
    'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA',
    'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU',
    'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE',
    'ZM', 'ZW']

const countryCodeAndLang = {
    AF: 'ps', AX: 'sv', AL: 'sq', DZ: 'ar', AS: 'en', AD: 'ca', AO: 'pt', AI: 'en', AQ: 'und', AG: 'en',
    AR: 'es', AM: 'hy', AW: 'nl', AU: 'en', AT: 'de', AZ: 'az', BS: 'en', BH: 'ar', BD: 'bn', BB: 'en',
    BY: 'be', BE: 'nl', BZ: 'en', BJ: 'fr', BM: 'en', BT: 'dz', BO: 'es', BQ: 'nl', BA: 'bs', BW: 'en',
    BV: 'und', BR: 'pt', IO: 'en', BN: 'ms', BG: 'bg', BF: 'fr', BI: 'rn', KH: 'km', CM: 'fr', CA: 'en',
    CV: 'pt', KY: 'en', CF: 'fr', TD: 'fr', CL: 'es', CN: 'zh', CX: 'en', CC: 'en', CO: 'es', KM: 'ar',
    CG: 'fr', CD: 'fr', CK: 'en', CR: 'es', CI: 'fr', HR: 'hr', CU: 'es', CW: 'nl', CY: 'el', CZ: 'cs',
    DK: 'da', DJ: 'fr', DM: 'en', DO: 'es', EC: 'es', EG: 'ar', SV: 'es', GQ: 'es', ER: 'ti', EE: 'et',
    ET: 'am', FK: 'en', FO: 'fo', FJ: 'en', FI: 'fi', FR: 'fr', GF: 'fr', PF: 'fr', TF: 'fr', GA: 'fr',
    GM: 'en', GE: 'ka', DE: 'de', GH: 'en', GI: 'en', GR: 'el', GL: 'kl', GD: 'en', GP: 'fr', GU: 'en',
    GT: 'es', GG: 'en', GN: 'fr', GW: 'pt', GY: 'en', HT: 'fr', HM: 'en', VA: 'la', HN: 'es', HK: 'zh',
    HU: 'hu', IS: 'is', IN: 'hi', ID: 'id', IR: 'fa', IQ: 'ar', IE: 'ga', IM: 'en', IL: 'he', IT: 'it',
    JM: 'en', JP: 'ja', JE: 'en', JO: 'ar', KZ: 'kk', KE: 'sw', KI: 'en', KP: 'ko', KR: 'ko', KW: 'ar',
    KG: 'ky', LA: 'lo', LV: 'lv', LB: 'ar', LS: 'st', LR: 'en', LY: 'ar', LI: 'de', LT: 'lt',
    LU: 'lb', MO: 'zh', MK: 'mk', MG: 'mg', MW: 'ny', MY: 'ms', MV: 'dv', ML: 'fr', MT: 'mt', MH: 'en',
    MQ: 'fr', MR: 'ar', MU: 'en', YT: 'fr', MX: 'es', FM: 'en', MD: 'ro', MC: 'fr', MN: 'mn', ME: 'sr',
    MS: 'en', MA: 'ar', MZ: 'pt', MM: 'my', NA: 'en', NR: 'na', NP: 'ne', NL: 'nl', NC: 'fr', NZ: 'en',
    NI: 'es', NE: 'fr', NG: 'en', NU: 'ni', NF: 'en', MP: 'en', NO: 'no', OM: 'ar', PK: 'ur', PW: 'en',
    PS: 'ar', PA: 'es', PG: 'en', PY: 'es', PE: 'es', PH: 'en', PN: 'en', PL: 'pl', PT: 'pt', PR: 'es',
    QA: 'ar', RE: 'fr', RO: 'ro', RU: 'ru', RW: 'rw', BL: 'fr', SH: 'en', KN: 'en', LC: 'en', MF: 'nl',
    PM: 'fr', VC: 'en', WS: 'sm', SM: 'it', ST: 'pt', SA: 'ar', SN: 'fr', RS: 'sr', SC: 'fr', SL: 'en', SG: 'en', SX: 'nl', SK: 'sk', SI: 'sl', SB: 'en', SO: 'so',
    ZA: 'zu', GS: 'en', SS: 'en', ES: 'es', LK: 'si', SD: 'ar', SR: 'nl',
    SJ: 'no', SZ: 'en', SE: 'sv', CH: 'de', SY: 'ar', TW: 'zh', TJ: 'tg',
    TZ: 'sw', TH: 'th', TL: 'pt', TG: 'fr', TK: 'tk', TO: 'en', TT: 'en',
    TN: 'ar', TR: 'tr', TM: 'tk', TC: 'en', TV: 'en', UG: 'en', UA: 'uk',
    AE: 'ar', GB: 'en', US: 'en', UM: 'en', UY: 'es', UZ: 'uz', VU: 'bi',
    VE: 'es', VN: 'vi', VG: 'en', VI: 'en', WF: 'fr', EH: 'ar', YE: 'ar',
    ZM: 'en', ZW: 'sn'
};

module.exports = {
    countryCodeAndLang,
}