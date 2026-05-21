"use client"
import React , {useContext}from "react"
import Link from "next/link"
import { FaRegUserCircle } from 'react-icons/fa';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import logo from "../../assets/images/FreshCartlogo.png"
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { cartContext } from "../_contexts/CartContextProvider";

const components: { title: string; href: string  }[] = [
  { title: "All Categories", href: "/docs/primitives/alert-dialog" },
  { title: "Electronics", href: "/docs/primitives/hover-card" },
  { title: "Women's Fashion", href: "/docs/primitives/progress" },
  { title: "Men's Fashion", href: "/docs/primitives/scroll-area" },
  { title: "Beauty & Health", href: "/docs/primitives/tabs" }
]

export default function Navbar() {

  
  const { cartItemsNum } = useContext(cartContext)

  const session = useSession()

  console.log ("session",session);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-50 shadow-md">
      <div className="flex items-center justify-between px-20 py-3">

        <div>
          <img src={logo.src} alt="logo" />
        </div>

        <div className="w-1/2">
          <input type="text" className="border-1 shadow w-full py-3 px-5 rounded-4xl" placeholder="search product" />
        </div>

        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent hover:text-green-600 !text-lg" href="/home">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent hover:text-green-600 !text-lg" href="/cart">Shop</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-green-600 !text-lg">Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[200px] md:grid-cols-1 lg:w-[200px] ">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent hover:bg-transparent hover:text-green-600 !text-lg" href="/brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent text-gray-500 hover:text-green-600 hover:rounded-4xl !hover:bg-gray-900" href="/brands">
                  <CiHeart />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            
            <NavigationMenuItem>
              <NavigationMenuLink  asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent text-gray-500 hover:text-green-600 hover:rounded-4xl relative" href="/">
                  <span className="bg-red-500 text-white text-xs p-1 rounded-full absolute top-0 right-0">{cartItemsNum}</span>
                  <FaCartShopping />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-green-600 text-white !p-5 !rounded-4xl hover:!bg-green-700" href="/login">
                  <FaRegUserCircle /> Sign in
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="!p-5 !rounded-4xl hover:!bg-gray-700 ms-2" href="/signup">
                  <FaRegUserCircle /> Sign up
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}