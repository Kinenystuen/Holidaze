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
    <div className="relative w-full">
      <label
        htmlFor="guests"
        className="absolute text-gray-600 dark:text-gray-400 left-2 md:left-3 top-2 text-sm font-medium uppercase pointer-events-none"
      >
        <small>Guests</small>
      </label>
      <select
        id="guests"
        name="guests"
        className="w-full cursor-pointer border border-color1-200 dark:border-customBgDark-400 p-3 pt-7 pb-3 rounded-b-md bg-gray-100 dark:bg-customBgDark-500 pl-2 pr-10 py-2 font-bold focus:outline-none sm:text-sm"
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
