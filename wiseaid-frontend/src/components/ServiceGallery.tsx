import Image from "next/image";

export default function ServiceGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-4">
      {[
        { src: "/hero1.jpg", title: "24/7 Monitoring" },
        { src: "/hero2.jpg", title: "Emergency Response" },
        { src: "/hero3.jpg", title: "Health Tracking" },
      ].map((item, idx) => (
        <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg h-80">
          <Image 
            src={item.src} 
            alt={item.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 flex items-end p-6">
            <h3 className="text-white text-2xl font-bold">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}