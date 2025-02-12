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
    <div className="relative w-full h-16 flex justify-end">
      <label
        htmlFor="guests"
        className="absolute top-2 left-3 text-xs uppercase sm:text-sm font-semibold text-gray-600 dark:text-gray-400 pointer-events-none"
      >
        <small>Guests</small>
      </label>

      {/* Select dropdown */}
      <select
        id="guests"
        name="guests"
        className="w-full h-16 cursor-pointer border border-color1-200 dark:border-customBgDark-400 px-3 pt-6 pb-2 rounded-md bg-gray-100 dark:bg-customBgDark-500 font-bold focus:outline-none sm:text-sm"
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
