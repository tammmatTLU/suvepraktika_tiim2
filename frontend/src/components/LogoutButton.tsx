export default function LogoutButton() {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}