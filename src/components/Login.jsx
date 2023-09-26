export default function Login() {
  async function handleSubmit() {
    e.preventDefault;
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-container">
          <label>Username</label>
          <input name="username" type="text" />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input name="password" type="text" />
        </div>
        <div className="button-container">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
