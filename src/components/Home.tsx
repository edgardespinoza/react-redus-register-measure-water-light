import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";

interface LightMeasurement {
  room: string;
  meterWaterCurrent: number;
  meterWaterBefore: number;
  paymentWater: number;
  meterLightCurrent: number;
  meterLightBefore: number;
  paymentLight: number;
  totalPayment: number;
  year: number;
  month: number;
  rent: number;
}

const measurements: LightMeasurement[] = [
  {
    room: "Sala",
    meterWaterCurrent: 1050,
    meterWaterBefore: 1000,
    paymentWater: 15.5,
    meterLightCurrent: 200,
    meterLightBefore: 180,
    paymentLight: 12.3,
    totalPayment: 27.8,
    year: 2023,
    month: 10,
    rent: 300,
  },
  {
    room: "Cocina",
    meterWaterCurrent: 980,
    meterWaterBefore: 950,
    paymentWater: 12.0,
    meterLightCurrent: 150,
    meterLightBefore: 130,
    paymentLight: 10.5,
    totalPayment: 22.5,
    year: 2023,
    month: 10,
    rent: 300,
  },
  {
    room: "Dormitorio",
    meterWaterCurrent: 870,
    meterWaterBefore: 850,
    paymentWater: 9.8,
    meterLightCurrent: 90,
    meterLightBefore: 80,
    paymentLight: 8.2,
    totalPayment: 18.0,
    year: 2023,
    month: 9,
    rent: 300,
  },
  {
    room: "Baño",
    meterWaterCurrent: 500,
    meterWaterBefore: 470,
    paymentWater: 6.5,
    meterLightCurrent: 70,
    meterLightBefore: 60,
    paymentLight: 5.8,
    totalPayment: 12.3,
    year: 2023,
    month: 9,
    rent: 300,
  },
];

const Home = () => {
  const showFilters = useSelector(
    (state: RootState) => state.filter.showFilters
  );

  const [yearFilter, setYearFilter] = useState<number | "">("");
  const [monthFilter, setMonthFilter] = useState<number | "">("");
  const [roomFilter, setRoomFilter] = useState<string>("");

  const filteredMeasurements = measurements.filter((measurement) => {
    return (
      (yearFilter === "" || measurement.year === yearFilter) &&
      (monthFilter === "" || measurement.month === monthFilter) &&
      (roomFilter === "" || measurement.room === roomFilter)
    );
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters */}
      <div
        className={`${showFilters ? "block sm:block" : "hidden"} mt-4  mb-6`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Año
            </label>
            <select
              id="year"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={yearFilter}
              onChange={(e) =>
                setYearFilter(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">Todos</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700"
            >
              Mes
            </label>
            <select
              id="month"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={monthFilter}
              onChange={(e) =>
                setMonthFilter(e.target.value ? Number(e.target.value) : "")
              }
            >
              <option value="">Todos</option>
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

          <div>
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700"
            >
              Local
            </label>
            <select
              id="room"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Sala">Sala</option>
              <option value="Cocina">Cocina</option>
              <option value="Dormitorio">Dormitorio</option>
              <option value="Baño">Baño</option>
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
              {measurement.room}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
              {/* Columna 1: Agua */}
              <div className="space-y-2">
                <p>
                  💧 Agua: {measurement.meterWaterCurrent} m³ (Antes:{" "}
                  {measurement.meterWaterBefore} m³)
                </p>
                <p>💰 Pago Agua: ${measurement.paymentWater.toFixed(2)}</p>
              </div>

              {/* Columna 2: Luz */}
              <div className="space-y-2 sm:text-right">
                <p>
                  💡 Luz: {measurement.meterLightCurrent} kWh (Antes:{" "}
                  {measurement.meterLightBefore} kWh)
                </p>
                <p>⚡ Pago Luz: ${measurement.paymentLight.toFixed(2)}</p>
              </div>

              {/* Campo de Alquiler */}
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <p>🏠 Alquiler: ${measurement.rent.toFixed(2)}</p>
              </div>

              {/* Total en una fila completa */}
              <p className="col-span-1 sm:col-span-2 font-bold text-gray-900 text-center">
                Total: ${measurement.totalPayment.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
