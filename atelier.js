const U = Number;

'use strict';

/**
 * utils
 */

let sortby = (x, key) => {
	let keyx = [];
	for(let i = 0; i < x.length; i++) keyx.push(x[i][key]);
	let ret = [];
	for(let i = 0; i < x.length; i++) {
		let min = 1000000;
		let flag = 0;
		for(let j = 0; j < x.length; j++) {
			if(keyx[j] < min) {
				min = keyx[j];
				flag = j;
			}
		}
		ret.push(x[flag]);
		keyx[flag] = 1000000;
	}
	return ret;
}

let sortarr = x => {
	let keyx = [];
	for(let i = 0; i < x.length; i++) keyx.push(x[i]);
	let ret = [];
	for(let i = 0; i < x.length; i++) {
		let min = 1000000;
		let flag = 0;
		for(let j = 0; j < x.length; j++) {
			if(keyx[j] < min) {
				min = keyx[j];
				flag = j;
			}
		}
		ret.push(x[flag]);
		keyx[flag] = 1000000;
	}
	return ret;
}

let compareObj = (a, b) => {
	let aa = sortarr(Object.keys(a));
	let bb = sortarr(Object.keys(b));
	if(aa.length != bb.length) return false;
	for(let i = 0; i < aa.length; i++) {
		if(aa[i] != bb[i]) return false;
		if(a[aa[i]] != b[bb[i]]) return false;
	}
	return true;
}

/**
 * tags templ
 */

let sTag = class {
	constructor() {
		let aTag = class {
			constructor(tagID, linkLevel, tagName, linkTO, linkFROM, availible, tagDesc, tagEff, ev) {
				this.id = tagID;
				this.lv = linkLevel;
				this.name = tagName;
				this.lnkto = linkTO;
				this.lnkfr = linkFROM;
				this.avl = availible;
				this.des = tagDesc;
				this.eff = tagEff;
				this.ev = ev;
				this.joinable = x => {
					if (this.lnkto.length)
						for (let i = 0; i < this.lnkto.length; i++)
							if (this.lnkto[i][0] == 0)
								if (this.lnkto[i][1] == x)
									return this.lnkto[i][2];
					return -1; // not joinable
				};
				this.linkable = x => {
					if (this.lnkto.length)
						for (let i = 0; i < this.lnkto.length; i++)
							if (this.lnkto[i][1] == x)
								return this.lnkto[i][2];
					return -1; // not linkable
				};
				this.findParent = () => {
					return this.lnkfr;
				};
			};
			get n() {
				return this.name;
			}
			get d() {
				if(this.lnkfr.length == 0) return this.des;
				//debugger;
				let des = this.des + '<br />linked from: ';
				for(let i = 0; i < this.lnkfr.length; i++) {
					des += '('
					des += stag.t[this.lnkfr[i][1]].n
					des += (this.lnkfr[i][0] ? ' && ' : ' & ');
					des += stag.t[this.lnkfr[i][2]].n
					des += ')'
					if(i < this.lnkfr.length - 1) des += ' or '
				}
				return des;
			}
		};

		let tagTable = {};
		
		let linkedTagCur = -2;
		
		this.linkedTagCur = () => linkedTagCur;
		
		this.pushlTag = (tagName, frm, availible, tagDesc, tagEff) => {
			//debugger;
			let id = linkedTagCur;
			tagTable[linkedTagCur] = new aTag(linkedTagCur, tagTable[frm[0]].lv + tagTable[frm[1]].lv, tagName, [], [[1, frm[0], frm[1]]], availible, tagDesc, tagEff);
			tagTable[linkedTagCur].lnkfr.forEach(e => {
				let flag = true;
				tagTable[e[1]].lnkto.forEach(ex => {
					if(ex[0] == e[0]) if(ex[1] == e[2]) if(ex[2] == id) flag = false;
				})
				if(flag) tagTable[e[1]].lnkto.push([e[0], e[2], id]);
				flag = true;
				tagTable[e[2]].lnkto.forEach(ex => {
					if(ex[0] == e[0]) if(ex[1] == e[1]) if(ex[2] == id) flag = false;
				})
				if(flag) tagTable[e[2]].lnkto.push([e[0], e[1], id]);
			
			});
			return linkedTagCur--;
		}

		let joinTag = (a, b) => tagTable[a].joinable(b);

		let linkTag = (a, b) => tagTable[a].linkable(b);

		let parentTag = (a) => {
			return tagTable[a].lnkfr;
		};

		this.tagTable = () => tagTable;
		this.newTag = (id, lv, na, linkFROM, ava, eff, desc, ev) => {
			
			//linkTO;
			
			tagTable[id] = new aTag(id, lv, na, [], linkFROM, ava, eff, desc, ev);
			tagTable[id].lnkfr.forEach(e => {
				let flag = true;
				tagTable[e[1]].lnkto.forEach(ex => {
					if(ex[0] == e[0]) if(ex[1] == e[2]) if(ex[2] == id) flag = false;
				})
				if(flag) tagTable[e[1]].lnkto.push([e[0], e[2], id]);
				flag = true;
				tagTable[e[2]].lnkto.forEach(ex => {
					if(ex[0] == e[0]) if(ex[1] == e[1]) if(ex[2] == id) flag = false;
				})
				if(flag) tagTable[e[2]].lnkto.push([e[0], e[1], id]);
			})
		};
		this.joinTag = joinTag;
		this.linkTag = linkTag;
		this.parentTag = parentTag;
		
		this.comparetag = (a, b) => {
			if(a.length != b.length) return false;
			if(a.length == 1) {
				if(a[0].id == b[0].id) return true;
				return false;
			};
			if(a.length == 2) {
				if(Math.min(a[0].id, a[1].id) == Math.min(b[0].id, b[1].id))
					if(Math.max(a[0].id, a[1].id) == Math.max(b[0].id, b[1].id))
						return true;
				return false;
			};
			let aa = [];
			let bb = [];
			aa[0] = Math.min(a[0].id, a[1].id, a[2].id);
			bb[0] = Math.min(b[0].id, b[1].id, b[2].id);
			aa[2] = Math.max(a[0].id, a[1].id, a[2].id);
			bb[2] = Math.max(b[0].id, b[1].id, b[2].id);
			for(let i = 0; i < 3; i++) if(a[i].id != aa[0]) if(a[i].id != aa[2]) aa[1] = a[i].id;
			for(let i = 0; i < 3; i++) if(b[i].id != bb[0]) if(b[i].id != bb[2]) bb[1] = b[i].id;
			for(let i = 0; i < 3; i++) if(aa[i] != bb[i]) return false;
			return true;
		}
		
		this.getltagname = (a, b) => {
			return 'linked tag of ' + a + ' and ' + b;
		}
		
	};
	get t() {
		return this.tagTable();
	};
};

