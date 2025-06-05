import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculatePayment } from "../../model/calculatePaymentUseCase";
import { LightMeasurement } from "../../model/lightMeasurement";
import { Room } from "../../model/room";
import { saveMeasure } from "../../model/saveMeasureUseCase";
import Notification from "../components/Notification";
import useRooms from "../hooks/useRooms";
import useSetting from "../hooks/useSetting";
import { getLastMeasureByRoom } from "../../model/getMeasureLastMonthUseCase";
import { useEffect } from "react";

const years = [new Date().getFullYear(), new Date().getFullYear() - 1];
const months = [
  { name: "Enero", value: 1 },
  { name: "Febrero", value: 2 },
  { name: "Marzo", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Mayo", value: 5 },
  { name: "Junio", value: 6 },
  { name: "Julio", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Septiembre", value: 9 },
  { name: "Octubre", value: 10 },
  { name: "Noviembre", value: 11 },
  { name: "Diciembre", value: 12 },
];

interface Errors {
  [key: string]: string;
}

export default function MeasurementForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { measurement } = location.state ?? {};

  const [formData, setFormData] = useState<LightMeasurement>(
    measurement ?? {
      room: { name: "", id: "" },
      meterWaterCurrent: 0,
      meterWaterBefore: 0,
      paymentWater: 0,
      meterLightCurrent: 0,
      meterLightBefore: 0,
      paymentLight: 0,
      totalPayment: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      rent: 0,
    }
  );

  const [errors, setErrors] = useState<Errors>({});

  const { data: rooms } = useRooms();

  const { data: setting } = useSetting();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement; // Type assertion
    const { name, value, type, inputMode } = target;

    const safeNumber = (val: string): string | number => {
      if (val === "") return "";
      if (/^-?\d*\.?\d*$/.test(val)) {
        const num = Number(val);
        return isNaN(num) ? "" : num;
      }
      return "";
    };

    let parsedValue;

    if (name === "room") {
      parsedValue = rooms?.find((r) => r.id === value) || {
        id: value,
        name: "",
      };
    } else if (type === "number" || inputMode === "decimal") {
      parsedValue = safeNumber(value);
    } else {
      parsedValue = value;
    }

    const newFormData = {
      ...formData,
      [name]: parsedValue,
    };

    setFormData(newFormData);
  };

  useEffect(() => {
    if (setting) {
      const { paymentLight, paymentWater, totalPayment } = calculatePayment({
        meterWaterCurrent: formData.meterWaterCurrent,
        meterLightCurrent: formData.meterLightCurrent,
        rent: formData.rent,
        meterLightBefore: formData.meterLightBefore,
        meterWaterBefore: formData.meterWaterBefore,
        priceLight: setting.priceLight,
        priceWater: setting.priceWater,
      });
      setFormData((prev) => ({
        ...prev,
        paymentLight,
        paymentWater,
        totalPayment,
      }));
    }
  }, [
    formData.meterWaterCurrent,
    formData.meterLightCurrent,
    formData.rent,
    formData.meterLightBefore,
    formData.meterWaterBefore,
    setting,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newErrors: Errors = {};

    formData.forEach((value, key) => {
      if (!value) {
        newErrors[key] = "Este campo es obligatorio.";
      } else if (key.includes("meter") || key === "rent") {
        if (isNaN(parseFloat(value as string))) {
          newErrors[key] = "Por favor, introduce un número válido.";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formDataObject = Object.fromEntries(formData);
    try {
      const measurementData: LightMeasurement = {
        room: {
          id: formDataObject.room as string,
          name: "",
        },
        meterWaterCurrent: parseFloat(
          formDataObject.meterWaterCurrent as string
        ),
        meterWaterBefore: parseFloat(formDataObject.meterWaterBefore as string),
        paymentWater: parseFloat(formDataObject.paymentWater as string),
        meterLightCurrent: parseFloat(
          formDataObject.meterLightCurrent as string
        ),
        meterLightBefore: parseFloat(formDataObject.meterLightBefore as string),
        paymentLight: parseFloat(formDataObject.paymentLight as string),
        totalPayment: parseFloat(formDataObject.totalPayment as string),
        year: parseInt(formDataObject.year as string),
        month: parseInt(formDataObject.month as string),
        rent: parseFloat(formDataObject.rent as string),
      };

      const success = await saveMeasure(measurementData);
      if (success) {
        setNotification({
          type: "success",
          message: "Medición guardada con éxito 🎉",
        });
        setTimeout(() => navigate("/"), 2000); // Espera 2 segundos antes de redirigir
      } else {
        throw new Error("Error en el guardado.");
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Hubo un error al guardar la medición. 🚨",
      });
      console.error("Error al guardar:", error);
    }
  };
  const { room, year, month } = formData;

  useEffect(() => {
    const fetchLastMeasure = async () => {
      const roomId = room.id;
      if (!roomId || !year || !month) return;

      try {
        const lastMeasure = await getLastMeasureByRoom(year, month, roomId);
        if (lastMeasure) {
          setFormData((prev) => ({
            ...prev,
            meterWaterBefore: lastMeasure.meterWater,
            meterLightBefore: lastMeasure.meterLight,
            rent: lastMeasure.rent ?? 0,
          }));
        }
      } catch (error) {
        console.error("Error get last measure", error);
      }
    };

    fetchLastMeasure();
  }, [room?.id, year, month]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Room Select */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="room"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    🏢 Habitación
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="room"
                      name="room"
                      onChange={handleChange}
                      value={formData.room?.id}
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Selecciona una habitación</option>
                      {rooms?.map((room: Room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.room && (
                    <p className="text-sm text-red-500">{errors.room}</p>
                  )}
                </div>
                {/* Rent */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="rent"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    🏠 Alquiler
                  </label>
                  <div className="mt-2">
                    <input
                      id="rent"
                      name="rent"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={formData.rent}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.rent && (
                    <p className="text-sm text-red-500">{errors.rent}</p>
                  )}
                </div>
                {/* Year Select */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="year"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    📅 Año
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Selecciona un año</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.year && (
                    <p className="text-sm text-red-500">{errors.year}</p>
                  )}
                </div>

                {/* Month Select */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="month"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    📅 Mes
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="month"
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Selecciona un mes</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.month && (
                    <p className="text-sm text-red-500">{errors.month}</p>
                  )}
                </div>

                {/* Sección de Agua y Luz en columnas responsivas */}
                <div className="sm:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Sección de Agua */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base/7 font-semibold text-gray-900">
                      💧 Agua
                    </h3>
                    <div className="mt-4 space-y-4">
                      {/* Water Meter Current */}
                      <div>
                        <label
                          htmlFor="meterWaterCurrent"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Medidor Actual de Agua
                        </label>
                        <div className="mt-2">
                          <input
                            id="meterWaterCurrent"
                            name="meterWaterCurrent"
                            type="number"
                            inputMode="decimal"
                            step="any"
                            value={formData.meterWaterCurrent}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                        {errors.meterWaterCurrent && (
                          <p className="text-sm text-red-500">
                            {errors.meterWaterCurrent}
                          </p>
                        )}
                      </div>

                      {/* Water Meter Before (Label) */}
                      <div>
                        <label
                          htmlFor="meterWaterBefore"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Anterior de Agua
                        </label>
                        <div className="mt-2">
                          <label className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                            {formData.meterWaterBefore ?? "0"}
                          </label>
                        </div>
                      </div>

                      {/* Water Payment (Label) */}
                      <div>
                        <label
                          htmlFor="paymentWater"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Pago de Agua
                        </label>
                        <div className="mt-2">
                          <label className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                            {formData.paymentWater}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sección de Luz */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-base/7 font-semibold text-gray-900">
                      💡 Luz
                    </h3>
                    <div className="mt-4 space-y-4">
                      {/* Light Meter Current */}
                      <div>
                        <label
                          htmlFor="meterLightCurrent"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Medidor Actual de Luz
                        </label>
                        <div className="mt-2">
                          <input
                            id="meterLightCurrent"
                            name="meterLightCurrent"
                            type="number"
                            inputMode="decimal"
                            step="any"
                            value={formData.meterLightCurrent}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                          />
                        </div>
                        {errors.meterLightCurrent && (
                          <p className="text-sm text-red-500">
                            {errors.meterLightCurrent}
                          </p>
                        )}
                      </div>

                      {/* Light Meter Before (Label) */}
                      <div>
                        <label
                          htmlFor="meterLightBefore"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Medidor Anterior de Luz
                        </label>
                        <div className="mt-2">
                          <label className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                            {formData.meterLightBefore ?? 0}
                          </label>
                        </div>
                      </div>

                      {/* Light Payment (Label) */}
                      <div>
                        <label
                          htmlFor="paymentLight"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Pago de Luz
                        </label>
                        <div className="mt-2">
                          <label className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                            {formData.paymentLight}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Payment (Label) */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="totalPayment"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    💰 Pago Total
                  </label>
                  <div className="mt-2">
                    <label className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 sm:text-sm/6">
                      {formData.totalPayment}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
