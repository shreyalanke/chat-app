export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-slate-400 text-center mb-8">Sign in to your account</p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold py-3"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          Don’t have an account?{' '}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
