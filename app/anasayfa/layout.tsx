import Navbar from "../ui/anasayfa/navbar/navbar";
import Sidebar from "../ui/anasayfa/sidebar/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-5 flex h-screen gap-5">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
