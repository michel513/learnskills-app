import Link from "next/link";

const Footer = () => {
    return ( 
        <div className="lg:pl-26.8 ">
            <footer className="p-4 px-10  w-full bg-white border-t flex flex-col lg:flex-row items-start lg:items-center">
                <div className="text-xs text-muted-foreground py-2 px-4 lg:flex-1 ">
                    © 2024 BMGMichel All rights reserved.
                </div>
                <Link className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs" 
                href="mailto:business@codewithantonio.com">
                    Contact
                </Link>
                <Link target="_blank" 
                className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4
                  hover:underline h-10 px-4 py-2 text-muted-foreground text-xs" 
                  href="https://www.termsfeed.com/live/8be560f6-4487-4829-9dfd-ff4a94589225">
                    Terms of Service
                </Link>
                <Link target="_blank" 
                    className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
                      disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs" 
                      href="https://www.termsfeed.com/live/87149a5a-6182-4acd-8a65-24d2a02ad3d1">
                    Privacy Policy
                </Link>
            </footer>
        </div>
     );
}
 
export default Footer;