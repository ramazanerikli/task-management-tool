"use client";
import { FC } from "react";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import FilterOption from "@/types/FilterOption";
import Dropdown from "./dropdown";

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
          className="flex items-center justify-start gap-3 px-4 py-2 border border-gray-200 text-sm rounded-lg active"
        >
          <FaFilter />
          {selectedFilterOption.name}
          <FaChevronDown className="ms-auto" />
        </span>
      </li>
    </ul>
    <Dropdown 
      visibility={filterDropdownVisible}
      switchFilterOption={switchFilterOption}
      selectedFilterOption={selectedFilterOption}
      filterOptions={filterOptions}
    />
  </div>
  );
};

export default FilterModule;
