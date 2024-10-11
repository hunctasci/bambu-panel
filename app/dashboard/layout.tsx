import Navbar from "../../components/ui/navbar";
import Sidebar from "../../components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-5 flex h-screen flex-col gap-5">
      <Navbar />
      {children}
    </div>
  );
}
