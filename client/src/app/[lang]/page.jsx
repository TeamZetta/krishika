import FAQ from "@/components/landing/FAQ";
import Header from "@/components/landing/Header";
import JoinUs from "@/components/landing/JoinUs";
import Reasons from "@/components/landing/Reasons";

export default function Home({ params }) {
  return (
    <div className="pt-20 w-full">
      <Header params={params.lang} />
      <JoinUs params={params.lang} />
      <Reasons params={params.lang} />
      <FAQ params={params.lang} />
    </div>
  );
}
