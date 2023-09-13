// effect
let le = text => {
	let obj = JSON.parse(text);
	obj.forEach(e => {
		if(e['id'] == 0 || e['id']) {
			let id = Number(e['id']);
			let na = e['effname'];
			let ev = e['eval'];
			let ne = e['title'];
			let de = e['desc'];
			let syn = (e['syneff'] == '1');
			seff.pushEff(id, na, ev, ne, de, syn);
		}
	})
}
// tag
let lt = text => {
	let obj = JSON.parse(text);
	obj.forEach(element => {
		if(element['id'] === '0' || element['id']) {
			let linkFROM = [];
			if(element['lfrom']) {
				let lfr = element['lfrom'].split(';');
				lfr.forEach(e => {
					let f = e.trim().split(' ');
					if(f[1] == '&') linkFROM.push([0, Number(f[0]), Number(f[2])]);
					else linkFROM.push([1, Number(f[0]), Number(f[2])]);
				});
			}
			let ava = 63;
			let ev = element['eval'];
			stag.newTag(Number(element['id']), Number(element['llv']), element['name'], linkFROM, ava, element['effect'], [], ev);
		}
	});
};

// items
let litem = text => {
	let obj = JSON.parse(text);
	obj.forEach(e => {
		if(e['id'] == 0 || e['id']) {
			let id = Number(e['id']);
			let name = e['name'];
			let type = Number(e['type']);
			let eff = [];
			let cat = [];
			e['cat'].split(';').forEach(ee => {
				let ee1 = ee.trim();
				cat.push(Number(ee1));
			});
			let pnt = [];
			pnt[0] = Number(e['metal']);
			pnt[1] = Number(e['water']);
			pnt[2] = Number(e['wood']);
			pnt[3] = Number(e['fire']);
			pnt[4] = Number(e['earth']);
			let rec = [];
			let e_rec = e['receipt'].split(';');
			// console.log(e_rec);
			// debugger;
			for(let i = 0; i < e_rec.length; i += 2) {
				let quality = Number(e_rec[i].trim());
				let itt = e_rec[i + 1].trim();
				if(quality == -1) {
					rec = [[-1, 0, 0]];
					break;
				};
				if(itt[0] == '(') {
					let bo = Number(itt.slice(1, itt.length - 1));
					rec.push([1, quality, bo]);
					continue;
				};
				if(itt[0] == '#') {
					let bo = Number(itt.slice(1, itt.length));
					rec.push([2, quality, bo]);
					continue;
				};
				rec.push([0, quality, Number(itt)]);
			};
			
			if(e['effect']) {
				//debugger;
				let xeff = e['effect'].split('!');
				xeff.forEach(ee => {
					ee = ee.trim();
					let xee = ee.split('#');
					let xeid = Number(xee[0].trim());
					let effx = [];
					for(let i = 1; i < xee.length; i++) {
						let xeee = xee[i].split(';');
						xeee[0] = xeee[0].trim();
						xeee[1] = xeee[1].trim();
						let xeeee = xeee[1].split('+');
						effx.push({lv: Number(xeee[0]), eff: [Number(xeeee[0]), Number(xeeee[1]), Number(xeeee[2])]});
					}
					eff.push({element: xeid, eff: effx});
				})
				
			};
			
			// debugger;
			
			let atkdef = [0, 0, 0, 0, 0, 0];
			// HP, MP, atk, def, agi, luk
			if(e['atkdefbase'] == "0") atkdef = [0, 0, 0, 0, 0, 0];
			else {
				let atkdefe = e['atkdefbase'].trim().split(';');
				for(let i = 0; i <= 5; i++) atkdef[i] = Number(atkdefe[i].trim());
			}
			
			// time, damage, recovery
			let used = [0, 0, 0]
			used[0] = Number(e['used']);
			used[1] = Number(e['damage']);
			used[2] = Number(e['heal']);
			
			let price = Number(e['price']);
			
			let lv = Number(e['lv']);
			
			sitem.newaItem(id, name, type, cat, eff, pnt, rec, atkdef, used, lv, price);
			
		};
	});
};