let stag = new sTag();

/**
 * effects
 */

let sEff = class {
	constructor() {
		let aEff = class {
			constructor(id, na, ev, ne, de, syn) {
				this.id = id;
				this.na = na;
				this.ev = ev;
				this.ne = ne;
				this.de = de;
				this.syn = syn;
				this.getname = (x, y) => eval(this.ne)(x, y);
				this.getdesc = (x, y) => eval(this.de)(x, y);
			}
		}
		
		let efftab = {};
		
		this.pushEff = (id, na, ev, ne, de, syn) => {
			efftab[id] = new aEff(id, na, ev, ne, de, syn);
		}
		
		this.efftab = () => efftab;
		
	};
	get f() {
		return this.efftab();
	}
};

let seff = new sEff();

/**
 * items
 */

let sItem = class {
	constructor() {
		let aCats = {};
		let aItem = class {
			constructor(id, name, type, cat, eff, points, recipe, atkdef, used, lv, price) {
				this.id = id;
				this.name = name;
				this.typ = type;
				this.cat = cat;
				this.eff = eff;
				this.pnt = points;
				this.rec = recipe;
				// HP, MP, atk, def, agi, luk
				this.atkdef = atkdef;
				// use time, damage, heal
				this.used = used;
				this.lv = lv;
				this.price = price;
			};
			get n() {
				return this.name;
			}
			get d() {
				return '';
			}
		};

		let aItemTab = {};
		
		let aItemP = 0;
		
		this.aItemP = () => aItemP;

		let bItem = class {
			constructor(xid, aID, tags, effects, cost, price, quality, points, vol, atkdef, used, givencat, lvdown, firstup, lastup, incr, decr, perp) {
				this.xid = xid;
				this.aID = aID;
				this.tags = tags;
				this.effects = effects;
				this.cost = cost;
				this.price = price;
				this.quality = quality;
				this.points = points;
				this.vol = vol;
				this.atkdef = atkdef;
				this.used = used;
				this.givencat = givencat;
				this.lvdown = lvdown;
				this.voltmp = 0;
				this.firstup = firstup
				this.lastup = lastup
				this.incr = incr
				this.decr = decr
				this.perp = perp
			};
			get lvsum() {
				if(aItemTab[this.aID].lv - this.lvdown > 0) return aItemTab[this.aID].lv - this.lvdown;
				return 1;
			}
			get n() {
				return aItemTab[this.aID].n;
			}
			get v() {
				return this.vol - this.voltmp
			}
			get calused() {
				let h = this.used[2];
				let d = this.used[1];
				let t = this.used[0];
				let ret = [this.perp, d * t, h * t];
				if(t >= 1) {
					ret[1] += d * (this.firstup - 1);
					ret[1] += d * (this.lastup - 1);
					ret[2] += h * (this.firstup - 1);
					ret[2] += h * (this.lastup - 1);
					if(this.incr) for(let i = 0; i < t; i++) {
						ret[1] += (d * this.incr * i);
						ret[2] += (h * this.incr * i);
					}
					if(this.decr) for(let i = t; i > 0; i--) {
						ret[1] += (d * this.decr * i);
						ret[2] += (h * this.decr * i);
					}
					if(this.perp) {
						if(ret[1] > 0) ret[1] = Infinity;
						if(ret[2] > 0) ret[2] = Infinity;
					}
				}
				return ret;
			}
		};

		let bItemTab = [];
		
		this.aCats = () => aCats;
		
		this.newaCat = (id, nm) => {
			aCats[id] = nm;
		};
		
		this.aItemTab = () => aItemTab;
		
		this.newaItem = (id, name, type, cat, eff, pnt, rec, atkdef, used, lv, price) => {
			id = aItemP;
			aItemP++;
			//bug: atkdef not added
			aItemTab[id] = new aItem(id, name, type, cat, eff, pnt, rec, atkdef, used, lv, price);
		};
		
		this.bItemTab = () => bItemTab;
		
		let comparebEffects = (a, b) => {
			
			if(a.length != b.length) return false;
			
			let aa = sortby(a, 0);
			let bb = sortby(a, 0);
			
			for(let i = 0; i < a.length; i++) if(aa[i] != bb[i]) return false;
			return true;
		};
		
		let compareatkdef = (a, b) => {
			for(let i = 0; i < a.length; i++) if(a[i] != b[i]) return false;
			return true;
		}
		
		let comparegivencat = (a, b) => {
			if(a.length != b.length) return false;
			let aa = sortarr(a);
			let bb = sortarr(b);
			for(let i = 0; i < a.length; i++) if(aa[i] != bb[i]) return false;
			return true;
		}
		
		this.newbItem = (id, tags, eff, cost, price, quality, pnts, vol, atkdef, used, givencat, lvdown, firstup, lastup, incr, decr, perp) => {
			//let flag = true;
			for(let i = 0; i < bItemTab.length; i++) {
				if(bItemTab[i].aID == id)
				if(stag.comparetag(bItemTab[i].tags, tags))
				if(comparebEffects(bItemTab[i].effects, eff))
				if(compareatkdef(bItemTab[i].atkdef, atkdef))
				if(compareatkdef(bItemTab[i].used, used))
				if(comparegivencat(bItemTab[i].givencat, givencat))
				if(bItemTab[i].cost == cost)
				if(bItemTab[i].price == price)
				if(bItemTab[i].quality == quality)
				if(bItemTab[i].lvdown == lvdown)
				if(bItemTab[i].firstup == firstup)
				if(bItemTab[i].lastup == lastup)
				if(bItemTab[i].incr == incr)
				if(bItemTab[i].decr == decr)
				if(bItemTab[i].perp == perp)
				if(bItemTab[i].points[0] == pnts[0])
				if(bItemTab[i].points[1] == pnts[1])
				if(bItemTab[i].points[2] == pnts[2])
				if(bItemTab[i].points[3] == pnts[3])
				if(bItemTab[i].points[4] == pnts[4]) {
					bItemTab[i].vol += vol;
					return bItemTab[i];
				}
			}
			let newib = new bItem(bItemTab.length, id, tags, eff, cost, price, quality, pnts, vol, atkdef, used, givencat, lvdown, firstup, lastup, incr, decr, perp);
			bItemTab.push(newib);
			return newib;
		};
		
		this.removebItem = (xid, vol) => {
			bItemTab[xid].vol -= vol;
		};
		
		this.filterbItem = x => {
			let results = [];
			
			// x[0] == 0 by aID
			if(x[0] == 0) {
				for(let i = 0; i < bItemTab.length; i++) {
					if(bItemTab[i].vol <= bItemTab[i].voltmp) continue;
					if((bItemTab[i].aID == x[1])) results.push(bItemTab[i]);
				}
				return results;
			}
			
			// x[0] == 1 by category
			if(x[0] == 1) {
				for(let i = 0; i < bItemTab.length; i++) {
					if(bItemTab[i].vol <= bItemTab[i].voltmp) continue;
					let flag = false;
					for(let j = 0; j < bItemTab[i].givencat.length; j++) {
						if(bItemTab[i].givencat[j] == x[1]) {
							flag = true;
							break;
						}
					}
					if(flag) {
						results.push(bItemTab[i]);
						continue;
					}
					for(let j = 0; j < aItemTab[bItemTab[i].aID].cat.length; j++) {
						if(x[1] == aItemTab[bItemTab[i].aID].cat[j]) {
							flag = true;
							break;
						}
					}
					if(flag) results.push(bItemTab[i]);
				}
				return results;
			}
			
			// x[0] == 2 by tag
			if(x[0] == 2) {
				for(let i = 0; i < bItemTab.length; i++) {
					if(bItemTab[i].vol <= bItemTab[i].voltmp) continue;
					for(let j = 0; j < bItemTab[i].tags.length; j++) {
						if(x[1] == bItemTab[i].tags[j].id) {
							results.push(bItemTab[i]);
							break;
						}
					}
				}
				return results;
			}		
		}
		
		this.resetvol = () => {
			for(let i = 0; i < bItemTab.length; i++) bItemTab[i].voltmp = 0;
		}
		
		this.applyvol = () => {
			for(let i = 0; i < bItemTab.length; i++) bItemTab[i].vol -= bItemTab[i].voltmp;
		}

	};
	
	get a() {
		return this.aItemTab();
	}
	get b() {
		return this.bItemTab();
	}
	get c() {
		return this.aCats();
	}
};

