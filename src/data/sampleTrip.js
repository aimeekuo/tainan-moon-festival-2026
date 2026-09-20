// 2026 中秋返鄉與台南漫步之旅（台北/北斗 ➔ 台南 ➔ 彰化北斗 ➔ 台北）
const defaultTripData = {
  id: "trip-moon-festival-2026",
  title: "🌕 2026 中秋返鄉與台南漫步之旅 4D3N",
  destination: "台灣 台南 & 彰化北斗",
  startDate: "2026-09-25",
  endDate: "2026-09-28",
  currency: "TWD",
  currencySymbol: "NT$",
  homeCurrency: "TWD",
  homeCurrencySymbol: "NT$",
  exchangeRate: 1, // 本地台幣計價
  members: [
    "Aimee (姑姑)",
    "Farl (姑丈)",
    "ㄚ母 (名莉)",
    "ㄚ維 (展維)",
    "婉瑱",
    "安安",
    "睿睿"
  ],
  overviewNote: "9/25 中秋節當天台北組（Aimee、Farl）搭高鐵直達台南，北斗組（ㄚ母、ㄚ維、婉瑱、安安、睿睿 5 人）自駕南下在高鐵站接人。仁德動線：阿裕牛肉涮涮鍋 ➔ 十鼓仁糖文創園區放電 ➔ 致穩入住 ➔ 丹丹漢堡 ➔ 漁光島賞月；9/26 台江主場日：四草綠色隧道搶第一班竹筏、四草砲台、台江遊客中心、田媽媽美食棧，下午安平三連走、觀夕平台看夕陽，晚餐阿江炒鱔魚意麵，入住維悅；9/27 國華街小吃伴手禮後走西濱順停七股鹽山，傍晚抵北斗老家烤肉賞月；9/28 田尾花園後彰化高鐵北返。",

  // 住宿資料
  accommodations: [
    {
      id: "hotel-1",
      name: "致穩人文商旅 (Justwin Grand Hotel)",
      enName: "Justwin Grand Hotel",
      jpAddress: "台南市永康區中正北路56-20號",
      address: "台南市永康區中正北路56-20號",
      phone: "+886-6-2426677",
      checkIn: "2026-09-25 15:00",
      checkOut: "2026-09-26 11:00",
      bookingRef: "Agoda 訂房（憑證見手機）",
      notes: "★9/25 全家 7 人皆住致穩。Business Twin 商務雙床房；含停車位、迎賓飲料、快速入住；住客代表：Aimee Guo。\n⚠️ 附件憑證只有 1 間雙人房（2 位成人），北斗組 5 人的房間需另外補訂，請盡早致電 06-242 6677 確認。",
      mapQuery: "致穩人文商旅"
    },
    {
      id: "hotel-2",
      name: "台南維悅酒店 (Wei-Yat Grand Hotel)",
      enName: "Wei-Yat Grand Hotel Tainan",
      jpAddress: "台南市安平區慶平路539號",
      address: "台南市安平區慶平路539號",
      phone: "+886-6-2950888",
      checkIn: "2026-09-26 15:00",
      checkOut: "2026-09-27 11:00",
      bookingRef: "Klook 訂房：家庭房＋雙人房（憑證見手機）",
      notes: "全家 7 人共兩間房：豪華家庭房（市景・2 張雙人床）+ 高級雙人房（河景・1 張雙人床）；入住 15:00 後、退房 11:00 前；含早餐；訂房人：GUO MENG JIA。\n⚠️ 兩間房登記人數各為 2 位成人，7 人（含 2 位小孩）務必提前致電 06-295 0888 確認加床與加人費用。13:30 可先寄放行李。",
      mapQuery: "台南維悅酒店"
    }
  ],

  // 高鐵 / 交通票券資訊
  flights: [
    {
      type: "高鐵去程 (台北組 2人)",
      date: "2026-09-25 (週五・中秋節)",
      flightNo: "高鐵 1309 車次",
      airline: "台灣高鐵 THSR",
      departureAirport: "台北站 (發車)",
      departureTime: "10:01",
      arrivalAirport: "台南站 (抵達)",
      arrivalTime: "11:45",
      bookingRef: "已付款未取票（取票代碼見 T-EX App）",
      notes: "搭乘人員：Aimee (姑姑)、Farl (姑丈)。標準車廂對號座：4車 8D、4車 8E（全票 2 張，總票價 NT$ 2,700）。抵站後由北斗組開車接人。"
    },
    {
      type: "自駕南下 (北斗組 5人)",
      date: "2026-09-25 (週五・中秋節)",
      flightNo: "自駕開車 (國道一號南下)",
      airline: "自駕車輛",
      departureAirport: "彰化北斗 出發",
      departureTime: "08:00 前出發",
      arrivalAirport: "高鐵台南站 接人",
      arrivalTime: "約 11:45 前抵達",
      bookingRef: "自駕通行",
      notes: "搭乘人員：ㄚ母(名莉)、ㄚ維(展維)、婉瑱、安安、睿睿共 5 人。⚠️ 連假首日國道一號南下最塞，越早出發越好，預留約 2.5 小時車程。"
    },
    {
      type: "高鐵回程 (台北組 2人)",
      date: "2026-09-28 (週一)",
      flightNo: "高鐵 1326 車次",
      airline: "台灣高鐵 THSR",
      departureAirport: "彰化站 (發車)",
      departureTime: "19:41",
      arrivalAirport: "台北站 (抵達)",
      arrivalTime: "20:44",
      bookingRef: "已付款未取票（取票代碼見 T-EX App）",
      notes: "搭乘人員：Aimee (姑姑)、Farl (姑丈)。標準車廂對號座：5車 9D、5車 9E（全票 2 張，總票價 NT$ 1,640）。車程僅 1 小時 03 分抵達台北。"
    }
  ],

  // 緊急與重要聯絡電話
  emergency: [
    { title: "致穩人文商旅總機", number: "06-2426677", note: "永康中正北路 / 9/25 入住・補訂房間", icon: "hotel" },
    { title: "台南維悅酒店總機", number: "06-2950888", note: "安平運河旁 / 9/26 入住・確認加床加人", icon: "hotel" },
    { title: "象哥潮州牛雜湯 (訂位保底)", number: "0979-803035", note: "9/25 中午 7 位訂位・阿裕排太久的備案", icon: "phone" },
    { title: "台灣高鐵客服專線", number: "02-4066-3000", note: "高鐵訂位及乘車諮詢", icon: "train" },
    { title: "高鐵台南站服務台", number: "06-600-9000", note: "台南站遺失物與接駁諮詢", icon: "phone" },
    { title: "報警電話 (緊急)", number: "110", note: "全台緊急報案", icon: "shield-alert" },
    { title: "救護車 / 消防 (緊急)", number: "119", note: "緊急救護送醫", icon: "ambulance" }
  ],

  // 每日行程規劃
  days: [
    {
      dayNumber: 1,
      date: "2026-09-25",
      weekday: "週五・中秋節",
      theme: "南下會合日・仁德牛肉鍋＆十鼓放電・丹丹漢堡・漁光島賞月",
      weather: "晴朗舒適 29°C",
      spots: [
        {
          id: "s1-1",
          time: "08:00 - 11:45",
          title: "北斗組 08:00 前自駕出發 ＆ 台北組高鐵 1309 南下",
          category: "transport",
          location: "台北車站 / 彰化北斗 ➔ 高鐵台南站",
          mapQuery: "高鐵台南站",
          note: "【台北組 2人】Aimee、Farl 搭高鐵 1309（10:01 台北 ➔ 11:45 台南，4車 8D/8E）。\n【北斗組 5人】ㄚ母、ㄚ維、婉瑱、安安、睿睿 08:00 前出發——連假首日國道一號南下最塞，越早越好，約 2.5 小時，11:45 在高鐵台南站接人。",
          cost: "NT$ 2,700 (高鐵已付)",
          completed: false,
          transitToNext: "高鐵站出發往仁德崑崙路，車程約 10 分鐘"
        },
        {
          id: "s1-2",
          time: "12:15 - 13:45",
          title: "午餐：阿裕牛肉涮涮鍋（崑崙店）温體牛現切涮",
          category: "food",
          location: "仁德區崑崙路733-1號（10:00–14:00）",
          mapQuery: "阿裕牛肉涮涮鍋 崑崙店",
          note: "台南牛肉湯代表作，溫體牛現切涮，米其林等級。連假一定爆滿：一抵站先派 1 人搭計程車去排隊，其餘人領行李隨後到。蔬菜要先在入口自取結帳，別搞錯流程。\n★現場判斷：目測排隊超過 30 分鐘就直接走人，改去備案（皆在仁德，車程 5–10 分）。\n【備案 1・保底訂位】象哥潮州牛雜湯：仁德區仁義路19號，0979-803035，11:00–21:00 週二休。建議提前訂 9/25 中午 7 位；湯頭可續、不吃內臟點清燉牛肉湯。\n【備案 2】輝哥本土牛肉爐：仁德區中山路60號，11:30–14:00 週一休。同為溫體牛肉鍋、觀光客少，牛尾牛雜好、白飯可續，7 人點套餐分食。\n【備案 3】閩家土產牛肉湯：仁德區中正路一段271號，6:30–13:30 週一二休。純牛肉湯攤、出餐快翻桌快，環境樸素沒冷氣。",
          cost: "約 NT$ 400 - 500 / 人",
          completed: false,
          transitToNext: "開車約 10 分鐘前往十鼓仁糖文創園區"
        },
        {
          id: "s1-3",
          time: "14:00 - 16:15",
          title: "十鼓仁糖文創園區：擊鼓表演・五層樓溜滑梯・高空溜索・蒸汽火車",
          category: "activity",
          location: "仁德區文化路二段326號（週五 10:00–17:20）",
          mapQuery: "十鼓仁糖文創園區",
          note: "日治糖廠改建，有擊鼓表演、五層樓溜滑梯、高空溜索、蒸汽火車，是這趟安安、睿睿最能放電的一站，大人看廠房結構也有得逛。\n【雨天備案】奇美博物館：仁德區文化路二段66號，9:30–17:30 週三休，全程室內有冷氣；常設展需線上預約購票，7 人記得提前訂。",
          cost: "門票依現場公告",
          completed: false,
          transitToNext: "開車約 20 分鐘回永康致穩人文商旅"
        },
        {
          id: "s1-4",
          time: "16:30 - 17:30",
          title: "致穩人文商旅 Check-in（7 人全員入住）・休息＋洗澡",
          category: "hotel",
          location: "致穩人文商旅（永康）",
          mapQuery: "致穩人文商旅",
          note: "Agoda 訂房，含停車位、迎賓飲料、快速入住。全家 7 人當晚都住致穩，整團一起行動不用分頭。\n⚠️ 憑證只有 1 間雙人房，北斗組的房間務必先補訂。",
          completed: false,
          transitToNext: "步行或開車 5 分鐘到丹丹漢堡永康店"
        },
        {
          id: "s1-5",
          time: "17:30 - 18:30",
          title: "晚餐：南霸天【丹丹漢堡 永康店】羹湯配漢堡",
          category: "food",
          location: "永康區中正南路430號（週五 07:00–21:00，週二公休）",
          mapQuery: "丹丹漢堡 永康店",
          note: "南部限定速食。必點鰆魚羹麵、麵線羹配香酥雞腿堡——羹湯配漢堡這種組合只有這裡有，值得體驗一次。人均 100 元有找，剛好平衡中午的牛肉鍋。",
          cost: "約 NT$ 100 / 人",
          completed: false,
          transitToNext: "開車約 30 分鐘前往漁光島"
        },
        {
          id: "s1-6",
          time: "19:00 - 20:30",
          title: "🌕 漁光島月牙灣中秋賞月・沙灘踩水",
          category: "attraction",
          location: "漁光島 月牙灣海灘",
          mapQuery: "漁光島月牙灣",
          note: "中秋當天沙灘人多但氣氛好，浪小、適合小孩踩水。沙灘好走，安安睿睿可以放電，大人坐在沙灘上看月亮升起。",
          completed: false,
          transitToNext: "開車約 30 分鐘返回致穩休息，明早要早起搶第一班竹筏"
        }
      ]
    },
    {
      dayNumber: 2,
      date: "2026-09-26",
      weekday: "週六",
      theme: "台江國家公園主場日 ⭐ 四草竹筏第一班・安平三連走・阿江炒鱔魚",
      weather: "多雲時晴 30°C",
      spots: [
        {
          id: "s2-1",
          time: "07:30 - 08:00",
          title: "致穩早餐・退房（行李直接放車上）",
          category: "hotel",
          location: "致穩人文商旅",
          mapQuery: "致穩人文商旅",
          note: "早起搶第一班竹筏！早餐吃完直接退房，行李全放車上。",
          completed: false,
          transitToNext: "開車約 25 分鐘前往安南區四草大眾廟，旁邊有免費停車場"
        },
        {
          id: "s2-2",
          time: "08:20 - 09:30",
          title: "【四草綠色隧道】竹筏第一班・天使之吻倒影",
          category: "activity",
          location: "四草大眾廟（安南區大眾路360號）",
          mapQuery: "四草綠色隧道",
          note: "08:20 抵達大眾廟，旁邊免費停車場。竹筏航程約 30 分鐘，滿 30 人開船。導覽員說「天使之吻」倒影以第一班船最美，因為水面最平靜。\n⚠️ 注意別買錯成 100 分鐘的「台江觀光船」。",
          cost: "全票 NT$ 200 / 7–12 歲兒童 NT$ 100",
          completed: false,
          transitToNext: "走路 3 分鐘到四草砲台"
        },
        {
          id: "s2-3",
          time: "09:40 - 10:10",
          title: "四草砲台（鎮海城）",
          category: "attraction",
          location: "四草大眾廟旁",
          mapQuery: "四草砲台",
          note: "就在大眾廟旁邊，走路 3 分鐘，清代古蹟砲台城牆，順道看一下。",
          completed: false,
          transitToNext: "開車約 5 分鐘到台江國家公園遊客中心"
        },
        {
          id: "s2-4",
          time: "10:20 - 11:45",
          title: "台江國家公園管理處遊客中心：蚵殼牆水上建築・生態展示",
          category: "attraction",
          location: "四草大道118號（09:00–17:00，週一休）",
          mapQuery: "台江國家公園遊客中心",
          note: "蚵殼牆水上建築，免費、有冷氣、生態展示，小朋友很吃這套。純白高腳屋倒映水面，適合拍 7 人大合照。",
          cost: "免費",
          completed: false,
          transitToNext: "開車約 5 分鐘到田媽媽台江美食棧"
        },
        {
          id: "s2-5",
          time: "12:00 - 13:15",
          title: "午餐：田媽媽台江美食棧（四草在地虱目魚、蚵仔料理）",
          category: "food",
          location: "田媽媽台江美食棧",
          mapQuery: "田媽媽台江美食棧",
          note: "四草在地虱目魚、蚵仔料理，全程都在安南區不繞路。",
          cost: "約 NT$ 250 - 350 / 人",
          completed: false,
          transitToNext: "開車約 15 分鐘到安平維悅酒店"
        },
        {
          id: "s2-6",
          time: "13:30 - 14:15",
          title: "台南維悅酒店寄放行李（15:00 後正式入住）",
          category: "hotel",
          location: "台南維悅酒店",
          mapQuery: "台南維悅酒店",
          note: "Klook 訂房：豪華家庭房＋高級雙人房。先寄放行李，下午回來再正式入住。\n⚠️ 提前致電 06-295 0888 確認 7 人加床與加人費用。",
          completed: false,
          transitToNext: "開車約 5 分鐘到安平樹屋"
        },
        {
          id: "s2-7",
          time: "14:30 - 16:45",
          title: "安平三連走：安平樹屋＋德記洋行 ➔ 安平老街 ➔ 安平古堡",
          category: "attraction",
          location: "安平樹屋 / 安平老街 / 安平古堡（步行圈內）",
          mapQuery: "安平樹屋",
          note: "三個景點都在步行圈內。老街上可吃周氏蝦捲、同記安平豆花、現炸蝦餅當點心。",
          cost: "樹屋＋古堡門票約 NT$ 70 / 人",
          completed: false,
          transitToNext: "開車約 10 分鐘到觀夕平台"
        },
        {
          id: "s2-8",
          time: "17:00 - 18:00",
          title: "觀夕平台 或 安平漁人碼頭看夕陽",
          category: "attraction",
          location: "觀夕平台 / 安平漁人碼頭",
          mapQuery: "觀夕平台",
          note: "傍晚陽光溫柔，看海天金色夕陽。",
          completed: false,
          transitToNext: "開車約 15 分鐘到中西區民族路阿江炒鱔魚"
        },
        {
          id: "s2-9",
          time: "18:30 - 20:00",
          title: "晚餐：【阿江炒鱔魚】府城最兇火候乾炒鱔魚意麵",
          category: "food",
          location: "中西區民族路三段89號（17:00 開賣，週一休）",
          mapQuery: "阿江炒鱔魚",
          note: "★全程唯一一家鱔魚意麵，選它是因為火候最兇、乾炒版本的鑊氣是台南其他店做不太出來的。務必點「乾的」——湯的版本偏甜、外地人接受度較低。胡椒偏重，安安睿睿的份先分小碗、再加一點開水。\n【備選】東城人文小館（東門路一段235號，米其林推薦，排隊 45 分＋出餐 30 分，要抓 2 小時）。",
          cost: "約 NT$ 250 / 人",
          completed: false,
          transitToNext: "開車約 15 分鐘回安平維悅酒店"
        },
        {
          id: "s2-10",
          time: "20:30",
          title: "回台南維悅酒店・運河夜景・休息",
          category: "hotel",
          location: "台南維悅酒店",
          mapQuery: "台南維悅酒店",
          note: "全家兩間房（豪華家庭房 2 大床 + 高級雙人房 1 大床），看安平運河夜景後休息。",
          completed: false
        }
      ]
    },
    {
      dayNumber: 3,
      date: "2026-09-27",
      weekday: "週日",
      theme: "運河晨光・國華街小吃伴手禮・西濱七股鹽山・北返老家烤肉賞月",
      weather: "晴時多雲 28°C",
      spots: [
        {
          id: "s3-1",
          time: "08:00 - 09:00",
          title: "維悅酒店早餐（含房價內）・看運河晨光",
          category: "food",
          location: "維悅酒店 餐廳",
          mapQuery: "台南維悅酒店",
          note: "全家 7 人享用飯店早餐，邊看安平運河晨光邊喝咖啡。",
          completed: false,
          transitToNext: "飯店門口就是運河"
        },
        {
          id: "s3-2",
          time: "09:00 - 10:30",
          title: "安平運河邊散步，或補走前一天沒逛完的老街",
          category: "attraction",
          location: "安平運河",
          mapQuery: "安平運河",
          note: "悠閒散步消化早餐，或回老街補買想吃的。",
          completed: false,
          transitToNext: "回飯店收拾行李"
        },
        {
          id: "s3-3",
          time: "10:40 - 11:00",
          title: "維悅退房（11:00 前）",
          category: "hotel",
          location: "台南維悅酒店",
          mapQuery: "台南維悅酒店",
          note: "11:00 前退房，行李上車。",
          completed: false,
          transitToNext: "開車約 15 分鐘到中西區國華街"
        },
        {
          id: "s3-4",
          time: "11:20 - 13:15",
          title: "午餐：國華街／保安路小吃圈 ＆ 採買中秋伴手禮",
          category: "food",
          location: "國華街三段 / 永樂市場 / 保安路",
          mapQuery: "國華街 永樂市場",
          note: "永樂市場周邊小吃：金得春捲、富盛號碗粿、石精臼蚵仔煎、阿松割包，保安路阿明豬心冬粉。順道在國華街買中秋伴手禮帶回北斗。",
          cost: "約 NT$ 150 - 250 / 人",
          completed: false,
          transitToNext: "走台 61 西濱北上，約 50 分鐘到七股鹽山"
        },
        {
          id: "s3-5",
          time: "13:30 - 15:30",
          title: "出發北返（走台 61 西濱）・順停七股鹽山／七股鹽田",
          category: "transport",
          location: "七股鹽山（台江國家公園周邊濕地區）",
          mapQuery: "七股鹽山",
          note: "★把北返路線也當景點：走台 61 西濱順路停七股鹽山／鹽田，比國道塞車風險低，也讓台江主題有頭有尾。鹽山可爬、有鹹冰棒，小朋友喜歡。",
          cost: "七股鹽山停車費約 NT$ 50",
          completed: false,
          transitToNext: "續走西濱北上約 1.5 小時抵彰化北斗"
        },
        {
          id: "s3-6",
          time: "16:30 - 17:00",
          title: "抵彰化北斗老家・庭院泡茶話家常",
          category: "activity",
          location: "北斗老家",
          mapQuery: "彰化縣北斗鎮",
          note: "回到老家大院泡茶納涼、切文旦柚子、吃月餅，三代同堂話家常。",
          completed: false,
          transitToNext: "庭院生火準備開爐"
        },
        {
          id: "s3-7",
          time: "17:30 - 21:00",
          title: "🌕 老家大院月圓炭烤團圓晚會",
          category: "activity",
          location: "北斗老家",
          mapQuery: "彰化縣北斗鎮",
          note: "全家 7 人三代同堂在大院子升起炭火，烤肉串、海鮮、蔬菜香氣撲鼻，抬頭仰望明月，最珍貴溫馨的家族中秋夜！",
          completed: false
        }
      ]
    },
    {
      dayNumber: 4,
      date: "2026-09-28",
      weekday: "週一",
      theme: "北斗家常早晨・田尾公路花園協力車賞花・彰化高鐵北返台北",
      weather: "晴朗 28°C",
      spots: [
        {
          id: "s4-1",
          time: "09:30 - 11:30",
          title: "老家家常早餐・庭院漫步・悠閒收拾行囊",
          category: "activity",
          location: "北斗老家",
          mapQuery: "彰化縣北斗鎮",
          note: "睡飽飽享用長輩準備的家常早餐，慢步調節奏，不必匆忙。",
          completed: false,
          transitToNext: "開車 10 分鐘前往田尾公路花園"
        },
        {
          id: "s4-2",
          time: "11:45 - 14:30",
          title: "田尾公路花園租電動四輪遮陽協力車・花鄉漫遊 & 景觀下午茶",
          category: "attraction",
          location: "田尾公路花園",
          mapQuery: "田尾公路花園",
          note: "不用頂著太陽走路！全家租一台帶遮陽蓬的電動四輪車穿梭在綠意花海中，逛多肉植物農場與景觀咖啡館，微風拂面超級放鬆。",
          cost: "協力車租借約 NT$ 400",
          completed: false,
          transitToNext: "開車 15 分鐘至北斗老街採買伴手禮"
        },
        {
          id: "s4-3",
          time: "15:00 - 16:30",
          title: "採買中秋伴手禮（李老城肉乾、冷藏外帶肉圓裝保冷袋）",
          category: "shopping",
          location: "北斗老街商圈",
          mapQuery: "北斗范氏肉圓生",
          note: "採買薄脆李老城肉乾與整盒冷藏肉圓帶回台北蒸來吃，美味打包帶回家。",
          completed: false,
          transitToNext: "開車約 15 分鐘前往高鐵彰化站"
        },
        {
          id: "s4-4",
          time: "17:00 - 18:45",
          title: "提前抵達彰化高鐵站・全家站內悠閒晚餐・溫馨道別",
          category: "food",
          location: "高鐵彰化站",
          mapQuery: "高鐵彰化站",
          note: "全家送行至彰化高鐵站，欣賞花朵意象廊柱建築，站內悠閒享用晚餐後依依不捨道別。",
          completed: false,
          transitToNext: "台北組搭乘高鐵 1326 車次（發車 19:41）；北斗組開車返家"
        },
        {
          id: "s4-5",
          time: "19:41 - 20:44",
          title: "高鐵 1326 車次：彰化 ➔ 台北 (Aimee & Farl)",
          category: "transport",
          location: "高鐵彰化站 月台",
          mapQuery: "高鐵彰化站",
          note: "搭乘人員：Aimee (姑姑)、Farl (姑丈) 2人。座位 5 車 9D、5 車 9E。僅 1 小時 03 分即可抵達台北車站。",
          cost: "NT$ 1,640 (已付)",
          completed: false,
          transitToNext: "捷運或計程車溫暖賦歸"
        },
        {
          id: "s4-6",
          time: "20:44",
          title: "平安抵達台北車站・圓滿賦歸",
          category: "transport",
          location: "台北車站",
          mapQuery: "台北車站",
          note: "提領行李與伴手禮，搭乘捷運返家，結束充實開心的中秋台南與北斗探親之旅！",
          completed: false
        }
      ]
    }
  ],

  // 行李與準備清單 (台灣本島國旅專屬)
  packingCategories: [
    {
      category: "出發前要辦的事",
      items: [
        { id: "p20", name: "致穩補訂北斗組 5 人房間 (06-242 6677)", checked: false },
        { id: "p21", name: "維悅確認 7 人加床加人費用 (06-295 0888)", checked: false },
        { id: "p22", name: "象哥潮州牛雜湯訂 9/25 中午 7 位 (0979-803035) 當保底", checked: false },
        { id: "p23", name: "雨備：奇美博物館常設展線上預約 7 人（視天氣）", checked: false }
      ]
    },
    {
      category: "重要證件與票券",
      items: [
        { id: "p1", name: "身分證 / 健保卡 (全家 7 人全員必帶)", checked: true },
        { id: "p2", name: "高鐵 T-EX App 購票憑證截圖 (台北/彰化 2人)", checked: true },
        { id: "p3", name: "飯店預訂憑證 (致穩商旅 / 維悅酒店兩間房)", checked: true },
        { id: "p4", name: "信用卡 / 悠遊卡 / LINE Pay 錢包", checked: true },
        { id: "p5", name: "汽車駕照 (北斗組自駕車輛必備)", checked: true }
      ]
    },
    {
      category: "電子設備與通訊",
      items: [
        { id: "p6", name: "手機充電線 + 多孔豆腐頭 (多人快充)", checked: true },
        { id: "p7", name: "行動電源 (充飽電隨身攜帶)", checked: true },
        { id: "p8", name: "車用手機導航架與車充線", checked: true },
        { id: "p9", name: "相機 / 腳架 (中秋 7 人大合照必備)", checked: false }
      ]
    },
    {
      category: "常備藥品與防曬防蚊",
      items: [
        { id: "p10", name: "防蚊液 / 蚊蟲叮咬止癢藥膏 (四草、漁光島戶外必備)", checked: true },
        { id: "p11", name: "個人常規藥品 / 胃腸藥 / 止痛普拿疼", checked: true },
        { id: "p12", name: "防曬乳 / 太陽眼鏡 / 遮陽帽 (竹筏、鹽山曬)", checked: false },
        { id: "p13", name: "隨身輕便摺疊傘 (晴雨兩用)", checked: true }
      ]
    },
    {
      category: "衣物、小朋友與伴手禮品",
      items: [
        { id: "p14", name: "輕便透氣夏裝 (台南白天高溫 30 度)", checked: true },
        { id: "p15", name: "好走的運動球鞋 (十鼓、安平三連走超耐走)", checked: true },
        { id: "p16", name: "薄外套 / 車上與冷氣房防風外套", checked: true },
        { id: "p17", name: "小朋友隨身用品 (水壺、備用換洗衣物、濕紙巾、沙灘踩水拖鞋)", checked: true },
        { id: "p18", name: "帶回北斗的中秋禮盒 / 柚子", checked: true },
        { id: "p19", name: "大保冷袋 (裝台南彰化冷凍美食與肉圓伴手禮)", checked: true }
      ]
    }
  ],

  // 記帳資訊
  expenses: [
    {
      id: "e1",
      title: "高鐵去程 (台北➔台南) 2人票",
      amount: 2700,
      currency: "TWD",
      paidBy: "Aimee (姑姑)",
      category: "交通",
      date: "2026-09-25"
    },
    {
      id: "e2",
      title: "致穩人文商旅 1晚住宿費 (雙人房)",
      amount: 3200,
      currency: "TWD",
      paidBy: "Aimee (姑姑)",
      category: "住宿",
      date: "2026-09-25"
    },
    {
      id: "e3",
      title: "台南維悅酒店 2間房住宿費 (家庭房+雙人房)",
      amount: 7800,
      currency: "TWD",
      paidBy: "ㄚ維 (展維)",
      category: "住宿",
      date: "2026-09-26"
    },
    {
      id: "e4",
      title: "高鐵回程 (彰化➔台北) 2人票",
      amount: 1640,
      currency: "TWD",
      paidBy: "Aimee (姑姑)",
      category: "交通",
      date: "2026-09-28"
    }
  ]
};

// 掛載到全域或模組
if (typeof window !== 'undefined') {
  window.defaultTripData = defaultTripData;
}
