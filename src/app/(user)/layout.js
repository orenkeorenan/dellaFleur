export default function UserLayout({ children }) {
    return (
        <div style={{ display: "flex" }}>
            <aside style={{ width: "200px", borderRight: "1px solid #ddd", padding: "1rem" }}>
                <p>User Sidebar</p>
                <ul>
                    <li>/dashboard</li>
                    <li>/profile</li>
                </ul>
            </aside>


            <main style={{ padding: "1rem", flex: 1 }}>
                {children}
            </main>
        </div>
    );
}