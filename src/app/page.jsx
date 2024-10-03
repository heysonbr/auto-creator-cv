import ResumeForm from "@/components/chat";
import UserInfo from "@/components/userInfo";

export default function Home() {
  return (
    <div className=" flex flex-col  items-center bg-orange-100 w-screen h-screen text-black">
      <h1 className="mt-20 text-4xl font-bold">Auto Creator Curriculum</h1>
      <p className="">
        Create a tailored resume from any job offer in seconds!
      </p>
      <div className="container mt-20">
        <UserInfo />
      </div>
    </div>
  );
}
