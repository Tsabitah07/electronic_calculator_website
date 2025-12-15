import useCalculatorLogic from "../../service/data";
import SummaryData from "../result/Result";
import "./Calculator.css";

export default function Calculator() {
    const {
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
    } = useCalculatorLogic();

    return (
        <div className="container">
            <div className="kalkulator">
                <div className="item-row">
                    <label>Jenis Rumah</label>
                    <select value={jenisRumah} onChange={handleRumah}>
                        <option value="">-- Pilih Rumah --</option>
                        {daftarRumah.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name} - {r.kwh_watt} VA
                            </option>
                        ))}
                    </select>
                </div>

                {items.map((item, i) => (
                    <div className="item-row" key={i}>
                        <label>Alat</label>
                        <select
                            value={item.alat_id}
                            onChange={(e) =>
                                updateAlat(i, e.target.value)
                            }
                        >
                            <option value="">-- Pilih --</option>
                            {electronicName.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>

                        <label>Jumlah</label>
                        <input
                            type="number"
                            min="1"
                            value={item.jumlah}
                            onChange={(e) =>
                                updateValue(i, "jumlah", e.target.value)
                            }
                        />

                        <label>Waktu (jam)</label>
                        <input
                            type="number"
                            min="1"
                            value={item.waktu}
                            onChange={(e) =>
                                updateValue(i, "waktu", e.target.value)
                            }
                        />

                        <label>Tipe</label>
                        <select
                            value={item.type_id}
                            onChange={(e) =>
                                updateType(i, e.target.value)
                            }
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
                <button className="btn" onClick={hitungTotal}>
                    {loading ? "Menghitung..." : "Hitung Total"}
                </button>
            </div>

            {result && <SummaryData data={result} />}
        </div>
    );
}
