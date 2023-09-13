let le = text => {
	let obj = JSON.parse(text);
	obj.forEach(e => {
		if(e['id'] == 0 || e['id']) {
			let id = U(e['id']);
			let na = e['effN'];
			let ev = e['eval'];
			let ne = e['title'];
			let de = e['desc'];
			let syn = (e['syneff'] == '1');
			seff.pushEff(id, na, ev, ne, de, syn);
		}
	})
}
let lt = text => {
	let obj = JSON.parse(text);
	obj.forEach(element => {
		if(element['id'] === '0' || element['id']) {
			let linkFROM = [];
			if(element['lfrom']) {
				let lfr = element['lfrom'].split(';');
				lfr.forEach(e => {
					let f = e.trim().split(' ');
					if(f[1] == '&') linkFROM.push([0, U(f[0]), U(f[2])]);
					else linkFROM.push([1, U(f[0]), U(f[2])]);
				});
			}
			let ava = 63;
			let ev = element['eval'];
			stag.newTag(U(element['id']), U(element['llv']), element['N'], linkFROM, ava, element['effect'], [], ev);
		}
	});
};

// items
let litem = text => {
	let e = JSON.parse(text);
//	obj.forEach(e => {
		if(e['id'] == 0 || e['id']) {
			let id = U(e['id']);
			let N = e['N'];
			let type = U(e['type']);
			let eff = [];
			let cat = [];
			e['cat'].split(';').forEach(ee => {
				let ee1 = ee.trim();
				cat.push(U(ee1));
			});
			let pnt = [];
			pnt[0] = U(e['metal']);
			pnt[1] = U(e['water']);
			pnt[2] = U(e['wood']);
			pnt[3] = U(e['fire']);
			pnt[4] = U(e['earth']);
			let rec = [];
			let e_rec = e['receipt'].split(';');
			// console.log(e_rec);
			// debugger;
			for(let i = 0; i < e_rec.length; i += 2) {
				let quality = U(e_rec[i].trim());
				let itt = e_rec[i + 1].trim();
				if(quality == -1) {
					rec = [[-1, 0, 0]];
					break;
				};
				if(itt[0] == '(') {
					let bo = U(itt.slice(1, itt.length - 1));
					rec.push([1, quality, bo]);
					continue;
				};
				if(itt[0] == '#') {
					let bo = U(itt.slice(1, itt.length));
					rec.push([2, quality, bo]);
					continue;
				};
				rec.push([0, quality, U(itt)]);
			};
			
			if(e['effect']) {
				let xeff = e['effect'].split('!');
				xeff.forEach(ee => {
					ee = ee.trim();
					let xee = ee.split('#');
					let xeid = U(xee[0].trim());
					let effx = [];
					for(let i = 1; i < xee.length; i++) {
						let xeee = xee[i].split(';');
						xeee[0] = xeee[0].trim();
						xeee[1] = xeee[1].trim();
						let xeeee = xeee[1].split('+');
						effx.push({lv: U(xeee[0]), eff: [U(xeeee[0]), U(xeeee[1]), U(xeeee[2])]});
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
				for(let i = 0; i <= 5; i++) atkdef[i] = U(atkdefe[i].trim());
			}
			
			// time, damage, recovery
			let used = [0, 0, 0]
			used[0] = U(e['used']);
			used[1] = U(e['damage']);
			used[2] = U(e['heal']);
			
			let price = U(e['price']);
			
			let lv = U(e['lv']);
			
			sitem.newaItem(id, N, type, cat, eff, pnt, rec, atkdef, used, lv, price);
			
		};
//	});
};



// cat
JSON.parse(`[{"id":"0","cat":"metal"},{"id":"1","cat":"gas"},{"id":"2","cat":"liquid"},{"id":"3","cat":"plant"},{"id":"4","cat":"wood"},{"id":"5","cat":"fuel"},{"id":"6","cat":"dynamite"},{"id":"7","cat":"dirt"},{"id":"8","cat":"stone"},{"id":"9","cat":"ore"},{"id":"10","cat":"mysterious power"},{"id":"11","cat":"radioactive material"},{"id":"12","cat":"toxic chemicals"},{"id":"13","cat":"herbs"},{"id":"14","cat":"seed"},{"id":"15","cat":"animail material"},{"id":"16","cat":"wire"},{"id":"17","cat":"fabric"},{"id":"18","cat":"alloy"},{"id":"19","cat":"acid"},{"id":"20","cat":"alkali"},{"id":"21","cat":"salt"},{"id":"22","cat":"impurities"},{"id":"23","cat":"neutralizer"},{"id":"24","cat":"food"},{"id":"25","cat":"grain"},{"id":"26","cat":"bomb"},{"id":"27","cat":"potion"},{"id":"28","cat":"weapon"},{"id":"29","cat":"armor"},{"id":"30","cat":"accessories"}]`).forEach(e => {
sitem.newaCat(U(e['id']), e['cat']);
});

le(`[{"id":"-1","effN":"no effect","eval":"-1","title":"()=>'no effect'","desc":"()=>'no effect'"},{"id":"0","effN":"add point metal","eval":"-1","title":"x=>'metal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase metal by '+x+((x>=0)?'':' times')"},{"id":"1","effN":"add point water","eval":"-1","title":"x=>'water '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase water by '+x+((x>=0)?'':' times')"},{"id":"2","effN":"add point wood","eval":"-1","title":"x=>'wood '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase wood by '+x+((x>=0)?'':' times')"},{"id":"3","effN":"add point fire","eval":"-1","title":"x=>'fire '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase fire by '+x+((x>=0)?'':' times')"},{"id":"4","effN":"add point earth","eval":"-1","title":"x=>'earth '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase earth by '+x+((x>=0)?'':' times')"},{"id":"5","effN":"syn: add point metal","eval":"x=>{if(x>=0){curpnt[0]+=x;sumpnt[0]+=x}else{x=-x;sumpnt[0]+=(curpnt[0]*(x-1));curpnt[0]*=x;}}","title":"x=>'syn: metal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase metal by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"6","effN":"syn: add point water","eval":"x=>{if(x>=0){curpnt[1]+=x;sumpnt[1]+=x}else{x=-x;sumpnt[1]+=(curpnt[1]*(x-1));curpnt[1]*=x;}}","title":"x=>'syn: water '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase water by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"7","effN":"syn: add point wood","eval":"x=>{if(x>=0){curpnt[2]+=x;sumpnt[2]+=x}else{x=-x;sumpnt[2]+=(curpnt[2]*(x-1));curpnt[2]*=x;}}","title":"x=>'syn: wood '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase wood by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"8","effN":"syn: add point fire","eval":"x=>{if(x>=0){curpnt[3]+=x;sumpnt[3]+=x}else{x=-x;sumpnt[3]+=(curpnt[3]*(x-1));curpnt[3]*=x;}}","title":"x=>'syn: fire '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase fire by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"9","effN":"syn: add point earth","eval":"x=>{if(x>=0){curpnt[4]+=x;sumpnt[4]+=x}else{x=-x;sumpnt[4]+=(curpnt[4]*(x-1));curpnt[4]*=x;}}","title":"x=>'syn: earth '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase earth by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"10","effN":"syn: add link times","eval":"x=>{link+=x}","title":"x=>'syn: link + '+x","desc":"x=>'increase links by '+x+' when used as ingredient'"},{"id":"11","effN":"syn: add unlink times","eval":"x=>{unlink+=x}","title":"x=>'syn: unllink + '+x","desc":"x=>'increase unlinks by '+x+' when used as ingredient'"},{"id":"12","effN":"syn: suppress tag joining","eval":"_=>{(jointag?(jointag=false):false)}","title":"x=>'syn: suppress tag joining'","desc":"x=>'syn: suppress tag joining when used as ingredient'"},{"id":"13","effN":"syn: quality up","eval":"x=>{if(x>=0){qualityup+=x}else{qualityuppercent-=x}curquality=Math.floor(((qualitysum/insertcount)+qualityup)*(1+(qualityuppercent/100)))}","title":"x=>'syn: quality up by'+x+((x>=0)?'':' %')","desc":"x=>'increase quality by '+x+((x>=0)?'':' %')+' when used as ingredient'"},{"id":"14","effN":"syn: extra component by item id","eval":"(x,y)=>{for(let i=0;i<y;i++)materialList.push([0,x],[1,0])}","title":"(x,y)=>'syn: extra item: '+sitem.a[x].n+' x '+y","desc":"(x,y)=>'add extra item: '+sitem.a[x].n+' when used as ingredient'+' x '+y"},{"id":"15","effN":"syn: extra component by category","eval":"(x,y)=>{for(let i=0;i<y;i++)materialList.push([1,x],[1,0])}","title":"(x,y)=>'syn: extra item: ('+sitem.c[x]+')'+' x '+y","desc":"(x,y)=>'add extra item: ('+sitem.c[x]+') when used as ingredient'+' x '+y"},{"id":"16","effN":"syn: extra component by tag","eval":"(x,y)=>{for(let i=0;i<y;i++)materialList.push([2,x],[1,0])}","title":"(x,y)=>'syn: extra item: #'+stag.t[x].n+' x '+y","desc":"(x,y)=>'add extra item: #'+stag.t[x].n+'when used as ingredient'+' x '+y"},{"id":"17","effN":"syn: quantity up","eval":"x=>{extramake+=x}","title":"x=>'syn: quantity up by'+x","desc":"x=>'syn: quantity up by'+x+' when used as ingredient'"},{"id":"24","effN":"syn: give tag","eval":"x=>{pushTags(stag.t[x])}","title":"x=>'syn: extra tag: #'+stag.t[x].n","desc":"x=>'give extra tag: #'+stag.t[x].n+' to product when used as ingredient'"},{"id":"25","effN":"syn: give category","eval":"x=>{pushcat(x)}","title":"x=>'syn: extra category: ('+sitem.c[x]+')'","desc":"x=>'give extra category: ('+sitem.c[x]+') to product when used as ingredient'"},{"id":"26","effN":"syn: level down","eval":"x=>{lvdown+=x}","title":"x=>'syn: lv down by + '+x","desc":"x=>'decrease lv of product by '+x+' when used as ingredient'"},{"id":"27","effN":"give category","eval":"-1","title":"x=>'extra category: ('+sitem.c[x]+')'","desc":"x=>'extra category: ('+sitem.c[x]+')'"},{"id":"34","effN":"use time up","eval":"-1","title":"x=>'usage count '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase usage count by '+x+((x>=0)?'':' times')"},{"id":"35","effN":"damage up","eval":"-1","title":"x=>'damage '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase damage by '+x+((x>=0)?'':' times')"},{"id":"36","effN":"heal up","eval":"-1","title":"x=>'heal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase heal by '+x+((x>=0)?'':' times')"},{"id":"37","effN":"syn: use time up","eval":"x=>{if(x>=0){used[0]+=x}else{used[0]*=(-x)}}","title":"x=>'syn: usage count '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase usage count by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"38","effN":"syn: damage up","eval":"x=>{if(x>=0){used[1]+=x}else{used[1]*=(-x)}}","title":"x=>'syn: damage '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase damage by '+x+((x>=0)?'':' times')+' when used as ingredient'"},{"id":"39","effN":"syn: heal up","eval":"x=>{if(x>=0){atkdef[2]+=x}else{atkdef[2]*=(-x)}}","title":"x=>'syn: heal '+((x>=0)?'+ ':'x ')+x","desc":"x=>'increase heal by '+x+((x>=0)?'':' times')+' when used as ingredient'"}]`);
lt(`[{"id":"0","llv":"1","N":"quality increasement","effect":"quality + 10%","eval":"curquality*=1.1"},{"id":"1","llv":"1","N":"quality increasement +","effect":"quality + 15%","eval":"curquality*=1.15"},{"id":"2","llv":"1","N":"quality increasement ++","effect":"quality + 20%","eval":"curquality*=1.2"},{"id":"3","llv":"2","N":"good quality","lfrom":"0 & 1","effect":"quality + 25%","eval":"curquality*=1.25"},{"id":"4","llv":"2","N":"best quality","lfrom":"1 & 2","effect":"quality + 35%","eval":"curquality*=1.35"},{"id":"5","llv":"4","N":"super quality","lfrom":"3 & 4","effect":"quality + 50%","eval":"curquality*=1.5"},{"id":"6","llv":"1","N":"low cost","effect":"cost - 10%","eval":"cost*=0.9"},{"id":"7","llv":"1","N":"low cost +","effect":"cost - 15%","eval":"cost*=0.85"},{"id":"8","llv":"1","N":"low cost ++","effect":"cost - 20%","eval":"cost*=0.8"},{"id":"9","llv":"2","N":"special discount","lfrom":"6 & 7","effect":"cost - 25%","eval":"cost*=0.75"},{"id":"10","llv":"2","N":"limited offer","lfrom":"7 & 8","effect":"cost - 30%","eval":"cost*=0.7"},{"id":"11","llv":"4","N":"costless","lfrom":"9 & 10","effect":"cost - 50%","eval":"cost*=0.5"},{"id":"12","llv":"1","N":"high price","effect":"price + 20","eval":"price+=20"},{"id":"13","llv":"1","N":"high price +","effect":"price + 30","eval":"price+=30"},{"id":"14","llv":"1","N":"high price ++","effect":"price + 40","eval":"price+=40"},{"id":"15","llv":"2","N":"quite worthy","lfrom":"12 & 13","effect":"price + 25%","eval":"price*=1.25"},{"id":"16","llv":"2","N":"inbelivible value","lfrom":"13 & 14","effect":"price + 30%; price + 45","eval":"price*=1.3;price+=45"},{"id":"17","llv":"4","N":"priceless","lfrom":"15 & 16","effect":"price + 50%; price + 50","eval":"price*=1.5;price+=50"},{"id":"18","llv":"8","N":"very economic","lfrom":"5 && 11","effect":"quality + 40%; cost - 40%","eval":"curquality*=1.4;cost*=0.6"},{"id":"19","llv":"8","N":"worth it","lfrom":"5 && 17","effect":"quality + 40%; price + 40%; price + 40","eval":"curquality*=1.4;price*=1.4;price+=40"},{"id":"20","llv":"8","N":"market cheater","lfrom":"11 && 17","effect":"cost - 35%; price + 35%; price + 35","eval":"cost*=0.65;price*=1.35;price+=35"},{"id":"21","llv":"12","N":"golden ray","lfrom":"5 && 20; 11 && 19; 17 && 18","effect":"quality + 30%; cost - 30%; price + 30%; price + 30","eval":"curquality*=1.3;cost*=0.7;price*=1.3;price+=30"},{"id":"22","llv":"1","N":"damage up","effect":"damage + 10%","eval":"used[1]*=1.1"},{"id":"23","llv":"1","N":"damage up +","effect":"damage + 15%","eval":"used[1]*=1.15"},{"id":"24","llv":"1","N":"damage up ++","effect":"damage + 20%","eval":"used[1]*=1.2"},{"id":"25","llv":"2","N":"explosive","lfrom":"22 & 23","effect":"damage + 25%","eval":"used[1]*=1.25"},{"id":"26","llv":"2","N":"destructive","lfrom":"23 & 24","effect":"damage + 35%","eval":"used[1]*=1.35"},{"id":"27","llv":"4","N":"dynamitic dynamite","lfrom":"25 && 26","effect":"damage + 60%","eval":"used[1]*=1.6"},{"id":"28","llv":"1","N":"heal up","effect":"heal + 10%","eval":"used[2]*=1.1"},{"id":"29","llv":"1","N":"heal up +","effect":"heal + 15%","eval":"used[2]*=1.15"},{"id":"30","llv":"1","N":"heal up ++","effect":"heal + 20%","eval":"used[2]*=1.2"},{"id":"31","llv":"2","N":"healthy","lfrom":"28 & 29","effect":"heal + 25%","eval":"used[2]*=1.25"},{"id":"32","llv":"2","N":"medical","lfrom":"29 & 30","effect":"heal + 35%","eval":"used[2]*=1.35"},{"id":"33","llv":"4","N":"secert of health","lfrom":"31 && 32","effect":"heal + 60%","eval":"used[2]*=1.6"},{"id":"34","llv":"6","N":"energy drain","lfrom":"27 && 31","effect":"add damage to heal","eval":"used[2]+=used[1]"},{"id":"35","llv":"1","N":"half life","effect":"add damage x 50% to heal","eval":"used[2]+=(used[1]*0.5)"},{"id":"36","llv":"7","N":"curse of life","lfrom":"34 && 35","effect":"50 % damage to self; damage x 500%","eval":"used[2]-=(used[1]*0.5);used[1]*=5"},{"id":"37","llv":"11","N":"costless curse of life","lfrom":"11 && 36","effect":"50 % damage to heal self; damage x 500%","eval":"used[2]+=(used[1]*0.5);used[1]*=5"},{"id":"77","llv":"1","N":"concentration increasement","effect":"points + 1","eval":"for(let i=0;i<5;i++)effpnt[i]+=1"},{"id":"78","llv":"1","N":"concentration increasement +","effect":"points + 2","eval":"for(let i=0;i<5;i++)effpnt[i]+=2"},{"id":"79","llv":"1","N":"concentration increasement ++","effect":"points + 3","eval":"for(let i=0;i<5;i++)effpnt[i]+=3"},{"id":"80","llv":"2","N":"high concentration","lfrom":"77 & 78","effect":"points x 2","eval":"for(let i=0;i<5;i++)effpnt[i]*=2"},{"id":"81","llv":"2","N":"higher concentration","lfrom":"78 & 79","effect":"points x 3","eval":"for(let i=0;i<5;i++)effpnt[i]*=3"},{"id":"82","llv":"4","N":"highest concentration","lfrom":"80 && 81","effect":"points + 1 then points x 3","eval":"for(let i=0;i<5;i++){effpnt[i]+=1;effpnt[i]*=3}"},{"id":"83","llv":"1","N":"usage count + 1","effect":"use 1 more time","eval":"used[0]+=1"},{"id":"84","llv":"1","N":"usage count + 2","effect":"use 2 more times","eval":"used[0]+=2"},{"id":"85","llv":"2","N":"proliferation","lfrom":"83 & 84","effect":"use 3 more times","eval":"used[0]+=3"},{"id":"86","llv":"10","N":"recyclable","lfrom":"18 && 85","effect":"usage count x 2","eval":"used[0]*=2"},{"id":"87","llv":"1","N":"perpetual","effect":"usage count do not reduce","eval":"perp=true"},{"id":"88","llv":"1","N":"usage count - 1","effect":"use 1 less time; damage or heal + 5%","eval":"used[0]-=1;used[1]*=1.05;used[2]*=1.05"},{"id":"89","llv":"1","N":"usage count - 2","effect":"use 2 less times; damage or heal + 10%","eval":"used[0]-=2;used[1]*=1.1;used[2]*=1.1"},{"id":"90","llv":"2","N":"reduction","lfrom":"88 & 89","effect":"use 3 less times; damage or heal + 15%","eval":"used[0]-=3;used[1]*=1.15;used[2]*=1.15"},{"id":"91","llv":"10","N":"eruption","lfrom":"19 & 90","effect":"usage count halfed; damage or heal + 50%","eval":"used[0]-=Math.floor(used[0]*0.5);used[1]*=1.5;used[2]*=1.5"}]`);