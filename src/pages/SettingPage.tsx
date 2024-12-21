import { useEffect, useState } from 'react';
import { get, post } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CategoryT } from "./types/category";
import { SourceT } from "./types/source";
import { AuthorT } from "./types/author";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userProfile from '/src/assets/user-profile.jpg';


export default function SettingPage() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [authors, setAuthors] = useState<AuthorT[]>([]);

  const { data: sources } = useQuery({
    queryKey: ["sources"],
    queryFn: () => get<SourceT[]>("sources"),
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => get<[]>("user"),
  });

  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const { data: categories } = await get<CategoryT[]>(`get-categories-by-source-id?source_id=${activeTab}`);
        setCategories(categories);
      } catch (err) {
        console.error(err);
      } finally {

      }
    };

    const fetchAuthors = async () => {

        try {
          const { data: authors } = await get<AuthorT[]>(`authors?source_id=${activeTab}`);
          setAuthors(authors);
        } catch (err) {
          console.error(err);
          
        } finally {
  
        }
      };

    fetchCategories();
    fetchAuthors();
  }, [activeTab]); 

  const { data: preferences } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => get("/preferences"),
  });

  useEffect(() => {
    if (preferences) {
      setSelectedCategories(preferences.categories || []);
      setSelectedSources(preferences.sources || []);
      setSelectedAuthors(preferences.authors || []);
    }
    // Set the first source as active tab when data loads
    if (sources !== undefined && sources?.data.length > 0 && activeTab === null) {
      setActiveTab(sources.data[0].id);
    }
  }, [preferences, sources]);

  const handleSelectPreference = (name: string, id: number) => {
    const updateState = {
      category: () => setSelectedCategories(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      ),
      source: () => setSelectedSources(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      ),
      author: () => setSelectedAuthors(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      ),
    };

    updateState[name as keyof typeof updateState]?.();
    post('/preferences', { [name]: id });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between space-x-2 cursor-pointer m-4">
        <div className="flex items-center p-x-4" onClick={handleBack}>
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </div>
        <FaSignOutAlt onClick={handleLogout} />
      </div>

      {/* Profile Section */}
      <div className="max-w-sm mx-auto bg-none rounded-lg shadow-lg overflow-hidden mb-8">
        <img
          src={userProfile}
          alt="Profile"
          className="w-32 h-32 object-cover mx-auto mt-4 rounded-full border-4 border-gray-300"
        />
        {user !== undefined && (
          <div className="text-center mt-4 mb-6">
            <h2 className="text-xl font-semibold text-white">{user.user.name}</h2>
            <p className="text-md text-gray-400">{user.user.email}</p>
          </div>
        )}
      </div>
        <div className="mx-4">
          <div className="relative w-full">
            <div className="flex overflow-x-auto no-scrollbar">
              <div className="inline-flex sm:px-6 gap-4 sm:gap-6 md:gap-8">
                {sources?.data.map((source) => (
                  <div key={source.id} className="relative flex-none">
                    <button
                      onClick={() => setActiveTab(source.id)}
                      className={`
                        px-2 py-2
                        text-sm sm:text-base
                        whitespace-nowrap
                        transition-colors duration-200
                        ${activeTab === source.id
                          ? 'text-green-500 font-semibold'
                          : 'text-gray-400 hover:text-gray-300'
                        }
                      `}
                    >
                      {source.name}
                    </button>
                    {activeTab === source.id && (
                      <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-green-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
        </div>

        {/* Tab Content */}
        {sources?.data.map((source) => (
          <div
              key={source.id}
              className={`my-4 sm:my-6 md:my-8 ${activeTab === source.id ? 'block' : 'hidden'}`}
            >
              {/* Categories Section */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">
                  Categories <small> (select your prefer categories)</small>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {categories && categories?.length > 0 && (
                    <>
                      {categories?.map((category) => (
                        <div
                          key={category.id}
                          onClick={() => handleSelectPreference("category", category.id)}
                          className={`p-2 sm:p-3 border rounded cursor-pointer transition-colors text-xs sm:text-sm md:text-base ${
                            selectedCategories.includes(category.id)
                              ? 'bg-blue-500 text-white'
                              : 'hover:bg-gray-700'
                          }`}
                        >
                          {category.name}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Authors Section */}
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold my-4 sm:my-3 md:my-4">
                  Authors <small> (select your prefer authors)</small>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {authors && authors?.length > 0 && (
                    <>
                      {authors?.map((author) => (
                        <div
                          key={author.id}
                          onClick={() => handleSelectPreference("author", author.id)}
                          className={`p-2 sm:p-3 border rounded cursor-pointer transition-colors text-xs sm:text-sm md:text-base ${
                            selectedAuthors.includes(author.id)
                              ? 'bg-blue-500 text-white'
                              : 'hover:bg-gray-700'
                          }`}
                        >
                          {author.name}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}