import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '../ui/Button';
import MaxWidthWrapper from '../MaxWidthWrapper';

// Cognito login URL
const COGNITO_LOGIN_URL = `https://user-pool-testingg.auth.us-east-1.amazoncognito.com/login?client_id=61e0mbq3r7tsioofo5pc5pgusk&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:5000`
const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <a href="/" className="flex z-40 font-semibold">
            <span>quill.</span>
          </a>

          <div className="hidden items-center space-x-4 sm:flex">
            {!isAuthenticated ? (
              <>
                <a
                  href="/pricing"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Pricing
                </a>
                {/* Sign in (Cognito) */}
                <a
                  href={COGNITO_LOGIN_URL}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Sign in
                </a>
                {/* Get Started */}
                <a
                  href={COGNITO_LOGIN_URL}
                  className={buttonVariants({
                    size: 'sm',
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </a>
              </>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Dashboard
                </a>
                <button
                  onClick={logout}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
