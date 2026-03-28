"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Mail, Lock, User, Loader2, ShieldCheck, Github, Facebook, Linkedin, Code } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import styles from "./AuthSlider.module.css";

function AuthSliderContent() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL parameter
  useEffect(() => {
    if (searchParams?.get("mode") === "register") {
      setIsActive(true);
    }
  }, [searchParams]);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const result = await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      });

      if (result?.error) {
        alert("Invalid credentials. Please try again.");
      } else {
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/portal");
        }
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sending confirmPassword as well to match previous logic expectations if any
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword, confirmPassword: regPassword }),
      });

      if (res.ok) {
        alert("Registration successful! Please login.");
        setIsActive(false); // Switch to login view
      } else {
        const error = await res.json();
        alert(error.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className={`${styles.bodyWrapper} bg-[var(--color-navy-950)]`}>
      <ParticleBackground />
      <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-300 hover:text-[var(--color-gold)] transition-colors font-semibold bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
         &larr; Back to Home
      </Link>

      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        {/* Login Form */}
        <div className={`${styles.formBox} ${styles.login}`}>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className={styles.inputBox}>
              <input type="email" placeholder="Email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <Mail className={styles.icon} size={20} />
            </div>
            <div className={styles.inputBox}>
              <input type="password" placeholder="Password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              <Lock className={styles.icon} size={20} />
            </div>
            <div className={styles.forgotLink}>
              <Link href="#">Forgot Password?</Link>
            </div>
            <button type="submit" className={styles.btn} disabled={loginLoading}>
              {loginLoading ? <Loader2 className="animate-spin mx-auto" /> : "Login"}
            </button>
            <p>or login with social platforms</p>
            <div className={styles.socialIcons}>
              <Link href="#"><div className={styles.iconWrapper}><Code size={20}/></div></Link>
              <Link href="#"><div className={styles.iconWrapper}><Facebook size={20}/></div></Link>
              <Link href="#"><div className={styles.iconWrapper}><Github size={20}/></div></Link>
              <Link href="#"><div className={styles.iconWrapper}><Linkedin size={20}/></div></Link>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className={`${styles.formBox} ${styles.register}`}>
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div className={styles.inputBox}>
              <input type="text" placeholder="Full Name" required value={regName} onChange={e => setRegName(e.target.value)} />
              <User className={styles.icon} size={20} />
            </div>
            <div className={styles.inputBox}>
              <input type="email" placeholder="Email" required value={regEmail} onChange={e => setRegEmail(e.target.value)} />
              <Mail className={styles.icon} size={20} />
            </div>
            <div className={styles.inputBox}>
              <input type="password" placeholder="Password" required value={regPassword} onChange={e => setRegPassword(e.target.value)} />
              <ShieldCheck className={styles.icon} size={20} />
            </div>
            <button type="submit" className={styles.btn} disabled={regLoading}>
               {regLoading ? <Loader2 className="animate-spin mx-auto" /> : "Register"}
            </button>
            <p>or register with social platforms</p>
            <div className={styles.socialIcons}>
              <Link href="#"><div className={styles.iconWrapper}><Code size={20}/></div></Link>
              <Link href="#"><div className={styles.iconWrapper}><Facebook size={20}/></div></Link>
              <Link href="#"><div className={styles.iconWrapper}><Github size={20}/></div></Link>
              <Link href="#"><div className={styles.iconWrapper}><Linkedin size={20}/></div></Link>
            </div>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className={styles.toggleBox}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Hello, Welcome!</h1>
            <p>Don&apos;t have an account?</p>
            <button type="button" className={`${styles.btn} ${styles.registerBtn}`} onClick={() => setIsActive(true)}>Register</button>
          </div>

          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button type="button" className={`${styles.btn} ${styles.loginBtn}`} onClick={() => setIsActive(false)}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthSliderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-navy-950)] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--color-gold)]" size={40} /></div>}>
      <AuthSliderContent />
    </Suspense>
  );
}
