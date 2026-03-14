"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const menuVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring" as const, damping: 25, stiffness: 200 } },
  exit: { x: "100%", transition: { duration: 0.2 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-bg-primary border-l border-border flex flex-col lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <span className="text-lg font-heading font-bold text-text-primary">
                Brand <span className="text-accent">Iconic</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-1">
                {navigation.map((link, i) => (
                  <motion.li
                    key={link.href}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    {link.children ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg transition-colors",
                            isActive(link.href)
                              ? "text-accent"
                              : "text-text-secondary hover:text-text-primary"
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 transition-transform duration-200",
                              servicesExpanded && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-4 border-l border-border/50"
                            >
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className={cn(
                                      "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                                      isActive(child.href)
                                        ? "text-accent"
                                        : "text-text-secondary hover:text-text-primary"
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          isActive(link.href)
                            ? "text-accent"
                            : "text-text-secondary hover:text-text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <div className="px-6 py-6 border-t border-border">
              <Button href={siteConfig.calendly} size="md" className="w-full">
                Book a Call
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
