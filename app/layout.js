import "../styles/globals.css";



export const metadata = {
  title: "Goat Notes",
  description: "A note-taking app for goats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
