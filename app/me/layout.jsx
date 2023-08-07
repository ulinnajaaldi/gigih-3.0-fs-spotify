import Sidebar from "@/components/sidebar-main";
import NavbarUser from "@/components/navbar-user";

export default function MainLayout({ children }) {
  return (
    <main className="flex items-start justify-start">
      <NavbarUser />
      <div className="z-10">
        <Sidebar />
      </div>
      <section className="h-screen flex-grow bg-black py-2">
        <div className="h-full max-h-screen overflow-auto rounded-[8px]">
          {children}
        </div>
      </section>
    </main>
  );
}
