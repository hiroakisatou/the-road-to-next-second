import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">HomePage</h2>
      <Link href="/tickets" className="underline">
        View all tickets
      </Link>
    </div>
  );
};

export default HomePage;
