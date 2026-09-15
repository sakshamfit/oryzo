import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'SAN Media Solution — AI Snake Marketing Agency',description:'Strategy. Content. Technology. Performance. All under one roof.',keywords:['SAN Media Solution','AI Snake Marketing','digital marketing agency','Coimbatore','performance marketing','video production'],openGraph:{title:'SAN Media Solution — AI Snake Marketing Agency',description:'Brands today. Bigger tomorrows.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
