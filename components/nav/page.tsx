"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navMenuTrig,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "SOME PLACEHOLDER",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER 1",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER 2",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER 3",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER 4",
    href: "/SOMEWHERE",
    description: "SOME DESCRIPTION.",
  },
  {
    title: "SOME PLACEHOLDER 5",
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
      title: "Other Placeholder 1",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder 2",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder 3",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder 4",
      href: "/another-place",
      description: "Other Description.",
    },
    {
      title: "Other Placeholder 5",
      href: "/another-place",
      description: "Other Description.",
    },
  ];

export default function Nav({ sessionUser }: { sessionUser: User | null }) {
  const pathName = usePathname();

  return (
    <NavigationMenu>
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
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          {pathName !== "/login" && !sessionUser && (
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navMenuTrig()}>
                Login
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuItem>
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
