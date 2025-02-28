import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import useMeasurements from "../hooks/useMeasurements";

const Home = () => {
  const showFilters = useSelector(
    (state: RootState) => state.filter.showFilters
  );

  const [yearFilter, setYearFilter] = useState<number | "">(2024);
  const [monthFilter, setMonthFilter] = useState<number | "">(1);
  const [roomFilter, setRoomFilter] = useState<string>("");
  const [localFilter, setLocalFilter] = useState<string>("HUAROCHIRI");

  const { measurements, loading, error } = useMeasurements(
    localFilter,
    yearFilter as number,
    monthFilter as number
  );

  const filteredMeasurements = measurements.filter((measurement) => {
    return (
      (yearFilter === "" || measurement.year === yearFilter) &&
      (monthFilter === "" || measurement.month === monthFilter) &&
      (roomFilter === "" || measurement.room === roomFilter) &&
      (localFilter === "" || measurement.local === localFilter)
    );
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (measurements.length === 0) return <EmptyState />;

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
              <option value="2023">2024</option>
              <option value="2022">2023</option>
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

          {/* Habitación */}
          <div>
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              🏠 Habitación
            </label>
            <select
              id="room"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
            >
              <option value="Sala">Sala</option>
              <option value="Cocina">Cocina</option>
              <option value="Dormitorio">Dormitorio</option>
              <option value="Baño">Baño</option>
            </select>
          </div>

          {/* Local */}
          <div>
            <label
              htmlFor="local"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              🏢 Local
            </label>
            <select
              id="local"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              value={localFilter}
              onChange={(e) => setLocalFilter(e.target.value)}
            >
              <option value="HUAROCHIRI">HUAROCHIRI</option>
              <option value="Local B">Local B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de mediciones */}
      <ul role="list" className="divide-y divide-gray-200">
        {filteredMeasurements.map((measurement, index) => (
          <li
            key={index}
            className="py-5 border rounded-lg p-4 shadow-sm bg-white mb-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {measurement.room} - {measurement.local}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
              {/* Columna 1: Agua */}
              <div className="space-y-2">
                <p>
                  💧 Agua: {measurement?.meterWaterCurrent} m³ (Antes:{" "}
                  {measurement.meterWaterBefore} m³)
                </p>
                <p>💰 Pago Agua: ${measurement.paymentWater?.toFixed(2)}</p>
              </div>

              {/* Columna 2: Luz */}
              <div className="space-y-2 sm:text-right">
                <p>
                  💡 Luz: {measurement.meterLightCurrent} kWh (Antes:{" "}
                  {measurement.meterLightBefore} kWh)
                </p>
                <p>⚡ Pago Luz: ${measurement.paymentLight?.toFixed(2)}</p>
              </div>

              {/* Campo de Alquiler */}
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <p>🏠 Alquiler: ${measurement.rent.toFixed(2)}</p>
              </div>

              {/* Total en una fila completa */}
              <p className="col-span-1 sm:col-span-2 font-bold text-gray-900 text-center">
                Total: ${measurement.totalPayment?.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
