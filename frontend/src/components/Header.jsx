export default function Header({ user, setPage, logout }) {
  return (
    <header>
      <button className="brand" onClick={() => setPage("films")}>
        CINÉ<span>VAULT</span>
      </button>
      <nav>
        <button onClick={() => setPage("films")}>Films</button>
        {user && <button onClick={() => setPage("bookings")}>My Bookings</button>}
        {user?.role === "ADMIN" && (
          <button onClick={() => setPage("admin")}>Admin</button>
        )}
      </nav>
      <div className="account">
        {user ? (
          <>
            <b>{user.name}</b>
            <small>{user.role === "ADMIN" ? "Administrator" : "Member"}</small>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button className="gold" onClick={() => setPage("auth")}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
