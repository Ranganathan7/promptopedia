"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState<Boolean>(false);

  useEffect(() => {
    const setProvidersInitially = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    if (!session || !session.user) {
      setProvidersInitially();
    } else {
      toast.success("Logged in successfully!");
    }
  }, []);

  return (
    <>
      <nav className="flex justify-between w-full mb-16 pt-4">
        <Link href="/" className="flex justify-center items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="promptopedia-logo"
            width={30}
            height={30}
          />
          <p className="logo_text">Promptopedia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex items-center gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Prompt
              </Link>
              <button
                onClick={() => {
                  signOut();
                  toast.success("Logged out Successfully!");
                }}
                className="outline_btn"
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session.user.image as string}
                  alt="profile-picture"
                  className="rounded-full"
                  height={40}
                  width={40}
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: ClientSafeProvider) => (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session.user.image as string}
                alt="profile-picture"
                className="rounded-full"
                height={37}
                width={37}
                onClick={() => setToggleDropDown((prevValue) => !prevValue)}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    className="w-full mt-2 black_btn"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                      toast.success("Logged out Successfully!");
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: ClientSafeProvider) => (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
