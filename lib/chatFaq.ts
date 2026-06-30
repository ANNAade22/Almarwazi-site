import { universityContent } from '@/lib/universityContent';

type Lang = 'ar' | 'en' | 'so';

interface FaqRule {
  keywords: string[];
  answer: (lang: Lang) => string;
  followUps: (lang: Lang) => string[];
}

function detectLanguage(text: string): Lang {
  const lower = text.toLowerCase();
  const somaliHints = [
    'jaamacad',
    'jaamacadda',
    'marwazi',
    'sidee',
    'sideen',
    'waa',
    'maxay',
    'gelitaanka',
    'xiriir',
    'la xiriir',
    'ku saabsan',
    'waa maxay',
    'goobaha',
    'kulliyadaha',
  ];
  if (somaliHints.some((w) => lower.includes(w))) return 'so';

  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
  if (latinChars > arabicChars && latinChars > 3) return 'en';
  return 'ar';
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matches(text: string, keywords: string[]): boolean {
  const n = normalize(text);
  return keywords.some((kw) => n.includes(kw.toLowerCase()));
}

function followUpBlock(lang: Lang, items: string[]): string {
  const header =
    lang === 'en'
      ? 'You can also ask about:'
      : lang === 'so'
        ? 'Waxaad sidoo kale weydiin kartaa:'
        : 'يمكنك أيضاً السؤال عن:';
  return `\n---\n${header}\n${items.map((i) => `• ${i}`).join('\n')}`;
}

const c = universityContent;

const rules: FaqRule[] = [
  {
    keywords: [
      'مرحب',
      'السلام',
      'hello',
      'hi',
      'hey',
      'ku soo dhawoow',
      'salaan',
      'asc',
    ],
    answer: (lang) => {
      if (lang === 'en')
        return `🎓 Welcome to ${c.nameShort}!\nI'm the Marwazi assistant. Ask me about colleges, programs, admission, branches, or contact info.${followUpBlock(lang, ['What colleges does the university have?', 'How do I apply?', 'Where are the campuses?'])}`;
      if (lang === 'so')
        return `🎓 Ku soo dhawoow ${c.nameShort}!\nWaxaan ahay caawiyaha Marwazi. Waxaad i weydiin kartaa kulliyadaha, barnaamijyada, gelitaanka, goobaha, ama xiriirka.${followUpBlock(lang, ['Waa maxay kulliyadaha jaamacadda?', 'Sideen ugu dalban karaa?', 'Xaggee yaallaan goobaha?'])}`;
      return `🎓 أهلاً بك في ${c.nameShort}!\nأنا مساعد المروزي. اسألني عن الكليات، البرامج، القبول، الفروع، أو التواصل.${followUpBlock(lang, ['ما هي كليات الجامعة؟', 'كيف أتقدم للقبول؟', 'أين فروع الجامعة؟'])}`;
    },
    followUps: () => [],
  },
  {
    keywords: [
      'عن الجامعة',
      'عن المروزي',
      'تعريف',
      'من هي',
      'about',
      'university',
      'marwazi',
      'introduction',
      'ku saabsan',
      'jaamacadda',
      'jaamacad',
      'waa maxay',
    ],
    answer: (lang) => {
      if (lang === 'en')
        return `🏫 About the university\n\n${c.name} is a private institution founded in ${c.founded} in Mogadishu, Somalia. It specializes in Sharia and Arabic sciences, serving the Somali community with a moderate Islamic approach.\n\n📍 Location: ${c.contact.address}\n🌐 Website: ${c.contact.website}${followUpBlock(lang, ['Vision and mission?', 'What programs are offered?', 'Admission requirements?'])}`;
      if (lang === 'so')
        return `🏫 Ku saabsan jaamacadda\n\n${c.name} waa hay'ad waxbarasho gaar loo leeyahay oo la aasaasay ${c.founded} magaalada Muqdisho. Waxay ku takhasustay cilmiga shareecada iyo Carabiga, waxayna u adeegtaa bulshada Soomaaliyeed habka Islaamka dhexdhexaadka ah.\n\n📍 Goobta: ${c.contact.address}\n🌐 Website: ${c.contact.website}${followUpBlock(lang, ['Aragtida iyo himilada?', 'Waa maxay barnaamijyada?', 'Shuruudaha gelitaanka?'])}`;
      return `🏫 عن الجامعة\n\n${c.introduction}\n\n📍 الموقع: ${c.contact.address}\n🌐 الموقع الإلكتروني: ${c.contact.website}${followUpBlock(lang, ['ما هي الرؤية والرسالة؟', 'ما البرامج المتاحة؟', 'ما شروط القبول؟'])}`;
    },
    followUps: () => [],
  },
  {
    keywords: ['رؤية', 'رسالة', 'vision', 'mission', 'aragti', 'himilo'],
    answer: (lang) => {
      if (lang === 'en')
        return `🎯 Vision & Mission\n\nVision: ${c.vision}\n\nMission: ${c.mission}${followUpBlock(lang, ['What are the university goals?', 'Tell me about the university', 'What colleges are there?'])}`;
      if (lang === 'so')
        return `🎯 Aragtida & Himilada\n\nAragtida: ${c.vision}\n\nHimilada: ${c.mission}${followUpBlock(lang, ['Waa maxay ujeeddooyinka?', 'Ku saabsan jaamacadda', 'Waa maxay kulliyadaha?'])}`;
      return `🎯 الرؤية والرسالة\n\nالرؤية: ${c.vision}\n\nالرسالة: ${c.mission}${followUpBlock(lang, ['ما هي أهداف الجامعة؟', 'أخبرني عن الجامعة', 'ما هي الكليات؟'])}`;
    },
    followUps: () => [],
  },
  {
    keywords: ['أهداف', 'هدف', 'goals', 'objectives', 'ujeeddo'],
    answer: (lang) => {
      const list = c.goals.map((g, i) => `${i + 1}. ${g}`).join('\n');
      const header = lang === 'en' ? '🎯 University Goals' : lang === 'so' ? '🎯 Ujeeddooyinka Jaamacadda' : '🎯 أهداف الجامعة';
      const follow =
        lang === 'en'
          ? ['What are the features?', 'Admission requirements?', 'Contact info?']
          : lang === 'so'
            ? ['Waa maxay astaamaha?', 'Shuruudaha gelitaanka?', 'Xiriirka?']
            : ['ما هي ميزات الجامعة؟', 'شروط القبول؟', 'معلومات التواصل؟'];
      return `${header}\n\n${list}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: ['ميزات', 'خصائص', 'features', 'astaamaha', 'qualities'],
    answer: (lang) => {
      const list = c.features.map((f, i) => `${i + 1}. ${f}`).join('\n');
      const header = lang === 'en' ? '✨ Features' : lang === 'so' ? '✨ Astaamaha' : '✨ الميزات والخصائص';
      const follow =
        lang === 'en'
          ? ['What programs are offered?', 'About the colleges', 'How to apply?']
          : lang === 'so'
            ? ['Barnaamijyada?', 'Kulliyadaha', 'Sideen ugu dalban karaa?']
            : ['ما البرامج الدراسية؟', 'عن الكليات', 'كيف أتقدم للقبول؟'];
      return `${header}\n\n${list}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: [
      'كليات',
      'كلية',
      'colleges',
      'faculty',
      'kulliyad',
      'kulliyadaha',
      'departments',
    ],
    answer: (lang) => {
      const list = c.colleges.map((col) => `• ${col.title}: ${col.description}`).join('\n');
      const header = lang === 'en' ? '🎓 Colleges' : lang === 'so' ? '🎓 Kulliyadaha' : '🎓 الكليات';
      const follow =
        lang === 'en'
          ? ['What programs are available?', 'Admission requirements?', 'Campus locations?']
          : lang === 'so'
            ? ['Barnaamijyada?', 'Shuruudaha gelitaanka?', 'Goobaha?']
            : ['ما البرامج الدراسية؟', 'شروط القبول؟', 'أين الفروع؟'];
      return `${header}\n\n${list}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: [
      'برامج',
      'برنامج',
      'programs',
      'bachelor',
      'postgraduate',
      'barnaamij',
      'barnaamijyada',
      'courses',
      'دراسة',
    ],
    answer: (lang) => {
      const list = c.programs
        .map((p) => `• ${p.order} — ${p.title}\n  ${p.description}`)
        .join('\n\n');
      const header =
        lang === 'en' ? '📚 Academic Programs' : lang === 'so' ? '📚 Barnaamijyada Waxbarashada' : '📚 البرامج الدراسية';
      const tagline = lang === 'en' ? c.tagline : lang === 'so' ? c.tagline : c.tagline;
      const follow =
        lang === 'en'
          ? ['Which colleges?', 'How to register?', 'Contact the university']
          : lang === 'so'
            ? ['Kulliyadaha?', 'Sideen iska diiwaangelin karaa?', 'La xiriir jaamacadda']
            : ['ما هي الكليات؟', 'كيف أتقدم للقبول؟', 'التواصل مع الجامعة'];
      return `${header}\n\n${tagline}\n\n${list}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: [
      'قبول',
      'تسجيل',
      'التحاق',
      'التقديم',
      'admission',
      'apply',
      'register',
      'enrollment',
      'gelitaanka',
      'diiwaangelin',
      'iska diiwaan',
      'shuruudaha',
    ],
    answer: (lang) => {
      const list = c.admissionRequirements.map((r, i) => `${i + 1}. ${r}`).join('\n');
      const header =
        lang === 'en'
          ? '📋 Admission Requirements'
          : lang === 'so'
            ? '📋 Shuruudaha Gelitaanka'
            : '📋 شروط القبول والتسجيل';
      const note =
        lang === 'en'
          ? '\n\nFor more details, contact the university directly.'
          : lang === 'so'
            ? '\n\nFaahfaahin dheeraad ah, la xiriir jaamacadda.'
            : '\n\nللمزيد من التفاصيل، تواصل مع الجامعة مباشرة.';
      const follow =
        lang === 'en'
          ? ['Contact information?', 'Campus locations?', 'What programs?']
          : lang === 'so'
            ? ['Xiriirka?', 'Goobaha?', 'Barnaamijyada?']
            : ['معلومات التواصل؟', 'أين الفروع؟', 'ما البرامج؟'];
      return `${header}\n\n${list}${note}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: [
      'فروع',
      'فرع',
      'كمبس',
      'كمبوس',
      'campus',
      'campuses',
      'branches',
      'locations',
      'goobaha',
      'xaggee',
      'mogadishu',
      'مقديشو',
      'بيدوا',
      'عدادو',
    ],
    answer: (lang) => {
      const list = c.branches.map((b) => `• ${b.name}\n  📍 ${b.location}`).join('\n\n');
      const header =
        lang === 'en'
          ? `🌍 Campuses (${c.stats.campuses} locations)`
          : lang === 'so'
            ? `🌍 Goobaha Jaamacadda (${c.stats.campuses} goobood)`
            : `🌍 فروع الجامعة (${c.stats.campuses} كمبسات)`;
      const follow =
        lang === 'en'
          ? ['How to contact?', 'Admission info?', 'About the university']
          : lang === 'so'
            ? ['La xiriir?', 'Gelitaanka?', 'Ku saabsan jaamacadda']
            : ['التواصل؟', 'شروط القبول؟', 'عن الجامعة'];
      return `${header}\n\n${list}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: [
      'تواصل',
      'اتصال',
      'هاتف',
      'بريد',
      'ايميل',
      'contact',
      'phone',
      'email',
      'call',
      'xiriir',
      'la xiriir',
      'telefoon',
      'website',
      'imu',
    ],
    answer: (lang) => {
      const phones = c.contact.phones.join('\n• ');
      const body =
        lang === 'en'
          ? `📞 Contact Information\n\n📍 Address: ${c.contact.address}\n📮 P.O. Box: ${c.contact.poBox}\n\n📧 Email: ${c.contact.email}\n🌐 Website: ${c.contact.website}\n\n📱 Phones:\n• ${phones}\n☎️ Landline: ${c.contact.landline}`
          : lang === 'so'
            ? `📞 Macluumaadka Xiriirka\n\n📍 Cinwaanka: ${c.contact.address}\n📮 Sanduuqa Boostada: ${c.contact.poBox}\n\n📧 Email: ${c.contact.email}\n🌐 Website: ${c.contact.website}\n\n📱 Telefoonnada:\n• ${phones}\n☎️ Taleefanka: ${c.contact.landline}`
            : `📞 معلومات التواصل\n\n📍 العنوان: ${c.contact.address}\n📮 ص.ب: ${c.contact.poBox}\n\n📧 البريد: ${c.contact.email}\n🌐 الموقع: ${c.contact.website}\n\n📱 الهواتف:\n• ${phones}\n☎️ الهاتف الثابت: ${c.contact.landline}`;
      const follow =
        lang === 'en'
          ? ['Campus locations?', 'How to apply?', 'About the university']
          : lang === 'so'
            ? ['Goobaha?', 'Gelitaanka?', 'Ku saabsan jaamacadda']
            : ['أين الفروع؟', 'شروط القبول؟', 'عن الجامعة'];
      return `${body}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
  {
    keywords: ['رئيس', 'president', 'madaxweynaha', 'rector'],
    answer: (lang) => {
      const pm = c.presidentMessage;
      if (lang === 'en')
        return `👨‍🎓 University President\n\n${pm.name} — ${pm.title}\n\n"${pm.excerpt}"${followUpBlock(lang, ['About the university', 'Vision and mission?', 'Contact info?'])}`;
      if (lang === 'so')
        return `👨‍🎓 Madaxweynaha Jaamacadda\n\n${pm.name} — ${pm.title}\n\n"${pm.excerpt}"${followUpBlock(lang, ['Ku saabsan jaamacadda', 'Aragtida iyo himilada?', 'Xiriirka?'])}`;
      return `👨‍🎓 رئيس الجامعة\n\n${pm.name} — ${pm.title}\n\n"${pm.excerpt}"${followUpBlock(lang, ['عن الجامعة', 'الرؤية والرسالة؟', 'معلومات التواصل؟'])}`;
    },
    followUps: () => [],
  },
  {
    keywords: ['إحصائيات', 'خريج', 'مقيد', 'stats', 'statistics', 'tirakoob'],
    answer: (lang) => {
      const s = c.stats;
      const body =
        lang === 'en'
          ? `📊 University Statistics\n\n• Graduates: ${s.graduates}+\n• Enrolled students: ${s.enrolled}\n• Staff: ${s.staff}\n• Campuses: ${s.campuses}`
          : lang === 'so'
            ? `📊 Tirakoobka Jaamacadda\n\n• Qalinjebiyayaal: ${s.graduates}+\n• Ardayda hadda: ${s.enrolled}\n• Shaqaalaha: ${s.staff}\n• Goobaha: ${s.campuses}`
            : `📊 إحصائيات الجامعة\n\n• الخريجون: ${s.graduates}+\n• المقيدون: ${s.enrolled}\n• الموظفون: ${s.staff}\n• الكمبسات: ${s.campuses}`;
      const follow =
        lang === 'en'
          ? ['About the university', 'Campus locations?', 'Programs?']
          : lang === 'so'
            ? ['Ku saabsan jaamacadda', 'Goobaha?', 'Barnaamijyada?']
            : ['عن الجامعة', 'أين الفروع؟', 'البرامج؟'];
      return `${body}${followUpBlock(lang, follow)}`;
    },
    followUps: () => [],
  },
];

function fallbackAnswer(lang: Lang): string {
  const topics =
    lang === 'en'
      ? [
          'About the university',
          'Colleges and programs',
          'Admission requirements',
          'Campus locations',
          'Contact information',
        ]
      : lang === 'so'
        ? [
            'Ku saabsan jaamacadda',
            'Kulliyadaha iyo barnaamijyada',
            'Shuruudaha gelitaanka',
            'Goobaha jaamacadda',
            'Macluumaadka xiriirka',
          ]
        : [
            'عن الجامعة',
            'الكليات والبرامج',
            'شروط القبول',
            'فروع الجامعة',
            'معلومات التواصل',
          ];

  const list = topics.map((t, i) => `${i + 1}. ${t}`).join('\n');

  if (lang === 'en')
    return `🤔 I don't have a specific answer for that question.\n\nTry asking about:\n${list}\n\n📧 Or contact us: ${c.contact.email}\n📱 ${c.contact.primaryPhone}${followUpBlock(lang, ['About the university', 'How do I apply?', 'Contact info'])}`;
  if (lang === 'so')
    return `🤔 Ma haysto jawaab gaar ah su'aashaas.\n\nIsku day inaad weydiiso:\n${list}\n\n📧 Ama nala soo xiriir: ${c.contact.email}\n📱 ${c.contact.primaryPhone}${followUpBlock(lang, ['Ku saabsan jaamacadda', 'Sideen ugu dalban karaa?', 'Xiriirka'])}`;
  return `🤔 ليس لدي إجابة محددة لهذا السؤال.\n\nجرّب السؤال عن:\n${list}\n\n📧 أو تواصل معنا: ${c.contact.email}\n📱 ${c.contact.primaryPhone}${followUpBlock(lang, ['عن الجامعة', 'كيف أتقدم للقبول؟', 'معلومات التواصل'])}`;
}

export function getFaqAnswer(userMessage: string): string {
  const lang = detectLanguage(userMessage);

  for (const rule of rules) {
    if (matches(userMessage, rule.keywords)) {
      return rule.answer(lang);
    }
  }

  return fallbackAnswer(lang);
}
