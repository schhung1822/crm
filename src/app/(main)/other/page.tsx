import Cubes from '@/components/Cubes'

export default function Page() {
  return (
  <div className="p-10 space-y-16">
        <section className="space-y-4">
        <h1 className="text-3xl font-bold text-center uppercase">Khác</h1>
        <p className="text-center w-[600px] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id orci ut nunc faucibus pretium. Integer scelerisque magna non massa blandit.
        </p>
        <hr width="50%" className="mx-auto" />
      </section> <br />
      <section className="space-y-4">
        <div style={{ height: '600px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
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
  )
}
