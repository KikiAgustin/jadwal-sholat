const getDate = new Date();
const year = getDate.getFullYear();
const month = getDate.getMonth() + 1;
const day = getDate.getDate();

function hari(){
    if(day < 10)
    hari = `0${day}`;
    hari = day;
    return hari;
}

function bulan(){
    if(month < 10){
        bulan = `0${month}`;
    } else {
        bulan = month;
    }
    return bulan;
}

const tanggal = `${year}-${bulan()}-${hari()}`;

let namaKota = localStorage.idkota;
function cekKota(){
    if(!namaKota){
        cekKota = 667;
    } else {
        cekKota = namaKota;
    }
    return cekKota;
}



function getJadwalDay(){
    fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + cekKota() + '/tanggal/' + tanggal)
        .then(response => response.json())
        .then(data => {
            const jadwal = data.jadwal.data;
            dataJadwal(jadwal);
            getKota();
            getNamaKota();  
        });
}

function dataJadwal(jadwal){
    document.querySelector('.imsak').textContent = jadwal.imsak;
    document.querySelector('.subuh').textContent = jadwal.subuh;
    document.querySelector('.terbit').textContent = jadwal.terbit;
    document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
    document.querySelector('.ashar').textContent = jadwal.ashar;
    document.querySelector('.maghrib').textContent = jadwal.maghrib;
    document.querySelector('.isya').textContent = jadwal.isya;
    document.querySelector('.tanggal').textContent = jadwal.tanggal;
}



function getKota(){
    fetch('https://api.banghasan.com/sholat/format/json/kota')
        .then(response => response.json())
        .then(response => {
            const kota = response.kota;
            let likota = ``;
            kota.forEach( k => {
                likota += `<li><a class="dropdown-item" id="nama-kota" data-idkota="${k.id}" href="#">${k.nama}</a></li>`;
            });
            const listKota = document.querySelector('#list-kota');
            listKota.innerHTML = likota;

            const namaKota = document.querySelectorAll('#nama-kota');
            namaKota.forEach( ko => {
                ko.addEventListener('click', function(){
                    const idkota = this.dataset.idkota;
                    const namaKota = this.textContent;
                    window.localStorage.setItem('idkota', idkota);
                    window.localStorage.setItem('namakota', namaKota);
                    document.querySelector('#judul-kota').textContent = localStorage.namakota;
                    alert(`Kota ${namaKota} berhasil dipilih`);
                });
            });


        } );
}



getJadwalDay();