let sitem = new sItem();

/**
 * excavation
 */

let sFarm = class {
	constructor() {
		let aFarm = class{
			constructor(id, name, lv, price, itemlist) {
				this.id = id;
				this.name = name;
				this.lv = lv;
				this.price = price;
				this.itemlist = itemlist;
				// itemlist: [aitemid, vol, rare]
			}
		};
		
		let farmlist = {};
		
		this.fl = () => farmlist;
		
		let getTagByRare = x => {
			// todo: get tag by rare
			x;
			return [];
		}
		
		let getQByRare = x => {
			let rnd = Math.floor(Math.random() * 10 * x) - 10;
			return (x * 20) + rnd;	
		}
		
		
		this.newFarm = (id, name, lv, price, itemlist) => {
			return farmlist[id] = new aFarm(id, name, lv, price, itemlist);
		}
		
		this.excavation = (id) => {
			let items = farmlist[id].itemlist;
			let i = Math.floor(Math.random() * items.length);
			//items[i][0]; //aid
			//items[i][1]; //vol
			//items[i][2]; //rare
			let tags = getTagByRare(items[i][2]);
			let quality = getQByRare(items[i][2]);
			
			let cost = farmlist[id].price;
			let price = 1;
			
			let used = [0, 0, 0]
			
			//todo: firstup, lastup, incr, decr, perp
			let newb = sitem.newbItem(items[i][0], tags, [], cost, price, quality, [0, 0, 0, 0, 0], items[i][1], [0, 0, 0, 0, 0, 0], used, [], lvdown, firstup, lastup, incr, decr, perp)
			
			let xidlist = [[newb.xid, items[i][1]]];
			sfac.newfrec(xidlist);
			
			return [newb,xidlist];
			
			//items;
		}
		
	}
}

