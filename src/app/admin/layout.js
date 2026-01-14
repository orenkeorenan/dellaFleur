export default function AdminLayout({ children }) {
    return (
        <div style={{ display: "flex" }}>
            <aside style={{ width: "220px", borderRight: "1px solid #ddd", padding: "1rem", background: "#f7f7f7" }}>
                <p>Admin Sidebar</p>
                <ul>
                    <li>/dashboard</li>
                    <li>/users</li>
                </ul>
            </aside>


            <main style={{ padding: "1rem", flex: 1 }}>
            {children}
            </main>
        </div>
    );
}