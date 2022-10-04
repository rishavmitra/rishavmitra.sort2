let arr=[];
const def = "#2b5799", chng = "red", finished = "#8ef511", selected = "yellow";

window.onload=setup();


async function setup(){
    let b = document.getElementById("bars");
    let d = document.getElementById("delay");

    document.getElementById("b").innerHTML=b.value+" bars";
    document.getElementById("d").innerHTML=d.value+"ms";

	if(arr.length!=b.value) //if statement is used so that the slider does not mess up an already created array
	{
		create_arr(parseInt(b.value));
	}
}

function create_arr(n = -1) {
	arr = [];
	let container = document.getElementById("container");
	n = n < 0 ? Math.random() * 20 : n;
	for (let i = 0; i < n; i++) {
		let rad = Math.floor(2+Math.random()*90);
		arr.push('<div class="bar" id="' + i + '" style="height:' + rad + '%;width:'+ 0.6 +'vw;"></div>');
	}
	container.innerHTML = arr.join('');
}

function reset(){
	location.reload();
}

function start()
{
	let select = document.getElementsByClassName("sorts")[0];

	const algorithm=Object.freeze({
		1:Selectionsort,
        2:Bubble,
		3:Insertionsort,
		4:Mergesort,
		5:Quicksort
	});

	algorithm[(select.value)]();
}

function Finished_Sorting() {
	let x = document.getElementsByClassName("bar");
	for (let i = 0; i < x.length; i++)
		x[i].style.backgroundColor = finished;
	x = document.getElementsByTagName("input");
	let y = document.getElementsByTagName("select");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = false;
	for(let i=0;i<y.length;i++)
		y[i].disabled=false;

}

function Sleep(ms){
	return new Promise(resolve=>setTimeout(resolve,ms));
}

function Disable_input(){
	let x = document.getElementsByTagName("input");
	let y = document.getElementsByTagName("select");
	for(let i=0;i<x.length;i++)
		x[i].disabled=true;
	for(let i=0;i<y.length;i++)
		y[i].disabled=true;
	return parseInt(document.getElementById("delay").value);
}

