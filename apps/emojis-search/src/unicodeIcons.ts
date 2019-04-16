import * as blessed from 'accursed'
// import * as pu from 'punycode'
/**  codePointHexString('🇦🇨') === '\ud83c\udde6\ud83c\udde8'  . Result is escaped is just for show the value to the user. */
function charCodeHexString(s: string){
  return  s.split('').map(s=>s.charCodeAt(0).toString(16)).map(n=>`\\u${n}`).join('')
}
// function codePointHexString(s: string){
//   return  s.split('').map(s=>s.codePointAt(0)!.toString(16)).map(n=>`\\u${n}`).join('')
// }

// console.log('🇦🇨 \u{1F1E6}\u{1F1E8}', '🇦🇨'.codePointAt(0)!.toString(16), '🇦🇨'.charCodeAt(0)!.toString(16), charCodeHexString('🇦🇨'), codePointHexString('🇦🇨'), '\ud83c\udde6\ud83c\udde8 \ud83c\udde6\ud83c\udde8')

// console.log('🇦🇨'.split('').map(s=>s.charCodeAt(0).toString(16)))

// process.exit(0)

var screen = blessed.screen({
  autoPadding: false,
  // smartCSR: true, forceUnicode: true,
   fullUnicode: true
})
// [0xF1E6, 0xf1e6, 0xF1E8].map(c=>blessed.unicode.fromCodePoint(c)).join(',')
// var main = blessed.box({
//   parent: screen,
//   left: 'center',
//   top: 'center',
//   width: '90%',
//   height: '90%',
//   border: 'line',
//   // draggable: true,
//   tags: true,
//   content: `{light-blue-fg} Some icons ${countryFlags()
//     .map(s => `${s[0]}: ${charCodeHexString(s[0])} (${s[1]})`)
//     .join(', ')} {/}`,
//   scrollable: true,
//   alwaysScroll: true,
//   keys: true,
//   vi: true,
//   mouse: true
// })


var stringData = [
  ['{red-fg}Character{/red-fg}', '{red-fg}Code Points{/red-fg}', '{red-fg}Description{/red-fg}'],
  // ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],  ['2','3','4'],
...  countryFlags().map(d=>[d[0], charCodeHexString(d[0]), d[1]])
]


var table = blessed.listtable({
  parent: screen,
  // top: 'center',
  // left: 'center',
  data: stringData,
  border: 'line',
  align: 'left',

  search: (callback) => {
    prompt.input('Search:', '', function(err, value) {
      if (err) return;
      return callback(null, value);
    });
  },
  tags: true,
  keys: true,
  // width: '80%',
  // width: 'shrink',
  height: '90%',
  vi: true,
  mouse: true,
  scrollable: true,
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'cyan'
    },
    style: {
      inverse: true
    }
  },
  style: {
    //@ts-ignore
    border: {
      fg: 'red'
    },
    scrollbar: {
      ch: ' ',
      track: {
        bg: 'cyan'
      },
      style: {
        inverse: true
      }
    },
    header: {
      fg: 'blue',
      bold: true
    },
    cell: {
      fg: 'magenta',
      selected: {
        bg: 'blue'
      }
    }
  }
} )

var prompt = blessed.prompt({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 'shrink',
  width: 'shrink',
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: 'line',
  hidden: true
});

table.focus()

screen.key('q', function() {
  return screen.destroy()
})

screen.render()