let sfarm = new sFarm();

/**
 * factory
 */

let sFactory = class {
	constructor() {
		let makingtab = [];
		this.makingtab = () => makingtab;
		
		this.newrec = x => {
			for(let i = 0; i < makingtab.length; i++) {
				if(compareObj(makingtab[i], x)) return;
			}
			makingtab.push(x);
		};
		
		this.getfaci = x => {
			let ret = -1;
			Object.keys(makingtab[x]).forEach(e => {
				if(makingtab[x][e] >= 0) ret = e;
			});
			return ret;
		}
		
		this.applyrec = x => {
			Object.keys(makingtab[x]).forEach(e => {
				console.log(x, e, makingtab[x][e])
				sitem.b[U(e)].vol += makingtab[x][e];
				
			});
		}
	};
	get t() {
		return this.makingtab();
	}
};

let sfac = new sFactory;

/**
 * atelier
 */

let sAtelier = class {
	constructor() {
		let recipe = -1;
		let materialList = [];
		let tagsList = {};
		let tagsresult = [];
		let curpnt = [0, 0, 0, 0, 0];
		let sumpnt = [0, 0, 0, 0, 0];
		let effect = [];
		let qualitysum = 0;
		let qualityup = 0;
		let qualityuppercent = 0;
		let curquality = 0;
		let extramake = 0;
		let insertcount = 0;
		let cost = 0;
		let price = 1;
		let lvdown = 0;
		let link = 0;
		let unlink = 0;
		let jointag = true;
		let givecat = [];
		let effpnt = [0, 0, 0, 0, 0];
		let atkdef = [0, 0, 0, 0, 0, 0];
		let used = [0, 0, 0];
		let firstup = 10;
		let lastup = 10;
		let incr = 0;
		let decr = 0;
		let perp = false;
		const extraaddlv = 4;
		let extraadded = [true, true, true, true, true];
		
		let pushcat = x => {
			for(let i = 0; i < givecat.length; i++) if(givecat[i] == x) return;
			givecat.push(x);
		};
		pushcat + 'is used in eval';
		
		let applysyneff = e => {
			if(e[0] >= 5 && e[0] <= 26) {
				eval(seff.efftab()[e[0]].ev)(e[1], e[2]);
			}
			if(e[0] >= 37 && e[0] <= 39) {
				eval(seff.efftab()[e[0]].ev)(e[1], e[2]);
			}
		}
		
		let applyeff = e => {
			//debugger;
			if(e[0] >= 0 && e[0] <= 4) {
				if(e[1] >= 0) effpnt[e[0]] += e[1];
				else effpnt[e[0]] *= (-e[1]);
				return;
			}
			else if(e[0] == 27) {
				for(let i = 0; i < givecat.length; i++) if(givecat == e[1]) return;
				givecat.push(e[1]);
				return;
			}
			else if(e[0] >= 28 && e[0] <= 33) {
				if(e[1] >= 0) atkdef[(e[0] - 28)] += e[1]
				else atkdef[(e[0] - 28)] *= (-e[1])
				return;
			}
			else if(e[0] >= 34 && e[0] <= 36) {
				if(e[1] >= 0) used[(e[0] - 34)] += e[1]
				else used[(e[0] - 34)] *= (-e[1])
				return;
			}
		}
		
		let pushTags = tag => {
			if(tagsList[tag.id]) tagsList[tag.id]++;
			else tagsList[tag.id] = 1;
		};

		let removeTags = tag => {
			if(tagsList[tag.id]) tagsList[tag.id]--;
			if(tagsList[tag.id] == 0) delete tagsList[tag.id];
		};
		
		this.sr = item => {
			recipe = item;
			sitem.a[item].rec.forEach(e => {
				for(let i = 0; i < e[1]; i++) {
					materialList.push([[e[0], e[2]], [0, 0]]);
				}
			})
			for(let i = 0; i < 6; i++) atkdef[i] = sitem.a[item].atkdef[i];
			for(let i = 0; i < 3; i++) used[i] = sitem.a[item].used[i];
			for(let i = 0; i < 5; i++) effpnt[i] = sitem.a[item].pnt[i];
			price = sitem.a[item].price;
			return {
				materialList,
				curquality,
				insertcount,
				extramake,
				curpnt,
				sumpnt,
				used,
				atkdef,
				tagsList,
				cost,
				link,
				unlink,
				recipe,
				lvdown
			}
		}
		
		this.insert = (x, index) => {
			if(materialList[index][1][1] == 0) if(sitem.b[x].vol > sitem.b[x].voltmp){
				materialList[index][1][1] = 1;
				sitem.b[x].voltmp++;
				cost += sitem.b[x].cost;
				insertcount++;
				qualitysum += sitem.b[x].quality;
				curquality = Math.floor(((qualitysum / insertcount) + qualityup) * (1 + (qualityuppercent / 100)));
				
				let addpnt = sitem.a[sitem.b[x].aID].pnt;
				for(let i = 0; i < 5; i++) addpnt[i] += sitem.b[x].points[i];
				for(let i = 0; i < 5; i++) {
					sumpnt[i] += addpnt[i];
					curpnt[i] += addpnt[i];
				}
				
				curpnt[0] += Math.floor(addpnt[4] / 2);
				sumpnt[0] += Math.floor(addpnt[4] / 2);
				curpnt[1] -= Math.floor(addpnt[4] / 2);
				
				curpnt[1] += Math.floor(addpnt[0] / 2);
				sumpnt[1] += Math.floor(addpnt[0] / 2);
				curpnt[2] -= Math.floor(addpnt[0] / 2);
				
				curpnt[2] += Math.floor(addpnt[1] / 2);
				sumpnt[2] += Math.floor(addpnt[1] / 2);
				curpnt[3] -= Math.floor(addpnt[1] / 2);
				
				curpnt[3] += Math.floor(addpnt[2] / 2);
				sumpnt[3] += Math.floor(addpnt[2] / 2);
				curpnt[4] -= Math.floor(addpnt[2] / 2);
				
				curpnt[4] += Math.floor(addpnt[3] / 2);
				sumpnt[4] += Math.floor(addpnt[3] / 2);
				curpnt[0] -= Math.floor(addpnt[3] / 2);
				
				for(let i = 0; i < 5; i++) {
					curpnt[i] = Math.max(curpnt[i], 0);
				}
				
				if(extraadded[0]) if(curpnt[0] > extraaddlv) {
					extraadded[0] = false;
					materialList.push([[1, 10], [1, 0]]); // (mysterious power)
				}
				if(extraadded[1]) if(curpnt[1] > extraaddlv) {
					extraadded[1] = false;
					materialList.push([[1, 2], [1, 0]]); // (liquid)
				}
				if(extraadded[2]) if(curpnt[2] > extraaddlv) {
					extraadded[2] = false;
					materialList.push([[1, 22], [1, 0]]); // (impurities)
				}
				if(extraadded[3]) if(curpnt[3] > extraaddlv) {
					extraadded[3] = false;
					materialList.push([[1, 5], [1, 0]]); // (fuel)
				}
				if(extraadded[4]) if(curpnt[4] > extraaddlv) {
					extraadded[4] = false;
					materialList.push([[1, 7], [1, 0]]); // (dirt)
				}
				
				for(let i = 0; i < sitem.b[x].tags.length; i++) pushTags(sitem.b[x].tags[i]);
				
				let synefftab = [];
				for(let i = 0; i < sitem.b[x].effects.length; i++) {
					let ex = sitem.a[sitem.b[x].aID].eff[sitem.b[x].effects[i][0]].eff[sitem.b[x].effects[i][1]].eff;
					if(ex[0] < 27) if(ex[0] > 4) synefftab.push(ex);
				}
				for(let i = 0; i < synefftab.length; i++) applysyneff(synefftab[i]);
			}
							
			return {
				materialList,
				curquality,
				insertcount,
				extramake,
				curpnt,
				sumpnt,
				used,
				atkdef,
				tagsList,
				cost,
				link,
				unlink,
				recipe,
				lvdown
			};
		};
		
		let joinTags = () => {
			if(!jointag) return;
			let tags = Object.keys(tagsList);
			let flag = true;
			for (let i = 0; i < tags.length; i++) {
				for (let j = 0; j < i; j++) {
					let result = stag.joinTag(U(tags[i]), U(tags[j]));
					//console.log(i, j, U(tags[i]), U(tags[j]), result);
					if (result != -1) {
						removeTags(stag.tagTable()[U(tags[i])]);
						removeTags(stag.tagTable()[U(tags[j])]);
						pushTags(stag.tagTable()[result]);
						flag = false;
					}
				}
			};
			if(flag) {
				//if(devel) console.log(tagsList);
				return;
			};
			joinTags();
		};
		
		this.insertdone = () => {
			let e = sitem.a[recipe].eff;
			for(let i = 0; i < e.length; i++) {
				let k = 0;
				for(let j = 0; j < e[i].eff.length; j++) {
					if(sumpnt[e[i].element] < e[i].eff[j].lv) break;
					else k = j;
				}
				effect.push([i, k]);
			}
			effect.forEach(x => {
				let e = sitem.a[recipe].eff[x[0]];
				let ee = e.eff[x[1]]
				applyeff(ee.eff);
			});
			
			joinTags();
			
			return {
				materialList,
				curquality,
				insertcount,
				extramake,
				curpnt,
				sumpnt,
				used,
				atkdef,
				tagsList,
				cost,
				link,
				unlink,
				recipe,
				lvdown
			};
		}
		
		this.linkTags = (a, b) => {
			if(tagsList[a] && tagsList[b]) {
				let result = stag.linkTag(a, b);
				if(result == -1) {
					result = stag.pushlTag(stag.getltagname(a, b), [a, b], 1, '' + a + 'and' + b + 'linked', []);
					removeTags(stag.tagTable()[a]);
					removeTags(stag.tagTable()[b]);
					pushTags(stag.tagTable()[result]);
					//if(devel) console.log(tagsList, 'new');
					link--;
					return {
						status: 1,
						materialList,
						curquality,
						insertcount,
						extramake,
						curpnt,
						sumpnt,
						used,
						atkdef,
						tagsList,
						cost,
						link,
						unlink,
						recipe,
						lvdown
					};
				}
				removeTags(stag.tagTable()[a]);
				removeTags(stag.tagTable()[b]);
				pushTags(stag.tagTable()[result]);
				//if(devel) console.log(tagsList, 'link');
				link--;
				return {
					status: 0,
					materialList,
					curquality,
					insertcount,
					extramake,
					curpnt,
					sumpnt,
					used,
					atkdef,
					tagsList,
					cost,
					link,
					unlink,
					recipe,
					lvdown
				};
			};
			//if(devel) console.log(tagsList, 'fail');
			return {
				status: -1,
				materialList,
				curquality,
				insertcount,
				extramake,
				curpnt,
				sumpnt,
				used,
				atkdef,
				tagsList,
				cost,
				link,
				unlink,
				recipe,
				lvdown
			};
		};
		
		this.unlinkTag = a => {
			if(tagsList[a]) {
				let result = stag.parentTag(a);
				if(result.length) {
					removeTags(stag.tagTable()[a]);
					let r = Math.floor(Math.random() * result.length);
					pushTags(stag.tagTable()[result[r][1]]);
					pushTags(stag.tagTable()[result[r][2]]);
					//if(devel) console.log(tagsList, 'unlink');
					unlink--;
					return {
						status: 0,
						materialList,
						curquality,
						insertcount,
						extramake,
						curpnt,
						sumpnt,
						used,
						atkdef,
						tagsList,
						cost,
						link,
						unlink,
						recipe,
						lvdown
					};
				};
				//if(devel) console.log(tagsList, 'unlinkfail');
				return {
					status: -1,
					materialList,
					curquality,
					insertcount,
					extramake,
					curpnt,
					sumpnt,
					used,
					atkdef,
					tagsList,
					cost,
					link,
					unlink,
					recipe,
					lvdown
				};
			}
			//if(devel) console.log(tagsList, 'unlinkfail');
			return {
				status: -2,
				materialList,
				curquality,
				insertcount,
				extramake,
				curpnt,
				sumpnt,
				used,
				atkdef,
				tagsList,
				cost,
				link,
				unlink,
				recipe,
				lvdown
			};
		};
		
		let applyTagEff = t => {
			eval(t.ev);
		};
		
		this.commitTag = a => {
			//if(devel) console.log(tagsList);
			tagsresult = [];
			a.forEach(e => {
				if(tagsList[e]) {
					if(tagsresult.length == 0) {
						tagsresult.push(stag.tagTable()[e]);
						return;
					}
					let fl = true;
					tagsresult.forEach(ee => {
						if(e == ee.id) fl = false;
					});
					if(fl) tagsresult.push(stag.tagTable()[e]);
				}
			});
			if(tagsresult.length >= 3) tagsresult = [tagsresult[0], tagsresult[1], tagsresult[2]];
			//if(devel) console.log(tagsresult, 'tags');
		};
		
		let vali = () => {
			for(let i = 0; i < materialList.length; i++) 
				if(materialList[i][1][0] == 0)
					if(materialList[i][1][1] == 0)
						return true;
			return false;
		}
		
		this.commit = () => {
			if(vali()) return 'required item not instered';
			if(link != unlink) return 'bad link';
			
			let xidlist = {};
			for(let i = 0; i < sitem.b.length; i++) {
				if(sitem.b[i].voltmp != 0) xidlist[i] = (-sitem.b[i].voltmp);
			}
			curquality = Math.floor(((qualitysum / insertcount) + qualityup) * (1 + (qualityuppercent / 100)));
			
			cost = Math.floor(cost / (insertcount + extramake));
			
			tagsresult.forEach(applyTagEff);
			
			curquality = Math.floor(curquality);
			if(curquality >= 999) curquality = 999;
			cost = Math.floor(cost);
			if(cost <= 0) cost = 0;
			price = Math.floor(price);
			if(price <= 0) price = 0;
			
			let newb = sitem.newbItem(recipe, tagsresult, effect, cost, price, curquality, effpnt, insertcount + extramake, atkdef, used, givecat, lvdown, firstup, lastup, incr, decr, perp);
			
			
			xidlist[newb.xid] = insertcount + extramake;
			
			sitem.applyvol();
			sitem.resetvol();
			
			sfac.newrec(xidlist);
			
			splayer.daypass(newb.lvsum);
			
			return {
				xidlist,
				newb: newb.xid
			};
			
		}
		
		
		if(devel) this.setlink = a => {
			jointag = (a[0] == 1);
			link = a[1];
			unlink = a[2];
		}
		
	}
};

