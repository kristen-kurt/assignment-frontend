import Articles from "@/components/home/Articles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaRegBookmark, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data: sources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => get<string[]>("sources"),
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => get<string[]>("categories"),
  });

  return (
    <main className="bg-background p-4">
      <div className="flex justify-end">
        <Link
          to="/bookmarks"
          className="text-sm text-foreground flex items-center gap-2 underline"
        >
          <FaRegBookmark />
          Bookmarks
        </Link>
      </div>
      <div className="flex items-start gap-4 justify-start sm:flex-row flex-col w-full mt-4">
        <div className="w-full sm:max-w-[12rem] border border-foreground rounded-md flex items-center pr-3 h-9">
          <input
            type="text"
            className="w-full h-full pl-4 bg-transparent ring-0 border-none outline-none"
          />
          <FaSearch className="text-white" />
        </div>
        <div className="flex items-end justify-between sm:justify-start gap-4 w-full">
          <Select>
            <SelectTrigger className="w-[180px] border-foreground">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources && sources?.result.length > 0 && (
                <>
                  {sources?.result.map((source) => (
                    <SelectItem value={source} key={source}>
                      {source}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] border-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories && categories?.result.length > 0 && (
                <>
                  {categories?.result.map((category) => (
                    <SelectItem value={category} key={category}>
                      {category}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Articles />
    </main>
  );
}
