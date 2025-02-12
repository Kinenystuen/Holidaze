interface GuestsSelectorProps {
  guests: number;
  maxGuests: number;
  onChange: (guests: number) => void;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  guests,
  maxGuests,
  onChange
}) => {
  return (
    <div className="relative w-full h-16">
      <label
        htmlFor="guests"
        className="absolute top-3 left-2 block mb-1 uppercase text-sm font-semibold text-gray-600 dark:text-gray-400"
      >
        <small>Guests</small>
      </label>

      {/* Select dropdown */}
      <select
        id="guests"
        name="guests"
        className="w-full h-16 cursor-pointer border border-color1-200 dark:border-customBgDark-400 p-1 pt-8 pb-3 rounded-md bg-gray-100 dark:bg-customBgDark-500 font-bold focus:outline-none sm:text-sm"
        value={guests}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {Array.from({ length: maxGuests }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} {i === 0 ? "guest" : "guests"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GuestsSelector;
