type StoreLocation = {
  name: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  directionsUrl: string;
};

const LOCATIONS: StoreLocation[] = [
  {
    name: "Qres Trade Centre",
    hours: "08:00 - 00:00",
    phone: "0559082725",
    lat: 40.7695828,
    lng: 46.9897025,
    directionsUrl: "https://maps.app.goo.gl/ukvzTDrikddMaXwV8",
  },
  {
    name: "Ugur Market",
    hours: "08:00 - 00:00",
    phone: "0559002001",
    lat: 40.7708333,
    lng: 47.0133525,
    directionsUrl: "https://maps.app.goo.gl/cynG7S6LpFEVfBRs5",
  },
  {
    name: "Kosmos Market",
    hours: "08:00 - 01:00",
    phone: "0559002001",
    lat: 40.7651161,
    lng: 47.0529105,
    directionsUrl: "https://maps.app.goo.gl/MehwoMxwa7xr1zyz9",
  },
  {
    name: "20 Market",
    hours: "08:00 - 00:00",
    phone: "0559004016",
    lat: 40.7625853,
    lng: 47.047972,
    directionsUrl: "https://maps.app.goo.gl/M9kQMCneWRrhJLpM7",
  },
  {
    name: "Bayraq Store",
    hours: "08:00 - 00:00",
    phone: "0559002001",
    lat: 40.757138,
    lng: 47.0826817,
    directionsUrl: "https://maps.app.goo.gl/N6Xc1DjsKUP4VXqBA",
  },
  {
    name: "11 Store",
    hours: "08:00 - 00:00",
    phone: "0559002087",
    lat: 40.7730838,
    lng: 47.0225782,
    directionsUrl: "https://maps.app.goo.gl/KiV6TV1NbaCk2vuN9",
  },
  {
    name: "Xezer Market",
    hours: "09:00 - 00:00",
    phone: "0559002006",
    lat: 40.7695454,
    lng: 46.9967301,
    directionsUrl: "https://maps.app.goo.gl/vmeM8uZtXbEu225U7",
  },
  {
    name: "Nur Market",
    hours: "08:00 - 00:00",
    phone: "0559002001",
    lat: 40.7671846,
    lng: 47.0011282,
    directionsUrl: "https://maps.app.goo.gl/nky1afxZU2MweqWx7",
  },
  {
    name: "41-45 Market",
    hours: "08:00 - 00:00",
    phone: "0559002075",
    lat: 40.759418,
    lng: 47.0593788,
    directionsUrl: "https://maps.app.goo.gl/4v7Gx6vUEV8tQYwN6",
  },
  {
    name: "Bazar Market",
    hours: "08:00 - 23:00",
    phone: "0559002001",
    lat: 40.7692216,
    lng: 47.0567666,
    directionsUrl: "https://maps.app.goo.gl/tWqmMREbVBcp2eZi7",
  },
  {
    name: "Gullu Bag Market",
    hours: "08:00 - 00:00",
    phone: "0559002090",
    lat: 40.7589386,
    lng: 47.0449182,
    directionsUrl: "https://maps.app.goo.gl/g9c1Tnk8MNxjwgBJ9",
  },
  {
    name: "MMC (Distribution and Wholesale Centre)",
    hours: "08:00 - 00:00",
    phone: "0559002050",
    lat: 40.7293093,
    lng: 47.1192902,
    directionsUrl: "https://maps.app.goo.gl/G35cuWhGhC2LFcj57",
  },
];

export default function LocationsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Our Locations</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">
        {LOCATIONS.length} Qediroglu locations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {LOCATIONS.map((store) => (
          <div
            key={store.name}
            className="border rounded-lg overflow-hidden flex flex-col"
          >
            <div className="aspect-video bg-gray-100">
              <iframe
                title={`Map - ${store.name}`}
                src={`https://www.google.com/maps?q=${store.lat},${store.lng}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 flex flex-col gap-1">
              <h2 className="font-semibold text-[#08a2c1]">
                Qediroglu {store.name}
              </h2>
              <p className="text-sm text-black/70 dark:text-white/70">
                {store.hours}
              </p>
              <a
                href={`tel:${store.phone}`}
                className="text-sm text-black/70 dark:text-white/70 hover:underline"
              >
                {store.phone}
              </a>
              <a
                href={store.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm font-medium text-[#08a2c1] hover:underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}