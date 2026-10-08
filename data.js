export const RETURN = {
  label: '畅春新院附近',
  mapName: '北京大学畅春新园',
};

export const PLANS = {
  '10': {
    date: '2026年10月10日 · 周六',
    title: '桌游、唱歌、铜锅涮肉',
    hours: '10:30—20:45',
    area: '海淀公园 → 苏州街 → 北门附近',
    budgetNote: '含可选KTV，暂按15人分摊。',
    costs: [
      ['午餐', 35, 50], ['桌游', 60, 100], ['涮肉', 80, 120],
      ['KTV（可选）', 30, 60], ['公共交通', 10, 25],
    ],
    stages: [
      {time:'10:30—11:15', title:'海淀公园', note:'东门集合，散步；之后留30分钟去苏州街。', map:'海淀公园东门'},
      {time:'11:45—12:30', title:'苏州街简餐', note:'在桌游店附近吃午饭。', map:'苏州街 西屋国际'},
      {time:'12:45—15:30', title:'猎人桌游 · 中关村店', note:'苏州街西屋国际；约3小时，可分桌玩。', map:'猎人桌游 中关村店'},
      {time:'16:00—18:00', title:'星聚会KTV · 中关村领展店', optional:true, note:'丹棱街甲1号；唱完后留45分钟回北门附近。', map:'星聚会KTV 中关村领展店'},
      {time:'18:45—20:00', title:'北门附近 · 铜锅涮肉', note:'具体门店待定，人均暂估80—120元。'},
      {time:'20:00—20:45', title:'回畅春新院附近', note:'饭后返程，预留30—45分钟。', map:RETURN.mapName, finish:true},
    ],
    essential: '桌游与KTV需提前订位、确认包间人数；不唱歌可在北门附近休息后会合。',
    sources: [
      ['桌游地址', 'https://www.amap.com/place/B000A88IGW'],
      ['桌游点评', 'https://www.dianping.com/shop/3715864/photos/album'],
      ['KTV地址', 'https://www.amap.com/place/B0FFIRZ09B'],
    ],
  },
  '18': {
    date: '2026年10月18日 · 周日',
    title: '颐和园散步，回北门吃涮肉',
    hours: '09:30—19:45',
    area: '颐和园 → 北门附近 → 畅春新院',
    budgetNote: '含普通成人门票，不含游船、园中园。',
    costs: [
      ['颐和园普通成人门票', 30, 30], ['午餐与饮水', 25, 40],
      ['涮肉', 80, 120], ['公共交通', 10, 20],
    ],
    stages: [
      {time:'09:30—10:15', title:'集合，前往颐和园东宫门', note:'畅春新院附近集合；公交或步行，预留45分钟。', map:'颐和园 东宫门'},
      {time:'10:15—12:30', title:'东宫门 → 长廊 → 昆明湖', note:'以湖边平路为主，不安排登山。', map:'颐和园 长廊'},
      {time:'12:30—13:15', title:'午餐与休息', note:'自带简餐、饮水，在允许停留的休息区用餐。'},
      {time:'13:15—15:30', title:'东堤 → 十七孔桥 → 新建宫门', note:'沿湖散步，15:30出园；累了可提前折返。', map:'颐和园 新建宫门'},
      {time:'15:30—17:30', title:'回北门附近，休息', note:'返程预留60分钟，再就近休息等晚餐。'},
      {time:'17:30—19:00', title:'北门附近 · 铜锅涮肉', note:'具体门店待定，人均暂估80—120元。'},
      {time:'19:00—19:45', title:'回畅春新院附近', note:'饭后返程，预留30—45分钟。', map:RETURN.mapName, finish:true},
    ],
    essential: '颐和园普通成人门票30元，提前购票；下雨改为校区附近室内活动。',
    sources: [
      ['颐和园票价', 'https://summerpalace.net.cn/home.html'],
      ['东宫门位置', 'https://ditu.amap.com/place/B000A81K3J'],
    ],
  },
};

export function total(plan) {
  return plan.costs.reduce((sum, [,low,high])=>[sum[0]+low,sum[1]+high],[0,0]);
}

export function mapURL(place) {
  return 'https://uri.amap.com/search?'+new URLSearchParams({
    keyword:'北京市 '+place,city:'110000',view:'map',src:'beijing-outing-2026',callnative:'0',
  });
}
