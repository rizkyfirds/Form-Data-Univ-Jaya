import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios"
import { SlTrash} from "react-icons/sl";
import { VscEdit } from "react-icons/vsc";
import {IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";

function Home() {
    const [listStudents, setStudents] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalUnggah, setModalUnggah] = useState(false);
    const [idEdit, setId] = useState(0);

    const openModalUnggah = () => {
        setModalUnggah(true);
    };

    const closeModalUnggah = () => {
        setModalUnggah(false);
    };

    const openModal = (ID) => {
        setId(ID);
        setModalOpen(true);
    };

    const closeModal = (ID) => {
        setId(0);
        setModalOpen(false);
    };

    const [Name, setName] = useState("")

    const handleName = (inputName) => {
        setName(inputName);
    }

    const [dataBaruName, setdataBaruName] = useState("")

    const handledataBaruName = (inputdataBaruName) => {
        setdataBaruName(inputdataBaruName);
    }
    const [dataBaruNIM, setNIM] = useState("")

    const handleNIM = (inputNIM) => {
        setNIM(inputNIM);
    }
    const [dataBaruJurusan, setJurusan] = useState("")

    const handleJurusan = (inputJurusan) => {
        setJurusan(inputJurusan);
    }

    const addStudents = () => {
        const requestingData = {
            jurusan: dataBaruJurusan,
            name : dataBaruName,
            nim: dataBaruNIM
        }
        axios({
            method: "POST",
            url: "http://localhost:8888/students",
            data: requestingData
        }).then((result) => {
            setTimeout(() => {
                window.location.reload();
            }, 300);
        })
        setModalUnggah(false);
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8888/students"
        }).then((result) => {
            setStudents(result.data.students)
        })
    }, [])

    const deleteStudents = (ID) => {
        const requestingData = {
            id: ID
        }
        axios({
            method: "DELETE",
            url: `http://localhost:8888/students/${ID}`,
            data: requestingData
        }).then((result) => {
            setTimeout(() => {
                window.location.reload();
            }, 300);
        })
    }

    const editStudents = (ID) => {
        const requestingData = {
            id: ID,
            name: Name
        }
        axios({
            method: "PUT",
            url: `http://localhost:8888/students/${ID}`,
            data: requestingData
        }).then((result) => {
            setTimeout(() => {
                window.location.reload();
            }, 300);
        })
        setId(0);
        setModalOpen(false);
    }

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = listStudents.slice(startIndex, endIndex);

    return (
        <div className="h-screen bg-[#FF6969] ">
            <div className="h-1/6 py-12">
                <p className="text-center text-3xl font-bold text-[#FFF5E0] font-serif">
                    Data Mahasiswa Universitas Jaya
                </p>
            </div>
            <div className="h-4/6 py-4">
                <div className="mx-auto h-full min-w-fit w-3/4 bg-[#FFF5E0] rounded-lg">
                    <div className="grid grid-cols-8 grid-rows-1 gap-2 text-[#FFF5E0] rounded-t-lg bg-[#141E46]">
                        <div className="font-bold text-sm text-center m-2">ID</div>
                        <div className="font-bold text-sm text-center m-2">NIM</div>
                        <div className="col-span-2 font-bold text-sm text-center m-2">Nama</div>
                        <div className="col-span-2 font-bold text-sm text-center m-2">Jurusan</div>
                        <div className="font-bold text-sm text-center m-2">Hapus</div>
                        <div className="font-bold text-sm text-center m-2">Edit</div>
                    </div>
                    <div className="overflow-auto">
                        <div>
                            {currentItems.map(i => (
                                <div key={i.ID} className="grid grid-cols-8 gap-2 text-center text-[#BB2525]">
                                    <div className="font-bold text-sm text-center m-2">{i.ID}</div>
                                    <div className="font-bold text-sm text-center m-2">{i.Nim}</div>
                                    <div className="col-span-2 font-bold text-sm text-center m-2">{i.Name}</div>
                                    <div className="col-span-2 font-bold text-sm text-center m-2">{i.Jurusan}</div>
                                    <button onClick={() => deleteStudents(i.ID)}>
                                        <SlTrash className='m-auto hover:bg-[#9A3B3B]/80 rounded-lg h-2/3 hover:text-white' />
                                    </button>
                                    <button className='' onClick={() => openModal(i.ID)}>
                                        <VscEdit className='m-auto hover:bg-[#C08261] rounded-lg h-2/3 hover:text-white' />
                                    </button>
                                    {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                                            <div className="w-1/3 h-1/3 bg-white m-auto rounded shadow-lg">
                                                <div className="h-1/3 text-lg">
                                                    <div className="flex justify-end mr-2 mt-2">
                                                        <button onClick={() => closeModal()}>
                                                            <TfiClose className="text-xl text-red-700" />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <h2 className="m-auto text-3xl font-bold mb-4 font-serif text-red-700">Edit Nama</h2>
                                                    </div>
                                                </div>
                                                <div className="flex h-1/3">
                                                    <input type="text" className="w-2/3 h-1/3 bg-[#FF6969] m-auto text-center rounded-xl text-[#FFF5E0]" placeholder="Nama Baru" required onChange={(event) => handleName(event.target.value)} />
                                                </div>
                                                <div className="h-1/3">
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                        onClick={() => editStudents(i.ID)}
                                                    >
                                                        ubah
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="mt-4 flex justify-center mx-auto">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="mr-2 w-4 h-4 text-[#C08261] hover:bg-[#9A3B3B] rounded-full hover:text-white"
                                >
                                    <IoArrowBackCircleOutline />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={endIndex >= listStudents.length}
                                    className="ml-2 w-4 h-4 text-[#C08261] hover:bg-[#9A3B3B] rounded-full hover:text-white"
                                >
                                    <IoArrowForwardCircleOutline />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-1/6'>
                <div className='m-auto h-1/2 w-1/4 rounded-lg '>
                    <button className='font-bold text-sm text-center bg-[#141E46] rounded-full text-[#FFF5E0] w-full hover:bg-green-600' onClick={() => openModalUnggah()}>Unggah Data</button>
                    {isModalUnggah && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                            <div className="w-1/3 h-3/5 bg-white m-auto rounded shadow-lg">
                                <div className="h-1/4 text-lg">
                                    <div className="flex justify-end mr-2 mt-2">
                                        <button onClick={() => closeModalUnggah()}>
                                            <TfiClose className="text-xl text-red-700" />
                                        </button>
                                    </div>
                                    <div className="flex w-full">
                                        <h2 className="m-auto text-3xl font-bold mb-4 font-serif text-red-700">Unggah Data Baru</h2>
                                    </div>
                                </div>
                                <div className="h-2/4">
                                    <div className="h-full grid grid-rows-3 gap-4 p-4">
                                        <input type="text" className="mx-auto w-2/3 h-2/3 bg-[#FF6969] text-center rounded-xl text-[#FFF5E0]" placeholder="Nama" required onChange={(event) => handledataBaruName(event.target.value)} />
                                        <input type="text" className="mx-auto w-2/3 h-2/3 bg-[#FF6969] text-center rounded-xl text-[#FFF5E0]" placeholder="NIM" required onChange={(event) => handleNIM(event.target.value)} />
                                        <input type="text" className="mx-auto w-2/3 h-2/3 bg-[#FF6969] text-center rounded-xl text-[#FFF5E0]" placeholder="Jurusan" required onChange={(event) => handleJurusan(event.target.value)} />
                                    </div>
                                </div>
                                <div className="flex h-1/4">
                                    <button
                                        className="m-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={() => addStudents()}
                                    >
                                        ubah
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Home;