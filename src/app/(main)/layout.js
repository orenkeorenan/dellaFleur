import Navbar from "../components/Navbar/Navbar";

export default function MainLayout({ children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #F5BFCC 0%, #FFF0E5 50%, #FFEAEA 100%)",
                display: "flex",
                flexDirection: "column",
                fontFamily: "'Helvetica Neue', sans-serif",
            }}
        >
            <Navbar/>
            <main 
                style={{ 
                    maxWidth: '500px', 
                    margin: '0 auto'
                }}
            >
                {children}
            </main>
        </div>
    );
}