// cat
JSON.parse(`[
	{"id":"0","cat":"metal"},
	{"id":"1","cat":"gas"},
	{"id":"2","cat":"liquid"},
	{"id":"3","cat":"plant"},
	{"id":"4","cat":"wood"},
	{"id":"5","cat":"fuel"},
	{"id":"6","cat":"dynamite"},
	{"id":"7","cat":"dirt"},
	{"id":"8","cat":"stone"},
	{"id":"9","cat":"ore"},
	{"id":"10","cat":"mysterious power"},
	{"id":"11","cat":"radioactive material"},
	{"id":"12","cat":"toxic chemicals"},
	{"id":"13","cat":"herbs"},
	{"id":"14","cat":"seed"},
	{"id":"15","cat":"animail material"},
	{"id":"16","cat":"wire"},
	{"id":"17","cat":"fabric"},
	{"id":"18","cat":"alloy"},
	{"id":"19","cat":"acid"},
	{"id":"20","cat":"alkali"},
	{"id":"21","cat":"salt"},
	{"id":"22","cat":"impurities"},
	{"id":"23","cat":"neutralizer"},
	{"id":"24","cat":"food"},
	{"id":"25","cat":"grain"},
	{"id":"26","cat":"bomb"},
	{"id":"27","cat":"potion"},
	{"id":"28","cat":"weapon"},
	{"id":"29","cat":"armor"},
	{"id":"30","cat":"accessories"}
	]`).forEach(e => {
		sitem.newaCat(Number(e['id']), e['cat']);
});

