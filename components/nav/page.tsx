"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
];
const otherComponents: { title: string; href: string; description: string }[] =
  [
    {
      title: "Other Placeholder",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder",
      href: "/another-place",
      description: "Other Description.",
    },
  ];

export default function Nav() {
  return (
    <NavigationMenu className="flex justify-between w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            Components
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            Other Components
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {otherComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
