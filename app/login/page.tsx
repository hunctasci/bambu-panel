export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <form className="rounded bg-white p-6 shadow-md">
        <input
          type="text"
          placeholder="Kullanici Adi"
          className="mb-4 w-full rounded border p-2"
        />
        <input
          type="password"
          placeholder="Sifre"
          className="mb-4 w-full rounded border p-2"
        />
        <button className="w-full rounded bg-primary p-2 text-white hover:bg-green-500">
          Giris Yap
        </button>
      </form>
    </div>
  );
}