le(`[
{"id":"-1","effname":"no effect","eval":"-1","title":"()=>'no effect'","desc":"()=>'no effect'"},
{"id":"0","effname":"add point metal","eval":"-1","title":"x=>'metal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase metal by '+x+((x>=0)?'':' times')"},
{"id":"1","effname":"add point water","eval":"-1","title":"x=>'water '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase water by '+x+((x>=0)?'':' times')"},
{"id":"2","effname":"add point wood","eval":"-1","title":"x=>'wood '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase wood by '+x+((x>=0)?'':' times')"},
{"id":"3","effname":"add point fire","eval":"-1","title":"x=>'fire '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase fire by '+x+((x>=0)?'':' times')"},
{"id":"4","effname":"add point earth","eval":"-1","title":"x=>'earth '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase earth by '+x+((x>=0)?'':' times')"},
{"id":"5","effname":"synthesize: add point metal","eval":"x=>{if(x>=0){curpnt[0]+=x;sumpnt[0]+=x}else{x=-x;sumpnt[0]+=(curpnt[0]*(x-1));curpnt[0]*=x;}}","title":"x=>'synthesize: metal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase metal by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"6","effname":"synthesize: add point water","eval":"x=>{if(x>=0){curpnt[1]+=x;sumpnt[1]+=x}else{x=-x;sumpnt[1]+=(curpnt[1]*(x-1));curpnt[1]*=x;}}","title":"x=>'synthesize: water '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase water by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"7","effname":"synthesize: add point wood","eval":"x=>{if(x>=0){curpnt[2]+=x;sumpnt[2]+=x}else{x=-x;sumpnt[2]+=(curpnt[2]*(x-1));curpnt[2]*=x;}}","title":"x=>'synthesize: wood '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase wood by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"8","effname":"synthesize: add point fire","eval":"x=>{if(x>=0){curpnt[3]+=x;sumpnt[3]+=x}else{x=-x;sumpnt[3]+=(curpnt[3]*(x-1));curpnt[3]*=x;}}","title":"x=>'synthesize: fire '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase fire by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"9","effname":"synthesize: add point earth","eval":"x=>{if(x>=0){curpnt[4]+=x;sumpnt[4]+=x}else{x=-x;sumpnt[4]+=(curpnt[4]*(x-1));curpnt[4]*=x;}}","title":"x=>'synthesize: earth '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase earth by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"10","effname":"synthesize: add link times","eval":"x=>{link+=x}","title":"x=>'synthesize: link + '+x","desc":"x=>'increase links by '+x+' when used as ingredient'"},
{"id":"11","effname":"synthesize: add unlink times","eval":"x=>{unlink+=x}","title":"x=>'synthesize: unllink + '+x","desc":"x=>'increase unlinks by '+x+' when used as ingredient'"},
{"id":"12","effname":"synthesize: suppress tag joining","eval":"_=>{(jointag?(jointag=false):false)}","title":"x=>'synthesize: suppress tag joining'","desc":"x=>'synthesize: suppress tag joining when used as ingredient'"},
{"id":"13","effname":"synthesize: quality up","eval":"x=>{if(x>=0){qualityup+=x}else{qualityuppercent-=x}curquality=Math.floor(((qualitysum/insertcount)+qualityup)*(1+(qualityuppercent/100)))}","title":"x=>'synthesize: quality up by'+x+((x>=0)?'':' %')","desc":"x=>'increase quality by '+x+((x>=0)?'':' %')+' when used as ingredient'"},
{"id":"14","effname":"synthesize: extra component by item id","eval":"(x,y)=>{for(let i=0;i<y;i++)materialList.push([0,x],[1,0])}","title":"(x,y)=>'synthesize: extra item: '+sitem.a[x].n+' x '+y","desc":"(x,y)=>'add extra item: '+sitem.a[x].n+' when used as ingredient'+' x '+y"},
{"id":"15","effname":"synthesize: extra component by category","eval":"(x,y)=>{for(let i=0;i<y;i++)materialList.push([1,x],[1,0])}","title":"(x,y)=>'synthesize: extra item: ('+sitem.c[x]+')'+' x '+y","desc":"(x,y)=>'add extra item: ('+sitem.c[x]+') when used as ingredient'+' x '+y"},
{"id":"16","effname":"synthesize: extra component by tag","eval":"(x,y)=>{for(let i=0;i<y;i++)materialList.push([2,x],[1,0])}","title":"(x,y)=>'synthesize: extra item: #'+stag.t[x].n+' x '+y","desc":"(x,y)=>'add extra item: #'+stag.t[x].n+'when used as ingredient'+' x '+y"},
{"id":"17","effname":"synthesize: quantity up","eval":"x=>{extramake+=x}","title":"x=>'synthesize: quantity up by'+x","desc":"x=>'synthesize: quantity up by'+x+' when used as ingredient'"},
{"id":"18","effname":"synthesize: HP up","eval":"x=>{if(x>=0){atkdef[0]+=x}else{atkdef[0]*=(-x)}}","title":"x=>'synthesize: HP '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase HP by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"19","effname":"synthesize: MP up","eval":"x=>{if(x>=0){atkdef[1]+=x}else{atkdef[1]*=(-x)}}","title":"x=>'synthesize: MP '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase MP by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"20","effname":"synthesize: atk up","eval":"x=>{if(x>=0){atkdef[2]+=x}else{atkdef[2]*=(-x)}}","title":"x=>'synthesize: atk '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase atk by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"21","effname":"synthesize: def up","eval":"x=>{if(x>=0){atkdef[3]+=x}else{atkdef[3]*=(-x)}}","title":"x=>'synthesize: def '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase def by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"22","effname":"synthesize: agi up","eval":"x=>{if(x>=0){atkdef[4]+=x}else{atkdef[4]*=(-x)}}","title":"x=>'synthesize: agi '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase agi by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"23","effname":"synthesize: luk up","eval":"x=>{if(x>=0){atkdef[5]+=x}else{atkdef[5]*=(-x)}}","title":"x=>'synthesize: luk '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase luk by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"24","effname":"synthesize: give tag","eval":"x=>{pushTags(stag.t[x])}","title":"x=>'synthesize: extra tag: #'+stag.t[x].n","desc":"x=>'give extra tag: #'+stag.t[x].n+' to product when used as ingredient'"},
{"id":"25","effname":"synthesize: give category","eval":"x=>{pushcat(x)}","title":"x=>'synthesize: extra category: ('+sitem.c[x]+')'","desc":"x=>'give extra category: ('+sitem.c[x]+') to product when used as ingredient'"},
{"id":"26","effname":"synthesize: level down","eval":"x=>{lvdown+=x}","title":"x=>'synthesize: lv down by + '+x","desc":"x=>'decrease lv of product by '+x+' when used as ingredient'"},
{"id":"27","effname":"give category","eval":"-1","title":"x=>'extra category: ('+sitem.c[x]+')'","desc":"x=>'extra category: ('+sitem.c[x]+')'"},
{"id":"28","effname":"HP up","eval":"-1","title":"x=>'HP '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase HP by '+x+((x>=0)?'':' times')"},
{"id":"29","effname":"MP up","eval":"-1","title":"x=>'MP '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase MP by '+x+((x>=0)?'':' times')"},
{"id":"30","effname":"atk up","eval":"-1","title":"x=>'atk '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase atk by '+x+((x>=0)?'':' times')"},
{"id":"31","effname":"ef up","eval":"-1","title":"x=>'def '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase def by '+x+((x>=0)?'':' times')"},
{"id":"32","effname":"agi up","eval":"-1","title":"x=>'agi '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase agi by '+x+((x>=0)?'':' times')"},
{"id":"33","effname":"luk up","eval":"-1","title":"x=>'luk '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase luk by '+x+((x>=0)?'':' times')"},
{"id":"34","effname":"use time up","eval":"-1","title":"x=>'usage count '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase usage count by '+x+((x>=0)?'':' times')"},
{"id":"35","effname":"damage up","eval":"-1","title":"x=>'damage '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase damage by '+x+((x>=0)?'':' times')"},
{"id":"36","effname":"heal up","eval":"-1","title":"x=>'heal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase heal by '+x+((x>=0)?'':' times')"},
{"id":"37","effname":"synthesize: use time up","eval":"x=>{if(x>=0){used[0]+=x}else{used[0]*=(-x)}}","title":"x=>'synthesize: usage count '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase usage count by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"38","effname":"synthesize: damage up","eval":"x=>{if(x>=0){used[1]+=x}else{used[1]*=(-x)}}","title":"x=>'synthesize: damage '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase damage by '+x+((x>=0)?'':' times')+' when used as ingredient'"},
{"id":"39","effname":"synthesize: heal up","eval":"x=>{if(x>=0){atkdef[2]+=x}else{atkdef[2]*=(-x)}}","title":"x=>'synthesize: heal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase heal by '+x+((x>=0)?'':' times')+' when used as ingredient'"}
]`);
lt(`[
{"id":"0","llv":"1","name":"quality increasement","effect":"quality + 10%","eval":"curquality*=1.1"},
{"id":"1","llv":"1","name":"quality increasement +","effect":"quality + 15%","eval":"curquality*=1.15"},
{"id":"2","llv":"1","name":"quality increasement ++","effect":"quality + 20%","eval":"curquality*=1.2"},
{"id":"3","llv":"2","name":"good quality","lfrom":"0 & 1","effect":"quality + 25%","eval":"curquality*=1.25"},
{"id":"4","llv":"2","name":"best quality","lfrom":"1 & 2","effect":"quality + 35%","eval":"curquality*=1.35"},
{"id":"5","llv":"4","name":"super quality","lfrom":"3 & 4","effect":"quality + 50%","eval":"curquality*=1.5"},
{"id":"6","llv":"1","name":"low cost","effect":"cost - 10%","eval":"cost*=0.9"},
{"id":"7","llv":"1","name":"low cost +","effect":"cost - 15%","eval":"cost*=0.85"},
{"id":"8","llv":"1","name":"low cost ++","effect":"cost - 20%","eval":"cost*=0.8"},
{"id":"9","llv":"2","name":"special discount","lfrom":"6 & 7","effect":"cost - 25%","eval":"cost*=0.75"},
{"id":"10","llv":"2","name":"limited offer","lfrom":"7 & 8","effect":"cost - 30%","eval":"cost*=0.7"},
{"id":"11","llv":"4","name":"costless","lfrom":"9 & 10","effect":"cost - 50%","eval":"cost*=0.5"},
{"id":"12","llv":"1","name":"high price","effect":"price + 20","eval":"price+=20"},
{"id":"13","llv":"1","name":"high price +","effect":"price + 30","eval":"price+=30"},
{"id":"14","llv":"1","name":"high price ++","effect":"price + 40","eval":"price+=40"},
{"id":"15","llv":"2","name":"quite worthy","lfrom":"12 & 13","effect":"price + 25%","eval":"price*=1.25"},
{"id":"16","llv":"2","name":"inbelivible value","lfrom":"13 & 14","effect":"price + 30%; price + 45","eval":"price*=1.3;price+=45"},
{"id":"17","llv":"4","name":"priceless","lfrom":"15 & 16","effect":"price + 50%; price + 50","eval":"price*=1.5;price+=50"},
{"id":"18","llv":"8","name":"very economic","lfrom":"5 && 11","effect":"quality + 40%; cost - 40%","eval":"curquality*=1.4;cost*=0.6"},
{"id":"19","llv":"8","name":"worth it","lfrom":"5 && 17","effect":"quality + 40%; price + 40%; price + 40","eval":"curquality*=1.4;price*=1.4;price+=40"},
{"id":"20","llv":"8","name":"market cheater","lfrom":"11 && 17","effect":"cost - 35%; price + 35%; price + 35","eval":"cost*=0.65;price*=1.35;price+=35"},
{"id":"21","llv":"12","name":"golden ray","lfrom":"5 && 20; 11 && 19; 17 && 18","effect":"quality + 30%; cost - 30%; price + 30%; price + 30","eval":"curquality*=1.3;cost*=0.7;price*=1.3;price+=30"},
{"id":"22","llv":"1","name":"damage up","effect":"damage + 10%","eval":"used[1]*=1.1"},
{"id":"23","llv":"1","name":"damage up +","effect":"damage + 15%","eval":"used[1]*=1.15"},
{"id":"24","llv":"1","name":"damage up ++","effect":"damage + 20%","eval":"used[1]*=1.2"},
{"id":"25","llv":"2","name":"explosive","lfrom":"22 & 23","effect":"damage + 25%","eval":"used[1]*=1.25"},
{"id":"26","llv":"2","name":"destructive","lfrom":"23 & 24","effect":"damage + 35%","eval":"used[1]*=1.35"},
{"id":"27","llv":"4","name":"dynamitic dynamite","lfrom":"25 && 26","effect":"damage + 60%","eval":"used[1]*=1.6"},
{"id":"28","llv":"1","name":"heal up","effect":"heal + 10%","eval":"used[2]*=1.1"},
{"id":"29","llv":"1","name":"heal up +","effect":"heal + 15%","eval":"used[2]*=1.15"},
{"id":"30","llv":"1","name":"heal up ++","effect":"heal + 20%","eval":"used[2]*=1.2"},
{"id":"31","llv":"2","name":"healthy","lfrom":"28 & 29","effect":"heal + 25%","eval":"used[2]*=1.25"},
{"id":"32","llv":"2","name":"medical","lfrom":"29 & 30","effect":"heal + 35%","eval":"used[2]*=1.35"},
{"id":"33","llv":"4","name":"secert of health","lfrom":"31 && 32","effect":"heal + 60%","eval":"used[2]*=1.6"},
{"id":"34","llv":"6","name":"energy drain","lfrom":"27 && 31","effect":"add damage to heal","eval":"used[2]+=used[1]"},
{"id":"35","llv":"1","name":"half life","effect":"add damage x 50% to heal","eval":"used[2]+=(used[1]*0.5)"},
{"id":"36","llv":"7","name":"curse of life","lfrom":"34 && 35","effect":"50 % damage to self; damage x 500%","eval":"used[2]-=(used[1]*0.5);used[1]*=5"},
{"id":"37","llv":"11","name":"costless curse of life","lfrom":"11 && 36","effect":"50 % damage to heal self; damage x 500%","eval":"used[2]+=(used[1]*0.5);used[1]*=5"},
{"id":"38","llv":"1","name":"max HP increasement","effect":"max HP + 5","eval":"atkdef[0]+=5"},
{"id":"39","llv":"1","name":"max HP increasement +","effect":"max HP + 10","eval":"atkdef[0]+=10"},
{"id":"40","llv":"1","name":"max HP increasement ++","effect":"max HP + 15","eval":"atkdef[0]+=15"},
{"id":"41","llv":"2","name":"auto recovery","lfrom":"38 & 39","effect":"heal +5","eval":"used[2]+=5"},
{"id":"42","llv":"2","name":"auto recovery +","lfrom":"39 & 40","effect":"heal + 10","eval":"used[2]+=10"},
{"id":"43","llv":"4","name":"power of sol","lfrom":"41 && 42","effect":"max HP + 10; heal + 10","eval":"atkdef[0]+=10;used[2]+=10"},
{"id":"44","llv":"1","name":"max MP increasement","effect":"max MP + 5","eval":"atkdef[1]+=5"},
{"id":"45","llv":"1","name":"max MP increasement +","effect":"max MP + 10","eval":"atkdef[1]+=10"},
{"id":"46","llv":"1","name":"max MP increasement ++","effect":"max MP + 15","eval":"atkdef[1]+=15"},
{"id":"47","llv":"2","name":"magical refill","lfrom":"44 & 45","effect":"heal x 2","eval":"used[2]*=2"},
{"id":"48","llv":"2","name":"magical refill +","lfrom":"45 & 46","effect":"heal x 3","eval":"used[2]*=2.5"},
{"id":"49","llv":"4","name":"power of luna","lfrom":"47 && 48","effect":"max MP + 10; heal x 3","eval":"atkdef[1]+=10;used[2]*=3"},
{"id":"50","llv":"1","name":"atk increasement","effect":"atk + 5","eval":"atkdef[2]+=5"},
{"id":"51","llv":"1","name":"atk increasement +","effect":"atk + 10","eval":"atkdef[2]+=10"},
{"id":"52","llv":"1","name":"atk increasement ++","effect":"atk + 15","eval":"atkdef[2]+=15"},
{"id":"53","llv":"2","name":"atk amplification","lfrom":"50 & 51","effect":"atk + 20","eval":"atkdef[2]+=20"},
{"id":"54","llv":"2","name":"sharp blade","lfrom":"51 & 52","effect":"atk + 30; def - 5","eval":"atkdef[2]+=30;atkdef[3]-=5"},
{"id":"55","llv":"4","name":"power of mars","lfrom":"53 && 54","effect":"atk + 30","eval":"atkdef[2]+=30"},
{"id":"56","llv":"1","name":"def increasement","effect":"def + 5","eval":"atkdef[3]+=5"},
{"id":"57","llv":"1","name":"def increasement +","effect":"def + 10","eval":"atkdef[3]+=10"},
{"id":"58","llv":"1","name":"def increasement ++","effect":"def + 15","eval":"atkdef[3]+=15"},
{"id":"59","llv":"2","name":"def amplification","lfrom":"56 & 57","effect":"def + 20","eval":"atkdef[3]+=20"},
{"id":"60","llv":"2","name":"heavy armor","lfrom":"57 & 58","effect":"def + 30; agi - 5","eval":"atkdef[3]+=30;atkdef[4]-=5"},
{"id":"61","llv":"4","name":"power of jupiter","lfrom":"59 && 60","effect":"def + 30","eval":"atkdef[3]+=30"},
{"id":"62","llv":"1","name":"agi increasement","effect":"agi + 5","eval":"atkdef[4]+=5"},
{"id":"63","llv":"1","name":"agi increasement +","effect":"agi + 10","eval":"atkdef[4]+=10"},
{"id":"64","llv":"1","name":"agi increasement ++","effect":"agi + 15","eval":"atkdef[4]+=15"},
{"id":"65","llv":"2","name":"agi amplification","lfrom":"62 & 63","effect":"agi + 20","eval":"atkdef[4]+=20"},
{"id":"66","llv":"2","name":"marathon winner","lfrom":"63 & 64","effect":"agi + 30; luk - 5","eval":"atkdef[4]+=30;atkdef[5]-=5"},
{"id":"67","llv":"4","name":"power of mercury","lfrom":"65 && 66","effect":"agi + 30","eval":"atkdef[4]+=30"},
{"id":"68","llv":"1","name":"luk increasement","effect":"luk + 5","eval":"atkdef[5]+=5"},
{"id":"69","llv":"1","name":"luk increasement +","effect":"luk + 10","eval":"atkdef[5]+=10"},
{"id":"70","llv":"1","name":"luk increasement ++","effect":"luk + 15","eval":"atkdef[5]+=15"},
{"id":"71","llv":"2","name":"luk amplification","lfrom":"68 & 69","effect":"luk + 20","eval":"atkdef[5]+=20"},
{"id":"72","llv":"2","name":"bless of godess","lfrom":"69 & 70","effect":"luk + 30; atk - 5","eval":"atkdef[5]+=30;atkdef[2]-=5"},
{"id":"73","llv":"4","name":"power of venus","lfrom":"71 && 72","effect":"luk + 30","eval":"atkdef[5]+=30"},
{"id":"74","llv":"8","name":"offensive defense","lfrom":"55 && 61","effect":"atk + 20; def + 20","eval":"atkdef[2]+=20;atkdef[3]+=20"},
{"id":"75","llv":"8","name":"double edged sword","lfrom":"55 && 67","effect":"atk + 20; agi + 20","eval":"atkdef[2]+=20;atkdef[4]+=20"},
{"id":"76","llv":"8","name":"as fast as light","lfrom":"61 && 67","effect":"def + 20; agi + 20","eval":"atkdef[3]+=20;atkdef[4]+=20"},
{"id":"77","llv":"1","name":"concentration increasement","effect":"points + 1","eval":"for(let i=0;i<5;i++)effpnt[i]+=1"},
{"id":"78","llv":"1","name":"concentration increasement +","effect":"points + 2","eval":"for(let i=0;i<5;i++)effpnt[i]+=2"},
{"id":"79","llv":"1","name":"concentration increasement ++","effect":"points + 3","eval":"for(let i=0;i<5;i++)effpnt[i]+=3"},
{"id":"80","llv":"2","name":"high concentration","lfrom":"77 & 78","effect":"points x 2","eval":"for(let i=0;i<5;i++)effpnt[i]*=2"},
{"id":"81","llv":"2","name":"higher concentration","lfrom":"78 & 79","effect":"points x 3","eval":"for(let i=0;i<5;i++)effpnt[i]*=3"},
{"id":"82","llv":"4","name":"highest concentration","lfrom":"80 && 81","effect":"points + 1 then points x 3","eval":"for(let i=0;i<5;i++){effpnt[i]+=1;effpnt[i]*=3}"},
{"id":"83","llv":"1","name":"usage count + 1","effect":"use 1 more time","eval":"used[0]+=1"},
{"id":"84","llv":"1","name":"usage count + 2","effect":"use 2 more times","eval":"used[0]+=2"},
{"id":"85","llv":"2","name":"proliferation","lfrom":"83 & 84","effect":"use 3 more times","eval":"used[0]+=3"},
{"id":"86","llv":"10","name":"recyclable","lfrom":"18 && 85","effect":"usage count x 2","eval":"used[0]*=2"},
{"id":"87","llv":"1","name":"perpetual","effect":"usage count do not reduce","eval":"perp=true"},
{"id":"88","llv":"1","name":"usage count - 1","effect":"use 1 less time; damage or heal + 5%","eval":"used[0]-=1;used[1]*=1.05;used[2]*=1.05"},
{"id":"89","llv":"1","name":"usage count - 2","effect":"use 2 less times; damage or heal + 10%","eval":"used[0]-=2;used[1]*=1.1;used[2]*=1.1"},
{"id":"90","llv":"2","name":"reduction","lfrom":"88 & 89","effect":"use 3 less times; damage or heal + 15%","eval":"used[0]-=3;used[1]*=1.15;used[2]*=1.15"},
{"id":"91","llv":"10","name":"eruption","lfrom":"19 & 90","effect":"usage count halfed; damage or heal + 50%","eval":"used[0]-=Math.floor(used[0]*0.5);used[1]*=1.5;used[2]*=1.5"},
{"id":"92","llv":"1","name":"first things first","effect":"first usage damage or heal + 10%","eval":"firstup+=1"},
{"id":"93","llv":"1","name":"first things first +","effect":"first usage damage or heal + 20%","eval":"firstup+=2"},
{"id":"94","llv":"1","name":"first things first ++","effect":"first usage damage or heal + 30%","eval":"firstup+=3"},
{"id":"95","llv":"2","name":"decremental enhancement","lfrom":"92 & 93","effect":"increase damage or heal by remaining usage count x 5%","eval":"decr+=5"},
{"id":"96","llv":"2","name":"decremental enhancement +","lfrom":"93 & 94","effect":"increase damage or heal by remaining usage count x 10%","eval":"decr+=10"},
{"id":"97","llv":"4","name":"cumulative bonus","lfrom":"95 && 96","effect":"increase damage or heal by total usage count x 10%","eval":"used[1]+=(used[0]*0.1);used[2]+=(used[0]*0.1)"},
{"id":"98","llv":"1","name":"last but not least","effect":"last usage damage or heal + 10%","eval":"lastup+=1"},
{"id":"99","llv":"1","name":"last but not least +","effect":"last usage damage or heal + 20%","eval":"lastup+=2"},
{"id":"100","llv":"1","name":"last but not least ++","effect":"last usage damage or heal + 30%","eval":"lastup+=3"},
{"id":"101","llv":"2","name":"incremental enhancement","lfrom":"98 & 99","effect":"increase damage or heal by used times x 5%","eval":"incr+=5"},
{"id":"102","llv":"2","name":"incremental enhancement","lfrom":"99 & 100","effect":"increase damage or heal by used times x 10%","eval":"incr+=10"},
{"id":"103","llv":"4","name":"single eruption","lfrom":"101 && 102","effect":"can only use once but increase damage or heal by total usage count x 150%","eval":"used[1]*=(used[0]*1.5);used[2]*=(used[0]*1.5);used[0]=1"},
{"id":"104","llv":"5","name":"iteration from 1 to 1","lfrom":"87 && 103","effect":"usage count is locked to 1 and increase damage or heal by total usage count x 100%","eval":"used[1]*=used[0];used[2]*=used[0];used[0]=1;perp=true"}
]`);

