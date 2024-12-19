import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { get } from "@/lib/api";
import { ArticleT } from "@/pages/types/article";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";

import { FiUser } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { useInView } from "react-intersection-observer";

export default function Articles() {
  const { ref: bottomRef, inView } = useInView({ threshold: 1.0 });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 1 }) => {
      return await get<ArticleT[]>("articles");
    },
    getNextPageParam: (lastPage) => {
      //   if (lastPage.result) {
      //     const { current_page, last_page } = lastPage.result.meta;
      //     return current_page < last_page ? current_page + 1 : undefined;
      //   }
      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className="min-h-screen overflow-y-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {data &&
          data.pages.map((page, index) => (
            <Fragment key={index}>
              {page.result?.map((article) => (
                <a href={article.source_url} target="_blank">
                  <Card key={article.id} className="overflow-hidden bg-card">
                    <img
                      src={
                        "https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg"
                      }
                      className="w-full aspect-[16/6] object-cover"
                    />
                    <CardContent className="mt-4">
                      <CardTitle>{article.title}</CardTitle>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <FiUser />
                          <p>{article.author}</p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <MdOutlineDateRange />
                          <p>{article.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 mt-2">
                        <TbWorld />
                        <p>{article.source}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </Fragment>
          ))}
        <div
          ref={bottomRef}
          className="w-4 h-4 aspect-square bg-transparent pointer-events-none"
        />
        {/* {isFetchingNextPage ? (
      <LoadingSpinner className="text-primary mx-auto text-xl mt-4" />
    ) : null} */}
      </div>
    </section>
  );
}
