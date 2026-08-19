import { useState } from "react";

function Login() {
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [same, setSame] = useState(true);

  function handlePwd1Change(event) {
    setPwd1(event.target.value);
  }
  function handlePwd2Change(event) {
    setPwd2(event.target.value);
    if (pwd1 === event.target.value) {
      console.log("same");
      setSame(true);
    } else {
      console.log("not same");
      setSame(false);
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ maxWidth: "500px", margin: "auto" }}
        >
          <div className="card-body p-4 p-md-5">
            <h3 className="text-center mb-4 fw-bold text-primary">
              Create Account
            </h3>

            <form>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  value={pwd1}
                  onChange={handlePwd1Change}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword1">Password</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  value={pwd2}
                  onChange={handlePwd2Change}
                  type="password"
                  className={`form-control ${!same ? "is-invalid" : ""}`}
                  placeholder="Re-Enter Password"
                />
                <label htmlFor="floatingPassword2">Re-Enter Password</label>

                {!same && (
                  <div className="invalid-feedback fw-semibold">
                    ❌ Passwords do not match.
                  </div>
                )}
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                />
                <label
                  className="form-check-label text-muted"
                  htmlFor="termsCheckbox"
                >
                  I agree to the Terms and Conditions
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
