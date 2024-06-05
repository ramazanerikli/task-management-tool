"use client";
import { FC } from "react";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import FilterOption from "@/types/FilterOption";


const FilterModule: FC<{
  selectedFilterOption: FilterOption,
  filterDropdownVisible: boolean,
  setFilterDropdownVisible: (value: boolean) => void,
  filterOptions: FilterOption[],
  switchFilterOption: (index: number) => void;
}> = ({
  selectedFilterOption,
  filterDropdownVisible,
  setFilterDropdownVisible,
  filterOptions,
  switchFilterOption
}) => {

  return (
    <div className="relative">
    <ul>
      <li>
        <span
          onClick={() => setFilterDropdownVisible(!filterDropdownVisible)}
          className="flex items-center justify-start gap-3 px-4 py-2 text-white bg-black text-sm rounded-lg active"
        >
          <FaFilter />
          {selectedFilterOption.name}
          <FaChevronDown className="ms-auto" />
        </span>
      </li>
    </ul>
    <ul
      className={
        filterDropdownVisible
          ? "flex flex-col absolute bg-white w-full"
          : "flex flex-col absolute bg-white hidden"
      }
    >
      {filterOptions.map((item: any, index: number) => (
        <li className="me-2" key={index}>
          <button
            onClick={() => switchFilterOption(index)}
            className="flex px-4 py-2 gap-2 text-gray-500 text-sm font-medium text-sm rounded-lg"
          >
            <span className="w-4 h-4 border border-black flex items-center justify-center rounded-full">
              {selectedFilterOption.code === item.code && (
                <span className="w-2 h-2 bg-black rounded-full flex"></span>
              )}
            </span>
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default FilterModule;