/**
 * player
 */

let sPlayer = class {
	constructor() {
		let money = 0;
		let week = 1;
		let day = 1;
		let gamewin = false;
		
		// todo: tasks
		
		this.negItem2zero = () => {
			sitem.b.forEach(e => {
				if(e.vol < 0) {
					money += (e.vol * e.price * 2);
					e.vol = 0;
				}
			})
		}
		
		this.money = x => x ? money += x : money;
		
		this.daypass = x => {
			for(let i = 0; i < x; i++) {
				day++;
				if(day == 8) {
					day = 1;
					week++;
				}
				let winflag = true;
				for(let i = 1; i < 6; i++) if(!this.chktask(i)) winflag = false;
				if(!gamewin) {
					if(winflag) {
						gamewin = true;
						alert('you have won the game, time: ' + week + ' weeks ' + day + ' days');
					}
				}
			}
		}
		
		this.getinfo = () => {
			return {
				money,
				week,
				day
			};
		}
		//todo: save
		this.save = () => {
			let saveobj = {};
			saveobj.aa = [];
			saveobj.aw = week;
			saveobj.bd = day;
			saveobj.cm = money;
			saveobj.dt = [];
			saveobj.eb = [];
			saveobj.ff = sfac.makingtab();
			for(let i = 0; i < sitem.aItemP(); i++) {
				let ai = JSON.parse(JSON.stringify(sitem.a[i]));
				saveobj.aa.push(ai);
			}
			for(let i = 0; i < sitem.b.length; i++) {
				let bi = JSON.parse(JSON.stringify(sitem.b[i]));
				bi.tagid = []
				for(let i = 0; i < bi.tags.length; i++) bi.tagid.push(bi.tags[i].id);
				delete bi.tags;
				saveobj.eb.push(bi);
			}
			for(let i = 2; i < -stag.linkedTagCur(); i++) {
				let ti = JSON.parse(JSON.stringify(stag.t[-i]));
				delete ti.id;
				delete ti.lnkto;
				delete ti.lv;
				saveobj.dt.push(ti);
			}
			return JSON.stringify(saveobj);
		}
		this.load = text => {
			let s = JSON.parse(text);
			week = s.aw;
			day = s.bd;
			money = s.cm;
			for(let i = 0; i < s.aa.length; i++) {
				sitem.newaItem(s.aa[i].id, s.aa[i].name, s.aa[i].typ, s.aa[i].cat, s.aa[i].eff, s.aa[i].pnt, s.aa[i].rec, s.aa[i].atkdef, s.aa[i].used, s.aa[i].lv, s.aa[i].price)
			}
			for(let i = 0; i < s.dt.length; i++) {
				stag.pushlTag(s.dt[i].name, [s.dt[i].lnkfr[0][1], s.dt[i].lnkfr[0][2]], s.dt[i].avl, s.dt[i].des, s.dt[i].eff);	
			}
			for(let i = 0; i < s.eb.length; i++) {
				/* id: any, tags: any, eff: any, cost: any, price: any, quality: any, pnts: any, vol: any, atkdef: any, used: any, givencat: any, lvdown: any, firstup: any, lastup: any, incr: any, decr: any, perp: any */
				let tags = [];
				for(let j = 0; j < s.eb[i].tagid.length; j++) tags.push(stag.t[s.eb[i].tagid[j]])
				sitem.newbItem(s.eb[i].aID, tags, s.eb[i].effects, s.eb[i].cost, s.eb[i].price, s.eb[i].quality, s.eb[i].points, s.eb[i].vol, s.eb[i].atkdef, s.eb[i].used, s.eb[i].givencat, s.eb[i].lvdown, s.eb[i].firstup, s.eb[i].lastup, s.eb[i].incr, s.eb[i].decr, s.eb[i].perp);
			}
			for(let i = 0; i < s.ff.length; i++) {
				sfac.newrec(s.ff[i]);
			}
		}
		this.chktask = x => {
			switch(x) {
				case 1:
					return this.money() >= 999999;
				case 2:
					for(let i = 0; i < sitem.b.length; i++) if(sitem.b[i].quality >= 999) return true;
					return false;
				case 3:
					for(let i = 0; i < sitem.b.length; i++) if(sitem.b[i].cost <= 0) return true;
					return false;
				case 4:
					for(let i = 0; i < sitem.b.length; i++) if(sitem.b[i].used[1] >= 999) return true;
					return false;
				case 5:
					for(let i = 0; i < sitem.b.length; i++) if(sitem.b[i].calused()[1] >= Infinity) return true;
					return false;
			}
		}
	};
};

let splayer = new sPlayer();
