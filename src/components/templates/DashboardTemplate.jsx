// Template: estructura de un panel por rol = barra lateral + zona principal.
// No sabe qué links ni qué páginas hay: recibe la barra lateral por "sidebar"
// y el contenido por "children". Sirve igual para dueño, veterinario y admin.
export function DashboardTemplate(props) {
  const { sidebar, children } = props

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* El aside no lleva fondo, de eso se encarga el Sidebar */}
        <aside className="col-md-3 col-lg-2">
          {sidebar}
        </aside>

        {/* El main tiene el fondo gris claro de la app */}
        <main className="col-md-9 col-lg-10 p-4 p-md-5 app-bg">
          {children}
        </main>
      </div>
    </div>
  )
}