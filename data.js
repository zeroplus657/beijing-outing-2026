export const REPO = 'zeroplus657/beijing-outing-2026';
export const CHECKED = '2026-10-07';
export const DAYS = {
  '10': { label: '10月10日', full: '2026年10月10日 · 周六', theme: 'city', subtitle: '市内见，玩到晚上', routes: ['city'], note: '10号按完整一日活动安排：上午公园、下午桌游、晚上火锅与唱歌。也可以按个人时间选择参加其中一段。' },
  '18': { label: '10月18日', full: '2026年10月18日 · 周日', theme: 'nature', subtitle: '去户外，把节奏放慢', routes: ['xiangshan', 'olympic'], note: '香山是西郊登山线；奥森是市内低强度替代，不是京郊。两条都在北京市，当天往返、不走夜山。' }
};
export const SOURCES = [
  {id:'hunter',name:'猎人桌游（中关村店）',publisher:'高德地图',url:'https://www.amap.com/place/B000A88IGW',fact:'苏州街12号西屋国际大厦周边底商。仅核对地点，不代表确认营业和包间库存。'},
  {id:'hunter-dp',name:'猎人桌游吧（中关村苏州街店）',publisher:'大众点评',url:'https://www.dianping.com/shop/3715864/photos/album',fact:'点评列西屋国际外围一楼S-110；与高德入口描述略有差别，到店前请确认入口。页面人均不是本次团购报价。'},
  {id:'ktv',name:'星聚会KTV（中关村领展店）',publisher:'高德地图',url:'https://www.amap.com/place/B0FFIRZ09B',fact:'丹棱街甲1号6层601-03。15人同包间及晚间时段需向商家确认。'},
  {id:'banu',name:'巴奴毛肚火锅（新中关店）',publisher:'大众点评',url:'https://m.dianping.com/shop/1896600732',fact:'中关村晚餐候选店。营业、当日排队和多人座位尚未向商户核实。'},
  {id:'haidian',name:'海淀公园',publisher:'海淀区政府',url:'https://zyk.bjhd.gov.cn/kjhd/lyhd/202208/t20220811_4547740_hd.shtml',fact:'城市公园位置与设施介绍；现场开放区域以公园通知为准。'},
  {id:'xiangshan',name:'香山公园票价与开放时间',publisher:'香山公园官网',url:'https://xiangshanpark.com/cn/',fact:'现行旺季成人公园门票10元；6:00开园、18:30停止入园、19:30闭园。不含索道、联票及单独收费景区。'},
  {id:'tram',name:'香山公共交通提示',publisher:'北京市公安局公安交通管理局',url:'https://jtgl.beijing.gov.cn/jgj/jgxx/94246/95332/743789844/index.html',fact:'参考10号线巴沟换西郊线至香山、步行约600米。该文的2025年临时管制日期不能当作2026年公告。'},
  {id:'haidilao',name:'海底捞火锅（万柳店）',publisher:'高德地图',url:'https://ditu.amap.com/place/B000ABBYSI',fact:'巴沟路2号华联万柳购物中心五层L507、508；适合从西郊线返回后就近用餐，实际桌位待确认。'},
  {id:'haidilao-dp',name:'海底捞（万柳店）地址',publisher:'大众点评',url:'https://www.dianping.com/shop/4017142/photos/album',fact:'地址与高德记录相互印证；未获取活动当天可用套餐。'},
  {id:'olympic',name:'奥林匹克森林公园',publisher:'北京市园林绿化局',url:'https://yllhj.beijing.gov.cn/ggfw/bjsggml/zhgy/cyq/202206/t20220614_2740317.shtml',fact:'普通入园免费、非全天开放；大型活动期间的临时限制须临行核对。'},
  {id:'olympic-hours',name:'奥森游览信息',publisher:'北京市政府英文网站 · 2026年3月',url:'https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260320_4562517.html',fact:'页面列示6:00—21:00，作为一般开放时间参考，不保证临时活动期间适用。'},
  {id:'thai',name:'正泰餐厅AmazingThai（新奥购物中心店）',publisher:'大众点评',url:'https://www.dianping.com/shop/G22KTf2ivfrfYw0H/photos?pg=35',fact:'奥森线就近聚餐候选；多人桌位、菜单价格及营业情况待确认。'}
];
const stage = (time,title,place,description,transfer,refs=[],kind='activity') => ({time,title,place,description,transfer,refs,kind});
export const ROUTES = {
  city: {
    day:'10',name:'海淀市内线',short:'桌游 · 火锅 · KTV',duration:'10:30—21:30',effort:'低强度 / 室内为主',area:'海淀公园—苏州街—海淀黄庄',
    intro:'把桌游、火锅和唱歌放在同一个片区。白天完整参加，或在晚餐时会合，都不用横穿北京。',
    meet:'10:30 海淀公园东门外；午后场13:30猎人桌游；晚间场17:30新中关。具体店门口由组织者下单后在群里确认。',
    transport:'自行到集合点；海淀公园到苏州街预留30—40分钟，优先步行或公交。苏州街到新中关步行预留20—30分钟，晚餐到KTV预留15分钟。均为组织用缓冲估算，临行看高德实时路线。',
    stages:[
      stage('10:30—11:30','先在公园碰头','海淀公园东门','轻松散步、认识一下新同学；不组织占道或扩音活动。天气不好时跳过此段，午餐集合。','11:30出发去苏州街，留30—40分钟。',['haidian']),
      stage('12:10—13:10','简餐，留点胃口','苏州街周边简餐','按小桌分组吃饭，午餐不追求全员同桌；下午1:20前抵达桌游店。','餐馆到桌游店预留20分钟，附近选店即可。'),
      stage('13:30—16:30','今天先做队友','猎人桌游（中关村店）','先玩低门槛破冰游戏，再分2—3桌。狼人杀、麻将等按意愿选择，不安排现金输赢。需询问是否提供教学、能否接待预计人数。','16:30结束；步行到新中关，预留候位和休息。',['hunter','hunter-dp']),
      stage('17:30—19:00','围一锅，好好聊','巴奴毛肚火锅（新中关店）','提前询问能否安排相邻2—3桌，忌口私下告诉组织者。预算偏高可由同学推荐同商圈替代店，不默认有学生折扣。','晚餐后留30分钟结账、步行至领展KTV。',['banu']),
      stage('19:30—21:30','把最后一首留给大家','星聚会KTV（中关村领展店）','可选环节。预订前确认15人实际核定容量、两小时总价、最低消费与退改。若只有小包，分包或取消，不超员。','21:30散场，预留返程时间；不以末班车为计划底线。',['ktv'],'optional')
    ],
    costs:[{name:'午餐',low:35,high:50},{name:'桌游3小时',low:60,high:100},{name:'火锅晚餐',low:130,high:180},{name:'市内交通',low:15,high:30},{name:'KTV 2小时 / 每15人一间暂估',low:450,high:900,shared:true,capacity:15,optional:true}],
    checks:['按完整一日活动统计参加人数，同时允许只参加其中一段。','桌游先问人数、起订人数、计时、教学费及游戏种类。','火锅问相邻桌位；KTV问核定容量、总价、酒水低消、押金及取消期限。','按最终人数重新报价；不要用“人均几十”直接乘15后下单。'],
    fallback:'下雨时省去公园，12:10从午餐开始。桌游店无位则在同商圈更换；未订到合适KTV就以晚餐收尾。只有晚间有空：17:30晚餐＋可选KTV。'
  },
  xiangshan: {
    day:'18',name:'香山西郊线',short:'登山 · 赏秋 · 下山火锅',duration:'08:00—20:00',effort:'中等强度 / 有台阶',area:'巴沟—香山—万柳',
    intro:'上午进山、下午下山，晚上回到地铁旁吃火锅。不把香山与奥森塞进同一天，也不把夜间行程留在山里。',
    meet:'08:00 巴沟站出站后西郊线入口外集合，08:15整队出发；各自提前吃早餐。',
    transport:'10号线巴沟出站换乘西郊线到香山站，再步行至公园东门。单程为集合、排队、乘车和步行共预留60—90分钟；15人不依赖现场临时叫多辆车。返程原路到巴沟，万柳华联就在该片区。',
    stages:[
      stage('08:00—09:30','早一点，给排队留余量','巴沟站—香山公园东门','集合后搭西郊线前往香山。门票按官网渠道提前准备；红叶观赏程度、限流与当年交通管制不作保证。','路程、换乘和步行合计预留90分钟。',['tram','xiangshan']),
      stage('09:30—12:00','走到哪里，按体力决定','香山公园 · 玉华岫方向','沿公园开放道路上行，在玉华岫一带休息。是否继续登香炉峰由全组体力与现场时间决定，不把登顶设为必须完成的目标。','不走野路；队首队尾互相照应，分队需另约会合点。',['xiangshan']),
      stage('12:00—13:00','轻食补给与休息','香山公园开放休息区','自备饮水与便携午餐，在允许停留的区域用餐。无明火、无烧烤，垃圾全部带走，不依赖山上临时找到餐馆。','为下山保留足够体力，不在此时临时追加山外景点。'),
      stage('13:00—14:30','从容下山','香山公园东门','统一开始下山。体力不足者提前折返；不为了看日落滞留山中。遇大风、降雨或景区关闭，取消登山。','14:30在东门清点人数。',['xiangshan']),
      stage('14:30—16:00','回到城里，歇一会儿','西郊线—巴沟站','原路返回，吸收排队或步行的延误；早点到的同学可在万柳华联休息。','返程留90分钟；如果延误，优先压缩闲逛而非赶路。',['tram']),
      stage('17:00—18:45','下山之后吃火锅','海底捞火锅（万柳店）','提前约相邻桌位，安排在华联万柳购物中心五层。火锅有不辣锅底需求、食物过敏等请私下沟通。','与巴沟站同片区，聚餐后不用长距离转场。',['haidilao','haidilao-dp']),
      stage('18:45—20:00','夜间自由收尾','万柳华联—巴沟站','愿意的同学就近聊天或喝点东西，疲惫的同学可直接返程。20:00前结束；不安排二次登山或远距离夜场。','从巴沟站按各自目的地返程。',[],'optional')
    ],
    costs:[{name:'公园成人门票（官网现价）',low:10,high:10,verified:true},{name:'饮水与便携午餐',low:30,high:50},{name:'火锅晚餐',low:100,high:150},{name:'公共交通',low:15,high:30},{name:'晚间饮品（自选）',low:0,high:30,optional:true}],
    checks:['提前两天检查官方天气、景区开放与2026年交通通知；18日天气目前不作预测。','香山成人公园门票10元是核实时的官网价格，索道及其他收费景点未计入。','运动鞋、保暖层、饮水与午餐自备；有膝关节不适的同学优先选奥森线。','火锅预约人数、相邻桌位与晚到保留时间必须确认。'],
    fallback:'体力或客流顾虑：选奥森轻松线（它不是雨天方案）。降雨、大风或闭园：取消户外活动，改为万柳室内聚餐，或采用10号的桌游方案并重新确认场地。'
  },
  olympic: {
    day:'18',name:'奥森轻松线',short:'散步 · 野餐轻食 · 城市夜景',duration:'10:00—20:00',effort:'低至中等 / 平路为主',area:'奥森南园—新奥购物中心—鸟巢外广场',
    intro:'不想爬山就选这条：留在市内，半天公园、半天聚餐。路程可缩短，不必围绕整个园区走一圈。',
    meet:'10:00 地铁8号线森林公园南门站出站后，在南园南门外集合；具体出口以当日导航与开放情况为准。',
    transport:'去程各自坐地铁到森林公园南门站。公园内只走南园开放主路，向新奥购物中心转场预留30—45分钟。夜景段看体力决定，回程优先奥林匹克公园站（8/15号线）。时间为计划预留，不是实时导航。',
    stages:[
      stage('10:00—12:00','把步速调慢一点','奥林匹克森林公园南园','沿奥海周边开放主路散步、拍照；按全组体力控制步行量，不默认人人都能走完长环线。','轻装出行，集合点和结束点提前统一。',['olympic','olympic-hours']),
      stage('12:00—13:00','午间轻食','奥森南园允许停留的休息区','自带三明治、水果和饮水；在允许区域休息，不占用封闭草坪、不生火、不放扩音器。','午后继续园内短线，不另赶远处景点。'),
      stage('13:00—15:00','散步或随身桌游','奥森南园','在合适的休息区玩简单卡牌、聊聊天；自带桌游，不承诺公园有出租桌椅或允许大型团体占场。','15:00收拾离开，垃圾随身带走。'),
      stage('15:00—16:00','转场与休息','新奥购物中心','步行转场并预留休息时间；累了可提前结束公园段直接会合。','预计步行30—45分钟，走商场实际开放入口。'),
      stage('16:30—18:00','早点吃，不挤晚高峰','正泰餐厅AmazingThai（新奥购物中心店）','泰餐作为就近聚餐候选，需提前问多人相邻桌与实际菜单价；不合口味可推荐同商场替代，避免临时跨区找店。','18:00后视体力和天气决定夜景段。',['thai']),
      stage('18:30—20:00','看夜景，按时回家','鸟巢／水立方外部开放公共区域','仅看外观，不含场馆门票；不保证灯光秀或建筑亮灯。遇活动安检或区域封闭，就在可达公共区域散步后返程。','20:00前散场。请查自己返程路线，别等末班车。',[],'optional')
    ],
    costs:[{name:'公园普通入园（官方信息）',low:0,high:0,verified:true},{name:'午餐轻食与饮水',low:30,high:50},{name:'聚餐',low:90,high:140},{name:'公共交通',low:15,high:30},{name:'咖啡或饮品（自选）',low:0,high:30,optional:true}],
    checks:['奥森是市内低强度备选，不等于不用走路；可随时缩短公园段。','一般入园免费，但需核对大型活动、临时闭园或公共区域管制。','正泰餐厅是候选店，营业与座位尚未电话确认；夜景不保证亮灯。','降雨、大风同样不适合公园活动，需改室内。'],
    fallback:'小组偏好火锅可先在新奥及周边查店，再由同学提交建议；不要临时绕到海淀。天气不适合户外时取消公园与夜景，改成已确认的室内活动。'
  }
};
export function estimate(route, people=15, extras=true, evening=false) {
  const n = Math.min(40,Math.max(2,Math.round(Number(people)||15)));
  const rows = route.costs.filter(c => (extras || !c.optional) && (!evening || c.name.includes('火锅') || c.shared || c.name.includes('交通'))).map(c=>{
    const rooms=c.shared?Math.ceil(n/c.capacity):0;
    return {...c,perLow:c.shared?Math.ceil(c.low*rooms/n):c.low,perHigh:c.shared?Math.ceil(c.high*rooms/n):c.high,rooms};
  });
  return {people:n,rows,low:rows.reduce((s,c)=>s+c.perLow,0),high:rows.reduce((s,c)=>s+c.perHigh,0)};
}
export function mapURL(place) {
  return 'https://uri.amap.com/search?' + new URLSearchParams({keyword:'北京市 '+place,city:'110000',view:'map',src:'beijing-outing-2026',callnative:'0'});
}
export function suggestionBody(values) {
  return ['北京出行建议','',`日期：2026-10-${values.day}`,`方案：${values.route}`,`称呼：${values.nickname}`,`参加时段：${values.attendance}`,`建议类别：${values.category}`,'地点范围：北京市',`区县：${values.district}`,`人均预算：${values.budget || '未填写'}`,`参考链接：${values.link || '未填写'}`,'','具体建议：',values.message,'','说明：这是一条公开建议，不是已确认的报名或预订。请勿填写手机号、微信号或其他人的个人信息。'].join('\n');
}
export function issueURL(values) {
  const title=`【10月${values.day}日】${values.category} · ${values.nickname}`;
  return `https://github.com/${REPO}/issues/new?`+new URLSearchParams({title,body:suggestionBody(values)});
}
