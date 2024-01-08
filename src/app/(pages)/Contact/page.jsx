import Form from "/src/components/pageComponents/Form";

export default function Page() {
return (
    <>
    <section>
        <div className="flex items-center gap-5 mb-6">
          <h2 className="text-3xl font-bold">Contact</h2>
          <span className=" rounded-full h-1 w-36 bg-gradient-to-r from-twOg-100 to-twOg-200"></span>
        </div>

        <div className="p-6 border border-1 flex flex-col gap-6 rounded-lg border-white/10 ">
          <p className="text-4xl text-gray-400">
            I am always open to discussing product,{" "}
            <span className="text-white">design work or partnerships.</span>
          </p>
          <Form />
        </div>
      </section>
    </>
  );
}
