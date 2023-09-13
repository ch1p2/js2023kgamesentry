'use strict'

const D = document;
const gei = x => D.getElementById(x);
const dcr = x => D.createElement(x);
HTMLElement.prototype.apc = HTMLElement.prototype.appendChild;

/**
 * ui
 */
let sUi = class {
	constructor() {
		this.elelist = ['earth', 'water', 'wood', 'fire', 'earth'];
		this.equlist = ['HP', 'MP', 'atk', 'def', 'agi', 'luk'];
	}
	updateEncyclopedia() {
		let a = gei('items');
	}
	switchTO(x) {
		const a = gei('atelier');
		const f = gei('factory');
		const e = gei('explore');
		const d = 'display:none';
		switch(x) {
			case 1:
				a.style = '';
				f.style = e.style = d;
				break;
			case 2:
				e.style = '';
				a.style = f.style = d;
				break;
			default:
				f.style = '';
				e.style = a.style = d;
		}
	}
	
	expandSel(select, button) {
		if(U(select.size) == 1) {
			select.size = 5;
			button.innerHTML = '-'
		}
		else {
			select.size = 1;
			button.innerHTML = '+'
		}
	}
	
	noSwitch() {
		gei('actionbuttons').style = 'display:none';
		gei('fakebuttons').style = '';
		gei('buy').disabled = true;
		gei('sell').disabled = true;
		gei('buysell').disabled = true;
		gei('savebtn').disabled = true;
	}
	yeSwitch() {
		gei('actionbuttons').style = '';
		gei('fakebuttons').style = 'display:none';
		gei('buy').disabled = false;
		gei('sell').disabled = false;
		gei('buysell').disabled = false;
		gei('savebtn').disabled = false;
	}
	newAtelier() {
		let sa = new sAtelier();
		
		gei('createa').disabled = true;
		gei('creater').disabled = true;
		this.noSwitch();
		let newA = gei('newAtelier');
		let selr = dcr('select');
		let expbutton = dcr('button');
		expbutton.innerHTML = '-'
		expbutton.onclick = () => this.expandSel(selr, expbutton);
		selr.id = 'selr';
		selr.size = 5;
		let ak = Object.keys(sitem.a)
		//console.log(ak.length);
		for(let i = 0; i < ak.length; i++) {
			//console.log(sitem.a[ak[i]].rec)
			if(sitem.a[ak[i]].rec[0][2] != -1) {
				let selrop = dcr('option');
				selrop.value = sitem.a[ak[i]].id;
				selrop.innerHTML = sitem.a[ak[i]].name;
				
				selr.apc(selrop);
			}
		}
		let canclebutton = dcr('button');
		canclebutton.innerHTML = 'cancel';
		canclebutton.onclick = () => {
			newA.innerHTML = '';
			gei('createa').disabled = false;
			gei('creater').disabled = false;
			this.yeSwitch();
			sitem.resetvol();
		}
		newA.apc(canclebutton);
		//newA.apc(dcr('br'));
		let tl = dcr('p');
		tl.innerHTML = 'step 1: choose recipe'
		newA.apc(tl);
		let recdesc = dcr('details');
		recdesc.id = 'recipedetail'
//		recdesc.open = true;
		let selok = dcr('button');
		let updateRecipeDesc = () => {
			let c = U(selr.value);
			recdesc.innerHTML = JSON.stringify(sitem.a[c]);
			this.showaItemDesc(recdesc, c);
			selok.disabled = false;
		}
		selr.oninput = updateRecipeDesc;
		//selr.onload = updateRecipeDesc;
		newA.apc(selr);
		newA.apc(expbutton);
		selok.disabled = true;
		selok.innerHTML = 'select recipe'
		selok.onclick = () => {
			selr.size = 1;
			let tl = dcr('p');
			let productable = dcr('table');
			let productbody = dcr('tbody');
			let productr = dcr('tr');
			let productd1 = dcr('td');
			let productd2 = dcr('td');
			let productd3 = dcr('td');
			tl.innerHTML = 'step 2: insert ingredients'
			newA.apc(tl);
			let sasr = sa.sr(U(selr.value));
			let itemlist = sasr.materialList;
			
			let updateProductable = sasr => {
				let pntulli = '<ul>'
				for(let i = 0; i < 5; i++) pntulli += ('<li>' + this.elelist[i] + ': ' + sasr.curpnt[i] + '</li>');
				pntulli += '</ul>';
				pntulli += ('<p>can use ' + sasr.used[0] + ' times, damage: ' + sasr.used[1] + ', heal: ' + sasr.used[2] + '</p>')
				productd1.innerHTML = pntulli;
				
				let atkulli = '<ul>'
				for(let i = 0; i < 6; i++) atkulli += ('<li>' + this.equlist[i] + ': ' + sasr.atkdef[i] + '</li>');
				atkulli += '</ul>'
				productd2.innerHTML = atkulli;
				
				let quaulli = '<ul><li>quality: ' + sasr.curquality + '</li><li>quantity: ' + (sasr.extramake + sasr.insertcount);
				productd3.innerHTML = quaulli;
			}
			
			updateProductable(sasr);
			
			selok.disabled = true;
			selr.disabled = true;
			console.log(itemlist);
			let itemList = dcr('ul');
			itemList.id = 'itemSelList';
			let insertok = dcr('button');
			insertok.disabled = true;
			insertok.innerHTML = 'done';
			insertok.onclick = () => {
				let step3 = dcr('p');
				insertok.onclick = () => {};
				insertok.disabled = true;
				step3.innerHTML = 'step 3: link tags';
				newA.apc(step3);
				itemList.innerHTML = '';
				let insertdone = sa.insertdone();
				updateProductable(insertdone);
				let linktagtable = dcr('table');
				newA.apc(linktagtable);
				let linkdone = dcr('button');
				linkdone.innerHTML = 'link done';
				newA.apc(linkdone);
				let linktagtbody = dcr('tbody');
				linktagtable.apc(linktagtbody);
				let tr1 = dcr('tr');
				let tr2 = dcr('tr');
				let tr3 = dcr('tr');
				linktagtbody.apc(tr1);
				linktagtbody.apc(tr2);
				linktagtbody.apc(tr3);
				let td11 = dcr('td');
				td11.colSpan = 2;
				let td12 = dcr('td');
				let td21 = dcr('td');
				let td22 = dcr('td');
				let td23 = dcr('td');
				let td31 = dcr('td');
				td31.colSpan = 2;
				let td32 = dcr('td');
				tr1.apc(td11);
				tr1.apc(td12);
				tr2.apc(td21);
				tr2.apc(td22);
				tr2.apc(td23);
				tr3.apc(td31);
				tr3.apc(td32);
				
				let linksel1 = dcr('select');
				let linksel2 = dcr('select');
				let unlinksel = dcr('select');
				td21.apc(linksel1);
				td22.apc(linksel2);
				td23.apc(unlinksel);
				linksel1.size = linksel2.size = unlinksel.size = 5;
				let linkok = dcr('button');
				let unlinkok = dcr('button');
				td31.apc(linkok);
				td32.apc(unlinkok);
				linkok.innerHTML = 'link'
				unlinkok.innerHTML = 'unlink'
				linkok.disabled	= unlinkok.disabled = true;
				
				//console.log(insertdone.tagsList);
				
				let updateTagList = (sareturn) => {
					let taglist = sareturn.tagsList
					td11.innerHTML = 'links: ' + sareturn.link
					td12.innerHTML = 'unlinks: ' + sareturn.unlink
					let tags = [];
					let taglistkeys = Object.keys(taglist);
					for(let i = 0; i < taglistkeys.length; i++) {
						let k = taglistkeys[i];
						tags.push([U(k), U(taglist[k])]);
					}
					
					([linksel1, linksel2, unlinksel]).forEach(sel => {
						sel.innerHTML = '';
						let op1 = dcr('option');
						op1.value = 'unselected';
						sel.apc(op1);
						for(let i = 0; i < tags.length; i++) {
							let op = dcr('option');
							op.value = tags[i][0];
							op.innerHTML = stag.t[tags[i][0]].n + ' x ' + tags[i][1];
							sel.apc(op);
						}
						sel.oninput = () => {
							if(isNaN(U(linksel1.value))) linkok.disabled = true;
							else if(isNaN(U(linksel2.value))) linkok.disabled = true;
							else linkok.disabled = false;
							if(isNaN(U(unlinksel.value))) unlinkok.disabled = true;
							else unlinkok.disabled = false;
						}
					})
				}
				updateTagList(insertdone);
				let sar = insertdone;
				linkok.onclick = () => {
					//alert(linksel1.value, linksel2.value)
					sar = sa.linkTags(U(linksel1.value), U(linksel2.value));
					updateTagList(sar);
					if(sar.link == sar.unlink) linkdone.disabled = false;
					else linkdone.disabled = true;
				}
				unlinkok.onclick = () => {
					//alert(unlinksel.value)
					sar = sa.unlinkTag(U(unlinksel.value));
					updateTagList(sar);
					if(sar.link == sar.unlink) linkdone.disabled = false;
					else linkdone.disabled = true;
					
				}
				linkdone.onclick = () => {
					tr1.innerHTML = '<td colspan="3">select 3 tags</td>';
					updateTagList(sar);
					tr3.innerHTML = '';
					let x = sitem.a[sar.recipe].lv;
					x -= sar.lvdown;
					if(x <= 1) x = 1;
					linkdone.innerHTML = 'confirm (' + x + ' days)'
					linkdone.onclick = () => {
						linkdone.disabled = true;
						let commitedtags = [];
						([linksel1, linksel2, unlinksel]).forEach(sel => {
							if(!isNaN(U(sel.value))) {
								commitedtags.push(U(sel.value));
							}
						})
						sa.commitTag(commitedtags);
						let result = sa.commit().newb;
						newA.innerHTML = '';
						let desc = dcr('details');
						desc.open = true;
						newA.apc(desc);
						this.showbItemDesc(desc, result);
						let okbtn = dcr('button');
						okbtn.innerHTML = 'ok';
						okbtn.onclick = () => {
							newA.innerHTML = '';
							gei('createa').disabled = false;
							gei('creater').disabled = false;
							this.reloadBItem();
							this.yeSwitch();
							this.updateDate();
						}
						newA.apc(okbtn);
					}
				}
			}
			productr.apc(productd1), productr.apc(productd2), productr.apc(productd3);
			productable.apc(productbody), productbody.apc(productr);
			
			let updateVol = () => {
				for(let i = 0; i < itemList.children.length; i++) {
					let e = itemList.children[i].children[0].children[0].children[0].children[0].children[0];
					for(let i = 0; i < e.children.length; i++) {
						let ee = e.children[i];
						if(isNaN(U(ee.value))) continue;
						if(!ee.value) continue;
						ee.innerHTML = sitem.b[U(ee.value)].n + ' x ' + (sitem.b[U(ee.value)].v);
					}
				}
			}
			
			let updateItemList = (xid, pos) => {
				let res = sa.insert(xid, pos);
				updateProductable(res);
				let itemlist = res.materialList;
				itemList.children;
				if(itemlist.length == itemList.children.length) {
				}
				else {
					for(let i = itemList.children.length; i < itemlist.length; i++) {
						
						let tbl = dcr('table');
						let tbd = dcr('tbody')
						let tbr = dcr('tr')
						tbd.apc(tbr), tbl.apc(tbd);
						let td1 = dcr('td');
						let td2 = dcr('td');
						tbr.apc(td1), tbr.apc(td2);
						let itemi = dcr('li');
						let selit = dcr('select');
						selit.disabled = false;
						
						let bitemList = sitem.filterbItem(itemlist[i][0]);
						let desc = dcr('details')
						selit.size = 1;
						
						
						selit.apc(dcr('option'));
						
						for(let i = 0; i < bitemList.length; i++) {
							let bitemOption = dcr('option');
							bitemOption.value = bitemList[i].xid;
							bitemOption.innerHTML = sitem.a[bitemList[i].aID].n;
							selit.apc(bitemOption);
						}
						
						//itemi.apc(selit);
						td1.apc(selit);
						let buttonexp = dcr('button');
						buttonexp.innerHTML = '+'
						buttonexp.onclick = () => this.expandSel(selit, buttonexp)
						td1.apc(buttonexp)
						// if(!itemlist[i][1][0]) {
						// 	let requ = dcr('i');
						// 	requ.innerHTML = 'required<br />';
						// 	td2.apc(requ);
						// }
						// if(itemlist[i][1][1]) {
						// 	let used = dcr('i');
						// 	used.innerHTML = 'done<br />';
						// 	td2.apc(used);
						// }
						let itemok = dcr('button');
						itemok.innerHTML = 'ok';
						itemok.id = 'itemOkButton' + String(i);
						//itemok.onclick = () => updateItemList(U(selit.value), i);
						itemok.disabled = true;
						selit.oninput = () => {
							if(selit.value) {
								if(sitem.b[U(selit.value)].v <= 0) {
									
									itemok.onclick = () => {};
									itemok.disabled = true;
									return;
								}
								this.showbItemDesc(desc, U(selit.value));
								itemok.onclick = () => updateItemList(U(selit.value), i);
								itemok.disabled = false;
								return;
							}
							itemok.onclick = () => {};
							itemok.disabled = true;
						}
						td2.apc(itemok);
						td2.apc(dcr('br'));
						//itemList.apc(itemi)
						itemi.apc(tbl);
						itemi.apc(desc);
						itemList.apc(itemi);
					}
				}
				let btn = gei('itemOkButton' + String(pos));
				btn.disabled = true;
				btn.innerHTML = 'used';
				gei('itemSelList').children[pos].children[0].children[0].children[0].children[0].children[0].disabled = true;
				btn.onclick = () => {}
				insertok.disabled = false;
				updateVol();
				// fix
				for(let i = 0; i < itemlist.length; i++) {
					if(!itemlist[i][1][0]) if(!itemlist[i][1][1]) insertok.disabled = true;
				}
				
			}
			for(let i = 0; i < itemlist.length; i++) {
				let tbl = dcr('table');
				let tbd = dcr('tbody')
				let tbr = dcr('tr')
				tbd.apc(tbr), tbl.apc(tbd);
				let td1 = dcr('td');
				let td2 = dcr('td');
				tbr.apc(td1), tbr.apc(td2);
				let itemi = dcr('li');
				let selit = dcr('select');
				selit.disabled = false;
				
				let bitemList = sitem.filterbItem(itemlist[i][0]);
				let desc = dcr('details')
				selit.size = 1;
				
				let requ = dcr('option')
				requ.innerHTML = 'required';
				requ.selected = true;
				selit.apc(requ);
				
				for(let i = 0; i < bitemList.length; i++) {
					let bitemOption = dcr('option');
					bitemOption.value = bitemList[i].xid;
					bitemOption.innerHTML = sitem.a[bitemList[i].aID].n;
					selit.apc(bitemOption);
				}
				
				//itemi.apc(selit);
				td1.apc(selit);
				let buttonexp = dcr('button');
				buttonexp.innerHTML = '+'
				buttonexp.onclick = () => this.expandSel(selit, buttonexp)
				td1.apc(buttonexp)
				// if(!itemlist[i][1][0]) {
				// 	let requ = dcr('i');
				// 	requ.innerHTML = 'required<br />';
				// 	td2.apc(requ);
				// }
				// if(itemlist[i][1][1]) {
				// 	let used = dcr('i');
				// 	used.innerHTML = 'done<br />';
				// 	td2.apc(used);
				// }
				let itemok = dcr('button');
				itemok.innerHTML = 'ok';
				itemok.id = 'itemOkButton' + String(i);
				//itemok.onclick = () => updateItemList(U(selit.value), i);
				itemok.disabled = true;
				selit.oninput = () => {
					if(!isNaN(U(selit.value))) {
						
						if(sitem.b[U(selit.value)].v <= 0) {
							
							itemok.onclick = () => {};
							itemok.disabled = true;
							return;
						}
						
						this.showbItemDesc(desc, U(selit.value));
						itemok.onclick = () => updateItemList(U(selit.value), i);
						itemok.disabled = false;
						return;
					}
					itemok.onclick = () => {};
					itemok.disabled = true;
				}
				td2.apc(itemok);
				td2.apc(dcr('br'));
				//itemList.apc(itemi)
				itemi.apc(tbl);
				itemi.apc(desc);
				itemList.apc(itemi);
				updateVol();
			}
			newA.apc(itemList);
			newA.apc(productable);
			newA.apc(insertok);
		}
		newA.apc(selok);
		let toencyclo = dcr('button');
		toencyclo.innerHTML = "what's this"
		toencyclo.onclick = () => window.location.hash = 'e_item_' + selr.value;
		newA.apc(toencyclo);
		newA.apc(recdesc);
	}
	updateDate() {
		gei('dateweek').innerHTML = splayer.getinfo().week;
		gei('dateday').innerHTML = splayer.getinfo().day;
		gei('datemoney').innerHTML = splayer.money()
	}
	checkfilter() {
		let v = U(gei('SelFilBy1').value);
		let s2 = gei('SelFilBy2')
		let btn = gei('filok')
		if(v == -1) {
			s2.style = 'display:none';
			btn.disabled = false;
			return;
		}
		s2.innerHTML = '';
		s2.style = '';
		btn.disabled = true;
		let op1 = dcr('option');
		op1.selected = true;
		op1.value = 'unsel'
		s2.apc(op1);
		if(v == 0) {
			for(let i = 0; i < Object.keys(sitem.a).length; i++) {
				let k = Object.keys(sitem.a)[i];
				let op = dcr('option');
				op.value = sitem.a[k].id;
				op.innerHTML = sitem.a[k].n;
				s2.apc(op);
			}
		}
		if(v == 1) {
			for(let i = 0; i < Object.keys(sitem.c).length; i++) {
				let k = Object.keys(sitem.c)[i];
				let op = dcr('option');
				op.value = k;
				op.innerHTML = sitem.c[k];
				s2.apc(op);
			}
		}
		if(v == 2) {
			for(let i = 0; i < Object.keys(stag.t).length; i++) {
				let k = Object.keys(stag.t)[i];
				let op = dcr('option');
				op.value = k;
				op.innerHTML = stag.t[k].name;
				s2.apc(op);
			}
		}
		s2.oninput = () => btn.disabled = (s2.value == 'unsel');
		
	}
	reloadBItem() {
		let ibl = gei('ItemBoxList');
		ibl.innerHTML = '';
		let bx = undefined;
		if(gei('SelFilBy1').value == '-1') bx = sitem.b;
		else bx = sitem.filterbItem([U(gei('SelFilBy1').value), U(gei('SelFilBy2').value)])
		//for(let i = 0; i < ibl.children.length; i++) {}
		for(let i = ibl.children.length; i < bx.length; i++) {
			let bop = dcr('option');
			bop.value = bx[i].xid;
			bop.innerHTML = bx[i].n + ' x ' + bx[i].v;
			ibl.apc(bop);
		}
	}
	showbItemDesc(desc, xid) {
		let x = sitem.b[xid];
		let a = sitem.a[x.aID];
		let b = '';
		b += ('<p>lv ' + x.lvsum + ': <a href="#e_item_' + x.aID + '">' + x.n + '</a> [quality: ' + x.quality + ']');
		b += ('<p>volume: ' + x.v + ' cost: ' + x.cost + ' price: ' + x.price + '</p>');
		b += '<p>categoery:<ul>'
		for(let i = 0; i < a.cat.length; i++) b += ('<li><a href="#e_cat_' + a.cat[i] + '">(' + sitem.c[a.cat[i]] + ')</a></li>');
		for(let i = 0; i < x.givencat.length; i++) b += ('<li><a href="#e_cat_' + x.givencat[i] + '">(' + sitem.c[x.givencat[i]] + ')</a></li>');
		b += ('</ul></p><p>effects:<ul>')
		if(x.effects.length == 0) b += ('<li>no effect</li>');
		x.effects.forEach(e => {
			//effect id a.eff[e[0]].eff[e[1]].eff[0]
			b += ('<li><a href="#e_eff_' + a.eff[e[0]].eff[e[1]].eff[0] + '">' + seff.f[a.eff[e[0]].eff[e[1]].eff[0]].getname(a.eff[e[0]].eff[e[1]].eff[1], a.eff[e[0]].eff[e[1]].eff[2]))
			b += ('</a><details>')
			b += seff.f[a.eff[e[0]].eff[e[1]].eff[0]].getdesc(a.eff[e[0]].eff[e[1]].eff[1], a.eff[e[0]].eff[e[1]].eff[2])
			b += '</details></li>'
		})
		b += '</ul></p><p>tags:<ul>'
		
		for(let i = 0; i < x.tags.length; i++) {
			b += '<li><a href="#e_tag_'
			b += x.tags[i].id
			b += '">'
			b += x.tags[i].n
			b += '</a><details>'
			b += x.tags[i].d;
			b += '</details></li>'
		}
		
		b += '</ul></p><p>points:<ul>'
		for(let i = 0; i < 5; i++) b += ('<li>' + this.elelist[i] + ': ' + (a.pnt[i] + x.points[i]) + '</li>');
		b += '</ul></p><p>equippment:<ul>'
		for(let i = 0; i < 6; i++) b += ('<li>' + this.equlist[i] + ': ' + x.atkdef[i] + '</li>');
		b += '</ul></p>'
		b += ('<p>can use ' + x.used[0] + ' times, damage: ' + x.used[1] + ', heal: ' + x.used[2] + '</p>');
		b += ('<p>total damage: ' + x.calused[1] + ', total heal: ' + x.calused[2]);
		if(x.calused[0]) b += ', perpetual';
		b += '</p>'
		
		desc.innerHTML = b;
	}
	reloadBItemDesc() {
		let desc = gei('ItemBoxDetail');
		let selected = sitem.b[U(gei('ItemBoxList').value)];
		let b = '';
		
		b += ('<p>lv ' + selected.lvsum + ': ' + selected.n + ' [quality: ' + selected.quality + ']');

		
		desc.innerHTML = b;
	}
	save() {
		gei('savecontent').style = '';
		gei('savebox').value = splayer.save();
	}
	load() {
		gei('loadbtn').style = 'display:none';
		gei('savebtn').style = '';
		gei('loadtext').style = 'display:none';
		gei('title').style = 'display:none';
		gei('game').style = '';
		gei('encyc').style = '';
		let loadbox = gei('loadbox');
		loadbox.style = 'display:none';
		if(loadbox.value) splayer.load(loadbox.value);
		this.reloadBItem();
		this.updateDate();
		this.ency();
	}
	iboninput() {
		this.showbItemDesc(gei('ItemBoxDetail'), U(gei('ItemBoxList').value));
		//gei('buysell').max = sitem.b[U(gei('ItemBoxList').value)].v;
		this.bsoninput()
	}
	bsoninput() {
		let i = gei('buysell');
		let val = U(i.value);
		let min = U(i.min);
		let max = U(i.max);
		if(isNaN(val)) i.value = 1;
		if(Math.floor(val) != val) i.value = Math.floor(val);
		if(val < min) i.value = min;
		if(val > max) i.value = max;
		let days = Math.floor((val - 1) / 10) + 1;
		gei('buyday').innerHTML = days;
	}
	buysell(x) {
		let i = gei('buysell');
		let val = U(i.value);
		let days = Math.floor((val - 1) / 10) + 1;
		let xid = U(gei('ItemBoxList').value);
		if(x == 1) {
			// sell
			if(val > sitem.b[xid].v) return alert('item not enough');
			sitem.b[xid].vol -= val;
			splayer.money(sitem.b[xid].price * val);
			splayer.daypass(days);
		}
		else {
			// buy
			if(sitem.b[xid].cost * val > splayer.money()) return alert('money not enough');
			sitem.b[xid].vol += val;
			splayer.money(-sitem.b[xid].cost * val);
			splayer.daypass(days);
		}
		this.updateDate();
	}
	cfac() {
		let fac = gei('facdiv');
		let facbtn = gei('facbtn');
		let faclist = dcr('select');
		this.noSwitch();
		facbtn.disabled = true;
		let cancel = dcr('button');
		cancel.innerHTML = 'close';
		cancel.onclick = () => {
			this.yeSwitch();
			facbtn.disabled = false;
			fac.innerHTML = '';
		}
		fac.apc(cancel);
		fac.apc(dcr('br'))
		let op1 = dcr('option');
		op1.value = 'none';
		op1.selected = true;
		faclist.apc(op1);
		faclist.size = 5;
		let expbtn = dcr('button');
		expbtn.innerHTML = '-';
		expbtn.onclick = () => this.expandSel(faclist, expbtn);
		fac.apc(faclist);
		fac.apc(expbtn);
		for(let i = 0; i < sfac.t.length; i++) {
			let b = sfac.getfaci(i);
			let op = dcr('option');
			op.value = i;
			op.innerHTML = sitem.b[b].n + ' x ' + sfac.t[i][b];
			faclist.apc(op);
		}
		let dv = dcr('div');
		fac.apc(dv);
		faclist.oninput = () => {
			dv.innerHTML = '';
			let val = U(faclist.value);
			if(!isNaN(val)) {
				let ok = dcr('button');
				ok.innerHTML = 'ok (1 day)'
				dv.apc(ok);
				ok.onclick = () => {
					console.log(1);
					for(let i = 0; i < k.length; i++) if(t[k[i]] + sitem.b[k[i]].v < 0) return alert('item not enough');
					sfac.applyrec(val);
					splayer.daypass(1);
					this.updateDate();
					this.reloadBItem()
				}
				dv.apc(dcr('br'))
				let t = sfac.t[val];
				let k = Object.keys(t);
				for(let i = 0; i < k.length; i++) k[i] = U(k[i]);
				for(let i = 0; i < k.length; i++) {
					let ii = dcr('i');
					ii.innerHTML = sitem.b[k[i]].n + (t[k[i]] > 0 ? ' + ' : ' - ') + Math.abs(t[k[i]]);
					dv.apc(ii);
					let det = dcr('details');
					dv.apc(det);
					this.showbItemDesc(det, k[i]);
				}
			}
		}
	}
	
	showaItemDesc(desc, id) {
		let a = sitem.a[id];
		let b = '';
		b += ('<p>lv' + a.lv + ': <a href="#e_item_' + id + '">' + a.n + '</a> price: ' + a.price);
		b += '</p><p>categoery:<ul>'
		for(let i = 0; i < a.cat.length; i++) b += ('<li><a href="#e_cat_' + a.cat[i] + '">(' + sitem.c[a.cat[i]] + ')</a></li>');
		b += '</ul></p><p>recipe:<ul>'
		if(a.rec[0][2] == -1) b += '<li>get from excavation only</li>'
		else {
			a.rec.forEach(e => {
				b += '<li>'
				if(e[0] == 0) b += ('<a href="#e_item_' + e[2] + '">' + sitem.a[e[2]].n + '</a>');
				else if(e[0] == 1) b += ('<a href="#e_cat_' + e[2] + '">(' + sitem.c[e[2]] + ')</a>');
				else b += ('<a href="#e_tag_' + e[2] + '">' + stag.t[e[2]].name + '</a>');
				b += (' x ' + e[1] + '</li>');
			})
		}
		b += '</ul></p><p>effects:<ul>'
		if(a.eff.length == 0) b += ('<li>no effect</li>');
		a.eff.forEach(e => {
			b += ('<li>' + this.elelist[e.element] + '<ul>');
			e.eff.forEach(ee => {
				b += ('<li>lv ' + ee.lv + ': <a href="#e_eff_' + ee.eff[0] + '">' + seff.f[ee.eff[0]].getname(ee.eff[1], ee.eff[2]) + '</a><details>' + seff.f[ee.eff[0]].getdesc(ee.eff[1], ee.eff[2]) + '</details></li>');
			})
			b += '</ul></li>'
		})
		b += '</ul></p><p>base points:<ul>'
		for(let i = 0; i < 5; i++) b += ('<li>' + this.elelist[i] + ': ' + a.pnt[i] + '</li>');
		b += '</ul></p><p>equippment:<ul>'
		for(let i = 0; i < 6; i++) b += ('<li>' + this.equlist[i] + ': ' + a.atkdef[i] + '</li>');
		b += ('</ul></p><p>can use ' + a.used[0] + ' times, damage: ' + a.used[1] + ', heal: ' + a.used[2] + '</p>');
		desc.innerHTML = b;
	}
	
	exca() {
		let ak = Object.keys(sitem.a);
		let a = Math.floor(Math.random() * (ak.length + 1));
		if(a == ak.length) a--;
		let aID = sitem.a[ak[a]].id;
		let vol = Math.floor(Math.random() * 5);
		if(vol == 0) vol++
		let qua = Math.floor(Math.random() * 25);
		let tk = Object.keys(stag.t);
		let tagvol = Math.floor(Math.random() * 3);
		let tagid = [];
		let tag = [];
		if(tagvol == 0) tagvol = 3;
		for(let i = 0; i < tagvol; i++) {
			let tn = Math.floor(Math.random() * (tk.length + 1));
			if(tn == tk.length) tn--;
			let flag = true;
			let tid = U(tk[tn]);
			for(let j = 0; j < i; j++) {
				if(tagid[j] == tid) flag = false;
			}
			if(flag) {
				tagid.push(tid);
			}
			else {
				i--;
			}
		}
		console.log(tagid);
		for(let i = 0; i < tagid.length; i++) {
			tag.push(stag.t[tagid[i]]);
		}
		sitem.newbItem(aID, tag, [], 2, 2, qua, [0, 0, 0, 0, 0], vol, [0, 0, 0, 0, 0, 0], [0, 0, 0], [], 0, 1, 1, false, false, false);
		splayer.daypass(1);
		this.updateDate();
		this.reloadBItem();
	}
	etag() {
		//todo fix this
		let n = stag.linkedTagCur();
		let dv = gei('etag2');
		for(let i = dv.children.length - 2; i > n; i--) {
			console.log(i)
			let l = dcr('li');
			l.innerHTML = 'tag ' + i + ': #' + stag.t[i].name + ' <a href="#system">back to top</a>';
			l.id = 'e_tag_' + i;;
			let u = dcr('ul');
			let des = dcr('li');
			des.innerHTML = stag.t[i].d;
			u.apc(des);
			if(stag.t[i].lnkfr.length) {
				let li = dcr('li');
				let x = 'linked from:<ul>';
				for(let j = 0; j < stag.t[i].lnkfr.length; j++) {
					x += ('<li><a href="#e_tag_' + stag.t[i].lnkfr[j][1] + '">#' + stag.t[stag.t[i].lnkfr[j][1]].name + '</a>');
					x += (stag.t[i].lnkfr[j][0] ? ' && ' : ' & ')
					x += ('<a href="#e_tag_' + stag.t[i].lnkfr[j][2] + '">#' + stag.t[stag.t[i].lnkfr[j][2]].name + '</a></li>');
				}
				x += '</ul>';
				li.innerHTML = x;
				u.apc(li);
			}
			l.apc(u);
			dv.apc(l);
		}
	}
	dfsFindTag(root, tag, ret) {
		if(root.tagName.toLowerCase() == tag.toLowerCase()) ret.push(root);
		for(let i = 0; i < root.children.length; i++) this.dfsFindTag(root.children[i], tag, ret);
	}
	encytoggle() {
		let det = [];
		this.dfsFindTag(gei('encyc'), 'details', det);
		for(let i = 0; i < det.length; i++) {
			det[i].open = !det[i].open;
		}
	}
	ency() {
		let dv = gei('eitem');
		dv.innerHTML = '';
		let ak = Object.keys(sitem.a);
		for(let i = 0; i < ak.length; i++) {
			ak[i] = U(ak[i]);
			let l = dcr('li');
			let d = dcr('details');
			l.id = 'e_item_' + ak[i];
			this.showaItemDesc(d, sitem.a[ak[i]].id);
			let s = dcr('summary');
			s.innerHTML = 'item # ' + ak[i] + ': ' + sitem.a[ak[i]].n;
			d.apc(s);
			let a = dcr('a');
			a.href = '#system';
			a.innerHTML = 'back to top';
			l.apc(a);
			l.apc(d);
			dv.apc(l);
		}
		dv = gei('ecat');
		dv.innerHTML = '';
		let ck = Object.keys(sitem.c);
		for(let i = 0; i < ck.length; i++) {
			ck[i] = U(ck[i]);
			let l = dcr('li');
			l.innerHTML = 'categoery # ' + ck[i] + ': ' + sitem.c[ck[i]] + ' <a href="#system">back to top</a>';
			l.id = 'e_cat_' + ck[i];
			let u = dcr('ul');
			for(let j = 0; j < ak.length; j++) {
				if(sitem.a[ak[j]].cat.includes(ck[i])) {
					let li = dcr('li');
					let a = dcr('a');
					a.href = '#e_item_' + ak[j];
					a.innerHTML = sitem.a[ak[j]].n;
					li.apc(a);
					u.apc(li);
				}
			}
			l.apc(u);
			dv.apc(l);
		}
		dv = gei('etag1');
		dv.innerHTML = '';
		let tk = Object.keys(stag.t);
		for(let i = 0; i < tk.length; i++) {
			tk[i] = U(tk[i]);
			if(tk[i] < 0) continue;
			let l = dcr('li');
			l.innerHTML = 'tag ' + tk[i] + ': #' + stag.t[tk[i]].name + ' <a href="#system">back to top</a>';
			l.id = 'e_tag_' + tk[i];
			let u = dcr('ul');
			let des = dcr('li');
			des.innerHTML = stag.t[tk[i]].d;
			u.apc(des);
			if(stag.t[tk[i]].lnkfr.length) {
				let li = dcr('li');
				let x = 'linked from:<ul>';
				for(let j = 0; j < stag.t[tk[i]].lnkfr.length; j++) {
					x += ('<li><a href="#e_tag_' + stag.t[tk[i]].lnkfr[j][1] + '">#' + stag.t[stag.t[tk[i]].lnkfr[j][1]].name + '</a>');
					x += (stag.t[tk[i]].lnkfr[j][0] ? ' && ' : ' & ')
					x += ('<a href="#e_tag_' + stag.t[tk[i]].lnkfr[j][2] + '">#' + stag.t[stag.t[tk[i]].lnkfr[j][2]].name + '</a></li>');
				}
				x += '</ul>';
				li.innerHTML = x;
				u.apc(li);
			}
			l.apc(u);
			dv.apc(l);
		}
		this.etag();
		let ek = Object.keys(seff.f);
		dv = gei('eeff');
		dv.innerHTML = '';
		for(let i = 0; i < ek.length; i++) {
			ek[i] = U(ek[i]);
			let l = dcr('li');
			l.innerHTML = 'effect # ' + ek[i] + ': ' + seff.f[ek[i]].na + ' <a href="#system">back to top</a>'
			l.id = 'e_eff_' + ek[i];
			dv.apc(l);
		}
	}
	newRecipe() {
		let newR = gei('newRecipe');
		this.noSwitch();
		gei('creater').disabled = true;
		gei('createa').disabled = true;
		let canclebutton = dcr('button');
		canclebutton.innerHTML = 'close';
		canclebutton.onclick = () => {
			this.yeSwitch();
			gei('creater').disabled = false;
			gei('createa').disabled = false;
			newR.innerHTML = '';
		}
		newR.apc(canclebutton);
		newR.apc(dcr('br'));
		let recipeString = dcr('input');
		newR.apc(recipeString);
		let okbutton = dcr('button');
		okbutton.innerHTML = 'ok';
		let example = dcr('details');
//		example.innerHTML = `<summary>example</summary><pre>{"id":"0","N":"neutralizer","type":"0","cat":"23","effect":"1#0;27+2+0# 4;27+20+0 # 8;27+19+0! 4 # 0;-1+0+0 # 5;0+1+0 # 10;0+2+0 ! 1 # 0;-1+0+0 # 5;6+1+0# 10;6+2+0","metal":"1","water":"2","wood":"1","fire":"0","earth":"0","receipt":"1; (19); 1; (20); 2; (2)","atkdefbase":"0;0;0;0;0;0","lv":"1","price":"30","used":"0","damage":"0","heal":"0"}
//{"id":"5","N":"water","type":"0","cat":"2; 24","metal":"0","water":"2","wood":"0","fire":"0","earth":"0","receipt":"0; -1","atkdefbase":"0;0;0;0;0;0","lv":"1","price":"2","used":"0","damage":"0","heal":"0"}
//refer to <a href="#help">help page</a> for more examples.</pre>`;
		example.innerHTML = '<summary>example</summary>refer to <a href="#help">help page</a> for more examples.</pre>'
		newR.apc(example);
		newR.apc(okbutton);
		okbutton.onclick = () => {
			try {
				litem(recipeString.value);
			} catch (error) {
				alert('create recipe failed' + error);
			}
			this.ency();
		}
	}
};

let ui = new sUi();