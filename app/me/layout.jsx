import Sidebar from "@/components/sidebar-main";
import NavbarUser from "@/components/navbar-user";

export default function MainLayout({ children }) {
  return (
    <main className="flex items-start justify-start">
      <NavbarUser />
      <Sidebar />
      <section className="h-screen flex-grow bg-black py-2">
        <div className="h-full max-h-screen overflow-auto rounded-[8px] bg-gradient-to-b from-neutral-800 to-neutral-900 px-4 py-3">
          {children}
        </div>
      </section>
    </main>
  );
}
