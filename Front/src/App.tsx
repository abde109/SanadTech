import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AlphabetSidebar from "./components/AlphabetSidebar";
import EndMessage from "./components/EndMessage";
import Loader from "./components/Loader";
import UserListItem from "./components/UserListItem";
import { User } from "./models/userModel";
import { useLazyFetch } from "./utils/useLazyFetch";
import { useLetterPosition } from "./utils/useLetterPosition";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const limit = 20;
  const { getLetterIndex } = useLetterPosition();
  const { getSlice } = useLazyFetch();


  const fetchDown = useCallback(async () => {
    const offset = topOffset + downCount;
    const { data, total } = await getSlice(offset, limit);
    setUsers((prev) => [...prev, ...data]);
    setDownCount((prev) => prev + data.length);
    setTotal(total);
  }, [topOffset, downCount, getSlice]);

  const fetchUp = async () => {
    if (topOffset - limit <= 0) return;
    if (!scrollRef.current) return;
    const before = scrollRef.current.scrollHeight;
    const { data, total } = await getSlice(topOffset - limit, limit);
    setUsers((prev) => [...data, ...prev]);
    setTopOffset(topOffset - limit);
    setTotal(total);
    requestAnimationFrame(() => {
      if (scrollRef.current)
        scrollRef.current.scrollBy(0, scrollRef.current.scrollHeight - before);
    });
  };

  useEffect(() => {
    fetchDown();
  }, []);

  const jumpToLetter = async (letter: string) => {
    setSelectedLetter(letter);
    const idx = await getLetterIndex(letter);
    setUsers([]);
    setTopOffset(idx);
    setDownCount(0);
    scrollRef.current?.scrollTo({ top: 5 });
    const { data, total } = await getSlice(idx, limit);
    setUsers(data);
    setTotal(total);
  };

  const handleScroll = () => {
    if (!scrollRef.current || !listRef.current) return;
    if (scrollRef.current.scrollTop <= 0) fetchUp();
    const containerTop = scrollRef.current.getBoundingClientRect().top;
    const firstVisible = Array.from(listRef.current.children).find(
      (el) => el.getBoundingClientRect().top >= containerTop
    );
    if (firstVisible)
      setSelectedLetter(firstVisible.textContent?.trim()[0]?.toUpperCase() || "");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-white to-gray-100 text-gray-800">
      <AlphabetSidebar onSelectLetter={jumpToLetter} selectedLetter={selectedLetter} />
      <div className="pl-16 sm:pl-20 pr-5 py-5 max-w-5xl mx-auto">
        <div className="bg-white/70 rounded-xl shadow-md p-6">
          <h1 className="text-4xl font-semibold text-center">User List</h1>
          <div id="scrollableDiv" ref={scrollRef} onScroll={handleScroll} style={{ height: "83vh", overflowY: "auto" }}>
            <InfiniteScroll
              key={selectedLetter}
              dataLength={users.length}
              next={fetchDown}
              hasMore={topOffset + downCount < total}
              loader={<Loader />}
              endMessage={<EndMessage />}
              scrollableTarget="scrollableDiv"
            >
              <ul ref={listRef} className="list-none p-0">
                {users.map((user) => (
                  <UserListItem key={user.id} user={user} />
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
