// src/service/electricity.js
import { useState, useEffect } from "react";

export default function useCalculatorLogic() {
    const [jenisRumah, setJenisRumah] = useState("");
    const [daftarRumah, setDaftarRumah] = useState([]);

    const [electronicName, setElectronicName] = useState([]); // dari /electronic-name
    const [electronicData, setElectronicData] = useState([]); // dari /electronic-data

    const [items, setItems] = useState([
        {
            alat: "",
            alat_id: "",
            jumlah: 1,
            waktu: 1,
            type_id: "",
            types: [], // list data hasil filter
        }
    ]);

    // Fetch electronic-name + electronic-data
    useEffect(() => {
        fetch("https://electronic-calculator-api.vercel.app/electronic-name")
            .then((r) => r.json())
            .then((j) => setElectronicName(j.data || []));

        fetch("https://electronic-calculator-api.vercel.app/electronic-data")
            .then((r) => r.json())
            .then((j) => setElectronicData(j.data || []));
    }, []);

    // Fetch rumah (existing)
    useEffect(() => {
        fetch("https://electronic-calculator-api.vercel.app/electricity")
            .then((res) => res.json())
            .then((json) => setDaftarRumah(json.data || []))
            .catch((err) => console.error("Gagal fetch:", err));
    }, []);

    const handleRumah = (e) => {
        setJenisRumah(e.target.value);
    };

    // Update alat (electronic-name)
    const updateAlat = (index, alatId) => {
        const newItems = [...items];

        // filter type berdasarkan name_id
        const filteredTypes = electronicData.filter((d) => d.name_id == alatId);

        newItems[index] = {
            ...newItems[index],
            alat_id: alatId,
            type_id: "",
            types: filteredTypes,
        };

        setItems(newItems);
    };

    // Update type (electronic-data)
    const updateType = (index, typeId) => {
        const newItems = [...items];
        newItems[index].type_id = typeId;
        setItems(newItems);
    };

    const updateValue = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setItems(newItems);
    };

    const tambahItem = () => {
        setItems([
            ...items,
            {
                alat: "",
                alat_id: "",
                jumlah: 1,
                waktu: 1,
                type_id: "",
                types: [],
            }
        ]);
    };

    return {
        jenisRumah,
        daftarRumah,
        electronicName,
        items,
        handleRumah,
        updateAlat,
        updateType,
        updateValue,
        tambahItem,
    };
}
