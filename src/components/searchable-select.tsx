import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface SearchableSelectOption {
  value: string;
  label: string;
}

export interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** When set, renders a clearable "empty" choice with this label at the top. */
  emptyLabel?: string;
  className?: string;
  disabled?: boolean;
  /** Renders a hidden input of this name carrying `value` (for plain form posts). */
  name?: string;
}

/**
 * Type-to-filter single select with keyboard navigation. Styled with the
 * brand `.alluxi-form-input` trigger and a token-themed dropdown.
 */
export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  emptyLabel,
  className = "",
  disabled = false,
  name,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = query
    ? options.filter((o) =>
        o.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  const hasEmpty = emptyLabel != null;

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setQuery("");
      setOpen(false);
      setHighlightIndex(-1);
    },
    [onChange],
  );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
        setHighlightIndex(-1);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[
      highlightIndex + (hasEmpty ? 1 : 0)
    ] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open, hasEmpty]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > (hasEmpty ? -1 : 0) ? prev - 1 : prev,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex === -1 && hasEmpty) {
          handleSelect("");
        } else if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setQuery("");
        setHighlightIndex(-1);
        break;
    }
  }

  const displayValue = open
    ? query
    : selected
      ? selected.label
      : emptyLabel ?? "";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {name && <input type="hidden" name={name} value={value} />}
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        className="alluxi-form-input w-full"
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightIndex(-1);
          if (!open) setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {value && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => {
            handleSelect("");
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-secondary transition hover:text-foreground"
          aria-label="Clear selection"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 3L11 11M11 3L3 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
      {open && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-stroke bg-surface shadow-lg"
          role="listbox"
        >
          {hasEmpty && (
            <li
              role="option"
              aria-selected={value === ""}
              className={`cursor-pointer px-3 py-2 text-sm transition ${
                highlightIndex === -1 && !query
                  ? "bg-primary/10 font-semibold text-primary"
                  : value === ""
                    ? "font-semibold text-foreground"
                    : "text-secondary hover:bg-surface-hover"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect("");
              }}
              onMouseEnter={() => setHighlightIndex(-1)}
            >
              {emptyLabel}
            </li>
          )}
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-secondary">No results</li>
          ) : (
            filtered.map((option, idx) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={`cursor-pointer px-3 py-2 text-sm transition ${
                  idx === highlightIndex
                    ? "bg-primary/10 text-primary"
                    : option.value === value
                      ? "font-semibold text-foreground"
                      : "text-foreground hover:bg-surface-hover"
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(option.value);
                }}
                onMouseEnter={() => setHighlightIndex(idx)}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