if(1)litem(`

[
	{"id":"0","name":"neutralizer","type":"0","cat":"23","effect":"1#0;27+2+0# 4;27+20+0 # 8;27+19+0! 4 # 0;-1+0+0 # 5;0+1+0 # 10;0+2+0 ! 1 # 0;-1+0+0 # 5;6+1+0# 10;6+2+0","metal":"1","water":"2","wood":"1","fire":"0","earth":"0","receipt":"1; (19); 1; (20); 2; (2)","atkdefbase":"0","lv":"1","price":"30","used":"0","damage":"0","heal":"0"},
	{"id":"1","name":"catalyst","type":"0","cat":"23","metal":"0","water":"1","wood":"2","fire":"1","earth":"0","receipt":"1; (1); 1; (21); 2; (3)","atkdefbase":"0","lv":"2","price":"30","used":"0","damage":"0","heal":"0"},
	{"id":"2","name":"accelerant","type":"0","cat":"23","metal":"0","water":"0","wood":"1","fire":"2","earth":"1","receipt":"1; (3); 1; (5); 2; (6)","atkdefbase":"0","lv":"3","price":"30","used":"0","damage":"0","heal":"0"},
	{"id":"3","name":"chelating agent","type":"0","cat":"23","metal":"1","water":"0","wood":"0","fire":"1","earth":"2","receipt":"1; (12); 1; (0); 2; (9)","atkdefbase":"0","lv":"4","price":"30","used":"0","damage":"0","heal":"0"},
	{"id":"4","name":"cracking agent","type":"0","cat":"23","metal":"2","water":"1","wood":"0","fire":"0","earth":"1","receipt":"1; (7); 1; (11); 1; (10)","atkdefbase":"0","lv":"5","price":"30","used":"0","damage":"0","heal":"0"},
	{"id":"5","name":"water","type":"0","cat":"2; 24","metal":"0","water":"2","wood":"0","fire":"0","earth":"0","receipt":"0; -1","atkdefbase":"0","lv":"1","price":"2","used":"0","damage":"0","heal":"0"},
	{"id":"6","name":"sulfur","type":"0","cat":"9; 12","metal":"0","water":"0","wood":"1","fire":"1","earth":"1","receipt":"0; -1","atkdefbase":"0","lv":"1","price":"2","used":"0","damage":"0","heal":"0"},
	{"id":"7","name":"sulfuric acid","type":"0","cat":"6; 12; 19","metal":"1","water":"2","wood":"0","fire":"2","earth":"0","receipt":"1; 6; 1; (5); 1; (2)","atkdefbase":"0","lv":"5","price":"30","used":"0","damage":"0","heal":"0"},
	{"id":"8","name":"radon","type":"0","cat":"1; 9; 11","metal":"2","water":"0","wood":"0","fire":"1","earth":"2","receipt":"0; -1","atkdefbase":"0","lv":"3","price":"10","used":"0","damage":"0","heal":"0"},
	{"id":"9","name":"carbon dioxide","type":"0","cat":"1; 22","metal":"0","water":"0","wood":"1","fire":"1","earth":"0","receipt":"0; -1","atkdefbase":"0","lv":"1","price":"2","used":"0","damage":"0","heal":"0"},
	{"id":"10","name":"carbonic acid","type":"0","cat":"1; 2; 19; 22","effect":"1#0;0+-1+-1#3;0+1+0!1#0;-1+0+0#4;5+1+0#7;5+2+0!3#0;-1+0+0#3;27+24+0","metal":"0","water":"1","wood":"0","fire":"1","earth":"0","receipt":"2; (2); 2; 9","atkdefbase":"0","lv":"2","price":"15","used":"0","damage":"0","heal":"0"},
	{"id":"11","name":"rock salt","type":"0","cat":"8; 9; 21; 24","metal":"1","water":"0","wood":"0","fire":"0","earth":"1","receipt":"0; -1","atkdefbase":"0","lv":"2","price":"2","used":"0","damage":"0","heal":"0"},
	{"id":"12","name":"soda","type":"0","cat":"20; 21; 24","metal":"2","water":"0","wood":"0","fire":"0","earth":"1","receipt":"1; (8); 1; (5); 1; (21)","atkdefbase":"0","lv":"3","price":"25","used":"0","damage":"0","heal":"0"},
	{"id":"13","name":"black hole","type":"0","cat":"0; 10; 11; 22","metal":"2","water":"1","wood":"1","fire":"1","earth":"1","receipt":"1; 14; 1; (10); 1; (11); 1; (23)","atkdefbase":"0","lv":"7","price":"85","used":"0","damage":"0","heal":"0"},
	{"id":"14","name":"perpetua machine","type":"0","cat":"5; 10","metal":"1","water":"1","wood":"1","fire":"1","earth":"1","receipt":"1; (11); 1; (6); 1; #43; 1; #49","atkdefbase":"0","lv":"14","price":"150","used":"0","damage":"0","heal":"0"},
	{"id":"15","name":"philosopher's stone","type":"0","cat":"0; 1; 2; 23","metal":"3","water":"3","wood":"3","fire":"3","earth":"3","receipt":"1; 13; 1; (23); 1; #21; 1; (2)","atkdefbase":"0","lv":"14","price":"100","used":"0","damage":"0","heal":"0"},
	{"id":"16","name":"test1","type":"0","cat":"2; 26; 27; 28; 29; 30","metal":"1","water":"1","wood":"2","fire":"2","earth":"1","receipt":"2; (23); 2; (2)","atkdefbase":"1;2;3;4;5;6","lv":"4","price":"20","used":"6","damage":"25","heal":"25"},
	{"id":"17","name":"methane","type":"0","cat":"1; 5","metal":"0","water":"0","wood":"1","fire":"1","earth":"0","receipt":"0; -1","atkdefbase":"0","lv":"3","price":"2","used":"0","damage":"0","heal":"0"},
	{"id":"18","name":"stone from ruins","type":"0","cat":"8; 10","metal":"1","water":"0","wood":"1","fire":"0","earth":"2","receipt":"0; -1","atkdefbase":"0","lv":"1","price":"2","used":"0","damage":"0","heal":"0"}
	]

	`);