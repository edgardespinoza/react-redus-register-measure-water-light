import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../config/store";
import { LightMeasurement } from "../../model/lightMeasurement";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import useMeasurements from "../hooks/useMeasurements";

const Home = () => {
  const navigate = useNavigate();

  const showFilters = useSelector(
    (state: RootState) => state.filter.showFilters
  );

  const [yearFilter, setYearFilter] = useState<number | "">(
    new Date().getFullYear()
  );
  const [monthFilter, setMonthFilter] = useState<number | "">(
    new Date().getMonth() + 1
  );

  const { totalMeasurement, loading, error } = useMeasurements(
    yearFilter as number,
    monthFilter as number
  );

  const handleMeasurementClick = (measurement: LightMeasurement) => {
    navigate("/measure", { state: { measurement } });
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters */}
      <div className={`${showFilters ? "block sm:block" : "hidden"} mt-4 mb-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Año */}
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              📅 Año
            </label>
            <select
              id="year"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          {/* Mes */}
          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              🗓️ Mes
            </label>
            <select
              id="month"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              value={monthFilter}
              onChange={(e) =>
                setMonthFilter(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
        </div>
      </div>
      {/* Lista de mediciones */}
      {error ? (
        <ErrorMessage message={error} />
      ) : totalMeasurement?.measurements.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Totales Generales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              {/* Grupo de Agua */}
              <div className="flex flex-col space-y-2">
                <p>
                  💧 Agua Consumida:{" "}
                  <strong>
                    {totalMeasurement?.totalWaterConsumption.toFixed(2)} m³
                  </strong>
                </p>
                <p>
                  💰 Pago Total Agua:{" "}
                  <strong>
                    S/ {totalMeasurement?.totalWaterPayment.toFixed(2)}
                  </strong>
                </p>
              </div>

              {/* Grupo de Luz */}
              <div className="flex flex-col space-y-2 sm:text-right">
                <p>
                  💡 Luz Consumida:{" "}
                  <strong>
                    {totalMeasurement?.totalLightConsumption.toFixed(2)} kWh
                  </strong>
                </p>
                <p>
                  ⚡ Pago Total Luz:{" "}
                  <strong>
                    S/ {totalMeasurement?.totalLightPayment.toFixed(2)}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <ul role="list" className="divide-y divide-gray-200">
            {totalMeasurement?.measurements?.map((measurement, index) => (
              <li
                key={index}
                onClick={() => handleMeasurementClick(measurement)}
                className="py-5 border rounded-lg p-4 shadow-sm bg-white mb-4"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {measurement?.room?.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
                  {/* Columna 1: Agua */}
                  <div className="space-y-2">
                    <p>
                      💧 Agua: {measurement?.meterWaterCurrent} m³ (Antes:{" "}
                      {measurement.meterWaterBefore} m³)
                    </p>
                    <p>
                      💰 Pago Agua: S/ {measurement.paymentWater?.toFixed(2)}
                    </p>
                  </div>

                  {/* Columna 2: Luz */}
                  <div className="space-y-2 sm:text-right">
                    <p>
                      💡 Luz: {measurement.meterLightCurrent} kWh (Antes:{" "}
                      {measurement.meterLightBefore} kWh)
                    </p>
                    <p>
                      ⚡ Pago Luz: S/ {measurement?.paymentLight?.toFixed(2)}
                    </p>
                  </div>

                  {/* Campo de Alquiler */}
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <p>🏠 Alquiler: S/ {measurement.rent.toFixed(2)}</p>
                  </div>

                  {/* Total en una fila completa */}
                  <p className="col-span-1 sm:col-span-2 font-bold text-gray-900 text-center">
                    Total: S/ {measurement?.totalPayment?.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
