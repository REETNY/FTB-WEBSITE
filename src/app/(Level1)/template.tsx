import MainFooter from "./_comp/MainFooter/MainFooter";
import MainHead from "./_comp/MainHead/MainHead";
import styls from "./mainLayout.module.css"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section className={styls.MainAppContainer}>
      <div className={styls.MainHead}>
        <MainHead />
      </div>
      <div className={styls.children_container}>
        {children}
      </div>
      <div className={styls.MainFooter}>
        <MainFooter />
      </div>
    </section>
  );
}
