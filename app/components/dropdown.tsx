"use client";
import { FC } from "react";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import FilterOption from "@/types/FilterOption";


const Dropdown: FC<{
  visibility: boolean,
  switchFilterOption: (index: number) => void;
  selectedFilterOption: FilterOption,
  filterOptions: FilterOption[],
}> = ({
  visibility,
  switchFilterOption,
  selectedFilterOption,
  filterOptions
}) => {

  return (
    <ul
      className={
        visibility
          ? "flex flex-col absolute bg-white w-full border mt-1 rounded-lg"
          : "flex flex-col absolute bg-white hidden"
      }
    >
      {filterOptions.map((option: FilterOption, index: number) => (
        <li className="me-2" key={index}>
          <button
            onClick={() => switchFilterOption(index)}
            className="flex px-4 py-2 gap-2 text-gray-500 text-sm font-medium text-sm rounded-lg"
          >
            <span className="w-4 h-4 border border-black flex items-center justify-center rounded-full">
              {selectedFilterOption.code === option.code && (
                <span className="w-2 h-2 bg-black rounded-full flex"></span>
              )}
            </span>
            {option.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
