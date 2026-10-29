import React from 'react'
import CardMahasiawa from './CardMahasisawa';

function DaftarMahasiswa() {
    const mahasiswa = [
        {id : 1, nama: "Steven", nim: "00068"},
        {id : 1, nama: "Taufik", nim: "00067"},
        {id : 1, nama: "fajar", nim: "00066"},
    ];

    return(
        <div>
            {mahasiswa.map((mhs)=>(
                <CardMahasiawa key={mhs.id}  nama={mhs.nama} nim={mhs.nim}/>
            ))}
        </div>
    );
    
}