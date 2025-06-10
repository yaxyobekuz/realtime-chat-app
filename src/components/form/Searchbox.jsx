import React, { useState, useCallback, useMemo } from "react";
import _ from "lodash";

const Searchbox = ({
  onSearch,
  className = "",
  suggestions = [],
  maxSuggestions = 5,
  debounceDelay = 300,
  showSuggestions = true,
  placeholder = "Qidirish...",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);

  // Debounced search function using lodash
  const debouncedSearch = useCallback(
    _.debounce((value) => {
      if (onSearch) {
        onSearch(value);
      }
    }, debounceDelay),
    [onSearch, debounceDelay]
  );

  // Filter suggestions using lodash
  const filteredSuggestions = useMemo(() => {
    if (!searchValue.trim() || !showSuggestions) return [];

    return _.chain(suggestions)
      .filter((item) => _.toLower(item).includes(_.toLower(searchValue)))
      .take(maxSuggestions)
      .value();
  }, [suggestions, searchValue, showSuggestions, maxSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSelectedIndex(-1);
    setShowSuggestionsList(true);

    // Trigger debounced search
    debouncedSearch(value);
  };

  const handleSubmit = () => {
    if (onSearch) onSearch(searchValue);
    setShowSuggestionsList(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestionsList(false);
    if (onSearch) onSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestionsList || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestionsList(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Delay hiding suggestions to allow click events
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestionsList(false);
      setSelectedIndex(-1);
    }, 150);
  };

  const clearSearch = () => {
    setSearchValue("");
    setShowSuggestionsList(false);
    if (onSearch) onSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center relative min-w-96 h-11 bg-neutral-100 border-2 border-transparent rounded-3xl focus-within:border-blue-500">
        <input
          type="search"
          value={searchValue}
          onBlur={handleBlur}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestionsList(true)}
          className="bg-transparent pl-5 pr-20 w-full h-full rounded-3xl border-none outline-none text-gray-700"
        />

        {/* Clear button */}
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-12 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 0 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </button>
        )}

        {/* Search icon */}
        <button
          type="button"
          onClick={handleSubmit}
          className="absolute right-3.5 p-1 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestionsList && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                index === selectedIndex
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === filteredSuggestions.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbox;
