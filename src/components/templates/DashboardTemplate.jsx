// Template: estructura de un panel por rol = barra lateral + zona principal.
// No sabe qué links ni qué páginas hay: recibe la barra lateral por "sidebar"
// y el contenido por "children". Sirve igual para dueño, veterinario y admin.
export function DashboardTemplate(props) {
  const { sidebar, children } = props

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 col-lg-2 px-0">{sidebar}</aside>
        <main className="col-md-9 col-lg-10 p-4">{children}</main>
      </div>
    </div>
  )
}