async function Selectionsort() {
	let video = document.getElementById("back-video");
	if(video.paused){
		video.loop = true;
		video.play();
	}
	document.getElementById('btext').innerHTML=' O(n<sup>2</sup>)';
	document.getElementById('atext').innerHTML=' O(n<sup>2</sup>)';
	document.getElementById('wtext').innerHTML=' O(n<sup>2</sup>)';
	let delay = Disable_input();

	let container = document.getElementById("container");
	for (let i = 0; i < arr.length; i++) {
		let mn_ind = i;
		let curr_id = arr[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		for (let j = i + 1; j < arr.length; j++) {
			let nxt_ele = arr[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			let a = parseInt(arr[mn_ind].split('height:')[1].split('%,')[0]);
			let b = parseInt(arr[j].split('height:')[1].split('%,')[0]);
			if (a > b) mn_ind = j;
			await Sleep(delay / 5.0);
			// document.getElementById(nxt_ele).style.backgroundColor = def;
		}

		let nxt_ele = arr[mn_ind].split('id="')[1].split('"')[0];
		document.getElementById(nxt_ele).style.backgroundColor = selected;
		await Sleep(2 * delay / 5.0);

		let tmp = arr[mn_ind];
		arr[mn_ind] = arr[i];
		arr[i] = tmp;

		container.innerHTML = arr.join('');
		await Sleep(2 * delay / 5.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	if(video.play){
		video.loop = false;
		video.pause();
	}
	Finished_Sorting();
}

async function Bubble(){
	let video = document.getElementById("back-video");
	if(video.paused){
		video.loop = true;
		video.play();
	}
	document.getElementById('btext').innerHTML=' O(n)';
	document.getElementById('atext').innerHTML=' O(n<sup>2</sup>)';
	document.getElementById('wtext').innerHTML=' O(n<sup>2</sup>)';
	let delay = Disable_input();
	// console.log(delay);
	let container = document.getElementById("container");

	for (let i = 0; i < arr.length - 1; i++) {
		let has_swap = false;
		for (let j = 0; j < arr.length - i - 1; j++) {
			let curr_id = arr[j].split('id="')[1].split('"')[0];
			let nxt_ele = arr[j + 1].split('id="')[1].split('"')[0];

			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;

			await Sleep(delay/2);

			let a = parseInt(arr[j].split('height:')[1].split('%,')[0]);
			// console.log(a);
			let b = parseInt(arr[j + 1].split('height:')[1].split('%,')[0]);
			if (a > b) {
				has_swap = true;

				let t = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = t;

				container.innerHTML = arr.join('');
			}
			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay/2);
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if (has_swap == false) break;
	}
	if(video.play){
		video.loop = false;
		video.pause();
	}
	Finished_Sorting();
}

async function Insertionsort(){
	let video = document.getElementById("back-video");
	if(video.paused){
		video.loop = true;
		video.play();
	}
	document.getElementById('btext').innerHTML=' O(n)';
	document.getElementById('atext').innerHTML=' O(n<sup>2</sup>)';
	document.getElementById('wtext').innerHTML=' O(n<sup>2</sup>)';
	let delay = Disable_input();
	let container = document.getElementById("container");
	for (let i = 1; i < arr.length; i++) {
		let j = i - 1;
		let key = arr[i];
		let curr_id = key.split('id="')[1].split('"')[0];
		let nxt_ele = arr[j].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;

		while (j >= 0 && parseInt(arr[j].split('height:')[1].split('%,')[0]) > parseInt(key.split('height:')[1].split('%,')[0])) {
			document.getElementById(nxt_ele).style.backgroundColor = def;
			nxt_ele = arr[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay);
			arr[j + 1] = arr[j];
			j--;
		}

		arr[j + 1] = key;
		container.innerHTML = arr.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		await Sleep(delay * 3.0 / 5);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	if(video.play){
		video.loop = false;
		video.pause();
	}
	Finished_Sorting();
}
//Mergesort
function Slide_down(l, r) {
	let temp = arr[r];
	for (let i = r - 1; i >= l; i--) {
		arr[i + 1] = arr[i];
	}
	arr[l] = temp;
}

async function merge(l, m, r, d) {
	let i = l;
	let j = m + 1;

	while (i < j && j <= r) {
		let curr_id = arr[j].split('id="')[1].split('"')[0];
		let nxt_ele = arr[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		let a = parseInt(arr[j].split('height:')[1].split('%,')[0]);
		let b = parseInt(arr[i].split('height:')[1].split('%,')[0]);

		if (a > b) i++;
		else {
			Slide_down(i, j);
			i++; j++;
		}
		await Sleep(d / 2.0);
		container.innerHTML = arr.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
	
		await Sleep(d / 2.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
}

async function mergeSort(l, r, d) {
	if (l < r) {
		let m = parseInt(l + (r - l) / 2);
		await mergeSort(l, m, d);
		await mergeSort(m + 1, r, d);
		await merge(l, m, r, d);
	}
}

async function Mergesort(){
	let video = document.getElementById("back-video");
	if(video.paused){
		video.loop = true;
		video.play();
	}
	document.getElementById('btext').innerHTML=' O(nlog(n))';
	document.getElementById('atext').innerHTML=' O(nlog(n))';
	document.getElementById('wtext').innerHTML=' O(nlog(n))';
	let delay = Disable_input();
	await mergeSort(0, arr.length - 1, delay);
	if(video.play){
		video.loop = false;
		video.pause();
	}
	Finished_Sorting();
}

//Quicksort
async function Partition(l, r, d) {
	let i = l - 1;
	let j = l;
	let id = arr[r].split('id="')[1].split('"')[0];
	document.getElementById(id).style.backgroundColor = selected;
	for (j = l; j < r; j++) {
		let a = parseInt(arr[j].split('height:')[1].split('%,')[0]);
		let b = parseInt(arr[r].split('height:')[1].split('%,')[0]);
		if (a < b) {
			i++;
			let curr_id = arr[i].split('id="')[1].split('"')[0];
			let nxt_ele = arr[j].split('id="')[1].split('"')[0];
			document.getElementById(curr_id).style.backgroundColor = chng;
			document.getElementById(nxt_ele).style.backgroundColor = chng;

			let temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;

			await Sleep(d / 3.0);
			container.innerHTML = arr.join('');
			document.getElementById(curr_id).style.backgroundColor = chng;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			document.getElementById(id).style.backgroundColor = selected;
		
			await Sleep(d / 3.0)
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
	}

	let temp = arr[i + 1];
	arr[i + 1] = arr[r];
	arr[r] = temp;

	container.innerHTML = arr.join(' ');
	document.getElementById(id).style.backgroundColor = selected;
	await Sleep(d / 3.0);
	document.getElementById(id).style.backgroundColor = def;
	return i + 1;
}

async function quickSort(l, r, d) {
	if (l < r) {
		let p = await Partition(l, r, d);
		await quickSort(l, p - 1, d);
		await quickSort(p + 1, r, d);
	}
}

async function Quicksort(){
	let video = document.getElementById("back-video");
	if(video.paused){
		video.loop = true;
		video.play();
	}
	document.getElementById('btext').innerHTML=' O(nlog(n))';
	document.getElementById('atext').innerHTML=' O(nlog(n))';
	document.getElementById('wtext').innerHTML=' O(n<sup>2</sup>)';
	let delay = Disable_input();
	await quickSort(0, arr.length - 1, delay);
	if(video.play){
		video.loop = false;
		video.pause();
	}
	Finished_Sorting();
}