export default function manifest() {
  return Response.json({
    short_name: "My PWA",
    name: "My Progressive Web App",
    description: "A simple PWA built with React and Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.svg",
        sizes: "192x192",
        type: "image/svg",
      },
    ],
  });
}
