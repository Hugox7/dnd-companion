const styles = {
    background: "url('/landscape.png') no-repeat center center fixed",
    backgroundSize: 'cover',
    height: '100vh'
  }

export default function AuthLayout({ children }) {
  return (
    <main
      style={styles}
      suppressHydrationWarning
      className=" flex flex-col w-sreen h-screen justify-center items-center"
    >
      {children}
    </main>
  );
}
