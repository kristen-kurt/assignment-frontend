import Articles from "@/components/home/Articles";
import { debounce } from "lodash";
import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaCog, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SourceT } from "@/pages/types/source";
import { CategoryT } from "@/pages/types/category";
import { useCallback, useEffect, useState } from "react";
import CustomSelect from "@/components/ui/customSelect";

enum DateRange {
  Today = 'Today',
  ThisWeek = 'This Week',
  ThisMonth = 'This Month',
}
export default function HomePage() {
  const dateData = Object.values(DateRange);

  const[searchValue, setSearchValue] = useState<string>('');
  const[selectedSource, setSelectedSource] = useState<string>();
  const[selectedCategory, setSelectedCategory] = useState<string>();
  const[selectedDate, setSelectedDate] = useState<string>();

  const { data: sources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => get<SourceT[]>("sources"),
  });

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  const handleDateChange= (value: string) => {
    setSelectedDate(value);
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => get<CategoryT[]>("categories"),
  });

const debouncedSearch = useCallback(
  debounce((value: string) => {
    setSearchValue(value);
  }, 1000),
  []
);

useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);

const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
  event
) => {
  debouncedSearch(event.target.value);
};

  return (
    <main className="bg-background p-4">
      <div className="flex justify-end">
        <Link
          to="/setting"
          className="text-sm text-foreground flex items-center gap-2 underline"
        >
           <FaCog />
          Setting
        </Link>
      </div>
      <div className="flex items-start gap-4 justify-start sm:flex-row flex-col w-full mt-4">
        <div className="w-full sm:max-w-[12rem] border border-foreground rounded-md flex items-center pr-3 h-9">
          <input
            type="text"
            className="w-full h-full pl-4 bg-transparent ring-0 border-none outline-none"
            placeholder="Search by keyword"
            onChange={handleSearchChange}
          />
          <FaSearch className="text-white" />
        </div>
        <div className="flex items-end justify-between sm:justify-start gap-4 w-full">
          <CustomSelect
          placeholder="Source"
          data={sources?.data || []}
          onValueChange={handleSourceChange}
          />
          <CustomSelect
            placeholder="Category"
            data={categories?.data || []}
            onValueChange={handleCategoryChange}
          />
          <CustomSelect
            placeholder="Select Date"
            data={dateData || []}
            onValueChange={handleDateChange}
          />
        </div>
      </div> 

      <Articles keyword={searchValue}  sourceId={selectedSource} categoryId={selectedCategory} selectedDate={selectedDate} />
    </main>
  );
}
