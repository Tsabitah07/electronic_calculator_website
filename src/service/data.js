import { useState, useEffect } from "react";

export default function useCalculatorLogic() {
    const [jenisRumah, setJenisRumah] = useState("");
    const [daftarRumah, setDaftarRumah] = useState([]);

    const [electronicName, setElectronicName] = useState([]);
    const [electronicData, setElectronicData] = useState([]);

    const [items, setItems] = useState([
        {
            alat_id: "",
            jumlah: 1,
            waktu: 1,
            type_id: "",
            types: [],
        },
    ]);

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // FETCH ELECTRONIC NAME + DATA
    useEffect(() => {
        fetch("https://electronic-calculator-api.vercel.app/electronic-name")
            .then((r) => r.json())
            .then((j) => setElectronicName(j.data || []));

        fetch("https://electronic-calculator-api.vercel.app/electronic-data")
            .then((r) => r.json())
            .then((j) => setElectronicData(j.data || []));
    }, []);

    // FETCH RUMAH
    useEffect(() => {
        fetch("https://electronic-calculator-api.vercel.app/electricity")
            .then((r) => r.json())
            .then((j) => setDaftarRumah(j.data || []));
    }, []);

    const handleRumah = (e) => {
        setJenisRumah(e.target.value);
    };

    const updateAlat = (index, alatId) => {
        const newItems = [...items];
        const filteredTypes = electronicData.filter(
            (d) => d.name_id == alatId
        );

        newItems[index] = {
            ...newItems[index],
            alat_id: alatId,
            type_id: "",
            types: filteredTypes,
        };

        setItems(newItems);
    };

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
                alat_id: "",
                jumlah: 1,
                waktu: 1,
                type_id: "",
                types: [],
            },
        ]);
    };

    const hitungTotal = async () => {
        if (!jenisRumah) return alert("Pilih jenis rumah dulu");

        setLoading(true);

        const payload = {
            items: items.map((item) => ({
                electricity_id: Number(jenisRumah),
                electronic_name_id: Number(item.alat_id),
                electronic_data_id: Number(item.type_id),
                devices_used: Number(item.jumlah),
                hours_used: Number(item.waktu),
            })),
        };

        try {
            const res = await fetch(
                "https://electronic-calculator-api.vercel.app/calculator/bulk",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const json = await res.json();
            setResult(json);
        } catch (e) {
            alert("Gagal menghitung");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        jenisRumah,
        daftarRumah,
        electronicName,
        items,
        result,
        loading,
        handleRumah,
        updateAlat,
        updateType,
        updateValue,
        tambahItem,
        hitungTotal,
    };
}
