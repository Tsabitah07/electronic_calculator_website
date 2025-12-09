// src/views/calculator/Calculator.jsx
import useCalculatorLogic from "../../service/electricity.js";

export default function Views() {
    const {
        jenisRumah,
        daftarRumah,
        electronicName,
        items,
        handleRumah,
        updateAlat,
        updateType,
        updateValue,
        tambahItem
    } = useCalculatorLogic();

    return (
        <div className="container">
            <div className="kalkulator">
                {/* Rumah */}
                <div className="item-row">
                    <label>Jenis Rumah</label>
                    <select value={jenisRumah} onChange={handleRumah}>
                        <option value="">-- Pilih Rumah --</option>
                        {daftarRumah.map((rumah) => (
                            <option key={rumah.id} value={rumah.id}>
                                {rumah.name} - {rumah.kwh_watt} VA
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loop item */}
                {items.map((item, i) => (
                    <div className="item-row" key={i}>
                        {/* Alat */}
                        <label>Alat</label>
                        <select
                            value={item.alat_id}
                            onChange={(e) => updateAlat(i, e.target.value)}
                        >
                            <option value="">-- Pilih --</option>
                            {electronicName.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>

                        {/* Jumlah */}
                        <label>Jumlah</label>
                        <input
                            type="number"
                            min="1"
                            value={item.jumlah}
                            onChange={(e) =>
                                updateValue(i, "jumlah", e.target.value)
                            }
                        />

                        {/* Waktu */}
                        <label>Waktu</label>
                        <input
                            type="number"
                            min="1"
                            value={item.waktu}
                            onChange={(e) =>
                                updateValue(i, "waktu", e.target.value)
                            }
                        />

                        {/* Type berdasarkan API */}
                        <label>Tipe</label>
                        <select
                            value={item.type_id}
                            onChange={(e) => updateType(i, e.target.value)}
                        >
                            <option value="">-- Pilih Tipe --</option>
                            {item.types.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.type}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <button className="btn" onClick={tambahItem}>
                    + Tambah Item
                </button>
            </div>

            <div className="center">
                <button className="btn">Hitung Total</button>
            </div>
        </div>
    );
}
