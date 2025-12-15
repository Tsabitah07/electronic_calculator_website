import "./Result.css";

export default function SummaryData({ data }) {
    const { totals, results } = data;

    return (
        <div className="summary-wrapper">
            <div className="summary-container">
                <div className="summary-title">Summary Data</div>

                <div className="status-box">
                    {totals.total_max_kwh <= 2000
                        ? "Selamat Rumah Anda Sudah Termasuk Hemat Energi"
                        : "Pemakaian Listrik Anda Cukup Tinggi"}
                </div>

                <div className="data-box">
                    <div className="data-row">
                        <span className="label">Total Pemakaian</span>
                        <span className="value">
                            {totals.total_min_kwh} -{" "}
                            {totals.total_max_kwh} kWh
                        </span>
                    </div>

                    <div className="data-row">
                        <span className="label">
                            Perkiraan Biaya / Bulan
                        </span>
                        <span className="value">
                            Rp{" "}
                            {totals.total_min_cost.toLocaleString()} - Rp{" "}
                            {totals.total_max_cost.toLocaleString()}
                        </span>
                    </div>
                </div>

                <br />

                <div className="data-box">
                    {results.map((r, i) => (
                        <div className="data-row" key={i}>
                            <span className="label">
                                {r.electronic_name} ({r.electronic_type})
                            </span>
                            <span className="value">
                                Rp{" "}
                                {r.min_cost.toLocaleString()} - Rp{" "}
                                {r.max_cost.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
