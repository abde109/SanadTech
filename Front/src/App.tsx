// src/App.tsx
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlphabetSidebar from './components/AlphabetSidebar';
import EndMessage from './components/EndMessage';
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';
import UserListItem from './components/UserListItem';
import { User } from './models/userModel';
import { useSearchUsers } from './utils/useSearchUsers';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alphabetMode, setAlphabetMode] = useState<boolean>(false);
  const limit = 20;

  // Custom hook to fetch users (with or without "alphabetMode").
  const { getSearchUsers } = useSearchUsers(searchQuery, offset, limit, alphabetMode);

  const fetchUsers = async () => {
    try {
      const result = await getSearchUsers();
      setUsers(prev => [...prev, ...result.data]);
      setTotal(result.total);
      setOffset(prev => prev + limit);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Reset data on query/mode changes
  useEffect(() => {
    setUsers([]);
    setOffset(0);
    setTotal(0);
    fetchUsers();
  }, [searchQuery, alphabetMode]);

  // Strict "startsWith" mode for sidebar selection
  const handleLetterSelect = (letter: string) => {
    setAlphabetMode(true);
    setSearchQuery(letter);
  };

  // "includes" mode for typed queries
  const handleSearchChange = (query: string) => {
    setAlphabetMode(false);
    setSearchQuery(query);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-white to-gray-100 text-gray-800">
      <AlphabetSidebar
        onSelectLetter={handleLetterSelect}
        selectedLetter={alphabetMode ? searchQuery : ''}
      />

      <div className="pl-16 sm:pl-20 pr-5 py-5 max-w-5xl mx-auto">
        <div className="bg-white/70 rounded-xl shadow-md p-6">
          <h1 className="text-5xl font-semibold text-center">
            User List
          </h1>
          
          {/* Sticky SearchBar */}
          <div className="sticky top-0 z-10 mb-6 backdrop-blur-md rounded-lg shadow p-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
            <p className='font-semibold text-gray-700'>total: {total}</p>
          </div>

          <InfiniteScroll
            dataLength={users.length}
            next={fetchUsers}
            hasMore={users.length < total}
            loader={<Loader />}
            endMessage={<EndMessage />}
          >
            <ul className="list-none p-0">
              {users.map(user => (
                <UserListItem key={user.id} user={user} />
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
