import WhatsappButton from "../components/Buttons/WhatsappButton";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout({ children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #DAC4AF 0%, #E6DDCE 50%, #FFFEE0 100%)",
                // backgroundColor:"#DAC4AF",
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
                <WhatsappButton/>
            </main>
        </div>
    );
}