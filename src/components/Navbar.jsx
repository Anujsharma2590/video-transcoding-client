import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "../ui/Button";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const COGNITO_LOGIN_URL = process.env.REACT_APP_COGNITO_LOGIN_URL || "";

const Navbar = () => {
  const { isAuthenticated, user, logout, login } = useContext(AuthContext);

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <a href="/" className="flex z-40 font-semibold">
            <img src="/logo.gif" alt="loading..." width="100" height={100} />
          </a>

          <div className="hidden items-center space-x-4 sm:flex">
            {!isAuthenticated ? (
              <>
                {/* <a
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </a> */}
                {/* Sign in (Cognito) */}
                <a
                  href={COGNITO_LOGIN_URL}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </a>
                {/* Get Started */}
                <a
                  href={COGNITO_LOGIN_URL}
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </a>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  {user && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">
                        {user.email}
                      </span>
                      {/* Avatar */}
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.profile_image_url || ""}
                          alt={user.email}
                        />
                        <AvatarFallback>
                          {user.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <button
                    onClick={logout}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
