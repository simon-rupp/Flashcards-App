import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

const MainView = () => {
    const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

    useEffect(() => {
        clearSelectedDeckId();
    }, [])

  return (
    <>
      <Sidebar />
      <Feed />
      <Aside />
    </>
  );
};

export default MainView;