function countryFlags() {
  
  return [
    ['🇦🇨', 'Ascension Island Flag'],
    ['🇦🇩', 'Andorra Flag'],
    ['🇦🇪', 'United Arab Emirates Flag'],
    ['🇦🇫', 'Afghanistan Flag'],
    ['🇦🇬', 'Antigua & Barbuda Flag'],
    ['🇦🇮', 'Anguilla Flag'],
    ['🇦🇱', 'Albania Flag'],
    ['🇦🇲', 'Armenia Flag'],
    ['🇦🇴', 'Angola Flag'],
    ['🇦🇶', 'Antarctica Flag'],
    ['🇦🇷', 'Argentina Flag'],
    ['🇦🇸', 'American Samoa Flag'],
    ['🇦🇹', 'Austria Flag'],
    ['🇦🇺', 'Australia Flag'],
    ['🇦🇼', 'Aruba Flag'],
    ['🇦🇽', 'Åland Islands Flag'],
    ['🇦🇿', 'Azerbaijan Flag'],
    ['🇧🇦', 'Bosnia & Herzegovina Flag'],
    ['🇧🇧', 'Barbados Flag'],
    ['🇧🇩', 'Bangladesh Flag'],
    ['🇧🇪', 'Belgium Flag'],
    ['🇧🇫', 'Burkina Faso Flag'],
    ['🇧🇬', 'Bulgaria Flag'],
    ['🇧🇭', 'Bahrain Flag'],
    ['🇧🇮', 'Burundi Flag'],
    ['🇧🇯', 'Benin Flag'],

    ['🇧🇱', 'St. Barthélemy Flag'],
    ['🇧🇲', 'Bermuda Flag'],
    ['🇧🇳', 'Brunei Flag'],
    ['🇧🇴', 'Bolivia Flag'],
    ['🇧🇶', 'Caribbean Netherlands Flag'],
    ['🇧🇷', 'Brazil Flag'],
    ['🇧🇸', 'Bahamas Flag'],
    ['🇧🇹', 'Bhutan Flag'],
    ['🇧🇻', 'Bouvet Island Flag'],
    ['🇧🇼', 'Botswana Flag'],
    ['🇧🇾', 'Belarus Flag'],
    ['🇧🇿', 'Belize Flag'],
    ['🇨🇦', 'Canada Flag'],
    ['🇨🇨', 'Cocos (Keeling) Islands Flag'],
    ['🇨🇩', 'Congo - Kinshasa Flag'],
    ['🇨🇫', 'Central African Republic Flag'],
    ['🇨🇬', 'Congo - Brazzaville Flag'],
    ['🇨🇭', 'Switzerland Flag'],
    ['🇨🇮', 'Côte d’Ivoire Flag'],
    ['🇨🇰', 'Cook Islands Flag'],
    ['🇨🇱', 'Chile Flag'],
    ['🇨🇲', 'Cameroon Flag'],
    ['🇨🇳', 'China Flag'],
    ['🇨🇴', 'Colombia Flag'],
    ['🇨🇵', 'Clipperton Island Flag'],
    ['🇨🇷', 'Costa Rica Flag'],
    ['🇨🇺', 'Cuba Flag'],
    ['🇨🇻', 'Cape Verde Flag'],
    ['🇨🇼', 'Curaçao Flag'],
    ['🇨🇽', 'Christmas Island Flag'],
    ['🇨🇾', 'Cyprus Flag'],
    ['🇨🇿', 'Czechia Flag'],
    ['🇩🇪', 'Germany Flag'],
    ['🇩🇬', 'Diego Garcia Flag'],
    ['🇩🇯', 'Djibouti Flag'],
    ['🇩🇰', 'Denmark Flag'],
    ['🇩🇲', 'Dominica Flag'],
    ['🇩🇴', 'Dominican Republic Flag'],
    ['🇩🇿', 'Algeria Flag'],
    ['🇪🇦', 'Ceuta & Melilla Flag'],
    ['🇪🇨', 'Ecuador Flag'],
    ['🇪🇪', 'Estonia Flag'],
    ['🇪🇬', 'Egypt Flag'],
    ['🇪🇭', 'Western Sahara Flag'],
    ['🇪🇷', 'Eritrea Flag'],
    ['🇪🇸', 'Spain Flag'],
    ['🇪🇹', 'Ethiopia Flag'],
    ['🇪🇺', 'European Union Flag'],
    ['🇫🇮', 'Finland Flag'],
    ['🇫🇯', 'Fiji Flag'],
    ['🇫🇰', 'Falkland Islands Flag'],
    ['🇫🇲', 'Micronesia Flag'],
    ['🇫🇴', 'Faroe Islands Flag'],
    ['🇫🇷', 'France Flag'],
    ['🇬🇦', 'Gabon Flag'],
    ['🇬🇧', 'United Kingdom Flag'],
    ['🇬🇩', 'Grenada Flag'],
    ['🇬🇪', 'Georgia Flag'],
    ['🇬🇫', 'French Guiana Flag'],
    ['🇬🇬', 'Guernsey Flag'],
    ['🇬🇭', 'Ghana Flag'],
    ['🇬🇮', 'Gibraltar Flag'],
    ['🇬🇱', 'Greenland Flag'],
    ['🇬🇲', 'Gambia Flag'],
    ['🇬🇳', 'Guinea Flag'],
    ['🇬🇵', 'Guadeloupe Flag'],
    ['🇬🇶', 'Equatorial Guinea Flag'],
    ['🇬🇷', 'Greece Flag'],
    ['🇬🇸', 'South Georgia & South Sandwich Islands Flag'],
    ['🇬🇹', 'Guatemala Flag'],
    ['🇬🇺', 'Guam Flag'],
    ['🇬🇼', 'Guinea-Bissau Flag'],
    ['🇬🇾', 'Guyana Flag'],
    ['🇭🇰', 'Hong Kong SAR China Flag'],
    ['🇭🇲', 'Heard & McDonald Islands Flag'],
    ['🇭🇳', 'Honduras Flag'],
    ['🇭🇷', 'Croatia Flag'],
    ['🇭🇹', 'Haiti Flag'],
    ['🇭🇺', 'Hungary Flag'],
    ['🇮🇨', 'Canary Islands Flag'],
    ['🇮🇩', 'Indonesia Flag'],
    ['🇮🇪', 'Ireland Flag'],
    ['🇮🇱', 'Israel Flag'],
    ['🇮🇲', 'Isle of Man Flag'],
    ['🇮🇳', 'India Flag'],
    ['🇮🇴', 'British Indian Ocean Territory Flag'],
    ['🇮🇶', 'Iraq Flag'],
    ['🇮🇷', 'Iran Flag'],
    ['🇮🇸', 'Iceland Flag'],
    ['🇮🇹', 'Italy Flag'],
    ['🇯🇪', 'Jersey Flag'],
    ['🇯🇲', 'Jamaica Flag'],
    ['🇯🇴', 'Jordan Flag'],
    ['🇯🇵', 'Japan Flag'],
    ['🇰🇪', 'Kenya Flag'],
    ['🇰🇬', 'Kyrgyzstan Flag'],
    ['🇰🇭', 'Cambodia Flag'],
    ['🇰🇮', 'Kiribati Flag'],
    ['🇰🇲', 'Comoros Flag'],
    ['🇰🇳', 'St. Kitts & Nevis Flag'],
    ['🇰🇵', 'North Korea Flag'],
    ['🇰🇷', 'South Korea Flag'],
    ['🇰🇼', 'Kuwait Flag'],
    ['🇰🇾', 'Cayman Islands Flag'],
    ['🇰🇿', 'Kazakhstan Flag'],
    ['🇱🇦', 'Laos Flag'],
    ['🇱🇧', 'Lebanon Flag'],
    ['🇱🇨', 'St. Lucia Flag'],
    ['🇱🇮', 'Liechtenstein Flag'],
    ['🇱🇰', 'Sri Lanka Flag'],
    ['🇱🇷', 'Liberia Flag'],
    ['🇱🇸', 'Lesotho Flag'],
    ['🇱🇹', 'Lithuania Flag'],
    ['🇱🇺', 'Luxembourg Flag'],
    ['🇱🇻', 'Latvia Flag'],
    ['🇱🇾', 'Libya Flag'],
    ['🇲🇦', 'Morocco Flag'],
    ['🇲🇨', 'Monaco Flag'],
    ['🇲🇩', 'Moldova Flag'],
    ['🇲🇪', 'Montenegro Flag'],
    ['🇲🇫', 'St. Martin Flag'],
    ['🇲🇬', 'Madagascar Flag'],
    ['🇲🇭', 'Marshall Islands Flag'],
    ['🇲🇰', 'Macedonia Flag'],
    ['🇲🇱', 'Mali Flag'],
    ['🇲🇲', 'Myanmar (Burma) Flag'],
    ['🇲🇳', 'Mongolia Flag'],
    ['🇲🇴', 'Macao SAR China Flag'],
    ['🇲🇵', 'Northern Mariana Islands Flag'],
    ['🇲🇶', 'Martinique Flag'],
    ['🇲🇷', 'Mauritania Flag'],
    ['🇲🇸', 'Montserrat Flag'],
    ['🇲🇹', 'Malta Flag'],
    ['🇲🇺', 'Mauritius Flag'],
    ['🇲🇻', 'Maldives Flag'],
    ['🇲🇼', 'Malawi Flag'],
    ['🇲🇽', 'Mexico Flag'],
    ['🇲🇾', 'Malaysia Flag'],
    ['🇲🇿', 'Mozambique Flag'],
    ['🇳🇦', 'Namibia Flag'],
    ['🇳🇨', 'New Caledonia Flag'],
    ['🇳🇪', 'Niger Flag'],
    ['🇳🇫', 'Norfolk Island Flag'],
    ['🇳🇬', 'Nigeria Flag'],
    ['🇳🇮', 'Nicaragua Flag'],
    ['🇳🇱', 'Netherlands Flag'],
    ['🇳🇴', 'Norway Flag'],
    ['🇳🇵', 'Nepal Flag'],
    ['🇳🇷', 'Nauru Flag'],
    ['🇳🇺', 'Niue Flag'],
    ['🇳🇿', 'New Zealand Flag'],
    ['🇴🇲', 'Oman Flag'],
    ['🇵🇦', 'Panama Flag'],
    ['🇵🇪', 'Peru Flag'],
    ['🇵🇫', 'French Polynesia Flag'],
    ['🇵🇬', 'Papua New Guinea Flag'],
    ['🇵🇭', 'Philippines Flag'],
    ['🇵🇰', 'Pakistan Flag'],
    ['🇵🇱', 'Poland Flag'],
    ['🇵🇲', 'St. Pierre & Miquelon Flag'],
    ['🇵🇳', 'Pitcairn Islands Flag'],
    ['🇵🇷', 'Puerto Rico Flag'],
    ['🇵🇸', 'Palestinian Territories Flag'],
    ['🇵🇹', 'Portugal Flag'],
    ['🇵🇼', 'Palau Flag'],
    ['🇵🇾', 'Paraguay Flag'],
    ['🇶🇦', 'Qatar Flag'],
    ['🇷🇪', 'Réunion Flag'],
    ['🇷🇴', 'Romania Flag'],
    ['🇷🇸', 'Serbia Flag'],
    ['🇷🇺', 'Russia Flag'],
    ['🇷🇼', 'Rwanda Flag'],
    ['🇸🇦', 'Saudi Arabia Flag'],
    ['🇸🇧', 'Solomon Islands Flag'],
    ['🇸🇨', 'Seychelles Flag'],
    ['🇸🇩', 'Sudan Flag'],
    ['🇸🇪', 'Sweden Flag'],
    ['🇸🇬', 'Singapore Flag'],
    ['🇸🇭', 'St. Helena Flag'],
    ['🇸🇮', 'Slovenia Flag'],
    ['🇸🇯', 'Svalbard & Jan Mayen Flag'],
    ['🇸🇰', 'Slovakia Flag'],
    ['🇸🇱', 'Sierra Leone Flag'],
    ['🇸🇲', 'San Marino Flag'],
    ['🇸🇳', 'Senegal Flag'],
    ['🇸🇴', 'Somalia Flag'],
    ['🇸🇷', 'Suriname Flag'],
    ['🇸🇸', 'South Sudan Flag'],
    ['🇸🇹', 'São Tomé & Príncipe Flag'],
    ['🇸🇻', 'El Salvador Flag'],
    ['🇸🇽', 'Sint Maarten Flag'],
    ['🇸🇾', 'Syria Flag'],
    ['🇸🇿', 'Eswatini Flag'],
    ['🇹🇦', 'Tristan da Cunha Flag'],
    ['🇹🇨', 'Turks & Caicos Islands Flag'],
    ['🇹🇩', 'Chad Flag'],
    ['🇹🇫', 'French Southern Territories Flag'],
    ['🇹🇬', 'Togo Flag'],
    ['🇹🇭', 'Thailand Flag'],
    ['🇹🇯', 'Tajikistan Flag'],
    ['🇹🇰', 'Tokelau Flag'],
    ['🇹🇱', 'Timor-Leste Flag'],
    ['🇹🇲', 'Turkmenistan Flag'],
    ['🇹🇳', 'Tunisia Flag'],
    ['🇹🇴', 'Tonga Flag'],
    ['🇹🇷', 'Turkey Flag'],
    ['🇹🇹', 'Trinidad & Tobago Flag'],
    ['🇹🇻', 'Tuvalu Flag'],
    ['🇹🇼', 'Taiwan Flag'],
    ['🇹🇿', 'Tanzania Flag'],
    ['🇺🇦', 'Ukraine Flag'],
    ['🇺🇬', 'Uganda Flag'],
    ['🇺🇲', 'U.S. Outlying Islands Flag'],
    ['🇺🇳', 'United Nations Flag'],
    ['🇺🇸', 'United States Flag'],
    ['🇺🇾', 'Uruguay Flag'],
    ['🇺🇿', 'Uzbekistan Flag'],
    ['🇻🇦', 'Vatican City Flag'],
    ['🇻🇨', 'St. Vincent & Grenadines Flag'],
    ['🇻🇪', 'Venezuela Flag'],
    ['🇻🇬', 'British Virgin Islands Flag'],
    ['🇻🇮', 'U.S. Virgin Islands Flag'],
    ['🇻🇳', 'Vietnam Flag'],
    ['🇻🇺', 'Vanuatu Flag'],
    ['🇼🇫', 'Wallis & Futuna Flag'],
    ['🇼🇸', 'Samoa Flag'],
    ['🇽🇰', 'Kosovo Flag'],
    ['🇾🇪', 'Yemen Flag'],
    ['🇾🇹', 'Mayotte Flag'],
    ['🇿🇦', 'South Africa Flag'],
    ['🇿🇲', 'Zambia Flag'],
    ['🇿🇼', 'Zimbabwe Flag'],
    ]
}
