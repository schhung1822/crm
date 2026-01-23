import Cubes from "@/components/Cubes";

export default function Page() {
  return (
    <div className="space-y-16 p-10">
      <section className="space-y-4">
        <h1 className="text-center text-3xl font-bold uppercase">Khác</h1>
        <p className="mx-auto w-[600px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id orci ut nunc faucibus pretium. Integer
          scelerisque magna non massa blandit.
        </p>
        <hr className="mx-auto w-1/2" />
      </section>{" "}
      <br />
      <section className="space-y-4">
        <div
          style={{
            height: "600px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Cubes
            gridSize={8}
            maxAngle={60}
            radius={4}
            borderStyle="2px solid #dedede"
            faceColor="#293040"
            rippleColor="#3c4253"
            rippleSpeed={1.5}
            autoAnimate={true}
            rippleOnClick={true}
          />
        </div>
      </section>
    </div>
  );
}
