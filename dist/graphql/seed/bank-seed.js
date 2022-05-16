"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bank_1 = require("../entity/bank");
class CreateBanks {
    async run(factory, connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(bank_1.Bank)
            .values([
            {
                code: '000',
                name: '中央銀行國庫局'
            },
            {
                code: '004',
                name: '臺灣銀行'
            },
            {
                code: '005',
                name: '臺灣土地銀行'
            },
            {
                code: '006',
                name: '合作金庫商業銀行'
            },
            {
                code: '007',
                name: '第一商業銀行'
            },
            {
                code: '008',
                name: '華南商業銀行'
            },
            {
                code: '009',
                name: '彰化商業銀行'
            },
            {
                code: '011',
                name: '上海商業儲蓄銀行'
            },
            {
                code: '012',
                name: '台北富邦商業銀行'
            },
            {
                code: '013',
                name: '國泰世華商業銀行'
            },
            {
                code: '016',
                name: '高雄銀行'
            },
            {
                code: '017',
                name: '兆豐國際商業銀行'
            },
            {
                code: '018',
                name: '全國農業金庫'
            },
            {
                code: '020',
                name: '日商瑞穗銀行台北分行'
            },
            {
                code: '021',
                name: '花旗(台灣)商業銀行'
            },
            {
                code: '022',
                name: '美國銀行台北分行'
            },
            {
                code: '023',
                name: '泰國盤谷銀行台北分行'
            },
            {
                code: '025',
                name: '菲律賓首都銀行台北分行'
            },
            {
                code: '029',
                name: '新加坡商大華銀行台北分行'
            },
            {
                code: '030',
                name: '美商道富銀行台北分行'
            },
            {
                code: '037',
                name: '法商法國興業銀行台北分行'
            },
            {
                code: '039',
                name: '澳商澳盛銀行台北分行'
            },
            {
                code: '048',
                name: '王道商業銀行'
            },
            {
                code: '050',
                name: '臺灣中小企業銀行'
            },
            {
                code: '052',
                name: '渣打國際商業銀行'
            },
            {
                code: '053',
                name: '台中商業銀行'
            },
            {
                code: '054',
                name: '京城商業銀行'
            },
            {
                code: '060',
                name: '兆豐票券金融股份有限公司'
            },
            {
                code: '061',
                name: '中華票券金融股份有限公司'
            },
            {
                code: '062',
                name: '國際票券金融股份有限公司'
            },
            {
                code: '066',
                name: '萬通票券金融股份有限公司'
            },
            {
                code: '072',
                name: '德商德意志銀行台北分行'
            },
            {
                code: '075',
                name: '香港商東亞銀行台北分行'
            },
            {
                code: '076',
                name: '美商摩根大通銀行台北分行'
            },
            {
                code: '081',
                name: '匯豐(台灣)商業銀行'
            },
            {
                code: '082',
                name: '法國巴黎銀行台北分行'
            },
            {
                code: '085',
                name: '新加坡商新加坡華僑銀行台北分行'
            },
            {
                code: '086',
                name: '法商東方匯理銀行台北分行'
            },
            {
                code: '092',
                name: '瑞士商瑞士銀行台北分行'
            },
            {
                code: '093',
                name: '荷商安智銀行台北分行'
            },
            {
                code: '098',
                name: '日商三菱日聯銀行台北分行'
            },
            {
                code: '101',
                name: '瑞興商業銀行'
            },
            {
                code: '102',
                name: '華泰商業銀行'
            },
            {
                code: '103',
                name: '臺灣新光商業銀行'
            },
            {
                code: '108',
                name: '陽信商業銀行'
            },
            {
                code: '114',
                name: '基隆第一信用合作社'
            },
            {
                code: '115',
                name: '基隆市第二信用合作社'
            },
            {
                code: '118',
                name: '板信商業銀行'
            },
            {
                code: '119',
                name: '淡水第一信用合作社'
            },
            {
                code: '130',
                name: '新竹第一信用合作社'
            },
            {
                code: '132',
                name: '新竹第三信用合作社'
            },
            {
                code: '146',
                name: '台中市第二信用合作社'
            },
            {
                code: '147',
                name: '三信商業銀行'
            },
            {
                code: '162',
                name: '彰化第六信用合作社'
            },
            {
                code: '204',
                name: '高雄市第三信用合作社'
            },
            {
                code: '215',
                name: '花蓮第一信用合作社'
            },
            {
                code: '216',
                name: '花蓮第二信用合作社'
            },
            {
                code: '321',
                name: '日商三井住友銀行台北分行'
            },
            {
                code: '326',
                name: '西班牙商西班牙對外銀行臺北分行'
            },
            {
                code: '372',
                name: '大慶票券金融股份有限公司'
            },
            {
                code: '380',
                name: '大陸商中國銀行臺北分行'
            },
            {
                code: '381',
                name: '大陸商交通銀行臺北分行'
            },
            {
                code: '382',
                name: '大陸商中國建設銀行臺北分行'
            },
            {
                code: '600',
                name: '農金資訊股份有限公司'
            },
            {
                code: '700',
                name: '中華郵政股份有限公司'
            },
            {
                code: '803',
                name: '聯邦商業銀行'
            },
            {
                code: '805',
                name: '遠東國際商業銀行'
            },
            {
                code: '806',
                name: '元大商業銀行'
            },
            {
                code: '807',
                name: '永豐商業銀行'
            },
            {
                code: '808',
                name: '玉山商業銀行'
            },
            {
                code: '809',
                name: '凱基商業銀行'
            },
            {
                code: '810',
                name: '星展(台灣)商業銀行'
            },
            {
                code: '812',
                name: '台新國際商業銀行'
            },
            {
                code: '815',
                name: '日盛國際商業銀行'
            },
            {
                code: '816',
                name: '安泰商業銀行'
            },
            {
                code: '822',
                name: '中國信託商業銀行'
            },
            {
                code: '824',
                name: '連線商業銀行'
            },
            {
                code: '826',
                name: '樂天國際商業銀行'
            },
            {
                code: '952',
                name: '財團法人農漁會南區資訊中心'
            },
            {
                code: '995',
                name: '關貿網路股份有限公司'
            },
            {
                code: '996',
                name: '財政部國庫署'
            },
            {
                code: '997',
                name: '中華民國信用合作社聯合社南區聯合資訊處理中心'
            }
        ])
            .execute();
    }
}
exports.default = CreateBanks;