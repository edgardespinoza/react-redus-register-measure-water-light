import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useState, FormEvent } from 'react';

// Constants for dropdown options
const locations = ['Local 1', 'Local 2', 'Local 3'];
const rooms = ['Room A', 'Room B', 'Room C'];
const years = [2023, 2024, 2025];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Interface para los errores
interface Errors {
  [key: string]: string;
}

export default function Example() {
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newErrors: Errors = {};

    // Validar campos vacíos y decimales
    formData.forEach((value, key) => {
      if (!value) {
        newErrors[key] = 'This field is required.';
      } else if (key.includes('meter') || key.includes('payment') || key === 'rent') {
        // Validar que sea un número decimal
        if (isNaN(parseFloat(value as string))) {
          newErrors[key] = 'Please enter a valid number.';
        }
      }
    });

    // Si hay errores, no enviar el formulario
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si no hay errores, enviar el formulario
    setErrors({});
    console.log('Form data:', Object.fromEntries(formData));
    alert('Form submitted successfully!');
  };

  return (
    <div className="mx-auto  px-4 sm:px-6 lg:px-8 py-8"> {/* Añade margen y padding aquí */}
      <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8"> {/* Añade padding interno aquí */}
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Room Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Fill in the details about the room and its utilities.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Local Select */}
                <div className="sm:col-span-3">
                  <label htmlFor="local" className="block text-sm/6 font-medium text-gray-900">
                    Local
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="local"
                      name="local"
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Select a local</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.local && <p className="text-sm text-red-500">{errors.local}</p>}
                </div>

                {/* Room Select */}
                <div className="sm:col-span-3">
                  <label htmlFor="room" className="block text-sm/6 font-medium text-gray-900">
                    Room
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="room"
                      name="room"
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Select a room</option>
                      {rooms.map((room, index) => (
                        <option key={index} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.room && <p className="text-sm text-red-500">{errors.room}</p>}
                </div>

                {/* Year Select */}
                <div className="sm:col-span-3">
                  <label htmlFor="year" className="block text-sm/6 font-medium text-gray-900">
                    Year
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="year"
                      name="year"
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Select a year</option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
                </div>

                {/* Month Select */}
                <div className="sm:col-span-3">
                  <label htmlFor="month" className="block text-sm/6 font-medium text-gray-900">
                    Month
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="month"
                      name="month"
                      required
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    >
                      <option value="">Select a month</option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  {errors.month && <p className="text-sm text-red-500">{errors.month}</p>}
                </div>

                {/* Water Meter Current */}
                <div className="sm:col-span-3">
                  <label htmlFor="meterWaterCurrent" className="block text-sm/6 font-medium text-gray-900">
                    Current Water Meter
                  </label>
                  <div className="mt-2">
                    <input
                      id="meterWaterCurrent"
                      name="meterWaterCurrent"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.meterWaterCurrent && <p className="text-sm text-red-500">{errors.meterWaterCurrent}</p>}
                </div>

                {/* Water Meter Before */}
                <div className="sm:col-span-3">
                  <label htmlFor="meterWaterBefore" className="block text-sm/6 font-medium text-gray-900">
                    Previous Water Meter
                  </label>
                  <div className="mt-2">
                    <input
                      id="meterWaterBefore"
                      name="meterWaterBefore"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.meterWaterBefore && <p className="text-sm text-red-500">{errors.meterWaterBefore}</p>}
                </div>

                {/* Water Payment */}
                <div className="sm:col-span-3">
                  <label htmlFor="paymentWater" className="block text-sm/6 font-medium text-gray-900">
                    Water Payment
                  </label>
                  <div className="mt-2">
                    <input
                      id="paymentWater"
                      name="paymentWater"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.paymentWater && <p className="text-sm text-red-500">{errors.paymentWater}</p>}
                </div>

                {/* Light Meter Current */}
                <div className="sm:col-span-3">
                  <label htmlFor="meterLightCurrent" className="block text-sm/6 font-medium text-gray-900">
                    Current Light Meter
                  </label>
                  <div className="mt-2">
                    <input
                      id="meterLightCurrent"
                      name="meterLightCurrent"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.meterLightCurrent && <p className="text-sm text-red-500">{errors.meterLightCurrent}</p>}
                </div>

                {/* Light Meter Before */}
                <div className="sm:col-span-3">
                  <label htmlFor="meterLightBefore" className="block text-sm/6 font-medium text-gray-900">
                    Previous Light Meter
                  </label>
                  <div className="mt-2">
                    <input
                      id="meterLightBefore"
                      name="meterLightBefore"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.meterLightBefore && <p className="text-sm text-red-500">{errors.meterLightBefore}</p>}
                </div>

                {/* Light Payment */}
                <div className="sm:col-span-3">
                  <label htmlFor="paymentLight" className="block text-sm/6 font-medium text-gray-900">
                    Light Payment
                  </label>
                  <div className="mt-2">
                    <input
                      id="paymentLight"
                      name="paymentLight"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.paymentLight && <p className="text-sm text-red-500">{errors.paymentLight}</p>}
                </div>

                {/* Total Payment */}
                <div className="sm:col-span-3">
                  <label htmlFor="totalPayment" className="block text-sm/6 font-medium text-gray-900">
                    Total Payment
                  </label>
                  <div className="mt-2">
                    <input
                      id="totalPayment"
                      name="totalPayment"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.totalPayment && <p className="text-sm text-red-500">{errors.totalPayment}</p>}
                </div>

                {/* Rent */}
                <div className="sm:col-span-3">
                  <label htmlFor="rent" className="block text-sm/6 font-medium text-gray-900">
                    Rent
                  </label>
                  <div className="mt-2">
                    <input
                      id="rent"
                      name="rent"
                      type="number"
                      inputMode="decimal"
                      step="any"
                      required
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  {errors.rent && <p className="text-sm text-red-500">{errors.rent}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8"> {/* Añade padding aquí */}
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}