import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Props {
  title?: string;
  value?: string;
  onChange: (value: string) => void;
}

const states = [
  { acronym: "AC", name: "Acre" },
  { acronym: "AL", name: "Alagoas" },
  { acronym: "AP", name: "Amapá" },
  { acronym: "AM", name: "Amazonas" },
  { acronym: "BA", name: "Bahia" },
  { acronym: "CE", name: "Ceará" },
  { acronym: "DF", name: "Distrito Federal" },
  { acronym: "ES", name: "Espírito Santo" },
  { acronym: "GO", name: "Goiás" },
  { acronym: "MA", name: "Maranhão" },
  { acronym: "MT", name: "Mato Grosso" },
  { acronym: "MS", name: "Mato Grosso do Sul" },
  { acronym: "MG", name: "Minas Gerais" },
  { acronym: "PA", name: "Pará" },
  { acronym: "PB", name: "Paraíba" },
  { acronym: "PR", name: "Paraná" },
  { acronym: "PE", name: "Pernambuco" },
  { acronym: "PI", name: "Piauí" },
  { acronym: "RJ", name: "Rio de Janeiro" },
  { acronym: "RN", name: "Rio Grande do Norte" },
  { acronym: "RS", name: "Rio Grande do Sul" },
  { acronym: "RO", name: "Rondônia" },
  { acronym: "RR", name: "Roraima" },
  { acronym: "SC", name: "Santa Catarina" },
  { acronym: "SP", name: "São Paulo" },
  { acronym: "SE", name: "Sergipe" },
  { acronym: "TO", name: "Tocantins" },
];

const SelectUf: React.FC<Props> = ({ title, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = states.find((state) => state.acronym === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block font-body font-semibold uppercase tracking-wider text-[11px] leading-snug text-text-primary mb-1.5">
        {title}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full flex items-center justify-between rounded-[10px] bg-surface border border-border px-4 py-3 font-body text-[14px] text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-text-terciary"
        >
          <span className={selected ? "text-text-primary" : "text-text-secondary"}>
            {selected ? selected.acronym : "UF"}
          </span>
          <FiChevronDown
            size={16}
            className={`text-text-secondary transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-[10px] border border-border bg-surface py-1 shadow-lg">
            {states.map((state) => (
              <li key={state.acronym}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(state.acronym);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left font-body text-[14px] transition-colors hover:bg-primary-soft hover:text-primary-hover ${
                    state.acronym === value
                      ? "bg-primary-soft text-primary-hover font-semibold"
                      : "text-text-primary"
                  }`}
                >
                  {state.acronym} - {state.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectUf;
